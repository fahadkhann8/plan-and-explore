import React, { useState } from 'react';
import { MessageCircle, Sparkles, Check } from 'lucide-react';
import { WHATSAPP_RAW_NUMBER } from '../data/packages';

export const HaveAPlanSection: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState('Jibhi & Tirthan Valley');
  const [selectedStyle, setSelectedStyle] = useState('Slow & Scenic');
  const [selectedMonth, setSelectedMonth] = useState('This Upcoming Weekend');
  const [groupSize] = useState('2-4 People');
  const [customNote] = useState('');

  const destinations = [
    'Jibhi & Tirthan Valley',
    'Kashmir Valley',
    'Old Manali & Solang',
    'Spiti Valley',
    'Parvati Valley',
    'Custom Destination',
  ];

  const travelStyles = [
    'Slow & Scenic',
    'Mountain Trekking',
    'Boutique Homestays',
    'Solo Discovery',
  ];

  const travelMonths = [
    'This Upcoming Weekend',
    'Next Month',
    'Winter / Snow Season',
    'Flexible Dates',
  ];

  const getCustomWhatsAppUrl = () => {
    const brief = `Hi Plan & Explore! I have a trip plan in mind:
• Destination: ${selectedDestination}
• Travel Style: ${selectedStyle}
• Preferred Time: ${selectedMonth}
• Group Size: ${groupSize}${customNote.trim() ? `\n• Notes: ${customNote.trim()}` : ''}

Could you help curate this journey for us?`;

    return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(brief)}`;
  };

  return (
    <section id="have-a-plan" className="py-20 sm:py-28 bg-[#FAFAF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-sm bg-[#F4F1EA] border border-[#0B1F33]/10 p-8 sm:p-14 lg:p-16 relative">
          <div className="max-w-3xl">
            {/* Header */}
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BESPOKE ESCAPES</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1F33] leading-[1.08]">
              Have a Plan?
            </h2>

            <p className="mt-4 text-base sm:text-lg md:text-xl text-[#4F5E6E] font-editorial italic leading-relaxed max-w-2xl">
              Already know where you want to go? Tell us your destination, dates and travel style —
              we'll help turn the idea into a journey.
            </p>
          </div>

          {/* Intuitive Quick-Planner Chips */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-[#0B1F33]/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              {/* Destination selector */}
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#0B1F33] block mb-2.5">
                  1. Where do you want to wander?
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {destinations.map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setSelectedDestination(dest)}
                      className={`px-3.5 py-2 rounded-sm text-xs font-medium transition-all cursor-pointer ${
                        selectedDestination === dest
                          ? 'bg-[#5A5A40] text-white shadow-xs'
                          : 'bg-white text-[#4F5E6E] hover:text-[#0B1F33] border border-[#0B1F33]/10'
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel style selector */}
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#0B1F33] block mb-2.5">
                  2. Travel Style
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {travelStyles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3.5 py-2 rounded-sm text-xs font-medium transition-all cursor-pointer ${
                        selectedStyle === style
                          ? 'bg-[#5A5A40] text-white shadow-xs'
                          : 'bg-white text-[#4F5E6E] hover:text-[#0B1F33] border border-[#0B1F33]/10'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timing */}
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#0B1F33] block mb-2.5">
                  3. Travel Timeline
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {travelMonths.map((month) => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => setSelectedMonth(month)}
                      className={`px-3.5 py-2 rounded-sm text-xs font-medium transition-all cursor-pointer ${
                        selectedMonth === month
                          ? 'bg-[#5A5A40] text-white shadow-xs'
                          : 'bg-white text-[#4F5E6E] hover:text-[#0B1F33] border border-[#0B1F33]/10'
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Direct Conversation */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 border border-[#0B1F33]/10 shadow-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5A5A40] block mb-1">
                DIRECT CONVERSATION
              </span>
              <h3 className="font-editorial text-2xl font-normal text-[#0B1F33] mb-2">
                Talk to us directly
              </h3>
              <p className="text-xs text-[#4F5E6E] mb-6 leading-relaxed">
                No tedious multi-page forms. Send your travel preferences straight to our curators on
                WhatsApp.
              </p>

              <div className="space-y-3">
                <a
                  id="have-a-plan-whatsapp-btn"
                  href={getCustomWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xs bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg hover:shadow-green-500/25 active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4.5 h-4.5 text-white fill-white/20" />
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="text-center pt-1">
                  <span className="text-[11px] text-[#4F5E6E]">
                    Direct human response &bull; 9 AM – 10 PM IST
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#0B1F33]/8 space-y-2 text-xs text-[#4F5E6E]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Tailored route &amp; stay options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Direct mountain lead coordination</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
