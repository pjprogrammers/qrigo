import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free QR Code Generator – Create QR Codes Online",
  description:
    "Generate QR codes for URLs, text, email, phone numbers, WiFi, WhatsApp, locations, and contact cards. Free and no signup required.",
  keywords: [
    "QR code generator",
    "create QR code",
    "free QR code generator",
    "generate QR code",
    "QR code maker",
    "online QR code",
    "custom QR code",
  ],
  openGraph: {
    title: "Free QR Code Generator – Create QR Codes Online | Qrigo",
    description:
      "Generate QR codes for URLs, text, email, phone numbers, WiFi, WhatsApp, locations, and contact cards.",
    url: `${SITE_URL}/generate/qr`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator – Create QR Codes Online | Qrigo",
    description:
      "Generate QR codes for URLs, text, email, phone numbers, WiFi, WhatsApp, locations, and contact cards.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/qr`,
  },
};

export default function QRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
