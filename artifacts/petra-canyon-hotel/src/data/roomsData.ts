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
    size: "22 mآ²",
    name: {
      en: "Single",
      ar: "Single",
      fr: "Single",
    },
    occupancy: {
      en: "Sleeps 1",
      ar: "طھطھط³ط¹ ظ„ط´ط®طµ ظˆط§ط­ط¯",
      fr: "Pour 1 personne",
    },
    view: {
      en: "Mountain and city view",
      ar: "ط¥ط·ظ„ط§ظ„ط© ط¹ظ„ظ‰ ط§ظ„ط¬ط¨ظ„ ظˆط§ظ„ظ…ط¯ظٹظ†ط©",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A compact private stay for solo travelers with a single bed, minibar, and all essentials.",
      ar: "ط¥ظ‚ط§ظ…ط© ط®ط§طµط© ظ„ظ„ظ…ط³ط§ظپط± ط§ظ„ظپط±ط¯ظٹ ظ…ط¹ ط³ط±ظٹط± ظ…ظپط±ط¯ ظˆظ…ظٹظ†ظٹ ط¨ط§ط± ظˆظƒظ„ ط§ظ„ط£ط³ط§ط³ظٹط§طھ.",
      fr: "Sأ©jour compact et privأ© pour une personne avec lit simple, minibar et tous les essentiels.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Flat-screen TV", "Minibar"],
      ar: ["ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", "ظˆط§ظٹ ظپط§ظٹ ظ…ط¬ط§ظ†ظٹ", "طھظ„ظپط§ط² ط¨ط´ط§ط´ط© ظ…ط³ط·ط­ط©", "ظ…ظٹظ†ظٹ ط¨ط§ط±"],
      fr: ["Petit-dأ©jeuner inclus", "Wi-Fi gratuit", "Tأ©lأ©vision أ  أ©cran plat", "Minibar"],
    },
    mealPlan: { en: "Breakfast included", ar: "ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", fr: "Petit-dأ©jeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "ط§ظ„ط¯ظپط¹ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚", fr: "Paiement أ  l'hأ´tel" },
    refundPolicy: { en: "Reservation request", ar: "ط·ظ„ط¨ ط­ط¬ط²", fr: "Demande de rأ©servation" },
  },
  {
    key: "standardDouble",
    image: siteImages.room,
    size: "29 mآ²",
    name: {
      en: "Standard Twin/Double",
      ar: "Standard Twin/Double",
      fr: "Standard Twin/Double",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "طھطھط³ط¹ ظ„ط´ط®طµظٹظ†",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "King bed",
      ar: "ط³ط±ظٹط± ظ…ط²ط¯ظˆط¬ ظƒط¨ظٹط±",
      fr: "Lit king size",
    },
    description: {
      en: "A practical standard stay with king bed comfort, air conditioning, minibar, and a private bathroom.",
      ar: "ط¥ظ‚ط§ظ…ط© ط¹ظ…ظ„ظٹط© ظˆظ…ط±ظٹط­ط© ظ…ط¹ ط³ط±ظٹط± ظ…ط²ط¯ظˆط¬ ظƒط¨ظٹط± ظˆطھظƒظٹظٹظپ ظˆظ…ظٹظ†ظٹ ط¨ط§ط± ظˆط­ظ…ط§ظ… ط®ط§طµ.",
      fr: "Sأ©jour standard confortable avec lit king size, climatisation, minibar et salle de bain privative.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Flat-screen TV", "Soundproofed room"],
      ar: ["ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", "ظˆط§ظٹ ظپط§ظٹ ظ…ط¬ط§ظ†ظٹ", "طھظ„ظپط§ط² ط¨ط´ط§ط´ط© ظ…ط³ط·ط­ط©", "ط؛ط±ظپط© ط¹ط§ط²ظ„ط© ظ„ظ„طµظˆطھ"],
      fr: ["Petit-dأ©jeuner inclus", "Wi-Fi gratuit", "Tأ©lأ©vision أ  أ©cran plat", "Chambre insonorisأ©e"],
    },
    mealPlan: { en: "Breakfast included", ar: "ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", fr: "Petit-dأ©jeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "ط§ظ„ط¯ظپط¹ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚", fr: "Paiement أ  l'hأ´tel" },
    refundPolicy: { en: "Reservation request", ar: "ط·ظ„ط¨ ط­ط¬ط²", fr: "Demande de rأ©servation" },
  },
  {
    key: "standardTwin",
    image: siteImages.room,
    size: "29 mآ²",
    name: {
      en: "Standard Twin/Double",
      ar: "Standard Twin/Double",
      fr: "Standard Twin/Double",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "طھطھط³ط¹ ظ„ط´ط®طµظٹظ†",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Twin-bed city-facing stay",
      ar: "ط¥ظ‚ط§ظ…ط© ط¨ط³ط±ظٹط±ظٹظ† ظ…ظپط±ط¯ظٹظ†",
      fr: "Sأ©jour twin cأ´tأ© ville",
    },
    description: {
      en: "A standard twin setup with two single beds, soundproofing, minibar, and private bathroom.",
      ar: "ط؛ط±ظپط© ظ‚ظٹط§ط³ظٹط© ط¨ط³ط±ظٹط±ظٹظ† ظ…ظپط±ط¯ظٹظ† ظ…ط¹ ط¹ط²ظ„ ظ„ظ„طµظˆطھ ظˆظ…ظٹظ†ظٹ ط¨ط§ط± ظˆط­ظ…ط§ظ… ط®ط§طµ.",
      fr: "Chambre twin standard avec deux lits simples, insonorisation, minibar et salle de bain privative.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "2 single beds", "Minibar"],
      ar: ["ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", "ظˆط§ظٹ ظپط§ظٹ ظ…ط¬ط§ظ†ظٹ", "ط³ط±ظٹط±ط§ظ† ظ…ظپط±ط¯ط§ظ†", "ظ…ظٹظ†ظٹ ط¨ط§ط±"],
      fr: ["Petit-dأ©jeuner inclus", "Wi-Fi gratuit", "2 lits simples", "Minibar"],
    },
    mealPlan: { en: "Breakfast included", ar: "ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", fr: "Petit-dأ©jeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "ط§ظ„ط¯ظپط¹ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚", fr: "Paiement أ  l'hأ´tel" },
    refundPolicy: { en: "Reservation request", ar: "ط·ظ„ط¨ ط­ط¬ط²", fr: "Demande de rأ©servation" },
  },
  {
    key: "deluxeDouble",
    image: siteImages.hero,
    size: "36 mآ²",
    name: {
      en: "Deluxe Twin/Double",
      ar: "Deluxe Twin/Double",
      fr: "Deluxe Twin/Double",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "طھطھط³ط¹ ظ„ط´ط®طµظٹظ†",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "ط¥ط·ظ„ط§ظ„ط© ط¹ظ„ظ‰ ط§ظ„ط¬ط¨ظ„ ظˆط§ظ„ظ…ط¯ظٹظ†ط©",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "An upgraded double room with more floor space, scenic views, and polished in-room essentials.",
      ar: "ط؛ط±ظپط© ظ…ط²ط¯ظˆط¬ط© ظ…ط·ظˆط±ط© ط¨ظ…ط³ط§ط­ط© ط£ظˆط³ط¹ ظˆط¥ط·ظ„ط§ظ„ط© ط¬ظ…ظٹظ„ط© ظˆطھط¬ظ‡ظٹط²ط§طھ ط¥ظ‚ط§ظ…ط© ط£ظپط¶ظ„.",
      fr: "Chambre double amأ©liorأ©e avec plus d'espace, belles vues et أ©quipements soignأ©s.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Mountain view", "City view"],
      ar: ["ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", "ظˆط§ظٹ ظپط§ظٹ ظ…ط¬ط§ظ†ظٹ", "ط¥ط·ظ„ط§ظ„ط© ط¬ط¨ظ„", "ط¥ط·ظ„ط§ظ„ط© ظ…ط¯ظٹظ†ط©"],
      fr: ["Petit-dأ©jeuner inclus", "Wi-Fi gratuit", "Vue montagne", "Vue ville"],
    },
    mealPlan: { en: "Breakfast included", ar: "ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", fr: "Petit-dأ©jeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "ط§ظ„ط¯ظپط¹ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚", fr: "Paiement أ  l'hأ´tel" },
    refundPolicy: { en: "Reservation request", ar: "ط·ظ„ط¨ ط­ط¬ط²", fr: "Demande de rأ©servation" },
    availability: { en: "Only 1 left", ar: "ظ…طھط¨ظ‚ظٹ ظˆط§ط­ط¯ط© ظپظ‚ط·", fr: "Plus qu'une disponible" },
  },
  {
    key: "deluxeTwin",
    image: siteImages.hero,
    size: "36 mآ²",
    name: {
      en: "Deluxe Twin/Double",
      ar: "Deluxe Twin/Double",
      fr: "Deluxe Twin/Double",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "طھطھط³ط¹ ظ„ط´ط®طµظٹظ†",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "ط¥ط·ظ„ط§ظ„ط© ط¹ظ„ظ‰ ط§ظ„ط¬ط¨ظ„ ظˆط§ظ„ظ…ط¯ظٹظ†ط©",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A flexible twin room with two single beds, wider layout, and all core comforts.",
      ar: "ط؛ط±ظپط© ظ…ط±ظ†ط© ط¨ط³ط±ظٹط±ظٹظ† ظ…ظپط±ط¯ظٹظ† ظˆظ…ط³ط§ط­ط© ط£ظˆط³ط¹ ظˆط¬ظ…ظٹط¹ ظˆط³ط§ط¦ظ„ ط§ظ„ط±ط§ط­ط© ط§ظ„ط£ط³ط§ط³ظٹط©.",
      fr: "Chambre twin flexible avec deux lits simples, plus d'espace et tout le confort essentiel.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "2 single beds", "Soundproofed room"],
      ar: ["ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", "ظˆط§ظٹ ظپط§ظٹ ظ…ط¬ط§ظ†ظٹ", "ط³ط±ظٹط±ط§ظ† ظ…ظپط±ط¯ط§ظ†", "ط؛ط±ظپط© ط¹ط§ط²ظ„ط© ظ„ظ„طµظˆطھ"],
      fr: ["Petit-dأ©jeuner inclus", "Wi-Fi gratuit", "2 lits simples", "Chambre insonorisأ©e"],
    },
    mealPlan: { en: "Breakfast included", ar: "ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", fr: "Petit-dأ©jeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "ط§ظ„ط¯ظپط¹ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚", fr: "Paiement أ  l'hأ´tel" },
    refundPolicy: { en: "Reservation request", ar: "ط·ظ„ط¨ ط­ط¬ط²", fr: "Demande de rأ©servation" },
  },
  {
    key: "superiorTriple",
    image: siteImages.room,
    size: "39 mآ²",
    name: {
      en: "Triple",
      ar: "Triple",
      fr: "Triple",
    },
    occupancy: {
      en: "Sleeps 3",
      ar: "طھطھط³ط¹ ظ„ط«ظ„ط§ط«ط© ط£ط´ط®ط§طµ",
      fr: "Pour 3 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "ط¥ط·ظ„ط§ظ„ط© ط¹ظ„ظ‰ ط§ظ„ط¬ط¨ظ„ ظˆط§ظ„ظ…ط¯ظٹظ†ط©",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A practical triple room with three single beds and a layout that works well for small groups.",
      ar: "ط؛ط±ظپط© ط«ظ„ط§ط«ظٹط© ط¹ظ…ظ„ظٹط© ظ…ط¹ ط«ظ„ط§ط«ط© ط£ط³ط±ظ‘ط© ظ…ظپط±ط¯ط© ظˆظ…ط³ط§ط­ط© ظ…ظ†ط§ط³ط¨ط© ظ„ظ„ظ…ط¬ظ…ظˆط¹ط§طھ ط§ظ„طµط؛ظٹط±ط©.",
      fr: "Chambre triple pratique avec trois lits simples et une configuration idأ©ale pour les petits groupes.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "3 single beds", "Flat-screen TV"],
      ar: ["ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", "ظˆط§ظٹ ظپط§ظٹ ظ…ط¬ط§ظ†ظٹ", "3 ط£ط³ط±ظ‘ط© ظ…ظپط±ط¯ط©", "طھظ„ظپط§ط² ط¨ط´ط§ط´ط© ظ…ط³ط·ط­ط©"],
      fr: ["Petit-dأ©jeuner inclus", "Wi-Fi gratuit", "3 lits simples", "Tأ©lأ©vision أ  أ©cran plat"],
    },
    mealPlan: { en: "Breakfast included", ar: "ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", fr: "Petit-dأ©jeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "ط§ظ„ط¯ظپط¹ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚", fr: "Paiement أ  l'hأ´tel" },
    refundPolicy: { en: "Reservation request", ar: "ط·ظ„ط¨ ط­ط¬ط²", fr: "Demande de rأ©servation" },
  },
  {
    key: "suite",
    image: siteImages.pool,
    size: "63 mآ²",
    name: {
      en: "Suite",
      ar: "Suite",
      fr: "Suite",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "طھطھط³ط¹ ظ„ط´ط®طµظٹظ†",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Mountain and city view",
      ar: "ط¥ط·ظ„ط§ظ„ط© ط¹ظ„ظ‰ ط§ظ„ط¬ط¨ظ„ ظˆط§ظ„ظ…ط¯ظٹظ†ط©",
      fr: "Vue montagne et ville",
    },
    description: {
      en: "A roomy suite with a separate living area, king bedroom, sofa bed, and more privacy.",
      ar: "ط¬ظ†ط§ط­ ظˆط§ط³ط¹ ظ…ط¹ ط؛ط±ظپط© ظ…ط¹ظٹط´ط© ظ…ظ†ظپطµظ„ط© ظˆط؛ط±ظپط© ظ†ظˆظ… ط¨ط³ط±ظٹط± ظƒط¨ظٹط± ظˆط®طµظˆطµظٹط© ط£ظƒط¨ط±.",
      fr: "Suite spacieuse avec salon sأ©parأ©, chambre king size et plus d'intimitأ©.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Separate living room", "Sofa bed"],
      ar: ["ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", "ظˆط§ظٹ ظپط§ظٹ ظ…ط¬ط§ظ†ظٹ", "ط؛ط±ظپط© ظ…ط¹ظٹط´ط© ظ…ظ†ظپطµظ„ط©", "ط³ط±ظٹط± ط£ط±ظٹظƒط©"],
      fr: ["Petit-dأ©jeuner inclus", "Wi-Fi gratuit", "Salon sأ©parأ©", "Canapأ©-lit"],
    },
    mealPlan: { en: "Breakfast included", ar: "ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", fr: "Petit-dأ©jeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "ط§ظ„ط¯ظپط¹ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚", fr: "Paiement أ  l'hأ´tel" },
    refundPolicy: { en: "Reservation request", ar: "ط·ظ„ط¨ ط­ط¬ط²", fr: "Demande de rأ©servation" },
    availability: { en: "Only 3 left", ar: "ظ…طھط¨ظ‚ظٹ 3 ظپظ‚ط·", fr: "Plus que 3 disponibles" },
  },
  {
    key: "presidentialSuite",
    image: siteImages.pool,
    size: "68 mآ²",
    name: {
      en: "Presidential Suite",
      ar: "Presidential Suite",
      fr: "Presidential Suite",
    },
    occupancy: {
      en: "Sleeps 2",
      ar: "طھطھط³ط¹ ظ„ط´ط®طµظٹظ†",
      fr: "Pour 2 personnes",
    },
    view: {
      en: "Private suite with premium layout",
      ar: "ط¬ظ†ط§ط­ ط®ط§طµ ط¨ظ…ط®ط·ط· ظپط§ط®ط±",
      fr: "Suite privأ©e haut de gamme",
    },
    description: {
      en: "The hotel's most premium suite with a large king bedroom, living area, sofa bed, and private kitchen.",
      ar: "ط£ظپط®ظ… ط¬ظ†ط§ط­ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚ ظ…ط¹ ط؛ط±ظپط© ظ†ظˆظ… ظƒط¨ظٹط±ط© ظˆظ…ظ†ط·ظ‚ط© ظ…ط¹ظٹط´ط© ظˆط³ط±ظٹط± ط£ط±ظٹظƒط© ظˆظ…ط·ط¨ط® ط®ط§طµ.",
      fr: "La suite la plus premium de l'hأ´tel avec grande chambre king size, salon, canapأ©-lit et cuisine privأ©e.",
    },
    perks: {
      en: ["Breakfast included", "Free Wi-Fi", "Private kitchen", "Private suite"],
      ar: ["ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", "ظˆط§ظٹ ظپط§ظٹ ظ…ط¬ط§ظ†ظٹ", "ظ…ط·ط¨ط® ط®ط§طµ", "ط¬ظ†ط§ط­ ط®ط§طµ"],
      fr: ["Petit-dأ©jeuner inclus", "Wi-Fi gratuit", "Cuisine privأ©e", "Suite privأ©e"],
    },
    mealPlan: { en: "Breakfast included", ar: "ط§ظ„ط¥ظپط·ط§ط± ظ…ط´ظ…ظˆظ„", fr: "Petit-dأ©jeuner inclus" },
    payment: { en: "Pay at the hotel", ar: "ط§ظ„ط¯ظپط¹ ظپظٹ ط§ظ„ظپظ†ط¯ظ‚", fr: "Paiement أ  l'hأ´tel" },
    refundPolicy: { en: "Reservation request", ar: "ط·ظ„ط¨ ط­ط¬ط²", fr: "Demande de rأ©servation" },
    availability: { en: "Only 2 left", ar: "ظ…طھط¨ظ‚ظٹ 2 ظپظ‚ط·", fr: "Plus que 2 disponibles" },
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
