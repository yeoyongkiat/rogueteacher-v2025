import { useEffect, useRef } from "react";
import profilePic from "/images/yongkiat.jpg";
import youtubeIcon from "/images/youtube.png";
import { motion } from "framer-motion";

type SocialLink = {
  href: string;
  icon: JSX.Element | string;
  bgColor: string;
  isExternal?: boolean;
  alt?: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "#contact",
    bgColor: "bg-black ring-black",
    icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
  {
    href: "https://linkedin.com",
    bgColor: "bg-[#0077B5] ring-[#0077B5]",
    icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    ),
    isExternal: true
  },
  {
    href: "https://medium.com",
    bgColor: "bg-black ring-black",
    icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    isExternal: true
  },
  {
    href: "https://youtube.com",
    bgColor: "bg-[#FF0000] ring-[#FF0000]",
    icon: youtubeIcon,
    isExternal: true,
    alt: "YouTube"
  },
  {
    href: "https://github.com",
    bgColor: "bg-[#333] ring-[#333]",
    icon: (
      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    isExternal: true
  },
];

const SocialLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const baseClasses = "text-white rounded-full flex items-center justify-center hover:opacity-90";
  const sizeClasses = isMobile ? "w-8 h-8" : "w-11 h-11";
  const iconContainerClasses = isMobile ? "" : "shadow-lg ring-2 ring-offset-2 ring-offset-white";

  return (
    <div className={`flex gap-2 ${!isMobile && "gap-4 md:gap-6 lg:gap-8"}`}>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className={`${baseClasses} ${sizeClasses} ${link.bgColor} ${iconContainerClasses} ${
            !isMobile && `ring-${link.bgColor}`
          }`}
          {...(link.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {typeof link.icon === 'string' ? (
            <img
              src={link.icon}
              alt={link.alt || ''}
              className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} object-contain`}
            />
          ) : (
            link.icon
          )}
        </a>
      ))}
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
      className={`font-semibold text-4xl ${!isMobile ? 'sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl' : 'sm:text-5xl'} ${isMobile ? 'mb-2' : 'mb-3 md:mb-6'} ${!isMobile && 'opacity-0 transform translate-y-4 transition-all duration-700 ease-out'}`}
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