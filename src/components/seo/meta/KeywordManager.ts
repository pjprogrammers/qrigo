export const GENERATE_PAGE_KEYWORDS: string[] = [
  "QR code generator",
  "free QR code generator",
  "create QR code online",
  "barcode generator",
  "free barcode generator",
  "create barcode",
  "QR code maker",
  "barcode maker",
  "QR generator online",
  "barcode generator online",
  "QR code creator",
  "barcode creator",
  "online QR code",
  "online barcode",
  "generate QR",
  "generate barcode",
  "QR code tool",
  "barcode tool",
  "Code128 generator",
  "EAN13 generator",
  "UPC generator",
  "vCard QR code",
  "business card QR",
  "contact QR code",
];

export const GENERATE_QR_KEYWORDS: string[] = [
  "QR code types",
  "dynamic QR code",
  "custom QR code",
  "QR code with logo",
  "colored QR code",
  "QR code design",
  "high resolution QR",
  "printable QR code",
  "QR code for business",
  "trackable QR code",
];

export const GENERATE_BARCODE_KEYWORDS: string[] = [
  "linear barcode",
  "2D barcode",
  "barcode symbology",
  "industrial barcode",
  "retail barcode",
  "product barcode",
  "inventory barcode",
  "shipping barcode",
  "barcode label",
  "barcode scanner ready",
];

export const GENERATE_CONTACT_KEYWORDS: string[] = [
  "digital business card",
  "electronic business card",
  "vCard file",
  "contact info QR",
  "share contact digitally",
  "vCard 3.0",
  "vCard 4.0",
  "multi-field contact",
  "QR business card",
  "tap to save contact",
];

export function mergeKeywords(...arrays: string[][]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const arr of arrays) {
    for (const keyword of arr) {
      if (!seen.has(keyword)) {
        seen.add(keyword);
        result.push(keyword);
      }
    }
  }

  return result;
}

export function generatePageKeywords(): string[] {
  return mergeKeywords(GENERATE_PAGE_KEYWORDS, GENERATE_QR_KEYWORDS);
}
