"use client";

import React from "react";
import Link from "next/link";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { Card } from "@/components/ui/card";
import { QrCode, Barcode, CreditCard } from "lucide-react";

function GenerateJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://qrify.vercel.app" },
          { "@type": "ListItem", position: 2, name: "Generate", item: "https://qrify.vercel.app/generate" },
        ],
      },
      {
        "@type": "ItemList",
        name: "Free QR Code & Barcode Generators",
        description: "Choose from QR Code, Barcode, or Business Card QR generators.",
        numberOfItems: 3,
        itemListElement: [
          { "@type": "SiteNavigationElement", position: 1, name: "QR Code Generator", url: "https://qrify.vercel.app/generate/qr" },
          { "@type": "SiteNavigationElement", position: 2, name: "Barcode Generator", url: "https://qrify.vercel.app/generate/barcode" },
          { "@type": "SiteNavigationElement", position: 3, name: "Contact Card QR Generator", url: "https://qrify.vercel.app/generate/contact" },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function GeneratePage() {
  return (
    <>
      <GenerateJsonLd />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Free QR Code & Barcode Generator</h1>
            <p className="text-sm text-neutral-500 mt-1">Choose what to create — QR codes, barcodes, or business card QR codes</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <Link href="/generate/qr">
              <Card className="p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <QrCode className="w-7 h-7 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">QR Code</h2>
                <p className="text-sm text-neutral-500">URL, Text, Email, Phone, SMS, WhatsApp, WiFi, Location, Event, vCard</p>
              </Card>
            </Link>
            <Link href="/generate/barcode">
              <Card className="p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Barcode className="w-7 h-7 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Barcode</h2>
                <p className="text-sm text-neutral-500">Code128, EAN13, EAN8, UPCA, UPCE, ITF, Codabar</p>
              </Card>
            </Link>
            <Link href="/generate/contact">
              <Card className="p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-7 h-7 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Contact Card</h2>
                <p className="text-sm text-neutral-500">vCard with QR, business card preview, VCF download</p>
              </Card>
            </Link>
          </div>
        </div>
        <RelatedTools current="qr" />
      </main>
    </>
  );
}
