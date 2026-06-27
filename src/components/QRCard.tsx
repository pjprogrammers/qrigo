"use client";

import React, { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { useQRStore } from "@/store/qrStore";
import { getCardTheme } from "@/qr/themes";
import { getPlatform } from "@/qr/platforms";
import { renderQRSvg } from "@/qr/renderer";
import { downloadPng, downloadSvg } from "@/qr/export";
import { Download, Share2, Globe, Mail, Phone, Wifi, MessageCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QRCard() {
  const {
    data, theme: themeId, colors, moduleSize, dotSize, errorCorrection,
    platform, qrType, username, textMode, customText, uppercase,
  } = useQRStore();

  const cardTheme = getCardTheme(themeId);
  const platformPreset = getPlatform(platform);
  const [svgUrl, setSvgUrl] = useState<string>("");

  const effectiveColors = colors.length > 0 ? colors : cardTheme.qrColors;
  const logoColor = effectiveColors[0] || "#000000";
  const effectivePlatform = platform !== "none" ? platform : "none";

  const svgString = useMemo(() => {
    if (!data) return "";
    return renderQRSvg({
      data,
      theme: cardTheme,
      moduleSize,
      dotSize,
      errorCorrection,
      platform: effectivePlatform,
      logoColor,
    });
  }, [data, cardTheme, moduleSize, dotSize, errorCorrection, effectivePlatform, logoColor]);

  useEffect(() => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setSvgUrl(url);
    return () => {
      URL.revokeObjectURL(url);
      setSvgUrl("");
    };
  }, [svgString]);

  const handleDownload = useCallback(() => {
    if (svgString) downloadPng(svgString, `qrify-${username || "qrcode"}`, 1024);
  }, [svgString, username]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "My QR Code", text: "Check out my QR code!", url: window.location.href }); } catch { /* ignore */ }
    }
  }, []);

  const getIcon = () => {
    switch (qrType) {
      case "url": return <Globe className="w-5 h-5" />;
      case "email": return <Mail className="w-5 h-5" />;
      case "phone": return <Phone className="w-5 h-5" />;
      case "wifi": return <Wifi className="w-5 h-5" />;
      case "whatsapp": return <MessageCircle className="w-5 h-5" />;
      case "vcard": return <CreditCard className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  // Determine display text
  let displayText = "";
  if (textMode === "username" && username) {
    displayText = `${platformPreset.textPrefix}${username}`;
  } else if (textMode === "custom" && customText) {
    displayText = customText;
  }

  if (uppercase && displayText) {
    displayText = displayText.toUpperCase();
  }

  if (!data) return null;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      {/* Card with gradient background */}
      <div
        className="relative w-full rounded-2xl p-5 flex flex-col items-center shadow-2xl"
        style={{
          background: `linear-gradient(180deg, ${cardTheme.cardStart}, ${cardTheme.cardEnd})`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* White panel containing QR + text */}
        <div className="w-full bg-white rounded-xl p-4 flex flex-col items-center gap-3 shadow-inner">
          {/* QR Code */}
          <div className="rounded-lg overflow-hidden flex items-center justify-center bg-neutral-50 p-1">
            {svgUrl ? (
              <img src={svgUrl} alt="QR Code" width={240} height={240} className="rounded-md" />
            ) : (
              <div className="w-[240px] h-[240px] flex items-center justify-center text-neutral-400 text-sm">
                Generating...
              </div>
            )}
          </div>

          {/* Display text (username/custom) */}
          {displayText && (
            <div className="flex items-center gap-2 mt-1">
              {platform !== "none" && platform !== qrType && getIcon()}
              <span
                className="text-sm font-bold tracking-wide"
                style={{ color: logoColor }}
              >
                {displayText}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button variant="gradient" onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
