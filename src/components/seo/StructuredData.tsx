interface StructuredDataProps {
  type: "WebApplication" | "SoftwareApplication";
  name: string;
  description?: string;
  url?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
}

export function StructuredData({ type, name, description, url, applicationCategory, operatingSystem, offers }: StructuredDataProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name,
  };

  if (description) jsonLd.description = description;
  if (url) jsonLd.url = url;
  if (applicationCategory) jsonLd.applicationCategory = applicationCategory;
  if (operatingSystem) jsonLd.operatingSystem = operatingSystem;
  if (offers) jsonLd.offers = offers;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
