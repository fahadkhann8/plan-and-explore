import React from 'react';
import { Link } from '../router';
import { Compass, ShieldCheck, Heart, Users, Trees, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data/packages';

interface AboutPageProps {
  onOpenCustomPlan: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenCustomPlan }) => {
  const pillars = [
    {
      icon: Compass,
      number: '01',
      title: 'Slow Curation Over Mass Tourism',
      description:
        'We never pack 15 landmarks into one day. Our itineraries leave space for spontaneous trail walks, quiet riverside mornings, and sunset teas that stretch into campfire stories.',
    },
    {
      icon: Users,
      number: '02',
      title: 'Intimate, Thoughtful Circles',
      description:
        'Large bus crowds destroy the quiet solitude of mountain places. We design escapes strictly for small groups (8-12 max) and bespoke private groups of couples or friends.',
    },
    {
      icon: Trees,
      number: '03',
      title: 'Local Mountain Homestays',
      description:
        'Instead of generic concrete hotels, we partner with verified village homestays, wooden timber chalets, and eco-cottages that support indigenous mountain communities directly.',
    },
    {
      icon: ShieldCheck,
      number: '04',
      title: 'Safe, Grounded Logistical Ease',
      description:
        'From dedicated Delhi departures to seasoned hill drivers and local trek leads, every road kilometer is vetted for safety, peace of mind, and smooth transit.',
    },
  ];

  const milestones = [
    {
      year: '2023',
      title: 'The First Banjar Valley Trail',
      description: 'A quiet group of friends escaped the Delhi heat to camp along the Tirthan riverbank and explore secret cedar trails in Jibhi.',
    },
    {
      year: '2024',
      title: 'Curating The Verified Chalet Network',
      description: 'Partnered with family-run wooden homestays in Kullu, Jibhi, and Shoja to guarantee authentic Himachali hospitality for every guest.',
    },
    {
      year: '2025',
      title: 'Expanding Across Himalayan Corridors',
      description: 'Introduced seasonal winter circuits in Manali and Kashmir, retaining our strict ethos of small groups and responsible mountain travel.',
    },
    {
      year: '2026',
      title: 'Plan & Explore Today',
      description: 'A growing community of curious travelers who value genuine discovery, starry nights, and authentic mountain connections.',
    },
  ];

  return (
    <div className="bg-[#FAFAF7] text-[#0B1F33] pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-[#4F5E6E]">
            <li>
              <Link to="/" className="hover:text-[#0B1F33] transition-colors">
                Home
              </Link>
            </li>
            <li>&middot;</li>
            <li className="font-semibold text-[#0B1F33]">About Us</li>
          </ol>
        </nav>

        {/* Hero Headline */}
        <div className="max-w-4xl pb-12 mb-16 border-b border-[#0B1F33]/10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>ABOUT PLAN &amp; EXPLORE</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#0B1F33]">
            Travel should feel like discovery. Not a checklist.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#4F5E6E] font-editorial italic leading-relaxed">
            We started Plan &amp; Explore with a single conviction: rushing through mountain destinations with commercial tour buses leaves you more exhausted than inspired. We curate escapes for travelers who want to take the scenic road and return with a story.
          </p>
        </div>

        {/* Origin Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-[#E8E8E1] border border-[#0B1F33]/10 shadow-lg relative">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85"
                alt="Banjar valley pine forests and river trail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-editorial text-xl sm:text-2xl block">Banjar Valley &amp; Beyond</span>
                <span className="text-white/80 font-editorial italic text-xs sm:text-sm">
                  “Where the paved highway ends, authentic exploration begins.”
                </span>
              </div>
            </div>

            {/* Accent floating quote badge */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 w-full sm:w-64 bg-white p-5 border border-[#0B1F33]/12 shadow-md">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#5A5A40] block mb-1">
                OUR PROMISE
              </span>
              <p className="text-xs text-[#4F5E6E] leading-relaxed">
                Hand-verified chalets, small groups, and honest local prices with zero hidden markups.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#4F5E6E] leading-relaxed font-editorial">
            <h2 className="font-editorial text-2xl sm:text-4xl font-normal text-[#0B1F33] leading-snug">
              Why We Choose The Unhurried Road
            </h2>
            <p>
              In an age of algorithm-driven vacation spots and selfie-stick crowds, the true magic of the Himalayas is easily missed.
            </p>
            <p className="text-[#0B1F33] text-lg sm:text-xl font-normal italic">
              Real mountain travel is sitting by the Tirthan riverbank listening to roaring crystal water beneath ancient deodars. It's hiking up to Raghupur Fort as the fog rolls over Jalori Pass. It's drinking sweet ginger chai in a wooden kitchen while the host tells stories of winter blizzards.
            </p>
            <p>
              Headquartered between <strong>Delhi</strong> and the valleys of <strong>Himachal Pradesh</strong>, our team personally walks every trail, inspects every homestay room, and verifies every transfer. When you travel with Plan &amp; Explore, you travel as our guest.
            </p>
          </div>
        </div>

        {/* The 4 Ethos Pillars */}
        <section className="mb-24 pt-16 border-t border-[#0B1F33]/10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#5A5A40] block mb-2">
              THE FOUR PILLARS
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B1F33]">
              What Defines Every Escape
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="bg-white p-7 rounded-sm border border-[#0B1F33]/10 hover:border-[#5A5A40]/40 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#5A5A40]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#4F5E6E]/40">
                        {pillar.number}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-normal text-[#0B1F33] mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#4F5E6E] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Timeline / Journey */}
        <section className="mb-24 bg-[#0B1F33] text-white p-8 sm:p-14 rounded-sm shadow-xl">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A3B899] block mb-2">
              OUR JOURNEY
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal">
              How Plan &amp; Explore Grew
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m) => (
              <div key={m.year} className="border-t border-white/15 pt-5">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#A3B899] block mb-2">
                  {m.year}
                </span>
                <h4 className="font-editorial text-lg text-white font-normal mb-2">
                  {m.title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Call to Action */}
        <div className="bg-white rounded-sm p-8 sm:p-12 border border-[#0B1F33]/12 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] block mb-1">
              JOIN THE ROAD
            </span>
            <h3 className="font-editorial text-2xl sm:text-4xl font-normal text-[#0B1F33]">
              Ready to leave the city behind?
            </h3>
            <p className="text-xs sm:text-sm text-[#4F5E6E] mt-2 font-editorial italic">
              Browse our upcoming weekend departures or drop our curators a note to customize your private group trip.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xs min-h-[44px]"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={onOpenCustomPlan}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#0B1F33] text-[#0B1F33] hover:bg-[#0B1F33] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] cursor-pointer"
            >
              <span>Have a Plan?</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
