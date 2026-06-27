"use client";

import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, Building } from "lucide-react";

interface CompanyLogoUploaderProps {
  logo: string;
  onChange: (logo: string) => void;
}

export function CompanyLogoUploader({ logo, onChange }: CompanyLogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Logo must be under 2MB");
      return;
    }
    const reader = new FileReader();
    setLoading(true);
    reader.onload = () => {
      setLoading(false);
      onChange(reader.result as string);
    };
    reader.onerror = () => setLoading(false);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <Label>Company Logo</Label>
      {logo ? (
        <div className="relative inline-block">
          <img src={logo} alt="Company Logo" className="w-20 h-20 rounded-xl object-contain border border-neutral-200 bg-white" />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => !loading && inputRef.current?.click()}
          className="flex flex-col items-center justify-center w-20 h-20 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-colors relative"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 text-teal-500 animate-spin" />
          ) : (
            <>
              <Upload className="w-5 h-5 text-neutral-400 mb-1" />
              <span className="text-[8px] text-neutral-400">Upload</span>
            </>
          )}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <p className="text-[10px] text-neutral-400">PNG, JPG, SVG. Max 2MB</p>
    </div>
  );
}
