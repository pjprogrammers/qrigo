type FAQItem = {
  question: string
  answer: string
}

type Props = {
  items: FAQItem[]
}

const FAQPageSchema = ({ items }: Props) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
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

export const generatePageFAQs: FAQItem[] = [
  {
    question: "How do I create a QR code on Qrigo?",
    answer:
      "Navigate to the QR Code generator, select the type of data you want to encode (URL, text, email, WiFi, vCard, etc.), customize the design with themes and colors, then download your QR code in your preferred format.",
  },
  {
    question: "What types of barcodes can I generate?",
    answer:
      "Qrigo supports a wide range of barcode symbologies including Code128, EAN-13, EAN-8, UPC-A, UPC-E, ITF, and Codabar — covering most retail, logistics, and inventory needs.",
  },
  {
    question: "Do I need to create an account to use Qrigo?",
    answer:
      "No account is required. Qrigo is completely free and works entirely in your browser — nothing is sent to a server, and there are no sign-ups or limits.",
  },
  {
    question: "Can I customize the look of my QR code?",
    answer:
      "Yes. Qrigo offers extensive customization options including preset themes, custom colors, gradients, corner styles, and platform-specific presets so your QR code matches your brand perfectly.",
  },
  {
    question: "What export formats are available?",
    answer:
      "You can export your QR codes and barcodes as PNG, SVG, JPEG, or WebP — giving you the flexibility to use them on the web, in print, or in design software.",
  },
]

export default FAQPageSchema
