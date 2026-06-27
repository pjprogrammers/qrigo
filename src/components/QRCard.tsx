"use client";

import React, { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { useQRStore } from "@/store/qrStore";
import { getCardTheme } from "@/qr/themes";
import { getPlatform } from "@/qr/platforms";
import { renderQRSvg } from "@/qr/renderer";
import { toPng } from "html-to-image";
import { PlatformLogo } from "@/components/PlatformLogo";
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
  const cardRef = useRef<HTMLDivElement>(null);

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
    const base64 = btoa(unescape(encodeURIComponent(svgString)));
    setSvgUrl(`data:image/svg+xml;base64,${base64}`);
  }, [svgString]);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 4,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = "qrify-card.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download card image", err);
    }
  }, []);

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
    <div className="flex flex-col items-center">
      {/* Exported card */}
      <div
        ref={cardRef}
        className="w-full rounded-xl overflow-hidden flex flex-col items-center"
        style={{
          background: `linear-gradient(180deg, ${cardTheme.cardStart}, ${cardTheme.cardEnd})`,
        }}
      >
        <div className="flex flex-col items-center p-4 w-full">
          {/* White card */}
          <div
            className="w-full max-w-[360px] rounded-[20px] flex flex-col"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* QR Code - always square */}
            <div className="w-full aspect-square p-5 flex flex-col">
              <div className="flex-1 rounded-[18px] overflow-hidden flex items-center justify-center">
                {svgUrl ? (
                  <img src={svgUrl} alt="QR Code" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                    Generating...
                  </div>
                )}
              </div>
            </div>

            {/* Text at bottom center */}
            {displayText && (
              <div className="flex items-center justify-center gap-2 pb-5 px-5">
                {platform !== "none" ? (
                  <PlatformLogo platform={platform} color={logoColor} size={14} />
                ) : (
                  <span style={{ color: logoColor }}>{getIcon()}</span>
                )}
                <span
                  className="text-xs font-bold tracking-wide"
                  style={{ color: logoColor }}
                >
                  {displayText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons - outside exported node */}
      <div className="flex gap-3 mt-5">
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
