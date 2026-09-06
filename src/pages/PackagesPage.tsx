import React, { useState } from 'react';
import { PACKAGES } from '../data/packages';
import { TravelPackage } from '../types';
import { Link, useRouter } from '../router';
import {
  Compass,
  ArrowRight,
  Clock,
  MapPin,
  Mountain,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface PackagesPageProps {
  onBookPackage: (pkg: TravelPackage) => void;
  onOpenCustomPlan: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  onBookPackage,
  onOpenCustomPlan,
}) => {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Himachal Pradesh', 'Kashmir Valley', 'Weekend Trips', 'Upcoming'];

  const filteredPackages = PACKAGES.filter((pkg) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Himachal Pradesh') {
      return pkg.destination.toLowerCase().includes('jibhi') || pkg.destination.toLowerCase().includes('manali') || pkg.destination.toLowerCase().includes('spiti');
    }
    if (activeCategory === 'Kashmir Valley') {
      return pkg.destination.toLowerCase().includes('kashmir');
    }
    if (activeCategory === 'Weekend Trips') {
      return pkg.duration.toLowerCase().includes('weekend') || pkg.duration.includes('3 Days') || pkg.duration.includes('4 Days');
    }
    if (activeCategory === 'Upcoming') {
      return pkg.price === 'Coming Soon';
    }
    return true;
  });

  return (
    <div className="bg-[#FAFAF7] text-[#0B1F33] pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-[#4F5E6E]">
            <li>
              <Link to="/" className="hover:text-[#0B1F33] transition-colors">
                Home
              </Link>
            </li>
            <li>&middot;</li>
            <li className="font-semibold text-[#0B1F33]">Packages</li>
          </ol>
        </nav>

        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-[#0B1F33]/10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>HANDPICKED ESCAPES</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#0B1F33] tracking-tight">
              Curated Travel Packages
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#4F5E6E] font-editorial italic max-w-xl">
              Slow travel journeys across pristine Himalayan corridors. Verified mountain stays, scenic drives, and curated trails.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 min-h-[40px] rounded-xs text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0B1F33] text-white shadow-xs'
                    : 'bg-white text-[#4F5E6E] hover:text-[#0B1F33] border border-[#0B1F33]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredPackages.map((pkg) => {
            const isComingSoon = pkg.price === 'Coming Soon';

            return (
              <article
                key={pkg.id}
                id={`package-catalog-${pkg.id}`}
                className="group bg-white rounded-sm border border-[#0B1F33]/10 hover:border-[#5A5A40]/40 transition-all duration-300 shadow-xs hover:shadow-lg overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Visual Header */}
                  <Link
                    to={isComingSoon ? '/packages' : `/packages/${pkg.id}`}
                    className="block relative aspect-[16/9] overflow-hidden bg-[#0B1F33] cursor-pointer"
                  >
                    <img
                      src={pkg.coverImage}
                      alt={pkg.destination}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/90 via-[#0B1F33]/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-xs bg-white text-[#0B1F33] text-[10px] font-bold tracking-widest uppercase shadow-xs">
                        {pkg.packageNumber}
                      </span>

                      {pkg.frequency && (
                        <span className="px-2.5 py-1 rounded-xs bg-black/40 backdrop-blur-xs text-white text-[10px] font-medium border border-white/20">
                          {pkg.frequency}
                        </span>
                      )}
                    </div>

                    {/* Destination Banner */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="font-editorial text-2xl sm:text-3xl font-normal leading-tight">
                        {pkg.destination}
                      </h2>
                      <p className="text-xs text-white/80 mt-1 line-clamp-1 font-editorial italic">
                        {pkg.subtitle}
                      </p>
                    </div>
                  </Link>

                  {/* Specification Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3.5 bg-[#F4F1EA]/80 border-b border-[#0B1F33]/8 text-xs text-[#0B1F33]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                      <span className="truncate">{pkg.duration}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                      <span className="truncate">Delhi Majnu Ka Tilla</span>
                    </div>

                    {pkg.elevation && (
                      <div className="flex items-center gap-1.5">
                        <Mountain className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                        <span className="truncate">{pkg.elevation}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                      <span className="truncate">Small Groups</span>
                    </div>
                  </div>

                  {/* Description & Inclusions */}
                  <div className="p-5 sm:p-6">
                    <p className="text-xs sm:text-sm text-[#4F5E6E] leading-relaxed line-clamp-3">
                      {pkg.shortDescription}
                    </p>

                    {/* Quick Inclusions Preview */}
                    <div className="mt-4 pt-4 border-t border-[#0B1F33]/8">
                      <span className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-2">
                        Included In This Package:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {pkg.inclusions.slice(0, 4).map((inc, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[11px] bg-[#FAFAF7] border border-[#0B1F33]/10 px-2 py-1 rounded-xs text-[#0B1F33]"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{inc.title}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 sm:p-6 bg-[#FAFAF7] border-t border-[#0B1F33]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-medium">
                      Per Person Cost
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33]">
                        {pkg.price}
                      </span>
                      {pkg.priceNote && (
                        <span className="text-[10px] text-[#4F5E6E]">({pkg.priceNote})</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {!isComingSoon && (
                      <button
                        type="button"
                        onClick={() => onBookPackage(pkg)}
                        className="px-4 py-2.5 min-h-[44px] bg-white hover:bg-[#F4F1EA] text-[#0B1F33] border border-[#0B1F33]/20 text-xs font-bold uppercase tracking-wider transition-all shadow-2xs active:scale-95 cursor-pointer flex items-center justify-center"
                      >
                        Reserve
                      </button>
                    )}

                    <Link
                      to={isComingSoon ? '/packages' : `/packages/${pkg.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[44px] bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xs active:scale-95 cursor-pointer flex-1 sm:flex-initial"
                    >
                      <span>{isComingSoon ? 'Coming Soon' : 'View Itinerary'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Custom Itinerary Banner */}
        <div className="mt-16 bg-[#0B1F33] text-white rounded-sm p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A3B899] block mb-2">
              BESPOKE EXPEDITIONS
            </span>
            <h3 className="font-editorial text-2xl sm:text-4xl font-normal leading-snug">
              Have a specific Himalayan route in mind?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 mt-2 font-editorial italic">
              Whether it’s Spiti Valley, a private cottage in Jibhi, or a customized Kashmir honeymoon, we curate private routes with personalized transport and stays.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCustomPlan}
            className="px-6 py-4 min-h-[48px] bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Request Custom Itinerary &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
