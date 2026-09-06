import { GOOGLE_SHEET_WEBHOOK_URL } from '../data/packages';

export interface BookingSubmission {
  id: string;
  packageId: string;
  destination: string;
  price: string;
  fullName: string;
  phone: string;
  email: string;
  travelDate: string;
  travelersCount: string;
  specialRequests?: string;
  submittedAt: string;
}

const STORAGE_KEY = 'plan_and_explore_bookings';
const WEBHOOK_STORAGE_KEY = 'plan_and_explore_sheet_webhook';

/**
 * Validate that a URL is a legitimate Google Apps Script Webhook.
 * Prevents arbitrary endpoint redirection or exfiltration.
 */
function isValidWebhookUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url.trim());
    return (
      parsed.protocol === 'https:' &&
      (parsed.hostname === 'script.google.com' || parsed.hostname.endsWith('.googleusercontent.com'))
    );
  } catch {
    return false;
  }
}

export function getActiveWebhookUrl(): string {
  // First check built-in configured URL
  if (GOOGLE_SHEET_WEBHOOK_URL && isValidWebhookUrl(GOOGLE_SHEET_WEBHOOK_URL)) {
    return GOOGLE_SHEET_WEBHOOK_URL.trim();
  }

  // Fallback to validated localStorage override
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(WEBHOOK_STORAGE_KEY);
    if (saved && isValidWebhookUrl(saved)) {
      return saved.trim();
    }
  }

  return '';
}

export function setActiveWebhookUrl(url: string): void {
  if (typeof window !== 'undefined') {
    if (!url || !url.trim()) {
      localStorage.removeItem(WEBHOOK_STORAGE_KEY);
    } else if (isValidWebhookUrl(url)) {
      localStorage.setItem(WEBHOOK_STORAGE_KEY, url.trim());
    }
  }
}

export function getSavedBookings(): BookingSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading bookings from localStorage:', err);
    return [];
  }
}

export async function submitBooking(booking: BookingSubmission): Promise<{ success: boolean; syncedToSheet: boolean }> {
  // 1. Always store locally in browser cache
  try {
    const existing = getSavedBookings();
    existing.unshift(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50))); // Keep last 50
  } catch (err) {
    console.error('Failed to cache booking locally:', err);
  }

  // 2. Transmit to Google Sheet if webhook URL is configured
  const webhook = getActiveWebhookUrl();
  let syncedToSheet = false;

  if (webhook) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

      await fetch(webhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      syncedToSheet = true;
    } catch (error) {
      console.warn('Google Sheet webhook transmission warning (saved locally):', error);
    }
  }

  return { success: true, syncedToSheet };
}
