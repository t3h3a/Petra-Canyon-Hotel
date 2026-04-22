import type { RoomKey } from "@/data";

export type ApiRoom = {
  id: number;
  roomNumber: string;
  roomType: string;
  price: number;
  capacity: number;
  description: string;
  availability: string;
};

export type BookingSummary = {
  id: number;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
  bookingStatus: string;
  createdAt: string;
};

type ApiEnvelope = {
  ok?: boolean;
  message?: string;
  csrfToken?: string;
};

const configuredApiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "");
const productionFallbackApiUrl = "https://petra-canyon-hotel-api.onrender.com";
const browserHostname = typeof window !== "undefined" ? window.location.hostname : "";
const isLocalBrowser = import.meta.env.DEV || ["localhost", "127.0.0.1"].includes(browserHostname);
const isLocalApiUrl = (value?: string) => Boolean(value && /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(value));

export const API_BASE_URL =
  configuredApiBaseUrl && (!isLocalApiUrl(configuredApiBaseUrl) || isLocalBrowser)
    ? configuredApiBaseUrl
    : isLocalBrowser
      ? ""
      : productionFallbackApiUrl;

export const apiRoomTypeToKey: Record<string, RoomKey> = {
  "Standard Single Room": "standardSingle",
  "Standard Double Room": "standardDouble",
  "Standard Twin Room": "standardTwin",
  "Deluxe Double Room": "deluxeDouble",
  "Deluxe Twin Room": "deluxeTwin",
  "Triple Room": "superiorTriple",
  Suite: "suite",
  "Presidential Suite": "presidentialSuite",
};

export const roomKeyToApiType: Record<RoomKey, string> = {
  standardSingle: "Standard Single Room",
  standardDouble: "Standard Double Room",
  standardTwin: "Standard Twin Room",
  deluxeDouble: "Deluxe Double Room",
  deluxeTwin: "Deluxe Twin Room",
  superiorTriple: "Triple Room",
  suite: "Suite",
  presidentialSuite: "Presidential Suite",
};

let csrfToken = "";
let csrfTokenPromise: Promise<string> | null = null;

export function setCsrfToken(token?: string | null) {
  csrfToken = token ?? "";
}

export function getCsrfToken() {
  return csrfToken;
}

async function ensureCsrfToken(): Promise<void> {
  // If we already have a token, no need to fetch
  if (csrfToken) {
    return;
  }

  // If a request is already in progress, wait for it
  if (csrfTokenPromise) {
    await csrfTokenPromise;
    return;
  }

  // Fetch a new CSRF token
  csrfTokenPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: "include",
      });
      const data = (await response.json().catch(() => null)) as (ApiEnvelope) | null;
      if (data?.csrfToken) {
        setCsrfToken(data.csrfToken);
      }
      return csrfToken;
    } finally {
      csrfTokenPromise = null;
    }
  })();

  await csrfTokenPromise;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers ?? {});

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // For POST/PUT/PATCH requests, ensure we have a CSRF token
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    await ensureCsrfToken();
    if (csrfToken) {
      headers.set("X-CSRFToken", csrfToken);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });

  const data = (await response.json().catch(() => null)) as (T & ApiEnvelope) | null;
  if (data?.csrfToken) {
    setCsrfToken(data.csrfToken);
  }

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  if (!data) {
    throw new Error("Empty server response.");
  }

  return data;
}

export async function fetchApiRooms(): Promise<ApiRoom[]> {
  const data = await apiRequest<{ ok: boolean; rooms: ApiRoom[] }>("/api/rooms", {
    method: "GET",
  });

  if (!data.ok || !Array.isArray(data.rooms)) {
    throw new Error("Invalid rooms payload.");
  }

  return data.rooms;
}
