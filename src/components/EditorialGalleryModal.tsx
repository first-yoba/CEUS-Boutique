import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductDetail } from '../types';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface EditorialGalleryModalProps {
  product: ProductDetail | null;
  activeImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const EditorialGalleryModal: React.FC<EditorialGalleryModalProps> = ({
  product,
  activeImageIndex: initialIndex,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  if (!product) return null;

  const images = [
    {
      url: product.primaryImage,
      caption: `${product.name} — Primary Editorial Master`,
      viewType: 'Editorial Focus',
    },
    ...product.alternateImages,
  ];

  const currentImg = images[currentIndex] || images[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2]/95 backdrop-blur-2xl p-4 sm:p-8">
          {/* Close button */}
          <button
            id="close-gallery-lightbox-btn"
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white border border-[#E5DCD1] hover:bg-[#1C1917] hover:text-white text-[#1C1917] transition-colors shadow-sm"
            aria-label="Close lookbook viewer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/90 border border-[#E5DCD1] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all shadow-md"
            aria-label="Previous editorial frame"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/90 border border-[#E5DCD1] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all shadow-md"
            aria-label="Next editorial frame"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Visual Display */}
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
            <div className="relative overflow-hidden w-full h-[72vh] sm:h-[78vh] flex items-center justify-center">
              {images.map((img, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <div
                    key={`${img.url}-${idx}`}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1800&q=85') {
                          target.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1800&q=85';
                        }
                      }}
                      className="max-h-[78vh] w-auto max-w-[92vw] object-contain border border-[#E5DCD1] shadow-2xl bg-[#EFE8DE]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}
            </div>

            {/* Photo Metadata Caption */}
            <div className="mt-4 w-full text-center space-y-1">
              <div className="flex items-center justify-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-sans-clean font-semibold">
                <Camera className="w-3.5 h-3.5" />
                <span>
                  CAMPAIGN FRAME 0{currentIndex + 1} OF 0{images.length} // {currentImg.viewType}
                </span>
              </div>
              <p className="font-editorial text-lg text-[#1C1917] font-normal">
                {product.name} — <span className="font-serif-luxury italic text-[#8C7355]">{currentImg.caption}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
