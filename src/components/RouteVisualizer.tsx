import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface RouteVisualizerProps {
  waypoints: string[];
  destinationName: string;
}

export const RouteVisualizer: React.FC<RouteVisualizerProps> = ({ waypoints, destinationName }) => {
  return (
    <div className="rounded-sm bg-[#F7F6F2] p-4 sm:p-5 border border-[#0B1F33]/10">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h4 className="text-xs uppercase tracking-wider font-bold text-[#0B1F33]">
          Route & Waypoints
        </h4>
        <span className="text-[11px] text-[#5A5A40] font-medium">
          {waypoints.length} stops circuit
        </span>
      </div>

      {/* Waypoints Sequence */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {waypoints.map((point, index) => {
          const isFirst = index === 0;
          const isLast = index === waypoints.length - 1;

          return (
            <React.Fragment key={index}>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-xs font-medium ${
                  isFirst || isLast
                    ? 'bg-[#0B1F33] text-white'
                    : 'bg-white text-[#0B1F33] border border-[#0B1F33]/10'
                }`}
              >
                {isFirst ? (
                  <Navigation className="w-3 h-3 text-[#A3B899]" />
                ) : isLast ? (
                  <MapPin className="w-3 h-3 text-[#A3B899]" />
                ) : null}
                <span>{point}</span>
              </span>

              {index < waypoints.length - 1 && (
                <span className="text-xs text-[#0B1F33]/30 select-none">
                  &rarr;
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

