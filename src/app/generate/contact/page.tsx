"use client";

import React from "react";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactPreview } from "@/components/contact/ContactPreview";
import { ContactTemplatePicker } from "@/components/contact/ContactTemplatePicker";
import { CompanyLogoUploader } from "@/components/contact/CompanyLogoUploader";
import { DownloadVCFButton } from "@/components/contact/DownloadVCFButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Settings, Download, QrCode, Eye } from "lucide-react";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { getDefaultContact, hasContactData } from "@/features/contact/generator";
import type { ContactCard, ContactTemplate, ContactTheme } from "@/features/contact/types";
import { renderQRSvg } from "@/qr/renderer";
import { getCardTheme } from "@/qr/themes";
import { generateVCF } from "@/features/contact/validation";
import { renderContactCardSVG } from "@/features/contact/templates";
import { downloadContactCardPNG, downloadContactCardPDF, downloadContactCardSVG, sanitizeContactFilename } from "@/features/contact/export";
import { downloadPng } from "@/lib/qr/export";

export default function ContactGeneratorPage() {
  const [tab, setTab] = React.useState("form");
  const [card, setCard] = React.useState<ContactCard>(getDefaultContact());
  const [template, setTemplate] = React.useState<ContactTemplate>("modern");
  const [theme, setTheme] = React.useState<ContactTheme>("corporate");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("qrigo_contact_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCard(parsed.card || getDefaultContact());
        setTemplate(parsed.template || "modern");
        setTheme(parsed.theme || "corporate");
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem("qrigo_contact_draft", JSON.stringify({ card, template, theme }));
      } catch {}
    }, 500);
    return () => clearTimeout(timeout);
  }, [card, template, theme]);

  const handleReset = React.useCallback(() => {
    setCard(getDefaultContact());
    setTemplate("modern");
    setTheme("corporate");
    localStorage.removeItem("qrigo_contact_draft");
  }, []);

  const hasData = hasContactData(card);
  const qrSvg = React.useMemo(() => {
    if (!hasData) return "";
    const vcf = generateVCF(card);
    return renderQRSvg({
      data: vcf,
      theme: getCardTheme("instagram"),
      moduleSize: 6,
      dotSize: 4,
      errorCorrection: "H",
    });
  }, [card, hasData]);

  const handleSaveToHistory = React.useCallback(async () => {
    if (!hasData) return;
    const { saveGeneratedCode } = await import("@/lib/db/index");
    await saveGeneratedCode({
      id: crypto.randomUUID(),
      type: "qr",
      format: "contact",
      data: generateVCF(card),
      displayText: `${card.firstName} ${card.lastName}`.trim() || card.company || "Contact Card",
      options: { template, theme },
      createdAt: Date.now(),
      favorite: false,
    });
  }, [hasData, card, template, theme]);

  const handleDownloadPNG = () => {
    if (!hasData) return;
    const svg = renderContactCardSVGWithQR();
    const filename = sanitizeContactFilename(card);
    downloadContactCardPNG(svg, filename);
  };

  const handleDownloadPDF = () => {
    if (!hasData) return;
    const svg = renderContactCardSVGWithQR();
    const filename = sanitizeContactFilename(card);
    downloadContactCardPDF(svg, filename);
  };

  React.useEffect(() => {
    const handler = () => handleSaveToHistory();
    window.addEventListener("contact-save", handler);
    return () => window.removeEventListener("contact-save", handler);
  }, [handleSaveToHistory]);

  const renderContactCardSVGWithQR = () => {
    return renderContactCardSVG(card, template, theme, `data:image/svg+xml;base64,${btoa(qrSvg)}`);
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/generate">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">Contact Card Generator</h1>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-neutral-400">
                  Clear
                </Button>
              </div>
              <p className="text-sm text-neutral-500">Create vCard QR codes with beautiful business cards</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-8">
            <div className="space-y-6">
              <ContactForm card={card} onChange={setCard} />
            </div>

            <div className="space-y-6">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="form" className="gap-1"><Eye className="w-3 h-3" /> Preview</TabsTrigger>
                  <TabsTrigger value="style" className="gap-1"><Palette className="w-3 h-3" /> Style</TabsTrigger>
                  <TabsTrigger value="export" className="gap-1"><Download className="w-3 h-3" /> Export</TabsTrigger>
                  <TabsTrigger value="qr" className="gap-1"><QrCode className="w-3 h-3" /> QR</TabsTrigger>
                </TabsList>

                <TabsContent value="form" className="mt-6">
                  <Card className="p-6">
                    <ContactPreview card={card} template={template} theme={theme} qrSvg={qrSvg} />
                  </Card>
                </TabsContent>

                <TabsContent value="style" className="mt-6 space-y-6">
                  <Card className="p-6">
                    <ContactTemplatePicker
                      template={template}
                      theme={theme}
                      onTemplateChange={setTemplate}
                      onThemeChange={setTheme}
                    />
                  </Card>
                  <Card className="p-6">
                    <CompanyLogoUploader
                      logo={card.logo || ""}
                      onChange={(logo) => setCard((prev: ContactCard) => ({ ...prev, logo }))}
                    />
                  </Card>
                </TabsContent>

                <TabsContent value="export" className="mt-6 space-y-6">
                  <Card className="p-6 space-y-3">
                    <p className="text-sm font-medium">Download Card</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={handleDownloadPNG} className="gap-1.5">
                        <Download className="w-3.5 h-3.5" /> PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        if (!hasData) return;
                        const svg = renderContactCardSVGWithQR();
                        const filename = sanitizeContactFilename(card);
                        downloadContactCardSVG(svg, filename);
                      }} className="gap-1.5">
                        <Download className="w-3.5 h-3.5" /> SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="gap-1.5">
                        <Download className="w-3.5 h-3.5" /> PDF
                      </Button>
                    </div>
                  </Card>
                  <Card className="p-6 space-y-3">
                    <p className="text-sm font-medium">Download vCard (.vcf)</p>
                    <DownloadVCFButton card={card} variant="gradient" size="default" />
                  </Card>
                  <Card className="p-6">
                    <Button onClick={handleSaveToHistory} variant="outline" className="w-full gap-2" disabled={!hasData}>
                      <Download className="w-4 h-4" />
                      Save to History
                    </Button>
                  </Card>
                  <p className="text-[10px] text-neutral-400 text-center">Press Ctrl+S to quickly save to history</p>
                </TabsContent>

                <TabsContent value="qr" className="mt-6">
                  <Card className="p-6">
                    <div className="flex flex-col items-center gap-4">
                      <h3 className="text-sm font-medium">vCard QR Code</h3>
                      <p className="text-xs text-neutral-500 text-center">Scan this QR to save the contact on any device</p>
                      {hasData && qrSvg ? (
                        <img
                          src={`data:image/svg+xml;base64,${btoa(qrSvg)}`}
                          alt="vCard QR Code"
                          className="w-48 h-48 rounded-xl border border-neutral-200"
                        />
                      ) : (
                        <div className="w-48 h-48 rounded-xl bg-neutral-100 flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-neutral-300" />
                        </div>
                      )}
                      {hasData && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              downloadPng(qrSvg, sanitizeContactFilename(card), 1024);
                            }}
                            className="gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" /> Download QR
                          </Button>
                        </div>
                      )}
                      {hasData && (
                        <div className="w-full space-y-3 mt-4">
                          <div className="border-t border-neutral-200 pt-4">
                            <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Compatible with</h4>
                            <div className="flex flex-wrap gap-2">
                              {[
                                { name: "Apple Contacts", desc: "iOS / macOS" },
                                { name: "Google Contacts", desc: "Android / Web" },
                                { name: "Outlook", desc: "Windows / Web" },
                              ].map((p) => (
                                <div key={p.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-100 text-xs">
                                  <span className="font-medium">{p.name}</span>
                                  <span className="text-neutral-400">{p.desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-xs text-blue-800">
                              <strong>Tip:</strong> Save the VCF file to your device, then open it to add the contact.
                              On Android, open the .vcf file with Contacts. On iOS, use the Files app or share via AirDrop.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RelatedTools current="contact" />
        </div>
      </main>
    </>
  );
}
