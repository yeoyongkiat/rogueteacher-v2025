import transformLogo from "/images/transform-logo.svg";
import socialMediaAnalytics from "/images/social-media-analytics.png";
import nhgHeal from "/images/nhg-heal-2024.jpeg";
import govinsiderSense from "/images/govinsider-sense.jpeg";
import shbc from "/images/shbc-2024.jpeg";
import { useEffect } from 'react';
import { motion } from 'framer-motion';

type Project = {
  title: string;
  description: string;
  category: string;
  link?: string;
  media?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
}

const projects: Project[] = [
  {
    title: "Sense: a data-assistant for policy making",
    description: "Designed a Large Language Model adaptor for government databases, for a more informed and evidence-based policy making process.",
    category: "LLMs for Public Service",
    media: {
      type: 'video',
      src: 'https://www.youtube.com/embed/hy9Zp94_W1w',
      alt: 'Sense Project Demo'
    }
  },
  {
    title: "Kaki",
    description: "Together with National Healthcare Group (NHG), co-led the development of a novel socio-healthcare wallet for seamless care coordination.",
    category: "Social Sector Innovation",
    media: {
      type: 'video',
      src: 'https://www.youtube.com/embed/drqBbYUVxco',
      alt: 'Kaki Product Video'
    }
  },
  {
    title: "Transform: Innovation for SG",
    description: "Set up a whole-of-government innovation unit to drive digital transformation in the Singapore public service.",
    category: "Public Sector Transformation",
    link: "https://transform.gov.sg",
    media: {
      type: 'image',
      src: transformLogo,
      alt: 'Transform'
    }
  },
  {
    title: "Converge",
    description: "Product manager of a whole-of-government knowledge management platform. Its chat feature lets agency officers easily find information and securely share it across government teams, facilitating knowledge sharing and improving Whole-of-Government coordination.",
    category: "LLMs for Public Service",
    media: {
      type: 'video',
      src: 'https://www.youtube.com/embed/tkXBR1_gulo',
      alt: 'Converge Product Video'
    }
  },
  {
    title: "Social Media Analytics for Government",
    description: "Developed a set of business intelligence tools to help government agencies monitor social media traction of policy announcements.",
    category: "Data Analytics",
    link: "https://public.tableau.com/app/profile/yeo.yong.kiat/viz/FacebookAnalyticsDashboard-1H2018/FBDashboard",
    media: {
      type: 'image',
      src: socialMediaAnalytics,
      alt: 'Social Media Analytics Dashboard'
    }
  },
  {
    title: "GovInsider",
    description: "Featured in GovInsider for my team's work on Sense, an AI data-assistant for policy making.",
    category: "LLMs for Public Service",
    link: "https://govinsider.asia/intl-en/article/govtech-launches-llm-for-data-driven-policymaking-in-singapore-public-sector",
    media: {
      type: 'image',
      src: govinsiderSense,
      alt: 'GovInsider Article'
    }
  },
  {
    title: "National Healthcare Group HEAL 2024",
    description: "Spoke at a national healthcare conference on the future of healthcare and how AI can be used to improve patient care.",
    category: "HealthTech",
    link: "https://www.linkedin.com/posts/yongkiat_i-was-invited-to-quite-a-treat-when-i-spoke-activity-7250134828824551424-UGKO?utm_source=share&utm_medium=member_desktop"
  },
  {
    title: "SingHealth Singapore Health & Biomedical Conference 2024",
    description: "Spoke at SingHealth's annual conference on how to reimagine a democratised healthcare system.",
    category: "HealthTech",
    link: "https://www.linkedin.com/posts/yongkiat_spoke-at-the-18th-public-health-occupational-activity-7244218816790945792-P2zg?utm_source=share&utm_medium=member_desktop",
    media: {
      type: 'image',
      src: shbc,
      alt: 'SingHealth Singapore Health & Biomedical Conference 2024'
    }
  },
];

// Separate featured bottom project
const bottomFeatureProject: Project = {
  title: "RogueTeacher",
  description: "Built an education video channel on YouTube to help students learn more effectively. Also the start of RogueTeacher as a concept.",
  category: "EdTech",
  link: "https://www.youtube.com/@YeoYongKiat",
  media: {
    type: 'video',
    src: 'https://www.youtube.com/embed/_K-DMp1tPeU',
    alt: 'Flame Tests'
  }
};

const MediaContent = ({ media }: { media?: Project['media'] }) => {
  if (!media) return null;

  return (
    <div className={`w-full mb-6 rounded-xl overflow-hidden bg-white ${
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
          className={`w-full h-full ${media.alt === 'Transform' ? 'object-contain p-4' : 'object-cover'}`}
        />
      )}
    </div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-secondary">
      <div className="container mx-auto">
        {/* Header and First Project */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          {/* Left side - Title */}
          <div className="lg:w-1/3">
            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-[rgb(217,233,233)] text-[rgb(43,154,154)] mb-4">
              Projects
            </span>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">Work Pieces</h2>
            <p className="text-sm md:text-base opacity-90 mb-4">
                  Not much of a public servant's portfolio can be shared, so here're some of my work pieces that are slightly more public-facing.
                </p>
            <button 
              onClick={() => window.location.href = '/projects'}
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
            <div className="group relative overflow-hidden bg-white p-12 hover:bg-neutral-50 transition-colors duration-300 rounded-2xl shadow-lg">
            <span className="text-sm text-neutral-500 mb-4 block">
                {projects[0].category}
              </span>
              {/* Video Container */}
              <div className="w-full aspect-video mb-8 rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/hy9Zp94_W1w"
                  title="Project Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              
              <h3 className="text-3xl font-semibold mb-6">{projects[0].title}</h3>
              <p className="text-lg text-neutral-600 mb-8">{projects[0].description}</p>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(1, 9).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className={`group relative overflow-hidden bg-white p-8 hover:bg-neutral-50 transition-colors duration-300 rounded-2xl shadow-lg
                ${project.title === "National Healthcare Group HEAL 2024" ? "md:row-span-2" : ""}`}
            >
              <span className="text-xs text-neutral-500 mb-2 block">
                {project.category}
              </span>
              
              {/* If it's SkillsFuture, show single card content with double height */}
              {project.title === "National Healthcare Group HEAL 2024" && (
                <>
                  <div className="h-full flex flex-col">
                    <div className="w-full h-130 mb-6 rounded-xl overflow-hidden">
                      <img 
                        src={nhgHeal} 
                        alt="NHG HEAL 2024" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-3xl font-semibold mb-6">{project.title}</h3>
                    <p className="text-neutral-600 flex-grow">
                      {project.description}
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[rgb(43,154,154)] hover:text-[rgb(43,154,154)]/80 transition-colors ml-1"
                        >
                          {project.link.includes('youtube.com') ? 'View channel →' : 
                           project.link.includes('tableau.com') ? 'View dashboard →' : 
                           project.link.includes('govinsider.asia') ? 'View article →' : 
                           project.link.includes('linkedin.com') ? 'View post →' : 
                           'View website →'}
                        </a>
                      )}
                    </p>
                  </div>
                </>
              )}
              
              {/* Skip rendering the CorpPass card since it's no longer needed */}
              {project.title !== "National Healthcare Group HEAL 2024" && (
                <>
                  {project.media && <MediaContent media={project.media} />}
                  <h3 className="text-3xl font-semibold mb-6">{project.title}</h3>
                  <p className="text-neutral-600">
                    {project.description}
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[rgb(43,154,154)] hover:text-[rgb(43,154,154)]/80 transition-colors ml-1"
                      >
                        {project.link.includes('youtube.com') ? 'View channel →' : 
                         project.link.includes('tableau.com') ? 'View dashboard →' : 
                         project.link.includes('govinsider.asia') ? 'View article →' : 
                         project.link.includes('linkedin.com') ? 'View post →' : 
                         'View website →'}
                      </a>
                    )}
                  </p>
                </>
              )}
            </motion.div>
          ))}
          
          {/* Large Combined Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 9 * 0.1 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            className="group relative overflow-hidden bg-white p-8 hover:bg-neutral-50 transition-colors duration-300 rounded-2xl shadow-lg md:col-span-2"
          >
            <span className="text-xs text-neutral-500 mb-2 block">
              {bottomFeatureProject.category}
            </span>
            {bottomFeatureProject.media && <MediaContent media={bottomFeatureProject.media} />}
            <h3 className="text-3xl font-semibold mb-6">{bottomFeatureProject.title}</h3>
            <p className="text-neutral-600 max-w-3xl">
              {bottomFeatureProject.description}
              {bottomFeatureProject.link && (
                <a 
                  href={bottomFeatureProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(43,154,154)] hover:text-[rgb(43,154,154)]/80 transition-colors ml-1"
                >
                  {bottomFeatureProject.link.includes('youtube.com') ? 'View channel →' : 
                   bottomFeatureProject.link.includes('tableau.com') ? 'View dashboard →' : 
                   bottomFeatureProject.link.includes('govinsider.asia') ? 'View article →' : 
                   bottomFeatureProject.link.includes('linkedin.com') ? 'View post →' : 
                   'View website →'}
                </a>
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}