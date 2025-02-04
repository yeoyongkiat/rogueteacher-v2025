export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  content?: string;
  link?: string;
} 