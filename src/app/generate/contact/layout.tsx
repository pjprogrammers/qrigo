import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Business Card QR Generator – Create vCard QR Codes",
  description:
    "Generate professional business card QR codes and downloadable vCards for contacts and businesses. Includes multiple templates and themes.",
  keywords: [
    "business card QR code",
    "vCard QR code",
    "contact QR code",
    "digital business card",
    "vCard generator",
    "business card QR generator",
    "virtual business card",
    "contactless business card",
  ],
  openGraph: {
    title: "Business Card QR Generator – Create vCard QR Codes | Qrify",
    description:
      "Generate professional business card QR codes and downloadable vCards.",
    url: `${SITE_URL}/generate/contact`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Card QR Generator – Create vCard QR Codes | Qrify",
    description:
      "Generate professional business card QR codes and downloadable vCards.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/generate/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
