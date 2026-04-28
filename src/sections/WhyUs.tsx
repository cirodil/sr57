import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, Clock, Package, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: ClipboardCheck,
    title: 'Гарантия 5 лет',
    desc: 'Письменный договор и официальная гарантия на все виды работ',
  },
  {
    icon: Clock,
    title: 'Точные сроки',
    desc: 'Строго соблюдаем согласованные сроки строительства',
  },
  {
    icon: Package,
    title: 'Качественные материалы',
    desc: 'Только проверенные поставщики и сертифицированные материалы',
  },
  {
    icon: Users,
    title: 'Индивидуальный подход',
    desc: 'Учитываем все ваши пожелания и особенности участка',
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.why-card', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-light py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="why-title font-playfair text-3xl sm:text-4xl md:text-5xl uppercase font-bold text-brown text-center mb-14">
          Почему выбирают нас
        </h2>

        <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="why-card text-center group hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-accent/10 flex items-center justify-center group-hover:bg-green-accent/20 transition-colors">
                  <Icon size={32} className="text-green-accent" />
                </div>
                <h3 className="font-playfair text-lg uppercase font-semibold text-brown mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
