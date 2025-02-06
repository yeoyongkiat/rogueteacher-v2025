import { useEffect, useRef } from "react";
import profilePic from "/images/yongkiat.jpg";
import youtubeIcon from "/images/youtube.png";
import linkedinIcon from "/images/linkedin.png";
import mediumIcon from "/images/medium.png";
import githubIcon from "/images/github.png";
import { motion } from "framer-motion";
import { 
  Github, 
  Mail,
  MessageSquare 
} from "lucide-react";
import { MediumIcon } from "./icons/MediumIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SocialLink = {
  href: string;
  icon: React.ElementType | (() => JSX.Element);
  bgColor: string;
  isExternal?: boolean;
  tooltip: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://medium.com/@yeoyongkiat",
    bgColor: "bg-black ring-black",
    icon: () => <img 
      src={mediumIcon} 
      alt="Medium" 
      className="w-6 h-6 md:w-9 md:h-9"
    />,
    isExternal: true,
    tooltip: "Read my articles"
  },
  {
    href: "https://linkedin.com/in/yongkiat",
    bgColor: "bg-[#0A66C2] ring-[#0A66C2]",
    icon: () => <img 
      src={linkedinIcon} 
      alt="LinkedIn" 
      className="w-6 h-6 md:w-7 md:h-7"
    />,
    isExternal: true,
    tooltip: "Connect on LinkedIn"
  },
  {
    href: "https://github.com/yeoyongkiat",
    bgColor: "bg-white ring-black",
    icon: () => <img 
      src={githubIcon} 
      alt="GitHub" 
      className="w-6 h-6 md:w-9 md:h-9"
    />,
    isExternal: true,
    tooltip: "Check out my GitHub"
  },
  {
    href: "https://youtube.com/@YeoYongKiat",
    bgColor: "bg-[#FF0000] ring-[#FF0000]",
    icon: () => <img 
      src={youtubeIcon} 
      alt="YouTube" 
      className="w-6 h-6 md:w-9 md:h-9"
    />,
    isExternal: true,
    tooltip: "Watch my videos!"
  },
  {
    href: "mailto:yeoyongkiat@gmail.com",
    bgColor: "bg-black ring-black",
    icon: Mail,
    isExternal: true,
    tooltip: "Send me an email"
  },
];

const SocialLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const baseClasses = "rounded-full flex items-center justify-center hover:opacity-90";
  const sizeClasses = isMobile ? "w-10 h-10" : "w-12 h-12";
  const iconContainerClasses = isMobile ? "ring-1 ring-black" : "shadow-lg ring-2 ring-offset-2 ring-offset-white";

  return (
    <div className={`flex gap-2 ${!isMobile && "gap-3 md:gap-4"}`}>
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={link.href}
                  className={`${baseClasses} ${sizeClasses} ${link.bgColor} ${iconContainerClasses} p-1`}
                  {...(link.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {typeof Icon === 'function' ? (
                    <Icon />
                  ) : (
                    <Icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
                  )}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

const WelcomeSection = ({ isMobile = false, textRef }: { isMobile?: boolean; textRef?: React.RefObject<HTMLHeadingElement> }) => (
  <>
    <span className={`inline-block px-3 ${!isMobile && 'md:px-4'} py-1.5 ${!isMobile && 'md:py-2'} rounded-full text-xs font-medium bg-[rgb(217,233,233)] text-[rgb(43,154,154)] mb-4 ${!isMobile && 'md:mb-6'} ${!isMobile && 'animate-fade-in'}`}>
      Teach x Code x Policy
    </span>
    <h1 
      ref={textRef}
      className={`font-semibold text-4xl ${!isMobile ? 'sm:text-5xl md:text-5xl lg:text-6xl xl:text-8xl' : 'sm:text-5xl'} ${isMobile ? 'mb-2' : 'mb-3 md:mb-6'} ${!isMobile && 'opacity-0 transform translate-y-4 transition-all duration-700 ease-out'}`}
    >
      Hi there,
      <br />
      I'm Yong Kiat!
    </h1>
    <p className={`${isMobile ? 'text-sm' : 'text-xs sm:text-sm md:text-base'} text-neutral-600 ${isMobile ? 'mb-8' : 'mb-4'} ${!isMobile && 'animate-fade-in max-w-md'}`}>
      I love creating content, teaching people and learning new things. Even better if I can do these all at once.
    </p>
  </>
);

const ProfileSection = ({ isMobile = false, isLargeScreen = false }: { isMobile?: boolean; isLargeScreen?: boolean }) => (
  <>
    <div className="flex items-center gap-3 mb-6">
      {isMobile ? (
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={profilePic} alt="Yong Kiat" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-[rgb(217,233,233)] flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-[rgb(43,154,154)]" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      )}
      <div>
        <h3 className="font-semibold">GovTech</h3>
        <p className="text-sm text-neutral-600">Singapore</p>
      </div>
    </div>

    {/* Horizontal Divider - hide on mobile */}
    {!isMobile && <div className="h-px bg-neutral-200 w-full mb-6" />}

    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">
        Deputy Director
        <br />
        (Product, Strategy & Design)
      </h4>
      <p className="text-sm text-neutral-600 leading-relaxed">
        Leading product strategy and design initiatives for government digital services
      </p>
    </div>
  </>
);

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      text.style.opacity = "1";
      text.style.transform = "translateY(0)";
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between section-padding bg-[#f6f6f6] py-12 lg:py-0">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {/* Mobile Cards */}
          <div className="w-full lg:hidden flex flex-col gap-4">
            {/* Welcome Card - Made transparent */}
            <div className="bg-transparent p-6 animate-fade-in">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <WelcomeSection isMobile />
              </motion.div>
            </div>

            {/* Profile Card - Kept white */}
            <div className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <ProfileSection isMobile />
                <SocialLinks isMobile />
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="text-left w-full lg:w-[500px] xl:w-[600px] hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <WelcomeSection textRef={textRef} />
            </motion.div>
          </div>

          <div className="w-full lg:w-[500px] xl:w-[600px] hidden lg:flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-6">
              <div className="bg-white rounded-2xl p-4 shadow-lg animate-fade-in">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <ProfileSection isLargeScreen={false} />
                </motion.div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg animate-fade-in delay-75 overflow-hidden h-[200px] lg:h-auto">
                <img src={profilePic} alt="Yong Kiat" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="p-2 sm:p-4 animate-fade-in delay-200 flex items-center justify-center bg-white rounded-2xl shadow-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <SocialLinks />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}