export const SITE_CONFIG = {
  title: "RogueTeacher",
  description: "Mostly musings, for me to stay sharp and an excuse to code. I write algorithms, or at least a meaningful app or visualisation to explain my thoughts.",
  author: "Yeo Yong Kiat",
  email: "yeoyongkiat@gmail.com"
} as const;

export const BLOG_CONFIG = {
  postsPerPage: 9,
  defaultView: 'grid' as const,
  defaultSort: 'date-desc' as const,
  sections: {
    title: "Writing keeps ideas alive",
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