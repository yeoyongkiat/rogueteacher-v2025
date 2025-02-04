import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/projects'); // This should match the route path
  };

  return (
    <section id="projects" className="section-padding bg-secondary">
      <div className="container mx-auto">
        {/* Header and First Project */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          {/* Left side - Title */}
          <div className="lg:w-1/3">
            <Badge color="primary" className="mb-4">
              Projects
            </Badge>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">Work Pieces</h2>
            <p className="text-sm md:text-base opacity-90 mb-4">
              Not much of a public servant's portfolio can be shared, so here're some of my work pieces that are slightly more public-facing.
            </p>
            <button 
              onClick={handleViewAll}
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 
                rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
            >
              View All
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

          {/* Right side - Featured Project */}
          <div className="lg:w-5/6">
            <ProjectCard 
              project={projects[0]} 
              index={0} 
              variant="featured" 
            />
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(1, 9).map((project, index) => (
            <ProjectCard 
              key={project.title}
              project={project} 
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}