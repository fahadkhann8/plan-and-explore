import React, { useState, useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { EditorialGallery } from '../components/EditorialGallery';
import { ContactSection } from '../components/ContactSection';
import { PACKAGES, GALLERY_PHOTOS, WHATSAPP_BASE_URL } from '../data/packages';
import { TravelPackage } from '../types';
import { useRouter, Link } from '../router';
import {
  ArrowRight,
  MapPin,
  Clock,
  Mountain,
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  onOpenCustomPlan: () => void;
  onBookPackage: (pkg: TravelPackage) => void;
}

/* ────────────────────────────────────────────
   Scroll-reveal hook – fades in when visible
   ──────────────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenCustomPlan,
  onBookPackage,
}) => {
  const { navigate } = useRouter();
  const packagesReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <div className="space-y-0">
      {/* ─── 1. CINEMATIC HERO ─── */}
      <Hero
        onExploreClick={() => navigate('/packages')}
        onHaveAPlanClick={onOpenCustomPlan}
      />

      {/* ─── 2. FEATURED DESTINATIONS — Image-Forward Cards ─── */}
      <section className="relative py-20 sm:py-28 bg-[#FAFAF7] overflow-hidden">
        {/* Decorative floating circle */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#5A5A40]/[0.04] pointer-events-none" />

        <div
          ref={packagesReveal.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
          style={{
            opacity: packagesReveal.isVisible ? 1 : 0,
            transform: packagesReveal.isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          {/* Section Header — compact */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Journeys</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B1F33] leading-tight">
                Where Will You Go?
              </h2>
            </div>

            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#5A5A40] hover:text-[#0B1F33] transition-colors group cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Cards — dramatic imagery with minimal text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {PACKAGES.map((pkg, index) => {
              const isComingSoon = pkg.price === 'Coming Soon';

              return (
                <Link
                  key={pkg.id}
                  to={`/packages/${pkg.id}`}
                  className="group relative block rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    opacity: packagesReveal.isVisible ? 1 : 0,
                    transform: packagesReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s ease-out ${0.15 * (index + 1)}s`,
                  }}
                >
                  {/* Large Image */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#E8E8E1]">
                    <img
                      src={pkg.coverImage}
                      alt={pkg.destination}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/90 via-[#0B1F33]/20 to-transparent" />

                    {/* Hover glow ring */}
                    <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-white/30 ring-inset transition-all duration-300" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase border border-white/20 shadow-lg">
                        {pkg.packageNumber}
                      </span>
                      {isComingSoon && (
                        <span className="px-3 py-1.5 rounded-full bg-[#5A5A40]/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Content at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                      <h3 className="font-editorial text-2xl sm:text-3xl font-normal leading-tight mb-2 group-hover:text-[#A3B899] transition-colors">
                        {pkg.destination}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
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
                      </div>

                      {/* Price strip */}
                      <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-white/50 block">Starting from</span>
                          <span className="font-editorial text-xl font-normal text-white">{pkg.price}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/25 transition-colors">
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. HOW IT WORKS — Visual Timeline ─── */}
      <section className="relative py-20 sm:py-28 bg-[#0B1F33] text-white overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#5A5A40]/10 blur-[120px] pointer-events-none" />

        <div
          ref={processReveal.ref}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
        >
          {/* Header */}
          <div
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
            style={{
              opacity: processReveal.isVisible ? 1 : 0,
              transform: processReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A3B899] mb-3 block">
              Seamless Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal leading-tight">
              Three Steps to the Mountains
            </h2>
          </div>

          {/* Steps — visual cards with icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Journey',
                desc: 'Browse our curated mountain packages and pick the escape that calls to you.',
                icon: <MapPin className="w-6 h-6" />,
                gradient: 'from-[#5A5A40]/20 to-[#5A5A40]/5',
              },
              {
                step: '02',
                title: 'Make It Yours',
                desc: 'Tell us your dates, group size, and preferences — directly on WhatsApp.',
                icon: <MessageCircle className="w-6 h-6" />,
                gradient: 'from-[#A3B899]/20 to-[#A3B899]/5',
              },
              {
                step: '03',
                title: 'Go Explore',
                desc: 'We handle routes, stays, and logistics. You pack light and enjoy the road.',
                icon: <Mountain className="w-6 h-6" />,
                gradient: 'from-[#5A5A40]/20 to-[#5A5A40]/5',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 sm:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                style={{
                  opacity: processReveal.isVisible ? 1 : 0,
                  transform: processReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${0.2 * (index + 1)}s`,
                }}
              >
                {/* Decorative gradient */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-editorial text-4xl sm:text-5xl font-light text-[#A3B899]/60">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#5A5A40]/20 border border-[#5A5A40]/30 flex items-center justify-center text-[#A3B899] group-hover:bg-[#5A5A40]/40 transition-colors">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="font-editorial text-2xl font-normal mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. VISUAL PROOF STRIP — Cinematic Gallery Teaser ─── */}
      <section className="relative py-20 sm:py-28 bg-[#FAFAF7] overflow-hidden">
        <div
          ref={galleryReveal.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
        >
          {/* Horizontal scrolling gallery preview */}
          <div
            className="mb-10"
            style={{
              opacity: galleryReveal.isVisible ? 1 : 0,
              transform: galleryReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-2 block">
              Moments Along the Road
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B1F33]">
              Quiet Mountain Days
            </h2>
          </div>

          {/* Horizontal Scroll Strip */}
          <div
            className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
            style={{
              opacity: galleryReveal.isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease-out 0.3s',
            }}
          >
            {GALLERY_PHOTOS.slice(0, 6).map((photo, i) => (
              <div
                key={photo.id}
                className="group relative shrink-0 w-[280px] sm:w-[320px] aspect-[4/5] rounded-xl overflow-hidden bg-[#E8E8E1] cursor-pointer"
                onClick={() => {
                  const galleryEl = document.getElementById('gallery');
                  if (galleryEl) {
                    galleryEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-[#A3B899] font-bold block mb-0.5">
                    {photo.tag}
                  </span>
                  <h4 className="font-editorial text-lg">{photo.title}</h4>
                  <p className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {photo.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. EDITORIAL GALLERY ─── */}
      <EditorialGallery />

      {/* ─── 6. FULL-BLEED CTA BANNER ─── */}
      <section
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-[#0B1F33]/80 backdrop-blur-[2px]" />

        <div
          ref={ctaReveal.ref}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center"
          style={{
            opacity: ctaReveal.isVisible ? 1 : 0,
            transform: ctaReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A3B899] mb-4 block">
            Ready to Wander?
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight mb-6">
            Your Next Mountain Story
            <br />
            <span className="italic text-[#A3B899]">Starts Here.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10 font-light">
            Whether it's a weekend escape to the valley or a week-long Himalayan odyssey —
            we'll help you plan it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/packages"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#0B1F33] text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#A3B899] transition-all duration-300 shadow-xl active:scale-95"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white/30 text-white text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/60 transition-all duration-300 active:scale-95 backdrop-blur-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chat With Us</span>
            </a>
          </div>

          {/* Trust icons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#A3B899]" />
              Verified Mountain Stays
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#A3B899]" />
              Small Group Escapes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#A3B899]" />
              Direct WhatsApp Line
            </span>
          </div>
        </div>
      </section>

      {/* ─── 7. CONTACT SECTION ─── */}
      <ContactSection onOpenCustomPlan={onOpenCustomPlan} />
    </div>
  );
};
