import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { hotelLocationInfo as defaultHotelLocationInfo } from "@/data/hotelInfo";
import { roomCatalog as defaultRoomCatalog, type RoomCatalogItem } from "@/data/roomsData";

export type LocalizedText = { en: string; ar: string; fr: string };

export type HomePageCard = {
  href: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type HomePageContent = {
  badge: LocalizedText;
  title: LocalizedText;
  exploreEyebrow: LocalizedText;
  exploreTitle: LocalizedText;
  exploreBody: LocalizedText;
  openPage: LocalizedText;
  featuredEyebrow: LocalizedText;
  diningEyebrow: LocalizedText;
  diningTitle: LocalizedText;
  diningLink: LocalizedText;
  guestsMax: LocalizedText;
  cards: HomePageCard[];
};

export type HotelInfoContent = typeof defaultHotelLocationInfo;

export type SiteContent = {
  hotelInfo: HotelInfoContent;
  homePage: HomePageContent;
  rooms: RoomCatalogItem[];
};

export const defaultHomePageContent: HomePageContent = {
  badge: { en: "Petra Canyon Hotel", ar: "فندق بترا كانيون", fr: "Hotel Petra Canyon" },
  title: { en: "A complete stay experience", ar: "تجربة إقامة متكاملة", fr: "Une expérience de séjour complète" },
  exploreEyebrow: { en: "Explore the hotel", ar: "اكتشف الفندق", fr: "Découvrir l'hôtel" },
  exploreTitle: {
    en: "Each major area now has its own dedicated page",
    ar: "لكل قسم أساسي الآن صفحته الخاصة",
    fr: "Chaque grand espace dispose maintenant de sa propre page",
  },
  exploreBody: {
    en: "Guests can move through rooms, services, dining, and location with much clearer context.",
    ar: "يمكن للضيف الانتقال بين الغرف والمرافق والمطعم والموقع بشكل أوضح وأسهل.",
    fr: "Les clients peuvent parcourir les chambres, les services, la restauration et l'emplacement avec plus de clarté.",
  },
  openPage: { en: "Open page", ar: "افتح الصفحة", fr: "Ouvrir la page" },
  featuredEyebrow: { en: "Featured stay", ar: "إقامة مميزة", fr: "Séjour en vedette" },
  diningEyebrow: { en: "Dining preview", ar: "لمحة عن المطعم", fr: "Aperçu du restaurant" },
  diningTitle: {
    en: "Restaurant storytelling with more depth",
    ar: "عرض المطعم أصبح أعمق وأكثر اكتمالاً",
    fr: "Une présentation du restaurant plus riche",
  },
  diningLink: { en: "View dining page", ar: "اذهب إلى صفحة المطعم", fr: "Voir la page restaurant" },
  guestsMax: { en: "guests max", ar: "ضيوف كحد أقصى", fr: "voyageurs max" },
  cards: [
    {
      href: "/rooms",
      title: { en: "Rooms & Suites", ar: "الغرف والأجنحة", fr: "Chambres & Suites" },
      description: {
        en: "Dedicated room types with stronger comparisons and direct booking paths.",
        ar: "أنواع الغرف مع مقارنة أوضح وصور أفضل ومسار حجز مباشر.",
        fr: "Types de chambres mieux comparés, visuels plus forts et accès direct à la réservation.",
      },
    },
    {
      href: "/amenities",
      title: { en: "Amenities", ar: "المرافق", fr: "Services" },
      description: {
        en: "Wellness, convenience, and travel-support services presented as a premium experience.",
        ar: "الراحة والخدمات ودعم الرحلة معروضة بطريقة تعكس مستوى الفندق.",
        fr: "Bien-être, confort et accompagnement du voyage présentés comme une vraie expérience hôtelière.",
      },
    },
    {
      href: "/restaurant",
      title: { en: "Restaurant", ar: "المطعم", fr: "Restaurant" },
      description: {
        en: "Dining moments, richer imagery, and a clearer sense of atmosphere.",
        ar: "مشاهد طعام أقوى وصور أفضل وأجواء أكثر جاذبية.",
        fr: "Moments culinaires, meilleure imagerie et ambiance plus immersive.",
      },
    },
    {
      href: "/location",
      title: { en: "Location", ar: "الموقع", fr: "Emplacement" },
      description: {
        en: "Nearby landmarks, arrival details, and why the hotel works well for Petra trips.",
        ar: "معالم قريبة وتفاصيل الوصول وأسباب تميز موقع الفندق لزيارة البترا.",
        fr: "Sites proches, informations d'arrivée et atouts du lieu pour visiter Pétra.",
      },
    },
  ],
};

export const defaultSiteContent: SiteContent = {
  hotelInfo: defaultHotelLocationInfo,
  homePage: defaultHomePageContent,
  rooms: defaultRoomCatalog,
};

const ROOMS_API =
  "https://opensheet.elk.sh/1YUsCLjsVjk6MJjHld4Hep3OiOgRQL6MFSVKjUeZMX5s/Rooms";

function mergeSiteContent(partial?: Partial<SiteContent> | null): SiteContent {
  if (!partial) {
    return defaultSiteContent;
  }

  const roomOverrides = Array.isArray(partial.rooms) ? partial.rooms : [];
  const mergedRooms = defaultRoomCatalog.map((room) => {
    const override = roomOverrides.find((item) => item?.key === room.key);
    return override ? { ...room, ...override, image: room.image } : room;
  });

  return {
    hotelInfo: { ...defaultHotelLocationInfo, ...(partial.hotelInfo ?? {}) },
    homePage: {
      ...defaultHomePageContent,
      ...(partial.homePage ?? {}),
      cards: defaultHomePageContent.cards.map((card, index) => ({
        ...card,
        ...(partial.homePage?.cards?.[index] ?? {}),
        title: { ...card.title, ...(partial.homePage?.cards?.[index]?.title ?? {}) },
        description: { ...card.description, ...(partial.homePage?.cards?.[index]?.description ?? {}) },
      })),
    },
    rooms: mergedRooms,
  };
}

type SiteContentContextType = {
  content: SiteContent;
  isLoading: boolean;
  refresh: () => Promise<void>;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
};

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    try {
      const response = await fetch(ROOMS_API);
      const data = await response.json();
      console.log("Rooms:", data);
      setContent(defaultSiteContent);
    } catch {
      setContent(defaultSiteContent);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(ROOMS_API);
        const data = await response.json();
        console.log("Rooms:", data);
        if (!cancelled) {
          setContent(defaultSiteContent);
        }
      } catch {
        if (!cancelled) {
          setContent(defaultSiteContent);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      content,
      isLoading,
      refresh,
      setContent,
    }),
    [content, isLoading],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
