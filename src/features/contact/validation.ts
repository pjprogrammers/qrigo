import type { ContactCard } from "./types";

export interface ContactValidationError {
  field: string;
  message: string;
}

export function validateContactCard(card: ContactCard): ContactValidationError[] {
  const errors: ContactValidationError[] = [];

  const hasName = card.firstName.trim().length > 0 || card.lastName.trim().length > 0;
  const hasCompany = (card.company?.trim() ?? "").length > 0;
  const hasContact = (card.mobile?.trim() ?? "").length > 0 ||
    (card.email?.trim() ?? "").length > 0 ||
    (card.website?.trim() ?? "").length > 0;

  if (!hasName && !hasCompany) {
    errors.push({ field: "firstName", message: "First name or company is required" });
  }

  if (!hasContact) {
    errors.push({ field: "mobile", message: "At least one contact method (phone, email, or website) is required" });
  }

  if (card.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(card.email.trim())) {
    errors.push({ field: "email", message: "Invalid email address" });
  }

  if (card.mobile && !/^[\d\s\-\+\(\)]{7,20}$/.test(card.mobile.trim())) {
    errors.push({ field: "mobile", message: "Invalid phone number" });
  }

  if (card.workPhone && !/^[\d\s\-\+\(\)]{7,20}$/.test(card.workPhone.trim())) {
    errors.push({ field: "workPhone", message: "Invalid phone number" });
  }

  if (card.website && card.website.trim().length > 0) {
    try { new URL(card.website.startsWith("http") ? card.website : `https://${card.website}`); }
    catch { errors.push({ field: "website", message: "Invalid website URL" }); }
  }

  if (card.socials) {
    const socialFields = ["instagram", "linkedin", "github", "twitter", "facebook", "youtube"] as const;
    for (const key of socialFields) {
      const val = card.socials[key];
      if (val && val.trim().length > 0 && !val.startsWith("http")) {
        errors.push({ field: `socials.${key}`, message: `${key} URL must start with http:// or https://` });
      }
    }
  }

  return errors;
}

export function isValidContact(card: ContactCard): boolean {
  return validateContactCard(card).length === 0;
}

export function generateVCF(card: ContactCard): string {
  const lines: string[] = [];
  lines.push("BEGIN:VCARD");
  lines.push("VERSION:3.0");

  const firstName = card.firstName?.trim() || "";
  const lastName = card.lastName?.trim() || "";
  const fullName = `${firstName} ${lastName}`.trim() || card.company?.trim() || "Contact";

  lines.push(`N:${lastName};${firstName};;;`);
  lines.push(`FN:${fullName}`);

  if (card.company?.trim()) lines.push(`ORG:${card.company.trim()}`);
  if (card.title?.trim()) lines.push(`TITLE:${card.title.trim()}`);
  if (card.department?.trim()) lines.push(`DEPARTMENT:${card.department.trim()}`);

  if (card.mobile?.trim()) lines.push(`TEL;TYPE=CELL:${card.mobile.trim()}`);
  if (card.workPhone?.trim()) lines.push(`TEL;TYPE=WORK:${card.workPhone.trim()}`);
  if (card.email?.trim()) lines.push(`EMAIL:${card.email.trim()}`);

  if (card.website?.trim()) {
    const url = card.website.trim().startsWith("http") ? card.website.trim() : `https://${card.website.trim()}`;
    lines.push(`URL:${url}`);
  }

  if (card.birthday?.trim()) {
    const b = card.birthday.trim().replace(/-/g, "");
    lines.push(`BDAY:${b}`);
  }

  if (card.address) {
    const addr = [
      "",
      "",
      card.address.street?.trim() || "",
      card.address.city?.trim() || "",
      card.address.state?.trim() || "",
      card.address.zip?.trim() || "",
      card.address.country?.trim() || "",
    ].join(";");
    lines.push(`ADR:${addr}`);
  }

  if (card.notes?.trim()) lines.push(`NOTE:${card.notes.trim()}`);

  if (card.socials) {
    for (const [platform, url] of Object.entries(card.socials)) {
      if (url?.trim()) {
        lines.push(`X-SOCIAL-${platform.toUpperCase()}:${url.trim()}`);
      }
    }
  }

  if (card.logo) lines.push(`LOGO:${card.logo}`);

  lines.push("END:VCARD");
  return lines.join("\n");
}
