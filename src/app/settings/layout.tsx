import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Settings – Qrify Preferences",
  description:
    "Customize your Qrify experience with themes, export formats (PNG, SVG, JPEG, PDF), and manage your local data storage preferences.",
  openGraph: {
    title: "Settings – Qrify",
    description:
      "Customize your Qrify experience with themes and export formats.",
    url: `${SITE_URL}/settings`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Settings – Qrify",
    description:
      "Customize your Qrify experience with themes and export formats.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/settings`,
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
