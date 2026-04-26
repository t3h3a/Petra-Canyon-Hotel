import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { siteImages } from "@/data";

const ARABIC_LABEL = "\u0639\u0631\u0628\u064A";

export function Navbar() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.rooms, href: "/rooms" },
    { name: t.nav.amenities, href: "/amenities" },
    { name: t.nav.restaurant, href: "/restaurant" },
    { name: t.nav.location, href: "/location" },
    { name: t.booking.search, href: "/booking-request" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 py-3.5 shadow-sm backdrop-blur-md"
          : "bg-[linear-gradient(180deg,rgba(8,8,8,0.44),rgba(8,8,8,0.14),transparent)] py-4 sm:py-5 lg:py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex items-center justify-between">
          <div className={`hidden w-full items-center justify-between gap-8 lg:flex ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <Link
              href="/"
              className={`shrink-0 text-base font-semibold uppercase tracking-[0.42em] transition-colors ${
                isScrolled ? "text-primary" : "text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.58)]"
              }`}
            >
              Petra Canyon
            </Link>

            <div className={`flex min-w-0 flex-1 items-center gap-9 ${dir === "rtl" ? "justify-start" : "justify-end"}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-medium tracking-wide transition-colors hover:text-primary ${
                    location === link.href
                      ? "text-primary"
                      : isScrolled
                        ? "text-foreground"
                        : "text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.58)]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className={`flex items-center gap-2.5 ${dir === "rtl" ? "mr-4 border-r border-border/30 pr-6" : "ml-4 border-l border-border/30 pl-6"}`}>
                <button
                  onClick={() => setLanguage("en")}
                  className={`text-[15px] font-semibold ${
                    language === "en"
                      ? "text-primary"
                      : isScrolled
                        ? "text-foreground"
                        : "text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.58)]"
                  }`}
                >
                  EN
                </button>
                <span className={isScrolled ? "text-border" : "text-white/30"}>|</span>
                <button
                  onClick={() => setLanguage("ar")}
                  className={`text-[15px] font-semibold ${
                    language === "ar"
                      ? "text-primary"
                      : isScrolled
                        ? "text-foreground"
                        : "text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.58)]"
                  }`}
                >
                  {ARABIC_LABEL}
                </button>
                <span className={isScrolled ? "text-border" : "text-white/30"}>|</span>
                <button
                  onClick={() => setLanguage("fr")}
                  className={`text-[15px] font-semibold ${
                    language === "fr"
                      ? "text-primary"
                      : isScrolled
                        ? "text-foreground"
                        : "text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.58)]"
                  }`}
                >
                  FR
                </button>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute left-1/2 flex min-w-0 -translate-x-1/2 items-center lg:hidden">
            <Link
              href="/"
              className={`pointer-events-auto flex min-w-0 items-center gap-1.5 rounded-full border px-3 py-2 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all ${
                isScrolled
                  ? "border-border/60 bg-background/90 backdrop-blur-md"
                  : "border-white/15 bg-black/28 backdrop-blur-xl"
              }`}
            >
              <span
                className={`w-[5.2rem] text-center text-[11px] font-semibold tracking-[0.28em] sm:text-sm ${
                  isScrolled ? "text-foreground" : "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
                }`}
              >
                PETRA
              </span>
              <img
                src={siteImages.logo}
                alt="Petra Canyon logo"
                className={`h-10 w-14 shrink-0 object-contain transition-all ${
                  isScrolled
                    ? "opacity-100 drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
                    : "opacity-100 brightness-0 invert drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
                }`}
              />
              <span
                className={`w-[5.2rem] text-center text-[11px] font-semibold tracking-[0.28em] sm:text-sm ${
                  isScrolled ? "text-foreground" : "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
                }`}
              >
                CANYON
              </span>
            </Link>
          </div>

          <button
            className={`relative z-10 ml-auto rounded-full border p-2.5 transition-all lg:hidden ${
              isScrolled
                ? "border-border/60 bg-background/90 text-foreground shadow-sm"
                : "border-white/15 bg-black/28 text-white shadow-[0_14px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="absolute left-4 right-4 top-full rounded-2xl border border-border bg-background/95 px-4 py-4 shadow-xl backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-left font-medium text-foreground transition-colors hover:bg-secondary/40"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-border/60 pt-4">
            <Button className="min-w-[4.5rem] flex-1" variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
              EN
            </Button>
            <Button className="min-w-[4.5rem] flex-1" variant={language === "ar" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ar")}>
              {ARABIC_LABEL}
            </Button>
            <Button className="min-w-[4.5rem] flex-1" variant={language === "fr" ? "default" : "outline"} size="sm" onClick={() => setLanguage("fr")}>
              FR
            </Button>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
