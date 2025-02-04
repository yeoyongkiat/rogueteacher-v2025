import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Home Link */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold">YK</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-neutral-600 hover:text-neutral-900">Home</Link>
            <Link to="/blog" className="text-neutral-600 hover:text-neutral-900">Blog</Link>
            <Link to="/projects" className="text-neutral-600 hover:text-neutral-900">Projects</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-600"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className="block px-3 py-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/projects" 
              className="block px-3 py-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 