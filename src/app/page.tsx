"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, QrCode, Scan, History, Heart, Settings as SettingsIcon, Sparkles, Palette, Download, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { Scene } from "@/components/three/Scene";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

function FeatureCard({ icon, title, desc, i }: { icon: React.ReactNode; title: string; desc: string; i: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/70 dark:to-pink-950/70 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Qrigo"
        description="Create QR codes, barcodes, WiFi QR codes, business cards, and scan QR codes online for free."
        url={process.env.NEXT_PUBLIC_SITE_URL || "https://qrigo.vercel.app"}
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
            answer: "With Qrigo, creating a QR Code is free and easy. Go to the QR Code Generator page, select the type of data you want to encode (URL, text, email, etc.), enter your content, and your QR Code is generated instantly. No signup required."
          },
          {
            question: "How do I create a barcode?",
            answer: "Use Qrigo's Barcode Generator to create Code128, EAN13, EAN8, UPC-A, UPC-E, ITF, and Codabar barcodes. Enter your data, choose the format, and download your barcode as PNG, SVG, JPEG, or WebP."
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
            question: "Is Qrigo free to use?",
            answer: "Yes, Qrigo is completely free. All QR code and barcode generation happens in your browser with no server uploads. No account or signup is required."
          },
        ]}
      />
      <Scene />
      <div className="min-h-screen">
        <motion.section
          initial="hidden"
          animate="visible"
          className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 relative"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-orange-500/20 text-sm font-medium text-neutral-700 dark:text-neutral-950 border border-transparent dark:border-white/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              All-in-One QR & Barcode Platform
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight dark:text-neutral-800"
            >
              Free QR Code & Barcode Generator
              <br />
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Create & Scan Codes Online
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Create QR codes, barcodes, WiFi QR codes, and business card QR codes online for free.
              Scan with your camera. No signup required.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/generate">
                <Button variant="gradient" size="lg" className="gap-2 text-base px-8 py-6 shadow-lg shadow-purple-500/25">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/scan">
                <Button variant="outline" size="lg" className="gap-2 text-base px-8 py-6 dark:border-neutral-700 dark:text-neutral-600 dark:hover:bg-neutral-800">
                  <Scan className="w-5 h-5" />
                  Open Scanner
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-4 sm:px-6 relative"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight dark:text-neutral-800">Everything You Need</h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">A complete QR and barcode platform.</p>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <QrCode className="w-6 h-6" />, title: "QR Generator", desc: "URL, Text, Email, Phone, SMS, WhatsApp, WiFi, Location, Event, vCard" },
                { icon: <Scan className="w-6 h-6" />, title: "QR & Barcode Scanner", desc: "Scan with your camera. Supports QR, EAN, UPC, Code128, ITF, Codabar" },
                { icon: <Palette className="w-6 h-6" />, title: "Beautiful Themes", desc: "Instagram-style gradients, custom colors, and card themes." },
                { icon: <Download className="w-6 h-6" />, title: "Export Formats", desc: "Download as PNG, SVG, JPEG, or WebP in high resolution." },
                { icon: <History className="w-6 h-6" />, title: "History & Favorites", desc: "All your generated codes and scans saved locally." },
                { icon: <Zap className="w-6 h-6" />, title: "Instant & Private", desc: "All processing happens in your browser. No server uploads." },
              ].map((feature, i) => (
                <FeatureCard key={i} icon={feature.icon} title={feature.title} desc={feature.desc} i={i} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-4 sm:px-6 relative"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-12 shadow-2xl shadow-purple-500/20"
            >
              <h2 className="text-3xl font-bold text-white tracking-tight">Ready to Get Started?</h2>
              <p className="mt-4 text-white/80 text-lg">No sign-up required. Everything runs in your browser.</p>
              <Link href="/generate">
                <Button size="lg" className="mt-8 bg-white text-neutral-900 hover:bg-neutral-100 gap-2 text-base px-8 py-6 shadow-lg">
                  Start Creating <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
