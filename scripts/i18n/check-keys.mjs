/**
 * Compares translation draft keys against the English split source and reports
 * missing/extra slugs plus FAQ-count mismatches per category and locale.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const enDir = path.join(root, 'scripts/i18n/en-split');
const trDir = path.join(root, 'scripts/i18n/translations');
const locales = ['es', 'fr', 'de', 'id', 'vi', 'cs', 'hu', 'ro', 'pt'];

const HANDWRITTEN = new Set(
  [
    'profit-margin',
    'break-even',
    'freelance-hourly-rate',
    'salary-to-hourly',
    'customer-ltv',
    'adsense-revenue',
  ].filter((slug) => fs.existsSync(path.join(root, 'src/locales/en/tools', `${slug}.json`))),
);

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
let problems = 0;

for (const file of fs.readdirSync(enDir)) {
  const en = read(path.join(enDir, file));
  const enSlugs = Object.keys(en).filter((slug) => !HANDWRITTEN.has(slug));
  for (const locale of locales) {
    const target = path.join(trDir, locale, file);
    if (!fs.existsSync(target)) continue;
    const tr = read(target);
    const missing = enSlugs.filter((s) => !(s in tr));
    const extra = Object.keys(tr).filter((s) => !(s in en));
    const faqMismatch = enSlugs
      .filter((s) => tr[s])
      .filter((s) => (tr[s].faqs?.length ?? 0) !== (en[s].seo?.faqs?.length ?? 0))
      .map((s) => `${s}(${tr[s].faqs?.length ?? 0}/${en[s].seo?.faqs?.length ?? 0})`);
    if (missing.length || extra.length || faqMismatch.length) {
      problems += 1;
      console.log(`${locale}/${file}`);
      if (missing.length) console.log(`  missing: ${missing.join(', ')}`);
      if (extra.length) console.log(`  extra: ${extra.join(', ')}`);
      if (faqMismatch.length) console.log(`  faq count: ${faqMismatch.join(', ')}`);
    }
  }
}

console.log(problems ? `${problems} file(s) with issues` : 'all draft keys and FAQ counts match');
