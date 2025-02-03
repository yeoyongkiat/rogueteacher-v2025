import { useEffect, useState } from 'react';
import type { BlogPost } from '@/utils/blogLoader';
import { getAllBlogPosts } from '@/utils/blogLoader';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getAllBlogPosts().then(setPosts);
  }, []);

  // ... rest of the component
} 