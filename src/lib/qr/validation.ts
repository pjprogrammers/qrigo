export function isValidURL(str: string): boolean {
  try { new URL(str); return true; } catch { return false; }
}

export function isValidEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isValidPhone(str: string): boolean {
  return /^[\d\s\-\+\(\)]{7,20}$/.test(str.trim());
}

export function detectQRType(input: string): "url" | "text" | "email" | "phone" {
  if (isValidURL(input)) return "url";
  if (isValidEmail(input)) return "email";
  if (isValidPhone(input)) return "phone";
  return "text";
}
