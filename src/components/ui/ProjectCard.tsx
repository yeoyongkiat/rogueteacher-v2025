import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { MediaContent } from "./MediaContent";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: 'default' | 'featured';
}

export function ProjectCard({ project, index, variant = 'default' }: ProjectCardProps) {
  const isDefault = variant === 'default';
  
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      className={`group relative overflow-hidden bg-white hover:bg-neutral-50 
        transition-colors duration-300 rounded-2xl shadow-lg
        ${isDefault ? 'p-8' : 'p-12'}`}
    >
      <Badge color="neutral">{project.category}</Badge>
      
      {project.media && (
        <MediaContent 
          media={project.media} 
          className="mt-4 mb-6"
        />
      )}

      <h3 className={`font-semibold mb-4 ${
        isDefault ? 'text-2xl' : 'text-3xl'
      }`}>
        {project.title}
      </h3>

      <p className={`text-neutral-600 ${isDefault ? '' : 'text-lg'}`}>
        {project.description}
      </p>

      {project.link && (
        <a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[rgb(43,154,154)] 
            hover:text-[rgb(43,154,154)]/80 transition-colors mt-4"
        >
          {project.link.includes('youtube.com') ? 'View channel →' : 
           project.link.includes('tableau.com') ? 'View dashboard →' : 
           project.link.includes('govinsider.asia') ? 'View article →' : 
           project.link.includes('linkedin.com') ? 'View post →' : 
           'View website →'}
        </a>
      )}
    </motion.div>
  );
} 