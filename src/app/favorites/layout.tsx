import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Favorite QR Codes & Barcodes – Saved Favorites",
  description:
    "Access your saved QR codes, barcodes, and digital business cards all in one place. Quickly find, share, or regenerate your favorite codes.",
  openGraph: {
    title: "Favorites – Qrify",
    description:
      "Access your saved QR codes, barcodes, and digital business cards.",
    url: `${SITE_URL}/favorites`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Favorites – Qrify",
    description:
      "Access your saved QR codes, barcodes, and digital business cards.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/favorites`,
  },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
