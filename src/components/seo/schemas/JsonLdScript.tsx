type JsonLdProps = {
  json: Record<string, unknown>;
};

export default function JsonLdScript({ json }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
