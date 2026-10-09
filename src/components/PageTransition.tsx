import React, { useState, useEffect, useRef, useCallback } from 'react';

interface PageTransitionProps {
  routeKey: string;
  children: React.ReactNode;
}

type TransitionPhase =
  | 'idle'           // Normal view, no transition
  | 'overlay-enter'  // Overlay sliding in / covering the screen
  | 'swapping'       // Content swap happening behind overlay
  | 'overlay-exit'   // Overlay sliding out, revealing new page
  ;

const OVERLAY_ENTER_MS = 450;  // Time for overlay to fully cover
const SWAP_DELAY_MS    = 300;  // Brief hold on overlay for polish
const OVERLAY_EXIT_MS  = 500;  // Time for overlay to reveal new page

/**
 * Premium full-screen page transition.
 *
 * Instead of a basic fade that scrolls to top mid-blink, this component:
 * 1. Slides a branded overlay curtain over the current page
 * 2. Swaps in the new page content behind it
 * 3. Scrolls to top while hidden
 * 4. Slides the overlay away to reveal the fresh page
 *
 * The result feels like navigating to a completely new page — smooth & polished.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  routeKey,
  children,
}) => {
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [displayedKey, setDisplayedKey] = useState(routeKey);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingChildren = useRef(children);
  const pendingKey = useRef(routeKey);

  // Always keep latest children/key in refs so the swap uses the freshest content
  pendingChildren.current = children;
  pendingKey.current = routeKey;

  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Same route — just update children in-place (no transition)
    if (routeKey === displayedKey) {
      setDisplayedChildren(children);
      return;
    }

    // Don't re-trigger if already transitioning
    if (phase !== 'idle') return;

    // ── Step 1: Slide overlay in ──
    setPhase('overlay-enter');

    timeoutRef.current = setTimeout(() => {
      // ── Step 2: Swap content behind overlay ──
      setPhase('swapping');

      // Scroll to top while overlay covers everything
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

      // Swap in new page content
      setDisplayedChildren(pendingChildren.current);
      setDisplayedKey(pendingKey.current);

      timeoutRef.current = setTimeout(() => {
        // ── Step 3: Slide overlay out ──
        // Use rAF to ensure the browser has painted the new DOM first
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase('overlay-exit');

            timeoutRef.current = setTimeout(() => {
              // ── Step 4: Done ──
              setPhase('idle');
            }, OVERLAY_EXIT_MS);
          });
        });
      }, SWAP_DELAY_MS);
    }, OVERLAY_ENTER_MS);

    return clearPendingTimeout;
  }, [routeKey, children, displayedKey, phase, clearPendingTimeout]);

  // Content fade style — subtle fade-in when overlay exits
  const contentStyle: React.CSSProperties =
    phase === 'overlay-exit'
      ? {
          opacity: 1,
          transform: 'translateY(0)',
          transition: `opacity ${OVERLAY_EXIT_MS}ms ease-out, transform ${OVERLAY_EXIT_MS}ms ease-out`,
        }
      : phase === 'swapping'
      ? {
          opacity: 0,
          transform: 'translateY(12px)',
        }
      : {
          opacity: 1,
          transform: 'translateY(0)',
        };

  return (
    <>
      {/* ── Page content ── */}
      <div style={contentStyle}>{displayedChildren}</div>

      {/* ── Full-screen transition overlay ── */}
      <TransitionOverlay phase={phase} />
    </>
  );
};


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Overlay component — the branded loading curtain
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface OverlayProps {
  phase: TransitionPhase;
}

const TransitionOverlay: React.FC<OverlayProps> = ({ phase }) => {
  if (phase === 'idle') return null;

  // Determine overlay transform
  const getOverlayStyle = (): React.CSSProperties => {
    switch (phase) {
      case 'overlay-enter':
        return {
          transform: 'translateY(0)',
          opacity: 1,
          transition: `transform ${OVERLAY_ENTER_MS}ms cubic-bezier(0.76, 0, 0.24, 1), opacity ${OVERLAY_ENTER_MS * 0.5}ms ease-out`,
        };
      case 'swapping':
        return {
          transform: 'translateY(0)',
          opacity: 1,
        };
      case 'overlay-exit':
        return {
          transform: 'translateY(-100%)',
          opacity: 1,
          transition: `transform ${OVERLAY_EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        };
      default:
        return {
          transform: 'translateY(100%)',
          opacity: 0,
        };
    }
  };

  const isVisible = phase === 'overlay-enter' || phase === 'swapping' || phase === 'overlay-exit';

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {/* Main overlay panel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(145deg, #0B1F33 0%, #162d45 40%, #1a3a2a 100%)',
          willChange: 'transform',
          ...(phase === 'overlay-enter'
            ? {
                transform: 'translateY(0)',
                opacity: 1,
                transition: `transform ${OVERLAY_ENTER_MS}ms cubic-bezier(0.76, 0, 0.24, 1), opacity ${OVERLAY_ENTER_MS * 0.3}ms ease-out`,
              }
            : phase === 'swapping'
            ? {
                transform: 'translateY(0)',
                opacity: 1,
              }
            : phase === 'overlay-exit'
            ? {
                transform: 'translateY(-100%)',
                opacity: 1,
                transition: `transform ${OVERLAY_EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
              }
            : {
                transform: 'translateY(100%)',
                opacity: 0,
              }
          ),
        }}
      >
        {/* ── Centered brand content ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            opacity: phase === 'swapping' || phase === 'overlay-enter' ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        >
          {/* Brand mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: phase === 'overlay-enter' || phase === 'swapping'
                ? 'ptBrandEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both'
                : 'none',
            }}
          >
            {/* Decorative dot */}
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#A3B899',
                boxShadow: '0 0 12px rgba(163, 184, 153, 0.4)',
              }}
            />
            <span
              style={{
                fontFamily: 'Georgia, "Cormorant Garamond", Cambria, serif',
                fontSize: '22px',
                fontWeight: 400,
                color: '#FAFAF7',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Plan & Explore
            </span>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#A3B899',
                boxShadow: '0 0 12px rgba(163, 184, 153, 0.4)',
              }}
            />
          </div>

          {/* Loading progress bar */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'rgba(250, 250, 247, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              animation: phase === 'overlay-enter' || phase === 'swapping'
                ? 'ptBrandEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both'
                : 'none',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #A3B899, #5A5A40)',
                borderRadius: '2px',
                animation: phase !== 'idle'
                  ? 'ptProgressFill 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both'
                  : 'none',
              }}
            />
          </div>

          {/* Subtle tagline */}
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(163, 184, 153, 0.6)',
              animation: phase === 'overlay-enter' || phase === 'swapping'
                ? 'ptBrandEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both'
                : 'none',
            }}
          >
            Loading your journey
          </span>
        </div>

        {/* Decorative gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(90, 90, 64, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(163, 184, 153, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
