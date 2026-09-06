import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Users, CheckCircle2, MessageCircle, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { TravelPackage } from '../types';
import { WHATSAPP_RAW_NUMBER } from '../data/packages';
import { submitBooking } from '../services/googleSheets';
import { useBodyScrollLock } from '../utils/scrollLock';

interface BookingModalProps {
  pkg: TravelPackage | null;
  isOpen: boolean;
  onClose: () => void;
}

// Simple phone validation: at least 10 digits
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

// Simple email validation
function isValidEmail(email: string): boolean {
  if (!email.trim()) return true; // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Rate limiter: prevent submissions within cooldown period
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN_MS = 5000; // 5 seconds

export const BookingModal: React.FC<BookingModalProps> = ({ pkg, isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelersCount, setTravelersCount] = useState('2 Travelers');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Inline validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const formHasData = useRef(false);

  // Centralized body scroll lock
  useBodyScrollLock(isOpen);

  // Track if form has unsaved data
  useEffect(() => {
    formHasData.current = !!(fullName.trim() || phone.trim() || email.trim() || specialRequests.trim());
  }, [fullName, phone, email, specialRequests]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If form has data and not yet submitted, ask for confirmation
        if (formHasData.current && !isSuccess) {
          const discard = window.confirm('You have unsaved booking details. Discard and close?');
          if (!discard) return;
        }
        resetForm();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSuccess]);

  if (!isOpen || !pkg) return null;

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    else if (fullName.trim().length < 2) errs.fullName = 'Name must be at least 2 characters';
    else if (fullName.trim().length > 100) errs.fullName = 'Name is too long';

    if (!phone.trim()) errs.phone = 'WhatsApp number is required';
    else if (!isValidPhone(phone)) errs.phone = 'Enter a valid phone number (10-15 digits)';

    if (email.trim() && !isValidEmail(email)) errs.email = 'Enter a valid email address';

    if (specialRequests.length > 500) errs.specialRequests = 'Keep requests under 500 characters';

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
      setErrors({ _form: 'Please wait a few seconds before submitting again.' });
      return;
    }
    lastSubmitTime = now;

    setIsSubmitting(true);
    // Use crypto.randomUUID for collision-safe IDs, with fallback
    const uuid = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8).toUpperCase()
      : Math.floor(100000 + Math.random() * 900000).toString();
    const newId = `PE-${uuid}`;
    setBookingId(newId);

    const submissionData = {
      id: newId,
      packageId: pkg.id,
      destination: pkg.destination,
      price: pkg.price,
      fullName: fullName.trim().slice(0, 100),
      phone: phone.trim().slice(0, 20),
      email: email.trim().slice(0, 100),
      travelDate: travelDate || 'Flexible',
      travelersCount,
      specialRequests: specialRequests.trim().slice(0, 500),
      submittedAt: new Date().toISOString(),
    };

    await submitBooking(submissionData);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const getWhatsAppConfirmationUrl = () => {
    const text = encodeURIComponent(
      `*New Booking Request - Plan & Explore*\n` +
      `--------------------------------\n` +
      `*Booking Ref:* ${bookingId}\n` +
      `*Destination:* ${pkg.destination} (${pkg.packageNumber})\n` +
      `*Price:* ${pkg.price} / person\n` +
      `*Full Name:* ${fullName}\n` +
      `*Phone/WhatsApp:* ${phone}\n` +
      `*Email:* ${email || 'Not provided'}\n` +
      `*Travel Date:* ${travelDate || 'Flexible'}\n` +
      `*Travelers:* ${travelersCount}\n` +
      (specialRequests ? `*Notes:* ${specialRequests}\n` : '') +
      `--------------------------------\n` +
      `Please confirm slot availability & next steps.`
    );
    return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${text}`;
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setTravelDate('');
    setSpecialRequests('');
    setErrors({});
    setSubmitAttempted(false);
    onClose();
  };

  const handleClose = () => {
    if (formHasData.current && !isSuccess) {
      const discard = window.confirm('You have unsaved booking details. Discard and close?');
      if (!discard) return;
    }
    resetForm();
  };

  // Helper for inline error display
  const fieldError = (field: string) =>
    submitAttempted && errors[field] ? (
      <span className="text-red-500 text-[10px] mt-0.5 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {errors[field]}
      </span>
    ) : null;

  return (
    <div
      id="booking-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1F33]/85 backdrop-blur-xs p-2.5 sm:p-6 flex items-start sm:items-center justify-center animate-in fade-in duration-150"
    >
      <div
        id="booking-modal-container"
        className="relative w-full max-w-xl bg-[#FAFAF7] rounded-md sm:rounded-sm shadow-2xl border border-[#0B1F33]/20 overflow-hidden my-2 sm:my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip - Sticky so the cross and cancel option remain visible at all times */}
        <div className="sticky top-0 z-30 bg-[#0B1F33] text-white px-4 py-3.5 sm:p-6 flex items-center justify-between border-b border-white/10 shadow-md">
          <div className="min-w-0 pr-3">
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-[#A3B899] block mb-1">
              {pkg.packageNumber} &middot; RESERVATION
            </span>
            <h3 id="booking-modal-title" className="font-editorial text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight truncate">
              Book {pkg.destination}
            </h3>
            <p className="text-[11px] sm:text-xs text-white/70 mt-0.5">
              {pkg.duration} &middot; Starting from <span className="text-white font-semibold">{pkg.price}</span>
            </p>
          </div>

          <button
            type="button"
            id="booking-modal-close-btn"
            onClick={handleClose}
            className="p-2.5 sm:p-2 rounded-full text-white/70 hover:text-white hover:bg-white/15 active:bg-white/25 transition-colors cursor-pointer shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {/* Status announcement for screen readers */}
          <div aria-live="polite" className="sr-only">
            {isSuccess ? `Booking request received. Reference number ${bookingId}.` : ''}
          </div>

          {isSuccess ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]">
                  RESERVATION INITIATED
                </span>
                <h4 className="font-editorial text-2xl sm:text-3xl text-[#0B1F33] font-normal mt-1">
                  Booking Request Received!
                </h4>
                <p className="text-xs text-[#4F5E6E] mt-2 max-w-md mx-auto leading-relaxed">
                  Your trip details for <strong className="text-[#0B1F33]">{pkg.destination}</strong> have been recorded with reference <span className="font-mono font-bold text-[#0B1F33]">#{bookingId}</span>.
                </p>
              </div>

              <div className="bg-[#F4F1EA] p-4 rounded-sm border border-[#0B1F33]/10 text-left text-xs space-y-1.5 text-[#0B1F33]">
                <div className="flex justify-between">
                  <span className="text-[#4F5E6E]">Lead Traveler:</span>
                  <span className="font-semibold">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4F5E6E]">WhatsApp Contact:</span>
                  <span className="font-semibold">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4F5E6E]">Estimated Departure:</span>
                  <span className="font-semibold">{travelDate || 'Flexible'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4F5E6E]">Party Size:</span>
                  <span className="font-semibold">{travelersCount}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-sm bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Confirm on WhatsApp (1-Tap)</span>
                </a>

                <button
                  onClick={resetForm}
                  className="w-full py-2.5 text-xs font-semibold text-[#4F5E6E] hover:text-[#0B1F33] transition-colors min-h-[44px]"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Form-level error */}
              {errors._form && (
                <div className="p-3 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors._form}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1F33] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Ananya Sharma"
                    aria-invalid={submitAttempted && !!errors.fullName}
                    className={`w-full px-3.5 py-3 bg-white border rounded-xs text-sm text-[#0B1F33] placeholder-[#0B1F33]/30 focus:outline-hidden focus:border-[#5A5A40] transition-colors min-h-[44px] ${
                      submitAttempted && errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-[#0B1F33]/20'
                    }`}
                  />
                  {fieldError('fullName')}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1F33] mb-1">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    required
                    maxLength={20}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    aria-invalid={submitAttempted && !!errors.phone}
                    className={`w-full px-3.5 py-3 bg-white border rounded-xs text-sm text-[#0B1F33] placeholder-[#0B1F33]/30 focus:outline-hidden focus:border-[#5A5A40] transition-colors min-h-[44px] ${
                      submitAttempted && errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#0B1F33]/20'
                    }`}
                  />
                  {fieldError('phone')}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1F33] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    maxLength={100}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@example.com"
                    aria-invalid={submitAttempted && !!errors.email}
                    className={`w-full px-3.5 py-3 bg-white border rounded-xs text-sm text-[#0B1F33] placeholder-[#0B1F33]/30 focus:outline-hidden focus:border-[#5A5A40] transition-colors min-h-[44px] ${
                      submitAttempted && errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#0B1F33]/20'
                    }`}
                  />
                  {fieldError('email')}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1F33] mb-1">
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <select
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(e.target.value)}
                      className="w-full px-3.5 py-3 bg-white border border-[#0B1F33]/20 rounded-xs text-sm text-[#0B1F33] appearance-none focus:outline-hidden focus:border-[#5A5A40] cursor-pointer min-h-[44px]"
                    >
                      <option value="1 Solo Traveler">1 Solo Traveler</option>
                      <option value="2 Travelers">2 Travelers (Couple / Friends)</option>
                      <option value="3-4 Travelers">3–4 Travelers (Small Group)</option>
                      <option value="5-8 Travelers">5–8 Travelers (Family / Group)</option>
                      <option value="9+ Custom Group">9+ Custom Group / Corporate</option>
                    </select>
                    <Users className="w-4 h-4 text-[#0B1F33]/40 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1F33] mb-1">
                  Preferred Travel Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-[#0B1F33]/20 rounded-xs text-sm text-[#0B1F33] focus:outline-hidden focus:border-[#5A5A40] min-h-[44px]"
                  />
                </div>
                <span className="text-[10px] text-[#4F5E6E] mt-1 block">
                  Departures run every Friday & on custom private dates.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1F33] mb-1">
                  Special Requests / Departure City
                </label>
                <textarea
                  rows={2}
                  maxLength={500}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g., Pick up from Delhi, vegetarian meals, twin sharing room..."
                  className={`w-full px-3.5 py-3 bg-white border rounded-xs text-sm text-[#0B1F33] placeholder-[#0B1F33]/30 focus:outline-hidden focus:border-[#5A5A40] resize-none ${
                    submitAttempted && errors.specialRequests ? 'border-red-400 bg-red-50/30' : 'border-[#0B1F33]/20'
                  }`}
                />
                {fieldError('specialRequests')}
                <span className="text-[10px] text-[#4F5E6E] mt-0.5 block text-right">{specialRequests.length}/500</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-sm bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                >
                  {isSubmitting ? (
                    <span>Submitting Booking...</span>
                  ) : (
                    <>
                      <span>Reserve Spot ({pkg.price})</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#4F5E6E] mt-3 pt-2 border-t border-[#0B1F33]/10">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No advance payment needed to reserve</span>
                  </div>
                  <span className="text-[10px] text-[#4F5E6E]">Instant booking confirmation</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
