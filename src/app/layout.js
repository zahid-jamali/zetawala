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
  description: "Generate viral YouTube ideas, high-CTR titles, word-for-word scripts, and execute expert Daraz e-commerce keyword optimization and product hunting with AI-powered automation.",
  metadataBase: new URL("https://zetawala.com"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ReduxProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
