import { useEffect, useRef } from "react";

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      text.style.opacity = "1";
      text.style.transform = "translateY(0)";
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <span className="text-sm uppercase tracking-widest mb-4 inline-block animate-fade-in">
          Welcome
        </span>
        <h1
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-7xl font-medium mb-6 opacity-0 transform translate-y-4 transition-all duration-700 ease-out"
        >
          Creating Digital
          <br />
          Experiences
        </h1>
        <p className="max-w-md mx-auto text-neutral-600 mb-8 animate-fade-in">
          A minimalist approach to design and development
        </p>
        <a
          href="#projects"
          className="inline-block px-8 py-4 bg-black text-white hover:bg-neutral-800 transition-colors duration-300"
        >
          View Work
        </a>
      </div>
    </section>
  );
}