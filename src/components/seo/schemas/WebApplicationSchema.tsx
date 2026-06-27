import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants"

type WebApplicationSchemaProps = {
  name?: string
  description?: string
  url?: string
  applicationCategory?: string
  operatingSystem?: string
}

const WebApplicationSchema = ({
  name = SITE_NAME,
  description = SITE_DESCRIPTION,
  url = SITE_URL,
  applicationCategory = "UtilityApplication",
  operatingSystem = "Web",
}: WebApplicationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires JavaScript",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default WebApplicationSchema
