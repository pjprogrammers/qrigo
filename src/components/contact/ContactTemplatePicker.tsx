"use client";

import React from "react";
import type { ContactTemplate, ContactTheme } from "@/features/contact/types";
import { CONTACT_TEMPLATES, CONTACT_THEMES } from "@/features/contact/types";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ContactTemplatePickerProps {
  template: ContactTemplate;
  theme: ContactTheme;
  onTemplateChange: (t: ContactTemplate) => void;
  onThemeChange: (t: ContactTheme) => void;
}

export function ContactTemplatePicker({ template, theme, onTemplateChange, onThemeChange }: ContactTemplatePickerProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Card Template</Label>
        <div className="grid grid-cols-2 gap-2">
          {CONTACT_TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              className={cn(
                "relative flex flex-col items-start gap-1 p-3 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
                template === t.id ? "border-neutral-900 bg-neutral-50 shadow-sm" : "border-neutral-200 bg-white"
              )}
            >
              <span className="text-sm font-semibold">{t.name}</span>
              <span className="text-[10px] text-neutral-500">{t.description}</span>
              {template === t.id && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Card Theme</Label>
        <div className="grid grid-cols-4 gap-2">
          {CONTACT_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              className={cn(
                "relative w-full aspect-[3/2] rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-md",
                theme === t.id ? "border-neutral-900 scale-105 shadow-md" : "border-transparent"
              )}
              title={t.name}
            >
              <div
                className="w-full h-full rounded-lg"
                style={{ background: `linear-gradient(135deg, ${t.cardGradient[0]}, ${t.cardGradient[1]})` }}
              />
              {theme === t.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-neutral-900" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-neutral-500 capitalize">{CONTACT_THEMES.find(t => t.id === theme)?.name}</p>
      </div>
    </div>
  );
}
