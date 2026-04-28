import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Дом 117,3 м²",
    desc: "д. Образцово, Орловская обл.",
    image: "/images/portfolio-1.jpg",
  },
  {
    title: "Дом Афрейм 6*6 м",
    desc: "Орловская обл.",
    image: "/images/portfolio-2.jpg",
  },
  {
    title: "Беседка 3х4",
    desc: "г. Орёл",
    image: "/images/portfolio-3.jpg",
  },
  {
    title: "Терраса",
    desc: "Орловская обл.",
    image: "/images/portfolio-4.jpg",
  },
  // {
  //   title: "Каркасный дом 95 м²",
  //   desc: "г. Орёл, ул. Лесная",
  //   image: "/images/service-house.jpg",
  // },
  // {
  //   title: "Терраса к дому",
  //   desc: "п. Августовский, Орловская обл.",
  //   image: "/images/service-terrace.jpg",
  // },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".portfolio-slider", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-slider",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCount);

  const next = () => setCurrent((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setCurrent((prev) => Math.max(prev - 1, 0));

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-dark py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="portfolio-title font-playfair text-3xl sm:text-4xl md:text-5xl uppercase font-bold text-white text-center mb-14">
          Наши работы
        </h2>

        <div className="portfolio-slider relative">
          {/* Slider container */}
          <div className="overflow-hidden rounded-lg">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${current * (100 / visibleCount)}%)`,
              }}
            >
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="group overflow-hidden rounded-lg bg-white/5">
                    <div className="h-64 sm:h-72 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-playfair text-lg uppercase font-semibold text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm">{project.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            disabled={current === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
              current === 0
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={next}
            disabled={current >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
              current >= maxIndex
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current
                    ? "bg-green-accent w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
