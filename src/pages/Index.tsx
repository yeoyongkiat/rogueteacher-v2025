import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Blog from "../components/Blog";
import Portfolio from "../components/Portfolio";
import { useInView } from "../hooks/useInView";
import Footer from "../components/Footer";
import { fadeInUp, slideInFromLeft, slideInFromRight, scaleIn } from "../utils/animations";

const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Index() {
  const [aboutRef, aboutInView] = useInView();
  const [projectsRef, projectsInView] = useInView();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Smooth scroll setup
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        <motion.div variants={fadeInUp}>
          <Hero />
        </motion.div>

        <motion.div
          ref={aboutRef}
          variants={slideInFromLeft}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <About />
        </motion.div>

        <motion.div
          ref={projectsRef}
          variants={slideInFromRight}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Projects />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Blog />
        </motion.div>

        <motion.div
          variants={scaleIn}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <Portfolio />
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg 
              hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-50
              animate-float-button"
          >
            <svg 
              className="w-6 h-6 text-[rgb(43,154,154)]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </Layout>
  );
}