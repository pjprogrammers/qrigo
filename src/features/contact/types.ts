export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
}

export interface ContactCard {
  firstName: string;
  lastName: string;

  title?: string;
  company?: string;
  department?: string;

  mobile?: string;
  workPhone?: string;

  email?: string;
  website?: string;

  birthday?: string;
  notes?: string;

  address?: Address;
  socials?: SocialLinks;

  logo?: string;
}

export type ContactTemplate = "minimal" | "modern" | "corporate" | "glass" | "gradient";

export type ContactTheme = "minimal" | "corporate" | "glass" | "dark" | "instagram" | "linkedin" | "gradient";

export interface ContactTemplateConfig {
  id: ContactTemplate;
  name: string;
  showCompany: boolean;
  showLogo: boolean;
  showGradient: boolean;
  showSocials: boolean;
  description: string;
}

export interface ContactThemeConfig {
  id: ContactTheme;
  name: string;
  cardGradient: [string, string];
  textColor: string;
  accentColor: string;
  backgroundColor: string;
}

export interface ContactExportOptions {
  includeQR: boolean;
  includeLogo: boolean;
  includeSocials: boolean;
}

export const CONTACT_TEMPLATES: ContactTemplateConfig[] = [
  { id: "minimal", name: "Minimal", showCompany: false, showLogo: false, showGradient: false, showSocials: false, description: "Clean and minimal design" },
  { id: "modern", name: "Modern", showCompany: true, showLogo: false, showGradient: false, showSocials: true, description: "Modern layout with company name" },
  { id: "corporate", name: "Corporate", showCompany: true, showLogo: true, showGradient: false, showSocials: true, description: "Professional corporate style" },
  { id: "gradient", name: "Gradient", showCompany: true, showLogo: true, showGradient: true, showSocials: true, description: "Colorful gradient background" },
];

export const CONTACT_THEMES: ContactThemeConfig[] = [
  { id: "minimal", name: "Minimal", cardGradient: ["#FFFFFF", "#F5F5F5"], textColor: "#1F2937", accentColor: "#6366F1", backgroundColor: "#FFFFFF" },
  { id: "corporate", name: "Corporate", cardGradient: ["#1E3A5F", "#2D5F8A"], textColor: "#FFFFFF", accentColor: "#60A5FA", backgroundColor: "#1E3A5F" },
  { id: "glass", name: "Glass", cardGradient: ["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"], textColor: "#1F2937", accentColor: "#8B5CF6", backgroundColor: "#FFFFFF" },
  { id: "dark", name: "Dark", cardGradient: ["#111827", "#1F2937"], textColor: "#F9FAFB", accentColor: "#818CF8", backgroundColor: "#111827" },
  { id: "instagram", name: "Instagram", cardGradient: ["#833AB4", "#E1306C"], textColor: "#FFFFFF", accentColor: "#FCAF45", backgroundColor: "#833AB4" },
  { id: "linkedin", name: "LinkedIn", cardGradient: ["#0077B5", "#00A0DC"], textColor: "#FFFFFF", accentColor: "#FFFFFF", backgroundColor: "#0077B5" },
  { id: "gradient", name: "Gradient", cardGradient: ["#667EEA", "#764BA2"], textColor: "#FFFFFF", accentColor: "#F093FB", backgroundColor: "#667EEA" },
];
