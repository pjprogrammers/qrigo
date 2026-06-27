type Breadcrumb = {
  '@type': string
  itemListElement: any[]
}

type Props = {
  name: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  breadcrumb?: Breadcrumb
  about?: string
  primaryImageOfPage?: string
}

export default function WebPageSchema({
  name,
  description,
  url,
  datePublished = '2025-03-15',
  dateModified = new Date().toISOString().split('T')[0],
  breadcrumb,
  about,
  primaryImageOfPage,
}: Props) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    datePublished,
    dateModified,
  }

  if (breadcrumb) {
    schema.breadcrumb = breadcrumb
  }

  if (about) {
    schema.about = about
  }

  if (primaryImageOfPage) {
    schema.primaryImageOfPage = primaryImageOfPage
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
