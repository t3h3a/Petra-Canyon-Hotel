import { useEffect, useState } from "react";

type RoomApiRow = {
  name_en?: string;
  price?: string;
  extra_bed_allowed?: string;
};

type PolicyApiRow = {
  "Policy Key"?: string;
  Value?: string;
};

export type HotelRoom = {
  roomType: string;
  price: number;
  extraBedAllowed: boolean;
};

export type HotelPolicy = {
  key: string;
  value: string;
};

type HotelDataState = {
  rooms: HotelRoom[];
  policies: HotelPolicy[];
  loading: boolean;
  error: string | null;
};

const ROOMS_API =
  "https://opensheet.elk.sh/1YUsCLjsVjk6MJjHld4Hep3OiOgRQL6MFSVKjUeZMX5s/Rooms";
const POLICIES_API =
  "https://opensheet.elk.sh/1YUsCLjsVjk6MJjHld4Hep3OiOgRQL6MFSVKjUeZMX5s/Policies";

function parsePrice(value: string | undefined) {
  const parsed = Number((value || "").replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseExtraBedAllowed(value: string | undefined) {
  return (value || "").trim().toLowerCase() === "yes";
}

export function useHotelData(): HotelDataState {
  const [state, setState] = useState<HotelDataState>({
    rooms: [],
    policies: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadHotelData() {
      try {
        const [roomsResponse, policiesResponse] = await Promise.all([
          fetch(ROOMS_API),
          fetch(POLICIES_API),
        ]);

        if (!roomsResponse.ok || !policiesResponse.ok) {
          throw new Error("Failed to fetch hotel data.");
        }

        const [roomsJson, policiesJson] = (await Promise.all([
          roomsResponse.json(),
          policiesResponse.json(),
        ])) as [RoomApiRow[], PolicyApiRow[]];
        console.log("Rooms API:", roomsJson);

        const rooms = (Array.isArray(roomsJson) ? roomsJson : [])
          .map((room) => ({
            roomType: room.name_en?.trim() || "",
            price: parsePrice(room.price),
            extraBedAllowed: parseExtraBedAllowed(room.extra_bed_allowed),
          }))
          .filter((room) => room.roomType);

        const policies = (Array.isArray(policiesJson) ? policiesJson : [])
          .map((policy) => ({
            key: policy["Policy Key"]?.trim() || "",
            value: policy.Value?.trim() || "",
          }))
          .filter((policy) => policy.key);

        if (!cancelled) {
          setState({
            rooms,
            policies,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            rooms: [],
            policies: [],
            loading: false,
            error: error instanceof Error ? error.message : "Failed to fetch hotel data.",
          });
        }
      }
    }

    void loadHotelData();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
