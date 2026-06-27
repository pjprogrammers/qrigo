import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "WiFi QR Code Generator – Share WiFi Passwords Instantly",
  description:
    "Create QR codes for WiFi networks and let others connect instantly. Supports WPA, WEP, and open networks.",
  keywords: [
    "WiFi QR code generator",
    "WiFi password QR code",
    "share WiFi QR",
    "WiFi QR code maker",
    "guest WiFi QR",
    "network QR code",
  ],
  openGraph: {
    title: "WiFi QR Code Generator – Share WiFi Passwords Instantly | Qrify",
    description: "Create QR codes for WiFi networks and let others connect instantly.",
    url: `${SITE_URL}/generate/wifi`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WiFi QR Code Generator – Share WiFi Passwords Instantly | Qrify",
    description: "Create QR codes for WiFi networks and let others connect instantly.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/wifi`,
  },
};

export default function WifiQRPage() {
  redirect("/generate/qr?type=wifi");
}
