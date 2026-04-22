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

export const API_BASE_URL = configuredApiBaseUrl || (import.meta.env.DEV ? "" : productionFallbackApiUrl);

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

export function setCsrfToken(token?: string | null) {
  csrfToken = token ?? "";
}

export function getCsrfToken() {
  return csrfToken;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers ?? {});

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!["GET", "HEAD", "OPTIONS"].includes(method) && csrfToken) {
    headers.set("X-CSRFToken", csrfToken);
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
