"use client";

import { Camera, Upload, Scan, CheckCircle2 } from "lucide-react";

const stepsCamera = [
  {
    icon: Camera,
    title: "Open the scanner",
    description: "Select the Camera tab and choose QR Code or Barcode mode depending on what you need to scan.",
  },
  {
    icon: Scan,
    title: "Point at the code",
    description: "Hold your device steady and center the QR code or barcode within the scanning frame. Maintain a distance of about 15\u201330 cm (6\u201312 inches).",
  },
  {
    icon: CheckCircle2,
    title: "Auto-detection",
    description: "The code is decoded instantly as soon as it is recognized. A notification shows the content type and decoded data.",
  },
];

const stepsUpload = [
  {
    icon: Upload,
    title: "Switch to Upload tab",
    description: "Click the Upload tab at the top of the scanner. You can also drag and drop an image file directly onto the upload area.",
  },
  {
    icon: Scan,
    title: "Multi-stage decoding",
    description: "The image is processed through 8 decoding attempts: original, grayscale, high contrast, sharpened, threshold, and rotations of 90\u00b0, 180\u00b0, and 270\u00b0 using both ZXing and jsQR libraries.",
  },
  {
    icon: CheckCircle2,
    title: "View and act on results",
    description: "The decoded content appears with relevant action buttons \u2014 open URLs, copy text, save contacts, call phone numbers, or share results.",
  },
];

export function ScanHowToSection() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-xl font-bold mb-2">How to Scan Codes</h2>
      <p className="text-sm text-neutral-500 mb-8">
        Two ways to scan QR codes and barcodes using Qrigo.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Camera className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-sm">Scan with Camera</h3>
          </div>
          <ol className="space-y-4">
            {stepsCamera.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Upload className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-sm">Scan from Image Upload</h3>
          </div>
          <ol className="space-y-4">
            {stepsUpload.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <HowToSchemas />
    </section>
  );
}

function HowToSchemas() {
  const schemaCamera = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Scan a QR Code Using Your Camera",
    description: "Learn how to scan any QR code or barcode using Qrigo\u2019s online scanner with your device camera.",
    totalTime: "PT1M",
    tool: [{ "@type": "HowToTool", name: "Smartphone, tablet, or computer with a camera" }],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Open Qrigo scanner",
        text: "Navigate to the scanner page at qrigo.vercel.app/scan. Select the Camera tab and choose QR Code or Barcode mode.",
        url: "https://qrigo.vercel.app/scan",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Point at the code",
        text: "Hold your device steady and center the QR code or barcode within the scanning frame. Keep about 15\u201330 cm distance for best results.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "View decoded content",
        text: "The code is decoded automatically. The result appears with action buttons to open URLs, copy text, save contacts, or share the content.",
      },
    ],
  };

  const schemaUpload = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Scan a QR Code from an Uploaded Image",
    description: "Scan a QR code or barcode from a screenshot, photo, or any image file using Qrigo\u2019s multi-stage image decoder.",
    totalTime: "PT2M",
    tool: [{ "@type": "HowToTool", name: "Computer or smartphone with a web browser" }],
    supply: [{ "@type": "HowToSupply", name: "Image file containing a QR code or barcode" }],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Open Qrigo scanner",
        text: "Go to qrigo.vercel.app/scan. Click the Upload tab to switch to image upload mode.",
        url: "https://qrigo.vercel.app/scan",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Upload your image",
        text: "Drag and drop an image file or click the upload area to browse. Supported formats include PNG, JPG, and WebP.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Automatic multi-stage decoding",
        text: "The scanner processes the image through 8 variants: original, grayscale, high contrast, sharpened, threshold, and rotated (90\u00b0, 180\u00b0, 270\u00b0) using both ZXing and jsQR engines for maximum reliability.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "View and use the result",
        text: "The decoded content appears with context-aware action buttons \u2014 open a URL, copy to clipboard, save a contact, call a number, or share the result.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCamera) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaUpload) }}
      />
    </>
  );
}
