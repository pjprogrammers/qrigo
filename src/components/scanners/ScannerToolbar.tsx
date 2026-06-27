"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Zap, ZapOff, ArrowLeft } from "lucide-react";

interface ScannerToolbarProps {
  onBack: () => void;
  flashOn: boolean;
  onToggleFlash: () => void;
  hasFlash: boolean;
  cameras: { id: string; label: string }[];
  activeCamera: string;
  onSwitchCamera: (id: string) => void;
}

export function ScannerToolbar({
  onBack,
  flashOn,
  onToggleFlash,
  hasFlash,
  cameras,
  activeCamera,
  onSwitchCamera,
}: ScannerToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3" role="toolbar" aria-label="Scanner controls">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Go back" className="text-white">
        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
      </Button>

      <div className="flex items-center gap-3">
        {cameras.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const currentIndex = cameras.findIndex((c) => c.id === activeCamera);
              const nextIndex = (currentIndex + 1) % cameras.length;
              onSwitchCamera(cameras[nextIndex].id);
            }}
            className="text-white gap-1.5 text-xs"
            aria-label="Switch camera"
          >
            <Camera className="w-4 h-4" aria-hidden="true" />
            Switch
          </Button>
        )}

        {hasFlash && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFlash}
            className="text-white"
            aria-label={flashOn ? "Disable flash" : "Enable flash"}
            aria-pressed={flashOn}
          >
            {flashOn ? <ZapOff className="w-5 h-5" aria-hidden="true" /> : <Zap className="w-5 h-5" aria-hidden="true" />}
          </Button>
        )}
      </div>
    </div>
  );
}
