export type Language = 'en' | 'ar' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      amenities: 'Amenities',
      restaurant: 'Restaurant',
      location: 'Location',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Your Gateway to the Ancient Wonder',
      starRating: '4-Star Luxury',
    },
    booking: {
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      adults: 'Adults',
      children: 'Children',
      search: 'Book Now',
    },
    welcome: {
      title: 'Welcome to Petra Canyon Hotel',
      content: 'Welcome to Petra Canyon Hotel — Your Gateway to the Ancient Wonder. Nestled in the heart of Wadi Musa, just moments from the legendary rose-red city of Petra, our 4-star hotel offers an exceptional blend of comfort, culture, and breathtaking canyon views.',
    },
    rooms: {
      title: 'Rooms & Suites',
      standard: {
        name: 'Standard Room',
        desc: 'Comfortable rooms with mountain views, AC, minibar, flat-screen TV.',
      },
      deluxe: {
        name: 'Deluxe Room',
        desc: 'Spacious deluxe rooms with stunning canyon panoramas and premium amenities.',
      },
      presidential: {
        name: 'Presidential Suite',
        desc: 'Luxurious suite with rainfall shower, jacuzzi, blackout drapes, and panoramic views.',
      },
      triple: {
        name: 'Triple Room',
        desc: 'Ideal for families, with all comforts and extra space.',
      },
      book: 'View Details'
    },
    amenities: {
      title: 'Hotel Amenities',
      pool: 'Outdoor Swimming Pool (2 pools)',
      fitness: 'Fitness Center',
      restaurant: 'Amneh Restaurant',
      bar: 'Poolside Bar',
      wifi: 'Free High-Speed WiFi',
      parking: 'Free Private Parking',
      frontDesk: '24-Hour Front Desk',
      roomService: 'Room Service',
      shuttle: 'Airport Shuttle',
      exchange: 'Currency Exchange',
      meeting: 'Meeting & Conference Facilities',
      tour: 'Tour Desk & Concierge',
    },
    restaurant: {
      title: 'Amneh Restaurant',
      desc: 'Experience fine dining at Amneh Restaurant featuring a buffet breakfast, lunch, dinner, and brunch. We offer American, Chinese, French, and authentic Jordanian cuisine. Enjoy our poolside bar, vegetarian, halal, and dairy-free options, complete with serene Japanese garden seating.',
    },
    location: {
      title: 'Location & Info',
      address: 'Petra Wadi Mousa Box 26, 71882 Wadi Musa, Jordan',
      distancesTitle: 'Nearby Landmarks',
      distances: [
        { name: 'Petra Visitor Center', dist: '3 km' },
        { name: 'Al-Siq (The Entrance to Petra)', dist: '3.4 km' },
        { name: 'The Treasury (Al-Khazneh)', dist: '4.7 km' },
        { name: "Moses' Spring", dist: '2.9 km' },
        { name: 'The Monastery', dist: '8.6 km' },
      ],
      checkInOut: 'Check-in: from 12:00 PM | Check-out: by 12:00 PM',
    },
    footer: {
      contact: 'Contact Us',
      follow: 'Follow Us',
      payments: 'Accepted Payments',
      rights: '© 2024 Petra Canyon Hotel. All Rights Reserved.',
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      rooms: 'الغرف',
      amenities: 'المرافق',
      restaurant: 'المطعم',
      location: 'الموقع',
      contact: 'اتصل بنا',
    },
    hero: {
      tagline: 'بوابتكم إلى العجائب القديمة',
      starRating: 'فخامة 4 نجوم',
    },
    booking: {
      checkIn: 'تسجيل الوصول',
      checkOut: 'تسجيل المغادرة',
      adults: 'البالغين',
      children: 'الأطفال',
      search: 'احجز الآن',
    },
    welcome: {
      title: 'مرحباً بكم في فندق بيترا كانيون',
      content: 'مرحباً بكم في فندق بيترا كانيون — بوابتكم إلى العجائب القديمة. يقع فندقنا في قلب وادي موسى، على بُعد دقائق من مدينة البتراء الوردية الأسطورية، ويوفر لضيوفنا مزيجاً استثنائياً من الراحة والثقافة والإطلالات الخلابة على الوادي.',
    },
    rooms: {
      title: 'الغرف والأجنحة',
      standard: {
        name: 'غرفة قياسية',
        desc: 'غرف مريحة مع إطلالات على الجبل، تكييف، ميني بار، وتلفزيون بشاشة مسطحة.',
      },
      deluxe: {
        name: 'غرفة ديلوكس',
        desc: 'غرف ديلوكس واسعة مع بانوراما مذهلة للوادي ومرافق فاخرة.',
      },
      presidential: {
        name: 'الجناح الرئاسي',
        desc: 'جناح فاخر مع دش مطري، جاكوزي، ستائر تعتيم، وإطلالات بانورامية.',
      },
      triple: {
        name: 'غرفة ثلاثية',
        desc: 'مثالية للعائلات، مع جميع وسائل الراحة ومساحة إضافية.',
      },
      book: 'عرض التفاصيل'
    },
    amenities: {
      title: 'مرافق الفندق',
      pool: 'مسبح خارجي (مسبحان)',
      fitness: 'مركز لياقة بدنية',
      restaurant: 'مطعم آمنة',
      bar: 'بار بجانب المسبح',
      wifi: 'واي فاي مجاني سريع',
      parking: 'موقف سيارات خاص مجاني',
      frontDesk: 'مكتب استقبال على مدار 24 ساعة',
      roomService: 'خدمة الغرف',
      shuttle: 'خدمة نقل المطار',
      exchange: 'تحويل العملات',
      meeting: 'مرافق اجتماعات ومؤتمرات',
      tour: 'مكتب جولات سياحية وكونسيرج',
    },
    restaurant: {
      title: 'مطعم آمنة',
      desc: 'استمتع بتجربة تناول طعام راقية في مطعم آمنة الذي يتميز ببوفيه إفطار، غداء، عشاء، وبرانش. نقدم المأكولات الأمريكية والصينية والفرنسية والأردنية الأصيلة. استمتع ببار المسبح والخيارات النباتية والحلال والخالية من منتجات الألبان، مع جلسات حديقة يابانية هادئة.',
    },
    location: {
      title: 'الموقع والمعلومات',
      address: 'ص.ب 26، 71882 وادي موسى، البتراء، الأردن',
      distancesTitle: 'معالم قريبة',
      distances: [
        { name: 'مركز زوار البتراء', dist: '3 كم' },
        { name: 'السيق (مدخل البتراء)', dist: '3.4 كم' },
        { name: 'الخزنة', dist: '4.7 كم' },
        { name: 'عين موسى', dist: '2.9 كم' },
        { name: 'الدير', dist: '8.6 كم' },
      ],
      checkInOut: 'تسجيل الوصول: من 12:00 مساءً | تسجيل المغادرة: حتى 12:00 مساءً',
    },
    footer: {
      contact: 'اتصل بنا',
      follow: 'تابعنا',
      payments: 'طرق الدفع المقبولة',
      rights: '© 2024 فندق بيترا كانيون. جميع الحقوق محفوظة.',
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      rooms: 'Chambres',
      amenities: 'Services',
      restaurant: 'Restaurant',
      location: 'Emplacement',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Votre Porte vers la Merveille Antique',
      starRating: 'Luxe 4 Étoiles',
    },
    booking: {
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      adults: 'Adultes',
      children: 'Enfants',
      search: 'Réserver',
    },
    welcome: {
      title: 'Bienvenue à l\'Hôtel Petra Canyon',
      content: 'Bienvenue à l\'Hôtel Petra Canyon — Votre Porte vers la Merveille Antique. Niché au cœur de Wadi Musa, à quelques minutes de la légendaire cité rose de Pétra, notre hôtel 4 étoiles offre un mélange exceptionnel de confort, de culture et de vues panoramiques sur le canyon.',
    },
    rooms: {
      title: 'Chambres et Suites',
      standard: {
        name: 'Chambre Standard',
        desc: 'Chambres confortables avec vue sur la montagne, climatisation, minibar, TV écran plat.',
      },
      deluxe: {
        name: 'Chambre Deluxe',
        desc: 'Chambres deluxe spacieuses avec de superbes panoramas sur le canyon et des équipements haut de gamme.',
      },
      presidential: {
        name: 'Suite Présidentielle',
        desc: 'Suite luxueuse avec douche à effet pluie, jacuzzi, rideaux occultants et vues panoramiques.',
      },
      triple: {
        name: 'Chambre Triple',
        desc: 'Idéale pour les familles, avec tout le confort et de l\'espace supplémentaire.',
      },
      book: 'Voir les Détails'
    },
    amenities: {
      title: 'Services de l\'Hôtel',
      pool: 'Piscine Extérieure (2 piscines)',
      fitness: 'Centre de Remise en Forme',
      restaurant: 'Restaurant Amneh',
      bar: 'Bar de la Piscine',
      wifi: 'WiFi Haut Débit Gratuit',
      parking: 'Parking Privé Gratuit',
      frontDesk: 'Réception 24h/24',
      roomService: 'Service d\'Étage',
      shuttle: 'Navette Aéroport',
      exchange: 'Bureau de Change',
      meeting: 'Salles de Réunion et Conférence',
      tour: 'Bureau d\'Excursions et Conciergerie',
    },
    restaurant: {
      title: 'Restaurant Amneh',
      desc: 'Vivez une expérience gastronomique au restaurant Amneh proposant un petit-déjeuner buffet, déjeuner, dîner et brunch. Nous servons des cuisines américaine, chinoise, française et jordanienne authentique. Profitez de notre bar de piscine, des options végétariennes, halal et sans produits laitiers, dans un cadre paisible de jardin japonais.',
    },
    location: {
      title: 'Emplacement & Infos',
      address: 'Petra Wadi Mousa Box 26, 71882 Wadi Musa, Jordanie',
      distancesTitle: 'Lieux à Proximité',
      distances: [
        { name: 'Centre des Visiteurs de Pétra', dist: '3 km' },
        { name: 'Le Siq (Entrée de Pétra)', dist: '3.4 km' },
        { name: 'Le Trésor (Al-Khazneh)', dist: '4.7 km' },
        { name: 'Source de Moïse', dist: '2.9 km' },
        { name: 'Le Monastère', dist: '8.6 km' },
      ],
      checkInOut: 'Arrivée : à partir de 12h00 | Départ : avant 12h00',
    },
    footer: {
      contact: 'Nous Contacter',
      follow: 'Suivez-nous',
      payments: 'Paiements Acceptés',
      rights: '© 2024 Petra Canyon Hotel. Tous Droits Réservés.',
    }
  }
};
