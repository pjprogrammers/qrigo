"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, QrCode, Scan, History, Heart, Settings as SettingsIcon, Sparkles, Palette, Download, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";
import { FAQSchema } from "@/components/seo/FAQSchema";

export default function Home() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Qrify"
        description="Create QR codes, barcodes, WiFi QR codes, business cards, and scan QR codes online for free."
        url={process.env.NEXT_PUBLIC_SITE_URL || "https://qrify.vercel.app"}
        applicationCategory="UtilityApplication"
        operatingSystem="Web"
      />
      <FAQSchema
        items={[
          {
            question: "What is a QR Code?",
            answer: "A QR Code (Quick Response code) is a two-dimensional barcode that can be scanned by smartphones and dedicated scanners. It stores data such as URLs, text, contact information, WiFi credentials, and more."
          },
          {
            question: "How do I create a QR Code?",
            answer: "With Qrify, creating a QR Code is free and easy. Go to the QR Code Generator page, select the type of data you want to encode (URL, text, email, etc.), enter your content, and your QR Code is generated instantly. No signup required."
          },
          {
            question: "How do I create a barcode?",
            answer: "Use Qrify's Barcode Generator to create Code128, EAN13, EAN8, UPC-A, UPC-E, ITF, and Codabar barcodes. Enter your data, choose the format, and download your barcode as PNG, SVG, JPEG, or WebP."
          },
          {
            question: "How do I create a WiFi QR code?",
            answer: "Go to the WiFi QR Code Generator, enter your network name (SSID), select the security type (WPA, WEP, or none), and enter your password. The generated QR code lets others connect to your WiFi with a single scan."
          },
          {
            question: "How do I create a business card QR code?",
            answer: "Use the Business Card QR Generator to create a vCard QR code. Fill in your name, phone, email, company, and other details. The QR code saves your contact info directly to the scanner's address book."
          },
          {
            question: "Is Qrify free to use?",
            answer: "Yes, Qrify is completely free. All QR code and barcode generation happens in your browser with no server uploads. No account or signup is required."
          },
        ]}
      />
      <div className="min-h-screen">
        <section className="pt-24 md:pt-32 pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-sm font-medium text-neutral-700 mb-6">
              <Sparkles className="w-4 h-4 text-purple-500" />
              All-in-One QR & Barcode Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Free QR Code & Barcode Generator
              <br />
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Create & Scan Codes Online
              </span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Create QR codes, barcodes, WiFi QR codes, and business card QR codes online for free.
              Scan with your camera. No signup required.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/generate">
                <Button variant="gradient" size="lg" className="gap-2 text-base px-8 py-6">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/scan">
                <Button variant="outline" size="lg" className="gap-2 text-base px-8 py-6">
                  <Scan className="w-5 h-5" />
                  Open Scanner
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Everything You Need</h2>
              <p className="mt-4 text-neutral-600 max-w-xl mx-auto">A complete QR and barcode platform.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <QrCode className="w-6 h-6" />, title: "QR Generator", desc: "URL, Text, Email, Phone, SMS, WhatsApp, WiFi, Location, Event, vCard" },
                { icon: <Scan className="w-6 h-6" />, title: "QR & Barcode Scanner", desc: "Scan with your camera. Supports QR, EAN, UPC, Code128, ITF, Codabar" },
                { icon: <Palette className="w-6 h-6" />, title: "Beautiful Themes", desc: "Instagram-style gradients, custom colors, and card themes." },
                { icon: <Download className="w-6 h-6" />, title: "Export Formats", desc: "Download as PNG, SVG, JPEG, or WebP in high resolution." },
                { icon: <History className="w-6 h-6" />, title: "History & Favorites", desc: "All your generated codes and scans saved locally." },
                { icon: <Zap className="w-6 h-6" />, title: "Instant & Private", desc: "All processing happens in your browser. No server uploads." },
              ].map((feature, i) => (
                <div key={i} className="rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-12 shadow-2xl">
              <h2 className="text-3xl font-bold text-white tracking-tight">Ready to Get Started?</h2>
              <p className="mt-4 text-white/80 text-lg">No sign-up required. Everything runs in your browser.</p>
              <Link href="/generate">
                <Button size="lg" className="mt-8 bg-white text-neutral-900 hover:bg-neutral-100 gap-2 text-base px-8 py-6">
                  Start Creating <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
