import rogueTeacherIcon from "/images/rogueteacher-icon.png";

import { 
  Github, 
  Linkedin, 
  Youtube, 
  Mail,
  Twitter
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[rgb(43,154,154)] py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="text-xl font-medium flex items-center text-white mb-8">
          <span className="mr-[-2px]">R</span>
            <img 
              src={rogueTeacherIcon} 
              alt="o" 
              className="w-6 h-6 object-contain mx-[-2px]" 
            />
            <span className="ml-[-2px]">GUETEACHER</span>
            </div>

          {/* Social Links */}
          <div className="flex gap-6 mb-8">
            <a 
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com/@username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="mailto:email@example.com"
              className="text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8 mb-8 text-sm">
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
            <a href="#blog" className="text-white/80 hover:text-white transition-colors">Blog</a>
            <a href="#Portfolio" className="text-white/80 hover:text-white transition-colors">Portfolio</a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white/60">
            © {currentYear} RogueTeacher. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 