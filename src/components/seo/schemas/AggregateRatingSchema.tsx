interface AggregateRatingSchemaProps {
  itemReviewedName?: string
  ratingValue?: number
  ratingCount?: number
  bestRating?: number
  worstRating?: number
}

const AggregateRatingSchema = ({
  itemReviewedName = "Qrigo - Free QR Code & Barcode Generator",
  ratingValue = 4.8,
  ratingCount = 1250,
  bestRating = 5,
  worstRating = 1,
}: AggregateRatingSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: itemReviewedName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      ratingCount,
      bestRating,
      worstRating,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default AggregateRatingSchema
