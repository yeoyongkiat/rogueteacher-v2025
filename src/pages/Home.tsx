import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Blog />
      <Portfolio />
      <Footer />
      <ScrollToTop />
    </Layout>
  );
} 