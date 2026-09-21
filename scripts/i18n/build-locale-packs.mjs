/**
 * Expands the compact per-category translation drafts in
 * scripts/i18n/translations/{locale}/{category}.json into the runtime packs
 * src/locales/{locale}/tool-copy.json and src/locales/{locale}/tool-names.json.
 *
 * Compact draft shape (per internal slug):
 *   {
 *     "name": "...",
 *     "desc": "...",
 *     "title": "...",              // reused for metadata.title and seo.title
 *     "description": "...",        // reused for metadata.description and seo.description
 *     "keywords": ["..."],         // optional, falls back to English
 *     "example": { "input": "...", "output": "..." } | null,
 *     "faqs": [["question", "answer"], ...]
 *   }
 *
 * The six calculators that ship hand-written packs under
 * src/locales/{locale}/tools/*.json are taken verbatim from those files.
 *
 * Run with:  node --import ./scripts/i18n/register-hooks.mjs scripts/i18n/build-locale-packs.mjs
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const src = (rel) => pathToFileURL(path.join(root, rel)).href;
const { listPublicTools } = await import(src('src/i18n/registry.js'));

const LOCALES = ['es', 'fr', 'de', 'id', 'vi', 'cs', 'hu', 'ro', 'pt'];
const PER_TOOL_SLUGS = [
  'profit-margin',
  'break-even',
  'freelance-hourly-rate',
  'salary-to-hourly',
  'customer-ltv',
  'adsense-revenue',
];

const tools = listPublicTools();
const english = JSON.parse(await readFile(path.join(root, 'src/locales/en/tool-copy.json'), 'utf8'));

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

function expand(slug, draft, fallback) {
  const faqs = Array.isArray(draft.faqs)
    ? draft.faqs.map((entry) =>
        Array.isArray(entry) ? { q: entry[0], a: entry[1] } : { q: entry.q, a: entry.a },
      )
    : fallback.seo.faqs;
  const title = draft.title || fallback.seo.title;
  const description = draft.description || fallback.seo.description;
  const pack = {
    name: draft.name || fallback.name,
    desc: draft.desc || fallback.desc,
    metadata: {
      title: draft.metadataTitle || title,
      description: draft.metadataDescription || description,
      keywords: draft.keywords || fallback.metadata.keywords,
    },
    seo: {
      title,
      description,
      example: draft.example === undefined ? fallback.seo.example : draft.example,
      faqs,
    },
  };
  if (draft.ui) pack.ui = draft.ui;
  return pack;
}

const report = [];

for (const locale of LOCALES) {
  const draftDir = path.join(root, 'scripts/i18n/translations', locale);
  const drafts = {};
  if (existsSync(draftDir)) {
    for (const file of await readdir(draftDir)) {
      if (!file.endsWith('.json')) continue;
      Object.assign(drafts, await readJson(path.join(draftDir, file)));
    }
  }

  const toolCopy = {};
  const toolNames = {};
  const untranslated = [];

  for (const tool of tools) {
    const slug = tool.internalSlug;
    const fallback = english[slug];

    if (PER_TOOL_SLUGS.includes(slug)) {
      const perTool = path.join(root, 'src/locales', locale, 'tools', `${slug}.json`);
      if (existsSync(perTool)) {
        const pack = await readJson(perTool);
        toolCopy[slug] = {
          ...fallback,
          ...pack,
          metadata: { ...fallback.metadata, ...(pack.metadata || {}) },
          seo: { ...fallback.seo, ...(pack.seo || {}) },
        };
        toolNames[slug] = { name: toolCopy[slug].name, desc: toolCopy[slug].desc };
        continue;
      }
    }

    const draft = drafts[slug];
    if (!draft) {
      untranslated.push(slug);
      toolCopy[slug] = fallback;
      toolNames[slug] = { name: fallback.name, desc: fallback.desc };
      continue;
    }

    toolCopy[slug] = expand(slug, draft, fallback);
    toolNames[slug] = { name: toolCopy[slug].name, desc: toolCopy[slug].desc };
  }

  const outDir = path.join(root, 'src/locales', locale);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'tool-copy.json'), `${JSON.stringify(toolCopy, null, 2)}\n`, 'utf8');
  await writeFile(path.join(outDir, 'tool-names.json'), `${JSON.stringify(toolNames, null, 2)}\n`, 'utf8');

  const commonPath = path.join(outDir, 'common.json');
  if (existsSync(commonPath)) {
    const common = await readJson(commonPath);
    common.tools = { ...(common.tools || {}), ...toolNames };
    await writeFile(commonPath, `${JSON.stringify(common, null, 2)}\n`, 'utf8');
  }

  report.push({ locale, tools: Object.keys(toolCopy).length, untranslated });
}

const verbose = process.argv.includes('--verbose');
for (const row of report) {
  console.log(`${row.locale}: ${row.tools} tools, ${row.untranslated.length} still English`);
  if (verbose && row.untranslated.length) console.log(`   -> ${row.untranslated.join(', ')}`);
}
