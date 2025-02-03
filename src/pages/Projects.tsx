import { motion } from "framer-motion";
import Layout from "../components/Layout";
import ProjectGrid from "../components/ProjectGrid";
import { projects, bottomFeatureProject } from "../data/projects";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const allProjects = [...projects, bottomFeatureProject];

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
              <div className="mt-12">
                <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs 
                  font-medium bg-[rgb(217,233,233)] text-[rgb(43,154,154)] mb-4 md:mb-6 animate-fade-in"
                >
                  Projects
                </span>
                <h1 className="text-4xl md:text-6xl font-semibold mb-6">Work Pieces</h1>
                <p className="text-sm md:text-base opacity-90 max-w-2xl mb-8">
                  A comprehensive collection of my work across education, healthcare, and public service.
                  Each project represents a unique challenge and learning opportunity.
                </p>

                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 
                    rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </button>
              </div>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <ProjectGrid projects={allProjects} />
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </Layout>
  );
} 