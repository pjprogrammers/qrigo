import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "QR Code Scanner – Scan QR Codes Online",
  description:
    "Scan QR codes instantly using your camera. Free online QR code scanner with flash support and history saving.",
  keywords: [
    "QR code scanner",
    "scan QR code online",
    "QR reader",
    "QR scanner webcam",
    "free QR scanner",
    "QR decoder",
  ],
  openGraph: {
    title: "QR Code Scanner – Scan QR Codes Online | Qrigo",
    description: "Scan QR codes instantly using your camera.",
    url: `${SITE_URL}/scan/qr`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Scanner – Scan QR Codes Online | Qrigo",
    description: "Scan QR codes instantly using your camera.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/scan/qr`,
  },
};

export default function ScanQRPage() {
  redirect("/scan?mode=qr");
}
