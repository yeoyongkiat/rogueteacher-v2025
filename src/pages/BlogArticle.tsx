import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';

export default function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Try to dynamically import the component
  const BlogComponent = React.lazy(() => 
    import(`@/content/blog/${slug}.tsx`)
    .catch(() => {
      // If component doesn't exist, show 404
      return Promise.reject(new Error('Blog post not found'));
    })
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogComponent />
    </Suspense>
  );
} 