"use client";

import React from "react";
import Link from "next/link";
import { QrCode, Barcode, CreditCard, ArrowRight, Sparkles, Zap, Shield, Download, Palette } from "lucide-react";
import { RelatedTools } from "@/components/seo/RelatedTools";
import AnimatedGradientText from "@/components/animations/animated-gradient-text";
import TiltCard from "@/components/animations/tilt-card";
import FloatingElement from "@/components/animations/floating-element";
import StaggerContainer, { StaggerItem } from "@/components/animations/stagger-container";
import EntranceWrapper from "@/components/animations/entrance-wrapper";
import GlowCard from "@/components/animations/glow-card";
import SparkleEffect from "@/components/animations/sparkle-effect";
import PulseRing from "@/components/animations/pulse-ring";
import BouncyCard from "@/components/animations/bouncy-card";
import ScrollReveal from "@/components/animations/scroll-reveal";
import AnimatedBadge from "@/components/animations/animated-badge";
import ParticleCanvas from "@/components/animations/particle-canvas";
import MouseGlow from "@/components/animations/mouse-glow";
import MicroButton from "@/components/animations/micro-button";
import AnimatedIcon from "@/components/animations/animated-icon";
import GradientBorder from "@/components/animations/gradient-border";
import HoverScale from "@/components/animations/hover-scale";
import ShimmerDivider from "@/components/animations/shimmer-divider";
import Counter from "@/components/animations/counter";
import RippleEffect from "@/components/animations/ripple-effect";
import MorphingShape from "@/components/animations/morphing-shape";
import Typewriter from "@/components/animations/typewriter";
import StepFlow from "@/components/animations/step-flow";
import { cn } from "@/lib/utils";
import StructuredDataAggregator from "@/components/seo/schemas/StructuredDataAggregator"
import HreflangTags from "@/components/seo/components/HreflangTags"
import RobotsMeta from "@/components/seo/components/RobotsMeta"

const features = [
  { icon: Zap, label: "Instant Generation", desc: "No signup, no server uploads" },
  { icon: Palette, label: "Beautiful Themes", desc: "Instagram-style gradients & colors" },
  { icon: Download, label: "Multiple Formats", desc: "PNG, SVG, JPEG, WebP export" },
  { icon: Shield, label: "100% Private", desc: "All processing in your browser" },
];

const cardData = [
  {
    href: "/generate/qr",
    gradient: "from-purple-600 via-pink-500 to-orange-400",
    icon: QrCode,
    title: "QR Code",
    desc: "URL, Text, Email, Phone, SMS, WhatsApp, WiFi, Location, Event, vCard",
    glowColor: "rgba(168,85,247,0.15)",
  },
  {
    href: "/generate/barcode",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    icon: Barcode,
    title: "Barcode",
    desc: "Code128, EAN13, EAN8, UPCA, UPCE, ITF, Codabar",
    glowColor: "rgba(249,115,22,0.15)",
  },
  {
    href: "/generate/contact",
    gradient: "from-teal-500 via-cyan-500 to-blue-400",
    icon: CreditCard,
    title: "Contact Card",
    desc: "vCard with QR, business card preview, VCF download",
    glowColor: "rgba(20,184,166,0.15)",
  },
];

function GenerateJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://qrigo.vercel.app" },
          { "@type": "ListItem", position: 2, name: "Generate", item: "https://qrigo.vercel.app/generate" },
        ],
      },
      {
        "@type": "ItemList",
        name: "Free QR Code & Barcode Generators",
        description: "Choose from QR Code, Barcode, or Business Card QR generators.",
        numberOfItems: 3,
        itemListElement: [
          { "@type": "SiteNavigationElement", position: 1, name: "QR Code Generator", url: "https://qrigo.vercel.app/generate/qr" },
          { "@type": "SiteNavigationElement", position: 2, name: "Barcode Generator", url: "https://qrigo.vercel.app/generate/barcode" },
          { "@type": "SiteNavigationElement", position: 3, name: "Contact Card QR Generator", url: "https://qrigo.vercel.app/generate/contact" },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function GeneratePage() {
  return (
    <>
      <StructuredDataAggregator />
      <GenerateJsonLd />
      <main id="main-content" className="relative min-h-screen overflow-hidden">
        <ParticleCanvas particleCount={40} speed={0.2} className="fixed inset-0 -z-10" />

        <div className="relative">
          <MorphingShape className="top-20 right-10 -z-5" size={300} />
          <MorphingShape className="bottom-40 left-10 -z-5" size={250}
            colors={["rgba(236,72,153,0.12)", "rgba(251,146,60,0.1)", "rgba(168,85,247,0.08)"]}
          />

          <section className="relative pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <EntranceWrapper animation="fadeIn" delay={0}>
                <div className="flex flex-col items-center text-center mb-10">
                  <FloatingElement y={6} duration={4}>
                    <AnimatedBadge variant="gradient" className="mb-6">
                      <Sparkles className="w-3.5 h-3.5" />
                      Choose what to create
                    </AnimatedBadge>
                  </FloatingElement>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
                    <AnimatedGradientText>
                      Free QR Code & Barcode Generator
                    </AnimatedGradientText>
                  </h1>

                  <div className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto h-8">
                    <Typewriter
                      text={[
                        "Generate professional QR codes instantly",
                        "Create barcodes for any use case",
                        "Design digital business cards with QR",
                        "No signup required — works in your browser",
                      ]}
                      speed={40}
                      pauseDuration={2500}
                      loop
                    />
                  </div>
                </div>
              </EntranceWrapper>

              <ShimmerDivider className="mb-10" />
            </div>
          </section>

          <section className="px-4 sm:px-6 pb-12">
            <div className="max-w-5xl mx-auto">
              <StaggerContainer staggerDelay={0.12}>
                <div className="grid sm:grid-cols-3 gap-5 md:gap-6">
                  {cardData.map((card, i) => {
                    const Icon = card.icon;
                    return (
                      <StaggerItem key={card.href}>
                        <Link href={card.href} className="block h-full">
                          <HoverScale scale={1.02} y={-6}>
                            <MouseGlow glowSize={250} color={card.glowColor} glowOpacity={0.4}>
                              <SparkleEffect sparkleCount={5}>
                                <TiltCard tiltDegree={8}>
                                  <GlowCard hoverOnly>
                                    <RippleEffect>
                                      <div className="relative p-6 sm:p-7 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 h-full flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                          <PulseRing size={48} color={card.glowColor} ringCount={2}>
                                            <div className={cn(
                                              "w-12 h-12 rounded-xl flex items-center justify-center",
                                              "bg-gradient-to-br shadow-lg",
                                              card.gradient,
                                              "text-white"
                                            )}>
                                              <Icon className="w-6 h-6" />
                                            </div>
                                          </PulseRing>
                                          <FloatingElement y={4} duration={3} delay={i * 0.3}>
                                            <div className={cn(
                                              "w-8 h-8 rounded-full flex items-center justify-center",
                                              "bg-neutral-100 dark:bg-neutral-800",
                                              "text-neutral-400 dark:text-neutral-500",
                                              "group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30",
                                              "group-hover:text-purple-500 transition-colors duration-300"
                                            )}>
                                              <ArrowRight className="w-4 h-4" />
                                            </div>
                                          </FloatingElement>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                                          {card.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1">
                                          {card.desc}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                          <span className="text-xs font-medium text-purple-500 dark:text-purple-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Start creating
                                            <ArrowRight className="w-3 h-3" />
                                          </span>
                                        </div>
                                      </div>
                                    </RippleEffect>
                                  </GlowCard>
                                </TiltCard>
                              </SparkleEffect>
                            </MouseGlow>
                          </HoverScale>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </div>
              </StaggerContainer>
            </div>
          </section>

          <ScrollReveal direction="up" delay={0.3}>
            <section className="px-4 sm:px-6 pb-12">
              <div className="max-w-5xl mx-auto">
                <div className="rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/30 border border-neutral-200/50 dark:border-neutral-800/50 p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                    {features.map((feat, i) => {
                      const Icon = feat.icon;
                      return (
                        <div key={feat.label} className="text-center">
                          <FloatingElement y={4} duration={3} delay={i * 0.2}>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/70 dark:to-pink-950/70 flex items-center justify-center mx-auto mb-3">
                              <AnimatedIcon animation="none" hoverAnimation="bounce">
                                <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              </AnimatedIcon>
                            </div>
                          </FloatingElement>
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{feat.label}</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">{feat.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <section className="px-4 sm:px-6 pb-16">
              <div className="max-w-3xl mx-auto">
                <StepFlow
                  steps={["Choose Type", "Customize Design", "Download & Share"]}
                  currentStep={0}
                  className="scale-90 sm:scale-100"
                />
                <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 mt-4">
                  Pick a code type above, then customize colors, themes, and export format
                </p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <section className="px-4 sm:px-6 pb-16">
              <div className="max-w-2xl mx-auto text-center">
                <div className="rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 sm:p-10 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
                  <ParticleCanvas particleCount={15} colors={['#ffffff', '#ffffff', '#ffffff']} speed={0.15} />
                  <div className="relative z-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      Ready to Create?
                    </h2>
                    <p className="text-white/80 text-sm sm:text-base mb-6">
                      No sign-up required. Everything runs in your browser.
                    </p>
                    <Link href="/generate/qr">
                      <MicroButton variant="gradient" size="lg">
                        <span className="inline-flex items-center gap-2">
                          Start Creating <ArrowRight className="w-4 h-4" />
                        </span>
                      </MicroButton>
                    </Link>
                    <div className="flex items-center justify-center gap-6 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          <Counter to={10} duration={2} suffix="+" />
                        </div>
                        <div className="text-xs text-white/70">QR Types</div>
                      </div>
                      <div className="w-px h-8 bg-white/20" />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          <Counter to={7} duration={2} suffix="+" />
                        </div>
                        <div className="text-xs text-white/70">Barcode Formats</div>
                      </div>
                      <div className="w-px h-8 bg-white/20" />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          <Counter to={4} duration={2} suffix="" />
                        </div>
                        <div className="text-xs text-white/70">Export Formats</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>

        <RelatedTools current="qr" />
      </main>
      <HreflangTags />
      <RobotsMeta />
    </>
  );
}
