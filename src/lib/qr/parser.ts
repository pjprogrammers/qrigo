export interface ParsedQRResult {
  type: string;
  raw: string;
  data: Record<string, string>;
  actions: { label: string; action: string; href?: string }[];
}

export function parseQRContent(text: string): ParsedQRResult {
  if (text.startsWith("http://") || text.startsWith("https://")) {
    return {
      type: "url",
      raw: text,
      data: { url: text },
      actions: [
        { label: "Open Website", action: "open", href: text },
        { label: "Copy URL", action: "copy" },
        { label: "Share", action: "share" },
      ],
    };
  }

  if (text.startsWith("mailto:")) {
    const email = text.replace("mailto:", "");
    return {
      type: "email",
      raw: email,
      data: { email },
      actions: [
        { label: "Compose Email", action: "open", href: text },
        { label: "Copy Email", action: "copy" },
      ],
    };
  }

  if (text.startsWith("tel:")) {
    const phone = text.replace("tel:", "");
    return {
      type: "phone",
      raw: phone,
      data: { phone },
      actions: [
        { label: "Call", action: "open", href: text },
        { label: "Copy Number", action: "copy" },
        { label: "Save Contact", action: "save" },
      ],
    };
  }

  if (text.startsWith("sms:")) {
    const parts = text.replace("sms:", "").split("?body=");
    return {
      type: "sms",
      raw: text,
      data: { phone: parts[0] || "", body: parts[1] ? decodeURIComponent(parts[1]) : "" },
      actions: [
        { label: "Send SMS", action: "open", href: text },
        { label: "Copy", action: "copy" },
      ],
    };
  }

  if (text.startsWith("https://wa.me/")) {
    const phone = text.replace("https://wa.me/", "");
    return {
      type: "whatsapp",
      raw: phone,
      data: { phone },
      actions: [
        { label: "Open WhatsApp", action: "open", href: text },
        { label: "Copy Number", action: "copy" },
      ],
    };
  }

  if (text.startsWith("WIFI:")) {
    const ssidMatch = text.match(/S:([^;]*)/);
    const passMatch = text.match(/P:([^;]*)/);
    const encMatch = text.match(/T:([^;]*)/);
    return {
      type: "wifi",
      raw: text,
      data: {
        ssid: ssidMatch ? ssidMatch[1] : "",
        password: passMatch ? passMatch[1] : "",
        encryption: encMatch ? encMatch[1] : "",
      },
      actions: [
        { label: "Copy Password", action: "copy" },
        { label: "Copy Config", action: "copy" },
      ],
    };
  }

  if (text.startsWith("geo:")) {
    const coords = text.replace("geo:", "").split(",");
    return {
      type: "location",
      raw: text,
      data: { lat: coords[0] || "", lng: coords[1] || "" },
      actions: [
        { label: "Open Maps", action: "open", href: `https://maps.google.com/?q=${coords[0]},${coords[1]}` },
        { label: "Copy Coordinates", action: "copy" },
      ],
    };
  }

  if (text.startsWith("BEGIN:VCARD")) {
    const fnMatch = text.match(/FN:(.+)/);
    const telMatch = text.match(/TEL:(.+)/);
    const emailMatch = text.match(/EMAIL:(.+)/);
    return {
      type: "vcard",
      raw: text,
      data: {
        name: fnMatch ? fnMatch[1].trim() : "",
        phone: telMatch ? telMatch[1].trim() : "",
        email: emailMatch ? emailMatch[1].trim() : "",
      },
      actions: [
        { label: "Save Contact", action: "save" },
        { label: "Copy vCard", action: "copy" },
      ],
    };
  }

  if (text.startsWith("BEGIN:VEVENT")) {
    const summaryMatch = text.match(/SUMMARY:(.+)/);
    const startMatch = text.match(/DTSTART:(.+)/);
    const endMatch = text.match(/DTEND:(.+)/);
    return {
      type: "event",
      raw: text,
      data: {
        summary: summaryMatch ? summaryMatch[1].trim() : "",
        start: startMatch ? startMatch[1].trim() : "",
        end: endMatch ? endMatch[1].trim() : "",
      },
      actions: [
        { label: "Add to Calendar", action: "save" },
        { label: "Copy Event", action: "copy" },
      ],
    };
  }

  return {
    type: "text",
    raw: text,
    data: { text },
    actions: [
      { label: "Copy Text", action: "copy" },
      { label: "Search Web", action: "open", href: `https://google.com/search?q=${encodeURIComponent(text)}` },
    ],
  };
}
