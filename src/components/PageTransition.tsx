import React, { useEffect } from 'react';

interface PageTransitionProps {
  routeKey: string;
  children: React.ReactNode;
}

/**
 * Instant page transition:
 * Swaps to the new page instantly with 0ms delay, resetting scroll to top,
 * and plays a crisp, fast CSS fade-in animation (~200ms) for an ultra-snappy experience.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  routeKey,
  children,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [routeKey]);

  return (
    <div key={routeKey} className="animate-page-enter w-full">
      {children}
    </div>
  );
};
