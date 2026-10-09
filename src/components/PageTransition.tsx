import React, { useState, useEffect, useRef } from 'react';

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

const OVERLAY_ENTER_MS = 420;
const SWAP_DELAY_MS    = 250;
const OVERLAY_EXIT_MS  = 450;

/**
 * Premium full-screen page transition.
 *
 * 1. Slides a branded overlay curtain over the current page
 * 2. Swaps in the new page content behind it & scrolls to top
 * 3. Slides the overlay away to reveal the fresh page
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  routeKey,
  children,
}) => {
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [displayedKey, setDisplayedKey] = useState(routeKey);
  const [phase, setPhase] = useState<TransitionPhase>('idle');

  // Refs to hold latest values without causing effect re-runs
  const latestChildren = useRef(children);
  const latestKey = useRef(routeKey);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Always keep refs up to date
  latestChildren.current = children;
  latestKey.current = routeKey;

  // ── Effect 1: Update children in-place when on the same route ──
  useEffect(() => {
    if (routeKey === displayedKey) {
      setDisplayedChildren(children);
    }
  }, [children, routeKey, displayedKey]);

  // ── Effect 2: Run transition when route changes ──
  // ONLY depends on routeKey so phase changes don't retrigger/kill the chain
  useEffect(() => {
    // On first mount, displayedKey is set from initial routeKey, so this won't fire.
    // On subsequent route changes, displayedKey is still the OLD route.
    if (routeKey === displayedKey) return;

    // Clear any previous transition chain
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // ── Step 1: Overlay slides in ──
    setPhase('overlay-enter');

    const t1 = setTimeout(() => {
      // ── Step 2: Swap content behind overlay ──
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      setDisplayedChildren(latestChildren.current);
      setDisplayedKey(latestKey.current);
      setPhase('swapping');

      const t2 = setTimeout(() => {
        // ── Step 3: Overlay slides out ──
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase('overlay-exit');

            const t3 = setTimeout(() => {
              // ── Step 4: Done ──
              setPhase('idle');
            }, OVERLAY_EXIT_MS);
            timeoutsRef.current.push(t3);
          });
        });
      }, SWAP_DELAY_MS);
      timeoutsRef.current.push(t2);
    }, OVERLAY_ENTER_MS);
    timeoutsRef.current.push(t1);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  // Content fade style
  const contentStyle: React.CSSProperties =
    phase === 'overlay-exit'
      ? {
          opacity: 1,
          transform: 'translateY(0)',
          transition: `opacity ${OVERLAY_EXIT_MS}ms ease-out, transform ${OVERLAY_EXIT_MS}ms ease-out`,
        }
      : phase === 'swapping'
      ? { opacity: 0, transform: 'translateY(12px)' }
      : { opacity: 1, transform: 'translateY(0)' };

  return (
    <>
      <div style={contentStyle}>{displayedChildren}</div>
      <TransitionOverlay phase={phase} />
    </>
  );
};


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Overlay — the branded loading curtain
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const TransitionOverlay: React.FC<{ phase: TransitionPhase }> = ({ phase }) => {
  if (phase === 'idle') return null;

  const panelStyle: React.CSSProperties = {
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
      ? { transform: 'translateY(0)', opacity: 1 }
      : phase === 'overlay-exit'
      ? {
          transform: 'translateY(-100%)',
          opacity: 1,
          transition: `transform ${OVERLAY_EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }
      : { transform: 'translateY(100%)', opacity: 0 }
    ),
  };

  const showContent = phase === 'overlay-enter' || phase === 'swapping';

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      <div style={panelStyle}>
        {/* Centered brand */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            opacity: showContent ? 1 : 0,
            transition: 'opacity 150ms ease',
          }}
        >
          {/* Brand name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: showContent
                ? 'ptBrandEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both'
                : 'none',
            }}
          >
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

          {/* Progress bar */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'rgba(250, 250, 247, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              animation: showContent
                ? 'ptBrandEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both'
                : 'none',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #A3B899, #5A5A40)',
                borderRadius: '2px',
                animation: showContent
                  ? 'ptProgressFill 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both'
                  : 'none',
              }}
            />
          </div>

          {/* Tagline */}
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(163, 184, 153, 0.6)',
              animation: showContent
                ? 'ptBrandEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both'
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
