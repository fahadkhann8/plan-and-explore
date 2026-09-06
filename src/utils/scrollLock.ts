import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow = '';

/**
 * Centrally lock body scroll with reference counting.
 * Avoids modal conflict where closing one modal unlocks scrolling while another is open.
 */
export function lockBodyScroll(): void {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

/**
 * Unlock body scroll, restoring original style only when all locks are released.
 */
export function unlockBodyScroll(): void {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow || 'unset';
  }
}

/**
 * React hook to automatically lock body scroll while active,
 * and clean up when unmounted or deactivated.
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;
    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [isLocked]);
}
