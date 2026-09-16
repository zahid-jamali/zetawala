import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  DEFAULT_LOCALE,
  ENABLED_LOCALES,
  PREFIX_LOCALES,
  isEnabledLocale,
  isPrefixLocale,
  normalizeLocale,
} from '../src/i18n/config.js';
import {
  isToolLocalized,
  isPageLocalized,
  getToolSlug,
  resolveLocalizedTool,
  resolveLocalizedPage,
} from '../src/i18n/catalog.js';
import {
  getHomePath,
  getLocalizedPagePath,
  getCatalogToolPath,
  getLocaleFromPathname,
  stripLocalePrefix,
} from '../src/i18n/urls.js';
import { getSwitcherHref, identifyCurrentResource } from '../src/i18n/switcher.js';
import { getToolHreflangLanguages, getPageHreflangLanguages } from '../src/i18n/hreflang.js';
import { listLocalizedSitemapEntries } from '../src/i18n/sitemap.js';
import { getEnglishBlogFallbackPath, resolveLocalePath } from '../src/i18n/resolve.js';
import { interpolate, createTranslator } from '../src/i18n/t.js';
import { buildLocalizedToolMetadata, buildLocalizedPageMetadata } from '../src/i18n/metadata.js';

describe('locale resolution', () => {
  it('treats English as the default unprefixed locale', () => {
    assert.equal(DEFAULT_LOCALE, 'en');
    assert.deepEqual(PREFIX_LOCALES, ['es', 'fr', 'de']);
    assert.equal(isPrefixLocale('es'), true);
    assert.equal(isPrefixLocale('en'), false);
    assert.equal(normalizeLocale('ES-MX'), 'es');
    assert.equal(normalizeLocale('it'), 'en');
    assert.equal(isEnabledLocale('zz'), false);
  });

  it('reads locale from a pathname without redirecting English URLs', () => {
    assert.equal(getLocaleFromPathname('/tools/calculators/profit-margin-calculator'), 'en');
    assert.equal(getLocaleFromPathname('/es/calculadoras'), 'es');
    assert.equal(getLocaleFromPathname('/fr'), 'fr');
    assert.equal(stripLocalePrefix('/es/calculadoras'), '/calculadoras');
    assert.equal(getHomePath('de'), '/de');
  });

  it('keeps chrome locale aligned with the URL after a language switch', () => {
    assert.equal(getLocaleFromPathname('/es/tools/calculators/calculadora-de-margen-de-beneficio'), 'es');
    assert.equal(getLocaleFromPathname('/fr/calculateurs'), 'fr');
    assert.equal(getLocaleFromPathname('/de/rechner'), 'de');
    assert.equal(getLocaleFromPathname('/calculators'), 'en');
  });
});

describe('localized slug resolution', () => {
  it('keeps English slugs identical to the live public URLs', () => {
    assert.equal(getToolSlug('profit-margin', 'en'), 'profit-margin-calculator');
    assert.equal(
      getCatalogToolPath('en', 'profit-margin'),
      '/tools/calculators/profit-margin-calculator'
    );
  });

  it('resolves published localized slugs and rejects English aliases when an override exists', () => {
    const es = resolveLocalizedTool('es', 'calculators', 'calculadora-de-margen-de-beneficio');
    assert.equal(es.internalSlug, 'profit-margin');
    assert.equal(resolveLocalizedTool('es', 'calculators', 'profit-margin-calculator'), null);
    assert.equal(resolveLocalizedTool('es', 'calculators', 'non-existing-tool'), null);
    assert.equal(resolveLocalizedTool('en', 'calculators', 'calculadora-de-margen-de-beneficio'), null);
    assert.equal(isToolLocalized('profit-margin', 'fr'), true);
    assert.equal(isToolLocalized('niche-finder', 'es'), true);
    assert.equal(
      resolveLocalizedTool('es', 'youtube', 'youtube-niche-finder').internalSlug,
      'niche-finder'
    );
  });

  it('resolves localized hub pages', () => {
    assert.equal(resolveLocalizedPage('es', 'calculadoras').pageId, 'calculators');
    assert.equal(resolveLocalizedPage('fr', 'calculateurs').pageId, 'calculators');
    assert.equal(resolveLocalizedPage('de', 'rechner').pageId, 'calculators');
    assert.equal(resolveLocalizedPage('es', 'escritura').pageId, 'writing');
    assert.equal(resolveLocalizedPage('es', 'estudio').pageId, 'study');
    assert.equal(resolveLocalizedPage('es', 'freelance').pageId, 'freelancer');
    assert.equal(resolveLocalizedPage('es', 'freelance/upwork').pageId, 'freelancer-upwork');
    assert.equal(resolveLocalizedPage('es', 'utilidades-pdf').pageId, 'pdf-utilities');
    assert.equal(resolveLocalizedPage('es', 'contacto').pageId, 'contact');
    assert.equal(resolveLocalizedPage('es', 'calculators'), null);
    assert.equal(isPageLocalized('home', 'de'), true);
  });

  it('404s unsupported locale/tool combinations via resolveLocalePath', () => {
    assert.equal(resolveLocalePath('en', []), null);
    assert.equal(resolveLocalePath('es', []).type, 'home');
    assert.equal(resolveLocalePath('es', ['calculadoras']).pageId, 'calculators');
    assert.equal(resolveLocalePath('es', ['non-existing-tool']), null);
    assert.equal(
      resolveLocalePath('es', ['tools', 'calculators', 'calculadora-de-margen-de-beneficio']).internalSlug,
      'profit-margin'
    );
    assert.equal(resolveLocalePath('es', ['tools', 'calculators', 'youtube-niche-finder']), null);
    assert.equal(
      resolveLocalePath('es', ['tools', 'youtube', 'youtube-niche-finder']).internalSlug,
      'niche-finder'
    );
    assert.equal(resolveLocalePath('it', []), null);
    assert.equal(getEnglishBlogFallbackPath('es', ['blog', 'admin']), '/blog/admin');
    assert.equal(getEnglishBlogFallbackPath('es', ['blog', 'admin', 'login']), '/blog/admin/login');
    assert.equal(getEnglishBlogFallbackPath('es', ['blog', 'my-post']), '/blog/my-post');
    assert.equal(getEnglishBlogFallbackPath('es', ['blog']), null);
    assert.equal(getEnglishBlogFallbackPath('en', ['blog', 'admin']), null);
  });
});

describe('language switching', () => {
  const cases = [
    ['/tools/calculators/profit-margin-calculator', 'es', '/es/tools/calculators/calculadora-de-margen-de-beneficio'],
    ['/tools/calculators/profit-margin-calculator', 'fr', '/fr/tools/calculators/calculateur-de-marge-beneficiaire'],
    ['/tools/calculators/profit-margin-calculator', 'de', '/de/tools/calculators/gewinnmargen-rechner'],
    ['/es/tools/calculators/calculadora-de-margen-de-beneficio', 'en', '/tools/calculators/profit-margin-calculator'],
    ['/es/tools/calculators/calculadora-de-margen-de-beneficio', 'fr', '/fr/tools/calculators/calculateur-de-marge-beneficiaire'],
    ['/es/tools/calculators/calculadora-de-margen-de-beneficio', 'de', '/de/tools/calculators/gewinnmargen-rechner'],
    ['/fr/tools/calculators/calculateur-de-marge-beneficiaire', 'en', '/tools/calculators/profit-margin-calculator'],
    ['/fr/tools/calculators/calculateur-de-marge-beneficiaire', 'es', '/es/tools/calculators/calculadora-de-margen-de-beneficio'],
    ['/fr/tools/calculators/calculateur-de-marge-beneficiaire', 'de', '/de/tools/calculators/gewinnmargen-rechner'],
    ['/de/tools/calculators/gewinnmargen-rechner', 'en', '/tools/calculators/profit-margin-calculator'],
    ['/de/tools/calculators/gewinnmargen-rechner', 'es', '/es/tools/calculators/calculadora-de-margen-de-beneficio'],
    ['/de/tools/calculators/gewinnmargen-rechner', 'fr', '/fr/tools/calculators/calculateur-de-marge-beneficiaire'],
  ];

  for (const [from, target, expected] of cases) {
    it(`switches ${from} → ${target}`, () => {
      assert.equal(getSwitcherHref(from, target), expected);
    });
  }

  it('switches catalog tools that reuse the English slug', () => {
    assert.equal(
      getSwitcherHref('/tools/youtube/youtube-niche-finder', 'es'),
      '/es/tools/youtube/youtube-niche-finder'
    );
    assert.equal(identifyCurrentResource('/tools/youtube/youtube-niche-finder').resource.internalSlug, 'niche-finder');
    assert.equal(
      getSwitcherHref('/es/tools/youtube/youtube-niche-finder', 'en'),
      '/tools/youtube/youtube-niche-finder'
    );
  });

  it('falls back to the language homepage when the path is unknown', () => {
    assert.equal(getSwitcherHref('/tools/not-a-real-folder/missing-tool', 'es'), '/es');
    assert.equal(identifyCurrentResource('/tools/not-a-real-folder/missing-tool').resource, null);
  });

  it('switches the homepage across languages with a full URL change', () => {
    assert.equal(getSwitcherHref('/', 'es'), '/es');
    assert.equal(getSwitcherHref('/', 'fr'), '/fr');
    assert.equal(getSwitcherHref('/', 'de'), '/de');
    assert.equal(getSwitcherHref('/es', 'en'), '/');
    assert.equal(getSwitcherHref('/es', 'de'), '/de');
  });

  it('switches calculators hubs across languages', () => {
    assert.equal(getSwitcherHref('/calculators', 'es'), '/es/calculadoras');
    assert.equal(getSwitcherHref('/es/calculadoras', 'en'), '/calculators');
    assert.equal(getSwitcherHref('/es/calculadoras', 'de'), '/de/rechner');
  });
});

describe('metadata, canonical and hreflang', () => {
  it('builds self-referencing canonicals and reciprocal hreflang', () => {
    const languages = getToolHreflangLanguages('profit-margin');
    assert.equal(languages.en, 'https://www.zetawala.com/tools/calculators/profit-margin-calculator');
    assert.equal(languages.es, 'https://www.zetawala.com/es/tools/calculators/calculadora-de-margen-de-beneficio');
    assert.equal(languages.fr, 'https://www.zetawala.com/fr/tools/calculators/calculateur-de-marge-beneficiaire');
    assert.equal(languages.de, 'https://www.zetawala.com/de/tools/calculators/gewinnmargen-rechner');
    assert.equal(languages['x-default'], 'https://www.zetawala.com/tools/calculators/profit-margin-calculator');
    const niche = getToolHreflangLanguages('niche-finder');
    assert.equal(niche.en, 'https://www.zetawala.com/tools/youtube/youtube-niche-finder');
    assert.equal(niche.es, 'https://www.zetawala.com/es/tools/youtube/youtube-niche-finder');
  });

  it('builds localized tool metadata with canonical and hreflang', () => {
    const meta = buildLocalizedToolMetadata({
      locale: 'es',
      internalSlug: 'profit-margin',
      dict: {
        metadata: {
          title: 'Calculadora de margen de beneficio gratis | Zetawala',
          description: 'Calcula el margen.',
          keywords: ['margen'],
        },
      },
    });
    assert.equal(meta.alternates.canonical, 'https://www.zetawala.com/es/tools/calculators/calculadora-de-margen-de-beneficio');
    assert.equal(meta.openGraph.locale, 'es_ES');
    assert.ok(meta.alternates.languages.es);
    assert.ok(meta.alternates.languages['x-default']);
    assert.equal(meta.robots.index, true);
  });

  it('builds localized page metadata', () => {
    const meta = buildLocalizedPageMetadata({
      locale: 'fr',
      pageId: 'home',
      dict: { metadata: { title: 'Accueil', description: 'Outils gratuits' } },
    });
    assert.equal(meta.alternates.canonical, 'https://www.zetawala.com/fr');
    assert.equal(getPageHreflangLanguages('home').en, 'https://www.zetawala.com/');
  });
});

describe('sitemap localization', () => {
  it('includes prefix-locale URLs for published hubs and tools', () => {
    const entries = listLocalizedSitemapEntries('2026-01-01T00:00:00.000Z');
    const urls = entries.map((e) => e.url);
    assert.ok(urls.includes('https://www.zetawala.com/es'));
    assert.ok(urls.includes('https://www.zetawala.com/fr/calculateurs'));
    assert.ok(urls.includes('https://www.zetawala.com/de/tools/calculators/gewinnmargen-rechner'));
    assert.ok(urls.includes('https://www.zetawala.com/es/tools/youtube/youtube-niche-finder'));
    assert.ok(urls.includes('https://www.zetawala.com/es/escritura'));
    assert.ok(!urls.some((u) => u.includes('/en/')));
    const unique = new Set(urls);
    assert.equal(unique.size, urls.length);
  });
});

describe('translators', () => {
  it('interpolates nested keys', () => {
    const t = createTranslator({ nav: { toolsCount: '{count} tools' } });
    assert.equal(t('nav.toolsCount', { count: 18 }), '18 tools');
    assert.equal(interpolate('Hello {name}', { name: 'Ada' }), 'Hello Ada');
    assert.equal(t('missing.key'), 'missing.key');
  });
});

describe('enabled locales', () => {
  it('exposes the four launch locales', () => {
    assert.deepEqual(ENABLED_LOCALES, ['en', 'es', 'fr', 'de']);
  });
});
