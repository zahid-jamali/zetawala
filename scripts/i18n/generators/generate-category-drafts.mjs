import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const enDir = path.join(root, 'scripts/i18n/en-split');
const trDir = path.join(root, 'scripts/i18n/translations');
const LOCALES = ['id', 'vi', 'cs', 'hu', 'ro', 'pt'];

const HANDWRITTEN = new Set([
  'profit-margin',
  'break-even',
  'freelance-hourly-rate',
  'salary-to-hourly',
  'customer-ltv',
  'adsense-revenue'
]);

export async function generateCategoryDrafts() {
  const files = (await readdir(enDir)).filter(f => f.endsWith('.json'));

  for (const locale of LOCALES) {
    const locDir = path.join(trDir, locale);
    await mkdir(locDir, { recursive: true });

    for (const file of files) {
      const enPath = path.join(enDir, file);
      const enContent = JSON.parse(await readFile(enPath, 'utf8'));
      const drafts = {};

      for (const [slug, tool] of Object.entries(enContent)) {
        if (HANDWRITTEN.has(slug)) continue;

        const faqs = (tool.seo?.faqs || []).map((faq) => [faq.q, faq.a]);

        drafts[slug] = {
          name: tool.name,
          desc: tool.desc,
          title: tool.metadata?.title || tool.name,
          description: tool.metadata?.description || tool.desc,
          example: tool.seo?.example || null,
          faqs
        };
      }

      const outFile = path.join(locDir, file);
      await writeFile(outFile, `${JSON.stringify(drafts, null, 2)}\n`, 'utf8');
    }
    console.log(`Generated category drafts for ${locale}`);
  }
}

if (process.argv[1]?.endsWith('generate-category-drafts.mjs')) {
  await generateCategoryDrafts();
}
