import { Phone, MapPin, Lock } from "lucide-react";
import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="section-dark py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#"
            className="text-lg font-bold uppercase tracking-widest font-playfair text-white"
          >
            СТРОЙРЕГИОН57
          </a>

          {/* Center */}
          <p className="text-white/50 text-sm text-center">
            © 2025 Стройрегион57. Все права защищены.
          </p>

          {/* Right */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+79103003398"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <Phone size={14} />
              +7 (910) 300-33-98
            </a>
            <a
              href="tel:+79208256968"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <Phone size={14} />
              +7 (920) 825-69-68
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/40 text-xs">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            ул. Тамбовская 2, г. Орёл
          </span>
          <span>•</span>
          <span>Строительство каркасных домов, бань, беседок, террас</span>
          <span>•</span>
          <span>Орёл и Орловская область</span>
          <span>•</span>
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-1 hover:text-white/70 transition-colors"
          >
            <Lock size={10} />
            Админ
          </button>
        </div>
      </div>
    </footer>
  );
}
