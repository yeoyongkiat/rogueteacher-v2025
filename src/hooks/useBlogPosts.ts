import { useMemo, useEffect, useState } from 'react';
import { filterPosts, sortPosts } from '@/lib/blog';
import { getAllBlogPosts } from '@/lib/blog-loader';
import type { SortOption } from '@/lib/blog';
import type { BlogPost } from '@/types';

interface UseBlogPostsProps {
  search: string;
  category?: string;
  sortBy: SortOption;
  page: number;
  postsPerPage: number;
}

export function useBlogPosts({ 
  search, 
  category, 
  sortBy, 
  page, 
  postsPerPage 
}: UseBlogPostsProps) {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all posts
  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await getAllBlogPosts();
        console.log('Loaded all posts:', posts);
        setAllPosts(posts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    }
    loadPosts();
  }, []);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...allPosts];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(post => 
        // Search in title
        post.title.toLowerCase().includes(searchLower) ||
        // Search in description/summary
        post.summary.toLowerCase().includes(searchLower) ||
        // Search in category
        post.category.toLowerCase().includes(searchLower) ||
        // Search in tags
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (category) {
      result = result.filter(post => post.category === category);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [allPosts, search, category, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(allPosts.map(post => post.category));
    return Array.from(uniqueCategories);
  }, [allPosts]);

  return {
    posts: paginatedPosts,
    totalPages,
    categories,
    totalPosts: filteredPosts.length,
    loading
  };
} 