import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
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

      gsap.from(".about-image", {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-light py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="about-text lg:w-[55%]">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl uppercase font-bold text-brown mb-8">
              Кто мы
            </h2>
            <p className="text-[#555555] text-base md:text-lg leading-relaxed mb-6">
              <strong className="text-brown">Стройрегион57</strong> — команда
              профессионалов со стажем работы более 10 лет. Мы специализируемся
              на строительстве каркасных домов, бань, беседок и террас в Орле и
              Орловской области.
            </p>
            <p className="text-[#555555] text-base md:text-lg leading-relaxed mb-6">
              Каждый проект — это индивидуальный подход, качественные материалы
              и строгое соблюдение технологий. Мы выполняем работы согласно
              СНиПам и современным стандартам строительства, обеспечивая высокое
              качество и надёжность конструкций.
            </p>
            <p className="text-[#555555] text-base md:text-lg leading-relaxed mb-8">
              Наша цель — создать для вас пространство, где хочется жить.
              Кровля, утепление, облицовка, внутренняя отделка — мы готовы
              выполнить любые работы для вашего дома.
            </p>
            <a
              href="#contacts"
              className="btn-secondary inline-block"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contacts")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Связаться с нами
            </a>
          </div>

          {/* Image */}
          <div className="about-image lg:w-[45%]">
            <div className="relative overflow-hidden rounded-lg shadow-card">
              <img
                src="/images/logo.jpg"
                alt="Строительная команда"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white font-playfair text-lg uppercase">
                  Более 10 лет опыта
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
