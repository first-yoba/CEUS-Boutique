/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CEUS_PRODUCTS } from './data/products';
import { ProductDetail, ProductSize, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductStorySection } from './components/ProductStorySection';
import { BrandManifestoSection } from './components/BrandManifestoSection';
import { CartDrawer } from './components/CartDrawer';
import { AboutModal } from './components/AboutModal';
import { EventsModal } from './components/EventsModal';
import { EditorialGalleryModal } from './components/EditorialGalleryModal';
import { luxuryAudio } from './utils/audio';

export default function App() {
  // Cart state initialized from localStorage
  const [cartItems, setCartItems] = React.useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ceus_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal and drawer visibility states
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const [isEventsOpen, setIsEventsOpen] = React.useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [selectedGalleryProduct, setSelectedGalleryProduct] = React.useState<ProductDetail | null>(null);
  const [activeGalleryImageIndex, setActiveGalleryImageIndex] = React.useState(0);

  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);

  // Active Story Tracking via IntersectionObserver
  const [activeStoryIndex, setActiveStoryIndex] = React.useState<number>(-1);

  // Persist cart to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem('ceus_cart_items', JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  // Pre-decode and warm all high-res product photos into memory for instant perspective switching
  React.useEffect(() => {
    CEUS_PRODUCTS.forEach((prod) => {
      const urls = [prod.primaryImage, ...prod.alternateImages.map((img) => img.url)];
      urls.forEach((url) => {
        if (!url) return;
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      });
    });
  }, []);

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const storyElements = CEUS_PRODUCTS.map((_, i) =>
        document.getElementById(`story-section-${i}`)
      );

      const scrollPos = window.scrollY + window.innerHeight / 2;

      let foundIndex = -1;
      storyElements.forEach((el, index) => {
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            foundIndex = index;
          }
        }
      });

      setActiveStoryIndex(foundIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product: ProductDetail, size: ProductSize, quantity: number) => {
    const itemKey = `${product.id}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity,
          image: product.primaryImage,
          editionBadge: product.editionBadge,
        },
      ];
    });
    // Open drawer seamlessly to show product addition
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleAudio = () => {
    const active = luxuryAudio.toggle();
    setIsAudioPlaying(active);
  };

  const handleScrollToStory = (index: number) => {
    const target = document.getElementById(`story-section-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    const hero = document.getElementById('hero-section');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenLookbook = (product: ProductDetail, imageIndex: number) => {
    setSelectedGalleryProduct(product);
    setActiveGalleryImageIndex(imageIndex);
    setIsGalleryOpen(true);
  };

  const currentProduct = activeStoryIndex >= 0 ? CEUS_PRODUCTS[activeStoryIndex] : undefined;

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans-clean selection:bg-[#D9C5B2] selection:text-[#1C1917]">
      {/* Top Fixed Luxury Navigation */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenEvents={() => setIsEventsOpen(true)}
        onScrollToStory={handleScrollToStory}
        activeStoryIndex={activeStoryIndex}
        totalStories={CEUS_PRODUCTS.length}
        currentStoryName={currentProduct?.name}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Floating Story Navigation Indicator on Right Side (Desktop lookbook stepper) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center space-y-4">
        {CEUS_PRODUCTS.map((prod, idx) => (
          <button
            key={prod.id}
            onClick={() => handleScrollToStory(idx)}
            className="group relative flex items-center justify-end"
            title={`Story 0${idx + 1} — ${prod.name}`}
          >
            {/* Tooltip on hover */}
            <span className="absolute right-7 px-3 py-1.5 bg-white border border-[#E5DCD1] text-[9px] tracking-[0.25em] uppercase text-[#1C1917] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md font-semibold">
              0{idx + 1}. {prod.name}
            </span>
            <div
              className={`w-1.5 transition-all duration-500 ${
                activeStoryIndex === idx
                  ? 'h-8 bg-[#8C7355] shadow-[0_0_12px_rgba(140,115,85,0.4)]'
                  : 'h-2 bg-[#8C7355]/25 hover:bg-[#8C7355]/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Section 1 — Full-Screen Hero Landing Page */}
      <HeroSection onExploreClick={() => handleScrollToStory(0)} />

      {/* Sections 2 to 5 — Individual Full-Screen Photoshoot Stories */}
      {CEUS_PRODUCTS.map((product, index) => (
        <ProductStorySection
          key={product.id}
          product={product}
          index={index}
          totalProducts={CEUS_PRODUCTS.length}
          onAddToCart={handleAddToCart}
          onOpenLookbook={handleOpenLookbook}
        />
      ))}

      {/* Final Brand Section */}
      <BrandManifestoSection
        onScrollToTop={handleScrollToTop}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Sliding Luxury Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Brand Manifesto Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Private Salon & Runway Events Modal */}
      <EventsModal
        isOpen={isEventsOpen}
        onClose={() => setIsEventsOpen(false)}
      />

      {/* Fullscreen Photoshoot Lightbox Modal */}
      <EditorialGalleryModal
        isOpen={isGalleryOpen}
        product={selectedGalleryProduct}
        activeImageIndex={activeGalleryImageIndex}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
