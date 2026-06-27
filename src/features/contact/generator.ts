import type { ContactCard } from "./types";
import { generateVCF } from "./validation";

export function generateContactQRData(card: ContactCard): string {
  return generateVCF(card);
}

export function getContactDisplayText(card: ContactCard): string {
  const name = `${card.firstName || ""} ${card.lastName || ""}`.trim();
  return name || card.company || "Contact Card";
}

export function getContactFilename(card: ContactCard): string {
  const name = `${card.firstName || ""}_${card.lastName || ""}`.replace(/_$/, "").trim();
  const company = (card.company?.trim() ?? "").replace(/\s+/g, "_") || "";
  if (name && company) return `${name}_${company}`;
  if (name) return name;
  if (company) return `${company}_Contact`;
  return "Contact_Card";
}

export function getDefaultContact(): ContactCard {
  return {
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    department: "",
    mobile: "",
    workPhone: "",
    email: "",
    website: "",
    birthday: "",
    notes: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    socials: {
      instagram: "",
      linkedin: "",
      github: "",
      twitter: "",
      facebook: "",
      youtube: "",
    },
    logo: "",
  };
}

export function hasContactData(card: ContactCard): boolean {
  return (
    card.firstName.trim().length > 0 ||
    card.lastName.trim().length > 0 ||
    (card.company?.trim() ?? "").length > 0 ||
    (card.mobile?.trim() ?? "").length > 0 ||
    (card.email?.trim() ?? "").length > 0
  );
}
