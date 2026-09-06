import React from 'react';
import { MessageCircle, ArrowRight, Clock, MapPin } from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data/packages';

interface ContactSectionProps {
  onOpenCustomPlan: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCustomPlan }) => {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F4F1EA] border-t border-[#0B1F33]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-3 inline-block">
            DIRECT COORDINATION
          </span>

          {/* Heading */}
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1F33] leading-[1.08] mb-5">
            Let's plan your next escape.
          </h2>

          {/* Text */}
          <p className="text-base sm:text-lg text-[#4F5E6E] font-editorial italic max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
            Have a destination in mind or just want to get away? Start a conversation with us.
          </p>

          {/* Direct WhatsApp Callout Card */}
          <div className="inline-block p-8 sm:p-10 bg-white border border-[#0B1F33]/10 shadow-xs max-w-lg w-full mb-8 text-center">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#5A5A40] block mb-2">
                DIRECT CONVERSATION
              </span>
              <div className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33] mb-3">
                Chat With Our Curators
              </div>
              <p className="text-xs text-[#4F5E6E] max-w-sm mb-6 leading-relaxed">
                Connect with our mountain leads directly on WhatsApp to ask questions, check dates, or
                tailor an upcoming journey.
              </p>

              {/* Single Clear Contact CTA */}
              <div className="w-full">
                <a
                  id="contact-whatsapp-btn"
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-8 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xs active:scale-95 min-h-[48px] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0B1F33]/8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#4F5E6E]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>Responsive 9 AM – 10 PM IST</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>Delhi &amp; Himachal Desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
