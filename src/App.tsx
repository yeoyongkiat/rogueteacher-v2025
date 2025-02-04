import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProjectsPage from './pages/Projects';
import BlogPage from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import NotFound from "./pages/NotFound";
import BlogEditor from './pages/BlogEditor';
import 'katex/dist/katex.min.css'; // For math equations
import 'highlight.js/styles/github.css'; // Change to any highlight.js theme you prefer
import { useScrollToTop } from '@/hooks/useScrollToTop';

const queryClient = new QueryClient();

// Create a wrapper component that uses the hook
function ScrollToTopWrapper({ children }: { children: React.ReactNode }) {
  useScrollToTop();
  return <>{children}</>;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-[#f6f6f6] min-h-screen">
          <Toaster />
          <Sonner />
          <Router>
            <ScrollToTopWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/blog">
                  <Route index element={<BlogPage />} />
                  <Route path="editor" element={<BlogEditor />} />
                  <Route path=":slug" element={<BlogArticle />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ScrollToTopWrapper>
          </Router>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
