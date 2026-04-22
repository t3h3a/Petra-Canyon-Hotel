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
  type LucideIcon,
} from "lucide-react";

import { siteImages } from "./hotelInfo";

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
    description: "Outdoor swimming area with terrace seating and a relaxed base between Petra visits.",
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
    description: "Breakfast is available and the restaurant covers Jordanian and international dining.",
  },
  {
    key: "bar",
    icon: GlassWater,
    headline: "Poolside dining",
    description: "Outdoor service close to the pool for lighter meals, drinks, and a relaxed atmosphere.",
  },
  {
    key: "wifi",
    icon: Wifi,
    headline: "High-speed Wi-Fi",
    description: "Free Wi-Fi throughout the property, including rooms and public spaces.",
  },
  {
    key: "parking",
    icon: Car,
    headline: "Free private parking",
    description: "Private parking is available on site with easy arrival for drivers.",
  },
  {
    key: "frontDesk",
    icon: Bell,
    headline: "24-hour front desk",
    description: "Round-the-clock reception with concierge help and express support.",
  },
  {
    key: "roomService",
    icon: Coffee,
    headline: "Room service and in-room coffee",
    description: "Room service and tea and coffee makers in all rooms.",
  },
  {
    key: "shuttle",
    icon: Plane,
    headline: "Airport shuttle support",
    description: "Airport transfers and local transport coordination on request.",
  },
  {
    key: "meeting",
    icon: Users,
    headline: "Guest and service facilities",
    description: "Laundry, housekeeping, family support, and shared guest services.",
  },
  {
    key: "tour",
    icon: MapPin,
    headline: "Tour and local assistance",
    description: "Tour desk support and practical location guidance for Petra visits.",
  },
  {
    key: "exchange",
    icon: Sparkles,
    headline: "Comfort essentials",
    description: "Non-smoking rooms, air conditioning, and practical comfort features across the property.",
  },
] as const;

export const diningMoments = [
  {
    title: "Breakfast before Petra",
    description: "Guests can start with buffet, continental, or Italian breakfast options before heading to Petra.",
    image: siteImages.restaurant,
  },
  {
    title: "Poolside lunch at Amneh",
    description: "Amneh restaurant offers poolside dining with lighter daytime meals and a calmer outdoor atmosphere.",
    image: siteImages.hero,
  },
  {
    title: "International evening menu",
    description: "Dinner service blends Jordanian flavors with international choices in a polished night setting.",
    image: siteImages.pool,
  },
] as const;

export const locationMoments = [
  {
    icon: MapPin,
    title: "Pinned on Google Maps",
    description: "The hotel location is linked directly to Google Maps for clear arrival and navigation.",
  },
  {
    icon: Trees,
    title: "Wadi Musa setting",
    description: "Positioned in Wadi Musa with easy road access for Petra day planning.",
  },
  {
    icon: BedDouble,
    title: "Useful for Petra stays",
    description: "A practical base for Petra visits, late arrivals, and easy returns after touring.",
  },
] as const;
