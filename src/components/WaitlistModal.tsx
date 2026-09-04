import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Sparkles, CheckCircle2, ShieldCheck, Mail, Phone, ArrowRight } from 'lucide-react';
import { ProductDetail, ProductSize } from '../types';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetail | null;
  initialSize: ProductSize;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  product,
  initialSize,
}) => {
  const [selectedSize, setSelectedSize] = React.useState<ProductSize>(initialSize);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [preferredContact, setPreferredContact] = React.useState<'email' | 'both'>('email');
  const [notes, setNotes] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [waitlistId, setWaitlistId] = React.useState('');

  React.useEffect(() => {
    setSelectedSize(initialSize);
  }, [initialSize, isOpen]);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const code = `CEUS-WL-${Math.floor(100000 + Math.random() * 900000)}`;
    setWaitlistId(code);

    // Save to local storage for customer reference
    try {
      const stored = localStorage.getItem('ceus_waitlist_requests') || '[]';
      const parsed = JSON.parse(stored);
      parsed.push({
        id: code,
        productId: product.id,
        productName: product.name,
        size: selectedSize,
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('ceus_waitlist_requests', JSON.stringify(parsed));
    } catch {
      // safe fallback
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E5DCD1] text-[#1C1917] shadow-[0_30px_70px_rgba(70,50,30,0.25)] overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E5DCD1] flex items-center justify-between bg-white/80">
              <div className="flex items-center space-x-3">
                <span className="font-editorial text-2xl tracking-[0.3em] text-[#1C1917]">CÉUS</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-sans-clean font-semibold">
                  // RESTOCK & AVAILABILITY NOTIFICATION
                </span>
              </div>
              <button
                id="close-waitlist-modal-btn"
                onClick={onClose}
                className="p-1.5 text-[#786C60] hover:text-[#1C1917] transition-colors"
                aria-label="Close waitlist modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8">
              {isSubmitted ? (
                /* Success Confirmation */
                <div className="text-center py-6 flex flex-col items-center space-y-5">
                  <div className="w-16 h-16 bg-[#F4EDE4] border border-[#8C7355] flex items-center justify-center text-[#8C7355]">
                    <Bell className="w-8 h-8" />
                  </div>

                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C7355] font-sans-clean font-bold">
                    PRIORITY AVAILABILITY CONFIRMED
                  </span>

                  <h3 className="font-editorial text-3xl text-[#1C1917]">
                    You are on the Atelier List
                  </h3>

                  <p className="text-xs sm:text-sm text-[#574D43] font-sans-clean max-w-md font-light leading-relaxed">
                    Thank you, <span className="font-semibold text-[#1C1917]">{name}</span>. You will receive private, first-priority notification the moment{' '}
                    <span className="font-serif-luxury italic text-[#8C7355]">{product.name} (Size {selectedSize})</span> is prepared for restock.
                  </p>

                  {/* Priority Reference Card */}
                  <div className="w-full max-w-md p-5 bg-white border border-[#E5DCD1] text-left font-sans-clean space-y-3 shadow-sm">
                    <div className="flex justify-between items-center border-b border-[#E5DCD1] pb-2.5">
                      <span className="text-[9px] uppercase tracking-widest text-[#8C7355] font-bold">
                        RESTOCK PASS REFERENCE
                      </span>
                      <span className="text-xs font-mono font-bold text-[#8C7355] bg-[#FAF7F2] px-2 py-0.5 border border-[#E5DCD1]">
                        {waitlistId}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-[#8A7866] block">Garment</span>
                        <span className="text-[#1C1917] font-medium">{product.name}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7866] block">Reserved Size</span>
                        <span className="text-[#8C7355] font-bold">Size {selectedSize}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7866] block">Notification Sent To</span>
                        <span className="text-[#1C1917] font-medium truncate block">{email}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7866] block">Priority Status</span>
                        <span className="text-[#1C1917] font-medium">VIP Tier 1</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8C7355] transition-colors shadow-md mt-2"
                  >
                    Return to Collection
                  </button>
                </div>
              ) : (
                /* Information Collection Form */
                <div className="space-y-6">
                  {/* Product Mini Preview Header */}
                  <div className="flex items-center space-x-4 p-4 bg-white border border-[#E5DCD1]">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-16 h-20 object-cover object-center border border-[#E5DCD1]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C7355] font-semibold block">
                        {product.collectionTag}
                      </span>
                      <h4 className="font-editorial text-lg text-[#1C1917] truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-[#6E6255] font-sans-clean">
                        <span>${product.price} USD</span>
                        <span>•</span>
                        <span className="text-[#A35238] font-semibold">Currently Unavailable in Selected Sizes</span>
                      </div>
                    </div>
                  </div>

                  {/* Intro Description */}
                  <div className="space-y-1">
                    <div className="inline-flex items-center space-x-1.5 text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>ATELIER RESTOCK SERVICE</span>
                    </div>
                    <p className="text-xs text-[#574D43] font-sans-clean font-light leading-relaxed">
                      Due to artisanal craftsmanship and limited material sourcing, our silhouettes are produced in small numbered editions. Provide your details below to receive direct notification and 24-hour early access prior to general restock.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 font-sans-clean text-xs">
                    {/* Size Selector */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6255] font-semibold block mb-1.5">
                        Select Desired Size *
                      </label>
                      <div className="flex gap-2">
                        {product.availableSizes.map((size) => {
                          const isSoldOut = Boolean(product.soldOutSizes?.includes(size));
                          const isSelected = selectedSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              className={`flex-1 h-9 flex items-center justify-center text-xs tracking-wider uppercase border transition-all ${
                                isSelected
                                  ? 'border-[#8C7355] bg-[#8C7355] text-white font-bold shadow-sm'
                                  : 'border-[#E5DCD1] bg-white text-[#574D43] hover:border-[#8C7355]'
                              }`}
                            >
                              <span>{size}</span>
                              {isSoldOut && (
                                <span className="ml-1 text-[8px] opacity-80">(Waitlist)</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Customer Name */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6255] font-semibold block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Vivienne St. Claire"
                        className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-none focus:border-[#8C7355]"
                      />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#6E6255] font-semibold block mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="v.stclaire@couture.com"
                            className="w-full bg-white border border-[#E5DCD1] p-3 pr-8 text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-none focus:border-[#8C7355]"
                          />
                          <Mail className="w-3.5 h-3.5 text-[#8A7866] absolute right-3 top-3.5 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#6E6255] font-semibold block mb-1">
                          Phone / WhatsApp (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 019-2834"
                            className="w-full bg-white border border-[#E5DCD1] p-3 pr-8 text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-none focus:border-[#8C7355]"
                          />
                          <Phone className="w-3.5 h-3.5 text-[#8A7866] absolute right-3 top-3.5 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Notification Preference */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6255] font-semibold block mb-1.5">
                        Notification Method
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          onClick={() => setPreferredContact('email')}
                          className={`flex items-center space-x-2 p-2.5 border cursor-pointer transition-colors ${
                            preferredContact === 'email'
                              ? 'bg-white border-[#8C7355] text-[#1C1917]'
                              : 'bg-white/50 border-[#E5DCD1] text-[#6E6255]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactPref"
                            checked={preferredContact === 'email'}
                            onChange={() => setPreferredContact('email')}
                            className="accent-[#8C7355]"
                          />
                          <span className="text-[11px]">Email Priority Alert</span>
                        </label>

                        <label
                          onClick={() => setPreferredContact('both')}
                          className={`flex items-center space-x-2 p-2.5 border cursor-pointer transition-colors ${
                            preferredContact === 'both'
                              ? 'bg-white border-[#8C7355] text-[#1C1917]'
                              : 'bg-white/50 border-[#E5DCD1] text-[#6E6255]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactPref"
                            checked={preferredContact === 'both'}
                            onChange={() => setPreferredContact('both')}
                            className="accent-[#8C7355]"
                          />
                          <span className="text-[11px]">Email + SMS Alert</span>
                        </label>
                      </div>
                    </div>

                    {/* Optional Note / Tailoring request */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6255] font-semibold block mb-1">
                        Atelier Notes or Sizing Questions (Optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                        placeholder="Inquire about custom hem measurements or specific silhouette fitting..."
                        className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-none focus:border-[#8C7355]"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#1C1917] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8C7355] transition-colors flex items-center justify-center space-x-2 shadow-md pt-3.5"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Notify Me When Size {selectedSize} is Available</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Privacy & Guarantee note */}
                  <div className="pt-2 text-[10px] text-[#786C60] font-sans-clean flex items-center justify-between border-t border-[#E5DCD1]">
                    <div className="flex items-center space-x-1.5 text-[#8C7355]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Strict Confidentiality • No Spam • Single Notification Only</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
