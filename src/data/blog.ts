import React from 'react';

export type BlogPost = {
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  slug: string;
  content?: React.ReactNode;
  link?: string;
  isOldArticle?: boolean;
  id: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Education: AI as a Teaching Assistant",
    slug: "future-of-education-ai-teaching-assistant",
    date: "March 15, 2024",
    category: "EdTech",
    tags: ["AI", "Education", "Teaching"],
    summary: "Exploring how AI can augment teaching capabilities while maintaining the human touch in education.",
    content: React.createElement(React.Fragment, null, [
      React.createElement('p', { key: 'p1' }, 
        "As an educator turned technologist, I've always been fascinated by the intersection of teaching and technology. " +
        "In this article, I explore how AI can enhance the teaching experience while maintaining the essential human connection in education."
      ),
      React.createElement('h2', { key: 'h1', className: 'text-2xl font-semibold mt-8 mb-4' }, 
        "The Role of AI in Modern Education"
      ),
      React.createElement('p', { key: 'p2' }, 
        "Modern education faces unprecedented challenges. With growing class sizes and diverse learning needs, " +
        "teachers are constantly seeking ways to provide personalized attention to each student. " +
        "This is where AI comes in as a powerful teaching assistant."
      ),
      React.createElement('p', { key: 'p3', className: 'mt-4' }, 
        "Through my experience implementing AI solutions in classrooms, I've discovered that the technology works best " +
        "when it complements rather than replaces human teaching methods."
      )
    ])
  },
  {
    id: "2",
    title: "Building Trust in Government Digital Services",
    date: "March 1, 2024",
    category: "Public Service",
    tags: ["GovTech", "Digital Transformation", "User Trust"],
    summary: "Insights on how to design digital government services that citizens can trust and rely on.",
    link: "#"
  },
  {
    id: "3",
    title: "Democratizing Healthcare with AI",
    date: "April 1, 2024",
    category: "HealthTech",
    tags: ["AI", "Healthcare", "Social Impact"],
    summary: "A deep dive into how AI can make healthcare more accessible and equitable for everyone.",
    link: "#",
    isOldArticle: true
  },
  {
    id: "4",
    title: "Teaching Chemistry with Minecraft",
    date: "March 30, 2024",
    category: "EdTech",
    tags: ["Gaming", "Chemistry", "Interactive Learning"],
    summary: "How I used Minecraft Education Edition to teach complex chemical concepts to students, and the surprising results we achieved.",
    link: "#"
  },
  {
    id: "5",
    title: "The Power of Public-Private Partnerships",
    date: "March 25, 2024",
    category: "Public Service",
    tags: ["Innovation", "Collaboration", "Policy"],
    summary: "Lessons learned from bridging the gap between government and private sector to drive innovation in public services.",
    link: "#"
  },
  {
    id: "6",
    title: "Building Trust in AI Systems",
    date: "March 20, 2024",
    category: "Technology",
    tags: ["AI Ethics", "Trust", "Governance"],
    summary: "Exploring the critical aspects of building trustworthy AI systems for government use, focusing on transparency and accountability.",
    link: "#"
  },
  // Add more blog posts...
]; 