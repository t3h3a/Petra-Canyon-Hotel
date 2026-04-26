import { useEffect, useState } from "react";

import type { Language } from "@/lib/i18n";
import type { RoomKey } from "@/data";

type SheetRoomRow = {
  id?: string;
  "Room Type"?: string;
  Price?: string;
  "Extra Bed Allowed"?: string;
};

type SheetPolicyRow = {
  "Policy Key"?: string;
  Value?: string;
};

export type RoomSheetSettings = {
  price: number;
  extraBedAllowed: boolean;
};

type SheetRoomState = {
  roomSettings: Record<RoomKey, RoomSheetSettings>;
  extraBedPrice: number;
  isLoading: boolean;
  error: string | null;
};

export const DEFAULT_ROOM_SHEET_SETTINGS: Record<RoomKey, RoomSheetSettings> = {
  standardSingle: { price: 50, extraBedAllowed: false },
  standardDouble: { price: 60, extraBedAllowed: false },
  standardTwin: { price: 60, extraBedAllowed: false },
  deluxeDouble: { price: 65, extraBedAllowed: true },
  deluxeTwin: { price: 65, extraBedAllowed: true },
  superiorTriple: { price: 85, extraBedAllowed: true },
  suite: { price: 105, extraBedAllowed: true },
  presidentialSuite: { price: 150, extraBedAllowed: true },
};

export const ROOM_INCLUDED_GUESTS: Record<RoomKey, number> = {
  standardSingle: 1,
  standardDouble: 2,
  standardTwin: 2,
  deluxeDouble: 2,
  deluxeTwin: 2,
  superiorTriple: 3,
  suite: 2,
  presidentialSuite: 2,
};

export const ROOM_MAX_GUESTS: Record<RoomKey, number> = {
  standardSingle: 1,
  standardDouble: 2,
  standardTwin: 2,
  deluxeDouble: 3,
  deluxeTwin: 3,
  superiorTriple: 4,
  suite: 3,
  presidentialSuite: 3,
};

const DEFAULT_EXTRA_BED_PRICE = 15;
const roomsEndpoint =
  "https://opensheet.elk.sh/1YUsCLjsVjk6MJjHld4Hep3OiOgRQL6MFSVKjUeZMX5s/Rooms";
const policiesEndpoint =
  "https://opensheet.elk.sh/1YUsCLjsVjk6MJjHld4Hep3OiOgRQL6MFSVKjUeZMX5s/Policies";

const roomIdMap: Record<string, RoomKey[]> = {
  single: ["standardSingle"],
  standard: ["standardDouble", "standardTwin"],
  deluxe: ["deluxeDouble", "deluxeTwin"],
  triple: ["superiorTriple"],
  suite: ["suite"],
  presidential: ["presidentialSuite"],
};

const roomTypeAliasMap: Record<string, RoomKey[]> = {
  single: ["standardSingle"],
  standardsingle: ["standardSingle"],
  standardsingleroom: ["standardSingle"],
  double: ["standardDouble"],
  standarddouble: ["standardDouble"],
  standarddoubleroom: ["standardDouble"],
  twin: ["standardTwin"],
  standardtwin: ["standardTwin"],
  standardtwinroom: ["standardTwin"],
  standardtwindouble: ["standardDouble", "standardTwin"],
  deluxedouble: ["deluxeDouble"],
  deluxedoubleroom: ["deluxeDouble"],
  deluxetwin: ["deluxeTwin"],
  deluxetwinroom: ["deluxeTwin"],
  deluxetwindouble: ["deluxeDouble", "deluxeTwin"],
  triple: ["superiorTriple"],
  tripleroom: ["superiorTriple"],
  superiortriple: ["superiorTriple"],
  suite: ["suite"],
  presidentialsuite: ["presidentialSuite"],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBooleanFlag(value: string | undefined, fallback: boolean) {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  if (["yes", "true", "1"].includes(normalized)) {
    return true;
  }
  if (["no", "false", "0"].includes(normalized)) {
    return false;
  }
  return fallback;
}

function mapRoomRowToKeys(row: SheetRoomRow): RoomKey[] {
  const idKeys = row.id ? roomIdMap[normalize(row.id)] : undefined;
  if (idKeys) {
    return idKeys;
  }

  return row["Room Type"] ? roomTypeAliasMap[normalize(row["Room Type"])] ?? [] : [];
}

export function formatRoomPrice(price: number) {
  return `JOD ${price}`;
}

export function getEffectiveRoomCapacity(roomKey: RoomKey, settings: RoomSheetSettings) {
  return settings.extraBedAllowed ? ROOM_MAX_GUESTS[roomKey] : ROOM_INCLUDED_GUESTS[roomKey];
}

export function getRoomPolicyText(language: Language, roomKey: RoomKey, settings: RoomSheetSettings, extraBedPrice: number) {
  const includedGuests = ROOM_INCLUDED_GUESTS[roomKey];
  const effectiveCapacity = getEffectiveRoomCapacity(roomKey, settings);

  if (!settings.extraBedAllowed) {
    if (language === "ar") {
      return `تتسع لعدد ${effectiveCapacity} فقط، ولا تسمح بسرير إضافي.`;
    }
    if (language === "fr") {
      return `Capacité de ${effectiveCapacity} personne(s) uniquement, sans lit supplémentaire.`;
    }
    return `Fits ${effectiveCapacity} guest(s) only, with no extra bed allowed.`;
  }

  if (language === "ar") {
    return `السعة الأساسية ${includedGuests} مع إمكانية سرير إضافي مقابل ${extraBedPrice} JOD حتى حد ${effectiveCapacity} ضيوف.`;
  }
  if (language === "fr") {
    return `Base de ${includedGuests} voyageur(s), avec lit supplémentaire à ${extraBedPrice} JOD jusqu'à ${effectiveCapacity} voyageurs.`;
  }
  return `Base capacity ${includedGuests}, with an extra bed for JOD ${extraBedPrice} up to ${effectiveCapacity} guests.`;
}

export function getRoomBadgeText(language: Language, settings: RoomSheetSettings, extraBedPrice: number) {
  if (!settings.extraBedAllowed) {
    if (language === "ar") {
      return "لا يوجد سرير إضافي";
    }
    if (language === "fr") {
      return "Pas de lit supplémentaire";
    }
    return "No extra bed";
  }

  if (language === "ar") {
    return `سرير إضافي مقابل ${extraBedPrice} JOD`;
  }
  if (language === "fr") {
    return `Lit supplémentaire ${extraBedPrice} JOD`;
  }
  return `Extra bed JOD ${extraBedPrice}`;
}

export function getRoomExtraBedNotice(language: Language, settings: RoomSheetSettings, extraBedPrice: number) {
  if (!settings.extraBedAllowed) {
    if (language === "ar") {
      return "هذا النوع من الغرف لا يدعم سريراً إضافياً.";
    }
    if (language === "fr") {
      return "Ce type de chambre ne permet pas l'ajout d'un lit supplémentaire.";
    }
    return "This room type does not allow an extra bed.";
  }

  if (language === "ar") {
    return `أي ضيف إضافي ضمن السعة المسموحة يحتاج إلى سرير إضافي برسوم ${extraBedPrice} JOD.`;
  }
  if (language === "fr") {
    return `Tout voyageur supplémentaire dans la capacité autorisée nécessite un lit supplémentaire à ${extraBedPrice} JOD.`;
  }
  return `Any extra guest within the allowed capacity requires an extra bed for JOD ${extraBedPrice}.`;
}

export function useSheetRoomData(): SheetRoomState {
  const [state, setState] = useState<SheetRoomState>({
    roomSettings: DEFAULT_ROOM_SHEET_SETTINGS,
    extraBedPrice: DEFAULT_EXTRA_BED_PRICE,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadSheetData() {
      try {
        const [roomsResponse, policiesResponse] = await Promise.all([
          fetch(roomsEndpoint),
          fetch(policiesEndpoint),
        ]);

        if (!roomsResponse.ok || !policiesResponse.ok) {
          throw new Error("Unable to fetch Google Sheets data.");
        }

        const [roomsData, policiesData] = (await Promise.all([
          roomsResponse.json(),
          policiesResponse.json(),
        ])) as [SheetRoomRow[], SheetPolicyRow[]];
        console.log("Rooms:", roomsData);

        const nextSettings: Record<RoomKey, RoomSheetSettings> = {
          ...DEFAULT_ROOM_SHEET_SETTINGS,
        };

        for (const row of Array.isArray(roomsData) ? roomsData : []) {
          const roomKeys = mapRoomRowToKeys(row);
          if (!roomKeys.length) {
            continue;
          }

          for (const roomKey of roomKeys) {
            nextSettings[roomKey] = {
              price: parseNumber(row.Price, nextSettings[roomKey].price),
              extraBedAllowed: toBooleanFlag(row["Extra Bed Allowed"], nextSettings[roomKey].extraBedAllowed),
            };
          }
        }

        const extraBedPolicyRow = (Array.isArray(policiesData) ? policiesData : []).find(
          (row) => row["Policy Key"]?.trim().toLowerCase() === "extra_bed_price",
        );
        const nextExtraBedPrice = parseNumber(extraBedPolicyRow?.Value, DEFAULT_EXTRA_BED_PRICE);

        if (!cancelled) {
          setState({
            roomSettings: nextSettings,
            extraBedPrice: nextExtraBedPrice,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            roomSettings: DEFAULT_ROOM_SHEET_SETTINGS,
            extraBedPrice: DEFAULT_EXTRA_BED_PRICE,
            isLoading: false,
            error: error instanceof Error ? error.message : "Unable to load live room data.",
          });
        }
      }
    }

    void loadSheetData();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
