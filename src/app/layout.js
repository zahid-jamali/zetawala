import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../store/provider";

import Script from "next/script";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ZetaWala | Advanced E-Commerce & Video SEO Automation",
  description:
    "Generate viral YouTube ideas, high-CTR titles, word-for-word scripts, and execute expert Daraz e-commerce keyword optimization and product hunting with AI-powered automation.",
  metadataBase: new URL("https://zetawala.com"),
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
        <meta name="msvalidate.01" content="4406A082AA2050BF85F493274149D6D4" />
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
      </body>
    </html>
  );
}
