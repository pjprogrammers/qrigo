"use client";

import React from "react";
import Link from "next/link";
import { useQRStore } from "@/store/qrStore";
import { BarcodeCard } from "@/components/BarcodeCard";
import { DownloadButton } from "@/components/DownloadButton";
import { barcodePresets, barcodeCardThemes } from "@/barcode/presets";
import { detectBarcodeFormat } from "@/barcode/validation";
import { saveGeneratedCode } from "@/lib/db/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Barcode, ArrowLeft, Hash, Download, Palette } from "lucide-react";
import { RelatedTools } from "@/components/seo/RelatedTools";

const barcodeFormats = [
  { id: "CODE128", name: "Code 128", desc: "Alphanumeric" },
  { id: "EAN13", name: "EAN-13", desc: "13-digit product" },
  { id: "EAN8", name: "EAN-8", desc: "8-digit product" },
  { id: "UPCA", name: "UPC-A", desc: "12-digit retail" },
  { id: "UPCE", name: "UPC-E", desc: "6-digit retail" },
  { id: "ITF", name: "ITF-14", desc: "Shipping" },
  { id: "CODABAR", name: "Codabar", desc: "Logistics" },
] as const;

export default function BarcodeGeneratorPage() {
  const [tab, setTab] = React.useState("format");
  const {
    barcodeFormat, setBarcodeFormat,
    barcodeShowText, setBarcodeShowText,
    barcodeHeight, setBarcodeHeight,
    barcodeCardTheme, setBarcodeCardTheme,
    data, setData,
    setCodeType,
  } = useQRStore();

  React.useEffect(() => { setCodeType("barcode"); }, []);

  React.useEffect(() => { setCodeType("barcode"); }, []);

  const handleBarcodeFormatChange = (fmt: string) => {
    setBarcodeFormat(fmt as any);
  };

  const handleBarcodeDataChange = (value: string) => {
    setData(value);
    const detected = detectBarcodeFormat(value);
    setBarcodeFormat(detected as any);
  };

  const handleSave = async () => {
    if (!data) return;
    await saveGeneratedCode({
      id: crypto.randomUUID(),
      type: "barcode",
      format: barcodeFormat,
      data,
      displayText: data,
      options: { format: barcodeFormat, height: barcodeHeight, showText: barcodeShowText },
      createdAt: Date.now(),
      favorite: false,
    });
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
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Barcode Generator</h1>
              <p className="text-sm text-neutral-500">Generate barcodes in multiple formats</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-8">
            <div className="space-y-6">
              <Card className="p-6">
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input
                    value={data}
                    onChange={(e) => handleBarcodeDataChange(e.target.value)}
                    placeholder="Enter barcode data..."
                  />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex flex-col items-center">
                  {data ? <BarcodeCard /> : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                        <Barcode className="w-8 h-8 text-neutral-300" />
                      </div>
                      <p className="text-neutral-500 text-sm">Enter data to generate your barcode</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="format" className="gap-1"><Hash className="w-3 h-3" /> Format</TabsTrigger>
                  <TabsTrigger value="style" className="gap-1"><Palette className="w-3 h-3" /> Style</TabsTrigger>
                  <TabsTrigger value="export" className="gap-1"><Download className="w-3 h-3" /> Export</TabsTrigger>
                </TabsList>

                <TabsContent value="format" className="mt-6 space-y-6">
                  <Card className="p-6">
                    <div className="space-y-3">
                      <Label>Barcode Format</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {barcodeFormats.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleBarcodeFormatChange(p.id)}
                            className={`flex flex-col items-start gap-0.5 p-3 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                              barcodeFormat === p.id ? "border-neutral-900 bg-neutral-50 shadow-sm" : "border-neutral-200 bg-white"
                            }`}
                          >
                            <span className="text-sm font-semibold">{p.name}</span>
                            <span className="text-[10px] text-neutral-500">{p.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Bar Height: {barcodeHeight}px</Label>
                      <input type="range" min={40} max={200} value={barcodeHeight} onChange={(e) => setBarcodeHeight(Number(e.target.value))} className="w-full" />
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="barcodeShowText" checked={barcodeShowText} onChange={(e) => setBarcodeShowText(e.target.checked)} className="rounded" />
                      <Label htmlFor="barcodeShowText">Show human-readable text</Label>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="style" className="mt-6 space-y-6">
                  <Card className="p-6">
                    <div className="space-y-3">
                      <Label>Card Theme</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {barcodeCardThemes.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setBarcodeCardTheme(t.id)}
                            className={`relative w-full aspect-[3/2] rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${
                              barcodeCardTheme === t.id ? "border-neutral-900 scale-105 shadow-md" : "border-transparent"
                            }`}
                            title={t.name}
                          >
                            <div className="w-full h-full rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(180deg, ${t.cardStart}, ${t.cardEnd})` }}>
                              <span className="text-[10px] font-bold" style={{ color: t.textColor }}>{t.name}</span>
                            </div>
                            {barcodeCardTheme === t.id && (
                              <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="export" className="mt-6 space-y-6">
                  <Card className="p-6">
                    <DownloadButton />
                  </Card>
                  <Card className="p-6">
                    <Button onClick={handleSave} variant="outline" className="w-full gap-2">
                      <Download className="w-4 h-4" />
                      Save to History
                    </Button>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RelatedTools current="barcode" />
        </div>
      </main>
    </>
  );
}
