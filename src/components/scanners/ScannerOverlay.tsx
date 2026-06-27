"use client";

import React from "react";

interface ScannerOverlayProps {
  mode: "qr" | "barcode";
  scanning: boolean;
}

export function ScannerOverlay({ mode, scanning }: ScannerOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Semi-transparent borders */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Clear scan area */}
      <div className="absolute inset-[15%]">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-transparent border-2 border-white/60 rounded-2xl" />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
          
          {/* Scanning line animation */}
          {scanning && (
            <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan" />
          )}
        </div>
      </div>
      
      {/* Label */}
      <div className="absolute bottom-[10%] left-0 right-0 text-center">
        <p className="text-white/80 text-sm font-medium">
          {mode === "qr" ? "Align QR code within frame" : "Align barcode within frame"}
        </p>
      </div>
    </div>
  );
}
