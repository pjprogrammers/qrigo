"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { CameraView } from "@/components/scanners/CameraView";
import { ScannerOverlay } from "@/components/scanners/ScannerOverlay";
import { ScannerResult } from "@/components/scanners/ScannerResult";
import { ScannerToolbar } from "@/components/scanners/ScannerToolbar";
import { QRScannerEngine } from "@/lib/scanner/qrScanner";
import { BarcodeScannerEngine } from "@/lib/scanner/barcodeScanner";
import { parseScanResult } from "@/lib/scanner/parser";
import { saveScanItem } from "@/lib/db/index";
import { requestCameraAccess, hasFlashSupport, toggleFlash } from "@/lib/scanner/permissions";
import { getAvailableCameras } from "@/lib/scanner/devices";
import type { CameraDevice } from "@/lib/scanner/devices";
import { Scan, QrCode, Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScannerState {
  mode: "qr" | "barcode";
  scanning: boolean;
  initializing: boolean;
  error: string | null;
  cameras: CameraDevice[];
  activeCameraId: string;
  flashOn: boolean;
  flashSupported: boolean;
  result: {
    text: string;
    type: string;
    actions: { label: string; action: "open" | "copy" | "share" | "save" | "call"; href?: string }[];
  } | null;
}

function ScanPageInner() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const qrEngineRef = React.useRef<QRScannerEngine | null>(null);
  const barcodeEngineRef = React.useRef<BarcodeScannerEngine | null>(null);

  const [state, setState] = React.useState<ScannerState>({
    mode: "qr",
    scanning: false,
    initializing: true,
    error: null,
    cameras: [],
    activeCameraId: "",
    flashOn: false,
    flashSupported: false,
    result: null,
  });

  const searchParams = useSearchParams();

  React.useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "qr" || modeParam === "barcode") {
      updateState({ mode: modeParam });
    }
  }, [searchParams]);

  const updateState = (partial: Partial<ScannerState>) =>
    setState((prev) => ({ ...prev, ...partial }));

  const stopEngines = React.useCallback(() => {
    if (qrEngineRef.current) {
      qrEngineRef.current.stopScan();
    }
    if (barcodeEngineRef.current) {
      barcodeEngineRef.current.stopScan();
    }
  }, []);

  const releaseCamera = React.useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const stopAll = React.useCallback(() => {
    stopEngines();
    releaseCamera();
    updateState({ scanning: false, flashOn: false });
  }, [stopEngines, releaseCamera]);

  const startScanner = React.useCallback(
    async (deviceId: string, mode: "qr" | "barcode") => {
      stopEngines();

      if (!videoRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: deviceId ? { exact: deviceId } : undefined, facingMode: deviceId ? undefined : "environment" },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      const flashSupported = await hasFlashSupport(stream);
      updateState({ flashSupported });

      const engine = mode === "qr" ? new QRScannerEngine() : new BarcodeScannerEngine();
      if (mode === "qr") {
        qrEngineRef.current = engine as QRScannerEngine;
      } else {
        barcodeEngineRef.current = engine as BarcodeScannerEngine;
      }

      await (mode === "qr"
        ? (engine as QRScannerEngine).startScan(
            videoRef.current,
            (result) => handleScanResult(result.text, result.format),
            () => {}
          )
        : (engine as BarcodeScannerEngine).startScan(
            videoRef.current,
            (result) => handleScanResult(result.text, result.format),
            () => {}
          ));

      updateState({ scanning: true, initializing: false });
    },
    []
  );

  const handleScanResult = React.useCallback(
    async (text: string, format?: string) => {
      stopEngines();

      const parsed = parseScanResult(text, format);
      updateState({
        result: {
          text: parsed.text,
          type: parsed.type,
          actions: parsed.actions,
        },
      });

      await saveScanItem({
        id: crypto.randomUUID(),
        type: parsed.type,
        format,
        rawText: text,
        createdAt: Date.now(),
      });
    },
    [stopEngines]
  );

  const initCamera = React.useCallback(async () => {
    updateState({ initializing: true, error: null });

    const granted = await requestCameraAccess();
    if (!granted) {
      updateState({ error: "Camera access denied. Please allow camera permissions in your browser settings.", initializing: false });
      return;
    }

    const cameras = await getAvailableCameras();
    const activeCameraId = cameras.length > 0 ? cameras[0].id : "";
    updateState({ cameras, activeCameraId });

    await startScanner(activeCameraId, state.mode);
  }, [state.mode, startScanner]);

  React.useEffect(() => {
    initCamera();
    return () => {
      stopEngines();
      releaseCamera();
    };
  }, []);

  const handleModeChange = async (mode: "qr" | "barcode") => {
    stopAll();
    updateState({ mode, initializing: true, result: null });
    await startScanner(state.activeCameraId, mode);
  };

  const handleSwitchCamera = async (deviceId: string) => {
    stopAll();
    updateState({ activeCameraId: deviceId, initializing: true, result: null });
    await startScanner(deviceId, state.mode);
  };

  const handleToggleFlash = async () => {
    const newState = !state.flashOn;
    const success = await toggleFlash(streamRef.current, newState);
    if (success) {
      updateState({ flashOn: newState });
    }
  };

  const handleResultClose = () => {
    updateState({ result: null });
    startScanner(state.activeCameraId, state.mode);
  };

  const handleRetry = () => {
    initCamera();
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="relative w-full max-w-lg mx-auto">
          <ScannerToolbar
            onBack={() => window.history.back()}
            flashOn={state.flashOn}
            onToggleFlash={handleToggleFlash}
            hasFlash={state.flashSupported}
            cameras={state.cameras}
            activeCamera={state.activeCameraId}
            onSwitchCamera={handleSwitchCamera}
          />

          <div className="relative">
            <CameraView videoRef={videoRef} scanning={state.scanning} />

            {state.initializing && !state.error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                <div className="text-center text-white space-y-3">
                  <Camera className="w-10 h-10 mx-auto animate-pulse" />
                  <p className="text-sm">Initializing camera...</p>
                </div>
              </div>
            )}

            {state.scanning && !state.error && (
              <ScannerOverlay mode={state.mode} scanning={state.scanning} />
            )}

            {state.error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                <div className="text-center text-white space-y-4 p-6">
                  <CameraOff className="w-12 h-12 mx-auto text-red-400" />
                  <p className="text-sm text-red-300">{state.error}</p>
                  <Button variant="default" size="sm" onClick={handleRetry}>
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Button
              variant={state.mode === "qr" ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange("qr")}
              className="gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </Button>
            <Button
              variant={state.mode === "barcode" ? "default" : "outline"}
              size="sm"
              onClick={() => handleModeChange("barcode")}
              className="gap-1.5"
            >
              <Scan className="w-4 h-4" />
              Barcode
            </Button>
          </div>
        </div>

        {state.result && (
          <ScannerResult
            text={state.result.text}
            type={state.result.type}
            actions={state.result.actions}
            onClose={handleResultClose}
          />
        )}
      </main>
    </>
  );
}

function ScanJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://qrify.vercel.app" },
          { "@type": "ListItem", position: 2, name: "Scan", item: "https://qrify.vercel.app/scan" },
        ],
      },
      {
        "@type": "WebApplication",
        name: "QR & Barcode Scanner",
        description: "Scan QR codes and barcodes instantly using your camera. Supports QR, EAN, UPC, Code128, ITF, and Codabar.",
        url: "https://qrify.vercel.app/scan",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function ScanPage() {
  return (
    <>
      <ScanJsonLd />
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-neutral-500">Loading scanner...</p></div>}>
        <ScanPageInner />
      </React.Suspense>
    </>
  );
}
