import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Sparkles, Clock, CheckCircle2, Ticket, ArrowRight, ShieldCheck } from 'lucide-react';

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CoutureEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  city: string;
  dressCode: string;
  description: string;
  status: 'Open for RSVP' | 'Strict Guestlist' | 'Waitlist Only';
  image: string;
}

const UPCOMING_EVENTS: CoutureEvent[] = [
  {
    id: 'evt-toronto-01',
    title: 'The Autumn Couture Salon & Runway',
    category: 'Private Runway Presentation',
    date: 'October 14, 2026',
    time: '20:00 EST',
    location: 'The Broadview Atelier Gallery',
    city: 'Toronto, Canada',
    dressCode: 'Black Tie / Avant-Garde Minimalist',
    description: 'An intimate 40-seat live presentation debuting the Volume III collection silhouettes in motion, accompanied by live chamber acoustics and bespoke champagne pairings.',
    status: 'Open for RSVP',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'evt-montreal-02',
    title: 'Silhouettes in Motion Gallery & Soirée',
    category: 'Immersive Editorial Showcase',
    date: 'November 05, 2026',
    time: '19:30 EST',
    location: 'Pavillon des Arts & de la Mode',
    city: 'Montreal, Canada',
    dressCode: 'Sculpted Monochrome',
    description: 'A multi-sensory editorial experience where live models interact with bespoke lighting installations, offering guests private fitting sessions with master tailors.',
    status: 'Open for RSVP',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'evt-paris-03',
    title: 'Fashion Week Salon & Private Preview',
    category: 'International Haute Couture Gala',
    date: 'January 22, 2027',
    time: '21:00 CET',
    location: 'Place de la Concorde Salon',
    city: 'Paris, France',
    dressCode: 'Haute Couture Formal',
    description: 'Exclusive European salon reveal for international press and private patrons prior to worldwide distribution.',
    status: 'Strict Guestlist',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
  },
];

export const EventsModal: React.FC<EventsModalProps> = ({ isOpen, onClose }) => {
  const [selectedEventId, setSelectedEventId] = React.useState<string>(UPCOMING_EVENTS[0].id);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [guestCount, setGuestCount] = React.useState('1');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [invitationCode, setInvitationCode] = React.useState('');

  const selectedEvent = UPCOMING_EVENTS.find((e) => e.id === selectedEventId) || UPCOMING_EVENTS[0];

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const code = `CEUS-VIP-${Math.floor(10000 + Math.random() * 90000)}`;
    setInvitationCode(code);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setInvitationCode('');
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
            className="relative w-full max-w-4xl bg-[#FAF7F2] border border-[#E5DCD1] text-[#1C1917] shadow-[0_30px_70px_rgba(70,50,30,0.2)] overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-[#E5DCD1] flex items-center justify-between bg-white/70">
              <div className="flex items-center space-x-3">
                <span className="font-editorial text-2xl tracking-[0.3em] text-[#1C1917]">CÉUS</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7355] font-sans-clean font-semibold">
                  // PRIVATE SALON & RUNWAY EVENTS
                </span>
              </div>
              <button
                id="close-events-modal-btn"
                onClick={onClose}
                className="p-1.5 text-[#786C60] hover:text-[#1C1917] transition-colors"
                aria-label="Close events modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
              {isSubmitted ? (
                /* VIP Pass Confirmed View */
                <div className="py-8 px-4 text-center flex flex-col items-center space-y-5">
                  <div className="w-16 h-16 bg-[#F4EDE4] border border-[#8C7355] flex items-center justify-center text-[#8C7355]">
                    <Ticket className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#8C7355] font-sans-clean font-bold">
                    INVITATION REGISTERED
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#1C1917]">
                    Your Seat Awaits
                  </h3>
                  <p className="text-xs sm:text-sm text-[#574D43] font-sans-clean max-w-md font-light leading-relaxed">
                    Thank you, <span className="font-semibold text-[#1C1917]">{name}</span>. Your private invitation request for{' '}
                    <span className="font-serif-luxury italic text-[#8C7355]">{selectedEvent.title}</span> has been confirmed.
                  </p>

                  {/* Pass Ticket Card */}
                  <div className="w-full max-w-md p-6 bg-white border border-[#E5DCD1] shadow-sm text-left font-sans-clean space-y-3 relative overflow-hidden">
                    <div className="flex justify-between items-start border-b border-[#E5DCD1] pb-3">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#8C7355] font-bold block">
                          VIP GUEST PASS
                        </span>
                        <h4 className="font-editorial text-lg text-[#1C1917]">
                          {selectedEvent.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#8C7355] px-2 py-1 bg-[#FAF7F2] border border-[#E5DCD1]">
                        {invitationCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
                      <div>
                        <span className="text-[#8A7866] block">Date & Time</span>
                        <span className="text-[#1C1917] font-medium">{selectedEvent.date} • {selectedEvent.time}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7866] block">Venue</span>
                        <span className="text-[#1C1917] font-medium">{selectedEvent.location}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7866] block">Reserved Passes</span>
                        <span className="text-[#1C1917] font-medium">{guestCount} {parseInt(guestCount) > 1 ? 'Guests' : 'Guest'}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7866] block">Dress Code</span>
                        <span className="text-[#8C7355] font-medium">{selectedEvent.dressCode}</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-[#786C60] flex items-center space-x-1.5 border-t border-[#E5DCD1]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8C7355]" />
                      <span>Digital concierge pass sent to {email}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 border border-[#E5DCD1] text-xs uppercase tracking-widest text-[#574D43] hover:bg-white transition-colors"
                    >
                      RSVP to Another Event
                    </button>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-[#1C1917] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8C7355] transition-colors"
                    >
                      Return to Runway
                    </button>
                  </div>
                </div>
              ) : (
                /* Event Listings & RSVP Form */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Events Schedule */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center space-x-1.5 text-[10px] tracking-[0.35em] uppercase text-[#8C7355] font-semibold">
                        <Sparkles className="w-3 h-3" />
                        <span>UPCOMING SALON CALENDAR</span>
                      </div>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917]">
                        Intimate Runways & Patrons Soirées
                      </h3>
                      <p className="text-xs text-[#6E6255] font-sans-clean font-light leading-relaxed">
                        CEUS runway events are reserved exclusively for patrons, private clients, and editorial press.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {UPCOMING_EVENTS.map((evt) => {
                        const isSelected = evt.id === selectedEventId;
                        return (
                          <div
                            key={evt.id}
                            onClick={() => setSelectedEventId(evt.id)}
                            className={`p-4 sm:p-5 border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white border-[#8C7355] shadow-md ring-1 ring-[#8C7355]'
                                : 'bg-white/60 border-[#E5DCD1] hover:bg-white hover:border-[#8C7355]/50'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C7355] font-bold">
                                {evt.category}
                              </span>
                              <span className="text-[10px] font-sans-clean px-2 py-0.5 bg-[#FAF7F2] border border-[#E5DCD1] text-[#1C1917] font-semibold">
                                {evt.status}
                              </span>
                            </div>

                            <h4 className="font-editorial text-lg sm:text-xl text-[#1C1917] mb-2 leading-snug">
                              {evt.title}
                            </h4>

                            <p className="text-xs text-[#574D43] font-light leading-relaxed mb-3">
                              {evt.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] font-sans-clean text-[#6E6255]">
                              <div className="flex items-center space-x-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#8C7355]" />
                                <span>{evt.date}</span>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#8C7355]" />
                                <span>{evt.time}</span>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                <MapPin className="w-3.5 h-3.5 text-[#8C7355]" />
                                <span>{evt.location} ({evt.city})</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: RSVP Request Form */}
                  <div className="lg:col-span-5 bg-white border border-[#E5DCD1] p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="border-b border-[#E5DCD1] pb-3 mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-[#8C7355] font-bold block">
                          PRIVATE INVITATION REQUEST
                        </span>
                        <h4 className="font-editorial text-lg text-[#1C1917] mt-0.5">
                          {selectedEvent.title}
                        </h4>
                        <span className="text-[11px] text-[#6E6255] font-sans-clean">
                          {selectedEvent.date} • {selectedEvent.city}
                        </span>
                      </div>

                      <form onSubmit={handleRsvpSubmit} className="space-y-4 text-xs font-sans-clean">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1 font-semibold">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Genevieve Laroche"
                            className="w-full bg-[#FAF7F2] border border-[#E5DCD1] p-3 text-xs text-[#1C1917] placeholder:text-[#8A7866] focus:outline-none focus:border-[#8C7355]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1 font-semibold">
                            Private Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="g.laroche@domain.com"
                            className="w-full bg-[#FAF7F2] border border-[#E5DCD1] p-3 text-xs text-[#1C1917] placeholder:text-[#8A7866] focus:outline-none focus:border-[#8C7355]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1 font-semibold">
                              Guest Count
                            </label>
                            <select
                              value={guestCount}
                              onChange={(e) => setGuestCount(e.target.value)}
                              className="w-full bg-[#FAF7F2] border border-[#E5DCD1] p-3 text-xs text-[#1C1917] focus:outline-none focus:border-[#8C7355]"
                            >
                              <option value="1">1 Person (Solo)</option>
                              <option value="2">2 Persons (+ Guest)</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-[#6E6255] block mb-1 font-semibold">
                              Dress Protocol
                            </label>
                            <div className="p-3 bg-[#FAF7F2] border border-[#E5DCD1] text-[11px] text-[#8C7355] font-semibold truncate">
                              Formal / Noir
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 bg-[#1C1917] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8C7355] transition-colors flex items-center justify-center space-x-2 shadow-md mt-2"
                        >
                          <span>Request Private Invitation</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    </div>

                    <div className="pt-4 border-t border-[#E5DCD1] mt-4 text-[10px] text-[#786C60] font-sans-clean space-y-1">
                      <div className="flex items-center space-x-1.5 text-[#8C7355] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>White-Glove Valet & Patrons Reception</span>
                      </div>
                      <p className="text-[#8A7866] font-light">
                        Seats are assigned by the Maison atelier upon RSVP verification.
                      </p>
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
