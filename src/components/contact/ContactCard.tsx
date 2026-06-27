"use client";

import React, { useMemo, useEffect, useState } from "react";
import type { ContactCard as ContactCardData, ContactTemplate, ContactTheme } from "@/features/contact/types";
import { renderContactCardSVG } from "@/features/contact/templates";
import { renderQRSvg } from "@/qr/renderer";
import { getCardTheme } from "@/qr/themes";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadContactCardPNG, downloadContactCardSVG, downloadVCF, sanitizeContactFilename } from "@/features/contact/export";
import { generateVCF } from "@/features/contact/validation";

interface ContactCardViewProps {
  card: ContactCardData;
  template: ContactTemplate;
  theme: ContactTheme;
  qrColors: string[];
}

export function ContactCardView({ card, template, theme, qrColors }: ContactCardViewProps) {
  const [svgUrl, setSvgUrl] = useState<string>("");

  const vcfContent = useMemo(() => generateVCF(card), [card]);

  const qrSvg = useMemo(() => {
    if (!card.firstName && !card.lastName && !card.company) return "";
    return renderQRSvg({
      data: vcfContent,
      theme: getCardTheme("instagram"),
      moduleSize: 6,
      dotSize: 4,
      errorCorrection: "H",
    });
  }, [vcfContent]);

  const svgString = useMemo(() => {
    if (!qrSvg) return "";
    return renderContactCardSVG(card, template, theme, `data:image/svg+xml;base64,${btoa(qrSvg)}`);
  }, [card, template, theme, qrSvg]);

  useEffect(() => {
    if (!svgString) { setSvgUrl(""); return; }
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setSvgUrl(url);
    return () => { if (svgUrl) URL.revokeObjectURL(svgUrl); };
  }, [svgString]);

  const filename = sanitizeContactFilename(card);

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "My Contact Card", text: "Check out my contact card!" }); } catch { /* ignore */ }
    }
  };

  if (!qrSvg) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-neutral-500 text-sm">Enter contact data to generate your card</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">
        {svgUrl && <img src={svgUrl} alt="Contact Card" className="w-full" />}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="gradient" size="sm" onClick={() => downloadContactCardPNG(svgString, filename)} className="gap-1.5">
          <Download className="w-3.5 h-3.5" /> PNG
        </Button>
        <Button variant="outline" size="sm" onClick={() => downloadContactCardSVG(svgString, filename)} className="gap-1.5">
          <Download className="w-3.5 h-3.5" /> SVG
        </Button>
        <Button variant="outline" size="sm" onClick={() => downloadVCF(vcfContent, filename)} className="gap-1.5">
          <Download className="w-3.5 h-3.5" /> VCF
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5">
          <Share2 className="w-3.5 h-3.5" /> Share
        </Button>
      </div>
    </div>
  );
}
