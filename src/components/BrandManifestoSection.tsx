import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUp, Mail, CheckCircle2, ShieldCheck, RefreshCw, Send } from 'lucide-react';

interface BrandManifestoSectionProps {
  onScrollToTop: () => void;
  onOpenAbout: () => void;
}

export const BrandManifestoSection: React.FC<BrandManifestoSectionProps> = ({
  onScrollToTop,
  onOpenAbout,
}) => {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <footer
      id="brand-manifesto-section"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#F4EDE4] border-t border-[#E5DCD1]"
    >
      {/* Background Subtle Warm Campaign Visual */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=90"
          alt="CEUS Brand Presence Editorial"
          className="w-full h-full object-cover object-center filter brightness-[0.85] opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,237,228,0.95)_0%,rgba(244,237,228,0.7)_50%,rgba(244,237,228,0.95)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-transparent to-[#F4EDE4]" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-50" />
      </div>

      {/* Top Brand Statement Block */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-12 pt-24 sm:pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-5 flex flex-col items-center"
        >
          {/* Subtle Label */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-[#E5DCD1] bg-white/70 backdrop-blur-md text-[#8C7355] text-[10px] tracking-[0.35em] uppercase font-sans-clean font-semibold shadow-sm mb-2">
            <Sparkles className="w-3 h-3" />
            <span>THE CÉUS PHILOSOPHY</span>
          </div>

          {/* Large Statement Typography */}
          <div className="space-y-1">
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1C1917] font-light tracking-[0.14em] uppercase leading-tight">
              CEUS ISN'T A LOOK.
            </h2>
            <h3 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8C7355] font-light tracking-[0.16em] uppercase leading-tight italic">
              IT'S A PRESENCE.
            </h3>
          </div>

          {/* Accent Line */}
          <div className="w-12 h-[1.5px] bg-[#8C7355] my-2" />

          {/* Short Brand Story */}
          <p className="font-serif-luxury text-lg sm:text-xl md:text-2xl text-[#3D332A] font-light max-w-3xl mx-auto leading-relaxed pt-1">
            Born from an unapologetic refusal to blend into the background. Every CEUS silhouette
            is an invitation to own the room you enter—unfiltered, magnetic, and completely in command.
          </p>

          <div className="pt-3 flex items-center justify-center space-x-6">
            <button
              id="read-full-manifesto-btn"
              onClick={onOpenAbout}
              className="text-xs font-sans-clean tracking-[0.25em] uppercase text-[#8C7355] hover:text-[#1C1917] border-b border-[#8C7355] pb-1 transition-colors font-medium"
            >
              Read Atelier Manifesto
            </button>
          </div>
        </motion.div>

        {/* Private Client Access & Newsletter Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-14 sm:mt-16 max-w-xl mx-auto bg-white/85 backdrop-blur-xl border border-[#E5DCD1] p-7 sm:p-9 shadow-[0_20px_45px_-10px_rgba(70,50,30,0.08)] text-left"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C7355] font-sans-clean font-semibold block mb-1">
            PRIVATE RELEASE ACCESS
          </span>
          <h4 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] mb-2 font-normal">
            Enter the Private Circle
          </h4>
          <p className="text-xs text-[#574D43] font-sans-clean leading-relaxed mb-5 font-light">
            Receive private editorial drops, runway reservations, and invitation-only previews directly to your inbox.
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center space-x-2 text-[#8C7355] bg-[#FAF7F2] border border-[#8C7355]/40 p-4 text-xs font-sans-clean tracking-wider font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#8C7355]" />
              <span>You have been added to the CEUS private ledger.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7355]" />
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL FOR PRIVATE ACCESS"
                  required
                  className="w-full bg-[#FAF7F2] border border-[#E5DCD1] pl-10 pr-4 py-3.5 text-xs font-sans-clean tracking-wider text-[#1C1917] placeholder:text-[#8A7866] focus:outline-none focus:border-[#8C7355]"
                />
              </div>
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="py-3.5 px-6 bg-[#1C1917] text-[#FAF7F2] font-sans-clean text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#8C7355] transition-all duration-300 flex items-center justify-center space-x-2 shrink-0 shadow-md"
              >
                <span>Request Access</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}

          {/* Luxury assurance badges */}
          <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#E5DCD1] text-[10px] text-[#6E6255] font-sans-clean">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C7355] shrink-0" />
              <span>White-Glove Insured Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#8C7355] shrink-0" />
              <span>Complimentary Atelier Exchanges</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Credits & Return to Top */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 py-9 mt-14 border-t border-[#E5DCD1] flex flex-col sm:flex-row items-center justify-between gap-5 text-[10px] font-sans-clean tracking-[0.25em] text-[#786C60] uppercase">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="CÉUS"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('/logo.png')) {
                target.src = '/logo.svg';
              } else if (target.src.endsWith('/logo.svg')) {
                target.src = '/ceus-logo.svg';
              }
            }}
            className="h-7 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span>© 2026 HAUTE COUTURE</span>
        </div>

        <div className="flex items-center space-x-6">
          <span>TORONTO</span>
          <span>•</span>
          <span>OTTAWA</span>
          <span>•</span>
          <span>MONTREAL</span>
        </div>

        <button
          id="back-to-top-btn"
          onClick={onScrollToTop}
          className="flex items-center space-x-2 text-[#8C7355] hover:text-[#1C1917] transition-colors group font-semibold"
        >
          <span>Return To Beginning</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
