"use client";

import React from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  scanning: boolean;
  loading?: boolean;
  error?: string | null;
}

export function CameraView({ videoRef, scanning, loading, error }: CameraViewProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[3/4] bg-black rounded-2xl overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        aria-label="Camera feed for scanning QR codes and barcodes"
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75" role="alert" aria-live="assertive">
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <AlertCircle className="w-8 h-8 text-red-400" aria-hidden="true" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      )}
      {!error && loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60" role="status" aria-live="polite">
          <Loader2 className="w-6 h-6 text-white animate-spin" aria-hidden="true" />
          <span className="sr-only">Initializing camera</span>
        </div>
      )}
      {!error && !loading && !scanning && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60" role="status" aria-live="polite">
          <p className="text-white text-sm">Starting camera...</p>
        </div>
      )}
    </div>
  );
}
