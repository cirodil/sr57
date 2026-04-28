import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Строительство домов",
    desc: "47 000 ₽/м²",
    image: "/images/service_house.jpg",
    alt: "Строительство домов",
  },
  {
    title: "А-фрейм строительство",
    desc: "1 500 000 ₽",
    image: "/images/service_aframe.jpg",
    alt: "А-фрейм",
  },
  {
    title: "Беседки",
    desc: "190 000 ₽",
    image: "/images/service_gazebo.jpg",
    alt: "Беседка",
  },
  {
    title: "Террасы и веранды",
    desc: "6 000 ₽",
    image: "/images/service-terrace.jpg",
    alt: "Терраса",
  },
  {
    title: "Кровельные работы",
    desc: "2 000 ₽/м²",
    image: "/images/service-roof.jpg",
    alt: "Кровля",
  },
  {
    title: "Строительство Барнхаус",
    desc: "67 000 ₽/м²",
    image: "/images/service_barnhouse.jpg",
    alt: "Строительство Барнхаус",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация заголовка
      gsap.from(".services-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false, // 🔑 Убирает "мерцание" до расчёта позиции
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true, // 🔑 Современный аналог toggleActions: 'play none none none'
        },
      });

      // Анимация карточек
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%", // Чуть ниже, чтобы сетка гарантированно вошла в viewport
          once: true,
          // Если картинки грузятся долго, раскомментируйте строку ниже:
          // onRefresh: () => ScrollTrigger.refresh(),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-beige py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="services-title font-playfair text-3xl sm:text-4xl md:text-5xl uppercase font-bold text-brown text-center mb-14">
          Наши услуги
        </h2>

        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card group bg-white rounded-lg overflow-hidden shadow-card transition-all duration-300"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-lg uppercase font-semibold text-brown mb-2">
                  {service.title}
                </h3>
                <p className="text-[#555555] text-sm">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
