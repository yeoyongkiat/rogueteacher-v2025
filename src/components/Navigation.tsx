import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rogueTeacherIcon from "/images/rogueteacher-icon.png";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { name: "About Me", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/#blog" },
  { name: "Portfolio", href: "/#apps" }
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Only show initial animation on landing page
    if (isLandingPage) {
      const timer = setTimeout(() => {
        setShowInitialAnimation(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowInitialAnimation(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLandingPage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      navigate(href);
    }
  };

  return (
    <>
      {/* Initial Animations */}
      <AnimatePresence>
        {showInitialAnimation && isLandingPage ? (
          // RogueTeacher Logo Animation for Landing Page
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ backgroundColor: "#ffffff" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.25 }}
            className="fixed inset-0 bg-white z-[100] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.25 }} // Reduced duration and delay
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center">
                <span className="text-4xl font-medium mr-[-4px]">R</span>
                <motion.img 
                  src={rogueTeacherIcon} 
                  alt="o" 
                  className="w-12 h-12 object-contain mx-[-4px]"
                />
                <span className="text-4xl font-medium ml-[-4px]">GUETEACHER</span>
              </div>
              <p className="text-lg">Teach x Code x Policy</p>
            </motion.div>
          </motion.div>
        ) : !isLandingPage && showInitialAnimation ? (
          // Simple Fade for Other Pages
          <motion.div
            initial={{ opacity: 1, y: -20 }}
            animate={{ opacity: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#f6f6f6] z-[100]"
          />
        ) : null}
      </AnimatePresence>

      {/* Regular Navigation */}
      <div className="fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav
            className={`
              backdrop-blur-sm bg-white/60 rounded-full w-full transition-all duration-300 
              shadow-[0_8px_30px_rgb(0,0,0,0.1)] 
              ${scrolled ? "py-3" : "py-4"}
            `}
          >
            <div className="container mx-auto px-6 flex items-center">
              {/* Logo - Always Flush Left */}
              <div className="flex-none">
                <a href="#" className="text-xl font-medium flex items-center">
                  <span className="mr-[-2px]">R</span>
                  <img 
                    src={rogueTeacherIcon} 
                    alt="o" 
                    className="w-6 h-6 object-contain mx-[-2px]" 
                  />
                  <span className="ml-[-2px]">GUETEACHER</span>
                </a>
              </div>

              {/* Navigation Links - Always Flush Right */}
              <div className="flex-1 flex justify-end">
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-sm hover:text-neutral-600 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2"
                >
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={false}
                    animate={isMenuOpen ? "open" : "closed"}
                  >
                    <motion.path
                      variants={{
                        closed: { 
                          d: "M4 6h16M4 12h16M4 18h16",
                          transition: { duration: 0.3 }
                        },
                        open: { 
                          d: "M6 18L18 6M6 6l12 12",
                          transition: { duration: 0.3 }
                        }
                      }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </motion.svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4"
                >
                  <div className="backdrop-blur-sm bg-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] py-4">
                    {navLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          setIsMenuOpen(false);
                        }}
                        className="block px-6 py-2 hover:bg-black/5 transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>
    </>
  );
}