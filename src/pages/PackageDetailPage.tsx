import React, { useState, useEffect, useRef } from 'react';
import { PACKAGES, WHATSAPP_RAW_NUMBER } from '../data/packages';
import { TravelPackage } from '../types';
import { Link, useRouter } from '../router';
import { PackageItinerary } from '../components/PackageItinerary';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Mountain,
  Users,
  Check,
  X,
  Share2,
  MessageCircle,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Navigation,
} from 'lucide-react';

interface PackageDetailPageProps {
  packageId: string;
  onBookPackage: (pkg: TravelPackage) => void;
  onOpenCustomPlan: () => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({
  packageId,
  onBookPackage,
  onOpenCustomPlan,
}) => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    setIsHeroLoaded(true);
  }, [packageId]);

  // Find package by ID
  const pkg = PACKAGES.find(
    (p) => p.id.toLowerCase() === packageId.toLowerCase()
  );

  if (!pkg) {
    return (
      <div className="min-h-[70vh] bg-[#FAFAF7] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-md text-center">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] block mb-2">
            PACKAGE NOT FOUND
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#0B1F33] mb-3">
            Journey Not Found
          </h1>
          <p className="text-sm text-[#4F5E6E] mb-6 font-editorial italic">
            The travel package you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Packages</span>
          </Link>
        </div>
      </div>
    );
  }

  // All images for gallery
  const allImages = [pkg.coverImage, ...(pkg.galleryImages || [])];

  // Auto-cycle gallery
  useEffect(() => {
    if (allImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [allImages.length]);

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

  const otherPackages = PACKAGES.filter((p) => p.id !== pkg.id);

  return (
    <div className="bg-[#FAFAF7] text-[#0B1F33]">
      {/* ─── FULL-BLEED CINEMATIC HERO ─── */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-end overflow-hidden">
        {/* Cycling Gallery Background */}
        {allImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${img}")`,
              opacity: activeGalleryIndex === index ? 1 : 0,
              transform: activeGalleryIndex === index ? 'scale(1.03)' : 'scale(1)',
              transition: 'opacity 1.5s ease-in-out, transform 6s ease-out',
            }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33]/40 via-transparent to-transparent" />

        {/* Back button (top-left) */}
        <div className="absolute top-24 sm:top-28 left-4 sm:left-8 z-20">
          <Link
            to="/packages"
            className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>All Packages</span>
          </Link>
        </div>

        {/* Share button (top-right) */}
        <div className="absolute top-24 sm:top-28 right-4 sm:right-8 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14"
          style={{
            opacity: isHeroLoaded ? 1 : 0,
            transform: isHeroLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.3s',
          }}
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase border border-white/20">
              {pkg.packageNumber}
            </span>
            {pkg.frequency && (
              <span className="px-3 py-1.5 rounded-full bg-[#5A5A40]/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-[#5A5A40]/30">
                <Calendar className="w-3 h-3 inline mr-1" />
                {pkg.frequency}
              </span>
            )}
            {pkg.bestSeason && (
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-medium border border-white/10">
                {pkg.bestSeason}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.05] mb-3">
            {pkg.destination}
          </h1>
          <p className="text-base sm:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-8">
            {pkg.subtitle}
          </p>

          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
            {[
              { icon: <Clock className="w-4 h-4" />, label: pkg.duration },
              ...(pkg.elevation ? [{ icon: <Mountain className="w-4 h-4" />, label: pkg.elevation }] : []),
              { icon: <MapPin className="w-4 h-4" />, label: pkg.departureFrom },
              { icon: <Users className="w-4 h-4" />, label: pkg.groupSize || 'Small Groups' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80">
                <span className="text-[#A3B899]">{stat.icon}</span>
                <span className="text-xs sm:text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onBookPackage(pkg)}
              className="group bg-white text-[#0B1F33] px-8 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-[#A3B899] transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center gap-2.5"
            >
              <span>Reserve Spot · {pkg.price}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 border-2 border-white/30 text-white text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white/60 transition-all backdrop-blur-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Gallery Dots */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 sm:right-8 z-10 flex items-center gap-1.5">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveGalleryIndex(i)}
                className={`transition-all duration-500 cursor-pointer rounded-full ${
                  activeGalleryIndex === i
                    ? 'w-6 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ─── LEFT: Main Content ─── */}
          <div className="lg:col-span-8 space-y-10">

            {/* Overview — concise card with visual accent */}
            <section className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-8 bg-[#5A5A40] rounded-full" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] block">
                    The Expedition
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33]">
                    Journey Overview
                  </h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#4F5E6E] leading-relaxed">
                {pkg.overview}
              </p>

              {/* Route Waypoints — visual chain */}
              {pkg.routeWaypoints && pkg.routeWaypoints.length > 0 && (
                <div className="mt-8 p-5 rounded-xl bg-[#0B1F33] text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#A3B899] flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5" />
                      Journey Circuit
                    </span>
                    <span className="text-[11px] text-white/50">{pkg.routeWaypoints.length} stops</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {pkg.routeWaypoints.map((point, index) => {
                      const isTerminal = index === 0 || index === pkg.routeWaypoints.length - 1;
                      return (
                        <React.Fragment key={index}>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                              isTerminal
                                ? 'bg-[#5A5A40] text-white border border-[#5A5A40]'
                                : 'bg-white/10 text-white/90 border border-white/15'
                            }`}
                          >
                            {isTerminal && <MapPin className="w-3 h-3 text-[#A3B899]" />}
                            {point}
                          </span>
                          {index < pkg.routeWaypoints.length - 1 && (
                            <span className="text-white/25 text-sm">→</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* Itinerary */}
            <PackageItinerary pkg={pkg} />

            {/* Photo Gallery */}
            {pkg.galleryImages && pkg.galleryImages.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-8 bg-[#5A5A40] rounded-full" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] block">
                      Photography
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33]">
                      Moments from {pkg.destination}
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {pkg.galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className={`group relative overflow-hidden rounded-xl bg-[#E8E8E1] cursor-pointer ${
                        i === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                      }`}
                      onClick={() => setActiveGalleryIndex(i + 1)}
                    >
                      <img
                        src={img}
                        alt={`${pkg.destination} gallery photo ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ─── RIGHT: Sticky Sidebar ─── */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">

              {/* Booking Card — glassmorphism style */}
              <div className="bg-white rounded-xl p-6 border border-[#0B1F33]/10 shadow-lg">
                <div className="mb-5">
                  <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold block mb-1">
                    Reserve Your Journey
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-editorial text-4xl font-normal text-[#0B1F33]">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-[#4F5E6E]">/ person</span>
                  </div>
                  {pkg.priceNote && (
                    <p className="text-[11px] text-[#4F5E6E] mt-1">{pkg.priceNote}</p>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onBookPackage(pkg)}
                    className="w-full py-4 px-4 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98] min-h-[48px] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Reserve Spot Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border-2 border-[#0B1F33]/15 hover:border-[#0B1F33]/40 text-[#0B1F33] text-xs font-semibold uppercase tracking-wider rounded-lg transition-all hover:bg-[#F4F1EA] min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <div className="mt-4 pt-4 border-t border-[#0B1F33]/8 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-[#4F5E6E]">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>No advance payment to inquire</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#4F5E6E]">
                    <Sparkles className="w-4 h-4 text-[#5A5A40] shrink-0" />
                    <span>Curated by local Himalayan hosts</span>
                  </div>
                </div>
              </div>

              {/* Inclusions Card */}
              <div className="bg-white rounded-xl p-6 border border-[#0B1F33]/10 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] block mb-4">
                  What's Included
                </span>
                <ul className="space-y-3">
                  {pkg.inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#0B1F33] block">{inc.title}</span>
                        {inc.description && (
                          <span className="text-[11px] text-[#4F5E6E] leading-relaxed block mt-0.5">{inc.description}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions Card */}
              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <div className="bg-[#F4F1EA] rounded-xl p-5 border border-[#0B1F33]/8">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-3">
                    Not Included
                  </span>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((exc, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#4F5E6E]">
                        <X className="w-3 h-3 text-red-400 shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── OTHER PACKAGES ─── */}
        {otherPackages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#0B1F33]/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold block mb-1">
                  Continue Exploring
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#0B1F33] font-normal">
                  Other Curated Escapes
                </h3>
              </div>
              <Link
                to="/packages"
                className="text-xs uppercase tracking-widest font-bold text-[#5A5A40] hover:text-[#0B1F33] transition-colors inline-flex items-center gap-1"
              >
                <span>All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherPackages.slice(0, 3).map((other) => (
                <Link
                  key={other.id}
                  to={`/packages/${other.id}`}
                  className="group relative block rounded-xl overflow-hidden cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E8E1]">
                    <img
                      src={other.coverImage}
                      alt={other.destination}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/20 to-transparent" />

                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase border border-white/20">
                      {other.packageNumber}
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h4 className="font-editorial text-xl sm:text-2xl font-normal mb-1 group-hover:text-[#A3B899] transition-colors">
                        {other.destination}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-white/70 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#A3B899]" />
                          {other.duration}
                        </span>
                      </div>
                      <span className="font-editorial text-lg text-white">{other.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
