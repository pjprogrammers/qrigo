export const generateSteps = {
  qr: [
    {
      name: "Enter your data",
      text: "Paste a URL, text, or select a type like Email, WiFi, or vCard to encode into your QR code.",
      url: "https://qrigo.io/generate/qr",
    },
    {
      name: "Customize the design",
      text: "Pick from vibrant themes, adjust colors, gradients, and module style to match your brand.",
      url: "https://qrigo.io/generate/qr",
    },
    {
      name: "Download your QR code",
      text: "Export as PNG, SVG, JPEG, or WebP. Your QR code is ready to share instantly.",
      url: "https://qrigo.io/generate/qr",
    },
  ],
  barcode: [
    {
      name: "Choose a barcode type",
      text: "Select from Code128, EAN13, EAN8, UPCA, UPCE, ITF, or Codabar for your product or inventory.",
      url: "https://qrigo.io/generate/barcode",
    },
    {
      name: "Enter the barcode value",
      text: "Type the numeric or alphanumeric data you want to encode in your barcode.",
      url: "https://qrigo.io/generate/barcode",
    },
    {
      name: "Download your barcode",
      text: "Export your barcode as PNG or SVG for printing, packaging, or labeling.",
      url: "https://qrigo.io/generate/barcode",
    },
  ],
  contact: [
    {
      name: "Fill in contact details",
      text: "Add name, phone, email, company, address, and social profiles to your digital contact card.",
      url: "https://qrigo.io/generate/contact",
    },
    {
      name: "Upload your company logo",
      text: "Personalize your contact card with your brand logo for a professional look.",
      url: "https://qrigo.io/generate/contact",
    },
    {
      name: "Download as VCF",
      text: "Export your contact card as a vCard (.vcf) file that works with any address book.",
      url: "https://qrigo.io/generate/contact",
    },
  ],
}

type HowToStep = {
  name: string
  text: string
  url?: string
  image?: string
}

type HowToSchemaProps = {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
  tool?: string
}

const HowToSchema = ({
  name,
  description,
  steps,
  totalTime = "PT1M",
  tool = "Qrigo",
}: HowToSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    tool: {
      "@type": "HowToTool",
      name: tool,
    },
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default HowToSchema
