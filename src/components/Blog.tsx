import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/ui/BlogCard";
import { Badge } from "@/components/ui/badge";

export default function Blog() {
  return (
    <section id="blog" className="section-padding">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="mt-12">
              <Badge color="primary" className="mb-4">
                Blog
              </Badge>
              <h2 className="text-4xl md:text-6xl font-semibold mb-6">Thoughts & Insights</h2>
              <p className="text-sm md:text-base opacity-90 max-w-2xl mb-8">
                Writing helps me organize my thoughts. Here are some of my reflections on technology,
                education, and public service.
              </p>

              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 
                  rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
              >
                View All
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 6).map((post) => (
            <BlogCard 
              key={post.id}
              post={post} 
              variant="grid"
            />
          ))}
        </div>
      </div>
    </section>
  );
} 