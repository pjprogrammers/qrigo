import Link from "next/link";
import { QrCode, Barcode, CreditCard, Wifi, Mail, MessageSquare, MapPin, Calendar, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Tool {
  href: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const tools: Record<string, Tool[]> = {
  qr: [
    { href: "/generate/barcode", label: "Barcode Generator", icon: Barcode, color: "text-orange-600", bg: "bg-orange-100" },
    { href: "/generate/contact", label: "Business Card QR", icon: CreditCard, color: "text-teal-600", bg: "bg-teal-100" },
    { href: "/generate/wifi", label: "WiFi QR Generator", icon: Wifi, color: "text-blue-600", bg: "bg-blue-100" },
    { href: "/generate/email", label: "Email QR Generator", icon: Mail, color: "text-green-600", bg: "bg-green-100" },
  ],
  barcode: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/contact", label: "Business Card QR", icon: CreditCard, color: "text-teal-600", bg: "bg-teal-100" },
    { href: "/scan", label: "QR & Barcode Scanner", icon: QrCode, color: "text-rose-600", bg: "bg-rose-100" },
  ],
  contact: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/barcode", label: "Barcode Generator", icon: Barcode, color: "text-orange-600", bg: "bg-orange-100" },
    { href: "/generate/wifi", label: "WiFi QR Generator", icon: Wifi, color: "text-blue-600", bg: "bg-blue-100" },
  ],
  wifi: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/barcode", label: "Barcode Generator", icon: Barcode, color: "text-orange-600", bg: "bg-orange-100" },
    { href: "/generate/contact", label: "Business Card QR", icon: CreditCard, color: "text-teal-600", bg: "bg-teal-100" },
  ],
  email: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/wifi", label: "WiFi QR Generator", icon: Wifi, color: "text-blue-600", bg: "bg-blue-100" },
    { href: "/generate/contact", label: "Business Card QR", icon: CreditCard, color: "text-teal-600", bg: "bg-teal-100" },
  ],
  sms: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/whatsapp", label: "WhatsApp QR", icon: MessageCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
    { href: "/generate/email", label: "Email QR", icon: Mail, color: "text-green-600", bg: "bg-green-100" },
  ],
  whatsapp: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/sms", label: "SMS QR", icon: MessageSquare, color: "text-yellow-600", bg: "bg-yellow-100" },
    { href: "/generate/contact", label: "Business Card QR", icon: CreditCard, color: "text-teal-600", bg: "bg-teal-100" },
  ],
  location: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/event", label: "Event QR", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-100" },
    { href: "/generate/wifi", label: "WiFi QR", icon: Wifi, color: "text-blue-600", bg: "bg-blue-100" },
  ],
  event: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/location", label: "Location QR", icon: MapPin, color: "text-rose-600", bg: "bg-rose-100" },
    { href: "/generate/contact", label: "Business Card QR", icon: CreditCard, color: "text-teal-600", bg: "bg-teal-100" },
  ],
  phone: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/whatsapp", label: "WhatsApp QR", icon: MessageCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
    { href: "/generate/sms", label: "SMS QR", icon: MessageSquare, color: "text-yellow-600", bg: "bg-yellow-100" },
  ],
  scan: [
    { href: "/generate/qr", label: "QR Code Generator", icon: QrCode, color: "text-purple-600", bg: "bg-purple-100" },
    { href: "/generate/barcode", label: "Barcode Generator", icon: Barcode, color: "text-orange-600", bg: "bg-orange-100" },
    { href: "/generate/contact", label: "Business Card QR", icon: CreditCard, color: "text-teal-600", bg: "bg-teal-100" },
  ],
};

interface RelatedToolsProps {
  current: keyof typeof tools;
}

export function RelatedTools({ current }: RelatedToolsProps) {
  const items = tools[current];
  if (!items || items.length === 0) return null;

  return (
    <section className="border-t border-neutral-200 pt-8 mt-12">
      <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {items.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all"
            >
              <div className={`w-9 h-9 rounded-lg ${tool.bg} flex items-center justify-center ${tool.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-neutral-700">{tool.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
