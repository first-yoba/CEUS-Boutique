import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Feather, Compass, Award } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E5DCD1] p-8 sm:p-12 text-[#1C1917] shadow-[0_25px_60px_rgba(70,50,30,0.18)] overflow-hidden"
          >
            {/* Background luxury watermark */}
            <div className="absolute -right-10 -bottom-10 font-editorial text-9xl text-[#8C7355]/[0.05] select-none pointer-events-none">
              CEUS
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5DCD1] pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className="font-editorial text-2xl tracking-[0.3em] text-[#1C1917]">CÉUS</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-sans-clean font-semibold">
                  // THE BRAND MANIFESTO
                </span>
              </div>
              <button
                id="close-about-modal-btn"
                onClick={onClose}
                className="p-1.5 text-[#786C60] hover:text-[#1C1917] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-xs sm:text-sm font-sans-clean">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.35em] uppercase text-[#8C7355] font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>UNAPOLOGETIC FEMININITY</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] leading-tight">
                  For women who were never meant to blend in.
                </h3>
                <p className="font-serif-luxury italic text-lg sm:text-xl text-[#8C7355]">
                  "Confidence isn't worn. It's embodied."
                </p>
              </div>

              <p className="text-[#574D43] leading-relaxed font-light">
                CEUS is a luxury fashion house established to reclaim high-fashion editorial presence for the modern woman. Rejecting generic seasonal cycles and mass-manufactured trends, each CEUS release is conceived as a singular photoshoot narrative—a cinematic world where clothing acts as an amplifier of personal sovereignty.
              </p>

              {/* Brand Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 bg-white border border-[#E5DCD1] space-y-2 shadow-sm">
                  <Feather className="w-4 h-4 text-[#8C7355]" />
                  <h4 className="font-editorial text-base text-[#1C1917]">Sculpted Tension</h4>
                  <p className="text-[11px] text-[#6E6255] leading-normal font-light">
                    Precision cuts that hug, accentuate, and celebrate feminine geometry without compromise.
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#E5DCD1] space-y-2 shadow-sm">
                  <Compass className="w-4 h-4 text-[#8C7355]" />
                  <h4 className="font-editorial text-base text-[#1C1917]">Editorial Release</h4>
                  <p className="text-[11px] text-[#6E6255] leading-normal font-light">
                    One piece per story. Dedicated campaigns replacing impersonal retail grids.
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#E5DCD1] space-y-2 shadow-sm">
                  <Award className="w-4 h-4 text-[#8C7355]" />
                  <h4 className="font-editorial text-base text-[#1C1917]">Strict Editions</h4>
                  <p className="text-[11px] text-[#6E6255] leading-normal font-light">
                    Limited numbered atelier runs ensuring exclusivity across worldwide capitals.
                  </p>
                </div>
              </div>

              {/* Signature note */}
              <div className="pt-4 border-t border-[#E5DCD1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-[#8C7355] block font-semibold">
                    Creative Direction & Atelier House
                  </span>
                  <span className="font-editorial text-sm text-[#1C1917]">
                    TORONTO • OTTAWA • MONTREAL
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="py-3 px-6 bg-[#1C1917] text-[#FAF7F2] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#8C7355] transition-colors shadow-md"
                >
                  Explore The Runway
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
