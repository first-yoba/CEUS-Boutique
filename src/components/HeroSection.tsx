import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Subtle scroll zoom and fade
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#FAF7F2]"
    >
      {/* Background Campaign Video Visual with Focus on Model */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 w-full h-full will-change-transform flex items-center justify-center"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[25%_40%] sm:object-[28%_45%] lg:object-[32%_50%] filter brightness-[0.96] contrast-[1.04]"
        >
          <source src="/IMG_5810.mov" type="video/mp4" />
          <source src="/IMG_5810.mov" type="video/quicktime" />
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2400&q=90"
            alt="CEUS Luxury Editorial Campaign"
            className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.04]"
            referrerPolicy="no-referrer"
          />
        </video>

        {/* Light Beige Editorial Vignette & Warm Atmospheric Sheen */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,247,242,0.80)_0%,rgba(250,247,242,0.25)_30%,rgba(250,247,242,0.30)_70%,rgba(250,247,242,0.80)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-[#FAF7F2]/75" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
      </motion.div>

      {/* Floating Atmosphere Watermarks */}
      <div className="absolute top-28 left-6 sm:left-12 hidden md:block z-10 text-[10px] tracking-[0.45em] text-[#8C7355] uppercase font-sans-clean font-medium">
        EDITORIAL VOLUME III <span className="text-[#8C7355]/40">//</span> AUTUMN COUTURE
      </div>

      <div className="absolute top-28 right-6 sm:right-12 hidden md:block z-10 text-[10px] tracking-[0.45em] text-[#786C60] uppercase font-sans-clean font-medium">
        TORONTO • OTTAWA • MONTREAL
      </div>

      {/* Center Hero Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center justify-center"
      >
        {/* Subtle Brand Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 border border-[#E5DCD1] bg-white/70 backdrop-blur-md mb-6 sm:mb-8 shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-[#8C7355]" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#8C7355] font-sans-clean font-semibold">
            HIGH FASHION CAMPAIGN
          </span>
        </motion.div>

        {/* Large Statement Brand Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-light tracking-[0.25em] text-[#1C1917] uppercase leading-none mb-4 sm:mb-6 pl-[0.25em]"
        >
          CEUS
        </motion.h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-12 h-[1.5px] bg-[#8C7355] mb-6"
        />

        {/* Primary Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif-luxury italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2E2721] font-light max-w-3xl tracking-wide leading-tight mb-4 sm:mb-5"
        >
          For women who were never meant to blend in.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs sm:text-sm md:text-base font-tenor text-[#574D43] tracking-[0.28em] uppercase max-w-xl mb-8 sm:mb-10 font-normal"
        >
          Confidence isn't worn. It's embodied.
        </motion.p>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button
            id="hero-explore-collection-btn"
            onClick={onExploreClick}
            className="group relative inline-flex items-center space-x-3 px-9 sm:px-12 py-4 bg-[#1C1917] text-[#FAF7F2] font-sans-clean text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#8C7355] transition-all duration-400 shadow-xl hover:shadow-[0_10px_30px_rgba(140,115,85,0.25)]"
          >
            <span>Explore Collection</span>
            <span className="w-1.5 h-1.5 bg-[#FAF7F2] rounded-full group-hover:scale-150 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 cursor-pointer"
        onClick={onExploreClick}
      >
        <span className="text-[9px] tracking-[0.35em] text-[#786C60] uppercase font-sans-clean font-medium">
          SCROLL TO UNVEIL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#8C7355]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
