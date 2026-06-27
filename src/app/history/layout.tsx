import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "QR Code & Barcode History – Saved Generations",
  description:
    "Review your full QR code and barcode generation history on Qrify. Re-download, share, or delete past codes. All creations saved locally.",
  openGraph: {
    title: "History – Qrify",
    description:
      "Review your full QR code and barcode generation history on Qrify.",
    url: `${SITE_URL}/history`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "History – Qrify",
    description:
      "Review your full QR code and barcode generation history on Qrify.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/history`,
  },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
