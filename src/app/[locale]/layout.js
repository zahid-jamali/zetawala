import { notFound } from 'next/navigation';
import { PREFIX_LOCALES, isPrefixLocale } from '../../i18n/config';

export function generateStaticParams() {
  return PREFIX_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isPrefixLocale(locale)) notFound();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.setAttribute('data-locale',${JSON.stringify(locale)});`,
        }}
      />
      {children}
    </>
  );
}
