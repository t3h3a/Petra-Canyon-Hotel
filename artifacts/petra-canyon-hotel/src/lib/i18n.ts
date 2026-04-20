export type Language = "en" | "ar" | "fr";

export const translations = {
  en: {
    nav: {
      home: "Home",
      rooms: "Rooms",
      amenities: "Amenities",
      restaurant: "Restaurant",
      location: "Location",
      contact: "Contact",
    },
    hero: {
      tagline: "Your Gateway to the Ancient Wonder",
      starRating: "4-Star Luxury",
      brand: "Petra Canyon",
    },
    booking: {
      checkIn: "Check-in",
      checkOut: "Check-out",
      adults: "Adults",
      children: "Children",
      search: "Book Now",
    },
    welcome: {
      title: "Welcome to Petra Canyon Hotel",
      content:
        "Welcome to Petra Canyon Hotel, your gateway to the ancient wonder. Nestled in the heart of Wadi Musa, just moments from the legendary rose-red city of Petra, our 4-star hotel offers an exceptional blend of comfort, culture, and breathtaking canyon views.",
    },
    rooms: {
      title: "Rooms & Suites",
      standard: {
        name: "Standard Room",
        desc: "Comfortable rooms with mountain views, AC, minibar, and a flat-screen TV.",
      },
      deluxe: {
        name: "Deluxe Room",
        desc: "Spacious deluxe rooms with canyon panoramas and elevated amenities.",
      },
      presidential: {
        name: "Presidential Suite",
        desc: "Luxurious suite with a rainfall shower, jacuzzi, blackout drapes, and panoramic views.",
      },
      triple: {
        name: "Triple Room",
        desc: "Ideal for families, with additional space and all core comforts.",
      },
      book: "View Details",
    },
    amenities: {
      title: "Hotel Amenities",
      pool: "Outdoor Swimming Pool (2 pools)",
      fitness: "Fitness Center",
      restaurant: "Amneh Restaurant",
      bar: "Poolside Bar",
      wifi: "Free High-Speed WiFi",
      parking: "Free Private Parking",
      frontDesk: "24-Hour Front Desk",
      roomService: "Room Service",
      shuttle: "Airport Shuttle",
      exchange: "Currency Exchange",
      meeting: "Meeting & Conference Facilities",
      tour: "Tour Desk & Concierge",
    },
    restaurant: {
      title: "Amneh Restaurant",
      desc:
        "Experience dining at Amneh Restaurant with buffet, continental, or Italian breakfast and a menu featuring Jordanian, American, Chinese, and French dishes.",
    },
    location: {
      title: "Location & Info",
      address: "Wadi Musa, Petra, Jordan",
      distancesTitle: "Nearby Landmarks",
      distances: [
        { name: "Petra Visitor Center", dist: "3 km" },
        { name: "Al-Siq", dist: "3.4 km" },
        { name: "The Treasury", dist: "4.7 km" },
        { name: "Moses' Spring", dist: "2.9 km" },
        { name: "The Monastery", dist: "8.6 km" },
      ],
      checkInOut: "Check-in: from 2:00 PM | Check-out: by 12:00 PM",
    },
    footer: {
      contact: "Contact Us",
      follow: "Follow Us",
      payments: "Accepted Payments",
      rights: "\u00A9 2024 Petra Canyon Hotel. All Rights Reserved.",
    },
  },
  ar: {
    nav: {
      home: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
      rooms: "\u0627\u0644\u063A\u0631\u0641",
      amenities: "\u0627\u0644\u0645\u0631\u0627\u0641\u0642",
      restaurant: "\u0627\u0644\u0645\u0637\u0639\u0645",
      location: "\u0627\u0644\u0645\u0648\u0642\u0639",
      contact: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",
    },
    hero: {
      tagline: "\u0628\u0648\u0627\u0628\u062A\u0643\u0645 \u0625\u0644\u0649 \u0627\u0644\u0639\u062C\u064A\u0628\u0629 \u0627\u0644\u0642\u062F\u064A\u0645\u0629",
      starRating: "\u0641\u062E\u0627\u0645\u0629 4 \u0646\u062C\u0648\u0645",
      brand: "\u0628\u062A\u0631\u0627 \u0643\u0627\u0646\u064A\u0648\u0646",
    },
    booking: {
      checkIn: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0648\u0635\u0648\u0644",
      checkOut: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u063A\u0627\u062F\u0631\u0629",
      adults: "\u0627\u0644\u0628\u0627\u0644\u063A\u064A\u0646",
      children: "\u0627\u0644\u0623\u0637\u0641\u0627\u0644",
      search: "\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646",
    },
    welcome: {
      title: "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643\u0645 \u0641\u064A \u0641\u0646\u062F\u0642 \u0628\u062A\u0631\u0627 \u0643\u0627\u0646\u064A\u0648\u0646",
      content:
        "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643\u0645 \u0641\u064A \u0641\u0646\u062F\u0642 \u0628\u062A\u0631\u0627 \u0643\u0627\u0646\u064A\u0648\u0646\u060C \u0628\u0648\u0627\u0628\u062A\u0643\u0645 \u0625\u0644\u0649 \u0627\u0644\u0639\u062C\u064A\u0628\u0629 \u0627\u0644\u0642\u062F\u064A\u0645\u0629. \u064A\u0642\u0639 \u0627\u0644\u0641\u0646\u062F\u0642 \u0641\u064A \u0642\u0644\u0628 \u0648\u0627\u062F\u064A \u0645\u0648\u0633\u0649 \u0648\u0639\u0644\u0649 \u0628\u0639\u062F \u062F\u0642\u0627\u0626\u0642 \u0645\u0646 \u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0628\u062A\u0631\u0627 \u0627\u0644\u0648\u0631\u062F\u064A\u0629 \u0644\u064A\u0645\u0646\u062D\u0643\u0645 \u0645\u0632\u064A\u062C\u0627\u064B \u0631\u0627\u0626\u0639\u0627\u064B \u0645\u0646 \u0627\u0644\u0631\u0627\u062D\u0629 \u0648\u0627\u0644\u062B\u0642\u0627\u0641\u0629 \u0648\u0627\u0644\u0625\u0637\u0644\u0627\u0644\u0627\u062A \u0627\u0644\u062E\u0644\u0627\u0628\u0629.",
    },
    rooms: {
      title: "\u0627\u0644\u063A\u0631\u0641 \u0648\u0627\u0644\u0623\u062C\u0646\u062D\u0629",
      standard: {
        name: "\u063A\u0631\u0641\u0629 \u0642\u064A\u0627\u0633\u064A\u0629",
        desc: "\u063A\u0631\u0641\u0629 \u0645\u0631\u064A\u062D\u0629 \u0628\u0625\u0637\u0644\u0627\u0644\u0629 \u062C\u0628\u0644\u064A\u0629 \u0645\u0639 \u062A\u0643\u064A\u064A\u0641 \u0648\u0645\u064A\u0646\u064A \u0628\u0627\u0631 \u0648\u062A\u0644\u0641\u0627\u0632 \u0628\u0634\u0627\u0634\u0629 \u0645\u0633\u0637\u062D\u0629.",
      },
      deluxe: {
        name: "\u063A\u0631\u0641\u0629 \u062F\u064A\u0644\u0648\u0643\u0633",
        desc: "\u063A\u0631\u0641\u0629 \u0648\u0627\u0633\u0639\u0629 \u0628\u0625\u0637\u0644\u0627\u0644\u0627\u062A \u0628\u0627\u0646\u0648\u0631\u0627\u0645\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u0648\u0627\u062F\u064A \u0645\u0639 \u0645\u0632\u0627\u064A\u0627 \u0625\u0642\u0627\u0645\u0629 \u0645\u0645\u064A\u0632\u0629.",
      },
      presidential: {
        name: "\u0627\u0644\u062C\u0646\u0627\u062D \u0627\u0644\u0631\u0626\u0627\u0633\u064A",
        desc: "\u062C\u0646\u0627\u062D \u0641\u0627\u062E\u0631 \u0645\u0639 \u062C\u0627\u0643\u0648\u0632\u064A \u0648\u062F\u0634 \u0645\u0637\u0631\u064A \u0648\u0633\u062A\u0627\u0626\u0631 \u062A\u0639\u062A\u064A\u0645 \u0648\u0625\u0637\u0644\u0627\u0644\u0627\u062A \u0628\u0627\u0646\u0648\u0631\u0627\u0645\u064A\u0629.",
      },
      triple: {
        name: "\u063A\u0631\u0641\u0629 \u062B\u0644\u0627\u062B\u064A\u0629",
        desc: "\u0645\u062B\u0627\u0644\u064A\u0629 \u0644\u0644\u0639\u0627\u0626\u0644\u0627\u062A \u0645\u0639 \u0645\u0633\u0627\u062D\u0629 \u0625\u0636\u0627\u0641\u064A\u0629 \u0648\u0643\u0644 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0631\u0627\u062D\u0629.",
      },
      book: "\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",
    },
    amenities: {
      title: "\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0641\u0646\u062F\u0642",
      pool: "\u0645\u0633\u0628\u062D \u062E\u0627\u0631\u062C\u064A (\u0645\u0633\u0628\u062D\u0627\u0646)",
      fitness: "\u0645\u0631\u0643\u0632 \u0644\u064A\u0627\u0642\u0629 \u0628\u062F\u0646\u064A\u0629",
      restaurant: "\u0645\u0637\u0639\u0645 \u0622\u0645\u0646\u0629",
      bar: "\u0628\u0627\u0631 \u0628\u062C\u0627\u0646\u0628 \u0627\u0644\u0645\u0633\u0628\u062D",
      wifi: "\u0648\u0627\u064A \u0641\u0627\u064A \u0645\u062C\u0627\u0646\u064A \u0639\u0627\u0644\u064A \u0627\u0644\u0633\u0631\u0639\u0629",
      parking: "\u0645\u0648\u0642\u0641 \u0633\u064A\u0627\u0631\u0627\u062A \u062E\u0627\u0635 \u0645\u062C\u0627\u0646\u064A",
      frontDesk: "\u0645\u0643\u062A\u0628 \u0627\u0633\u062A\u0642\u0628\u0627\u0644 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 24 \u0633\u0627\u0639\u0629",
      roomService: "\u062E\u062F\u0645\u0629 \u0627\u0644\u063A\u0631\u0641",
      shuttle: "\u062E\u062F\u0645\u0629 \u0646\u0642\u0644 \u0627\u0644\u0645\u0637\u0627\u0631",
      exchange: "\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062A",
      meeting: "\u0645\u0631\u0627\u0641\u0642 \u0627\u062C\u062A\u0645\u0627\u0639\u0627\u062A \u0648\u0645\u0624\u062A\u0645\u0631\u0627\u062A",
      tour: "\u0645\u0643\u062A\u0628 \u062C\u0648\u0644\u0627\u062A \u0648\u0643\u0648\u0646\u0633\u064A\u0631\u062C",
    },
    restaurant: {
      title: "\u0645\u0637\u0639\u0645 \u0622\u0645\u0646\u0629",
      desc:
        "\u0627\u0633\u062A\u0645\u062A\u0639\u0648\u0627 \u0628\u062A\u062C\u0631\u0628\u0629 \u0637\u0639\u0627\u0645 \u0641\u064A \u0645\u0637\u0639\u0645 \u0622\u0645\u0646\u0629 \u0645\u0639 \u062E\u064A\u0627\u0631\u0627\u062A \u0625\u0641\u0637\u0627\u0631 \u0628\u0648\u0641\u064A\u0647 \u0623\u0648 \u0643\u0648\u0646\u062A\u064A\u0646\u0646\u062A\u0627\u0644 \u0623\u0648 \u0625\u064A\u0637\u0627\u0644\u064A\u060C \u0625\u0644\u0649 \u062C\u0627\u0646\u0628 \u0623\u0637\u0628\u0627\u0642 \u0623\u0631\u062F\u0646\u064A\u0629 \u0648\u0623\u0645\u0631\u064A\u0643\u064A\u0629 \u0648\u0635\u064A\u0646\u064A\u0629 \u0648\u0641\u0631\u0646\u0633\u064A\u0629.",
    },
    location: {
      title: "\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A",
      address: "\u0648\u0627\u062F\u064A \u0645\u0648\u0633\u0649\u060C \u0627\u0644\u0628\u062A\u0631\u0627\u060C \u0627\u0644\u0623\u0631\u062F\u0646",
      distancesTitle: "\u0645\u0639\u0627\u0644\u0645 \u0642\u0631\u064A\u0628\u0629",
      distances: [
        { name: "\u0645\u0631\u0643\u0632 \u0632\u0648\u0627\u0631 \u0627\u0644\u0628\u062A\u0631\u0627", dist: "3 \u0643\u0645" },
        { name: "\u0627\u0644\u0633\u064A\u0642", dist: "3.4 \u0643\u0645" },
        { name: "\u0627\u0644\u062E\u0632\u0646\u0629", dist: "4.7 \u0643\u0645" },
        { name: "\u0639\u064A\u0646 \u0645\u0648\u0633\u0649", dist: "2.9 \u0643\u0645" },
        { name: "\u0627\u0644\u062F\u064A\u0631", dist: "8.6 \u0643\u0645" },
      ],
      checkInOut: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0648\u0635\u0648\u0644: \u0645\u0646 2:00 \u0628\u0639\u062F \u0627\u0644\u0638\u0647\u0631 | \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u063A\u0627\u062F\u0631\u0629: \u062D\u062A\u0649 12:00 \u0638\u0647\u0631\u064B\u0627",
    },
    footer: {
      contact: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
      follow: "\u062A\u0627\u0628\u0639\u0646\u0627",
      payments: "\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0645\u0642\u0628\u0648\u0644\u0629",
      rights: "\u00A9 2024 \u0641\u0646\u062F\u0642 \u0628\u062A\u0631\u0627 \u0643\u0627\u0646\u064A\u0648\u0646. \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      rooms: "Chambres",
      amenities: "Services",
      restaurant: "Restaurant",
      location: "Emplacement",
      contact: "Contact",
    },
    hero: {
      tagline: "Votre porte vers la merveille antique",
      starRating: "Luxe 4 \u00E9toiles",
      brand: "Petra Canyon",
    },
    booking: {
      checkIn: "Arriv\u00E9e",
      checkOut: "D\u00E9part",
      adults: "Adultes",
      children: "Enfants",
      search: "R\u00E9server",
    },
    welcome: {
      title: "Bienvenue \u00E0 l'h\u00F4tel Petra Canyon",
      content:
        "Bienvenue \u00E0 l'h\u00F4tel Petra Canyon, votre porte vers la merveille antique. Situ\u00E9 au c\u0153ur de Wadi Musa, \u00E0 quelques minutes de P\u00E9tra, notre h\u00F4tel 4 \u00E9toiles offre confort, culture et vues spectaculaires sur le canyon.",
    },
    rooms: {
      title: "Chambres et Suites",
      standard: {
        name: "Chambre Standard",
        desc: "Chambre confortable avec vue sur la montagne, climatisation, minibar et t\u00E9l\u00E9vision \u00E0 \u00E9cran plat.",
      },
      deluxe: {
        name: "Chambre Deluxe",
        desc: "Chambre spacieuse avec panorama sur le canyon et prestations haut de gamme.",
      },
      presidential: {
        name: "Suite Pr\u00E9sidentielle",
        desc: "Suite luxueuse avec jacuzzi, douche pluie, rideaux occultants et vues panoramiques.",
      },
      triple: {
        name: "Chambre Triple",
        desc: "Id\u00E9ale pour les familles avec plus d'espace et tout le confort n\u00E9cessaire.",
      },
      book: "Voir les d\u00E9tails",
    },
    amenities: {
      title: "Services de l'h\u00F4tel",
      pool: "Piscine ext\u00E9rieure (2 piscines)",
      fitness: "Centre de remise en forme",
      restaurant: "Restaurant Amneh",
      bar: "Bar de la piscine",
      wifi: "Wi-Fi haut d\u00E9bit gratuit",
      parking: "Parking priv\u00E9 gratuit",
      frontDesk: "R\u00E9ception 24h/24",
      roomService: "Service en chambre",
      shuttle: "Navette a\u00E9roport",
      exchange: "Bureau de change",
      meeting: "Espaces de r\u00E9union et de conf\u00E9rence",
      tour: "Bureau d'excursions et conciergerie",
    },
    restaurant: {
      title: "Restaurant Amneh",
      desc:
        "Profitez du restaurant Amneh avec petit-d\u00E9jeuner buffet, continental ou italien, ainsi qu'une carte jordanienne, am\u00E9ricaine, chinoise et fran\u00E7aise.",
    },
    location: {
      title: "Emplacement & Infos",
      address: "Wadi Musa, P\u00E9tra, Jordanie",
      distancesTitle: "Sites \u00E0 proximit\u00E9",
      distances: [
        { name: "Centre des visiteurs de P\u00E9tra", dist: "3 km" },
        { name: "Le Siq", dist: "3.4 km" },
        { name: "Le Tr\u00E9sor", dist: "4.7 km" },
        { name: "Source de Mo\u00EFse", dist: "2.9 km" },
        { name: "Le Monast\u00E8re", dist: "8.6 km" },
      ],
      checkInOut: "Arriv\u00E9e : \u00E0 partir de 14h00 | D\u00E9part : avant 12h00",
    },
    footer: {
      contact: "Nous contacter",
      follow: "Suivez-nous",
      payments: "Paiements accept\u00E9s",
      rights: "\u00A9 2024 Petra Canyon Hotel. Tous droits r\u00E9serv\u00E9s.",
    },
  },
} as const;

export type TranslationDictionary = typeof translations.en;
