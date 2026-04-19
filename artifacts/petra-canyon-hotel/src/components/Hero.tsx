import React, { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { BookingWidget } from "./BookingWidget";
import { cn } from "@/lib/utils";

import hero1 from "@assets/generated_images/hotel_hero1.png";
import hero2 from "@assets/generated_images/hotel_room.png";
import hero3 from "@assets/generated_images/hotel_restaurant.png";
import hero4 from "@assets/generated_images/hotel_pool.png";

const images = [hero1, hero2, hero3, hero4];

export function Hero() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative h-[100dvh] w-full bg-neutral-900 overflow-hidden" id="home">
      <div className="absolute inset-0 w-full h-full" ref={emblaRef}>
        <div className="flex h-full w-full touch-pan-y">
          {images.map((src, index) => (
            <div className="relative flex-[0_0_100%] h-full w-full min-w-0" key={index}>
              <img
                src={src}
                alt={`Petra Canyon Hotel View ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-4 text-shadow-lg">
            Petra Canyon
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide opacity-90 mb-12">
            {t.hero.tagline}
          </p>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-40 left-0 right-0 flex justify-center gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              idx === selectedIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => emblaApi?.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-4 right-4 z-20">
        <BookingWidget />
      </div>
    </section>
  );
}
