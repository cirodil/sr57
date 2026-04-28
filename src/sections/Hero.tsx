import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".hero-btn",
          {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5",
        );

      // Parallax on scroll
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 w-full h-full">
        <img
          src="/images/hero-house.jpg"
          alt="Каркасный дом"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
      >
        <h1 className="hero-title font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-bold leading-tight mb-6">
          Дом мечты
          <br />
          начинается здесь
        </h1>
        <p className="hero-subtitle font-inter text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Строительство каркасных домов, бань, беседок, террас под ключ в Орле и
          Орловской области
        </p>
        <button onClick={scrollToServices} className="hero-btn btn-primary">
          Получить консультацию
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
