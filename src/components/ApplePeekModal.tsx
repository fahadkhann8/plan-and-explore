import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  Clock,
  Mountain,
  MapPin,
  Users,
  Calendar,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { TravelPackage } from '../types';
import { useRouter } from '../router';
import { useBodyScrollLock } from '../utils/scrollLock';
import { WHATSAPP_RAW_NUMBER } from '../data/packages';

interface ApplePeekModalProps {
  pkg: TravelPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (pkg: TravelPackage) => void;
}

export const ApplePeekModal: React.FC<ApplePeekModalProps> = ({
  pkg,
  isOpen,
  onClose,
  onBook,
}) => {
  const { navigate } = useRouter();
  useBodyScrollLock(isOpen);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !pkg) return null;

  const isComingSoon = pkg.price === 'Coming Soon';

  const handleViewFull = () => {
    onClose();
    navigate(`/packages/${pkg.id}`);
  };

  const handleBook = () => {
    onClose();
    onBook(pkg);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Plan & Explore! I am checking out the ${pkg.destination} (${pkg.packageNumber}) journey on your website and would love to know more about available slots.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick peek for ${pkg.destination}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* ── Apple Ultra-Blur Frosted Glass Backdrop ── */}
      <div
        className="fixed inset-0 bg-[#0B1F33]/60 backdrop-blur-xl transition-opacity duration-300 cursor-pointer"
        onClick={onClose}
      />

      {/* ── Apple Liquid Glass Peek Card ── */}
      <div className="relative w-full max-w-2xl bg-[#FAFAF7]/95 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),inset_0_1px_2px_rgba(255,255,255,0.9)] rounded-3xl overflow-hidden z-10 animate-apple-peek-in my-auto max-h-[92vh] flex flex-col">
        {/* iOS Top Pill Grab Handle */}
        <div className="pt-2.5 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#0B1F33]/20" />
        </div>

        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close peek modal"
          className="apple-glass-button absolute top-3.5 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-[#0B1F33] hover:text-black cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-7 pb-6 space-y-5">
          {/* Cover Media Header */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/10] bg-[#E8E8E1] shadow-inner mt-1">
            <img
              src={pkg.coverImage}
              alt={pkg.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/85 via-[#0B1F33]/30 to-transparent" />

            {/* Apple Floating Glass Chips */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="apple-glass-pill px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                {pkg.packageNumber}
              </span>
              <span className="apple-glass-pill px-3 py-1 rounded-full text-white/95 text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#A3B899]" />
                Apple UI Peek
              </span>
            </div>

            {/* Title & Price on Image Bottom */}
            <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3 text-white">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-normal leading-tight">
                  {pkg.destination}
                </h3>
                <p className="text-xs text-white/80 line-clamp-1 font-light">
                  {pkg.subtitle}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-white/60 block">From</span>
                <span className="font-editorial text-xl sm:text-2xl text-white font-medium">
                  {pkg.price}
                </span>
              </div>
            </div>
          </div>

          {/* Apple Specular Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="apple-glass-button rounded-2xl p-3 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#5A5A40] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#4F5E6E] block font-semibold">Duration</span>
                <span className="text-xs font-semibold text-[#0B1F33]">{pkg.duration}</span>
              </div>
            </div>

            <div className="apple-glass-button rounded-2xl p-3 flex items-center gap-2.5">
              <Mountain className="w-4 h-4 text-[#5A5A40] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#4F5E6E] block font-semibold">Elevation</span>
                <span className="text-xs font-semibold text-[#0B1F33]">{pkg.elevation || 'Mid-Altitude'}</span>
              </div>
            </div>

            <div className="apple-glass-button rounded-2xl p-3 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#5A5A40] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#4F5E6E] block font-semibold">Frequency</span>
                <span className="text-xs font-semibold text-[#0B1F33]">{pkg.frequency || 'Weekly'}</span>
              </div>
            </div>

            <div className="apple-glass-button rounded-2xl p-3 flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#5A5A40] shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#4F5E6E] block font-semibold">Pacing</span>
                <span className="text-xs font-semibold text-[#0B1F33]">Small Groups</span>
              </div>
            </div>
          </div>

          {/* Quick Overview Description */}
          <div className="bg-[#F4F1EA]/70 rounded-2xl p-4 border border-[#0B1F33]/5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Journey Snapshot</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#0B1F33]/85 leading-relaxed font-light">
              {pkg.shortDescription || pkg.overview}
            </p>
          </div>

          {/* Route Waypoints / Highlights Peek */}
          {pkg.routeWaypoints && pkg.routeWaypoints.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#4F5E6E] block mb-2">
                Route Waypoints ({pkg.routeWaypoints.length} stops)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pkg.routeWaypoints.map((stop, i) => (
                  <span
                    key={i}
                    className="apple-glass-pill px-2.5 py-1 rounded-full text-[11px] font-medium text-[#0B1F33] bg-white/60 border border-[#0B1F33]/10"
                  >
                    {stop}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Inclusions Highlights */}
          {pkg.inclusions && pkg.inclusions.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#4F5E6E] block mb-2">
                Included Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.inclusions.slice(0, 4).map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-[#0B1F33]/90 bg-white/70 p-2.5 rounded-xl border border-[#0B1F33]/6"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[11px]">{inc.title}</span>
                      {inc.description && (
                        <span className="text-[10px] text-[#4F5E6E] line-clamp-1 font-light">
                          {inc.description}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Apple Glass Bottom Action Bar ── */}
        <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-xl border-t border-[#0B1F33]/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="hidden sm:block">
            <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block">Experience</span>
            <span className="font-editorial text-lg text-[#0B1F33]">{pkg.destination}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* WhatsApp Question Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-glass-button-whatsapp px-3.5 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* View Full Page Button */}
            <button
              type="button"
              onClick={handleViewFull}
              className="apple-glass-button flex-1 sm:flex-initial px-4 sm:px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#0B1F33] bg-white/80 border border-[#0B1F33]/20 hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Full Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Reserve / Book Now Button */}
            {!isComingSoon && (
              <button
                type="button"
                onClick={handleBook}
                className="apple-glass-button-primary apple-glass-shine flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B1F33] text-white hover:bg-[#5A5A40] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Reserve Spot</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
