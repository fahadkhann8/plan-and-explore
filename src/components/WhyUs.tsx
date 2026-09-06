import React from 'react';
import { WHY_US_FEATURES } from '../data/packages';

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#FAFAF7] border-t border-[#0B1F33]/8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-baseline pb-16 sm:pb-20 border-b border-[#0B1F33]/10">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-3 block">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1F33] leading-[1.08] text-balance">
              Not just a trip.
              <br />
              <span className="italic text-[#5A5A40]">A story you'll carry back.</span>
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-[#4F5E6E] leading-relaxed max-w-xl font-editorial italic">
              Plan &amp; Explore creates thoughtfully designed journeys for curious travellers. From
              mountain villages and hidden waterfalls to winding roads and quiet starlit valley evenings,
              we make it easier to leave routine behind.
            </p>
          </div>
        </div>

        {/* 4 Clean Editorial Columns */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {WHY_US_FEATURES.map((feature) => (
            <div
              key={feature.id}
              id={`feature-${feature.id}`}
              className="pt-6 border-t border-[#0B1F33]/15 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#5A5A40] font-semibold block mb-4">
                  {feature.number}
                </span>

                <h3 className="font-editorial text-2xl font-normal text-[#0B1F33] mb-3 leading-snug">
                  {feature.title}
                </h3>

                <p className="text-sm text-[#4F5E6E] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
