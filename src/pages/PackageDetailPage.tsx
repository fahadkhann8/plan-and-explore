import React, { useState } from 'react';
import { PACKAGES, WHATSAPP_RAW_NUMBER } from '../data/packages';
import { TravelPackage } from '../types';
import { Link, useRouter } from '../router';
import { RouteVisualizer } from '../components/RouteVisualizer';
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
    <div className="bg-[#FAFAF7] text-[#0B1F33] pt-24 sm:pt-28 pb-24">
      {/* Sticky Top Action Strip */}
      <div className="sticky top-16 z-20 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#0B1F33]/10 py-2.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/packages"
            className="group inline-flex items-center gap-1.5 min-h-[40px] text-xs uppercase tracking-wider font-semibold text-[#0B1F33] hover:text-[#5A5A40] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>All Packages</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 min-h-[40px] text-[#4F5E6E] hover:text-[#0B1F33] rounded-sm hover:bg-[#E8E8E1] transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Share journey"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? 'Copied Link' : 'Share'}</span>
            </button>

            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] border border-[#0B1F33]/20 hover:border-[#0B1F33] text-[#0B1F33] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onBookPackage(pkg)}
              className="px-5 py-2 min-h-[40px] bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all shadow-xs active:scale-95 cursor-pointer flex items-center justify-center"
            >
              Reserve Spot ({pkg.price})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs text-[#4F5E6E]">
            <li>
              <Link to="/" className="hover:text-[#0B1F33] transition-colors">
                Home
              </Link>
            </li>
            <li>&middot;</li>
            <li>
              <Link to="/packages" className="hover:text-[#0B1F33] transition-colors">
                Packages
              </Link>
            </li>
            <li>&middot;</li>
            <li className="font-semibold text-[#0B1F33] truncate max-w-[200px] sm:max-w-none">
              {pkg.destination}
            </li>
          </ol>
        </nav>

        {/* Hero Banner Card */}
        <div className="relative rounded-sm overflow-hidden bg-[#0B1F33] text-white mb-8 border border-[#0B1F33]/15 shadow-xl">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[420px] w-full">
            <img
              src={pkg.coverImage}
              alt={pkg.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/45 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-xs bg-white text-[#0B1F33] text-[10px] font-bold tracking-widest uppercase">
                    {pkg.packageNumber}
                  </span>
                  {pkg.frequency && (
                    <span className="px-2.5 py-0.5 rounded-xs bg-black/40 backdrop-blur-xs text-white text-[10px] font-medium border border-white/20">
                      {pkg.frequency}
                    </span>
                  )}
                </div>

                <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                  {pkg.destination}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl font-editorial italic">
                  {pkg.subtitle}
                </p>
              </div>

              <div className="shrink-0 text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/60 block font-semibold">
                  Starting Per Person
                </span>
                <div className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                  {pkg.price}
                </div>
                {pkg.priceNote && (
                  <span className="text-[10px] text-white/60 mt-0.5 block">{pkg.priceNote}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#0B1F33] border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A3B899] shrink-0" />
              <div>
                <span className="text-white/50 text-[10px] uppercase block">Duration</span>
                <span className="text-white font-medium">{pkg.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A3B899] shrink-0" />
              <div>
                <span className="text-white/50 text-[10px] uppercase block">Departure</span>
                <span className="text-white font-medium truncate">{pkg.departureFrom}</span>
              </div>
            </div>

            {pkg.elevation && (
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#A3B899] shrink-0" />
                <div>
                  <span className="text-white/50 text-[10px] uppercase block">Elevation</span>
                  <span className="text-white font-medium">{pkg.elevation}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#A3B899] shrink-0" />
              <div>
                <span className="text-white/50 text-[10px] uppercase block">Group Size</span>
                <span className="text-white font-medium">{pkg.groupSize || 'Curated Small Groups'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="bg-white rounded-sm p-6 sm:p-8 border border-[#0B1F33]/10 shadow-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] block mb-2">
                THE EXPEDITION
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33] mb-4">
                Journey Overview
              </h2>
              <p className="text-sm sm:text-base text-[#4F5E6E] leading-relaxed whitespace-pre-line font-editorial">
                {pkg.overview}
              </p>

              {/* Route Waypoints Visualizer */}
              {pkg.routeWaypoints && pkg.routeWaypoints.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#0B1F33]/8">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-3">
                    Journey Circuit &amp; Key Waypoints:
                  </span>
                  <RouteVisualizer waypoints={pkg.routeWaypoints} />
                </div>
              )}
            </section>

            {/* Complete Day-by-Day Itinerary */}
            <PackageItinerary pkg={pkg} />

            {/* Photo Gallery for this Package */}
            {pkg.galleryImages && pkg.galleryImages.length > 0 && (
              <section className="bg-white rounded-sm p-6 sm:p-8 border border-[#0B1F33]/10 shadow-xs">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] block mb-2">
                  PHOTOGRAPHY
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33] mb-6">
                  Moments from {pkg.destination}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-xs overflow-hidden bg-[#E8E8E1] border border-[#0B1F33]/10 shadow-2xs"
                    >
                      <img
                        src={img}
                        alt={`${pkg.destination} gallery photo ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Booking Action Card */}
            <div className="sticky top-28 bg-white rounded-sm p-6 border border-[#0B1F33]/12 shadow-md space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold block mb-1">
                  RESERVE YOUR JOURNEY
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-editorial text-3xl font-normal text-[#0B1F33]">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-[#4F5E6E]">/ person</span>
                </div>
                <p className="text-xs text-[#4F5E6E] mt-1">
                  {pkg.priceNote || 'Starting price per person'}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onBookPackage(pkg)}
                  className="w-full py-3.5 px-4 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all shadow-xs active:scale-98 min-h-[44px] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Reserve Spot Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-[#0B1F33]/20 hover:border-[#0B1F33] text-[#0B1F33] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors hover:bg-[#F4F1EA] min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="pt-3 border-t border-[#0B1F33]/10 space-y-2 text-[11px] text-[#4F5E6E]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No advance payment required to inquire</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#5A5A40] shrink-0" />
                  <span>Curated by local Himalayan hosts</span>
                </div>
              </div>

              {/* Inclusions Breakdown */}
              <div className="pt-4 border-t border-[#0B1F33]/10">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-3">
                  Package Inclusions:
                </span>
                <ul className="space-y-2">
                  {pkg.inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#0B1F33]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold">{inc.title}</strong>
                        {inc.description && (
                          <p className="text-[11px] text-[#4F5E6E] mt-0.5">{inc.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <div className="pt-4 border-t border-[#0B1F33]/10">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-2">
                    Exclusions:
                  </span>
                  <ul className="space-y-1.5">
                    {pkg.exclusions.map((exc, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-[#4F5E6E]">
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

        {/* Other Curated Escapes Recommendation */}
        {otherPackages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#0B1F33]/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold block mb-1">
                  CONTINUE EXPLORING
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#0B1F33] font-normal">
                  Other Himalayan Escapes
                </h3>
              </div>
              <Link
                to="/packages"
                className="text-xs uppercase tracking-widest font-bold text-[#5A5A40] hover:text-[#4a4a35] transition-colors inline-flex items-center gap-1"
              >
                <span>All Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPackages.slice(0, 3).map((other) => (
                <Link
                  key={other.id}
                  to={`/packages/${other.id}`}
                  className="group bg-white rounded-sm border border-[#0B1F33]/10 overflow-hidden shadow-2xs hover:shadow-md transition-all block"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#E8E8E1] relative">
                    <img
                      src={other.coverImage}
                      alt={other.destination}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-xs text-white font-medium">
                      {other.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#5A5A40]">
                      {other.packageNumber}
                    </span>
                    <h4 className="font-editorial text-lg text-[#0B1F33] mt-0.5 group-hover:text-[#5A5A40] transition-colors">
                      {other.destination}
                    </h4>
                    <span className="text-xs font-semibold text-[#0B1F33] block mt-2">
                      Starting at {other.price}
                    </span>
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
