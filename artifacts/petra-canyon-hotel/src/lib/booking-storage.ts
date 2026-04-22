import type { BookingSummary } from "@/lib/hotel-api";

function getStorageKey(userKey: string) {
  return `petra-canyon-bookings:${userKey}`;
}

export function readStoredBookings(userKey: string): BookingSummary[] {
  if (typeof window === "undefined" || !userKey) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(getStorageKey(userKey));
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as BookingSummary[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendStoredBookings(userKey: string, bookings: BookingSummary[]) {
  if (typeof window === "undefined" || !userKey || bookings.length === 0) {
    return;
  }

  const existing = readStoredBookings(userKey);
  const merged = [...bookings, ...existing].filter(
    (booking, index, items) => items.findIndex((item) => item.id === booking.id) === index,
  );

  window.localStorage.setItem(getStorageKey(userKey), JSON.stringify(merged));
}
