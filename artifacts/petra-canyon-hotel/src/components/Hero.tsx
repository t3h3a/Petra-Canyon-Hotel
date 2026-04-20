import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
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
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-neutral-900" id="home">
      <div className="absolute inset-0 h-full w-full" ref={emblaRef}>
        <div className="flex h-full w-full touch-pan-y">
          {images.map((src, index) => (
            <div className="relative h-full w-full min-w-0 flex-[0_0_100%]" key={index}>
              <img
                src={src}
                alt={`Petra Canyon Hotel View ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/45" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 container mx-auto flex min-h-[100svh] flex-col px-4 pb-5 pt-24 sm:px-6 sm:pb-6 sm:pt-28 md:pt-32 lg:justify-between lg:pb-8 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 w-full max-w-5xl text-center text-white sm:mt-24 lg:mt-28"
        >
          <div className="mb-4 flex justify-center gap-1 sm:mb-6">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            ))}
          </div>
          <h1 className="text-4xl font-serif tracking-tight text-shadow-lg sm:text-5xl md:text-6xl lg:text-8xl">
            Petra Canyon
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed tracking-wide opacity-90 sm:mt-5 sm:text-lg md:text-xl lg:text-2xl">
            {t.hero.tagline}
          </p>
        </motion.div>

        <div className="mt-auto flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <div className="flex justify-center gap-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  idx === selectedIndex ? "w-8 bg-white" : "bg-white/50 hover:bg-white/80"
                )}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="mx-auto w-full max-w-6xl">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
