/**
 * Generates the English source-of-truth locale packs:
 *   src/locales/en/tool-copy.json
 *   src/locales/en/tool-names.json
 *
 * Run with:  node --import ./scripts/i18n/register-hooks.mjs scripts/i18n/dump-en-tool-copy.mjs
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const src = (rel) => pathToFileURL(path.join(root, rel)).href;
const { listPublicTools } = await import(src('src/i18n/registry.js'));
const { seoData } = await import(src('src/config/seo/index.js'));

const tools = listPublicTools();
const toolCopy = {};
const toolNames = {};

for (const tool of tools) {
  const seo = seoData[tool.internalSlug] || {};
  toolCopy[tool.internalSlug] = {
    name: tool.name,
    desc: tool.desc,
    metadata: {
      title: seo.title || `${tool.name} | Zetawala`,
      description: seo.description || tool.desc || '',
      keywords: seo.keywords || [],
    },
    seo: {
      title: seo.title || tool.name,
      description: seo.description || tool.desc || '',
      example: seo.example || null,
      faqs: seo.faqs || [],
    },
  };
  toolNames[tool.internalSlug] = { name: tool.name, desc: tool.desc };
}

// Existing hand-written per-tool packs win over the generated English copy.
const perToolSlugs = [
  'profit-margin',
  'break-even',
  'freelance-hourly-rate',
  'salary-to-hourly',
  'customer-ltv',
  'adsense-revenue',
];
for (const slug of perToolSlugs) {
  const file = path.join(root, 'src/locales/en/tools', `${slug}.json`);
  if (!existsSync(file) || !toolCopy[slug]) continue;
  const overlay = JSON.parse(await readFile(file, 'utf8'));
  toolCopy[slug] = {
    ...toolCopy[slug],
    ...overlay,
    metadata: { ...toolCopy[slug].metadata, ...(overlay.metadata || {}) },
    seo: { ...toolCopy[slug].seo, ...(overlay.seo || {}) },
  };
  toolNames[slug] = { name: toolCopy[slug].name, desc: toolCopy[slug].desc };
}

const outDir = path.join(root, 'src/locales/en');
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'tool-copy.json'), `${JSON.stringify(toolCopy, null, 2)}\n`, 'utf8');
await writeFile(path.join(outDir, 'tool-names.json'), `${JSON.stringify(toolNames, null, 2)}\n`, 'utf8');

const missingSeo = tools.filter((t) => !seoData[t.internalSlug]).map((t) => t.internalSlug);
console.log(`public tools: ${tools.length}`);
console.log(`tool-copy keys: ${Object.keys(toolCopy).length}`);
console.log(`tools without seoData: ${missingSeo.length}${missingSeo.length ? ` -> ${missingSeo.join(', ')}` : ''}`);
