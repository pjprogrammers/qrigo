interface SoftwareApplicationSchemaProps {
  name: string
  description: string
  url?: string
  applicationCategory?: string
  operatingSystem?: string
  offersPrice?: string
  offersCurrency?: string
}

const SoftwareApplicationSchema = ({
  name,
  description,
  url,
  applicationCategory = "Utilities",
  operatingSystem = "Web",
  offersPrice = "0",
  offersCurrency = "USD",
}: SoftwareApplicationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    ...(url && { url }),
    applicationCategory,
    operatingSystem,
    offers: {
      "@type": "Offer",
      price: offersPrice,
      priceCurrency: offersCurrency,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default SoftwareApplicationSchema
