import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Lock,
  Gift,
  CreditCard,
  Sparkles,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [includeGiftPackaging, setIncludeGiftPackaging] = React.useState(true);
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0; // Complimentary white-glove courier
  const total = subtotal + shipping;

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CEUS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
    }, 1500);
  };

  const resetCheckout = () => {
    setIsCheckingOut(false);
    setOrderComplete(false);
    setOrderId('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="absolute inset-y-0 right-0 max-w-full flex pl-10"
          >
            <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E5DCD1] text-[#1C1917] flex flex-col justify-between shadow-2xl">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#E5DCD1] flex items-center justify-between bg-white/60">
                <div className="flex items-center space-x-3">
                  <span className="font-editorial text-2xl tracking-[0.3em] text-[#1C1917]">CÉUS</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-sans-clean font-semibold">
                    // CART ATELIER ({items.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                </div>
                <button
                  id="close-cart-drawer-btn"
                  onClick={onClose}
                  className="p-1.5 text-[#786C60] hover:text-[#1C1917] transition-colors"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Confirmation Screen */}
              {orderComplete ? (
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-5">
                  <div className="w-16 h-16 bg-[#F4EDE4] border border-[#8C7355] flex items-center justify-center text-[#8C7355] animate-float-slow">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C7355] font-sans-clean font-bold">
                    RESERVATION CONFIRMED
                  </span>
                  <h3 className="font-editorial text-3xl text-[#1C1917]">
                    An Entrance Awaits
                  </h3>
                  <p className="text-xs text-[#574D43] font-sans-clean leading-relaxed max-w-xs font-light">
                    Your bespoke order <span className="text-[#8C7355] font-mono font-bold">{orderId}</span> has been dispatched to our master atelier for private tailoring and white-glove courier packing.
                  </p>
                  <div className="p-4 bg-white border border-[#E5DCD1] text-left w-full text-[11px] font-sans-clean space-y-2">
                    <div className="flex justify-between text-[#6E6255]">
                      <span>Tracking Ledger:</span>
                      <span className="text-[#1C1917] font-mono font-bold">PRIORITY-AIR-09</span>
                    </div>
                    <div className="flex justify-between text-[#6E6255]">
                      <span>Packaging:</span>
                      <span className="text-[#8C7355] font-semibold">Lacquered Sand-Gold Embossed Box</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      resetCheckout();
                      onClose();
                    }}
                    className="w-full py-4 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans-clean tracking-[0.2em] uppercase font-bold hover:bg-[#8C7355] transition-colors"
                  >
                    Return to Runway
                  </button>
                </div>
              ) : isCheckingOut ? (
                /* Checkout Form View */
                <form onSubmit={handleConfirmOrder} className="flex-1 p-6 overflow-y-auto space-y-5 text-xs font-sans-clean">
                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#8C7355] font-semibold border-b border-[#E5DCD1] pb-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>PRIVATE ATELIER DISPATCH ENCRYPTION</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-editorial text-xl text-[#1C1917]">White-Glove Delivery</h4>
                    
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Victoria Beaumont"
                        className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] placeholder:text-[#8A7866] focus:outline-none focus:border-[#8C7355]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="742 Evergreen Terrace, Suite 400"
                        className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] placeholder:text-[#8A7866] focus:outline-none focus:border-[#8C7355]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Toronto"
                          className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] placeholder:text-[#8A7866] focus:outline-none focus:border-[#8C7355]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1">
                          Postal / Zip
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="M5V 2T6"
                          className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] placeholder:text-[#8A7866] focus:outline-none focus:border-[#8C7355]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#E5DCD1]">
                    <h4 className="font-editorial text-xl text-[#1C1917] flex items-center justify-between">
                      <span>Secure Payment</span>
                      <CreditCard className="w-4 h-4 text-[#8C7355]" />
                    </h4>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1">
                        Card Number (Demo)
                      </label>
                      <input
                        type="text"
                        defaultValue="•••• •••• •••• 4242"
                        className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] font-mono focus:outline-none focus:border-[#8C7355]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] font-mono focus:outline-none focus:border-[#8C7355]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          defaultValue="888"
                          className="w-full bg-white border border-[#E5DCD1] p-3 text-xs text-[#1C1917] font-mono focus:outline-none focus:border-[#8C7355]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary row in checkout */}
                  <div className="p-3.5 bg-white border border-[#E5DCD1] space-y-1.5">
                    <div className="flex justify-between text-[#6E6255]">
                      <span>Pieces Selected ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                      <span className="font-medium text-[#1C1917]">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#6E6255]">
                      <span>White-Glove Insured Courier</span>
                      <span className="text-[#8C7355] font-semibold">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#1C1917] pt-2 border-t border-[#E5DCD1]">
                      <span>Total Atelier Investment</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-1/3 py-3.5 border border-[#E5DCD1] text-xs uppercase tracking-widest text-[#574D43] hover:bg-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8C7355] transition-colors shadow-md"
                    >
                      Confirm & Pay ${total}
                    </button>
                  </div>
                </form>
              ) : items.length === 0 ? (
                /* Empty Cart State */
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-14 h-14 bg-[#F4EDE4] border border-[#E5DCD1] flex items-center justify-center text-[#8C7355]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial text-2xl text-[#1C1917]">
                    Your Atelier Bag is Empty
                  </h3>
                  <p className="text-xs text-[#6E6255] font-sans-clean leading-relaxed max-w-xs font-light">
                    Every piece in the CEUS collection is crafted in strictly limited quantities. Select a silhouette to begin your runway order.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans-clean tracking-[0.2em] uppercase font-bold hover:bg-[#8C7355] transition-colors shadow-sm"
                  >
                    Explore The Runway
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white border border-[#E5DCD1] flex gap-4 items-start shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-24 object-cover object-top border border-[#E5DCD1] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 flex flex-col justify-between h-24">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-editorial text-base text-[#1C1917] leading-snug">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[#8A7866] hover:text-red-700 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] text-[#6E6255] font-sans-clean mt-1">
                            <span className="bg-[#FAF7F2] px-1.5 py-0.5 border border-[#E5DCD1] font-semibold text-[#1C1917]">
                              Size {item.size}
                            </span>
                            <span>•</span>
                            <span className="text-[#8C7355] font-semibold">${item.price} each</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2 border border-[#E5DCD1] bg-[#FAF7F2] px-2 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 text-[#6E6255] hover:text-[#1C1917]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-xs font-sans-clean px-1 text-[#1C1917] font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 text-[#6E6255] hover:text-[#1C1917]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <span className="font-editorial text-base font-medium text-[#1C1917]">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Gift Packaging Toggle */}
                  <div className="p-3.5 bg-white border border-[#E5DCD1] flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Gift className="w-4 h-4 text-[#8C7355]" />
                      <div>
                        <span className="text-xs font-sans-clean font-medium text-[#1C1917] block">
                          Atelier Gift Packaging
                        </span>
                        <span className="text-[10px] text-[#6E6255] block">
                          Lacquered Box & Gold Embossed Ribbon
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeGiftPackaging}
                      onChange={(e) => setIncludeGiftPackaging(e.target.checked)}
                      className="accent-[#8C7355] w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Drawer Footer with Subtotal and Checkout Button */}
              {!orderComplete && items.length > 0 && !isCheckingOut && (
                <div className="p-6 border-t border-[#E5DCD1] bg-white/70 space-y-4">
                  <div className="space-y-1.5 text-xs font-sans-clean">
                    <div className="flex justify-between text-[#6E6255]">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#1C1917]">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#6E6255]">
                      <span>White-Glove Courier</span>
                      <span className="text-[#8C7355] font-semibold">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#1C1917] pt-2 border-t border-[#E5DCD1]">
                      <span>Total Atelier Value</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <button
                    id="cart-checkout-button"
                    onClick={handleStartCheckout}
                    className="w-full py-4 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans-clean tracking-[0.2em] uppercase font-bold hover:bg-[#8C7355] transition-colors flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Proceed to Private Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[10px] text-[#786C60] font-sans-clean pt-1">
                    <Shield className="w-3 h-3 text-[#8C7355]" />
                    <span>30-Day Complimentary Exchanges Across Canada</span>
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
