import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { FilterBar } from "@/components/blog/FilterBar";
import { BlogTable } from "@/components/blog/BlogTable";
import { Grid } from "@/components/ui/Grid";
import { BlogCard } from "@/components/ui/BlogCard";
import { Pagination } from "@/components/ui/Pagination";
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
    categories 
  } = useBlogPosts({
    search,
    category,
    sortBy,
    page: currentPage,
    postsPerPage: BLOG_CONFIG.postsPerPage
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortBy]);

  return (
    <PageLayout
      title={BLOG_CONFIG.sections.title}
      subtitle="Back to Home"
      description={BLOG_CONFIG.sections.description}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
} 