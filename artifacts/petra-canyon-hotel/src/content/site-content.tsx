import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Bell,
  Car,
  Coffee,
  Dumbbell,
  GlassWater,
  MapPin,
  Plane,
  Sparkles,
  Trees,
  Users,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";

import type { Language } from "@/lib/i18n";

import hero1 from "@assets/generated_images/hotel_hero1.png";
import roomImage from "@assets/generated_images/hotel_room.png";
import restaurantImage from "@assets/generated_images/hotel_restaurant.png";
import poolImage from "@assets/generated_images/hotel_pool.png";

type LocalizedText = Record<Language, string>;
type LocalizedList = Record<Language, string[]>;

export const siteImages = {
  hero: hero1,
  room: roomImage,
  restaurant: restaurantImage,
  pool: poolImage,
};

export const hotelLocationInfo = {
  mapsUrl:
    "https://www.google.com/maps/place/%D9%81%D9%86%D8%AF%D9%82+%D9%88%D8%A7%D8%AF%D9%8A+%D8%A7%D9%84%D8%A8%D8%AA%D8%B1%D8%A7%D8%A1%E2%80%AD/@30.3105889,35.4877794,17z/data=!3m1!4b1!4m9!3m8!1s0x1501697c5614046f:0x4aed3fab90f425cb!5m2!4m1!1i2!8m2!3d30.3105843!4d35.4852045!16s%2Fg%2F11nx75spp_?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D",
  embedUrl: "https://www.google.com/maps?q=30.3105843,35.4852045&hl=en&z=17&output=embed",
  coordinates: "30.3105843, 35.4852045",
  areaLabel: "Wadi Musa, Petra, Jordan",
};

export type RoomKey =
  | "standardDouble"
  | "deluxeDouble"
  | "deluxeTwin"
  | "suite"
  | "presidentialSuite"
  | "superiorTriple"
  | "standardSingle"
  | "standardTwin";

type RoomCatalogItem = {
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
    key: "standardDouble",
    image: roomImage,
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
      en: "A practical standard stay with king bed comfort, soundproofing, air conditioning, minibar, and a private bathroom.",
      ar: "إقامة عملية ومريحة مع سرير مزدوج كبير وعزل للصوت وتكييف وميني بار وحمام خاص.",
      fr: "Séjour standard confortable avec lit king size, insonorisation, climatisation, minibar et salle de bain privative.",
    },
    perks: {
      en: ["Breakfast included", "Partially refundable", "Free Wi-Fi", "Flat-screen TV", "Minibar", "Soundproofed room"],
      ar: ["إفطار رائع مشمول", "قابل للاسترداد جزئياً", "واي فاي مجاني", "تلفزيون بشاشة مسطحة", "ميني بار", "عزل الصوت"],
      fr: ["Petit-déjeuner inclus", "Partiellement remboursable", "Wi-Fi gratuit", "Télévision à écran plat", "Minibar", "Chambre insonorisée"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار رائع مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Online payment available",
      ar: "الدفع عبر الإنترنت",
      fr: "Paiement en ligne disponible",
    },
    refundPolicy: {
      en: "Partially refundable",
      ar: "قابل للاسترداد جزئياً",
      fr: "Partiellement remboursable",
    },
  },
  {
    key: "deluxeDouble",
    image: hero1,
    size: "36 m²",
    currentPrice: "JOD 65",
    originalPrice: "",
    taxes: "1 extra bed available for JOD 15",
    name: {
      en: "Deluxe Double Room",
      ar: "غرفة مزدوجة فاخرة",
      fr: "Chambre Double Deluxe",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "منظر الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "An upgraded double room with more floor space, scenic views, king bed comfort, and polished in-room essentials.",
      ar: "غرفة مزدوجة مطورة بمساحة أوسع وإطلالة جميلة وسرير مزدوج كبير وتجهيزات إقامة أفضل.",
      fr: "Chambre double plus spacieuse avec belles vues, lit king size et équipements de séjour soignés.",
    },
    perks: {
      en: ["Breakfast included", "Partially refundable", "Mountain view", "City view", "Free Wi-Fi", "Minibar"],
      ar: ["إفطار رائع مشمول", "قابل للاسترداد جزئياً", "منظر الجبل", "منظر المدينة", "واي فاي مجاني", "ميني بار"],
      fr: ["Petit-déjeuner inclus", "Partiellement remboursable", "Vue montagne", "Vue ville", "Wi-Fi gratuit", "Minibar"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار رائع مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Online payment available",
      ar: "الدفع عبر الإنترنت",
      fr: "Paiement en ligne disponible",
    },
    refundPolicy: {
      en: "Partially refundable",
      ar: "قابل للاسترداد جزئياً",
      fr: "Partiellement remboursable",
    },
    availability: {
      en: "Only 1 left",
      ar: "تبقى لدينا واحد",
      fr: "Plus qu'une disponible",
    },
  },
  {
    key: "deluxeTwin",
    image: hero1,
    size: "36 m²",
    currentPrice: "JOD 65",
    originalPrice: "",
    taxes: "1 extra bed available for JOD 15",
    name: {
      en: "Deluxe Twin Room",
      ar: "غرفة توأم فاخرة",
      fr: "Chambre Lits Jumeaux Deluxe",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "منظر الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A flexible twin setup with two single beds, a wider room plan, mountain and city outlooks, and all core comforts.",
      ar: "غرفة مرنة بسريرين مفردين ومساحة أوسع مع إطلالات على الجبل والمدينة وجميع وسائل الراحة الأساسية.",
      fr: "Configuration twin avec deux lits simples, espace généreux, vues sur la montagne et la ville, et tout le confort essentiel.",
    },
    perks: {
      en: ["Breakfast included", "Partially refundable", "2 single beds", "Free Wi-Fi", "Flat-screen TV", "Soundproofed room"],
      ar: ["إفطار رائع مشمول", "قابل للاسترداد جزئياً", "سريران مفردان", "واي فاي مجاني", "تلفزيون بشاشة مسطحة", "عزل الصوت"],
      fr: ["Petit-déjeuner inclus", "Partiellement remboursable", "2 lits simples", "Wi-Fi gratuit", "Télévision à écran plat", "Chambre insonorisée"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار رائع مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Online payment available",
      ar: "الدفع عبر الإنترنت",
      fr: "Paiement en ligne disponible",
    },
    refundPolicy: {
      en: "Partially refundable",
      ar: "قابل للاسترداد جزئياً",
      fr: "Partiellement remboursable",
    },
  },
  {
    key: "suite",
    image: poolImage,
    size: "63 m²",
    currentPrice: "JOD 105",
    originalPrice: "",
    taxes: "1 extra bed available for JOD 15",
    name: {
      en: "Suite",
      ar: "السويت",
      fr: "Suite",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "تتسع لشخصين",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "منظر الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A roomy suite with a separate living area, king bedroom, sofa bed, and more privacy for longer premium stays.",
      ar: "جناح واسع مع غرفة معيشة منفصلة وغرفة نوم بسرير كبير وسرير أريكة وخصوصية أكبر للإقامات الأطول.",
      fr: "Suite spacieuse avec salon séparé, chambre king size, canapé-lit et davantage d'intimité pour les séjours premium.",
    },
    perks: {
      en: ["Breakfast included", "Partially refundable", "Separate living room", "King bed", "Sofa bed", "Free Wi-Fi"],
      ar: ["إفطار رائع مشمول", "قابل للاسترداد جزئياً", "غرفة معيشة منفصلة", "سرير مزدوج كبير", "سرير أريكة", "واي فاي مجاني"],
      fr: ["Petit-déjeuner inclus", "Partiellement remboursable", "Salon séparé", "Lit king size", "Canapé-lit", "Wi-Fi gratuit"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار رائع مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Online payment available",
      ar: "الدفع عبر الإنترنت",
      fr: "Paiement en ligne disponible",
    },
    refundPolicy: {
      en: "Partially refundable",
      ar: "قابل للاسترداد جزئياً",
      fr: "Partiellement remboursable",
    },
    availability: {
      en: "Only 3 left",
      ar: "تبقى لدينا 3",
      fr: "Plus que 3 disponibles",
    },
  },
  {
    key: "presidentialSuite",
    image: poolImage,
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
      en: "The hotel's most premium suite with a large king bedroom, living area, sofa bed, private kitchen, and expanded comfort.",
      ar: "أفخم جناح في الفندق مع غرفة نوم كبيرة بسرير مزدوج كبير ومنطقة معيشة وسرير أريكة ومطبخ خاص وراحة أعلى.",
      fr: "La suite la plus haut de gamme de l'hôtel avec grande chambre king size, salon, canapé-lit, cuisine privée et confort supérieur.",
    },
    perks: {
      en: ["Breakfast included", "Partially refundable", "Private kitchen", "Private suite", "Sofa bed", "Free Wi-Fi"],
      ar: ["إفطار رائع مشمول", "قابل للاسترداد جزئياً", "مطبخ خاص", "جناح خاص", "سرير أريكة", "واي فاي مجاني"],
      fr: ["Petit-déjeuner inclus", "Partiellement remboursable", "Cuisine privée", "Suite privée", "Canapé-lit", "Wi-Fi gratuit"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار رائع مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Online payment available",
      ar: "الدفع عبر الإنترنت",
      fr: "Paiement en ligne disponible",
    },
    refundPolicy: {
      en: "Partially refundable",
      ar: "قابل للاسترداد جزئياً",
      fr: "Partiellement remboursable",
    },
    availability: {
      en: "Only 2 left",
      ar: "تبقى لدينا اثنان",
      fr: "Plus que 2 disponibles",
    },
  },
  {
    key: "superiorTriple",
    image: roomImage,
    size: "39 m²",
    currentPrice: "JOD 85",
    originalPrice: "",
    taxes: "Extra bed available for JOD 15",
    name: {
      en: "Triple Room",
      ar: "غرفة الثلاثية السوبيريور",
      fr: "Chambre Triple Supérieure",
    },
    occupancy: {
      en: "Sleeps 3",
      ar: "تتسع لثلاثة ضيوف",
      fr: "Pour 3 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "منظر الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A practical triple room with three single beds, more floor space, and a layout that works well for small groups.",
      ar: "غرفة ثلاثية عملية مع ثلاثة أسرّة مفردة ومساحة أكبر ومخطط مناسب للمجموعات الصغيرة.",
      fr: "Chambre triple pratique avec trois lits simples, plus d'espace au sol et une configuration idéale pour les petits groupes.",
    },
    perks: {
      en: ["Breakfast included", "Partially refundable", "3 single beds", "Free Wi-Fi", "Flat-screen TV", "Soundproofed room"],
      ar: ["إفطار رائع مشمول", "قابل للاسترداد جزئياً", "3 أسرّة مفردة", "واي فاي مجاني", "تلفزيون بشاشة مسطحة", "عزل الصوت"],
      fr: ["Petit-déjeuner inclus", "Partiellement remboursable", "3 lits simples", "Wi-Fi gratuit", "Télévision à écran plat", "Chambre insonorisée"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار رائع مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Online payment available",
      ar: "الدفع عبر الإنترنت",
      fr: "Paiement en ligne disponible",
    },
    refundPolicy: {
      en: "Partially refundable",
      ar: "قابل للاسترداد جزئياً",
      fr: "Partiellement remboursable",
    },
  },
  {
    key: "standardSingle",
    image: roomImage,
    size: "22 m²",
    currentPrice: "JOD 50",
    originalPrice: "",
    taxes: "Single occupancy only",
    name: {
      en: "Standard Single Room",
      ar: "غرفة فردية قياسية",
      fr: "Chambre Simple Standard",
    },
    occupancy: {
      en: "Sleeps 1",
      ar: "تتسع لشخص واحد",
      fr: "Pour 1 personne",
    },
    view: {
      en: "Mountain and city view",
      ar: "منظر الجبل والمدينة",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A compact private stay for solo travelers with a single bed, minibar, city and mountain outlooks, and all essentials.",
      ar: "إقامة خاصة للمسافر الفردي مع سرير مفرد وميني بار وإطلالات على الجبل والمدينة وكل الاحتياجات الأساسية.",
      fr: "Séjour privé compact pour voyageur seul avec lit simple, minibar, vues sur la montagne et la ville, et équipements essentiels.",
    },
    perks: {
      en: ["Breakfast included", "Partially refundable", "1 single bed", "Free Wi-Fi", "Flat-screen TV", "Minibar"],
      ar: ["إفطار رائع مشمول", "قابل للاسترداد جزئياً", "سرير مفرد", "واي فاي مجاني", "تلفزيون بشاشة مسطحة", "ميني بار"],
      fr: ["Petit-déjeuner inclus", "Partiellement remboursable", "Lit simple", "Wi-Fi gratuit", "Télévision à écran plat", "Minibar"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار رائع مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Online payment available",
      ar: "الدفع عبر الإنترنت",
      fr: "Paiement en ligne disponible",
    },
    refundPolicy: {
      en: "Partially refundable",
      ar: "قابل للاسترداد جزئياً",
      fr: "Partiellement remboursable",
    },
  },
  {
    key: "standardTwin",
    image: roomImage,
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
      fr: "Séjour twin orienté ville",
    },
    description: {
      en: "A standard twin setup with two single beds, soundproofing, air conditioning, minibar, and a private bathroom.",
      ar: "غرفة قياسية بسريرين مفردين مع عزل للصوت وتكييف وميني بار وحمام خاص.",
      fr: "Chambre twin standard avec deux lits simples, insonorisation, climatisation, minibar et salle de bain privative.",
    },
    perks: {
      en: ["Breakfast included", "Partially refundable", "2 single beds", "Free Wi-Fi", "Flat-screen TV", "Minibar"],
      ar: ["إفطار رائع مشمول", "قابل للاسترداد جزئياً", "سريران مفردان", "واي فاي مجاني", "تلفزيون بشاشة مسطحة", "ميني بار"],
      fr: ["Petit-déjeuner inclus", "Partiellement remboursable", "2 lits simples", "Wi-Fi gratuit", "Télévision à écran plat", "Minibar"],
    },
    mealPlan: {
      en: "Breakfast included",
      ar: "إفطار رائع مشمول",
      fr: "Petit-déjeuner inclus",
    },
    payment: {
      en: "Online payment available",
      ar: "الدفع عبر الإنترنت",
      fr: "Paiement en ligne disponible",
    },
    refundPolicy: {
      en: "Partially refundable",
      ar: "قابل للاسترداد جزئياً",
      fr: "Partiellement remboursable",
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

export const amenityHighlights: Array<{
  key: string;
  icon: LucideIcon;
  headline: string;
  description: string;
}> = [
  {
    key: "pool",
    icon: Waves,
    headline: "Seasonal outdoor pool",
    description: "Outdoor swimming area with terrace seating and a relaxed base for afternoons between Petra visits.",
  },
  {
    key: "fitness",
    icon: Dumbbell,
    headline: "Fitness centre",
    description: "On-site gym access for guests who want a simple workout routine during their stay.",
  },
  {
    key: "restaurant",
    icon: Utensils,
    headline: "Breakfast and restaurant service",
    description: "Breakfast is available and the hotel restaurant covers Jordanian and international dining throughout the stay.",
  },
  {
    key: "bar",
    icon: GlassWater,
    headline: "Poolside dining",
    description: "Outdoor service close to the pool for lighter meals, drinks, and a more open dining atmosphere.",
  },
  {
    key: "wifi",
    icon: Wifi,
    headline: "High-speed Wi-Fi",
    description: "Free Wi-Fi throughout the property, including rooms, public areas, and guest lounge spaces.",
  },
  {
    key: "parking",
    icon: Car,
    headline: "Free private parking",
    description: "Private parking is available on site, with accessible parking options and straightforward arrival for drivers.",
  },
  {
    key: "frontDesk",
    icon: Bell,
    headline: "24-hour front desk",
    description: "Round-the-clock reception with concierge help, early invoicing, luggage storage, and express check-in support.",
  },
  {
    key: "roomService",
    icon: Coffee,
    headline: "Room service and in-room coffee",
    description: "Room service, tea and coffee makers in all rooms, and daily convenience support for quieter stays.",
  },
  {
    key: "shuttle",
    icon: Plane,
    headline: "Airport shuttle support",
    description: "Airport transfers and local transport coordination to simplify arrival and departure planning.",
  },
  {
    key: "meeting",
    icon: Users,
    headline: "Guest and service facilities",
    description: "Laundry, housekeeping, family support, and shared guest services that make longer stays easier.",
  },
  {
    key: "tour",
    icon: MapPin,
    headline: "Tour and local assistance",
    description: "Tour desk support and practical location guidance for Petra visits, routes, and nearby highlights.",
  },
  {
    key: "exchange",
    icon: Sparkles,
    headline: "Non-smoking and comfort essentials",
    description: "Non-smoking rooms, allergy-friendly options, air conditioning, and practical comfort features across the property.",
  },
] as const;

export const diningMoments = [
  {
    title: "Breakfast before Petra",
    description:
      "Guests can start with buffet, continental, or Italian breakfast options before heading toward Petra for the day.",
    image: restaurantImage,
  },
  {
    title: "Poolside lunch at Amneh",
    description:
      "Amneh restaurant offers poolside dining with lighter daytime meals and a calmer outdoor atmosphere after sightseeing.",
    image: hero1,
  },
  {
    title: "International evening menu",
    description:
      "Dinner service blends Jordanian flavors with American, Chinese, and French choices in a more polished night setting.",
    image: poolImage,
  },
] as const;

export const locationMoments = [
  {
    icon: MapPin,
    title: "Pinned on Google Maps",
    description: "The hotel location is now linked directly to its live Google Maps pin for clearer arrival, navigation, and guest confidence.",
  },
  {
    icon: Trees,
    title: "Wadi Musa setting",
    description: "Positioned in Wadi Musa with easy road access, making arrival smoother for drivers, transfer guests, and Petra day planning.",
  },
  {
    icon: BedDouble,
    title: "Useful for Petra stays",
    description: "A practical base for Petra visits, late arrivals, and guests who want a clear route back to the hotel after touring.",
  },
] as const;
