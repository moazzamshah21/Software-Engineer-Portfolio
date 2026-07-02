import type { Metadata } from "next";
import { seoContent } from "@/content/seo";

export function generateSiteMetadata(overrides?: Partial<typeof seoContent>): Metadata {
  const seo = { ...seoContent, ...overrides };

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: new URL(seo.url),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.url,
      siteName: "Moazzam Shah Khan",
      images: [{ url: seo.ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
      creator: seo.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      "Software Engineer",
      "Flutter Developer",
      "React Native Developer",
      "Full Stack Developer",
      "Moazzam Shah Khan",
      "Mobile App Development",
    ],
  };
}
