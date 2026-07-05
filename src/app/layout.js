import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../store/provider";
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
      <meta name="monetag" content="018bc84a9c09ea6dfbc1e73a803c9455"></meta>
      <script
        src="https://quge5.com/88/tag.min.js"
        data-zone="256722"
        async
        data-cfasync="false"
      ></script>
      <body className="min-h-screen w-screen overflow-x-hidden font-sans">
        <ReduxProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
