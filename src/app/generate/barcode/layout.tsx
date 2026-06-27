import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Barcode Generator – Create Code 128, EAN & UPC Barcodes",
  description:
    "Generate Code128, EAN13, EAN8, UPC-A, UPC-E, ITF, and Codabar barcodes online for free. Download as PNG, SVG, JPEG, or WebP.",
  keywords: [
    "barcode generator",
    "create barcode",
    "EAN13 generator",
    "Code128 generator",
    "UPC generator",
    "free barcode generator",
    "online barcode maker",
    "ITF barcode",
    "Codabar barcode",
  ],
  openGraph: {
    title: "Free Barcode Generator – Create Code 128, EAN & UPC Barcodes | Qrify",
    description:
      "Generate Code128, EAN13, EAN8, UPC and other barcodes online for free.",
    url: `${SITE_URL}/generate/barcode`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Barcode Generator – Create Code 128, EAN & UPC Barcodes | Qrify",
    description:
      "Generate Code128, EAN13, EAN8, UPC and other barcodes online for free.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/barcode`,
  },
};

export default function BarcodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
