import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Phone QR Code Generator – Create Call QR Codes",
  description:
    "Generate QR codes that dial a phone number when scanned. Perfect for business cards and contactless calling.",
  keywords: [
    "phone QR code generator",
    "call QR code",
    "tel QR code",
    "phone number QR code",
    "click to call QR",
    "contactless calling QR",
  ],
  openGraph: {
    title: "Phone QR Code Generator – Create Call QR Codes | Qrigo",
    description: "Generate QR codes that dial a phone number when scanned.",
    url: `${SITE_URL}/generate/phone`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone QR Code Generator – Create Call QR Codes | Qrigo",
    description: "Generate QR codes that dial a phone number when scanned.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/phone`,
  },
};

export default function PhoneQRPage() {
  redirect("/generate/qr?type=phone");
}
