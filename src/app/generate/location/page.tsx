import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Location QR Code Generator – Create Map QR Codes",
  description:
    "Generate QR codes that open a location in Google Maps or Apple Maps. Share coordinates with anyone.",
  keywords: [
    "location QR code generator",
    "map QR code",
    "GPS QR code",
    "coordinates QR code",
    "google maps QR",
    "share location QR",
  ],
  openGraph: {
    title: "Location QR Code Generator – Create Map QR Codes | Qrigo",
    description: "Generate QR codes that open a location in Google Maps or Apple Maps.",
    url: `${SITE_URL}/generate/location`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Location QR Code Generator – Create Map QR Codes | Qrigo",
    description: "Generate QR codes that open a location in Google Maps or Apple Maps.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/location`,
  },
};

export default function LocationQRPage() {
  redirect("/generate/qr?type=location");
}
