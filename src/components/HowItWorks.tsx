import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/packages';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#F4F1EA] border-t border-[#0B1F33]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-3 block">
            THE PROCESS
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1F33] leading-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4F5E6E] font-editorial italic">
            From your first spark of inspiration to stepping out into crisp mountain air.
          </p>
        </div>

        {/* 3 Step Clean Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-14 lg:gap-16">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              id={`how-it-works-step-${step.step}`}
              className="pt-6 border-t border-[#0B1F33]/15 flex flex-col justify-between"
            >
              <div>
                <span className="font-editorial text-3xl sm:text-4xl font-light text-[#5A5A40] block mb-4">
                  {step.step}
                </span>

                <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33] mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm text-[#4F5E6E] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
