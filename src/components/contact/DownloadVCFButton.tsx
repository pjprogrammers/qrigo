"use client";

import React from "react";
import type { ContactCard } from "@/features/contact/types";
import { Button } from "@/components/ui/button";
import { generateVCF } from "@/features/contact/validation";
import { downloadVCF, sanitizeContactFilename } from "@/features/contact/export";
import { Download } from "lucide-react";

interface DownloadVCFButtonProps {
  card: ContactCard;
  variant?: "default" | "outline" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function DownloadVCFButton({ card, variant = "outline", size = "sm", className }: DownloadVCFButtonProps) {
  const handleDownload = () => {
    const vcf = generateVCF(card);
    const filename = sanitizeContactFilename(card);
    downloadVCF(vcf, filename);
  };

  return (
    <Button variant={variant} size={size} onClick={handleDownload} className={`gap-1.5 ${className || ""}`}>
      <Download className="w-3.5 h-3.5" />
      Download VCF
    </Button>
  );
}
