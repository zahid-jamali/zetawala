import { ENABLED_LOCALES } from './config.js';

const ALL_LOCALES = ENABLED_LOCALES.slice();

export const LOCALIZED_PAGES = {
  home: {
    locales: ALL_LOCALES,
    slugs: { en: '', es: '', fr: '', de: '', id: '', vi: '', cs: '', hu: '', ro: '', pt: '' },
  },
  calculators: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'calculators', es: 'calculadoras', fr: 'calculateurs', de: 'rechner',
      id: 'kalkulator', vi: 'may-tinh', cs: 'kalkulacky', hu: 'kalkulatorok',
      ro: 'calculatoare', pt: 'calculadoras',
    },
    englishPath: '/calculators',
  },
  seo: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'seo', es: 'seo', fr: 'seo', de: 'seo',
      id: 'seo', vi: 'seo', cs: 'seo', hu: 'seo', ro: 'seo', pt: 'seo',
    },
    englishPath: '/seo',
  },
  writing: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'writing', es: 'escritura', fr: 'redaction', de: 'schreiben',
      id: 'menulis', vi: 'viet-lach', cs: 'psani', hu: 'iras', ro: 'scriere', pt: 'escrita',
    },
    englishPath: '/writing',
  },
  study: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'study', es: 'estudio', fr: 'etudes', de: 'lernen',
      id: 'belajar', vi: 'hoc-tap', cs: 'studium', hu: 'tanulas', ro: 'studiu', pt: 'estudo',
    },
    englishPath: '/study',
  },
  freelancer: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'freelancer', es: 'freelance', fr: 'freelance', de: 'freelancing',
      id: 'freelance', vi: 'freelance', cs: 'freelance', hu: 'freelance', ro: 'freelance', pt: 'freelancer',
    },
    englishPath: '/freelancer',
  },
  'freelancer-upwork': {
    locales: ALL_LOCALES,
    slugs: {
      en: 'freelancer/upwork', es: 'freelance/upwork', fr: 'freelance/upwork', de: 'freelancing/upwork',
      id: 'freelance/upwork', vi: 'freelance/upwork', cs: 'freelance/upwork',
      hu: 'freelance/upwork', ro: 'freelance/upwork', pt: 'freelancer/upwork',
    },
    englishPath: '/freelancer/upwork',
  },
  'freelancer-fiverr': {
    locales: ALL_LOCALES,
    slugs: {
      en: 'freelancer/fiverr', es: 'freelance/fiverr', fr: 'freelance/fiverr', de: 'freelancing/fiverr',
      id: 'freelance/fiverr', vi: 'freelance/fiverr', cs: 'freelance/fiverr',
      hu: 'freelance/fiverr', ro: 'freelance/fiverr', pt: 'freelancer/fiverr',
    },
    englishPath: '/freelancer/fiverr',
  },
  shopee: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'shopee', es: 'shopee', fr: 'shopee', de: 'shopee',
      id: 'shopee', vi: 'shopee', cs: 'shopee', hu: 'shopee', ro: 'shopee', pt: 'shopee',
    },
    englishPath: '/shopee',
  },
  lazada: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'lazada', es: 'lazada', fr: 'lazada', de: 'lazada',
      id: 'lazada', vi: 'lazada', cs: 'lazada', hu: 'lazada', ro: 'lazada', pt: 'lazada',
    },
    englishPath: '/lazada',
  },
  'pdf-utilities': {
    locales: ALL_LOCALES,
    slugs: {
      en: 'pdf-utilities', es: 'utilidades-pdf', fr: 'utilitaires-pdf', de: 'pdf-werkzeuge',
      id: 'utilitas-pdf', vi: 'tien-ich-pdf', cs: 'pdf-nastroje', hu: 'pdf-eszkozok',
      ro: 'utilitare-pdf', pt: 'utilitarios-pdf',
    },
    englishPath: '/pdf-utilities',
  },
  contact: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'contact', es: 'contacto', fr: 'contact', de: 'kontakt',
      id: 'kontak', vi: 'lien-he', cs: 'kontakt', hu: 'kapcsolat', ro: 'contact', pt: 'contato',
    },
    englishPath: '/contact',
  },
  'privacy-policy': {
    locales: ALL_LOCALES,
    slugs: {
      en: 'privacy-policy', es: 'politica-de-privacidad', fr: 'politique-de-confidentialite', de: 'datenschutz',
      id: 'kebijakan-privasi', vi: 'chinh-sach-bao-mat', cs: 'zasady-ochrany-soukromi',
      hu: 'adatvedelmi-iranyelvek', ro: 'politica-de-confidentialitate', pt: 'politica-de-privacidade',
    },
    englishPath: '/privacy-policy',
  },
  terms: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'terms', es: 'terminos', fr: 'conditions', de: 'agb',
      id: 'syarat-ketentuan', vi: 'dieu-khoan', cs: 'podminky',
      hu: 'feltetelek', ro: 'termeni', pt: 'termos',
    },
    englishPath: '/terms',
  },
  cookies: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'cookies', es: 'cookies', fr: 'cookies', de: 'cookies',
      id: 'cookies', vi: 'cookies', cs: 'cookies', hu: 'cookies', ro: 'cookies', pt: 'cookies',
    },
    englishPath: '/cookies',
  },
  blog: {
    locales: ALL_LOCALES,
    slugs: {
      en: 'blog', es: 'blog', fr: 'blog', de: 'blog',
      id: 'blog', vi: 'blog', cs: 'blog', hu: 'blog', ro: 'blog', pt: 'blog',
    },
    englishPath: '/blog',
  },
};

/** Natural localized slugs. English seoSlug is always the fallback. */
export const SLUG_OVERRIDES = {
  'profit-margin': {
    es: 'calculadora-de-margen-de-beneficio',
    fr: 'calculateur-de-marge-beneficiaire',
    de: 'gewinnmargen-rechner',
    id: 'kalkulator-margin-laba',
    vi: 'may-tinh-ty-suat-loi-nhuan',
    cs: 'kalkulacka-ziskove-marze',
    hu: 'haszonkulcs-kalkulator',
    ro: 'calculator-marja-profit',
    pt: 'calculadora-de-margem-de-lucro',
  },
  'break-even': {
    es: 'calculadora-de-punto-de-equilibrio',
    fr: 'calculateur-de-seuil-de-rentabilite',
    de: 'break-even-rechner',
    id: 'kalkulator-titik-impas',
    vi: 'may-tinh-diem-hoa-von',
    cs: 'kalkulacka-bodu-zvratu',
    hu: 'fedezeti-pont-kalkulator',
    ro: 'calculator-punct-de-echilibru',
    pt: 'calculadora-de-ponto-de-equilibrio',
  },
  'freelance-hourly-rate': {
    es: 'calculadora-de-tarifa-por-hora-freelance',
    fr: 'calculateur-de-taux-horaire-freelance',
    de: 'freiberufler-stundensatz-rechner',
    id: 'kalkulator-tarif-per-jam-freelance',
    vi: 'may-tinh-gia-theo-gio-freelance',
    cs: 'kalkulacka-hodinove-sazby-na-volne-noze',
    hu: 'szabaduszo-oradij-kalkulator',
    ro: 'calculator-tarif-orar-freelance',
    pt: 'calculadora-de-tarifa-por-hora-freelance',
  },
  'salary-to-hourly': {
    es: 'calculadora-salario-a-tarifa-horaria',
    fr: 'calculateur-salaire-vers-taux-horaire',
    de: 'gehalt-stundensatz-rechner',
    id: 'kalkulator-gaji-ke-tarif-per-jam',
    vi: 'may-tinh-luong-sang-gia-gio',
    cs: 'kalkulacka-prevodu-platu-na-hodinovou-mzdu',
    hu: 'fizetes-oradij-kalkulator',
    ro: 'calculator-salariu-in-tarif-orar',
    pt: 'calculadora-salario-para-valor-hora',
  },
  'customer-ltv': {
    es: 'calculadora-de-valor-de-vida-del-cliente',
    fr: 'calculateur-de-valeur-vie-client',
    de: 'kundenlebenswert-rechner',
    id: 'kalkulator-customer-lifetime-value',
    vi: 'may-tinh-gia-tri-vong-doi-khach-hang',
    cs: 'kalkulacka-celozivotni-hodnoty-zakaznika',
    hu: 'ugyfel-elettartam-ertek-kalkulator',
    ro: 'calculator-valoare-de-viata-client',
    pt: 'calculadora-de-valor-do-tempo-de-vida-do-cliente',
  },
  'adsense-revenue': {
    es: 'calculadora-de-ingresos-adsense',
    fr: 'calculateur-de-revenus-adsense',
    de: 'adsense-umsatz-rechner',
    id: 'kalkulator-pendapatan-adsense',
    vi: 'may-tinh-doanh-thu-adsense',
    cs: 'kalkulacka-prijmu-adsense',
    hu: 'adsense-bevetel-kalkulator',
    ro: 'calculator-venituri-adsense',
    pt: 'calculadora-de-receita-do-adsense',
  },
};
