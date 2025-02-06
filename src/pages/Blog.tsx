import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { FilterBar } from "@/components/blog/FilterBar";
import { BlogTable } from "@/components/blog/BlogTable";
import { Grid } from "@/components/ui/Grid";
import { BlogCard } from "@/components/ui/BlogCard";
import { SimplePagination } from "@/components/ui/Pagination";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BLOG_CONFIG } from "@/lib/constants";
import type { ViewType, SortOption } from "@/lib/blog";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from "react-router-dom";

export default function BlogPage() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<ViewType>(BLOG_CONFIG.defaultView);
  const [sortBy, setSortBy] = useState<SortOption>(BLOG_CONFIG.defaultSort);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);

  const { 
    posts, 
    totalPages, 
    categories,
    totalPosts
  } = useBlogPosts({
    search,
    category,
    sortBy,
    page: currentPage,
    postsPerPage: BLOG_CONFIG.postsPerPage
  });

  // Calculate the range of posts being displayed
  const startPost = (currentPage - 1) * BLOG_CONFIG.postsPerPage + 1;
  const endPost = Math.min(currentPage * BLOG_CONFIG.postsPerPage, totalPosts);

  // Add debug logging
  console.log('Blog page rendered with:', {
    numberOfPosts: posts.length,
    currentPage,
    totalPages,
    categories,
    viewType,
    sortBy,
    search,
    category
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortBy]);

  // Add keyboard navigation
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <PageLayout
      title={BLOG_CONFIG.sections.title}
      subtitle="Back to Home"
      description={`${BLOG_CONFIG.sections.description}`}
      badge="Blog"
      onBack={() => navigate('/')}
      headerExtra={
        <Button
          onClick={() => navigate('/blog/editor')}
          className="inline-flex items-center gap-2 bg-black text-white"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Button>
      }
    >
      <FilterBar
        viewType={viewType}
        setViewType={setViewType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
      {totalPages > 1 && (
        <div className="space-y-4">
          <SimplePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <div className="text-center text-sm text-neutral-500 space-y-1">
            <p>Page {currentPage} of {totalPages}</p>
            <p className="text-xs">
              {/* Add a pagination summary */}
      <div className="text-sm text-neutral-500 mb-4">
        Showing posts {startPost}-{endPost} of {totalPosts}
        {search && ` (filtered from ${totalPosts} total posts)`}
        {category && ` in category "${category}"`}
      </div>
            </p>
          </div>
        </div>
      )}
      

      {viewType === 'grid' ? (
        <Grid 
          columns={{ 
            default: 1,  // 1 column for mobile
            md: 1,       // 2 columns for medium and up
            lg: 2        // Keep 2 columns for large screens
          }}
          gap="gap-6"
          className="mb-8"
        >
          {posts.map((post, index) => (
            <BlogCard 
              key={post.id}
              post={post}
              index={index}
              variant="grid"
            />
          ))}
        </Grid>
      ) : (
        <div className="mb-8">
          <BlogTable 
            posts={posts}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      )}

      {totalPages > 1 && (
        <div className="space-y-4">
          <SimplePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <div className="text-center text-sm text-neutral-500 space-y-1">
            <p>Page {currentPage} of {totalPages}</p>
            <p className="text-xs">
              Use ← → arrow keys to navigate between pages
            </p>
          </div>
        </div>
      )}
    </PageLayout>
  );
} 