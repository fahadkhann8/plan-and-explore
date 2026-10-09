import React, { useEffect, useState } from 'react';
import {
  X,
  ArrowLeft,
  Calendar,
  Clock,
  Check,
  MapPin,
  MessageCircle,
  Share2,
  Mountain,
  Utensils,
  Home,
  ChevronRight,
} from 'lucide-react';
import { TravelPackage } from '../types';
import { RouteVisualizer } from './RouteVisualizer';
import { PackageItinerary } from './PackageItinerary';
import { WHATSAPP_RAW_NUMBER, WHATSAPP_BASE_URL } from '../data/packages';
import { useBodyScrollLock } from '../utils/scrollLock';

interface PackageDetailExperienceProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onOpenCustomPlan: () => void;
  onBookPackage?: (pkg: TravelPackage) => void;
}

export const PackageDetailExperience: React.FC<PackageDetailExperienceProps> = ({
  pkg,
  onClose,
  onBookPackage,
}) => {
  const [copied, setCopied] = useState(false);

  // Centralized body scroll lock
  useBodyScrollLock(!!pkg);

  // Keyboard navigation & Escape key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!pkg) return null;

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pkg.destination} — Plan & Explore`,
          text: pkg.shortDescription,
          url: shareUrl,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        setCopied(false);
      });
    }
  };

  const getWhatsAppMessageUrl = () => {
    const message = encodeURIComponent(
      `Hi Plan & Explore! I am interested in the "${pkg.destination}" package (${pkg.duration} · ${pkg.price}). Could you please share the upcoming departure dates and booking details?`
    );
    return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${message}`;
  };

  return (
    <div
      id="package-detail-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-experience-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#FAFAF7] text-[#0B1F33] animate-in fade-in duration-200"
    >
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-30 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#0B1F33]/10 py-2.5 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            id="detail-back-btn"
            onClick={onClose}
            className="group inline-flex items-center gap-1.5 min-h-[44px] text-xs uppercase tracking-wider font-semibold text-[#0B1F33] hover:text-[#5A5A40] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>All Packages</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline text-xs font-medium text-[#4F5E6E] pr-2 border-r border-[#0B1F33]/10">
              {pkg.packageNumber} &middot; {pkg.destination}
            </span>

            <button
              onClick={handleShare}
              className="px-2.5 py-1.5 min-h-[40px] text-[#4F5E6E] hover:text-[#0B1F33] rounded-sm hover:bg-[#E8E8E1] transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Share journey"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            {onBookPackage ? (
              <button
                id="detail-top-book-btn"
                onClick={() => onBookPackage(pkg)}
                className="px-4 py-2 min-h-[44px] bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95 flex items-center justify-center"
              >
                Book This Journey
              </button>
            ) : (
              <a
                id="detail-top-whatsapp-btn"
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow-md cursor-pointer justify-center rounded-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white fill-white/20" />
                <span>Chat on WhatsApp</span>
              </a>
            )}

            <button
              id="detail-close-btn"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-sm text-[#4F5E6E] hover:text-[#0B1F33] hover:bg-[#E8E8E1] transition-colors cursor-pointer"
              aria-label="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Compact Hero Banner */}
        <section className="relative rounded-sm overflow-hidden bg-[#0B1F33] text-white mb-6 border border-[#0B1F33]/10">
          <div className="relative aspect-[16/8] sm:aspect-[21/8] max-h-[340px] w-full">
            <img
              src={pkg.coverImage}
              alt={pkg.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/40 to-transparent" />

            {/* Bottom Content inside Hero */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-xs bg-white/90 text-[#0B1F33] text-[10px] font-bold tracking-wider uppercase">
                    {pkg.packageNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-xs bg-black/40 text-white/90 text-[10px] font-medium border border-white/20">
                    {pkg.frequency}
                  </span>
                </div>
                <h1 id="package-experience-title" className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
                  {pkg.destination}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-white/80 max-w-xl">
                  {pkg.subtitle}
                </p>
              </div>

              <div className="shrink-0 text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-white/60 block font-semibold">
                  Starting Price
                </span>
                <div className="font-editorial text-2xl sm:text-3xl text-white">
                  {pkg.price}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 sm:p-4 bg-[#0B1F33] border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#A3B899] shrink-0" />
              <div>
                <span className="text-white/50 text-[10px] uppercase block">Duration</span>
                <span className="text-white font-medium">{pkg.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#A3B899] shrink-0" />
              <div>
                <span className="text-white/50 text-[10px] uppercase block">Departure</span>
                <span className="text-white font-medium truncate">{pkg.departureFrom}</span>
              </div>
            </div>

            {pkg.elevation && (
              <div className="flex items-center gap-2">
                <Mountain className="w-3.5 h-3.5 text-[#A3B899] shrink-0" />
                <div>
                  <span className="text-white/50 text-[10px] uppercase block">Altitude</span>
                  <span className="text-white font-medium">{pkg.elevation}</span>
                </div>
              </div>
            )}

            {pkg.frequency && (
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#A3B899] shrink-0" />
                <div>
                  <span className="text-white/50 text-[10px] uppercase block">Schedule</span>
                  <span className="text-white font-medium">{pkg.frequency}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <section className="bg-white p-5 sm:p-6 rounded-sm border border-[#0B1F33]/10">
              <h2 className="text-xs uppercase tracking-wider font-bold text-[#5A5A40] mb-2">
                Overview
              </h2>
              <p className="text-sm sm:text-base text-[#4F5E6E] leading-relaxed">
                {pkg.overview}
              </p>
            </section>

            {/* Route Waypoints */}
            <section>
              <RouteVisualizer
                waypoints={pkg.routeWaypoints}
                destinationName={pkg.destination}
              />
            </section>

            {/* Inclusions & Exclusions */}
            <section className="bg-white p-5 sm:p-6 rounded-sm border border-[#0B1F33]/10">
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#5A5A40] mb-4">
                What's Included & Excluded
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-bold text-[#0B1F33] block mb-2.5">
                    Inclusions
                  </span>
                  <ul className="space-y-2 text-xs text-[#4F5E6E]">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#0B1F33]">{inc.title}</span>
                          {inc.description && (
                            <span className="block text-[11px] text-[#4F5E6E] mt-0.5">
                              {inc.description}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div className="sm:border-l sm:border-[#0B1F33]/10 sm:pl-6">
                    <span className="text-xs font-bold text-[#0B1F33] block mb-2.5">
                      Exclusions
                    </span>
                    <ul className="space-y-2 text-xs text-[#4F5E6E]">
                      {pkg.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#8C4A4A] font-bold text-xs mt-0.5 leading-none">&times;</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Universal Redesigned Itinerary Component */}
            <PackageItinerary pkg={pkg} />

            {/* Gallery Preview */}
            {pkg.galleryImages && pkg.galleryImages.length > 0 && (
              <section>
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#5A5A40] mb-3">
                  Gallery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {pkg.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-[4/3] rounded-sm overflow-hidden bg-[#E8E8E1] border border-[#0B1F33]/10"
                    >
                      <img
                        src={img}
                        alt={`${pkg.destination} scenery ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Booking Card (Right 4 Cols) */}
          <aside className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-sm border border-[#0B1F33]/15 shadow-xs sticky top-18">
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] block">
                {pkg.packageNumber}
              </span>
              <h3 className="font-editorial text-xl font-normal text-[#0B1F33] mt-0.5">
                {pkg.destination}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-editorial text-2xl font-normal text-[#0B1F33]">
                  {pkg.price}
                </span>
                <span className="text-[11px] text-[#4F5E6E]">/ person</span>
              </div>
              <p className="text-[11px] text-[#4F5E6E] mt-0.5">
                {pkg.duration} &middot; {pkg.frequency}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {onBookPackage ? (
                <button
                  id="sidebar-book-btn"
                  onClick={() => onBookPackage(pkg)}
                  className="w-full py-3.5 px-4 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-xs active:scale-95 cursor-pointer text-center block"
                >
                  Book This Journey
                </button>
              ) : (
                <a
                  id="sidebar-whatsapp-btn"
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-md active:scale-95 cursor-pointer text-center block rounded-xs"
                >
                  Chat on WhatsApp
                </a>
              )}

              <a
                id="sidebar-direct-chat-btn"
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50/50 hover:bg-emerald-100/60 text-[#075E54] border border-[#25D366]/40 text-xs font-bold tracking-wide uppercase transition-colors cursor-pointer rounded-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]/20" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#0B1F33]/10 space-y-2 text-xs text-[#4F5E6E]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Curated small group departures</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Certified local mountain guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified boutique alpine stays</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

