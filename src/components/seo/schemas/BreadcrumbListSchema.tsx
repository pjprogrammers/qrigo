import { SITE_URL } from "@/lib/constants"

type BreadcrumbItem = {
  name: string
  url: string
}

type BreadcrumbListSchemaProps = {
  items: BreadcrumbItem[]
}

const BreadcrumbListSchema = ({ items }: BreadcrumbListSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const generateBreadcrumbs: BreadcrumbItem[] = [
  { name: "Home", url: SITE_URL },
  { name: "Generate", url: `${SITE_URL}/generate` },
]

export default BreadcrumbListSchema
