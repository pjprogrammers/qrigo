import { SITE_URL } from "@/lib/constants"

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path}`
}

export function alternateLanguages(path: string): Record<string, string> {
  return {
    en: canonicalUrl(path),
    "x-default": canonicalUrl(path),
  }
}

export function generateMetadataBase(): URL {
  return new URL(SITE_URL)
}

export interface CanonicalConfig {
  url: string
  alternates: {
    languages: Record<string, string>
  }
}

export function buildCanonical(path: string): CanonicalConfig {
  return {
    url: canonicalUrl(path),
    alternates: {
      languages: alternateLanguages(path),
    },
  }
}
