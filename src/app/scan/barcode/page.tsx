import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Barcode Scanner – Scan Barcodes Online",
  description:
    "Scan EAN, UPC, Code128, ITF, and Codabar barcodes instantly using your camera. Free online barcode scanner.",
  keywords: [
    "barcode scanner",
    "scan barcode online",
    "barcode reader",
    "UPC scanner",
    "EAN scanner",
    "free barcode scanner",
    "Code128 scanner",
  ],
  openGraph: {
    title: "Barcode Scanner – Scan Barcodes Online | Qrigo",
    description: "Scan EAN, UPC, Code128, ITF, and Codabar barcodes instantly.",
    url: `${SITE_URL}/scan/barcode`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barcode Scanner – Scan Barcodes Online | Qrigo",
    description: "Scan EAN, UPC, Code128, ITF, and Codabar barcodes instantly.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/scan/barcode`,
  },
};

export default function ScanBarcodePage() {
  redirect("/scan?mode=barcode");
}
