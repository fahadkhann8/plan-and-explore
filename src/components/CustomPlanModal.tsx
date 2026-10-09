import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Compass } from 'lucide-react';
import { WHATSAPP_RAW_NUMBER } from '../data/packages';
import { useBodyScrollLock } from '../utils/scrollLock';

interface CustomPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export const CustomPlanModal: React.FC<CustomPlanModalProps> = ({
  isOpen,
  onClose,
  initialDestination,
}) => {
  const [destination, setDestination] = useState('Jibhi & Tirthan Valley');
  const [groupSize, setGroupSize] = useState('Couple / 2 Persons');
  const [timeframe, setTimeframe] = useState('Upcoming Weekend');
  const [notes, setNotes] = useState('');

  // Centralized body scroll lock
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      if (initialDestination) {
        setDestination(initialDestination);
      }
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, initialDestination, onClose]);

  if (!isOpen) return null;

  const destinationsList = [
    'Jibhi & Tirthan Valley',
    'Kashmir',
    'Manali & Solang',
    'Spiti Valley',
    'Custom Himalayan Circuit',
  ];

  const groupSizes = ['Solo Explorer', 'Couple / 2 Persons', 'Small Group (3–6)', 'Family / Private Group'];

  const timeframes = ['This Weekend', 'Next 2–3 Weeks', 'Next Month', 'Winter / Snow Season'];

  const getWhatsAppBriefUrl = () => {
    const text = `Hi Plan & Explore! I have a plan in mind:
• Destination: ${destination}
• Group: ${groupSize}
• Target Dates: ${timeframe}${notes.trim() ? `\n• Preferences: ${notes.trim()}` : ''}

Could you please share custom itinerary options and pricing?`;

    return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      id="custom-plan-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-plan-heading"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="custom-plan-modal-dialog"
        className="relative w-full max-w-lg bg-[#FAFAF7] rounded-sm p-6 sm:p-8 border border-[#0B1F33]/15 shadow-2xl my-3 sm:my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button with 44x44px target */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-sm text-[#4F5E6E] hover:text-[#0B1F33] hover:bg-[#E8E8E1] transition-colors cursor-pointer"
          aria-label="Close modal (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] mb-2">
          <Compass className="w-4 h-4" />
          <span>HAVE A PLAN?</span>
        </div>

        <h3 id="custom-plan-heading" className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33] mb-2">
          Tell us where you want to go.
        </h3>

        <p className="text-xs sm:text-sm text-[#4F5E6E] font-editorial italic mb-6 leading-relaxed">
          Select your preferences below to generate a tailored WhatsApp inquiry directly to our
          curators.
        </p>

        {/* Form fields */}
        <div className="space-y-4">
          {/* Destination */}
          <div>
            <label className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-2">
              Destination
            </label>
            <div className="grid grid-cols-2 gap-2">
              {destinationsList.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDestination(d)}
                  className={`p-2.5 min-h-[44px] flex items-center rounded-sm text-xs font-medium text-left transition-all cursor-pointer ${
                    destination === d
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'bg-white text-[#4F5E6E] border border-[#0B1F33]/15 hover:border-[#5A5A40]/40'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Group size */}
          <div>
            <label className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-2">
              Travel Group
            </label>
            <div className="grid grid-cols-2 gap-2">
              {groupSizes.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroupSize(g)}
                  className={`p-2.5 min-h-[44px] flex items-center rounded-sm text-xs font-medium text-left transition-all cursor-pointer ${
                    groupSize === g
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'bg-white text-[#4F5E6E] border border-[#0B1F33]/15 hover:border-[#5A5A40]/40'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe */}
          <div>
            <label className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-2">
              Departure Timeline
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeframes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeframe(t)}
                  className={`p-2.5 min-h-[44px] flex items-center rounded-sm text-xs font-medium text-left transition-all cursor-pointer ${
                    timeframe === t
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'bg-white text-[#4F5E6E] border border-[#0B1F33]/15 hover:border-[#5A5A40]/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Optional notes */}
          <div>
            <label className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-1.5">
              Specific requests or vibe (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Riverside cottage, quiet trails, trout fishing..."
              className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-[#0B1F33]/20 text-xs text-[#0B1F33] placeholder:text-[#4F5E6E]/50 focus:outline-hidden focus:border-[#5A5A40]"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-5 border-t border-[#0B1F33]/10">
          <a
            id="modal-send-whatsapp-btn"
            href={getWhatsAppBriefUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-sm bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-lg hover:shadow-green-500/25 active:scale-98 min-h-[44px] cursor-pointer"
          >
            <MessageCircle className="w-4.5 h-4.5 text-white fill-white/20" />
            <span>Plan via WhatsApp &rarr;</span>
          </a>

          <p className="mt-3 text-center text-[11px] text-[#4F5E6E]">
            Connects directly to our official WhatsApp. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
};
