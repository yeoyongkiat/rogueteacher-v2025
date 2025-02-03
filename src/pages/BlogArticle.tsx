import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { blogPosts } from "../data/blog";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function BlogArticle() {
  const navigate = useNavigate();
  const { slug } = useParams();
  
  // Find the blog post by slug
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return navigate('/blog');
  }

  // Get 2 random articles from the same category
  const recommendations = useMemo(() => {
    const sameCategory = blogPosts.filter(p => 
      p.category === post.category && p.slug !== post.slug
    );
    return sameCategory.sort(() => Math.random() - 0.5).slice(0, 2);
  }, [post]);

  return (
    <Layout>
      <section className="section-padding bg-[#f6f6f6] min-h-screen">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mb-16"
            >
              <div className="mt-12">
                {/* Back Button */}
                <button
                  onClick={() => navigate('/blog')}
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 
                    rounded-lg hover:bg-black/90 transition-colors text-sm font-medium mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </button>

                {/* Category Badge - Moved below back button */}
                <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs 
                  font-medium bg-[rgb(217,233,233)] text-[rgb(43,154,154)] mb-8"
                >
                  {post.category}
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-semibold mb-6">{post.title}</h1>

                {/* Meta Information */}
                <div className="space-y-4 mb-8">
                  {/* Date */}
                  <div className="text-sm text-neutral-600">
                    {post.date}
                  </div>

                  {/* Category */}
                  <div className="text-sm">
                    <span className="text-neutral-500">Category: </span>
                    <span className="font-medium text-[rgb(43,154,154)]">{post.category}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-xs font-medium 
                          bg-white text-neutral-600 rounded-full border border-neutral-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {post.content}
                </div>
              </div>
            </motion.div>

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-16 pt-16 border-t border-neutral-200"
              >
                <h2 className="text-2xl font-semibold mb-8">
                  If you like this article, you may also like:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={rec.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Link 
                        to={`/blog/${rec.slug}`}
                        className="block group"
                      >
                        <span className="text-xs font-medium text-[rgb(43,154,154)]">
                          {rec.category}
                        </span>
                        <h3 className="text-lg font-semibold mt-2 mb-3 group-hover:text-[rgb(43,154,154)] 
                          transition-colors"
                        >
                          {rec.title}
                        </h3>
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {rec.summary}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-sm text-[rgb(43,154,154)]">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </Layout>
  );
} 