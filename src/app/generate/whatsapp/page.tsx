import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "WhatsApp QR Code Generator – Create Chat Links",
  description:
    "Generate QR codes that open a WhatsApp chat with a pre-filled number. Perfect for business and support.",
  keywords: [
    "WhatsApp QR code generator",
    "WhatsApp chat QR",
    "WhatsApp link QR code",
    "business WhatsApp QR",
    "WhatsApp click to chat",
    "WhatsApp message QR",
  ],
  openGraph: {
    title: "WhatsApp QR Code Generator – Create Chat Links | Qrigo",
    description: "Generate QR codes that open a WhatsApp chat with a pre-filled number.",
    url: `${SITE_URL}/generate/whatsapp`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp QR Code Generator – Create Chat Links | Qrigo",
    description: "Generate QR codes that open a WhatsApp chat with a pre-filled number.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/whatsapp`,
  },
};

export default function WhatsAppQRPage() {
  redirect("/generate/qr?type=whatsapp");
}
