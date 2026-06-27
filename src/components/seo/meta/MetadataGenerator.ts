import type { Metadata } from "next";

import { SITE_URL, SITE_NAME, SITE_LOCALE, OG_IMAGE } from "@/lib/constants";

function resolveOgImage(ogImage?: string): string {
  return ogImage || OG_IMAGE;
}

function buildUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function generateMetadata({
  title,
  description,
  keywords,
  path,
  ogTitle,
  ogDescription,
  ogImage,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}): Metadata {
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedOgImage = resolveOgImage(ogImage);
  const canonical = buildUrl(path);

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords,
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
      images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: resolvedOgTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [resolvedOgImage],
    },
    alternates: { canonical },
  };
}

export function generateMetadataWithoutTemplate(
  params: {
    title: string;
    description: string;
    keywords?: string[];
    path: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  },
): Metadata {
  const resolvedOgTitle = params.ogTitle || params.title;
  const resolvedOgDescription = params.ogDescription || params.description;
  const resolvedOgImage = resolveOgImage(params.ogImage);
  const canonical = buildUrl(params.path);

  return {
    title: params.title,
    description: params.description,
    keywords: params.keywords,
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
      images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: resolvedOgTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [resolvedOgImage],
    },
    alternates: { canonical },
  };
}

export function generateGenerateMetadata(
  params: {
    title: string;
    description: string;
    path: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  },
): Metadata {
  const baseKeywords = [
    "QR code generator",
    "create QR code",
    "free QR code",
    "QR code maker",
    "barcode generator",
    "QR code online",
  ];

  const resolvedOgTitle = params.ogTitle || params.title;
  const resolvedOgDescription = params.ogDescription || params.description;
  const resolvedOgImage = resolveOgImage(params.ogImage);
  const canonical = buildUrl(params.path);

  return {
    title: `${params.title} | ${SITE_NAME}`,
    description: params.description,
    keywords: baseKeywords,
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
      images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: resolvedOgTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [resolvedOgImage],
    },
    alternates: { canonical },
  };
}
