import React, { useState, useId } from 'react';
import {
  Clock,
  MapPin,
  Home,
  Utensils,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bus,
  Mountain,
  Calendar,
  Sun,
  Sunset,
  Moon,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { TravelPackage, ItineraryDay } from '../types';

interface PackageItineraryProps {
  pkg: TravelPackage;
}

// Helper: Extract 1-2 sentence concise summary from description
function getShortSummary(description: string, maxSentences = 2): string {
  if (!description) return '';
  const clean = description.trim();
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g);
  if (sentences && sentences.length > 0) {
    return sentences.slice(0, maxSentences).join(' ').trim();
  }
  return clean.slice(0, 160) + (clean.length > 160 ? '...' : '');
}

// Helper: Categorize activity into time phase (Morning / Afternoon / Evening / Night)
function getActivityPhase(activity: string, index: number, total: number): {
  label: string;
  icon: 'morning' | 'afternoon' | 'evening' | 'night' | 'general';
} {
  const text = activity.toLowerCase();
  if (
    text.includes('morning') ||
    text.includes('breakfast') ||
    text.includes('sunrise') ||
    text.includes('dawn') ||
    text.includes('early') ||
    text.includes('depart')
  ) {
    return { label: 'Morning', icon: 'morning' };
  }
  if (
    text.includes('afternoon') ||
    text.includes('lunch') ||
    text.includes('midday') ||
    text.includes('hike') ||
    text.includes('trek') ||
    text.includes('climb') ||
    text.includes('ascent') ||
    text.includes('drive') ||
    text.includes('explore') ||
    text.includes('visit')
  ) {
    return { label: 'Afternoon', icon: 'afternoon' };
  }
  if (
    text.includes('evening') ||
    text.includes('sunset') ||
    text.includes('tea') ||
    text.includes('dusk') ||
    text.includes('stroll') ||
    text.includes('café') ||
    text.includes('cafe') ||
    text.includes('bonfire')
  ) {
    return { label: 'Evening', icon: 'evening' };
  }
  if (
    text.includes('dinner') ||
    text.includes('night') ||
    text.includes('overnight') ||
    text.includes('rest') ||
    text.includes('stargazing') ||
    text.includes('sleep')
  ) {
    return { label: 'Night', icon: 'night' };
  }

  // Fallback sequential progression
  if (total <= 2) {
    return index === 0
      ? { label: 'Daytime', icon: 'morning' }
      : { label: 'Evening', icon: 'evening' };
  }
  const ratio = index / total;
  if (ratio < 0.3) return { label: 'Morning', icon: 'morning' };
  if (ratio < 0.65) return { label: 'Afternoon', icon: 'afternoon' };
  if (ratio < 0.85) return { label: 'Evening', icon: 'evening' };
  return { label: 'Night', icon: 'night' };
}

// Phase Icon Renderer
const PhaseIcon: React.FC<{ icon: 'morning' | 'afternoon' | 'evening' | 'night' | 'general' }> = ({
  icon,
}) => {
  switch (icon) {
    case 'morning':
      return <Sun className="w-3.5 h-3.5 text-amber-600" />;
    case 'afternoon':
      return <Compass className="w-3.5 h-3.5 text-[#5A5A40]" />;
    case 'evening':
      return <Sunset className="w-3.5 h-3.5 text-orange-600" />;
    case 'night':
      return <Moon className="w-3.5 h-3.5 text-indigo-600" />;
    default:
      return <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40]" />;
  }
};

interface DayCardProps {
  day: ItineraryDay;
  pkg: TravelPackage;
  isExpanded: boolean;
  onToggleExpand: () => void;
  dayImage: string;
}

export const ItineraryDayCard: React.FC<DayCardProps> = ({
  day,
  isExpanded,
  onToggleExpand,
  dayImage,
}) => {
  const shortSummary = getShortSummary(day.description);
  const totalActivities = day.activities.length;
  // In compact view, show up to 3 timeline activities; full view reveals all
  const visibleActivities = isExpanded ? day.activities : day.activities.slice(0, 3);
  const hasMoreActivities = totalActivities > 3;

  return (
    <article
      id={`itinerary-day-${day.day}`}
      className="bg-white rounded-sm border border-[#0B1F33]/12 shadow-xs overflow-hidden transition-all hover:border-[#5A5A40]/30 scroll-mt-28 sm:scroll-mt-36"
    >
      {/* ──────────────── LEVEL 1: IMMEDIATE SCANNING ──────────────── */}

      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#0B1F33]/8 bg-[#FAFAF7]/60">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xs bg-[#5A5A40] text-white text-[11px] font-bold tracking-widest uppercase shadow-2xs">
              DAY {day.day < 10 ? `0${day.day}` : day.day}
            </span>
            {day.highlightBadge && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5A5A40] bg-[#F4F1EA] px-2.5 py-0.5 rounded-xs border border-[#0B1F33]/5">
                <Sparkles className="w-3 h-3 text-[#5A5A40]" />
                {day.highlightBadge}
              </span>
            )}
          </div>

          <span className="text-[11px] uppercase tracking-wider text-[#4F5E6E] font-medium hidden sm:inline">
            Stage {day.day} of journey
          </span>
        </div>

        {/* Prominent Origin -> Destination Route */}
        <h3 className="font-editorial text-xl sm:text-2xl lg:text-3xl font-normal text-[#0B1F33] tracking-tight mt-1">
          {day.title}
        </h3>

        {/* Refined Theme / Subtitle */}
        {day.subtitle && (
          <p className="text-xs sm:text-sm font-medium text-[#5A5A40] mt-0.5">
            {day.subtitle}
          </p>
        )}
      </div>

      {/* Visual Image Banner with Subtle Metadata Overlay */}
      <div className="relative aspect-[16/7] sm:aspect-[21/7] max-h-[260px] w-full overflow-hidden bg-[#0B1F33]">
        <img
          src={dayImage}
          alt={`${day.title} - Day ${day.day}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-[#0B1F33]/20 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between text-white">
          <div className="flex items-center gap-2 text-xs font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-white/15">
            <MapPin className="w-3.5 h-3.5 text-[#A3B899]" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{day.title}</span>
          </div>

          {day.stay && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-white/15">
              <Home className="w-3.5 h-3.5 text-[#A3B899]" />
              <span className="truncate max-w-[200px]">{day.stay}</span>
            </div>
          )}
        </div>
      </div>

      {/* Level 1 Content Body */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* Short 1-2 sentence scannable summary */}
        <p className="text-sm sm:text-base text-[#4F5E6E] leading-relaxed">
          {shortSummary}
        </p>

        {/* Trip Details Quick Strip (Time · Route · Stay · Meals) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 sm:p-3.5 rounded-sm bg-[#FAFAF7] border border-[#0B1F33]/8 text-xs">
          {/* Route */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E]/80 block font-semibold">
                Route
              </span>
              <span className="text-[#0B1F33] font-medium truncate block" title={day.title}>
                {day.title}
              </span>
            </div>
          </div>

          {/* Stay */}
          {day.stay ? (
            <div className="flex items-start gap-2">
              <Home className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E]/80 block font-semibold">
                  Stay
                </span>
                <span className="text-[#0B1F33] font-medium truncate block" title={day.stay}>
                  {day.stay}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E]/80 block font-semibold">
                  Pacing
                </span>
                <span className="text-[#0B1F33] font-medium block">Curated Loop</span>
              </div>
            </div>
          )}

          {/* Meals */}
          {day.meals && (
            <div className="flex items-start gap-2">
              <Utensils className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E]/80 block font-semibold">
                  Meals
                </span>
                <span className="text-[#0B1F33] font-medium truncate block" title={day.meals}>
                  {day.meals}
                </span>
              </div>
            </div>
          )}

          {/* Schedule / Time */}
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E]/80 block font-semibold">
                Highlights
              </span>
              <span className="text-[#0B1F33] font-medium block">
                {totalActivities} Key Experiences
              </span>
            </div>
          </div>
        </div>

        {/* ──────────────── LEVEL 2: VISUAL TIMELINE & HIGHLIGHTS ──────────────── */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#5A5A40]" />
              Sequential Day Timeline
            </span>
            <span className="text-[11px] text-[#4F5E6E]">
              {totalActivities} stops & experiences
            </span>
          </div>

          {/* Vertical Sequential Timeline */}
          <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#5A5A40]/20">
            {visibleActivities.map((act, idx) => {
              const phaseInfo = getActivityPhase(act, idx, totalActivities);
              return (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#FAFAF7] border-2 border-[#5A5A40] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]" />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    {/* Time / Phase Chip */}
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] bg-[#F4F1EA] px-2 py-0.5 rounded-xs shrink-0 w-fit">
                      <PhaseIcon icon={phaseInfo.icon} />
                      {phaseInfo.label}
                    </span>

                    {/* Activity Description */}
                    <p className="text-xs sm:text-sm text-[#0B1F33] font-normal leading-relaxed">
                      {act}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notice if more activities hidden */}
          {!isExpanded && hasMoreActivities && (
            <p className="text-[11px] text-[#4F5E6E] italic mt-2.5 pl-6">
              + {totalActivities - 3} more experiences included in this day
            </p>
          )}
        </div>

        {/* ──────────────── LEVEL 3: EXPANDABLE DETAILS ──────────────── */}
        {isExpanded && (
          <div className="pt-4 border-t border-[#0B1F33]/10 space-y-4 animate-in fade-in duration-200">
            {/* Full Storytelling Description */}
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] block mb-1.5">
                Complete Day Story & Route Notes
              </span>
              <p className="text-xs sm:text-sm text-[#4F5E6E] leading-relaxed bg-[#FAFAF7] p-3.5 rounded-sm border border-[#0B1F33]/8">
                {day.description}
              </p>
            </div>

            {/* In-depth Stay & Meal Notes if available */}
            {(day.stay || day.meals) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F4F1EA]/60 p-3.5 rounded-sm border border-[#0B1F33]/8">
                {day.stay && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-0.5">
                      Accommodation Details
                    </span>
                    <span className="text-[#4F5E6E]">{day.stay}</span>
                  </div>
                )}
                {day.meals && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#0B1F33] block mb-0.5">
                      Dining & Meals
                    </span>
                    <span className="text-[#4F5E6E]">{day.meals}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Expand / Collapse Button (Touch Target >= 44px) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onToggleExpand}
            className="w-full py-3 px-4 rounded-sm bg-[#FAFAF7] hover:bg-[#E8E8E1] border border-[#0B1F33]/12 text-[#0B1F33] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98 min-h-[44px]"
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4 text-[#5A5A40]" />
              </>
            ) : (
              <>
                <span>View Full Details +</span>
                <ChevronDown className="w-4 h-4 text-[#5A5A40]" />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export const PackageItinerary: React.FC<PackageItineraryProps> = ({ pkg }) => {
  // Master state: which days are expanded
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});
  const [activeDayTab, setActiveDayTab] = useState<number>(1);
  const glanceId = useId();

  if (!pkg || !pkg.itinerary || pkg.itinerary.length === 0) {
    return null;
  }

  const daysCount = pkg.itinerary.length;
  const isAllExpanded = Object.keys(expandedDays).length === daysCount &&
    Object.values(expandedDays).every(Boolean);

  const toggleDayExpand = (dayNumber: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNumber]: !prev[dayNumber],
    }));
  };

  const toggleAllDays = () => {
    if (isAllExpanded) {
      setExpandedDays({});
    } else {
      const all: Record<number, boolean> = {};
      pkg.itinerary.forEach((d) => {
        all[d.day] = true;
      });
      setExpandedDays(all);
    }
  };

  const scrollToDay = (dayNumber: number) => {
    setActiveDayTab(dayNumber);
    const element = document.getElementById(`itinerary-day-${dayNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Derive "Trip at a Glance" fields dynamically from package data without hardcoding
  const routeString =
    pkg.routeWaypoints && pkg.routeWaypoints.length > 0
      ? pkg.routeWaypoints.join(' → ')
      : undefined;

  // Extract primary stay summary
  const stayInclusion = pkg.inclusions.find(
    (inc) =>
      inc.icon === 'Home' ||
      inc.title.toLowerCase().includes('stay') ||
      inc.title.toLowerCase().includes('accommodation') ||
      inc.title.toLowerCase().includes('cottage') ||
      inc.title.toLowerCase().includes('resort')
  );
  const staySummary = stayInclusion?.title || pkg.itinerary.find((d) => d.stay)?.stay;

  // Extract transport summary
  const transportInclusion = pkg.inclusions.find(
    (inc) =>
      inc.icon === 'Bus' ||
      inc.title.toLowerCase().includes('transport') ||
      inc.title.toLowerCase().includes('transit') ||
      inc.title.toLowerCase().includes('volvo')
  );
  const transportSummary =
    transportInclusion?.title || (pkg.departureFrom ? `From ${pkg.departureFrom}` : undefined);

  // Extract meal summary
  const mealInclusions = pkg.inclusions.filter(
    (inc) =>
      inc.icon === 'Utensils' ||
      inc.icon === 'Coffee' ||
      inc.title.toLowerCase().includes('meal') ||
      inc.title.toLowerCase().includes('breakfast') ||
      inc.title.toLowerCase().includes('dinner')
  );
  const mealsSummary =
    mealInclusions.length > 0
      ? mealInclusions.map((m) => m.title).join(' & ')
      : pkg.itinerary.find((d) => d.meals)?.meals;

  return (
    <section id="package-itinerary-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-[#0B1F33]/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] block mb-1">
            EXPERIENCE BLUEPRINT
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#0B1F33]">
            Curated Day-by-Day Itinerary
          </h2>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs text-[#4F5E6E] font-medium hidden sm:inline">
            {daysCount} Days &middot; {pkg.duration}
          </span>

          <button
            type="button"
            onClick={toggleAllDays}
            className="text-xs font-semibold text-[#5A5A40] hover:text-[#0B1F33] px-3 py-1.5 rounded-sm bg-[#F4F1EA] hover:bg-[#E8E8E1] transition-colors cursor-pointer uppercase tracking-wider"
          >
            {isAllExpanded ? 'Collapse All' : 'Expand All Days'}
          </button>
        </div>
      </div>

      {/* ──────────────── 6. TRIP AT A GLANCE (Compact universal summary) ──────────────── */}
      <div
        id={glanceId}
        className="p-4 sm:p-5 rounded-sm bg-white border border-[#0B1F33]/12 shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#5A5A40]" />
            Trip At A Glance
          </span>
          <span className="text-[11px] text-[#4F5E6E]">Fast Overview</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1 text-xs">
          {/* Duration */}
          <div className="p-2.5 rounded-xs bg-[#FAFAF7] border border-[#0B1F33]/8">
            <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-bold">
              Duration
            </span>
            <span className="text-[#0B1F33] font-semibold mt-0.5 block truncate">
              {pkg.duration}
            </span>
          </div>

          {/* Route */}
          {pkg.departureFrom && (
            <div className="p-2.5 rounded-xs bg-[#FAFAF7] border border-[#0B1F33]/8">
              <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-bold">
                Departure
              </span>
              <span className="text-[#0B1F33] font-semibold mt-0.5 block truncate" title={pkg.departureFrom}>
                {pkg.departureFrom}
              </span>
            </div>
          )}

          {/* Stay */}
          {staySummary && (
            <div className="p-2.5 rounded-xs bg-[#FAFAF7] border border-[#0B1F33]/8">
              <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-bold">
                Stay Style
              </span>
              <span className="text-[#0B1F33] font-semibold mt-0.5 block truncate" title={staySummary}>
                {staySummary}
              </span>
            </div>
          )}

          {/* Transport */}
          {transportSummary && (
            <div className="p-2.5 rounded-xs bg-[#FAFAF7] border border-[#0B1F33]/8">
              <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-bold">
                Transit
              </span>
              <span className="text-[#0B1F33] font-semibold mt-0.5 block truncate" title={transportSummary}>
                {transportSummary}
              </span>
            </div>
          )}

          {/* Meals */}
          {mealsSummary && (
            <div className="p-2.5 rounded-xs bg-[#FAFAF7] border border-[#0B1F33]/8">
              <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-bold">
                Meals
              </span>
              <span className="text-[#0B1F33] font-semibold mt-0.5 block truncate" title={mealsSummary}>
                {mealsSummary}
              </span>
            </div>
          )}

          {/* Altitude or Frequency */}
          {pkg.elevation ? (
            <div className="p-2.5 rounded-xs bg-[#FAFAF7] border border-[#0B1F33]/8">
              <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-bold">
                Altitude
              </span>
              <span className="text-[#0B1F33] font-semibold mt-0.5 block truncate">
                {pkg.elevation}
              </span>
            </div>
          ) : pkg.frequency ? (
            <div className="p-2.5 rounded-xs bg-[#FAFAF7] border border-[#0B1F33]/8">
              <span className="text-[10px] uppercase tracking-wider text-[#4F5E6E] block font-bold">
                Schedule
              </span>
              <span className="text-[#0B1F33] font-semibold mt-0.5 block truncate">
                {pkg.frequency}
              </span>
            </div>
          ) : null}
        </div>

        {/* Full Route String if available */}
        {routeString && (
          <div className="pt-2 text-xs text-[#4F5E6E] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="font-semibold text-[#0B1F33] shrink-0 text-[10px] uppercase tracking-wider">
              Circuit:
            </span>
            <span className="truncate">{routeString}</span>
          </div>
        )}
      </div>

      {/* ──────────────── 12. DAY NAVIGATION BAR (Mobile-scrollable & Desktop tabs) ──────────────── */}
      {daysCount > 1 && (
        <div className="sticky top-14 z-20 bg-[#FAFAF7]/95 backdrop-blur-md py-2 border-y border-[#0B1F33]/10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] shrink-0 mr-1 hidden sm:inline">
              Jump to:
            </span>
            {pkg.itinerary.map((day) => {
              const isActive = activeDayTab === day.day;
              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => scrollToDay(day.day)}
                  className={`px-3.5 py-2 min-h-[40px] flex items-center justify-center rounded-xs text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'bg-white hover:bg-[#E8E8E1] text-[#0B1F33] border border-[#0B1F33]/10'
                  }`}
                >
                  Day {day.day < 10 ? `0${day.day}` : day.day}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ──────────────── 2. REUSABLE DAY CARDS LIST ──────────────── */}
      <div className="space-y-6">
        {pkg.itinerary.map((day) => {
          // Dynamic image selection from day or cycling package gallery
          const dayImage =
            day.image ||
            (pkg.galleryImages && pkg.galleryImages.length > 0
              ? pkg.galleryImages[(day.day - 1) % pkg.galleryImages.length]
              : pkg.coverImage);

          const isExpanded = !!expandedDays[day.day];

          return (
            <ItineraryDayCard
              key={day.day}
              day={day}
              pkg={pkg}
              dayImage={dayImage}
              isExpanded={isExpanded}
              onToggleExpand={() => toggleDayExpand(day.day)}
            />
          );
        })}
      </div>
    </section>
  );
};
