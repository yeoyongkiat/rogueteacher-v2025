import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Brain, 
  TestTube2,
  BarChart,
  BookOpenCheck,
  Laptop,
  Bot,
  Blocks,
  Lightbulb,
  Puzzle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type App = {
  title: string;
  description: string;
  status: 'Live' | 'Beta' | 'Development';
  technologies: string[];
  link?: string;
  github?: string;
  Icon: LucideIcon;
}

const apps: App[] = [
  {
    title: "TeachGPT",
    description: "An AI teaching assistant that helps educators create lesson plans, worksheets, and assessments.",
    status: "Beta",
    technologies: ["OpenAI", "React", "Node.js", "MongoDB"],
    link: "#",
    github: "https://github.com/username/teachgpt",
    Icon: Brain
  },
  {
    title: "ChemViz",
    description: "Interactive 3D visualization tool for chemistry concepts, making molecular structures easier to understand.",
    status: "Live",
    technologies: ["Three.js", "React", "TypeScript"],
    link: "#",
    github: "https://github.com/username/chemviz",
    Icon: TestTube2
  },
  {
    title: "EduMetrics",
    description: "Analytics dashboard for teachers to track student progress and identify learning gaps.",
    status: "Development",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "D3.js"],
    github: "https://github.com/username/edumetrics",
    Icon: BarChart
  },
  {
    title: "StudyBuddy",
    description: "A personalized learning companion that adapts to student's learning style and pace.",
    status: "Beta",
    technologies: ["React Native", "Firebase", "TensorFlow"],
    link: "#",
    github: "https://github.com/username/studybuddy",
    Icon: BookOpenCheck
  },
  {
    title: "CodeMentor",
    description: "Interactive coding platform with real-time feedback and AI-powered code suggestions.",
    status: "Development",
    technologies: ["Vue.js", "WebAssembly", "Python"],
    github: "https://github.com/username/codementor",
    Icon: Laptop
  },
  {
    title: "EduBot",
    description: "Conversational AI tutor that helps students practice concepts through natural dialogue.",
    status: "Live",
    technologies: ["OpenAI", "Next.js", "Socket.io"],
    link: "#",
    github: "https://github.com/username/edubot",
    Icon: Bot
  },
  {
    title: "LearnBlocks",
    description: "Modular learning platform that breaks down complex topics into manageable chunks.",
    status: "Beta",
    technologies: ["Svelte", "GraphQL", "PostgreSQL"],
    link: "#",
    github: "https://github.com/username/learnblocks",
    Icon: Blocks
  },
  {
    title: "ConceptMap",
    description: "Visual learning tool that helps students connect and understand related concepts.",
    status: "Development",
    technologies: ["D3.js", "React", "Neo4j"],
    github: "https://github.com/username/conceptmap",
    Icon: Lightbulb
  },
  {
    title: "SkillTree",
    description: "Gamified learning platform that visualizes skill progression and unlocks achievements.",
    status: "Beta",
    technologies: ["Unity", "C#", "MongoDB"],
    link: "#",
    github: "https://github.com/username/skilltree",
    Icon: Puzzle
  }
];

export default function Apps() {
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);

  return (
    <section id="apps" className="section-padding bg-[#f6f6f6] pb-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Header Card - Left Side */}
          <div className="w-full md:w-1/3">
            <div className="flex flex-col">
            <span className="inline-flex w-fit px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs 
                font-medium bg-[rgb(217,233,233)] text-[rgb(43,154,154)] mb-4 md:mb-6 animate-fade-in"
              >
                Portfolio
              </span>
              <h2 className="text-4xl md:text-6xl font-semibold mb-6">Apps</h2>
              <p className="text-sm md:text-base opacity-90 mb-4">
                Coding helps me prototype ideas and find solutions.
              </p>
            </div>
          </div>

          {/* Apps Grid - Right Side */}
          <div className="w-full md:w-2/3">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
                {apps.map((app, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className="relative"
                      onMouseEnter={() => setHoveredApp(index)}
                      onMouseLeave={() => setHoveredApp(null)}
                    >
                      {/* App Icon */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-16 h-16 mx-auto bg-white rounded-xl p-3 shadow-lg hover:shadow-xl 
                          transition-all cursor-pointer flex items-center justify-center"
                      >
                        <app.Icon 
                          className="w-8 h-8 text-[rgb(43,154,154)]" 
                          strokeWidth={1.5}
                        />
                      </motion.div>

                      {/* Hover Card */}
                      <AnimatePresence>
                        {hoveredApp === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute z-10 -right-1/2 -translate-x-1/2 -top-20 w-72"
                          >
                            <div className="bg-white rounded-2xl p-6 shadow-xl">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">{app.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  app.status === 'Live' ? 'bg-green-100 text-green-700' :
                                  app.status === 'Beta' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-neutral-100 text-neutral-700'
                                }`}>
                                  {app.status}
                                </span>
                              </div>

                              <p className="text-sm text-neutral-600 mb-4">
                                {app.description}
                              </p>

                              <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                  {app.technologies.map((tech, techIndex) => (
                                    <span 
                                      key={techIndex}
                                      className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex gap-4">
                                  {app.link && (
                                    <a 
                                      href={app.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-[rgb(43,154,154)] hover:text-[rgb(43,154,154)]/80 transition-colors text-sm"
                                    >
                                      Visit App
                                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                      </svg>
                                    </a>
                                  )}
                                  {app.github && (
                                    <a 
                                      href={app.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors text-sm"
                                    >
                                      View Code
                                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                      </svg>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 