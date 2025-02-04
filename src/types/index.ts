// Media types
export type MediaType = 'image' | 'video';

export interface Media {
  type: MediaType;
  src: string;
  alt?: string;
}

// Project types
export interface Project {
  title: string;
  description: string;
  category: string;
  link?: string;
  media?: Media;
}

// Blog types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  content?: React.ReactNode;
  link?: string;
  isOldArticle?: boolean;
}

export interface BasePageProps {
  title: string;
  description?: string;
  badge?: string;
  onBack?: () => void;
}

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  category: string;
  link?: string;
  media?: {
    type: 'image' | 'video';
    src: string;
    alt: string;
  };
} 