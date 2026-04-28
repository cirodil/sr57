import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, MapPin, Clock, MessageCircle, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OPEN_KEY = "1bbca35702117c52a808149e01f8dd7269ef594f11c6f";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-form", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-info", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("message", formData.message);
      data.append("redirect-to", "no-redirect");

      const response = await fetch(`https://formhub.dev/io/${OPEN_KEY}`, {
        method: "POST",
        body: data,
      });

      const result = await response.text();

      if (response.ok && result === "OK") {
        setSubmitted(true);
        setFormData({ name: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError("Ошибка отправки. Попробуйте позже.");
      }
    } catch {
      setError("Ошибка сети. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="section-beige py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Form */}
          <div className="contact-form lg:w-1/2">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl uppercase font-bold text-brown mb-8">
              Оставить заявку
            </h2>

            {submitted ? (
              <div className="bg-green-accent/10 border border-green-accent rounded-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-accent flex items-center justify-center">
                  <MessageCircle size={32} className="text-white" />
                </div>
                <h3 className="font-playfair text-xl text-brown mb-2">
                  Спасибо!
                </h3>
                <p className="text-[#555555]">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-brown mb-2 uppercase tracking-wider">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-accent focus:ring-1 focus:ring-green-accent transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown mb-2 uppercase tracking-wider">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-accent focus:ring-1 focus:ring-green-accent transition-colors"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown mb-2 uppercase tracking-wider">
                    Сообщение
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-accent focus:ring-1 focus:ring-green-accent transition-colors resize-none"
                    placeholder="Опишите ваш проект..."
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {loading ? "Отправка..." : "Отправить"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-info lg:w-1/2">
            <h3 className="font-playfair text-2xl uppercase font-bold text-brown mb-8">
              Контактная информация
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-green-accent" />
                </div>
                <div>
                  <p className="text-sm text-[#555555] uppercase tracking-wider mb-1">
                    Телефон
                  </p>
                  <a
                    href="tel:+79103003398"
                    className="text-brown font-medium text-lg hover:text-green-accent transition-colors"
                  >
                    +7 (910) 300-33-98
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-green-accent" />
                </div>
                <div>
                  <p className="text-sm text-[#555555] uppercase tracking-wider mb-1">
                    Адрес
                  </p>
                  <p className="text-brown font-medium text-lg">
                    ул. Тамбовская 2, г. Орёл
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-green-accent" />
                </div>
                <div>
                  <p className="text-sm text-[#555555] uppercase tracking-wider mb-1">
                    График работы
                  </p>
                  <p className="text-brown font-medium text-lg">
                    Пн–Пт: 9:00–18:00
                  </p>
                  <p className="text-brown font-medium text-lg">
                    Сб: 10:00–15:00
                  </p>
                </div>
              </div>

              {/* VK */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-green-accent" />
                </div>
                <div>
                  <p className="text-sm text-[#555555] uppercase tracking-wider mb-1">
                    Мы ВКонтакте
                  </p>
                  <a
                    href="https://vk.ru/stroyregion57"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brown font-medium text-lg hover:text-green-accent transition-colors"
                  >
                    vk.com/stroyregion57
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 h-56 flex items-center justify-center">
              <iframe
                src="https://api-maps.yandex.ru/frame/v1/-/CPCDUBya?lang=ru_RU"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта — ул. Тамбовская 2, г. Орёл"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
