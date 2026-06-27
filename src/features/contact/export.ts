export function downloadVCF(vcfContent: string, filename: string): void {
  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.vcf`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadContactCardPNG(svgString: string, filename: string): Promise<void> {
  const blob = await svgToPngBlob(svgString, 800);
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadContactCardSVG(svgString: string, filename: string): Promise<void> {
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.svg`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadContactCardPDF(svgString: string, filename: string): Promise<void> {
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head><title>Export PDF</title>
    <style>
      body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
      @media print { @page { margin: 0; size: 400px 640px; } }
    </style>
    </head>
    <body>${svgString}</body>
    </html>
  `);
  win.document.close();
  setTimeout(() => {
    win.print();
    win.close();
  }, 500);
}

async function svgToPngBlob(svgString: string, width: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) { resolve(null); return; }
    const img = new Image();
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const ratio = 640 / 400;
      canvas.width = width;
      canvas.height = Math.round(width * ratio);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => resolve(b), "image/png", 1);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

export function sanitizeContactFilename(card: { firstName?: string; lastName?: string; company?: string }): string {
  const name = `${card.firstName || ""}_${card.lastName || ""}`.replace(/_+$/g, "").trim() || card.company?.trim() || "Contact";
  return name.replace(/[<>:"/\\|?*]/g, "_").replace(/\s+/g, "_");
}
