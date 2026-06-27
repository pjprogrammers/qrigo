import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "QR & Barcode Scanner – Scan Codes Online",
  description:
    "Scan QR codes and barcodes instantly using your camera. Supports QR, EAN, UPC, Code128, ITF, and Codabar formats.",
  openGraph: {
    title: "QR & Barcode Scanner – Scan Codes Online | Qrify",
    description:
      "Scan QR codes and barcodes instantly using your camera.",
    url: `${SITE_URL}/scan`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR & Barcode Scanner – Scan Codes Online | Qrify",
    description:
      "Scan QR codes and barcodes instantly using your camera.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/scan`,
  },
};

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
