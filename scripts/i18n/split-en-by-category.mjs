/**
 * Splits the English tool-copy pack into per-category working files under
 * scripts/i18n/en-split/, so translations can be produced category by category.
 *
 * Run with:  node --import ./scripts/i18n/register-hooks.mjs scripts/i18n/split-en-by-category.mjs
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const src = (rel) => pathToFileURL(path.join(root, rel)).href;
const { listPublicTools } = await import(src('src/i18n/registry.js'));

const toolCopy = JSON.parse(await readFile(path.join(root, 'src/locales/en/tool-copy.json'), 'utf8'));
const groups = new Map();
for (const tool of listPublicTools()) {
  if (!groups.has(tool.categorySlug)) groups.set(tool.categorySlug, {});
  groups.get(tool.categorySlug)[tool.internalSlug] = toolCopy[tool.internalSlug];
}

const outDir = path.join(root, 'scripts/i18n/en-split');
await mkdir(outDir, { recursive: true });
for (const [category, entries] of groups) {
  await writeFile(
    path.join(outDir, `${category}.json`),
    `${JSON.stringify(entries, null, 2)}\n`,
    'utf8',
  );
  console.log(`${category}: ${Object.keys(entries).length}`);
}
