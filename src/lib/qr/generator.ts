import type { QRDataType } from "@/types/qr";

export interface QRCodeData {
  type: QRDataType;
  data: string;
  displayText: string;
}

export function generateQRData(type: QRDataType, input: string, ...args: string[]): string {
  switch (type) {
    case "url": return input;
    case "text": return input;
    case "email": return `mailto:${input}`;
    case "phone": return `tel:${input.replace(/[^+\d]/g, "")}`;
    case "sms": return `sms:${encodeURIComponent(input)}`;
    case "whatsapp": {
      const phone = input.replace(/[^+\d]/g, "");
      return `https://wa.me/${phone.replace("+", "")}`;
    }
    case "wifi": {
      const [ssid, password, encryption] = [input, args[0] || "", args[1] || "WPA"];
      return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    }
    case "location": {
      const [lat, lng] = input.split(",").map(s => s.trim());
      return `geo:${lat},${lng}`;
    }
    case "event": {
      const [summary, startDate, endDate] = [input, args[0] || "", args[1] || ""];
      return `BEGIN:VEVENT\nSUMMARY:${summary}\nDTSTART:${startDate}\nDTEND:${endDate}\nEND:VEVENT`;
    }
    case "vcard": return input;
    default: return input;
  }
}

export function getDisplayText(type: QRDataType, input: string, ...args: string[]): string {
  switch (type) {
    case "url": {
      try { return new URL(input).hostname.replace("www.", ""); }
      catch { return input; }
    }
    case "text": return input.slice(0, 30);
    case "email": return input;
    case "phone": return input;
    case "sms": return `SMS to ${args[0] || ""}`;
    case "whatsapp": return `WhatsApp ${input}`;
    case "wifi": return `WiFi: ${input}`;
    case "location": return input;
    case "event": return input;
    case "vcard": {
      const match = input.match(/FN:(.+)/);
      return match ? match[1].trim() : "Contact";
    }
    default: return input;
  }
}
