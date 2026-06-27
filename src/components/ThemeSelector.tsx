"use client";

import React from "react";
import { useQRStore } from "@/store/qrStore";
import { cardThemes } from "@/qr/themes";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function ThemeSelector() {
  const { theme: selectedTheme, setTheme } = useQRStore();

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Theme</label>
      <div className="grid grid-cols-5 gap-2">
        {cardThemes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "relative w-full aspect-square rounded-xl border-2 border-transparent transition-all duration-200 hover:scale-105 hover:shadow-md",
              selectedTheme === t.id && "border-neutral-900 scale-105 shadow-md dark:border-white"
            )}
            title={t.name}
          >
            <div
              className="w-full h-full rounded-lg"
              style={{ background: `linear-gradient(135deg, ${t.qrColors.join(", ")})` }}
            />
            {selectedTheme === t.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-0.5">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
