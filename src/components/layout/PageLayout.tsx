import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "../Layout";
import { Badge } from "@/components/ui/badge";
import ScrollToTop from "../ScrollToTop";
import Footer from "../Footer";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  date?: string;
  tags?: string[];
  onBack?: () => void;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
}

export function PageLayout({
  title,
  subtitle,
  description,
  badge,
  date,
  tags,
  onBack,
  headerExtra,
  children
}: PageLayoutProps) {
  return (
    <Layout>
      <section className="section-padding bg-[#f6f6f6] min-h-screen">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="mt-12 space-y-4">
                {/* Navigation and Extra Content */}
                <div className="flex justify-between items-center">
                  {/* Back Button */}
                  {onBack && (
                    <button
                      onClick={onBack}
                      className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 
                        rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {subtitle || 'Back'}
                    </button>
                  )}
                  
                  {/* Extra Header Content */}
                  {headerExtra}
                </div>

                <div className="space-y-4">
                  {badge && (
                    <Badge color="primary" variant="default">
                      {badge}
                    </Badge>
                  )}

                  <h1 className="text-4xl md:text-6xl font-semibold">{title}</h1>
                  
                  {description && (
                    <p className="text-xl text-neutral-600">
                      {description}
                    </p>
                  )}

                  {date && (
                    <div className="text-sm text-neutral-500">
                      {date}
                    </div>
                  )}

                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          color="neutral"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {children}
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </Layout>
  );
} 