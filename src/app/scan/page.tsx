"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Camera, Upload, Scan, QrCode, Loader2, AlertCircle, RotateCw } from "lucide-react";
import { CameraView } from "@/components/scanners/CameraView";
import { ScannerOverlay } from "@/components/scanners/ScannerOverlay";
import { ScannerResult } from "@/components/scanners/ScannerResult";
import { ScannerToolbar } from "@/components/scanners/ScannerToolbar";
import { UploadZone } from "@/components/scanners/UploadZone";
import { decodeImage } from "@/lib/scanner/imageDecoder";
import { QRScannerEngine } from "@/lib/scanner/qrScanner";
import { BarcodeScannerEngine } from "@/lib/scanner/barcodeScanner";
import { parseScanResult } from "@/lib/scanner/parser";
import { saveScanItem } from "@/lib/db/index";
import { requestCameraAccess, hasFlashSupport, toggleFlash } from "@/lib/scanner/permissions";
import { getAvailableCameras } from "@/lib/scanner/devices";
import type { CameraDevice } from "@/lib/scanner/devices";
import { Button } from "@/components/ui/button";
import type { ParsedScanResult } from "@/lib/scanner/parser";
import { SITE_URL } from "@/lib/constants";
import { ScanFAQSection, faqLd } from "@/components/seo/ScanFAQ";
import { ScanHowToSection } from "@/components/seo/ScanHowTo";
import { ScanFeaturesSection } from "@/components/seo/ScanFeatures";
import { RelatedTools } from "@/components/seo/RelatedTools";

type TabMode = "camera" | "upload";
type ScanMode = "qr" | "barcode";

interface ScannerState {
  tab: TabMode;
  scanMode: ScanMode;
  scanning: boolean;
  initializing: boolean;
  error: string | null;
  cameras: CameraDevice[];
  activeCameraId: string;
  flashOn: boolean;
  flashSupported: boolean;
  uploadedImage: string | null;
  result: ParsedScanResult | null;
}

function ScanPageInner() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const qrEngineRef = React.useRef<QRScannerEngine | null>(null);
  const barcodeEngineRef = React.useRef<BarcodeScannerEngine | null>(null);

  const [state, setState] = React.useState<ScannerState>({
    tab: "camera",
    scanMode: "qr",
    scanning: false,
    initializing: true,
    error: null,
    cameras: [],
    activeCameraId: "",
    flashOn: false,
    flashSupported: false,
    uploadedImage: null,
    result: null,
  });

  const searchParams = useSearchParams();

  React.useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "qr" || modeParam === "barcode") {
      setState((prev) => ({ ...prev, scanMode: modeParam }));
    }
  }, [searchParams]);

  const stopEngines = React.useCallback(() => {
    qrEngineRef.current?.stopScan();
    barcodeEngineRef.current?.stopScan();
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
    setState((prev) => ({ ...prev, scanning: false, flashOn: false }));
  }, [stopEngines, releaseCamera]);

  const handleScanResult = React.useCallback(
    async (text: string, format?: string) => {
      stopEngines();
      const parsed = parseScanResult(text, format);
      setState((prev) => ({ ...prev, result: parsed }));
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

  const startScanner = React.useCallback(
    async (deviceId: string, mode: ScanMode) => {
      stopEngines();
      if (!videoRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: deviceId ? { exact: deviceId } : undefined, facingMode: deviceId ? undefined : "environment" },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      const flashSupported = await hasFlashSupport(stream);
      setState((prev) => ({ ...prev, flashSupported }));

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

      setState((prev) => ({ ...prev, scanning: true, initializing: false }));
    },
    [stopEngines, handleScanResult]
  );

  const initCamera = React.useCallback(async () => {
    setState((prev) => ({ ...prev, initializing: true, error: null }));
    const granted = await requestCameraAccess();
    if (!granted) {
      setState((prev) => ({ ...prev, error: "Camera access denied. Please allow camera permissions in your browser settings.", initializing: false }));
      return;
    }
    const cameras = await getAvailableCameras();
    const activeCameraId = cameras.length > 0 ? cameras[0].id : "";
    setState((prev) => ({ ...prev, cameras, activeCameraId }));
    await startScanner(activeCameraId, state.scanMode);
  }, [state.scanMode, startScanner]);

  React.useEffect(() => {
    if (state.tab === "camera") {
      initCamera();
    }
    return () => {
      stopEngines();
      releaseCamera();
    };
  }, [state.tab, initCamera, releaseCamera, stopEngines]);

  const handleUploadFile = React.useCallback(
    async (file: File) => {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      setState((prev) => ({ ...prev, uploadedImage: dataUrl, initializing: true, error: null, result: null }));

      const img = new Image();
      img.onload = async () => {
        try {
          const result = await decodeImage(img, state.scanMode);
          await handleScanResult(result.text, result.format);
        } catch {
          setState((prev) => ({ ...prev, error: "No QR or barcode could be decoded from this image. Try a clearer image or switch to camera mode.", initializing: false }));
        }
      };
      img.onerror = () => setState((prev) => ({ ...prev, error: "Failed to load image. Try a different file.", initializing: false }));
      img.src = dataUrl;
    },
    [state.scanMode, handleScanResult]
  );

  const handleModeChange = React.useCallback(
    async (mode: ScanMode) => {
      stopAll();
      setState((prev) => ({ ...prev, scanMode: mode, initializing: true, result: null, error: null }));
      if (state.tab === "camera") {
        try {
          await startScanner(state.activeCameraId, mode);
        } catch {
          setState((prev) => ({ ...prev, error: "Failed to start camera.", initializing: false }));
        }
      }
    },
    [state.tab, state.activeCameraId, stopAll, startScanner]
  );

  const handleSwitchCamera = React.useCallback(
    async (deviceId: string) => {
      stopAll();
      setState((prev) => ({ ...prev, activeCameraId: deviceId, initializing: true, result: null, error: null }));
      try {
        await startScanner(deviceId, state.scanMode);
      } catch {
        setState((prev) => ({ ...prev, error: "Failed to switch camera.", initializing: false }));
      }
    },
    [state.scanMode, stopAll, startScanner]
  );

  const handleToggleFlash = React.useCallback(async () => {
    try {
      const newState = !state.flashOn;
      const success = await toggleFlash(streamRef.current, newState);
      if (success) setState((prev) => ({ ...prev, flashOn: newState }));
    } catch {}
  }, [state.flashOn]);

  const handleResultClose = React.useCallback(() => {
    setState((prev) => ({ ...prev, result: null }));
    if (state.tab === "camera") {
      startScanner(state.activeCameraId, state.scanMode).catch(() => {});
    }
  }, [state.tab, state.activeCameraId, state.scanMode, startScanner]);

  const switchTab = React.useCallback(
    (tab: TabMode) => {
      if (tab === state.tab) return;
      stopAll();
      setState((prev) => ({
        ...prev,
        tab,
        initializing: tab === "camera",
        error: null,
        result: null,
        uploadedImage: null,
        scanning: false,
      }));
    },
    [state.tab, stopAll]
  );

  const handleRetry = React.useCallback(() => {
    if (state.tab === "camera") {
      initCamera().catch(() => {});
    } else {
      setState((prev) => ({ ...prev, uploadedImage: null, error: null, initializing: false }));
    }
  }, [state.tab, initCamera]);

  return (
    <>
      <nav aria-label="Breadcrumb" className="max-w-lg mx-auto px-4 pt-4">
        <ol className="flex items-center gap-1.5 text-xs text-neutral-500">
          <li>
            <Link href="/" className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-700 dark:text-neutral-300 font-medium" aria-current="page">Scan</li>
        </ol>
      </nav>

      <main className="min-h-screen">
        <div className="relative w-full max-w-lg mx-auto px-4 pt-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Scan QR Codes & Barcodes</h1>
            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1" role="tablist" aria-label="Scan mode">
              <button
                role="tab"
                aria-selected={state.tab === "camera"}
                onClick={() => switchTab("camera")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  state.tab === "camera"
                    ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                <Camera className="w-4 h-4" aria-hidden="true" />
                Camera
              </button>
              <button
                role="tab"
                aria-selected={state.tab === "upload"}
                onClick={() => switchTab("upload")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  state.tab === "upload"
                    ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                Upload
              </button>
            </div>
          </div>

          {state.tab === "camera" ? (
            <>
              <ScannerToolbar
                onBack={() => window.history.back()}
                flashOn={state.flashOn}
                onToggleFlash={handleToggleFlash}
                hasFlash={state.flashSupported}
                cameras={state.cameras}
                activeCamera={state.activeCameraId}
                onSwitchCamera={handleSwitchCamera}
              />

              <div className="relative" role="region" aria-label="Camera scanner view">
                <CameraView
                  videoRef={videoRef}
                  scanning={state.scanning}
                  loading={state.initializing && !state.error}
                  error={state.error}
                />

                {state.scanning && !state.error && (
                  <ScannerOverlay mode={state.scanMode} scanning={state.scanning} />
                )}
              </div>

              <div className="flex items-center justify-center gap-2 mt-4" role="radiogroup" aria-label="Code type">
                <button
                  role="radio"
                  aria-checked={state.scanMode === "qr"}
                  onClick={() => handleModeChange("qr")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    state.scanMode === "qr"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  <QrCode className="w-4 h-4" aria-hidden="true" />
                  QR Code
                </button>
                <button
                  role="radio"
                  aria-checked={state.scanMode === "barcode"}
                  onClick={() => handleModeChange("barcode")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    state.scanMode === "barcode"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  <Scan className="w-4 h-4" aria-hidden="true" />
                  Barcode
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" role="radiogroup" aria-label="Code type">
                  <button
                    role="radio"
                    aria-checked={state.scanMode === "qr"}
                    onClick={() => handleModeChange("qr")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      state.scanMode === "qr"
                        ? "bg-purple-600 text-white"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" aria-hidden="true" />
                    QR
                  </button>
                  <button
                    role="radio"
                    aria-checked={state.scanMode === "barcode"}
                    onClick={() => handleModeChange("barcode")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      state.scanMode === "barcode"
                        ? "bg-purple-600 text-white"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    <Scan className="w-3.5 h-3.5" aria-hidden="true" />
                    Barcode
                  </button>
                </div>
                {state.uploadedImage && !state.result && !state.initializing && (
                  <button
                    onClick={handleRetry}
                    className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-700"
                    aria-label="Try another image"
                  >
                    <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                    Try another
                  </button>
                )}
              </div>

              {!state.uploadedImage ? (
                <UploadZone onFileSelect={handleUploadFile} />
              ) : (
                <div className="relative w-full max-w-lg mx-auto aspect-[3/4] bg-black rounded-2xl overflow-hidden" role="region" aria-label="Uploaded image preview">
                  <img
                    src={state.uploadedImage}
                    alt="Uploaded image containing a QR code or barcode"
                    className="w-full h-full object-contain"
                  />

                  {state.initializing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70" role="status" aria-live="polite">
                      <div className="text-center text-white space-y-3">
                        <div className="relative">
                          <Loader2 className="w-8 h-8 mx-auto animate-spin" aria-hidden="true" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping" aria-hidden="true" />
                        </div>
                        <p className="text-sm font-medium">Decoding image...</p>
                        <p className="text-xs text-white/60">Running multi-stage decoder</p>
                      </div>
                    </div>
                  )}

                  {state.error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
                      <div className="text-center text-white space-y-4 p-6 max-w-sm">
                        <AlertCircle className="w-10 h-10 mx-auto text-amber-400" aria-hidden="true" />
                        <p className="text-sm text-white/80">{state.error}</p>
                        <div className="flex gap-2 justify-center">
                          <Button variant="default" size="sm" onClick={handleRetry}>
                            Try Another
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {state.result && (
            <ScannerResult
              text={state.result.text}
              type={state.result.type}
              actions={state.result.actions}
              onClose={handleResultClose}
            />
          )}
        </div>
      </main>

      <ScanFeaturesSection />
      <ScanHowToSection />
      <ScanFAQSection />

      <div className="max-w-3xl mx-auto px-4">
        <RelatedTools current="scan" />
      </div>

      <ScanStructuredData />
    </>
  );
}

function ScanStructuredData() {
  const url = `${SITE_URL}/scan`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Scan", item: url },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": `${url}#webapp`,
        name: "QR & Barcode Scanner",
        description:
          "Scan QR codes and barcodes instantly using your camera or by uploading an image. Supports QR, EAN, UPC, Code128, ITF, and Codabar formats with multi-stage decoding.",
        url,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        browserRequirements: "Requires JavaScript and camera access for live scanning.",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqLd,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ScanPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-neutral-500">Loading scanner...</p></div>}>
      <ScanPageInner />
    </React.Suspense>
  );
}
