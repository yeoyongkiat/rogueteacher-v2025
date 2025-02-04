import { motion } from "framer-motion";
import { Project } from "../data/projects";
import { fadeInUp } from "../utils/animations";

type ProjectGridProps = {
  projects: Project[];
}

export const MediaContent = ({ media }: { media?: Project['media'] }) => {
  if (!media) return null;

  return (
    <div className={`w-full mb-6 rounded-xl overflow-hidden ${
      media.type === 'video' ? 'aspect-video' : 'h-48'
    }`}>
      {media.type === 'video' ? (
        <iframe
          className="w-full h-full"
          src={media.src}
          title={media.alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img 
          src={media.src}
          alt={media.alt || ''}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={index * 0.1}
          className="group relative overflow-hidden bg-white p-8 hover:bg-neutral-50 
            transition-colors duration-300 rounded-2xl shadow-lg"
        >
          <span className="text-xs text-neutral-500 mb-2 block">
            {project.category}
          </span>

          {project.media && <MediaContent media={project.media} />}

          <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
          <p className="text-neutral-600 mb-6">{project.description}</p>

          {project.link && (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[rgb(43,154,154)] 
                hover:text-[rgb(43,154,154)]/80 transition-colors"
            >
              {project.link.includes('youtube.com') ? 'View channel →' : 
               project.link.includes('tableau.com') ? 'View dashboard →' : 
               project.link.includes('govinsider.asia') ? 'View article →' : 
               project.link.includes('linkedin.com') ? 'View post →' : 
               'View website →'}
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
} 