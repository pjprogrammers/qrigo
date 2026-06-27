import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Event QR Code Generator – Create Calendar QR Codes",
  description:
    "Generate QR codes for events that add to your calendar. Perfect for webinars, concerts, and meetings.",
  keywords: [
    "event QR code generator",
    "calendar QR code",
    "QR code for events",
    "iCal QR code",
    "add to calendar QR",
    "meeting QR code",
  ],
  openGraph: {
    title: "Event QR Code Generator – Create Calendar QR Codes | Qrify",
    description: "Generate QR codes for events that add to your calendar.",
    url: `${SITE_URL}/generate/event`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event QR Code Generator – Create Calendar QR Codes | Qrify",
    description: "Generate QR codes for events that add to your calendar.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/event`,
  },
};

export default function EventQRPage() {
  redirect("/generate/qr?type=event");
}
