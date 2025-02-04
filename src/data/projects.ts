import transformLogo from "/images/transform-logo.svg";
import socialMediaAnalytics from "/images/social-media-analytics.png";
import nhgHeal from "/images/nhg-heal-2024.jpeg";
import govinsiderSense from "/images/govinsider-sense.jpeg";
import shbc from "/images/shbc-2024.jpeg";
import masterThesis from "/images/master-theoretical-chemistry.png";
import mohLogoBadge from "/images/moh-logo-badge.png";
import blockchain from "/images/blockchain.png";
import mddiWorkshop from "/images/mddi-workshop.png";
import ssmp from "/images/ssmp.jpeg";
import stackMeetup from "/images/stack-meetup.jpeg";
import msfBrownbag from "/images/msf-brownbag.jpeg";
import stack from "/images/stack.png";
import medium from "/images/medium.png";
import dataScienceConnect from "/images/data-science-connect.png";

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
    title: "Converge",
    description: "Product manager of Converge, a LLM knowledge management tool that manages diverse knowledge sources from emails to documents on SharePoint.",
    category: "LLMs for Public Service",
    media: {
      type: 'video',
      src: "https://www.youtube.com/embed/tkXBR1_gulo",
      alt: 'Converge'
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
    title: "NHG SHBC 2024",
    description: "A privilege to partner the National Healthcare Group to deliver our joint implementation of Sense at the Singapore Healthcare & Biomedical Conference 2024! With Minister Ong Ye Kung in attendance, no least!",
    category: "HealthTech",
    link: "https://www.linkedin.com/posts/yongkiat_i-was-invited-to-quite-a-treat-when-i-spoke-activity-7250134828824551424-UGKO",
    media: {
      type: 'image',
      src: nhgHeal,
      alt: 'NHG HEAL 2024'
    }
  },
  {
    title: "PHOM 2024",
    description: "My pet topic! I love talking about the process of decentralisation and how it applies to healthcare. It's simply one of the most fascinating topics ever. Glad to have been invited to speak at the 18th Singapore Public Health & Occupational Medicine Conference.",
    category: "HealthTech",
    link: "https://www.linkedin.com/posts/yongkiat_spoke-at-the-18th-public-health-occupational-activity-7244218816790945792-P2zg",
    media: {
      type: 'image',
      src: shbc,
      alt: 'SHBC 2024'
    }
  },
  {
    title: "RogueTeacher",
    description: "Built an education video channel on YouTube to help students learn more effectively. I never imagined I would become a content creator with 4,000 over subscribers. Also the start of RogueTeacher as a concept.",
    category: "EdTech",
    link: "https://www.youtube.com/@YeoYongKiat",
    media: {
      type: 'video',
      src: 'https://www.youtube.com/embed/_K-DMp1tPeU',
      alt: 'Flame Tests'
    }
  },
  {
    title: "Social Sector Milestone Programme - AI in Policy Making",
    description: "I partnered Civil Service College to deliver a workshop on how data analytics and AI could change the way policy makers went about our work. I revisited my work in data-driven communications in MOE, and the various policy reviews I performed in MOH, and explained how AI transforms the way we do our work.",
    category: "LLMs for Public Service",
    link: "https://rogueteacher.me/projects/presentations/ssmp-2024/index.html",
    media: {
      type: 'image',
      src: ssmp,
      alt: 'SSMP 2024'
    }
  },
  {
    title: "MDDI Generative AI Workshop - Policy & Sensemaking with AI",
    description: "Invited by the newly minted MDDI to give a presentation about my work in data analytics, past and present! This was essentially a revision of the SSMP 2024 presentation, but tailored for a group of public communications officers.",
    category: "LLMs for Public Service",
    link: "https://rogueteacher.me/projects/presentations/mddi-gen-ai-workshop-2024/index.html",
    media: {
      type: 'image',
      src: mddiWorkshop,
      alt: 'MDDI Workshop'
    }
  },
  {
    title: "A Product Manager's Guide to LLMs for Government Work",
    description: "Stoked to have been invited by MSF to speak to policy and ops officers! This was also the first time I really thought deep about all the content on LLMs and AI I had picked up from Stanford's DeepLearning.ai courses and my software engineers.",
    category: "Tech",
    link: "https://rogueteacher.me/projects/presentations/msf-brownbag/index.html",
    media: {
      type: 'image',
      src: msfBrownbag,
      alt: 'MSF Brownbag'
    }
  },
  {
    title: "GovTech Data Science Connect 2024",
    description: "I remember this as the first time I focused on unpacking a little bit more of the technical methodology behind Sense. Spoke about metadata management, prompt engineering, and how LLM applications need not expose all sensitive data to cloud services. G lad to have engaged the larger Data Science community within the Singapore public service.",
    category: "Tech",
    link: "https://rogueteacher.me/projects/presentations/govtech-data-science-connect/index.html",
    media: {
      type: 'image',
      src: dataScienceConnect,
      alt: 'Data Science Connect 2024'
    }
  },
  {
    title: "GovTech Stack Meetup 2024",
    description: "I spoke about how LLMs could be used to empower government officers and accelerate the entire process of quantitative policy analysis. This was the first time where I unveiled the product my team had been working on, Sense - a smart data assistant that connects to any government database, allowing officers to chat with their databases as if it were a human.",
    category: "Tech",
    link: "https://rogueteacher.me/projects/presentations/govtech-stack-meetup/index.html",
    media: {
      type: 'image',
      src: stackMeetup,
      alt: 'Stack Meetup 2024'
    }
  },
  {
    title: "Blockchain Attestation",
    description: "GovTech was amazing. It gave me so many opportunities to speak at public forums. This was my first talk on decentralisation in healthcare! Extremely nervous, extremely awkward, but I'm glad I gave it a shot. Had a really bad haircut, but hey, it's the tech sector!",
    category: "Tech",
    link: "https://www.youtube.com/watch?v=yAO0HivCuJI",
    media: {
      type: 'image',
      src: stack,
      alt: 'Speaking @ Stack 2022'
    }
  },
  {
    title: "Tech Sector Insights",
    description: "Whilst at GovTech, I picked up the habit of blogging professionally on Medium. It was a good way to develop tech sector insights, and a convenient resource for thought leadership, product marketing and agency engagement.",
    category: "Tech",
    link: "https://medium.com/@yeoyongkiat",
    media: {
      type: 'image',
      src: medium,
      alt: 'Medium Logo'
    }
  },
  {
    title: "Blockchain Basics",
    description: "I developed a teaching applet for introducing basic blockchain concepts, which was initially meant for teaching my children. Little did I know that I would end up using it for my talks on cryptocurrency and blockchain at NAFA.",
    category: "Tech",
    link: "https://rogueteacher.me/projects/blockchain-basics/blockchainAboutMe.html",
    media: {
      type: 'image',
      src: blockchain,
      alt: 'Blockchain'
    }
  },
  {
    title: "Long Term Care Subsidy Review",
    description: "Well, no demo or portfolio to showcase for this, since everything's sensitive data (you can see subsidy frameworks though through the link). But I picked up financing skillsets, and understood healthcare financing a lot better in this job. It culminated in me leading a team of analysts to develop affordability thresholds in consultation with CPFB, MOM & MOF. Proud to say that 100% of the policy analysis was executed in Python - again, never thought that coding would come in useful at work.",
    category: "Healthcare Financing",
    link: "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/subsidies-for-residential-long-term-care-services/",
    media: {
      type: 'image',
      src: mohLogoBadge,
      alt: 'MOH Logo'
    }
  },
  {
    title: "Dispersion Interactions Between Poly(p-Phenylene Vinylene) Polymers",
    description: "Despite majoring in Chemistry, I decided to take a leap of faith to specialise in ab-initio and semi-empirical simulation methods in Quantum Physics and Molecular Chemistry. This is the story of how I transited from a degree in Chemistry to a discipline in Physics. Plus, I got to maintain and revise legacy code in Fortran. Heh.",
    category: "Physics",
    link: "https://rogueteacher.me/documents/thesis-paper-2011.pdf",
    media: {
      type: 'image',
      src: masterThesis,
      alt: 'Master Thesis'
    }
  }
];

