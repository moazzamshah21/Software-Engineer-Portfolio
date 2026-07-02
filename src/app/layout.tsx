import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { generateSiteMetadata } from "@/lib/seo";
import { JsonLdSchema } from "@/components/seo/JsonLdSchema";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { UIStateProvider } from "@/components/providers/UIStateProvider";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} font-sans antialiased`}
      >
        <JsonLdSchema />
        <LenisProvider>
          <UIStateProvider>
            <AppProviders>
              <Navbar />
              <main className="relative">{children}</main>
              <Footer />
            </AppProviders>
          </UIStateProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
