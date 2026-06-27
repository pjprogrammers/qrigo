import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free QR Code & Barcode Generator – Create Codes Online",
  description:
    "Choose from QR codes, barcodes, and business card generators. Create codes for URLs, text, WiFi, email, SMS, and more.",
  openGraph: {
    title: "Generator – Qrify",
    description:
      "Choose from QR codes, barcodes, and business card generators.",
    url: `${SITE_URL}/generate`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generator – Qrify",
    description:
      "Choose from QR codes, barcodes, and business card generators.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate`,
  },
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
