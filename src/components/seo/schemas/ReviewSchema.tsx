interface ReviewSchemaProps {
  reviewBody: string
  authorName: string
  reviewRatingValue?: number
  datePublished?: string
  itemReviewedName?: string
}

const ReviewSchema = ({
  reviewBody,
  authorName,
  reviewRatingValue = 5,
  datePublished = "2025-03-15",
  itemReviewedName = "Qrigo",
}: ReviewSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody,
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: reviewRatingValue,
      bestRating: 5,
    },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: itemReviewedName,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default ReviewSchema
