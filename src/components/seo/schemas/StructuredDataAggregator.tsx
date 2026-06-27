import {
  OrganizationSchema,
  WebApplicationSchema,
  SearchActionSchema,
  BreadcrumbListSchema,
  ItemListSchema,
  SoftwareApplicationSchema,
  AggregateRatingSchema,
  FAQPageSchema,
  HowToSchema,
  WebPageSchema,
} from "./index"

import { generateBreadcrumbs } from "./BreadcrumbListSchema"
import { generateToolsList } from "./ItemListSchema"
import { generatePageFAQs } from "./FAQPageSchema"
import { generateSteps } from "./HowToSchema"

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CREATED_DATE } from "@/lib/constants"

const StructuredDataAggregator = () => (
  <>
    <OrganizationSchema />
    <WebApplicationSchema />
    <SearchActionSchema />
    <BreadcrumbListSchema items={generateBreadcrumbs} />
    <ItemListSchema
      name="Free QR Code & Barcode Generators"
      description="Choose from QR Code, Barcode, or Business Card QR generators."
      items={generateToolsList}
    />
    <SoftwareApplicationSchema
      name="Qrigo - Free QR Code & Barcode Generator"
      description={SITE_DESCRIPTION}
    />
    <AggregateRatingSchema />
    <FAQPageSchema items={generatePageFAQs} />
    <HowToSchema
      name="Generate QR Codes & Barcodes Online"
      description="Learn how to create QR codes, barcodes, and business card QR codes using Qrigo."
      steps={[...generateSteps.qr, ...generateSteps.barcode, ...generateSteps.contact]}
    />
    <WebPageSchema
      name="Generate - Qrigo"
      description={SITE_DESCRIPTION}
      url={`${SITE_URL}/generate`}
      datePublished="2025-03-15"
      dateModified={new Date().toISOString().split("T")[0]}
    />
  </>
)

export default StructuredDataAggregator
