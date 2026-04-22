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
  currentPrice: string;
  originalPrice: string;
  taxes: string;
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
    currentPrice: "JOD 50",
    originalPrice: "",
    taxes: "Single occupancy only",
    name: {
      en: "Standard Single Room",
      ar: "غرفة مفردة قياسية",
      fr: "Chambre Simple Standard",
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
      en: "A compact private stay for solo travelers with a single bed, minibar, and all essentials.",
      ar: "إقامة خاصة للمسافر الفردي مع سرير مفرد وميني بار وكل الأساسيات.",
      fr: "Séjour compact et privé pour une personne avec lit simple, minibar et tous les essentiels.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Flat-screen TV", "Minibar"],
      ar: ["الإفطار مشمول", "واي فاي مجاني", "تلفاز بشاشة مسطحة", "ميني بار"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "Télévision à écran plat", "Minibar"],
    },
    mealPlan: { en: "Breakfast included", ar: "الإفطار مشمول", fr: "Petit-déjeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "الدفع في الفندق", fr: "Paiement à l'hôtel" },
    refundPolicy: { en: "Reservation request", ar: "طلب حجز", fr: "Demande de réservation" },
  },
  {
    key: "standardDouble",
    image: siteImages.room,
    size: "29 m²",
    currentPrice: "JOD 60",
    originalPrice: "",
    taxes: "No extra bed",
    name: {
      en: "Standard Double Room",
      ar: "غرفة مزدوجة قياسية",
      fr: "Chambre Double Standard",
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
      en: "A practical standard stay with king bed comfort, air conditioning, minibar, and a private bathroom.",
      ar: "إقامة عملية ومريحة مع سرير مزدوج كبير وتكييف وميني بار وحمام خاص.",
      fr: "Séjour standard confortable avec lit king size, climatisation, minibar et salle de bain privative.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Flat-screen TV", "Soundproofed room"],
      ar: ["الإفطار مشمول", "واي فاي مجاني", "تلفاز بشاشة مسطحة", "غرفة عازلة للصوت"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "Télévision à écran plat", "Chambre insonorisée"],
    },
    mealPlan: { en: "Breakfast included", ar: "الإفطار مشمول", fr: "Petit-déjeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "الدفع في الفندق", fr: "Paiement à l'hôtel" },
    refundPolicy: { en: "Reservation request", ar: "طلب حجز", fr: "Demande de réservation" },
  },
  {
    key: "standardTwin",
    image: siteImages.room,
    size: "29 m²",
    currentPrice: "JOD 60",
    originalPrice: "",
    taxes: "No extra bed",
    name: {
      en: "Standard Twin Room",
      ar: "غرفة توأم قياسية",
      fr: "Chambre Lits Jumeaux Standard",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Twin-bed city-facing stay",
      ar: "إقامة بسريرين مفردين",
      fr: "Séjour twin côté ville",
    },
    description: {
      en: "A standard twin setup with two single beds, soundproofing, minibar, and private bathroom.",
      ar: "غرفة قياسية بسريرين مفردين مع عزل للصوت وميني بار وحمام خاص.",
      fr: "Chambre twin standard avec deux lits simples, insonorisation, minibar et salle de bain privative.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "2 single beds", "Minibar"],
      ar: ["الإفطار مشمول", "واي فاي مجاني", "سريران مفردان", "ميني بار"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "2 lits simples", "Minibar"],
    },
    mealPlan: { en: "Breakfast included", ar: "الإفطار مشمول", fr: "Petit-déjeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "الدفع في الفندق", fr: "Paiement à l'hôtel" },
    refundPolicy: { en: "Reservation request", ar: "طلب حجز", fr: "Demande de réservation" },
  },
  {
    key: "deluxeDouble",
    image: siteImages.hero,
    size: "36 m²",
    currentPrice: "JOD 65",
    originalPrice: "",
    taxes: "1 extra bed available for JOD 15",
    name: {
      en: "Deluxe Double Room",
      ar: "غرفة مزدوجة ديلوكس",
      fr: "Chambre Double Deluxe",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "إطلالة على الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "An upgraded double room with more floor space, scenic views, and polished in-room essentials.",
      ar: "غرفة مزدوجة مطورة بمساحة أوسع وإطلالة جميلة وتجهيزات إقامة أفضل.",
      fr: "Chambre double améliorée avec plus d'espace, belles vues et équipements soignés.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Mountain view", "City view"],
      ar: ["الإفطار مشمول", "واي فاي مجاني", "إطلالة جبل", "إطلالة مدينة"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "Vue montagne", "Vue ville"],
    },
    mealPlan: { en: "Breakfast included", ar: "الإفطار مشمول", fr: "Petit-déjeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "الدفع في الفندق", fr: "Paiement à l'hôtel" },
    refundPolicy: { en: "Reservation request", ar: "طلب حجز", fr: "Demande de réservation" },
    availability: { en: "Only 1 left", ar: "متبقي واحدة فقط", fr: "Plus qu'une disponible" },
  },
  {
    key: "deluxeTwin",
    image: siteImages.hero,
    size: "36 m²",
    currentPrice: "JOD 65",
    originalPrice: "",
    taxes: "1 extra bed available for JOD 15",
    name: {
      en: "Deluxe Twin Room",
      ar: "غرفة توأم ديلوكس",
      fr: "Chambre Lits Jumeaux Deluxe",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "إطلالة على الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A flexible twin room with two single beds, wider layout, and all core comforts.",
      ar: "غرفة مرنة بسريرين مفردين ومساحة أوسع وجميع وسائل الراحة الأساسية.",
      fr: "Chambre twin flexible avec deux lits simples, plus d'espace et tout le confort essentiel.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "2 single beds", "Soundproofed room"],
      ar: ["الإفطار مشمول", "واي فاي مجاني", "سريران مفردان", "غرفة عازلة للصوت"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "2 lits simples", "Chambre insonorisée"],
    },
    mealPlan: { en: "Breakfast included", ar: "الإفطار مشمول", fr: "Petit-déjeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "الدفع في الفندق", fr: "Paiement à l'hôtel" },
    refundPolicy: { en: "Reservation request", ar: "طلب حجز", fr: "Demande de réservation" },
  },
  {
    key: "superiorTriple",
    image: siteImages.room,
    size: "39 m²",
    currentPrice: "JOD 85",
    originalPrice: "",
    taxes: "Extra bed available for JOD 15",
    name: {
      en: "Triple Room",
      ar: "غرفة ثلاثية",
      fr: "Chambre Triple",
    },
    occupancy: {
      en: "Sleeps 3",
      ar: "تتسع لثلاثة أشخاص",
      fr: "Pour 3 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "إطلالة على الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A practical triple room with three single beds and a layout that works well for small groups.",
      ar: "غرفة ثلاثية عملية مع ثلاثة أسرّة مفردة ومساحة مناسبة للمجموعات الصغيرة.",
      fr: "Chambre triple pratique avec trois lits simples et une configuration idéale pour les petits groupes.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "3 single beds", "Flat-screen TV"],
      ar: ["الإفطار مشمول", "واي فاي مجاني", "3 أسرّة مفردة", "تلفاز بشاشة مسطحة"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "3 lits simples", "Télévision à écran plat"],
    },
    mealPlan: { en: "Breakfast included", ar: "الإفطار مشمول", fr: "Petit-déjeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "الدفع في الفندق", fr: "Paiement à l'hôtel" },
    refundPolicy: { en: "Reservation request", ar: "طلب حجز", fr: "Demande de réservation" },
  },
  {
    key: "suite",
    image: siteImages.pool,
    size: "63 m²",
    currentPrice: "JOD 105",
    originalPrice: "",
    taxes: "1 extra bed available for JOD 15",
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
      en: "Mountain and city view",
      ar: "إطلالة على الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A roomy suite with a separate living area, king bedroom, sofa bed, and more privacy.",
      ar: "جناح واسع مع غرفة معيشة منفصلة وغرفة نوم بسرير كبير وخصوصية أكبر.",
      fr: "Suite spacieuse avec salon séparé, chambre king size et plus d'intimité.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Separate living room", "Sofa bed"],
      ar: ["الإفطار مشمول", "واي فاي مجاني", "غرفة معيشة منفصلة", "سرير أريكة"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "Salon séparé", "Canapé-lit"],
    },
    mealPlan: { en: "Breakfast included", ar: "الإفطار مشمول", fr: "Petit-déjeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "الدفع في الفندق", fr: "Paiement à l'hôtel" },
    refundPolicy: { en: "Reservation request", ar: "طلب حجز", fr: "Demande de réservation" },
    availability: { en: "Only 3 left", ar: "متبقي 3 فقط", fr: "Plus que 3 disponibles" },
  },
  {
    key: "presidentialSuite",
    image: siteImages.pool,
    size: "68 m²",
    currentPrice: "JOD 150",
    originalPrice: "",
    taxes: "1 extra bed available for JOD 15",
    name: {
      en: "Presidential Suite",
      ar: "الجناح الرئاسي",
      fr: "Suite Présidentielle",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Private suite with premium layout",
      ar: "جناح خاص بمخطط فاخر",
      fr: "Suite privée haut de gamme",
    },
    description: {
      en: "The hotel's most premium suite with a large king bedroom, living area, sofa bed, and private kitchen.",
      ar: "أفخم جناح في الفندق مع غرفة نوم كبيرة ومنطقة معيشة وسرير أريكة ومطبخ خاص.",
      fr: "La suite la plus premium de l'hôtel avec grande chambre king size, salon, canapé-lit et cuisine privée.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Private kitchen", "Private suite"],
      ar: ["الإفطار مشمول", "واي فاي مجاني", "مطبخ خاص", "جناح خاص"],
      fr: ["Petit-déjeuner inclus", "Wi-Fi gratuit", "Cuisine privée", "Suite privée"],
    },
    mealPlan: { en: "Breakfast included", ar: "الإفطار مشمول", fr: "Petit-déjeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "الدفع في الفندق", fr: "Paiement à l'hôtel" },
    refundPolicy: { en: "Reservation request", ar: "طلب حجز", fr: "Demande de réservation" },
    availability: { en: "Only 2 left", ar: "متبقي 2 فقط", fr: "Plus que 2 disponibles" },
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
