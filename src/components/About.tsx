import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, fadeIn, scaleIn } from "../utils/animations";
import { wrap } from "popmotion";

const cards = [
  {
    title: "Pedagogy",
    description: "Creating engaging learning experiences and breaking down complex concepts"
  },
  {
    title: "Data Analysis",
    description: "Turning raw data into actionable insights and the art of storytelling"
  },
  {
    title: "Public Service",
    description: "Stakeholder engagement, navigating complex systems, and crafting solutions that work for everyone"
  },
  {
    title: "Product Management",
    description: "Working with UXDs and software engineers on user-centric solutions through constant iteration"
  },
  {
    title: "Reading List",
    description: "Books and articles that have shaped my thinking and approach to work"
  },
  {
    title: "Professional Certifications",
    description: "Continuous learning through formal education and certifications"
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export default function About() {
  const [[page, direction], setPage] = useState([0, 0]);
  const cardIndex = wrap(0, cards.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section 
      id="about" 
      className="section-padding bg-[#f6f6f6] py-12 md:py-0 min-h-screen flex flex-col justify-center"
    >
      <div className="relative container mx-auto">
        <div className="mx-auto">
          {/* Mission Statement Card */}
          <div className="bg-[rgb(43,154,154)] rounded-2xl p-8 md:p-12 mb-24 shadow-lg 
            hover:shadow-xl transition-shadow text-white">
            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white mb-4">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight">
              I've had quite a bit of a journey from classroom to code, to policy and to product
            </h2>
            <p className="text-lg text-white-600">
              It's one of the worst nightmares to have to constantly reskill. But it's also one of the best things in life to keep learning.
              In just 12 years, I've been an educator, data analyst, policy maker, and more recently a product manager. I hope that by sharing
              my journey here, I can also inspire you to keep learning and growing.
            </p>
          </div>

          {/* Services Section */}
          <div className="mt-24">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  My Resumé
                </h3>
                <p className="text-sm md:text-base opacity-90 mb-4">
                  I spent my public service career at the intersection of education, healthcare and technology.
                </p>
                <button 
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
                >
                  Resumé
                  <svg 
                    className="w-4 h-4" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Cards Carousel */}
              <div className="relative w-full h-[500px] overflow-visible">
                {/* Navigation Dots */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage([index, index - cardIndex])}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === cardIndex ? 'bg-[rgb(43,154,154)] w-4' : 'bg-[rgb(43,154,154)]/50'
                      }`}
                    />
                  ))}
                </div>

                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    className="absolute w-full"
                  >
                    <div className="relative bg-white rounded-2xl p-8 md:p-12 text-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                      {/* Card Content */}
                      <h4 className="flex items-center text-xl mb-6 font-semibold">
                        {cards[cardIndex].title}
                      </h4>
                      <div className="h-px bg-neutral-200 w-full mb-8" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {cards[cardIndex].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}