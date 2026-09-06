import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { TravelPackage } from '../types';

interface ExplorePackagesProps {
  packages: TravelPackage[];
  onSelectPackage: (pkg: TravelPackage) => void;
  onBookPackage?: (pkg: TravelPackage) => void;
  onNotifyPackage?: (pkg: TravelPackage) => void;
}

export const ExplorePackages: React.FC<ExplorePackagesProps> = ({
  packages,
  onSelectPackage,
  onNotifyPackage,
}) => {
  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#FAFAF7] border-t border-[#0B1F33]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-3 block">
              CURATED ESCAPES
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1F33] leading-tight">
              Explore Packages
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#4F5E6E] font-editorial italic max-w-xl">
              Pick a destination. We'll take care of the journey.
            </p>
          </div>

          <div className="text-xs text-[#4F5E6E] max-w-xs md:text-right hidden sm:block font-sans">
            <span className="font-medium text-[#0B1F33]">Weekly departures &amp; custom dates.</span>
            <br />
            Transport, mountain chalets, meals and itinerary included.
          </div>
        </div>

        {/* Editorial Destination Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {packages.map((pkg) => {
            const isComingSoon = pkg.price === 'Coming Soon';

            return (
              <article
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className="group flex flex-col justify-between bg-white border border-[#0B1F33]/8 hover:border-[#0B1F33]/20 transition-all duration-300 shadow-xs hover:shadow-md"
              >
                {/* Hero Image & Essential Destination Info */}
                <div>
                  {/* Clean Photography Frame */}
                  <div
                    onClick={() => onSelectPackage(pkg)}
                    className="relative aspect-[16/11] overflow-hidden bg-[#E8E8E1] cursor-pointer"
                  >
                    <img
                      src={pkg.coverImage}
                      alt={pkg.destination}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Subtle gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    {/* Package Number / Status Tag */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-[10px] font-semibold tracking-widest text-[#0B1F33] uppercase">
                        {pkg.packageNumber}
                      </span>

                      {isComingSoon && (
                        <span className="px-2.5 py-1 bg-[#0B1F33]/85 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-medium">
                          Opening Soon
                        </span>
                      )}
                    </div>

                    {/* Image bottom destination tag */}
                    <div className="absolute bottom-3.5 left-4 text-white text-xs font-medium">
                      <span>{pkg.departureFrom}</span>
                    </div>
                  </div>

                  {/* Card Editorial Body */}
                  <div className="p-6 sm:p-7">
                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-xs text-[#4F5E6E] mb-2 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>{pkg.duration}</span>
                      <span className="text-[#0B1F33]/20 mx-1">&middot;</span>
                      <span>{pkg.frequency}</span>
                    </div>

                    {/* Destination Title */}
                    <h3
                      onClick={() => onSelectPackage(pkg)}
                      className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33] cursor-pointer group-hover:text-[#5A5A40] transition-colors leading-snug"
                    >
                      {pkg.destination}
                    </h3>

                    {/* Concise 1-2 sentence description */}
                    <p className="mt-2.5 text-xs sm:text-sm text-[#4F5E6E] line-clamp-2 leading-relaxed font-editorial italic">
                      {pkg.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price/Status & Single Clear CTA */}
                <div className="px-6 pb-6 pt-2 sm:px-7 sm:pb-7">
                  <div className="pt-4 border-t border-[#0B1F33]/8 flex items-end justify-between gap-4">
                    {/* Price / Status Information */}
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-medium">
                        {isComingSoon ? 'Status' : 'Starting From'}
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-editorial text-2xl sm:text-3xl font-normal tracking-tight text-[#0B1F33]">
                          {pkg.price}
                        </span>
                        {!isComingSoon && (
                          <span className="text-xs text-[#4F5E6E]">/ person</span>
                        )}
                      </div>
                    </div>

                    {/* Single Clear Action */}
                    {isComingSoon ? (
                      <button
                        id={`notify-package-${pkg.id}-btn`}
                        onClick={() => {
                          if (onNotifyPackage) {
                            onNotifyPackage(pkg);
                          } else {
                            onSelectPackage(pkg);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B1F33] bg-[#F4F1EA] hover:bg-[#E8E8E1] border border-[#0B1F33]/15 transition-all cursor-pointer active:scale-95"
                      >
                        <span>Get Notified</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#5A5A40]" />
                      </button>
                    ) : (
                      <button
                        id={`explore-package-${pkg.id}-btn`}
                        onClick={() => onSelectPackage(pkg)}
                        className="group/btn inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#5A5A40] hover:bg-[#4a4a35] transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <span>View Package</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
