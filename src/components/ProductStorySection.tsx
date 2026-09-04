import React from 'react';
import { ProductDetail, ProductSize } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Info,
  Maximize2,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Layers,
  Sparkles,
  Bell,
} from 'lucide-react';
import { WaitlistModal } from './WaitlistModal';

interface ProductStorySectionProps {
  product: ProductDetail;
  index: number;
  totalProducts: number;
  onAddToCart: (product: ProductDetail, size: ProductSize, quantity: number) => void;
  onOpenLookbook: (product: ProductDetail, imageIndex: number) => void;
}

export const ProductStorySection: React.FC<ProductStorySectionProps> = ({
  product,
  index,
  totalProducts,
  onAddToCart,
  onOpenLookbook,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const defaultSize = React.useMemo(() => {
    return product.availableSizes.find((s) => !product.soldOutSizes?.includes(s)) || 'S';
  }, [product]);

  const [selectedSize, setSelectedSize] = React.useState<ProductSize>(defaultSize);
  const [quantity, setQuantity] = React.useState(1);
  const [isAddedRecently, setIsAddedRecently] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = React.useState(false);

  // Update selected size if product changes
  React.useEffect(() => {
    setSelectedSize(defaultSize);
  }, [defaultSize]);

  const isCurrentSizeSoldOut = Boolean(product.soldOutSizes?.includes(selectedSize));

  const allImages = [
    {
      url: product.primaryImage,
      caption: `${product.name} — Atelier Master Editorial`,
      viewType: 'Editorial Focus',
    },
    ...product.alternateImages,
  ];

  const currentImage = allImages[selectedImageIndex] || allImages[0];

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2400);
  };

  return (
    <section
      id={`story-section-${index}`}
      className="relative w-full min-h-screen py-24 sm:py-28 flex items-center justify-center overflow-hidden bg-[#FAF7F2] border-t border-[#E5DCD1]"
    >
      {/* Ambient Atmospheric Light Background with subtle warmth */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Soft atmospheric blurred background glow derived from editorial imagery */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE4]/60 to-[#FAF7F2]" />
        
        {/* Blurred background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vh] rounded-full bg-[#EFE8DE]/50 blur-3xl" />
        
        {/* Editorial Watermark Numbering in background */}
        <div className="absolute right-4 sm:right-12 top-1/4 font-editorial text-[14vw] sm:text-[18vw] text-[#8C7355]/[0.04] select-none font-bold leading-none pointer-events-none">
          0{index + 1}
        </div>
        
        {/* Film grain */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-60" />
      </div>

      {/* Top Editorial Banner */}
      <div className="absolute top-20 sm:top-24 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-sans-clean font-medium text-[#786C60] pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="text-[#8C7355] font-semibold">COLLECTION 0{index + 1} // 0{totalProducts}</span>
          <span className="text-[#8C7355]/40">•</span>
          <span>AUTUMN COUTURE</span>
        </div>
        <div className="hidden sm:block text-[#8A7866] tracking-[0.3em]">
          {product.location}
        </div>
      </div>

      {/* Main Viewport Content Layout: Adaptive Responsive 3-Column / Editorial Stage */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-8 min-h-[calc(100vh-140px)]">
        
        {/* Left Column: Editorial Title, Story Statement & Perspective Controls */}
        <div className="w-full lg:w-[32%] text-left order-2 lg:order-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="space-y-3 sm:space-y-4"
          >
            {/* Edition Badge */}
            <div className="inline-flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C7355] font-sans-clean font-semibold">
                {product.editionBadge}
              </span>
            </div>

            {/* Product Title */}
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#1C1917] font-light tracking-[0.08em] uppercase leading-[1.08]">
              {product.name}
            </h2>

            {/* Tagline / Subtitle */}
            <p className="text-xs sm:text-sm font-tenor uppercase tracking-[0.2em] text-[#6E5841]">
              {product.tagline}
            </p>

            {/* Editorial One-Sentence Story Statement */}
            <p className="font-serif-luxury italic text-lg sm:text-xl md:text-2xl text-[#3D332A] font-light leading-snug pt-1">
              "{product.description}"
            </p>

            {/* Photoshoot Perspective Switcher */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.25em] text-[#8A7866] uppercase font-sans-clean flex items-center">
                  <Layers className="w-3 h-3 mr-1.5 text-[#8C7355]" />
                  PERSPECTIVES ({selectedImageIndex + 1}/{allImages.length})
                </span>
                <button
                  id={`expand-photo-btn-${product.id}`}
                  onClick={() => onOpenLookbook(product, selectedImageIndex)}
                  className="text-[9px] tracking-[0.2em] uppercase text-[#8C7355] hover:text-[#1C1917] flex items-center space-x-1 font-sans-clean transition-colors"
                >
                  <Maximize2 className="w-3 h-3 mr-1" />
                  <span>Full View</span>
                </button>
              </div>

              {/* Perspective Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {allImages.map((img, i) => (
                  <button
                    key={`${img.url}-${img.viewType}-${i}`}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`px-3 py-1.5 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-sans-clean transition-all duration-300 border ${
                      selectedImageIndex === i
                        ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] font-semibold shadow-md'
                        : 'bg-white/70 text-[#574D43] border-[#E5DCD1] hover:border-[#8C7355] hover:bg-white'
                    }`}
                  >
                    {img.viewType}
                  </button>
                ))}
              </div>

              {/* Current photo caption */}
              <p className="text-[11px] text-[#786C60] font-sans-clean italic pt-1 line-clamp-1">
                {currentImage.caption}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Center Stage: Full Editorial Photoshoot Imagery — Adaptive Framing */}
        <div className="w-full lg:w-[36%] flex items-center justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[420px] lg:max-w-[460px] flex items-center justify-center group"
          >
            {/* Portrait Frame Container: Sized to ensure full head-to-hemline preservation without over-zooming */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[78vh] max-h-[820px] bg-[#EFE8DE] overflow-hidden border border-[#E5DCD1] shadow-[0_25px_50px_-12px_rgba(70,50,30,0.14)]">
              {allImages.map((img, i) => {
                const isActive = selectedImageIndex === i;
                return (
                  <div
                    key={`${img.url}-${i}`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} - ${img.caption}`}
                      loading="eager"
                      decoding="async"
                      fetchPriority={i === 0 ? 'high' : 'auto'}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1800&q=85') {
                          target.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1800&q=85';
                        }
                      }}
                      className="w-full h-full object-contain sm:object-cover object-top filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}

              {/* Lookbook hover overlay icon */}
              <button
                onClick={() => onOpenLookbook(product, selectedImageIndex)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 hover:bg-white text-[#1C1917] border border-[#E5DCD1] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
                title="Expand fullscreen lookbook"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Editorial bottom watermark */}
              <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] font-sans-clean text-[#1C1917]/70 bg-white/75 backdrop-blur-md px-3 py-1.5 border border-[#E5DCD1]/60">
                <span className="font-semibold">{product.name}</span>
                <span>{currentImage.viewType}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Luxury Light Beige Atelier Dossier Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full lg:w-[28%] bg-white/85 backdrop-blur-xl border border-[#E5DCD1] p-6 sm:p-7 shadow-[0_20px_45px_-10px_rgba(70,50,30,0.08)] order-3"
        >
          {/* Accent Line */}
          <div className="w-8 h-[1.5px] bg-[#8C7355] mb-5" />

          {/* Header with Story Number & Price */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-sans-clean font-semibold block mb-0.5">
                {product.storyNumber} // ATELIER VAULT
              </span>
              <h3 className="font-editorial text-3xl text-[#1C1917] font-normal tracking-wide">
                ${product.price}
              </h3>
            </div>
            <button
              onClick={() => setShowDetailsModal(true)}
              className="text-[10px] uppercase tracking-widest text-[#8C7355] hover:text-[#1C1917] flex items-center space-x-1 transition-colors mt-1 font-sans-clean font-medium bg-[#F4EDE4] px-2.5 py-1 border border-[#E5DCD1]"
            >
              <Info className="w-3 h-3 mr-1" />
              <span>Details</span>
            </button>
          </div>

          {/* Size Selector */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] uppercase tracking-widest text-[#6E6255] font-sans-clean font-semibold">
                  Select Size
                </label>
                <span className="text-[9px] uppercase tracking-wider text-[#8A7866]">
                  {isCurrentSizeSoldOut ? (
                    <span className="text-[#A35238] font-bold">Sold Out in {selectedSize}</span>
                  ) : (
                    'True to Silhouette'
                  )}
                </span>
              </div>
              <div className="flex gap-2">
                {product.availableSizes.map((size) => {
                  const isSoldOut = Boolean(product.soldOutSizes?.includes(size));
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      id={`size-btn-${product.id}-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`relative flex-1 h-9 flex items-center justify-center text-xs font-sans-clean tracking-wider uppercase transition-all duration-300 border overflow-hidden ${
                        isSelected
                          ? isSoldOut
                            ? 'border-[#A35238] bg-[#F5EBE6] text-[#A35238] font-bold shadow-sm'
                            : 'border-[#1C1917] bg-[#1C1917] text-[#FAF7F2] font-bold shadow-sm'
                          : isSoldOut
                          ? 'border-[#E5DCD1] bg-[#F7F3ED]/70 text-[#A89F91] hover:border-[#A35238]/50'
                          : 'border-[#E5DCD1] text-[#574D43] hover:border-[#8C7355] bg-white'
                      }`}
                    >
                      <span className={isSoldOut && !isSelected ? 'line-through opacity-70' : ''}>
                        {size}
                      </span>
                      {isSoldOut && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#A35238]" />
                      )}
                    </button>
                  );
                })}
              </div>
              {isCurrentSizeSoldOut && (
                <div className="mt-2 text-[10px] text-[#A35238] font-sans-clean bg-[#FBF2EE] border border-[#ECD9D1] p-3 flex flex-col gap-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Size {selectedSize} is currently unavailable.</span>
                    <span className="font-semibold uppercase tracking-wider text-[9px] bg-[#F5E6E0] px-1.5 py-0.5 border border-[#ECD9D1]">
                      Atelier Sold Out
                    </span>
                  </div>
                  <button
                    id={`notify-btn-${product.id}-${selectedSize}`}
                    type="button"
                    onClick={() => setIsWaitlistModalOpen(true)}
                    className="w-full py-2 bg-[#8C7355] text-white text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#6D583F] transition-colors flex items-center justify-center space-x-1.5 shadow-sm mt-0.5"
                  >
                    <Bell className="w-3 h-3" />
                    <span>Notify Me When Size {selectedSize} is Available</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quantity Selector & Add To Bag */}
            <div className="space-y-3">
              <div className={`flex items-center justify-between border border-[#E5DCD1] bg-[#FAF7F2] px-3 py-2 ${isCurrentSizeSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                <span className="text-[10px] uppercase tracking-widest text-[#6E6255] font-sans-clean">
                  Quantity
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isCurrentSizeSoldOut}
                    className="p-1 text-[#6E6255] hover:text-[#1C1917] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-sans-clean font-bold text-[#1C1917]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isCurrentSizeSoldOut}
                    className="p-1 text-[#6E6255] hover:text-[#1C1917] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Add To Bag or Notify Primary Button */}
              {isCurrentSizeSoldOut ? (
                <button
                  id={`waitlist-btn-${product.id}`}
                  onClick={() => setIsWaitlistModalOpen(true)}
                  className="w-full py-3.5 text-[11px] font-sans-clean uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center space-x-2 border shadow-md bg-[#8C7355] border-[#8C7355] text-white hover:bg-[#6D583F] hover:border-[#6D583F]"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me When Available — Size {selectedSize}</span>
                </button>
              ) : (
                <button
                  id={`add-to-cart-btn-${product.id}`}
                  onClick={handleAddToCart}
                  disabled={isAddedRecently}
                  className={`w-full py-3.5 text-[11px] font-sans-clean uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center space-x-2 border shadow-md ${
                    isAddedRecently
                      ? 'bg-emerald-800 border-emerald-800 text-white'
                      : 'bg-[#1C1917] border-[#1C1917] text-[#FAF7F2] hover:bg-[#8C7355] hover:border-[#8C7355]'
                  }`}
                >
                  {isAddedRecently ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add To Bag — ${(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Delivery Note */}
            <div className="pt-2 border-t border-[#E5DCD1] text-[10px] text-[#786C60] font-sans-clean flex items-center justify-between">
              <span>White-Glove Courier</span>
              <span className="font-semibold text-[#8C7355]">Complimentary</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expandable Editorial Specifications Dossier Modal */}
      <AnimatePresence>
        {showDetailsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#E5DCD1] p-7 sm:p-9 text-[#1C1917] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[#E5DCD1] pb-4 mb-5">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-sans-clean font-semibold block">
                    ATELIER SPECIFICATIONS
                  </span>
                  <h4 className="font-editorial text-2xl text-[#1C1917]">{product.name}</h4>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-xs uppercase tracking-widest px-3 py-1 border border-[#E5DCD1] bg-white text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans-clean">
                {/* Product Summary Header */}
                <div className="flex gap-4 p-3 bg-white border border-[#E5DCD1]">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-20 h-24 sm:w-22 sm:h-26 object-cover object-top border border-[#E5DCD1] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[9px] tracking-[0.25em] uppercase text-[#8C7355] block font-semibold">
                        {product.editionBadge}
                      </span>
                      <h5 className="font-editorial text-lg text-[#1C1917] leading-snug">
                        {product.name}
                      </h5>
                    </div>
                    <div className="text-[11px] font-sans-clean text-[#6E6255]">
                      <span>Atelier Price: </span>
                      <span className="font-bold text-[#1C1917]">${product.price}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] tracking-[0.25em] uppercase text-[#8C7355] mb-1 font-semibold">
                    The Silhouette Story
                  </h5>
                  <p className="text-[#574D43] leading-relaxed font-light">
                    {product.extendedDescription}
                  </p>
                </div>

                <div>
                  <h5 className="text-[10px] tracking-[0.25em] uppercase text-[#8C7355] mb-1.5 font-semibold">
                    Craft & Technical Details
                  </h5>
                  <ul className="space-y-1.5 text-[#574D43]">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <ChevronRight className="w-3 h-3 text-[#8C7355] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#E5DCD1]">
                  <div>
                    <span className="text-[9px] tracking-widest uppercase text-[#8C7355] block mb-1 font-semibold">
                      Material Care
                    </span>
                    <span className="text-[#574D43]">{product.fabricCare}</span>
                  </div>
                  <div>
                    <span className="text-[9px] tracking-widest uppercase text-[#8C7355] block mb-1 font-semibold">
                      Styling Notes
                    </span>
                    <span className="text-[#574D43]">{product.stylingNote}</span>
                  </div>
                </div>

                {isCurrentSizeSoldOut ? (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setIsWaitlistModalOpen(true);
                    }}
                    className="w-full mt-3 py-3.5 font-semibold text-xs tracking-[0.2em] uppercase transition-colors bg-[#8C7355] text-white hover:bg-[#6D583F] flex items-center justify-center space-x-2"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Notify Me When Size {selectedSize} is Available</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAddToCart();
                    }}
                    className="w-full mt-3 py-3.5 font-semibold text-xs tracking-[0.2em] uppercase transition-colors bg-[#1C1917] text-[#FAF7F2] hover:bg-[#8C7355]"
                  >
                    Select Size {selectedSize} & Add to Bag (${product.price})
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Availability / Restock Notification Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        product={product}
        initialSize={selectedSize}
      />
    </section>
  );
};
