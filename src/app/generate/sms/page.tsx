import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "SMS QR Code Generator – Generate SMS QR Codes",
  description:
    "Create QR codes that open a pre-filled SMS message on mobile devices. Perfect for promotions and alerts.",
  keywords: [
    "SMS QR code generator",
    "text message QR code",
    "QR code for SMS",
    "SMS marketing QR",
    "pre-filled SMS QR",
    "SMS marketing QR code",
  ],
  openGraph: {
    title: "SMS QR Code Generator – Generate SMS QR Codes | Qrify",
    description: "Create QR codes that open a pre-filled SMS message on mobile devices.",
    url: `${SITE_URL}/generate/sms`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMS QR Code Generator – Generate SMS QR Codes | Qrify",
    description: "Create QR codes that open a pre-filled SMS message on mobile devices.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/sms`,
  },
};

export default function SMSQRPage() {
  redirect("/generate/qr?type=sms");
}
