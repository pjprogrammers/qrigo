"use client";

import React from "react";
import type { ContactCard, Address, SocialLinks } from "@/features/contact/types";
import { validateContactCard } from "@/features/contact/validation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Phone, Mail, Globe, MapPin, Cake, FileText, Link as LinkIcon, Building, ChevronDown, ChevronUp } from "lucide-react";

interface ContactFormProps {
  card: ContactCard;
  onChange: (card: ContactCard) => void;
}

export function ContactForm({ card, onChange }: ContactFormProps) {
  const [showAddress, setShowAddress] = React.useState(false);
  const [showSocials, setShowSocials] = React.useState(false);
  const cardRef = React.useRef(card);
  const onChangeRef = React.useRef(onChange);
  cardRef.current = card;
  onChangeRef.current = onChange;

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("contact-save"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const update = (partial: Partial<ContactCard>) => onChange({ ...card, ...partial });

  const errors = React.useMemo(() => validateContactCard(card), [card]);
  const getError = (field: string) => errors.find(e => e.field === field)?.message;

  const updateAddress = (key: keyof Address, value: string) => {
    update({ address: { ...(card.address || {}), [key]: value } });
  };

  const updateSocial = (key: keyof SocialLinks, value: string) => {
    update({ socials: { ...(card.socials || {}), [key]: value } });
  };

  const formatPhoneInput = (value: string, prevValue: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  };

  React.useEffect(() => {
    const c = cardRef.current;
    if (!c.website || c.socials) return;
    const url = c.website.toLowerCase();
    const matches: Record<string, keyof SocialLinks> = {
      "instagram.com": "instagram",
      "linkedin.com": "linkedin",
      "github.com": "github",
      "twitter.com": "twitter",
      "x.com": "twitter",
      "facebook.com": "facebook",
      "fb.com": "facebook",
      "youtube.com": "youtube",
      "youtu.be": "youtube",
    };
    for (const [domain, key] of Object.entries(matches)) {
      if (url.includes(domain)) {
        onChangeRef.current({ ...c, socials: { ...(c.socials || {}), [key]: c.website } });
        break;
      }
    }
  }, [card.website]);

  return (
    <div className="space-y-6">
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">Please fix the following errors:</p>
          <ul className="mt-1 list-disc list-inside">
            {errors.map((e, i) => <li key={i}>{e.message}</li>)}
          </ul>
        </div>
      )}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-purple-500" />
          <h3 className="font-semibold text-sm">Basic Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name *</Label>
            <Input
              value={card.firstName}
              onChange={(e) => update({ firstName: e.target.value })}
              placeholder="John"
              className={getError("firstName") ? "border-red-400" : ""}
            />
            {getError("firstName") && <p className="text-xs text-red-500">{getError("firstName")}</p>}
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input value={card.lastName} onChange={(e) => update({ lastName: e.target.value })} placeholder="Doe" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Website</Label>
            <Input
              value={card.website || ""}
              onChange={(e) => update({ website: e.target.value })}
              placeholder="https://qrigo.app"
              type="url"
              className={getError("website") ? "border-red-400" : ""}
            />
            {getError("website") && <p className="text-xs text-red-500">{getError("website")}</p>}
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input value={card.company || ""} onChange={(e) => update({ company: e.target.value })} placeholder="Qrigo Inc" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label>Department</Label>
          <Input value={card.department || ""} onChange={(e) => update({ department: e.target.value })} placeholder="Engineering" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-4 h-4 text-purple-500" />
          <h3 className="font-semibold text-sm">Contact Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Mobile</Label>
            <Input
              value={card.mobile || ""}
              onChange={(e) => { const formatted = formatPhoneInput(e.target.value, card.mobile || ""); update({ mobile: formatted }); }}
              placeholder="+1 234 567 890"
              type="tel"
              className={getError("mobile") ? "border-red-400" : ""}
            />
            {getError("mobile") && <p className="text-xs text-red-500">{getError("mobile")}</p>}
          </div>
          <div className="space-y-2">
            <Label>Work Phone</Label>
            <Input value={card.workPhone || ""} onChange={(e) => { const formatted = formatPhoneInput(e.target.value, card.workPhone || ""); update({ workPhone: formatted }); }} placeholder="+1 234 567 891" type="tel" />
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Label>Email</Label>
          <Input
            value={card.email || ""}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="john@qrigo.app"
            type="email"
            className={getError("email") ? "border-red-400" : ""}
          />
          {getError("email") && <p className="text-xs text-red-500">{getError("email")}</p>}
        </div>
      </Card>

      <Card className="p-6">
        <button
          type="button"
          onClick={() => setShowAddress(!showAddress)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-500" />
            <h3 className="font-semibold text-sm">Address</h3>
          </div>
          {showAddress ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showAddress && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Street</Label>
              <Input value={card.address?.street || ""} onChange={(e) => updateAddress("street", e.target.value)} placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input value={card.address?.city || ""} onChange={(e) => updateAddress("city", e.target.value)} placeholder="New York" />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input value={card.address?.state || ""} onChange={(e) => updateAddress("state", e.target.value)} placeholder="NY" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ZIP Code</Label>
                <Input value={card.address?.zip || ""} onChange={(e) => updateAddress("zip", e.target.value)} placeholder="10001" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input value={card.address?.country || ""} onChange={(e) => updateAddress("country", e.target.value)} placeholder="United States" />
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <button
          type="button"
          onClick={() => setShowSocials(!showSocials)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-purple-500" />
            <h3 className="font-semibold text-sm">Social Links</h3>
          </div>
          {showSocials ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showSocials && (
          <div className="mt-4 space-y-4">
            {([
              ["instagram", "Instagram"],
              ["linkedin", "LinkedIn"],
              ["github", "GitHub"],
              ["twitter", "X (Twitter)"],
              ["facebook", "Facebook"],
              ["youtube", "YouTube"],
            ] as const).map(([key, label]) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <Input
                  value={(card.socials as any)?.[key] || ""}
                  onChange={(e) => updateSocial(key as keyof SocialLinks, e.target.value)}
                  placeholder={`https://${key}.com/yourprofile`}
                  type="url"
                />
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Cake className="w-4 h-4 text-purple-500" />
            <h3 className="font-semibold text-sm">Additional</h3>
          </div>
          <div className="space-y-2">
            <Label>Birthday</Label>
            <span className="text-[10px] text-neutral-400">Used for vCard BDAY field</span>
            <Input value={card.birthday || ""} onChange={(e) => update({ birthday: e.target.value })} type="date" />
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <textarea
              value={card.notes || ""}
              onChange={(e) => update({ notes: e.target.value })}
              placeholder="Additional notes..."
              className="flex h-20 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm resize-none"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
