import React, { useState, useEffect } from 'react';
import { X, Hammer, MessageCircle, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data/packages';
import { useBodyScrollLock } from '../utils/scrollLock';

export const UnderConstructionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the notice in this browser session
    const isDismissed = sessionStorage.getItem('plan_and_explore_notice_dismissed');
    if (!isDismissed) {
      // Gentle 400ms delay so page loads gracefully first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('plan_and_explore_notice_dismissed', 'true');
  };

  if (!isOpen) return null;

  return (
    <div
      id="under-construction-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="construction-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={handleDismiss}
    >
      <div
        id="under-construction-modal"
        className="relative w-full max-w-md bg-[#FAFAF7] rounded-sm p-6 sm:p-8 border border-[#0B1F33]/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5A5A40] via-[#233E32] to-[#5A5A40]" />

        {/* Close Button (44x44px target) */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-sm text-[#4F5E6E] hover:text-[#0B1F33] hover:bg-[#E8E8E1] transition-colors cursor-pointer"
          aria-label="Close announcement"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Eyebrow */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] mb-3">
          <span className="w-6 h-6 rounded-full bg-[#5A5A40]/10 flex items-center justify-center text-[#5A5A40]">
            <Compass className="w-3.5 h-3.5" />
          </span>
          <span>CURATION IN PROGRESS</span>
        </div>

        {/* Title */}
        <h3 id="construction-title" className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33] leading-tight mb-3">
          Site In Building Phase
        </h3>

        {/* Body Description */}
        <div className="text-xs sm:text-sm text-[#4F5E6E] leading-relaxed space-y-2.5 mb-6">
          <p>
            Welcome to <strong>Plan &amp; Explore</strong>! Our boutique platform is currently under active development and curation.
          </p>
          <div className="p-3 bg-[#F4F1EA] rounded-xs border border-[#0B1F33]/10 text-[#0B1F33]">
            <p className="font-editorial italic text-sm sm:text-base leading-snug">
              “Due to some unavoidable circumstances, our next major website update will be after <strong>18 September</strong>. Thank you for your patience and understanding.”
            </p>
          </div>
          <p className="text-[11px] text-[#4F5E6E]">
            Please excuse any missing links or placeholder sections while we complete the experience. In the meantime, feel free to explore the preview or message us directly on WhatsApp for journey inquiries.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-[#0B1F33]/10">
          <button
            id="dismiss-construction-modal-btn"
            onClick={handleDismiss}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all shadow-xs active:scale-98 min-h-[44px] cursor-pointer"
          >
            <span>Explore The Site</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            id="construction-whatsapp-btn"
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDismiss}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 border border-[#0B1F33]/20 hover:border-[#0B1F33] text-[#0B1F33] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors hover:bg-white min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>

        {/* Micro Footer Note */}
        <div className="mt-4 pt-3 flex items-center justify-between text-[10px] text-[#4F5E6E]/70 uppercase tracking-wider">
          <span>Delhi &middot; Banjar Valley</span>
          <span>Early Preview</span>
        </div>
      </div>
    </div>
  );
};
