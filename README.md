<div align="center">

# Qrigo — Free QR Code & Barcode Generator

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?style=flat-square&logo=pwa)](public/manifest.json)

**Create, scan, and export QR codes and barcodes — entirely in your browser. No signup, no server uploads, no ads.**

[Live Demo](https://qrigo.vercel.app) ·
[Report Bug](https://github.com/pjprogrammers/qrigo/issues) ·
[Request Feature](https://github.com/pjprogrammers/qrigo/issues)

</div>

> **Latest**: Image upload scanning with multi-stage decoder (8 variants), scan-specific OG image, FAQ/HowTo structured data, full accessibility pass, and dedicated `/scan/qr` & `/scan/barcode` sub-routes.

---

## Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Route Map](#-route-map)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [SEO & Performance](#-seo--performance)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## ✨ Features

<table>
<tr>
  <td width="50%">

### QR Code Generator
- **10 types**: URL, Text, Email, Phone, SMS, WhatsApp, WiFi, Location, Event, vCard
- Custom colors, gradients, and Instagram-style themes
- Dot size, module size, error correction control
- Download as **PNG, SVG, JPEG, WebP**
- Platform presets (Instagram, Spotify, etc.)

  </td>
  <td width="50%">

### Barcode Generator
- **7 formats**: Code128, EAN-13, EAN-8, UPC-A, UPC-E, ITF-14, Codabar
- Custom card themes and backgrounds
- High-resolution export
- Multiple download formats

  </td>
</tr>
<tr>
  <td width="50%">

### Business Card (vCard) QR
- Beautiful business card preview
- 4 templates (Minimal, Modern, Corporate, Gradient)
- 7 color themes
- Export as VCF, PNG, SVG, PDF
- Company logo upload
- Social links (Instagram, LinkedIn, GitHub, Twitter, Facebook, YouTube)

  </td>
  <td width="50%">

### QR & Barcode Scanner
- Real-time camera scanning with QR code + 1D barcode support
- **Image upload scanning** — drag & drop or browse files for offline decoding
- **Multi-stage decoder** — 8 image variants (grayscale, high-contrast, sharpened, threshold, 3 rotations) for maximum decode rate
- Dual-engine fallback: ZXing (primary) + jsQR (secondary)
- Camera switching (front/rear), flash toggle
- Auto-detect and parse scan results with contextual actions (open, copy, share, call)
- Dedicated sub-routes: `/scan/qr` (QR-only) and `/scan/barcode` (barcode-only)

  </td>
</tr>
<tr>
  <td width="50%">

### History & Favorites
- All generated codes saved automatically
- Favorites for quick access
- Search and filter
- Local persistence via IndexedDB

  </td>
  <td width="50%">

### Privacy First
- **100% client-side** — no data leaves your browser
- No accounts, no signup, no tracking
- All processing via Web APIs
- No server-side storage

  </td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18.18
- npm (included with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/pjprogrammers/qrigo.git
cd qrigo

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: No environment variables are required for development. The app runs entirely client-side.

---

## 🗺️ Route Map

| Route | Description |
|---|---|
| `/` | Homepage — overview and quick links |
| `/generate` | Generator hub — choose QR, barcode, or contact card |
| `/generate/qr` | QR code generator (10 types via tabs) |
| `/generate/barcode` | Barcode generator (7 symbologies) |
| `/generate/contact` | Business card / vCard generator |
| `/generate/wifi` | WiFi QR code generator |
| `/generate/email` | Email QR code generator |
| `/generate/sms` | SMS QR code generator |
| `/generate/whatsapp` | WhatsApp QR code generator |
| `/generate/location` | Location / map QR code generator |
| `/generate/event` | Calendar event QR code generator |
| `/generate/phone` | Phone / tel QR code generator |
| `/scan` | QR + barcode scanner (camera + image upload) |
| `/scan/qr` | QR-only scanner with immediate camera start |
| `/scan/barcode` | Barcode-only scanner with immediate camera start |
| `/history` | Saved generation history |
| `/favorites` | Favorite codes |
| `/settings` | App preferences |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.6](https://www.typescriptlang.org/) (strict mode) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) (configuration-free) |
| **State** | [Zustand 5](https://github.com/pmndrs/zustand) |
| **Storage** | [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via [idb](https://github.com/jakearchibald/idb) |
| **QR Generation** | [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) |
| **Barcode Generation** | [JsBarcode](https://github.com/lindell/JsBarcode) |
| **Camera Scanning** | [@zxing/browser](https://github.com/zxing-js/browser) + [jsQR](https://github.com/cozmo/jsQR) (fallback) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **UI Primitives** | [class-variance-authority](https://cva.style/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| **PWA** | Web App Manifest + Service Worker ready |

---

## 📦 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── generate/           # Generator routes (qr, barcode, contact, wifi, etc.)
│   ├── scan/               # Scanner routes
│   ├── history/            # Saved history
│   ├── favorites/          # Favorites
│   ├── settings/           # App settings
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── sitemap.ts          # Dynamic sitemap.xml
│   ├── robots.ts           # Dynamic robots.txt
│   └── opengraph-image.tsx # Dynamic OG image for social sharing
├── barcode/                # Barcode rendering engine (standalone)
├── components/             # Reusable UI components
│   ├── contact/            # Contact card generator components
│   ├── layout/             # Sidebar navigation
│   ├── scanners/           # Camera + upload scanner components (CameraView, UploadZone, ScannerResult, etc.)
│   ├── seo/                # Structured data, FAQPage, HowTo, ScanFeatures, RelatedTools
│   │   ├── schemas/        # JSON-LD schema components (WebApplication, FAQPage, HowTo, BreadcrumbList, etc.)
│   │   ├── components/     # SEO utilities (Hreflang, RobotsMeta, PreconnectLinks, SkipLink)
│   │   └── meta/           # Metadata builders (KeywordManager, MetadataGenerator, OpenGraphBuilder, etc.)
│   └── ui/                 # Base UI primitives (Button, Card, Input, etc.)
├── features/
│   └── contact/            # vCard generation business logic
├── lib/                    # Shared utilities
│   ├── constants.ts        # Site-wide constants (URL, name, defaults)
│   ├── db/                 # IndexedDB schema and operations
│   ├── qr/                 # QR generation, export, parsing
│   ├── barcode/            # Barcode generation, export, parsing
│   └── scanner/            # Camera scanning engine
├── qr/                     # QR rendering engine (matrix, modules, eyes, themes)
├── store/                  # Zustand state management
└── types/                  # Shared TypeScript type definitions
```

---

## 🔍 SEO & Performance

- **Per-route metadata** — titles, descriptions, keywords, Open Graph, Twitter cards for every page
- **Scan-specific OG image** — dedicated `/scan/opengraph-image` with QR + barcode icons
- **Canonical URLs** — every page has a self-referencing canonical
- **Hreflang tags** — multi-language support via HreflangTags component
- **Sitemap** — auto-generated `/sitemap.xml` covering all indexed routes, scan pages at priority 0.9
- **Robots.txt** — properly configured `/robots.txt` with AI crawler blocking
- **Structured Data** — JSON-LD schemas: `WebApplication`, `FAQPage`, `HowTo`, `BreadcrumbList`, `ItemList`, `Organization`, `SoftwareApplication`, `AggregateRating`, `Review`, `SearchAction`
- **Scan FAQ Schema** — 8-item FAQPage on `/scan` for rich snippet eligibility
- **Scan HowTo Schema** — HowTo structured data for camera + upload workflows
- **Dynamic OG Images** — auto-generated `/opengraph-image.png` via `@vercel/og`
- **Internal Linking** — Related Tools sections on every generator and scanner page
- **PWA Ready** — installable with manifest.json and app icons
- **Security Headers** — X-Content-Type-Options, X-Frame-Options, Permissions-Policy, HSTS
- **100% Client-Side** — all processing in browser for instant loads

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Run linting (`npm run lint`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [QR Code Generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase
- [JsBarcode](https://github.com/lindell/JsBarcode) by Johan Lindell
- [ZXing](https://github.com/zxing-js/browser) browser library
- [Lucide](https://lucide.dev/) icon set
- [Next.js](https://nextjs.org/) team for the amazing framework

---

<p align="center">
  Made with ❤️ for the open source community
</p>
