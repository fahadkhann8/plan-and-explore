import React, { useState, useEffect, useRef } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);

  const categories = ['All', 'Himachal Pradesh', 'Kashmir Valley', 'Rajasthan', 'Weekend Trips', 'Upcoming'];

  const filteredPackages = PACKAGES.filter((pkg) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Himachal Pradesh') {
      return (
        pkg.destination.toLowerCase().includes('jibhi') ||
        pkg.destination.toLowerCase().includes('manali') ||
        pkg.destination.toLowerCase().includes('spiti') ||
        pkg.destination.toLowerCase().includes('mcleodganj') ||
        pkg.destination.toLowerCase().includes('triund')
      );
    }
    if (activeCategory === 'Kashmir Valley') {
      return pkg.destination.toLowerCase().includes('kashmir');
    }
    if (activeCategory === 'Weekend Trips') {
      return pkg.duration.toLowerCase().includes('weekend') || pkg.duration.includes('3 Days') || pkg.duration.includes('4 Days');
    }
    if (activeCategory === 'Rajasthan') {
      return pkg.destination.toLowerCase().includes('udaipur') || pkg.destination.toLowerCase().includes('jaipur') || pkg.destination.toLowerCase().includes('rajasthan');
    }
    if (activeCategory === 'Upcoming') {
      return pkg.price === 'Coming Soon';
    }
    return true;
  });

  return (
    <div className="bg-[#FAFAF7] text-[#0B1F33]">
      {/* ─── VISUAL HEADER ─── */}
      <section
        className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33]/85 via-[#0B1F33]/70 to-[#0B1F33]/90" />

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.2s',
          }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-white/60">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>·</li>
              <li className="font-semibold text-white">Packages</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A3B899] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Handpicked Escapes</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.05]">
            Curated Travel
            <br />
            <span className="italic text-[#A3B899]">Packages</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/70 max-w-xl font-light">
            Slow travel journeys across pristine Himalayan corridors. Verified stays, scenic drives, and curated trails.
          </p>
        </div>
      </section>

      {/* ─── FILTERS + GRID ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-10 pb-24">
        {/* Category Filter Pills — Apple Segmented Glass */}
        <div className="flex flex-wrap items-center gap-2 mb-10" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 min-h-[42px] rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'apple-glass-button-primary bg-[#0B1F33] text-white shadow-lg'
                  : 'apple-glass-button bg-white/70 text-[#4F5E6E] hover:text-[#0B1F33] border border-[#0B1F33]/10 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Package Cards Grid — Image-forward with Apple Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filteredPackages.map((pkg, index) => {
            const isComingSoon = pkg.price === 'Coming Soon';

            return (
              <div
                key={pkg.id}
                className="group relative block rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${0.1 * (index + 1)}s`,
                }}
                onClick={() => navigate(`/packages/${pkg.id}`)}
              >
                {/* Tall Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E8E1]">
                  <img
                    src={pkg.coverImage}
                    alt={pkg.destination}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-[1200ms] ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/92 via-[#0B1F33]/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="apple-glass-pill px-3 py-1.5 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
                      {pkg.packageNumber}
                    </span>
                    {isComingSoon && (
                      <span className="apple-glass-pill px-3 py-1.5 rounded-full bg-[#5A5A40]/80 text-white text-[10px] font-bold tracking-wider uppercase">
                        Coming Soon
                      </span>
                    )}
                    {pkg.frequency && !isComingSoon && (
                      <span className="apple-glass-pill px-2.5 py-1 rounded-full text-white/90 text-[10px] font-medium">
                        <Calendar className="w-3 h-3 inline mr-0.5" />
                        {pkg.frequency}
                      </span>
                    )}
                  </div>

                  {/* Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                    <h2 className="font-editorial text-2xl sm:text-3xl font-normal leading-tight mb-1 group-hover:text-[#A3B899] transition-colors">
                      {pkg.destination}
                    </h2>
                    <p className="text-xs text-white/70 line-clamp-1 mb-3 font-light">
                      {pkg.subtitle}
                    </p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/75 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#A3B899]" />
                        {pkg.duration}
                      </span>
                      {pkg.elevation && (
                        <span className="flex items-center gap-1">
                          <Mountain className="w-3.5 h-3.5 text-[#A3B899]" />
                          {pkg.elevation}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#A3B899]" />
                        Small Groups
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-white/15">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/60 block font-light">Starting from</span>
                        <span className="font-editorial text-xl text-white">{pkg.price}</span>
                      </div>
                      <div className="apple-glass-button w-10 h-10 rounded-full flex items-center justify-center text-white">
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Itinerary Banner */}
        <div
          className="mt-16 relative rounded-2xl overflow-hidden"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#0B1F33]/80 backdrop-blur-[2px]" />
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A3B899] block mb-2">
                Bespoke Expeditions
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl font-normal leading-snug text-white">
                Have a specific Himalayan
                <br />
                <span className="italic text-[#A3B899]">route in mind?</span>
              </h3>
              <p className="text-sm text-white/60 mt-3 font-light max-w-md">
                Whether it's Spiti Valley, a private cottage in Jibhi, or a customized Kashmir honeymoon — we curate private routes with personalized transport and stays.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenCustomPlan}
              className="apple-glass-button-primary apple-glass-shine rounded-full group px-8 py-5 text-xs font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap flex items-center gap-3 shadow-xl"
            >
              <span>Request Custom Itinerary</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
