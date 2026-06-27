import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Email QR Code Generator – Create Mail QR Codes",
  description:
    "Generate QR codes that open a pre-filled email message. Perfect for support, feedback, and newsletter signups.",
  keywords: [
    "email QR code generator",
    "mail QR code",
    "QR code for email",
    "create email QR",
    "mailto QR code",
    "pre-filled email QR",
  ],
  openGraph: {
    title: "Email QR Code Generator – Create Mail QR Codes | Qrify",
    description: "Generate QR codes that open a pre-filled email message.",
    url: `${SITE_URL}/generate/email`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Email QR Code Generator – Create Mail QR Codes | Qrify",
    description: "Generate QR codes that open a pre-filled email message.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/email`,
  },
};

export default function EmailQRPage() {
  redirect("/generate/qr?type=email");
}
