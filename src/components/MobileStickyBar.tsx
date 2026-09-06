import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data/packages';

interface MobileStickyBarProps {
  onOpenCustomPlan: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenCustomPlan }) => {
  return (
    <aside
      id="mobile-sticky-bar"
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 px-4 py-2.5 bg-[#FAFAF7]/95 backdrop-blur-md border-t border-[#0B1F33]/8 shadow-xs flex items-center justify-between gap-3 pb-[max(10px,env(safe-area-inset-bottom))]"
    >
      {/* Subtle Plan Inquiry */}
      <button
        id="mobile-sticky-plan-btn"
        onClick={onOpenCustomPlan}
        className="text-[11px] font-semibold tracking-wider uppercase text-[#0B1F33] hover:text-[#5A5A40] transition-colors py-2 px-2 min-h-[44px] flex items-center cursor-pointer"
      >
        Have a Plan?
      </button>

      {/* Primary WhatsApp Action - Refined & Calm */}
      <a
        id="mobile-sticky-whatsapp-btn"
        href={WHATSAPP_BASE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 py-2 px-4 min-h-[44px] bg-[#5A5A40] text-white text-[11px] font-semibold uppercase tracking-wider transition-all shadow-2xs active:scale-98"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
        <span>Chat on WhatsApp</span>
      </a>
    </aside>
  );
};
