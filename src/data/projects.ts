import transformLogo from "/images/transform-logo.svg";
import socialMediaAnalytics from "/images/social-media-analytics.png";
import nhgHeal from "/images/nhg-heal-2024.jpeg";
import govinsiderSense from "/images/govinsider-sense.jpeg";
import shbc from "/images/shbc-2024.jpeg";

export type Project = {
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

export const projects: Project[] = [
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
    title: "GovInsider Feature",
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
    title: "Social Media Analytics",
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
    title: "NHG HEAL 2024",
    description: "Spoke at a national healthcare conference on the future of healthcare and how AI can be used to improve patient care.",
    category: "HealthTech",
    link: "https://www.linkedin.com/posts/yongkiat_i-was-invited-to-quite-a-treat-when-i-spoke-activity-7250134828824551424-UGKO",
    media: {
      type: 'image',
      src: nhgHeal,
      alt: 'NHG HEAL 2024'
    }
  },
  {
    title: "SHBC 2024",
    description: "Spoke at SingHealth's annual conference on how to reimagine a democratised healthcare system.",
    category: "HealthTech",
    link: "https://www.linkedin.com/posts/yongkiat_spoke-at-the-18th-public-health-occupational-activity-7244218816790945792-P2zg",
    media: {
      type: 'image',
      src: shbc,
      alt: 'SHBC 2024'
    }
  }
];

export const bottomFeatureProject: Project = {
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