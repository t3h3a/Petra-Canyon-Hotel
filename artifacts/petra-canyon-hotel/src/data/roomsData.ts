import type { Language } from "@/lib/i18n";
import { siteImages } from "./hotelInfo";

type LocalizedText = Record<Language, string>;
type LocalizedList = Record<Language, string[]>;

export type RoomKey =
  | "standardDouble"
  | "deluxeDouble"
  | "deluxeTwin"
  | "suite"
  | "presidentialSuite"
  | "superiorTriple"
  | "standardSingle"
  | "standardTwin";

export type RoomCatalogItem = {
  key: RoomKey;
  image: string;
  size: string;
  name: LocalizedText;
  occupancy: LocalizedText;
  view: LocalizedText;
  description: LocalizedText;
  perks: LocalizedList;
  mealPlan: LocalizedText;
  payment: LocalizedText;
  refundPolicy: LocalizedText;
  availability?: Partial<LocalizedText>;
};

export const roomCatalog: RoomCatalogItem[] = [
  {
    key: "standardSingle",
    image: siteImages.room,
    size: "22 m²",
    name: {
      en: "Single",
      ar: "غرفة مفردة",
      fr: "Chambre simple",
    },
    occupancy: {
      en: "Sleeps 1",
      ar: "تتسع لشخص واحد",
      fr: "Pour 1 personne",
    },
    view: {
      en: "Mountain and city view",
      ar: "إطلالة على الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A compact private room for one guest with all essentials.",
      ar: "غرفة مريحة لشخص واحد مع جميع الخدمات الأساسية.",
      fr: "Une chambre compacte pour une personne avec tous les essentiels.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "TV", "Minibar"],
      ar: ["إفطار مشمول", "واي فاي مجاني", "تلفاز", "ميني بار"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "TV", "Minibar"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Pay at the hotel",
      ar: "الدفع في الفندق",
      fr: "Paiement à l'hôtel",
    },
    refundPolicy: {
      en: "Reservation request",
      ar: "طلب حجز",
      fr: "Demande de réservation",
    },
  },

  {
    key: "standardDouble",
    image: siteImages.room,
    size: "29 m²",
    name: {
      en: "Standard Twin/Double",
      ar: "غرفة مزدوجة / توين",
      fr: "Chambre double",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "King bed",
      ar: "سرير مزدوج كبير",
      fr: "Lit king size",
    },
    description: {
      en: "A comfortable room suitable for two guests.",
      ar: "غرفة مريحة مناسبة لشخصين مع سرير مزدوج أو سريرين منفصلين.",
      fr: "Une chambre confortable pour deux personnes.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "TV", "Private bathroom"],
      ar: ["إفطار مشمول", "واي فاي مجاني", "تلفاز", "حمام خاص"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "TV", "Salle de bain privée"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Pay at the hotel",
      ar: "الدفع في الفندق",
      fr: "Paiement à l'hôtel",
    },
    refundPolicy: {
      en: "Reservation request",
      ar: "طلب حجز",
      fr: "Demande de réservation",
    },
  },

  {
    key: "deluxeDouble",
    image: siteImages.hero,
    size: "36 m²",
    name: {
      en: "Deluxe Twin/Double",
      ar: "غرفة ديلوكس مزدوجة / توين",
      fr: "Chambre deluxe",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain view",
      ar: "إطلالة على الجبل",
      fr: "Vue montagne",
    },
    description: {
      en: "A spacious upgraded room with better comfort.",
      ar: "غرفة واسعة وأكثر راحة مع إمكانية إضافة سرير إضافي.",
      fr: "Une chambre spacieuse et confortable.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "View", "Extra space"],
      ar: ["إفطار مشمول", "واي فاي مجاني", "إطلالة", "مساحة أكبر"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "Vue", "Espace supplémentaire"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Pay at the hotel",
      ar: "الدفع في الفندق",
      fr: "Paiement à l'hôtel",
    },
    refundPolicy: {
      en: "Reservation request",
      ar: "طلب حجز",
      fr: "Demande de réservation",
    },
  },

  {
    key: "superiorTriple",
    image: siteImages.room,
    size: "39 m²",
    name: {
      en: "Triple",
      ar: "غرفة ثلاثية",
      fr: "Chambre triple",
    },
    occupancy: {
      en: "Sleeps 3",
      ar: "تتسع لثلاثة أشخاص",
      fr: "Pour 3 personnes",
    },
    view: {
      en: "Mountain view",
      ar: "إطلالة على الجبل",
      fr: "Vue montagne",
    },
    description: {
      en: "A room suitable for three guests.",
      ar: "غرفة مناسبة لثلاثة أشخاص مع مساحة مريحة.",
      fr: "Chambre pour trois personnes.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "3 beds", "TV"],
      ar: ["إفطار مشمول", "واي فاي مجاني", "3 أسرّة", "تلفاز"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "3 lits", "TV"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Pay at the hotel",
      ar: "الدفع في الفندق",
      fr: "Paiement à l'hôtel",
    },
    refundPolicy: {
      en: "Reservation request",
      ar: "طلب حجز",
      fr: "Demande de réservation",
    },
  },

  {
    key: "suite",
    image: siteImages.pool,
    size: "63 m²",
    name: {
      en: "Suite",
      ar: "جناح",
      fr: "Suite",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain view",
      ar: "إطلالة على الجبل",
      fr: "Vue montagne",
    },
    description: {
      en: "A large suite with extra comfort.",
      ar: "جناح واسع يوفر راحة إضافية ومساحة أكبر.",
      fr: "Suite spacieuse avec plus de confort.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Living room", "Sofa"],
      ar: ["إفطار مشمول", "واي فاي مجاني", "غرفة معيشة", "أريكة"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "Salon", "Canapé"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Pay at the hotel",
      ar: "الدفع في الفندق",
      fr: "Paiement à l'hôtel",
    },
    refundPolicy: {
      en: "Reservation request",
      ar: "طلب حجز",
      fr: "Demande de réservation",
    },
  },

  {
    key: "presidentialSuite",
    image: siteImages.pool,
    size: "68 m²",
    name: {
      en: "Presidential Suite",
      ar: "جناح رئاسي",
      fr: "Suite présidentielle",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Premium view",
      ar: "إطلالة مميزة",
      fr: "Vue premium",
    },
    description: {
      en: "The most luxurious suite in the hotel.",
      ar: "أفخم جناح في الفندق مع أعلى مستوى من الراحة والخدمات.",
      fr: "La suite la plus luxueuse de l'hôtel.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Private suite", "Luxury services"],
      ar: ["إفطار مشمول", "واي فاي مجاني", "جناح خاص", "خدمات فاخرة"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "Suite privée", "Services premium"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Pay at the hotel",
      ar: "الدفع في الفندق",
      fr: "Paiement à l'hôtel",
    },
    refundPolicy: {
      en: "Reservation request",
      ar: "طلب حجز",
      fr: "Demande de réservation",
    },
  },
];

export function getLocalizedRoom(room: RoomCatalogItem, language: Language) {
  return {
    ...room,
    name: room.name[language],
    occupancy: room.occupancy[language],
    view: room.view[language],
    description: room.description[language],
    perks: room.perks[language],
    mealPlan: room.mealPlan[language],
    payment: room.payment[language],
    refundPolicy: room.refundPolicy[language],
    availability: room.availability?.[language] ?? "",
  };
}