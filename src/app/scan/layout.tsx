import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_TWITTER, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "QR & Barcode Scanner \u2013 Scan Codes Online",
  description:
    "Scan QR codes and barcodes instantly using your camera or upload an image. Multi-stage decoder for reliable scanning. Supports QR, EAN, UPC, Code128, ITF, and Codabar formats. Free and no sign-up required.",
  keywords: [
    "QR scanner",
    "barcode scanner",
    "scan QR code online",
    "scan barcode online",
    "QR code reader",
    "barcode reader",
    "QR code decoder",
    "upload QR code",
    "scan from image",
    "QR scanner camera",
    "free barcode scanner",
    "QR code scanner website",
    "decode QR code",
    "read barcode from image",
    "online QR scanner",
  ],
  openGraph: {
    title: "QR & Barcode Scanner \u2013 Scan Codes Online | Qrigo",
    description:
      "Scan QR codes and barcodes instantly using your camera or upload an image. Supports multi-stage decoding for reliable results on blurry or low-contrast images.",
    url: `${SITE_URL}/scan`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/scan/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "QR Code & Barcode Scanner \u2013 Scan Codes Online | Qrigo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR & Barcode Scanner \u2013 Scan Codes Online | Qrigo",
    description:
      "Scan QR codes and barcodes instantly using your camera or upload an image. Multi-stage decoder for reliable results.",
    site: SITE_TWITTER,
    images: [`${SITE_URL}/scan/opengraph-image.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/scan`,
    languages: {
      en: `${SITE_URL}/scan`,
      "x-default": `${SITE_URL}/scan`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
