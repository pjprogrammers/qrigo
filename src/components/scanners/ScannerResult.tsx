"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ExternalLink, Share2, UserPlus, Phone } from "lucide-react";

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
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <Card
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="scan-result-label"
        aria-describedby="scan-result-text"
        className="w-full max-w-md p-6 space-y-4 animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
            <span id="scan-result-label" className="text-xs font-medium text-neutral-500 uppercase">
              {type}
            </span>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            aria-label="Close scan result"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
          <p id="scan-result-text" className="text-sm font-mono break-all max-h-24 overflow-y-auto">
            {text}
          </p>
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
              {action.action === "open" && <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />}
              {action.action === "copy" && <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              {action.action === "share" && <Share2 className="w-3.5 h-3.5" aria-hidden="true" />}
              {action.action === "save" && <UserPlus className="w-3.5 h-3.5" aria-hidden="true" />}
              {action.action === "call" && <Phone className="w-3.5 h-3.5" aria-hidden="true" />}
              {action.label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
