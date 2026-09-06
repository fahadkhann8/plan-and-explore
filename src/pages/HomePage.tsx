import React from 'react';
import { Hero } from '../components/Hero';
import { WhyUs } from '../components/WhyUs';
import { HowItWorks } from '../components/HowItWorks';
import { HaveAPlanSection } from '../components/HaveAPlanSection';
import { EditorialGallery } from '../components/EditorialGallery';
import { ContactSection } from '../components/ContactSection';
import { PACKAGES } from '../data/packages';
import { TravelPackage } from '../types';
import { useRouter, Link } from '../router';
import { ArrowRight, Sparkles, MapPin, Clock } from 'lucide-react';

interface HomePageProps {
  onOpenCustomPlan: () => void;
  onBookPackage: (pkg: TravelPackage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenCustomPlan,
  onBookPackage,
}) => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        onExploreClick={() => navigate('/packages')}
        onHaveAPlanClick={onOpenCustomPlan}
        onSelectFeaturedPackage={() => navigate(`/packages/${PACKAGES[0].id}`)}
        onBookFeaturedPackage={() => onBookPackage(PACKAGES[0])}
      />

      {/* 2. Curated Packages Preview Strip */}
      <section className="py-20 sm:py-28 bg-[#FAFAF7] border-t border-[#0B1F33]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED ITINERARIES</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B1F33] leading-tight">
                Curated Himalayan Escapes
              </h2>
              <p className="mt-2 text-base sm:text-lg text-[#4F5E6E] font-editorial italic max-w-lg">
                Unrushed journeys designed for small groups, friends, and private getaways.
              </p>
            </div>

            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#5A5A40] hover:text-[#4a4a35] transition-colors group cursor-pointer"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Package Preview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.slice(0, 3).map((pkg) => {
              const isComingSoon = pkg.price === 'Coming Soon';

              return (
                <article
                  key={pkg.id}
                  className="group flex flex-col justify-between bg-white border border-[#0B1F33]/8 hover:border-[#0B1F33]/25 transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Clickable Image Header */}
                    <Link
                      to={isComingSoon ? '/packages' : `/packages/${pkg.id}`}
                      className="block relative aspect-[16/11] overflow-hidden bg-[#E8E8E1] cursor-pointer"
                    >
                      <img
                        src={pkg.coverImage}
                        alt={pkg.destination}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 rounded-xs bg-[#5A5A40] text-white text-[10px] font-bold tracking-widest uppercase shadow-xs">
                          {pkg.packageNumber}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <p className="text-xs text-white/90 font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#A3B899]" />
                          <span>{pkg.duration}</span>
                        </p>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <h3 className="font-editorial text-2xl font-normal text-[#0B1F33] group-hover:text-[#5A5A40] transition-colors">
                        <Link to={isComingSoon ? '/packages' : `/packages/${pkg.id}`}>
                          {pkg.destination}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#4F5E6E] mt-2 line-clamp-2 leading-relaxed">
                        {pkg.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Footer Card Row */}
                  <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-[#0B1F33]/5 mt-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-medium">
                        Starting From
                      </span>
                      <span className="font-editorial text-xl sm:text-2xl font-normal text-[#0B1F33]">
                        {pkg.price}
                      </span>
                    </div>

                    <Link
                      to={isComingSoon ? '/packages' : `/packages/${pkg.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3.5 py-2 min-h-[40px] bg-[#5A5A40] hover:bg-[#4a4a35] text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <span>{isComingSoon ? 'Explore' : 'Details'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* View Catalog Banner */}
          <div className="mt-12 text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0B1F33] hover:bg-[#1a334d] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-sm active:scale-98 min-h-[44px]"
            >
              <span>Explore All Travel Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Why Us / Ethos */}
      <WhyUs />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Have a Plan Custom Inquiry */}
      <HaveAPlanSection />

      {/* 6. Editorial Gallery */}
      <EditorialGallery />

      {/* 7. Contact Section */}
      <ContactSection onOpenCustomPlan={onOpenCustomPlan} />
    </div>
  );
};
