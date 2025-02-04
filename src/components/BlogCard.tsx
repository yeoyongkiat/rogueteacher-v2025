import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const navigate = useNavigate();
  
  // Debug log
  console.log('Rendering BlogCard for:', post.title, 'with slug:', post.slug);

  const handleReadMore = () => {
    // Special case for the effective teaching methods post
    if (post.slug === 'effective-teaching-methods') {
      navigate('/blog/effective-teaching-methods');
    } else {
      // For other posts, use the dynamic route
      navigate(`/blog/${post.slug}`);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex flex-col flex-grow p-6">
        {/* Category */}
        <Badge 
          className="w-fit mb-4" 
          variant="default"
          color="primary"
        >
          {post.category}
        </Badge>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">
          {post.title}
        </h2>

        {/* Date */}
        <div className="text-sm text-neutral-500 mb-4">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {/* Summary */}
        <p className="text-neutral-600 mb-6 flex-grow">
          {post.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline"
              color="neutral"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read More Button */}
        <Button
          variant="link"
          className="p-0 text-[rgb(43,154,154)] hover:no-underline"
          onClick={handleReadMore}
        >
          Read more →
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard; 