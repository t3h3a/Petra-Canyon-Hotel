import { useLanguage } from "@/components/LanguageProvider";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
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
    { name: t.nav.home, href: "#home" },
    { name: t.nav.rooms, href: "#rooms" },
    { name: t.nav.amenities, href: "#amenities" },
    { name: t.nav.restaurant, href: "#restaurant" },
    { name: t.nav.location, href: "#location" },
  ];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className={`font-serif text-2xl tracking-wider font-semibold ${isScrolled ? "text-primary" : "text-white"}`}>
              PETRA CANYON
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="flex items-center gap-2 ml-4 border-l border-border/30 pl-6">
              <button 
                onClick={() => setLanguage('en')}
                className={`text-sm font-semibold ${language === 'en' ? 'text-primary' : isScrolled ? 'text-foreground' : 'text-white/80'}`}
              >
                EN
              </button>
              <span className={isScrolled ? 'text-border' : 'text-white/30'}>|</span>
              <button 
                onClick={() => setLanguage('ar')}
                className={`text-sm font-semibold ${language === 'ar' ? 'text-primary' : isScrolled ? 'text-foreground' : 'text-white/80'}`}
              >
                عربي
              </button>
              <span className={isScrolled ? 'text-border' : 'text-white/30'}>|</span>
              <button 
                onClick={() => setLanguage('fr')}
                className={`text-sm font-semibold ${language === 'fr' ? 'text-primary' : isScrolled ? 'text-foreground' : 'text-white/80'}`}
              >
                FR
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-foreground" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-foreground" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-left py-2 text-foreground font-medium border-b border-border/50"
            >
              {link.name}
            </button>
          ))}
          
          <div className="flex gap-4 pt-2">
            <Button variant={language === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('en')}>EN</Button>
            <Button variant={language === 'ar' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('ar')}>عربي</Button>
            <Button variant={language === 'fr' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('fr')}>FR</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
