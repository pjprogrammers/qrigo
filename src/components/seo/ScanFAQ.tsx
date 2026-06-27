"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Do I need an app to scan a QR code?",
    answer:
      "No, most modern smartphones can scan QR codes directly from the built-in camera app \u2014 no separate app needed. On iPhone (XR and later) and most Android phones (Android 9+), simply open the camera, point it at the code, and tap the notification that appears. If your phone does not scan automatically, our online scanner works on any device with a camera or image upload.",
  },
  {
    question: "How do I scan a QR code from an uploaded image or screenshot?",
    answer:
      "Click the Upload tab on this page, then drag and drop your image or click to browse. The scanner automatically processes the image using a multi-stage decoder that tries grayscale, contrast enhancement, sharpening, thresholding, and rotated variants to ensure even hard-to-read codes are decoded. Results appear instantly.",
  },
  {
    question: "Why won\u2019t my camera scan a QR code?",
    answer:
      "Common causes include: poor lighting, holding the phone too close or too far, a dirty camera lens, or QR scanning being disabled in your camera settings. First wipe your lens, adjust the distance, and ensure good lighting. On Android, go to Camera Settings and toggle on \u2018Scan QR codes.\u2019 On iPhone, check Settings > Camera > Scan QR Codes.",
  },
  {
    question: "What barcode formats does Qrigo support?",
    answer:
      "Qrigo supports EAN-13, EAN-8, UPC-A, UPC-E, Code 128, ITF-14, and Codabar for both generation and scanning. The scanning engine also automatically detects many additional formats including DataMatrix, PDF417, and Aztec codes. QR codes can encode URLs, emails, phone numbers, SMS, WhatsApp messages, WiFi credentials, locations, vCards, calendar events, and plain text.",
  },
  {
    question: "Are QR codes safe to scan?",
    answer:
      "QR codes themselves are not dangerous \u2014 they are just data containers. The risk comes from where the code sends you. Always preview the URL that appears before opening it. Avoid scanning codes that appear tampered with, stuck over another code, or that ask for personal information on unfamiliar websites.",
  },
  {
    question: "Can QR codes be scanned from a screen or printed material?",
    answer:
      "Yes, QR codes can be scanned from any screen \u2014 computer monitors, TV screens, smartphone displays, and tablets \u2014 as well as printed materials like posters, flyers, business cards, and product packaging. For screen scanning, ensure the code is large enough and brightness is high. For print, avoid glossy surfaces that create glare.",
  },
  {
    question: "What is the difference between a QR code and a barcode?",
    answer:
      "A barcode stores data in one dimension (vertical lines of varying widths) and typically holds a short number like a product ID (UPC, EAN). A QR code is two-dimensional (a grid of black and white squares) and can store much more data \u2014 URLs, contact info, WiFi credentials, calendar events, and more. QR codes also have built-in error correction, so they can be read even when partially damaged.",
  },
  {
    question: "Why might a QR code fail to scan from an image?",
    answer:
      "Images can fail to decode if the QR code is blurry, low resolution, low contrast, rotated, or has perspective distortion. Screenshots with compression artifacts are also common failures. Qrigo's upload scanner solves this with a multi-stage pipeline that tries 8 different image processing variants \u2014 including grayscale, contrast enhancement, sharpening, binarization, and rotation corrections \u2014 approaching the reliability of Google Lens.",
  },
];

const faqLd = faqItems.map((item) => ({
  "@type": "Question" as const,
  name: item.question,
  acceptedAnswer: {
    "@type": "Answer" as const,
    text: item.answer,
  },
}));

export { faqItems, faqLd };

export function ScanFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
      <p className="text-sm text-neutral-500 mb-6">
        Everything you need to know about scanning QR codes and barcodes.
      </p>
      <div className="space-y-2">
        {faqItems.map((item, i) => (
          <details
            key={i}
            open={openIndex === i}
            onToggle={(e) => setOpenIndex((e.target as HTMLDetailsElement).open ? i : null)}
            className="group border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden transition-colors"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
              <span className="font-medium text-sm pr-4">{item.question}</span>
              <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-3">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
