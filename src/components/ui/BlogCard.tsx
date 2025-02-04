import { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  index: number;
  variant?: 'grid' | 'list';
}

export function BlogCard({ post, index, variant = 'grid' }: BlogCardProps) {
  const isGrid = variant === 'grid';

  // Debug log
  console.log('Rendering BlogCard for:', post.title, 'with slug:', post.slug);

  // Add fallback URL if none provided
  const url = post.url || `/blog/${post.slug}`;
  const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://');
  const LinkComponent = isAbsoluteUrl ? 'a' : Link;
  const linkProps = isAbsoluteUrl ? 
    { href: url, target: "_blank", rel: "noopener noreferrer" } : 
    { to: url };

  return (
    <LinkComponent
      {...linkProps}
      className="block"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow
          ${isGrid ? 'p-8' : 'p-6'}`}
      >
        <div className="flex flex-col h-full">
          {/* Meta Information */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-neutral-500">{post.date}</span>
            <span className="text-neutral-300">•</span>
            <Badge color="primary">{post.category}</Badge>
          </div>
          
          {/* Title and Summary */}
          <h3 className={`font-semibold mb-3 ${isGrid ? 'text-xl' : 'text-2xl'} 
            hover:text-[rgb(43,154,154)] transition-colors`}
          >
            {post.title}
          </h3>
          
          <p className="text-sm text-neutral-600 mb-4 flex-grow">
            {post.summary}
          </p>
          
          {/* Tags and Link */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, tagIndex) => (
                <Badge 
                  key={tagIndex}
                  variant="outline" 
                  color="neutral"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            {variant === 'grid' ? (
              <div className="mt-4">
                <span className="text-[rgb(43,154,154)] hover:underline inline-flex items-center gap-1">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </LinkComponent>
  );
} 