import { SITE_NAME, SITE_URL } from "@/lib/constants"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  sameAs: [
    "https://twitter.com/qrigoapp",
    "https://github.com/qrigo",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-QRIGO",
    contactType: "customer service",
  },
}

const OrganizationSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
  />
)

export default OrganizationSchema
