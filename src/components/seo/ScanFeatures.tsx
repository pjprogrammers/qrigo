"use client";

import { QrCode, Scan, Camera, Upload, Smartphone, Globe, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Live Camera Scan",
    description: "Scan QR codes and barcodes in real time using your device camera. Supports flash and front/back camera switching.",
  },
  {
    icon: Upload,
    title: "Upload Image Scan",
    description: "Upload screenshots or photos of codes. Multi-stage decoder tries 8 image processing variants for maximum reliability.",
  },
  {
    icon: QrCode,
    title: "QR Code Support",
    description: "Decodes URLs, emails, phone numbers, SMS, WhatsApp, WiFi, locations, vCards, calendar events, and plain text.",
  },
  {
    icon: Scan,
    title: "Barcode Support",
    description: "Supports EAN-13, EAN-8, UPC-A, UPC-E, Code 128, ITF-14, Codabar, plus automatic detection of DataMatrix, PDF417, and Aztec.",
  },
  {
    icon: Smartphone,
    title: "Works on Any Device",
    description: "Fully responsive. Works on phones, tablets, and desktops. No app installation required \u2014 everything runs in your browser.",
  },
  {
    icon: Shield,
    title: "100% Free & Private",
    description: "No sign-up, no ads, no tracking. All scanning happens locally in your browser. Your images are never uploaded to any server.",
  },
];

export function ScanFeaturesSection() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-xl font-bold mb-2">Why Use Qrigo Scanner</h2>
      <p className="text-sm text-neutral-500 mb-8">
        A powerful, privacy-first scanner that works everywhere.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
