import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data/packages';

interface MobileStickyBarProps {
  onOpenCustomPlan: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenCustomPlan }) => {
  return (
    <aside
      id="mobile-sticky-bar"
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-3 left-3 right-3 z-30 pointer-events-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="pointer-events-auto apple-glass-card rounded-full px-3.5 py-2 border border-white/60 shadow-[0_12px_36px_rgba(0,0,0,0.18)] flex items-center justify-between gap-2">
        {/* Subtle Plan Inquiry */}
        <button
          id="mobile-sticky-plan-btn"
          onClick={onOpenCustomPlan}
          className="apple-glass-button px-3.5 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase text-[#0B1F33] hover:text-[#5A5A40] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-[#5A5A40]" />
          <span>Have a Plan?</span>
        </button>

        {/* Primary WhatsApp Action */}
        <a
          id="mobile-sticky-whatsapp-btn"
          href={WHATSAPP_BASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="apple-glass-button-whatsapp apple-glass-shine inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-white text-[11px] font-bold uppercase tracking-wider shadow-sm cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 text-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};
