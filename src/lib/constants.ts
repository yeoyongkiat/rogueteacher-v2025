export const SITE_CONFIG = {
  title: "Rogue Teacher",
  description: "Writing helps me organize my thoughts. Here are some of my reflections on technology, education, and public service.",
  author: "Your Name",
  email: "your.email@example.com"
} as const;

export const BLOG_CONFIG = {
  postsPerPage: 9,
  defaultView: 'grid' as const,
  defaultSort: 'date-desc' as const,
  sections: {
    title: "Thoughts & Insights",
    description: SITE_CONFIG.description,
  }
} as const;

export const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
} as const; 