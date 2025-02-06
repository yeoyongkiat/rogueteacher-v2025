import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogCard } from '@/components/ui/BlogCard';
import { Button } from '@/components/ui/button';
import { getAllBlogPosts } from '@/lib/blog-loader';
import type { BlogPost } from '@/types';

export default function Blog() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadRecentPosts() {
      try {
        const allPosts = await getAllBlogPosts();
        const recent = allPosts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3); // Get 3 posts - 1 featured + 2 list items
        setRecentPosts(recent);
      } catch (error) {
        console.error('Error loading recent posts:', error);
      }
    }
    loadRecentPosts();
  }, []);

  return (
    <section id="blog" className="section-padding bg-neutral-50">
      <div className="container mx-auto">
        {/* Header and Featured Post */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          {/* Left side - Title */}
          <div className="lg:w-1/3">
            <span 
              className="inline-flex w-fit px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs 
                font-medium bg-[rgb(217,233,233)] text-[rgb(43,154,154)] mb-4 md:mb-6 animate-fade-in"
            >
              Blog
            </span>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">Latest Posts</h2>
            <p className="text-sm md:text-base opacity-90 mb-4">
              I code. But I also write.
            </p>
            <Link to="/blog">
              <Button 
                variant="default"
                className="bg-black text-white hover:bg-black/90"
              >
                View All Posts
              </Button>
            </Link>
          </div>

          {/* Right side - Featured Post */}
          <div className="lg:w-2/3">
            {recentPosts[0] && (
              <BlogCard 
                post={recentPosts[0]}
                index={0}
                variant="featured"
              />
            )}
          </div>
        </div>

        {/* Other Posts List - Single column with full width */}
        <div className="space-y-6">
          {recentPosts.slice(1, 3).map((post, index) => (
            <BlogCard 
              key={post.id}
              post={post}
              index={index + 1}
              variant="grid"
            />
          ))}
        </div>
      </div>
    </section>
  );
} 