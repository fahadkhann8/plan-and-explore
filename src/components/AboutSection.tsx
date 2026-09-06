import React from 'react';
import { Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FAFAF7] border-t border-[#0B1F33]/8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Imagery Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-lg border border-[#0B1F33]/8 bg-[#E8E8E1]">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
                alt="Pine Forests and mountain river stream in the Himalayas"
                className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="font-editorial text-xl block font-normal">Banjar &amp; Kullu Corridors</span>
                <span className="text-white/80 font-editorial italic text-sm">Where the road ends, true exploration begins.</span>
              </div>
            </div>

            {/* Accent card: inline on mobile, overlapping on sm+ screens */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 w-full sm:w-64 bg-white p-4 sm:p-5 border border-[#0B1F33]/10 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4 text-[#5A5A40]" />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0B1F33]">
                  Boutique Ethos
                </span>
              </div>
              <p className="text-xs text-[#4F5E6E] leading-relaxed">
                Slow travel curated by mountain locals, seasoned trek leads, and independent wanderers.
              </p>
            </div>
          </div>

          {/* Right Column: Brand Manifesto */}
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-4 block">
              ABOUT PLAN &amp; EXPLORE
            </span>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1F33] leading-[1.08] mb-8">
              Travel should feel like discovery.
            </h2>

            {/* Manifesto Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[#4F5E6E] leading-relaxed font-editorial">
              <p>
                Plan &amp; Explore was born out of a simple frustration: rushing through destinations
                with checklist tours leaves you more exhausted than inspired.
              </p>
              <p className="text-[#0B1F33] font-normal text-xl sm:text-2xl italic">
                It's about taking the scenic road. Finding places worth remembering.
              </p>
              <p>
                Meeting village elders, listening to river waters beneath towering deodars, sharing meals
                around mountain bonfires, and watching the valley wake up in morning mist.
              </p>
              <p className="text-[#5A5A40] font-semibold text-lg sm:text-xl">
                And coming back with a story.
              </p>
            </div>

            {/* Brand Philosophy Pillars */}
            <div className="mt-12 pt-8 border-t border-[#0B1F33]/10 grid grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] text-[#5A5A40] uppercase tracking-widest font-bold block mb-1">
                  Curation
                </span>
                <p className="text-sm font-editorial text-[#0B1F33] italic">
                  Hand-verified homestays, secret ridge paths, and unrushed itineraries.
                </p>
              </div>
              <div>
                <span className="text-[10px] text-[#5A5A40] uppercase tracking-widest font-bold block mb-1">
                  Intimacy
                </span>
                <p className="text-sm font-editorial text-[#0B1F33] italic">
                  Small, like-minded groups and private journeys with dedicated hosts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
