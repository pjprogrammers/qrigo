export interface ParsedBarcodeResult {
  type: string;
  raw: string;
  actions: { label: string; action: string; href?: string }[];
}

export function parseBarcodeContent(text: string, format: string): ParsedBarcodeResult {
  const actions = [
    { label: "Copy", action: "copy" as const },
    { label: "Search", action: "open" as const, href: `https://www.google.com/search?q=${encodeURIComponent(text)}` },
  ];

  if (format === "EAN13" || format === "EAN8" || format === "UPCA" || format === "UPCE") {
    actions.unshift({
      label: "Search Product",
      action: "open",
      href: `https://www.upcdatabase.com/item/${text}`,
    });
  }

  return { type: format, raw: text, actions };
}
