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

import hero1 from "@assets/generated_images/hotel_hero1.png";
import roomImage from "@assets/generated_images/hotel_room.png";
import restaurantImage from "@assets/generated_images/hotel_restaurant.png";
import poolImage from "@assets/generated_images/hotel_pool.png";

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

export const roomCatalog = [
  {
    key: "standard",
    image: roomImage,
    size: "36 sq m",
    occupancy: "Sleeps 2",
    view: "Standard city-facing stay",
    description:
      "Standard Double Room with a king bed, soundproofing, blackout curtains, minibar, rainfall shower, and smart in-room essentials.",
    perks: ["1 king bed", "Rainfall shower", "Blackout curtains"],
  },
  {
    key: "deluxe",
    image: hero1,
    size: "36 sq m",
    occupancy: "Sleeps 3",
    view: "City view",
    description:
      "Deluxe Double Room with a king bed, smart TV, eco-friendly toiletries, free rollaway bed support, and more flexible floor space.",
    perks: ["1 king bed", "Smart TV", "Free rollaway bed"],
  },
  {
    key: "presidential",
    image: poolImage,
    size: "60 sq m",
    occupancy: "Sleeps 4",
    view: "Suite with added privacy",
    description:
      "Presidential Suite with a king bed and sofa bed, kitchen, mini-fridge, rainfall shower, and a layout built for longer premium stays.",
    perks: ["Kitchen", "Mini-fridge", "Sofa bed"],
  },
  {
    key: "triple",
    image: roomImage,
    size: "39 sq m",
    occupancy: "Sleeps 3",
    view: "Triple room setup",
    description:
      "Superior Triple Room with three large single beds, premium bedding, soundproofing, blackout curtains, and practical comfort for groups.",
    perks: ["3 large single beds", "Premium bedding", "Soundproofed room"],
  },
] as const;

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
    headline: "Amneh restaurant",
    description: "On-site dining with buffet breakfast and a menu spanning Jordanian, American, Chinese, and French dishes.",
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
    description: "Straightforward guest parking close to the hotel for drivers arriving in Petra by car.",
  },
  {
    key: "frontDesk",
    icon: Bell,
    headline: "24-hour front desk",
    description: "Round-the-clock reception with concierge help, luggage support, and late-arrival assistance.",
  },
  {
    key: "roomService",
    icon: Coffee,
    headline: "Room service",
    description: "Room service and in-room breakfast options for quieter stays and slower mornings.",
  },
  {
    key: "shuttle",
    icon: Plane,
    headline: "Airport transfer support",
    description: "Airport transfers and local transport coordination to simplify arrival and departure planning.",
  },
  {
    key: "meeting",
    icon: Users,
    headline: "Meeting facilities",
    description: "Conference and meeting spaces for small events, planning sessions, and hosted business needs.",
  },
  {
    key: "tour",
    icon: MapPin,
    headline: "Tour desk services",
    description: "Tour and ticket assistance for Petra visits, local routes, and nearby highlights around Wadi Musa.",
  },
  {
    key: "exchange",
    icon: Sparkles,
    headline: "Guest convenience services",
    description: "Currency exchange, dry cleaning, housekeeping, and practical support services throughout the stay.",
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
