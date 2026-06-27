import { SITE_URL } from "@/lib/constants"

type ItemListItem = {
  name: string
  url: string
  position: number
}

type ItemListSchemaProps = {
  name: string
  description: string
  items: ItemListItem[]
}

const ItemListSchema = ({ name, description, items }: ItemListSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: {
        "@id": item.url,
        name: item.name,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const generateToolsList: ItemListItem[] = [
  { position: 1, name: "QR Code", url: `${SITE_URL}/generate/qr` },
  { position: 2, name: "Barcode", url: `${SITE_URL}/generate/barcode` },
  { position: 3, name: "Contact Card", url: `${SITE_URL}/generate/contact` },
]

export default ItemListSchema
