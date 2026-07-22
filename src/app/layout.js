import "./globals.css";
import { ReduxProvider } from "../store/provider";

import Script from "next/script";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";

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

  title: "Free AI YouTube, Daraz, WhatsApp & SEO Webmaster Tools | Zetawala",

  description:
    "Zetawala is a free AI toolkit for YouTube automation, Daraz SEO, WhatsApp social commerce, and SEO & Webmaster Intelligence. Audit websites, check PageSpeed and Core Web Vitals, fix broken links, validate sitemaps, analyze niches, generate scripts, and grow faster—all in one place.",

  keywords: [
    "AI YouTube tools",
    "YouTube Automation",
    "YouTube Niche Finder",
    "YouTube Title Generator",
    "YouTube Script Generator",
    "YouTube Description Generator",
    "YouTube Tags Generator",
    "YouTube Channel Health Analyzer",
    "YouTube Revenue Calculator",
    "Daraz Profit Calculator",
    "Daraz Keyword Tool",
    "Daraz Product Hunting",
    "Daraz SEO",
    "Local social commerce AI",
    "WhatsApp marketing tools Pakistan",
    "Shah Alami wholesale sourcing",
    "Roman Urdu copywriter AI",
    "Facebook ad script generator Pakistan",
    "WhatsApp broadcast message templates",
    "local e-commerce automation",
    "WhatsApp status copywriter",
    "SEO & Webmaster Intelligence",
    "SEO Website Checker",
    "PageSpeed Insights tool",
    "Core Web Vitals analyzer",
    "Broken link checker",
    "Sitemap generator",
    "Canonical checker",
    "SEO health score",
    "Keyword density checker",
    "SEO ROI calculator",
    "Free SEO tools",
    "Technical SEO audit",
    "SEO Tools",
    "AI SEO Tools",
    "Free AI Tools",
    "Free YouTube Tools",
    "Keyword Research Tool",
    "Content Creator Tools",
    "eCommerce Tools",
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
    title: "Free AI YouTube, Daraz, WhatsApp & SEO Webmaster Tools | Zetawala",

    description:
      "Free AI tools for YouTube creators, Daraz sellers, WhatsApp marketers, and website owners. Discover niches, audit technical SEO, analyze PageSpeed, optimize listings, and grow faster with Zetawala.",

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

    title: "Free AI YouTube, Daraz, WhatsApp & SEO Tools | Zetawala",

    description:
      "YouTube automation, Daraz SEO, WhatsApp commerce, and SEO & Webmaster Intelligence tools—free on Zetawala.",

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* monetag ads */}
        {/* <meta name="monetag" content="018bc84a9c09ea6dfbc1e73a803c9455" /> */}
        {/* bing verification link */}
        {/* <meta name="msvalidate.01" content="4406A082AA2050BF85F493274149D6D4" /> */}

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
                "Free AI YouTube automation, Daraz SEO, WhatsApp commerce, and SEO & Webmaster Intelligence tools.",
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
        {/* monetag ads script */}
        {/* <Script
          id="monetag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(s){
                s.dataset.zone='11245227';
                s.src='https://nap5k.com/tag.min.js';
              })(
                [document.documentElement, document.body]
                  .filter(Boolean)
                  .pop()
                  .appendChild(document.createElement('script'))
              );
            `,
          }}
        /> */}

        <ReduxProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ReduxProvider>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
