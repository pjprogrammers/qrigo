"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ExternalLink, Share2, UserPlus, Phone, Calendar } from "lucide-react";

interface ScanAction {
  label: string;
  action: "open" | "copy" | "share" | "save" | "call";
  href?: string;
}

interface ScannerResultProps {
  text: string;
  type: string;
  actions: ScanAction[];
  onClose: () => void;
}

export function ScannerResult({ text, type, actions, onClose }: ScannerResultProps) {
  const handleAction = async (action: ScanAction) => {
    switch (action.action) {
      case "open":
        if (action.href) window.open(action.href, "_blank");
        break;
      case "copy":
        await navigator.clipboard.writeText(action.href || text);
        break;
      case "share":
        if (navigator.share) {
          await navigator.share({ title: "Scanned Content", text });
        }
        break;
      case "call":
        if (action.href) window.location.href = action.href;
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-4 animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-neutral-500 uppercase">{type}</span>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-neutral-50 rounded-lg p-3">
          <p className="text-sm font-mono break-all max-h-24 overflow-y-auto">{text}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant="default"
              size="sm"
              onClick={() => handleAction(action)}
              className="gap-1.5"
            >
              {action.action === "open" && <ExternalLink className="w-3.5 h-3.5" />}
              {action.action === "copy" && <Copy className="w-3.5 h-3.5" />}
              {action.action === "share" && <Share2 className="w-3.5 h-3.5" />}
              {action.action === "save" && <UserPlus className="w-3.5 h-3.5" />}
              {action.action === "call" && <Phone className="w-3.5 h-3.5" />}
              {action.label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
