import rogueTeacherIcon from "/images/rogueteacher-icon.png";
import mediumIcon from "/images/medium.png";

import { 
  Github, 
  Linkedin, 
  Youtube, 
  Mail,
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