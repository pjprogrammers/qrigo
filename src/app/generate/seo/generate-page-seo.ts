import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { GENERATE_PAGE_KEYWORDS } from "@/components/seo/meta/KeywordManager";
import { generateMetadata } from "@/components/seo/meta/MetadataGenerator";
import { buildOpenGraph } from "@/components/seo/meta/OpenGraphBuilder";
import { buildTwitterCard } from "@/components/seo/meta/TwitterCardBuilder";
import { buildCanonical } from "@/components/seo/meta/CanonicalHelper";

export const GENERATE_PAGE_TITLE = "Free QR Code & Barcode Generator – Create Codes Online";
export const GENERATE_PAGE_DESCRIPTION = "Choose from QR codes, barcodes, and business card QR generators. Create codes for URLs, text, WiFi, email, SMS, WhatsApp, and more. Free and no signup required.";

export const generateMetadataConfig = {
  title: GENERATE_PAGE_TITLE,
  description: GENERATE_PAGE_DESCRIPTION,
  keywords: GENERATE_PAGE_KEYWORDS,
  path: "/generate",
};

export function getGeneratePageMetadata() {
  return generateMetadata(generateMetadataConfig);
}

export const generateBreadcrumbItems = [
  { name: "Home", url: SITE_URL },
  { name: "Generate", url: `${SITE_URL}/generate` },
];

export const generateToolItems = [
  { name: "QR Code Generator", url: `${SITE_URL}/generate/qr`, position: 1 },
  { name: "Barcode Generator", url: `${SITE_URL}/generate/barcode`, position: 2 },
  { name: "Contact Card QR Generator", url: `${SITE_URL}/generate/contact`, position: 3 },
];
