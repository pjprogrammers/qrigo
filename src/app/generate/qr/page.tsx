"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQRStore } from "@/store/qrStore";
import { QRCard } from "@/components/QRCard";
import { ThemeSelector } from "@/components/ThemeSelector";
import { DownloadButton } from "@/components/DownloadButton";
import { getCardTheme } from "@/qr/themes";
import { platforms } from "@/qr/platforms";
import { generateQRData, getDisplayText } from "@/lib/qr/generator";
import { saveGeneratedCode } from "@/lib/db/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { QrCode, ArrowLeft, Palette, Settings, Download, Type, Globe, Mail, Phone, MessageSquare, MessageCircle, Wifi, MapPin, Calendar, CreditCard } from "lucide-react";
import { RelatedTools } from "@/components/seo/RelatedTools";

const qrTypes = [
  { id: "url", label: "URL", icon: Globe },
  { id: "text", label: "Text", icon: Type },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "sms", label: "SMS", icon: MessageSquare },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "location", label: "Location", icon: MapPin },
  { id: "event", label: "Event", icon: Calendar },
  { id: "vcard", label: "vCard", icon: CreditCard },
] as const;

function QRGeneratorPageInner() {
  const [tab, setTab] = React.useState("theme");

  const searchParams = useSearchParams();

  const {
    data, setData, url, setUrl,
    username, setUsername,
    qrType, setQRType,
    theme: themeId, setTheme, setColors,
    moduleSize, setModuleSize, dotSize, setDotSize,
    errorCorrection, setErrorCorrection,
    background, setBackground,
    textMode, setTextMode, customText, setCustomText,
    uppercase, setUppercase,
    platform, setPlatform,
    setCodeType,
  } = useQRStore();

  React.useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      const match = qrTypes.find((t) => t.id === typeParam);
      if (match) {
        setQRType(typeParam as any);
      }
    }
  }, [searchParams, setQRType]);

  React.useEffect(() => { setCodeType("qr"); }, [setCodeType]);

  const handleTypeChange = (typeId: string) => {
    setQRType(typeId as any);
    setData("");
    setUrl("");
    setUsername("");
  };

  const handleDataChange = (value: string) => {
    if (qrType === "url") {
      setUrl(value);
    } else {
      setData(value);
    }
  };

  const getQRData = () => {
    const value = currentData;
    if (!value) return "";
    if (qrType === "wifi" || qrType === "event") return value;
    return generateQRData(qrType, value);
  };

  const currentData = qrType === "url" ? url : data;

  const handleSave = async () => {
    if (!currentData) return;
    await saveGeneratedCode({
      id: crypto.randomUUID(),
      type: "qr",
      format: qrType,
      data: getQRData(),
      displayText: getDisplayText(qrType, currentData),
      options: { theme: themeId },
      createdAt: Date.now(),
      favorite: false,
    });
  };

  const getPlaceholder = () => {
    switch (qrType) {
      case "url": return "https://example.com";
      case "text": return "Enter your text...";
      case "email": return "email@example.com";
      case "phone": return "+1234567890";
      case "sms": return "Message body";
      case "whatsapp": return "Phone number with country code";
      case "wifi": return "WIFI:S:Network;T:WPA;P:password;;";
      case "location": return "19.0760, 72.8777";
      case "event": return "BEGIN:VEVENT\nSUMMARY:Event\nDTSTART:20240101T000000\nDTEND:20240101T010000\nEND:VEVENT";
      case "vcard": return "BEGIN:VCARD\nVERSION:3.0\nFN:Name\nTEL:+1234567890\nEMAIL:test@test.com\nEND:VCARD";
      default: return "Enter data...";
    }
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
              <h1 className="text-2xl font-bold tracking-tight">QR Code Generator</h1>
              <p className="text-sm text-neutral-500">Create QR codes for any use case</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-8">
            <div className="space-y-6">
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  {qrTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={type.id}
                        variant={qrType === type.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTypeChange(type.id)}
                        className="gap-1.5"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {type.label}
                      </Button>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-2">
                  <Label>Data</Label>
                  {qrType === "whatsapp" || qrType === "sms" || qrType === "phone" ? (
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 h-9 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-500 whitespace-nowrap">
                        {qrType === "whatsapp" ? "wa.me/" : qrType === "sms" ? "sms:" : "tel:"}
                      </div>
                      <Input
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder={getPlaceholder()}
                        className="flex-1"
                      />
                    </div>
                  ) : qrType === "url" ? (
                    <Input
                      value={url}
                      onChange={(e) => handleDataChange(e.target.value)}
                      placeholder={getPlaceholder()}
                    />
                  ) : (
                    <textarea
                      value={data}
                      onChange={(e) => handleDataChange(e.target.value)}
                      placeholder={getPlaceholder()}
                      className="flex h-24 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm"
                      rows={qrType === "vcard" || qrType === "event" || qrType === "wifi" ? 5 : 3}
                    />
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex flex-col items-center">
                  {currentData ? <QRCard /> : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                        <QrCode className="w-8 h-8 text-neutral-300" />
                      </div>
                      <p className="text-neutral-500 text-sm">Enter data to generate your QR card</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="theme" className="gap-1"><Palette className="w-3 h-3" /> Theme</TabsTrigger>
                  <TabsTrigger value="shapes" className="gap-1"><Settings className="w-3 h-3" /> Shape</TabsTrigger>
                  <TabsTrigger value="text" className="gap-1"><Type className="w-3 h-3" /> Text</TabsTrigger>
                  <TabsTrigger value="export" className="gap-1"><Download className="w-3 h-3" /> Export</TabsTrigger>
                </TabsList>

                <TabsContent value="theme" className="mt-6 space-y-6">
                  <Card className="p-6">
                    <ThemeSelector />
                  </Card>
                  <Card className="p-6">
                    <div className="space-y-3">
                      <Label>Platform Preset</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {platforms.filter(p => p.id !== "none").map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setPlatform(p.id as any);
                              const theme = getCardTheme(p.id);
                              setTheme(p.id);
                              setColors(theme.qrColors);
                            }}
                            className={`relative w-full aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-md flex flex-col items-center justify-center text-[10px] font-medium gap-1 ${
                              platform === p.id ? "border-neutral-900 scale-105 shadow-md" : "border-transparent"
                            }`}
                            style={{ background: `linear-gradient(135deg, ${p.cardGradient.join(", ")})` }}
                            title={p.name}
                          >
                            <span className="text-white text-[8px] opacity-80">{p.name}</span>
                            {platform === p.id && (
                              <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
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

                <TabsContent value="shapes" className="mt-6 space-y-6">
                  <Card className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Module Size: {moduleSize}px</Label>
                      <input type="range" min={6} max={16} value={moduleSize} onChange={(e) => setModuleSize(Number(e.target.value))} className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Label>Dot Size: {dotSize}px</Label>
                      <input type="range" min={Math.max(2, moduleSize - 6)} max={moduleSize - 1} value={dotSize} onChange={(e) => setDotSize(Number(e.target.value))} className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Label>Background</Label>
                      <div className="flex items-center gap-3">
                        <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} className="w-9 h-9 rounded-lg border border-neutral-200 cursor-pointer" />
                        <span className="text-sm text-neutral-500">{background}</span>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="space-y-2">
                      <Label>Error Correction</Label>
                      <div className="flex gap-2">
                        {(["L", "M", "Q", "H"] as const).map((ec) => (
                          <Button key={ec} variant={errorCorrection === ec ? "default" : "outline"} size="sm" onClick={() => setErrorCorrection(ec)}>
                            {ec} {ec === "L" ? "(7%)" : ec === "M" ? "(15%)" : ec === "Q" ? "(25%)" : "(30%)"}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="text" className="mt-6 space-y-6">
                  <Card className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Text Mode</Label>
                      <div className="flex gap-2">
                        <Button variant={textMode === "none" ? "default" : "outline"} size="sm" onClick={() => setTextMode("none")}>None</Button>
                        <Button variant={textMode === "username" ? "default" : "outline"} size="sm" onClick={() => setTextMode("username")}>Username</Button>
                        <Button variant={textMode === "custom" ? "default" : "outline"} size="sm" onClick={() => setTextMode("custom")}>Custom</Button>
                      </div>
                    </div>
                    {textMode === "custom" && (
                      <div className="space-y-2">
                        <Label>Custom Text</Label>
                        <Input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Enter custom text..." />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="uppercase" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded" />
                      <Label htmlFor="uppercase">Uppercase</Label>
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
          <RelatedTools current="qr" />
        </div>
      </main>
    </>
  );
}

export default function QRGeneratorPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-neutral-500">Loading...</p></div>}>
      <QRGeneratorPageInner />
    </React.Suspense>
  );
}
