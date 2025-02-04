import { BlogPost } from "@/types";

export type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';
export type ViewType = 'grid' | 'list';

export function sortPosts(posts: BlogPost[], sortBy: SortOption): BlogPost[] {
  return [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
}

export function filterPosts(
  posts: BlogPost[],
  search: string,
  category?: string
): BlogPost[] {
  return posts.filter(post => {
    const matchesSearch = search === '' || 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = !category || post.category === category;
    
    return matchesSearch && matchesCategory;
  });
} 