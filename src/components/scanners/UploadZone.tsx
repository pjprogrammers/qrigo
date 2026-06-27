"use client";

import React from "react";
import { Upload, ImageIcon, FileWarning, FolderOpen } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadZone({ onFileSelect, disabled }: UploadZoneProps) {
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div
        className={`
          aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 p-8
          transition-all duration-200
          ${dragging
            ? "border-purple-500 bg-purple-500/10 scale-[1.02]"
            : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900"
          }
          ${disabled ? "opacity-50 pointer-events-none" : ""}
        `}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        aria-label="Drop zone for uploading an image to scan"
      >
        <div className="relative">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 ${dragging ? "bg-purple-500/20" : "bg-neutral-100 dark:bg-neutral-800"}`}>
            <Upload className={`w-7 h-7 transition-colors duration-200 ${dragging ? "text-purple-500" : "text-neutral-400 dark:text-neutral-500"}`} aria-hidden="true" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
            <ImageIcon className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
          </div>
        </div>

        <div className="text-center space-y-1.5">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {dragging ? "Drop image here" : "Drag & drop an image here"}
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            PNG, JPG, WebP \u2014 QR codes and barcodes supported
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
          <FileWarning className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Auto-enhances image for better decoding</span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Browse files to select an image"
        >
          <FolderOpen className="w-4 h-4" aria-hidden="true" />
          Browse files
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        aria-label="Choose an image file containing a QR code or barcode"
      />
    </div>
  );
}
