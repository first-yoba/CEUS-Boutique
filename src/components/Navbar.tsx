import React from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAbout: () => void;
  onOpenEvents: () => void;
  onScrollToStory: (index: number) => void;
  activeStoryIndex: number;
  totalStories: number;
  currentStoryName?: string;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAbout,
  onOpenEvents,
  onScrollToStory,
  activeStoryIndex,
  totalStories,
  currentStoryName,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="main-navigation-bar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF7F2]/92 backdrop-blur-xl border-b border-[#E5DCD1] py-4 shadow-[0_10px_30px_rgba(70,50,30,0.06)]'
            : 'bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/50 to-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] tracking-[0.2em] uppercase font-sans-clean text-[#1C1917]">
            <button
              id="nav-shop-button"
              onClick={() => onScrollToStory(0)}
              className="text-[#1C1917]/75 hover:text-[#1C1917] transition-opacity duration-300 relative group py-1 font-medium"
            >
              <span>Collection</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8C7355] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              id="nav-events-button"
              onClick={onOpenEvents}
              className="text-[#1C1917]/75 hover:text-[#1C1917] transition-opacity duration-300 relative group py-1 font-medium"
            >
              <span>Events</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8C7355] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              id="nav-about-button"
              onClick={onOpenAbout}
              className="text-[#1C1917]/75 hover:text-[#1C1917] transition-opacity duration-300 relative group py-1 font-medium"
            >
              <span>Atelier Manifesto</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8C7355] transition-all duration-300 group-hover:w-full" />
            </button>
            
            {/* Story Indicator (Desktop) */}
            {activeStoryIndex >= 0 && (
              <div className="flex items-center space-x-2 pl-4 border-l border-[#E5DCD1] text-[10px] tracking-[0.25em] text-[#8C7355] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355] animate-pulse" />
                <span>
                  STORY 0{activeStoryIndex + 1} / 0{totalStories}
                </span>
                {currentStoryName && (
                  <span className="text-[#786C60] font-normal hidden lg:inline font-serif-luxury italic text-xs">
                    — {currentStoryName}
                  </span>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1C1917] hover:text-[#8C7355] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Centered Brand Logo */}
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <a
              id="brand-logo-link"
              href="#hero-section"
              className="inline-flex flex-col items-center justify-center group focus:outline-none"
            >
              <img
                src="/logo.png"
                alt="CÉUS Haute Couture"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('/logo.png')) {
                    target.src = '/logo.svg';
                  } else if (target.src.endsWith('/logo.svg')) {
                    target.src = '/ceus-logo.svg';
                  }
                }}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-sm"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* Right Controls: Ambient Audio & Cart */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Sound toggle button */}
            <button
              id="ambient-sound-toggle-btn"
              onClick={onToggleAudio}
              className="hidden sm:flex items-center space-x-2 text-[10px] tracking-[0.2em] uppercase font-sans-clean text-[#574D43] hover:text-[#1C1917] px-3 py-1.5 rounded-none border border-[#E5DCD1] hover:border-[#8C7355] transition-all duration-300 bg-white/70 font-medium"
              title={isAudioPlaying ? 'Mute luxury soundtrack' : 'Play luxury runway soundscape'}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#8C7355] animate-pulse" />
                  <span className="text-[#8C7355]">SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#8A7866]" />
                  <span className="text-[#786C60]">ATMOSPHERE</span>
                </>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="open-cart-drawer-btn"
              onClick={onOpenCart}
              className="group flex items-center space-x-2.5 text-[11px] tracking-[0.2em] uppercase font-sans-clean font-medium text-[#1C1917] py-1 relative focus:outline-none transition-opacity"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#1C1917] group-hover:text-[#8C7355] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#1C1917] text-[#FAF7F2] text-[9px] font-sans-clean font-bold flex items-center justify-center border border-[#FAF7F2]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline group-hover:text-[#8C7355] transition-colors">
                Bag {cartCount > 0 && `(${cartCount})`}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[70px] z-40 bg-[#FAF7F2]/98 backdrop-blur-2xl border-b border-[#E5DCD1] p-8 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-6 pt-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-sans-clean font-semibold block">
                ATELIER MENU
              </span>
              <nav className="flex flex-col space-y-5 text-lg font-editorial tracking-[0.15em] uppercase text-[#1C1917]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onScrollToStory(0);
                  }}
                  className="text-left py-2 border-b border-[#E5DCD1]/60 hover:text-[#8C7355] transition-colors"
                >
                  01. The Runway Collection
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenEvents();
                  }}
                  className="text-left py-2 border-b border-[#E5DCD1]/60 hover:text-[#8C7355] transition-colors"
                >
                  02. Salon & Runway Events
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAbout();
                  }}
                  className="text-left py-2 border-b border-[#E5DCD1]/60 hover:text-[#8C7355] transition-colors"
                >
                  03. Atelier Manifesto
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="text-left py-2 border-b border-[#E5DCD1]/60 hover:text-[#8C7355] transition-colors flex items-center justify-between"
                >
                  <span>04. Shopping Bag</span>
                  <span className="text-xs font-sans-clean bg-[#1C1917] text-white px-2 py-0.5 font-bold">
                    {cartCount}
                  </span>
                </button>
              </nav>
            </div>

            <div className="pt-8 border-t border-[#E5DCD1] space-y-4">
              <button
                onClick={onToggleAudio}
                className="w-full py-3 border border-[#E5DCD1] bg-white text-xs font-sans-clean tracking-[0.2em] uppercase text-[#1C1917] flex items-center justify-center space-x-2"
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#8C7355]" />
                    <span>Mute Runway Soundscape</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-[#8A7866]" />
                    <span>Play Runway Soundscape</span>
                  </>
                )}
              </button>

              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A7866] text-center font-sans-clean">
                TORONTO • OTTAWA • MONTREAL
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
