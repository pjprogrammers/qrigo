"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { QrCode, Scan, History, Heart, Settings, Home, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function LogoMark({ className }: { className?: string }) {
  const id = React.useId();
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={`lg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED"/>
          <stop offset="30%" stopColor="#DB2777"/>
          <stop offset="100%" stopColor="#FB923C"/>
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#lg-${id})`} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 13.5 50.5 C 16 34 30 30 32 32 C 34 34 48 16 50.5 13.5" strokeWidth="4.5"/>
        <path d="M 20 20 C 24 14 40 14 44 20" strokeWidth="2.5"/>
        <path d="M 44 20 C 50 24 50 40 44 44" strokeWidth="2.5"/>
        <path d="M 44 44 C 40 50 24 50 20 44" strokeWidth="2.5"/>
        <path d="M 20 44 C 14 40 14 24 20 20" strokeWidth="2.5"/>
        <path d="M 13.5 13.5 C 16 30 30 16 32 32 C 34 48 48 34 50.5 50.5" strokeWidth="4.5"/>
        <path d="M 20 13.5 C 26 6 38 6 44 13.5" strokeWidth="4.5"/>
        <path d="M 50.5 20 C 58 26 58 38 50.5 44" strokeWidth="4.5"/>
        <path d="M 44 50.5 C 38 58 26 58 20 50.5" strokeWidth="4.5"/>
        <path d="M 13.5 44 C 6 38 6 26 13.5 20" strokeWidth="4.5"/>
        <path d="M 57 57 C 59 59 61 61 63 63" strokeWidth="4.5"/>
      </g>
      <g fill={`url(#lg-${id})`}>
        <rect x="7" y="7" width="13" height="13" rx="3.5"/>
        <rect x="44" y="7" width="13" height="13" rx="3.5"/>
        <rect x="44" y="44" width="13" height="13" rx="3.5"/>
        <rect x="7" y="44" width="13" height="13" rx="3.5"/>
      </g>
      <path d="M 28 28 C 30 30 32 32 34 34" fill="none" stroke={`url(#lg-${id})`} strokeWidth="5.5" strokeLinecap="round"/>
    </svg>
  );
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/generate", label: "Generate", icon: QrCode },
  { href: "/scan", label: "Scan", icon: Scan },
  { href: "/history", label: "History", icon: History },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop navbar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-14 border-b border-neutral-200 bg-white/80 backdrop-blur-xl z-40 items-center px-6">
        <Link href="/" className="flex items-center gap-2 mr-8 shrink-0">
          <LogoMark className="w-7 h-7" />
          <span className="text-base font-bold">Qrify</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 border-b border-neutral-200/60 bg-white/80 backdrop-blur-xl z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors -ml-1"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-neutral-700" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <LogoMark className="w-7 h-7" />
          <span className="text-base font-bold">Qrify</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Mobile drawer backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 bottom-0 w-64 bg-white z-50 border-r border-neutral-200 flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <LogoMark className="w-7 h-7" />
          <span className="text-base font-bold">Qrify</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-neutral-200">
          <p className="text-xs text-neutral-400">Qrify v1.0</p>
        </div>
      </aside>
    </>
  );
}
