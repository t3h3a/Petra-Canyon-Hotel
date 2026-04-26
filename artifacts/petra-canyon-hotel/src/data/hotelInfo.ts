import heroMain from "@/images/home/hero-main.png";
import logoImage from "@/images/home/logo.png";
import petra1 from "@/images/petra/petra-1.jpeg";
import petra2 from "@/images/petra/petra-2.jpeg";
import petra3 from "@/images/petra/petra-3.jpeg";
import petra4 from "@/images/petra/petra-4.jpeg";
import petra5 from "@/images/petra/petra-5.jpeg";
import poolMain from "@/images/pool/pool-main.png";
import restaurantMain from "@/images/restaurant/restaurant-main.png";
import roomMain from "@/images/rooms/room-main.png";

export const HOTEL_EMAIL = "tthhaaeeeerr@gmail.com";
export const HOTEL_PHONE = "962779460107"; // without + for WhatsApp URL

export const siteImages = {
  hero: heroMain,
  room: roomMain,
  restaurant: restaurantMain,
  pool: poolMain,
  logo: logoImage,
};

export const hotelLocationInfo = {
  mapsUrl:
    "https://www.google.com/maps/place/%D9%81%D9%86%D8%AF%D9%82+%D9%88%D8%A7%D8%AF%D9%8A+%D8%A7%D9%84%D8%A8%D8%AA%D8%B1%D8%A7%D8%A1%E2%80%AD/@30.3105889,35.4877794,17z/data=!3m1!4b1!4m9!3m8!1s0x1501697c5614046f:0x4aed3fab90f425cb!5m2!4m1!1i2!8m2!3d30.3105843!4d35.4852045!16s%2Fg%2F11nx75spp_?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D",
  embedUrl: "https://www.google.com/maps?q=30.3105843,35.4852045&hl=en&z=17&output=embed",
  coordinates: "30.3105843, 35.4852045",
  areaLabel: "Wadi Musa, Petra, Jordan",
  hotelEmail: HOTEL_EMAIL,
  hotelPhone: `+${HOTEL_PHONE}`,
};

export const homeHeroSlides = [petra1, petra2, petra3, petra4, petra5];

export const pageHeroSlides = {
  home: homeHeroSlides,
  rooms: [roomMain, heroMain, roomMain, petra1],
  amenities: [poolMain, heroMain, poolMain, petra2],
  restaurant: [restaurantMain, heroMain, restaurantMain, petra3],
  location: [petra1, petra2, petra4, petra5],
} as const;

export const galleryData = {
  home: homeHeroSlides,
  petra: [petra1, petra2, petra3, petra4, petra5],
  rooms: [roomMain, heroMain],
  restaurant: [restaurantMain, heroMain],
  pool: [poolMain, heroMain],
};
