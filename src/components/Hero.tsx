import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Mountain, MapPin, Users } from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data/packages';

interface HeroProps {
  onExploreClick: () => void;
  onHaveAPlanClick: () => void;
}

const heroImages = [
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onHaveAPlanClick,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Cycle through background images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Cycling Background Images */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url("${img}")`,
            opacity: currentImage === index ? 1 : 0,
            transform: currentImage === index ? 'scale(1.05)' : 'scale(1)',
            transition: 'opacity 2s ease-in-out, transform 8s ease-out',
          }}
        />
      ))}

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33]/50 via-transparent to-transparent" />

      {/* Animated Grain Texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      {/* Floating Stats Badges - Desktop Only */}
      <div className="hidden lg:block absolute top-32 right-12 z-10">
        <div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-5 py-4 text-white shadow-2xl"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease-out 1.2s',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5A5A40]/30 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-[#A3B899]" />
            </div>
            <div>
              <div className="text-lg font-bold">1,600m – 3,120m</div>
              <div className="text-[10px] uppercase tracking-wider text-white/60">Elevation Range</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-56 right-24 z-10">
        <div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-5 py-4 text-white shadow-2xl"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease-out 1.6s',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5A5A40]/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#A3B899]" />
            </div>
            <div>
              <div className="text-lg font-bold">8–12 Max</div>
              <div className="text-[10px] uppercase tracking-wider text-white/60">Intimate Groups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20 pt-32">
        {/* Eyebrow */}
        <div
          className="mb-6 sm:mb-8"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.3s',
          }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#A3B899] animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] font-semibold uppercase">
              Curated Himalayan Journeys
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          className="font-editorial text-white leading-[0.95] mb-6 sm:mb-8"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease-out 0.5s',
          }}
        >
          <span className="block text-5xl sm:text-7xl lg:text-8xl xl:text-[110px] font-normal tracking-tight">
            Plan the Journey,
          </span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl xl:text-[110px] font-normal italic text-[#A3B899] mt-1">
            Explore the Unknown.
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          className="text-base sm:text-xl text-white/70 max-w-xl mb-10 sm:mb-12 leading-relaxed font-light"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.8s',
          }}
        >
          Handcrafted escapes through misty valleys, ancient cedar forests, and
          snow-kissed mountain passes — designed for small groups and private getaways.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap items-center gap-4 sm:gap-5 mb-12 sm:mb-16"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 1s',
          }}
        >
          <button
            id="hero-explore-packages-btn"
            onClick={onExploreClick}
            className="apple-glass-button-primary apple-glass-shine group rounded-full text-[#0B1F33] px-8 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm font-bold tracking-widest uppercase cursor-pointer flex items-center gap-3"
          >
            <span>Explore Packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-have-a-plan-btn"
            onClick={onHaveAPlanClick}
            className="apple-glass-button apple-glass-shine rounded-full text-white px-8 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm font-bold tracking-widest uppercase cursor-pointer"
          >
            Have a Plan?
          </button>

          <a
            id="hero-whatsapp-direct-btn"
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-glass-button-whatsapp apple-glass-shine flex items-center gap-2 px-6 sm:px-7 py-4 sm:py-5 rounded-full text-white text-xs sm:text-sm font-bold tracking-wider cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white fill-white/20" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Bottom Divider Strip with Location Markers */}
        <div
          className="flex flex-wrap items-center gap-3 sm:gap-6 pt-6 border-t border-white/15"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'all 0.8s ease-out 1.4s',
          }}
        >
          {[
            { label: 'Jibhi & Tirthan', tag: 'From ₹4,999' },
            { label: 'Kashmir Valley', tag: 'Coming Soon' },
            { label: 'Old Manali', tag: 'Coming Soon' },
          ].map((dest, i) => (
            <div key={i} className="apple-glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#A3B899]" />
              <span className="text-xs font-medium">{dest.label}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/90 font-semibold border border-white/10">
                {dest.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Image Progress Indicators */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-10 flex items-center gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`transition-all duration-500 cursor-pointer rounded-full ${
              currentImage === i
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`View image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
