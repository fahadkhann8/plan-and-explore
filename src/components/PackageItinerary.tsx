import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Home,
  Utensils,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Mountain,
  Sun,
  Sunset,
  Moon,
  Compass,
} from 'lucide-react';
import { TravelPackage, ItineraryDay } from '../types';

interface PackageItineraryProps {
  pkg: TravelPackage;
}

// Categorize activity into time phase
function getActivityPhase(activity: string, index: number, total: number) {
  const text = activity.toLowerCase();
  if (text.includes('morning') || text.includes('breakfast') || text.includes('sunrise') || text.includes('dawn') || text.includes('depart'))
    return { label: 'Morning', icon: <Sun className="w-3 h-3 text-amber-500" /> };
  if (text.includes('afternoon') || text.includes('lunch') || text.includes('trek') || text.includes('hike') || text.includes('drive') || text.includes('explore') || text.includes('visit'))
    return { label: 'Afternoon', icon: <Compass className="w-3 h-3 text-[#5A5A40]" /> };
  if (text.includes('evening') || text.includes('sunset') || text.includes('tea') || text.includes('bonfire') || text.includes('stroll'))
    return { label: 'Evening', icon: <Sunset className="w-3 h-3 text-orange-500" /> };
  if (text.includes('dinner') || text.includes('night') || text.includes('overnight') || text.includes('rest') || text.includes('stargazing'))
    return { label: 'Night', icon: <Moon className="w-3 h-3 text-indigo-400" /> };
  // Fallback
  const ratio = index / Math.max(total, 1);
  if (ratio < 0.3) return { label: 'Morning', icon: <Sun className="w-3 h-3 text-amber-500" /> };
  if (ratio < 0.65) return { label: 'Afternoon', icon: <Compass className="w-3 h-3 text-[#5A5A40]" /> };
  if (ratio < 0.85) return { label: 'Evening', icon: <Sunset className="w-3 h-3 text-orange-500" /> };
  return { label: 'Night', icon: <Moon className="w-3 h-3 text-indigo-400" /> };
}

function getShortSummary(description: string): string {
  if (!description) return '';
  const sentences = description.trim().match(/[^.!?]+[.!?]+(\s|$)/g);
  if (sentences && sentences.length > 0) return sentences.slice(0, 2).join(' ').trim();
  return description.slice(0, 160) + (description.length > 160 ? '...' : '');
}

/* ─────────────── Day Card ─────────────── */
const DayCard: React.FC<{
  day: ItineraryDay;
  pkg: TravelPackage;
  dayImage: string;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ day, pkg, dayImage, isExpanded, onToggle }) => {
  const visibleActivities = isExpanded ? day.activities : day.activities.slice(0, 3);
  const hasMore = day.activities.length > 3;

  return (
    <article
      id={`itinerary-day-${day.day}`}
      className="group rounded-xl overflow-hidden border border-[#0B1F33]/10 bg-white shadow-sm hover:shadow-md transition-all scroll-mt-28"
    >
      {/* Image Banner */}
      <div className="relative aspect-[21/9] sm:aspect-[21/7] overflow-hidden bg-[#0B1F33]">
        <img
          src={dayImage}
          alt={`Day ${day.day}: ${day.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/20 to-transparent" />

        {/* Day badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-[#5A5A40] text-white text-[10px] font-bold tracking-widest uppercase shadow-md">
            Day {day.day < 10 ? `0${day.day}` : day.day}
          </span>
          {day.highlightBadge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20">
              <Sparkles className="w-3 h-3 text-[#A3B899]" />
              {day.highlightBadge}
            </span>
          )}
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <h3 className="font-editorial text-xl sm:text-2xl font-normal">{day.title}</h3>
            {day.subtitle && (
              <p className="text-xs text-white/70 mt-0.5">{day.subtitle}</p>
            )}
          </div>
          {day.stay && (
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              <Home className="w-3 h-3 text-[#A3B899]" />
              {day.stay}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Quick summary */}
        <p className="text-sm text-[#4F5E6E] leading-relaxed">
          {getShortSummary(day.description)}
        </p>

        {/* Quick info chips */}
        <div className="flex flex-wrap gap-2">
          {day.meals && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F1EA] text-xs text-[#0B1F33] font-medium">
              <Utensils className="w-3 h-3 text-[#5A5A40]" />
              {day.meals}
            </span>
          )}
          {day.stay && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F1EA] text-xs text-[#0B1F33] font-medium sm:hidden">
              <Home className="w-3 h-3 text-[#5A5A40]" />
              {day.stay}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F1EA] text-xs text-[#0B1F33] font-medium">
            <MapPin className="w-3 h-3 text-[#5A5A40]" />
            {day.activities.length} Experiences
          </span>
        </div>

        {/* Visual Timeline */}
        <div className="relative pl-5 space-y-2.5 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#5A5A40]/15 before:rounded-full">
          {visibleActivities.map((act, idx) => {
            const phase = getActivityPhase(act, idx, day.activities.length);
            return (
              <div key={idx} className="relative flex items-start gap-3">
                {/* Dot */}
                <div className="absolute -left-5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#5A5A40]/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]" />
                </div>
                {/* Phase + Text */}
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] bg-[#F4F1EA] px-2 py-0.5 rounded-full shrink-0">
                  {phase.icon}
                  {phase.label}
                </span>
                <p className="text-xs sm:text-sm text-[#0B1F33] leading-relaxed flex-1">{act}</p>
              </div>
            );
          })}
        </div>

        {!isExpanded && hasMore && (
          <p className="text-[11px] text-[#4F5E6E] italic pl-5">
            + {day.activities.length - 3} more experiences
          </p>
        )}

        {/* Expanded: full description */}
        {isExpanded && (
          <div className="pt-3 border-t border-[#0B1F33]/8">
            <p className="text-xs sm:text-sm text-[#4F5E6E] leading-relaxed bg-[#FAFAF7] p-4 rounded-lg border border-[#0B1F33]/6">
              {day.description}
            </p>
          </div>
        )}

        {/* Toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="w-full py-3 rounded-lg bg-[#FAFAF7] hover:bg-[#E8E8E1] border border-[#0B1F33]/10 text-[#0B1F33] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-[0.98] min-h-[44px]"
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="w-4 h-4 text-[#5A5A40]" />
            </>
          ) : (
            <>
              <span>Full Details</span>
              <ChevronDown className="w-4 h-4 text-[#5A5A40]" />
            </>
          )}
        </button>
      </div>
    </article>
  );
};

/* ─────────────── Main Itinerary Section ─────────────── */
export const PackageItinerary: React.FC<PackageItineraryProps> = ({ pkg }) => {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});
  const [activeDayTab, setActiveDayTab] = useState<number>(1);

  if (!pkg?.itinerary?.length) return null;

  const daysCount = pkg.itinerary.length;
  const isAllExpanded = Object.keys(expandedDays).length === daysCount &&
    Object.values(expandedDays).every(Boolean);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const toggleAll = () => {
    if (isAllExpanded) {
      setExpandedDays({});
    } else {
      const all: Record<number, boolean> = {};
      pkg.itinerary.forEach((d) => { all[d.day] = true; });
      setExpandedDays(all);
    }
  };

  const scrollToDay = (dayNum: number) => {
    setActiveDayTab(dayNum);
    document.getElementById(`itinerary-day-${dayNum}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#5A5A40] rounded-full" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] block">
              Day-by-Day
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33]">
              Your Itinerary
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#4F5E6E] font-medium hidden sm:inline">
            {daysCount} Days · {pkg.duration}
          </span>
          <button
            type="button"
            onClick={toggleAll}
            className="text-xs font-semibold text-[#5A5A40] hover:text-[#0B1F33] px-3 py-1.5 rounded-full bg-[#F4F1EA] hover:bg-[#E8E8E1] transition-colors cursor-pointer uppercase tracking-wider"
          >
            {isAllExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Day Tabs */}
      {daysCount > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {pkg.itinerary.map((day) => (
            <button
              key={day.day}
              type="button"
              onClick={() => scrollToDay(day.day)}
              className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeDayTab === day.day
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'bg-white hover:bg-[#E8E8E1] text-[#0B1F33] border border-[#0B1F33]/10'
              }`}
            >
              Day {day.day < 10 ? `0${day.day}` : day.day}
            </button>
          ))}
        </div>
      )}

      {/* Day Cards */}
      <div className="space-y-5">
        {pkg.itinerary.map((day) => {
          const dayImage =
            day.image ||
            (pkg.galleryImages?.length
              ? pkg.galleryImages[(day.day - 1) % pkg.galleryImages.length]
              : pkg.coverImage);

          return (
            <DayCard
              key={day.day}
              day={day}
              pkg={pkg}
              dayImage={dayImage}
              isExpanded={!!expandedDays[day.day]}
              onToggle={() => toggleDay(day.day)}
            />
          );
        })}
      </div>
    </section>
  );
};
