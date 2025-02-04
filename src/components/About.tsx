import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { fadeInUp, fadeIn, scaleIn } from "../utils/animations";
import { wrap } from "popmotion";

const cards = [
  {
    title: "Pedagogy",
    description: "Creating engaging learning experiences and breaking down complex concepts",
    designation: "Physics Teacher",
    organisation: "Ministry of Education, Juying Secondary School",
    duration: "2014 - 2016",
    contributions: "Taught middle-school Physics and supported students from low-income families through enrichment programs and career guidance workshops"
  },
  {
    title: "Data Analysis",
    description: "Turning raw data into actionable insights and the art of storytelling",
    designation: "Senior Communications Planning Officer",
    organisation: "Ministry of Education, Communications & Engagement Group",
    duration: "2017 - 2018",
    contributions: "Led a team to establish a data analytics office and develop a three-year data transformation roadmap, creating business intelligence tools for Senior Management and training programs to enhance officer capabilities"
  },
  {
    title: "Healthcare Finance Policy",
    description: "Stakeholder engagement, public comms, navigating complex systems, and crafting policy solutions that work for everyone",
    designation: "Assistant Director (Subvention)",
    organisation: "Ministry of Health, Healthcare Finance",
    duration: "2019 - 2022",
    contributions: "Reviewed the national healthcare subsidy framework, ensuring affordable Long Term Care (LTC) services for over 700,000 senior citizens and individuals with disabilities"
  },
  {
    title: "Product Management",
    description: "Working with UXDs and software engineers on user-centric solutions through constant iteration",
    designation: "Deputy Director (Policy, Strategy & Design)",
    organisation: "GovTech, Government Digital Services",
    duration: "2022 - 2025",
    contributions: "Pioneered Generative AI applications across the public service, set up an innovation unit TransformGovSG (https://transform.gov.sg) to transform the way agencies make use of data and information"
  },
  {
    title: "Organisation Design",
    description: "Working with the senior leadership to create product organisations that are aligned with the government's digital transformation agenda",
    designation: "Senior Deputy Director (Product Plans & Partnership)",
    organisation: "Ministry of Education, Information Technology Division",
    duration: "2025 - present",
    contributions: "Setting up an innovation unit of software engineers and UX designers to review its IT landscape and develop bespoke digital products for MOE policy officers and educators"
  },
  {
    title: "Reading List",
    description: "Currently reading...",
    books: ["Oversubscribed, Daniel Priestley"]
  },
  {
    title: "Professional Certifications",
    description: "Currently pursuing...",
    certification: ["Master of Public Affairs, UC Berkeley"]
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
                <p className="text-sm md:text-base opacity-90 mb-4">
                  I spent my public service career at the intersection of education, healthcare and technology.
                </p>
                <a 
                  href="/documents/resume-v2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
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
                </a>
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
                    key={cardIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
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
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                      <h3 className="text-xl font-semibold mb-2">{cards[cardIndex].title}</h3>
                      <p className="text-neutral-600 mb-4">{cards[cardIndex].description}</p>
                      <hr />
                      
                      {/* Show designation and contributions if they exist */}
                      {cards[cardIndex].designation && (
                        <div className="space-y-4 mt-4">
                          <div>
                            <h4 className="font-semibold text-[rgb(43,154,154)]">{cards[cardIndex].designation}</h4>
                            <p className="text-sm text-neutral-600">{cards[cardIndex].organisation}</p>
                            <p className="text-sm text-neutral-500">{cards[cardIndex].duration}</p>
                          </div>
                          
                          {cards[cardIndex].contributions && (
                            <div>
                              <p className="text-sm text-neutral-600">{cards[cardIndex].contributions}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Show books if they exist */}
                      {cards[cardIndex].books && (
                        <div className="space-y-2 mt-4">
                          {cards[cardIndex].books.map((book, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-[rgb(43,154,154)]">📚</span>
                              <p className="text-sm text-neutral-600">{book}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Show certifications if they exist */}
                      {cards[cardIndex].certification && (
                        <div className="space-y-2 mt-4">
                          {cards[cardIndex].certification.map((cert, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-[rgb(43,154,154)]">🎓</span>
                              <p className="text-sm text-neutral-600">{cert}</p>
                            </div>
                          ))}
                        </div>
                      )}
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