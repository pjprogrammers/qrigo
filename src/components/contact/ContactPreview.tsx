"use client";

import React, { useMemo, useEffect, useState } from "react";
import type { ContactCard, ContactTemplate, ContactTheme } from "@/features/contact/types";
import { renderContactCardSVG } from "@/features/contact/templates";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadContactCardPNG, downloadContactCardSVG, sanitizeContactFilename } from "@/features/contact/export";

interface ContactPreviewProps {
  card: ContactCard;
  template: ContactTemplate;
  theme: ContactTheme;
  qrSvg?: string;
}

export function ContactPreview({ card, template, theme, qrSvg }: ContactPreviewProps) {
  const [svgUrl, setSvgUrl] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  const svgString = useMemo(() => {
    if (!card.firstName && !card.lastName && !card.company) return "";
    return renderContactCardSVG(card, template, theme, qrSvg);
  }, [card, template, theme, qrSvg]);

  useEffect(() => {
    if (!svgString) { setSvgUrl(""); return; }
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setSvgUrl(url);
    return () => { URL.revokeObjectURL(url); };
  }, [svgString]);

  const filename = sanitizeContactFilename(card);

  if (!svgString) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center mb-4">
          <Eye className="w-10 h-10 text-teal-500" />
        </div>
        <p className="text-neutral-600 font-medium">No preview yet</p>
        <p className="text-neutral-400 text-xs mt-1">Fill in your contact details above to see a live preview of your business card</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-full max-w-[320px] rounded-2xl overflow-hidden shadow-lg border border-neutral-200 cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setShowPreview(!showPreview)}
      >
        {svgUrl && (
          <img src={svgUrl} alt="Contact Card Preview" className="w-full" />
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => downloadContactCardPNG(svgString, filename)} className="gap-1.5">
          <Download className="w-3.5 h-3.5" /> PNG
        </Button>
        <Button variant="outline" size="sm" onClick={() => downloadContactCardSVG(svgString, filename)} className="gap-1.5">
          <Download className="w-3.5 h-3.5" /> SVG
        </Button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="max-w-md w-full max-h-[90vh] overflow-auto rounded-2xl" onClick={(e) => e.stopPropagation()}>
            {svgUrl && <img src={svgUrl} alt="Contact Card Full Preview" className="w-full" />}
          </div>
        </div>
      )}
    </div>
  );
}
