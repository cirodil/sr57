import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#portfolio" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className={`text-lg font-bold uppercase tracking-widest font-playfair transition-colors duration-300 ${
            scrolled ? "text-brown" : "text-white"
          }`}
        >
          СТРОЙРЕГИОН57
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm uppercase tracking-wider font-medium transition-colors duration-300 hover:opacity-70 ${
                scrolled ? "text-brown" : "text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="tel:+79103003398"
          className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
            scrolled
              ? "bg-green-accent text-white hover:bg-green-dark"
              : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          }`}
        >
          <Phone size={16} />
          Позвонить
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 transition-colors ${
            scrolled ? "text-brown" : "text-white"
          }`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-brown uppercase tracking-wider text-sm font-medium py-2 hover:text-green-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+79103003398"
              className="flex items-center justify-center gap-2 bg-green-accent text-white px-5 py-3 rounded text-sm font-medium uppercase tracking-wider mt-2"
            >
              <Phone size={16} />
              +7 (910) 300-33-98
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
