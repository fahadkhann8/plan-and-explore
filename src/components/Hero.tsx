import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data/packages';

interface HeroProps {
  onExploreClick: () => void;
  onHaveAPlanClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onHaveAPlanClick,
}) => {

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 bg-[#FAFAF7] text-[#0B1F33] overflow-hidden"
    >
      {/* Main Editorial Grid Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pr-6 z-10">
            {/* Metadata Eyebrow */}
            <div className="mb-4 text-[10px] tracking-[0.3em] font-semibold text-[#5A5A40] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]" />
              <span>Curated Journeys &middot; India</span>
            </div>

            {/* Display Editorial Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-[76px] leading-[1.05] font-normal mb-6 sm:mb-8 font-editorial tracking-tight text-[#0B1F33]"
            >
              Plan the Journey,
              <br />
              <span className="text-[#5A5A40] italic font-normal">Explore the Unknown.</span>
            </h1>

            {/* Editorial Narrative */}
            <p className="text-base sm:text-lg leading-relaxed text-[#4F5E6E] mb-8 sm:mb-10 max-w-md font-editorial italic">
              Curated escapes, unforgettable routes, and journeys designed for people who want to
              experience more than just a destination.
            </p>

            {/* Editorial Actions */}
            <div className="flex flex-wrap items-center gap-6">
              <button
                id="hero-explore-packages-btn"
                onClick={onExploreClick}
                className="bg-[#5A5A40] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#4a4a35] transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Explore Packages
              </button>

              <button
                id="hero-have-a-plan-btn"
                onClick={onHaveAPlanClick}
                className="text-xs font-bold tracking-widest uppercase border-b-2 border-[#0B1F33] pb-1 hover:opacity-75 transition-all text-[#0B1F33] cursor-pointer"
              >
                Have a Plan?
              </button>
            </div>

            {/* Editorial Trust Badges */}
            <div className="mt-10 pt-6 border-t border-[#0B1F33]/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#4F5E6E]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>Verified Mountain Stays</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#5A5A40]" />
                <span>Small Group Escapes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#5A5A40]" />
                <span>Direct WhatsApp Line</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] lg:h-[580px] w-full">
            <div className="w-full h-full bg-[#E8E8E1] overflow-hidden rounded-sm relative shadow-2xl border border-[#0B1F33]/5">
              {/* Himalayan Landscape Imagery */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop")`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(11,31,51,0.5) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Editorial Photography Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-3 sm:left-6 bg-[#0B1F33]/85 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-3.5 border border-white/15 text-white shadow-xl max-w-xs sm:max-w-sm rounded-xs">
                <div className="text-[9px] tracking-[0.25em] font-bold text-[#A3B899] uppercase mb-1">
                  HIMALAYAN SANCTUARY
                </div>
                <div className="font-editorial text-lg sm:text-2xl font-normal text-white leading-tight">
                  The Great Himalayan Trails
                </div>
                <p className="text-xs text-white/75 font-sans mt-1">
                  Untouched cedar forests, rushing rivers &amp; high mountain passes.
                </p>
              </div>
            </div>

            {/* Floating Vertical Meta Element */}
            <div className="hidden xl:flex absolute top-12 -right-8 flex-col items-center gap-4 py-8 border-r border-[#0B1F33]/10 h-64 justify-center pointer-events-none">
              <div className="vertical-text transform rotate-180 text-[9px] tracking-[0.4em] font-bold uppercase opacity-35 whitespace-nowrap text-[#0B1F33]">
                Plan the Journey &bull; Explore the Unknown
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Interface Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 pt-6 border-t border-[#0B1F33]/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <a
              id="hero-whatsapp-direct-btn"
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all border border-[#25D366]/30 text-xs font-semibold text-[#0B1F33]"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#5A5A40] mb-0.5">
                Headquarters
              </span>
              <span className="text-xs font-semibold text-[#0B1F33]">Delhi, India</span>
            </div>
          </div>

          {/* Scroll to Explore indicator */}
          <button
            onClick={onExploreClick}
            className="flex items-center gap-4 group cursor-pointer text-[#0B1F33] hover:text-[#5A5A40] transition-colors"
            aria-label="Scroll to Explore"
          >
            <div className="w-12 h-[1px] bg-[#0B1F33]/20 group-hover:bg-[#5A5A40] transition-colors" />
            <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to Explore</div>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>

          <div className="text-[9px] uppercase tracking-widest font-medium opacity-40 text-[#0B1F33] text-center sm:text-right">
            &copy; 2026 Plan & Explore. Travel should feel like discovery.
          </div>
        </div>
      </div>
    </section>
  );
};
