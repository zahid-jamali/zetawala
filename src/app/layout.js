import "./globals.css";
import { ReduxProvider } from "../store/provider";

import Script from "next/script";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";
import { LocaleProvider } from "../components/i18n/LocaleProvider";
import { getRequestLocale } from "../i18n/requestLocale";
import { getLocaleMeta } from "../i18n/config";

const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };

export const metadata = {
  metadataBase: new URL("https://zetawala.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",

  title:
    "Free AI Tools for YouTube, Daraz, Shopee, Lazada, Freelancers & SEO | Zetawala",

  description:
    "Zetawala is a free AI toolkit for YouTube automation, Daraz SEO, WhatsApp commerce, Shopee & Lazada seller tools, Upwork & Fiverr freelancers, AI writing, study quizzes, calculators, PDF utilities, and SEO & Webmaster Intelligence—all in one place.",

  keywords: [
    "AI YouTube tools",
    "YouTube Automation",
    "YouTube Niche Finder",
    "Daraz SEO",
    "Daraz Profit Calculator",
    "WhatsApp marketing tools Pakistan",
    "Shopee seller tools",
    "Shopee listing SEO",
    "Lazada seller tools",
    "Lazada keyword generator",
    "Upwork proposal generator",
    "Fiverr gig title generator",
    "Freelancer toolkit",
    "AI writing tools",
    "AI humanizer",
    "AI study notes",
    "AI quiz generator",
    "typing speed test",
    "freelance hourly rate calculator",
    "PDF to Markdown",
    "SEO Website Checker",
    "PageSpeed Insights tool",
    "Core Web Vitals analyzer",
    "Free SEO tools",
    "Free AI Tools",
    "Pakistan SEO Tools",
    "Zetawala",
  ],

  authors: [{ name: "Zetawala" }],
  creator: "Zetawala",
  publisher: "Zetawala",
  category: "Technology",
  applicationName: "Zetawala",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Free AI Tools for YouTube, Daraz, Shopee, Lazada, Freelancers & SEO | Zetawala",
    description:
      "Free AI tools for YouTube creators, marketplace sellers (Daraz, Shopee, Lazada), freelancers (Upwork & Fiverr), writers, students, and website owners—on Zetawala.",
    url: "https://zetawala.com",
    siteName: "Zetawala",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 512,
        height: 512,
        alt: "Zetawala AI Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free AI YouTube, Marketplace, Freelancer & SEO Tools | Zetawala",
    description:
      "YouTube, Daraz, Shopee, Lazada, Upwork, Fiverr, writing, study, calculators, PDF utilities, and SEO tools—free on Zetawala.",
    images: ["/android-chrome-512x512.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    bing: "4406A082AA2050BF85F493274149D6D4",
  },
};

export default async function RootLayout({ children }) {
  const locale = await getRequestLocale();
  const localeMeta = getLocaleMeta(locale);

  return (
    <html
      lang={localeMeta.htmlLang}
      data-locale={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#0F172A" />
        <meta name="author" content="Zetawala" />
        <meta name="application-name" content="Zetawala" />
        <meta name="apple-mobile-web-app-title" content="Zetawala" />
        <meta name="format-detection" content="telephone=no" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Zetawala",
              url: "https://zetawala.com",
              description:
                "Free AI tools for YouTube, Daraz, Shopee, Lazada, freelancers, writing, study, calculators, PDF utilities, and SEO.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://zetawala.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className="min-h-screen w-screen overflow-x-hidden font-sans">
        <ReduxProvider>
          <LocaleProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </LocaleProvider>
        </ReduxProvider>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
