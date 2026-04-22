import { motion } from "framer-motion";

import { BookingWidget } from "@/components/BookingWidget";
import { HeroSlideshow } from "@/components/HeroSlideshow";

type HeroSectionProps = {
  badge: string;
  title: string;
  body: string;
  logoSrc: string;
  slides: string[];
  fallbackImage: string;
};

export function HeroSection({ badge, title, body, logoSrc, slides, fallbackImage }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-stone-950 pt-28 sm:pt-32">
      <HeroSlideshow
        slides={slides}
        fallbackImage={fallbackImage}
        intervalMs={6000}
        overlayClassName="bg-[radial-gradient(circle_at_top,rgba(229,149,111,0.34),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_26%),linear-gradient(135deg,rgba(12,10,10,0.3),rgba(12,10,10,0.78))]"
        topGlowClassName="bg-[linear-gradient(180deg,rgba(10,8,8,0.58),transparent)]"
        bottomGlowClassName="bg-[linear-gradient(180deg,transparent,rgba(12,10,10,0.72))]"
      />

      <div className="relative container mx-auto px-4 pb-10 sm:px-6 sm:pb-14 lg:pb-18">
        <div className="mx-auto max-w-4xl text-center text-white">
          <div className="mx-auto mb-8 hidden w-full justify-center lg:flex">
            <img
              src={logoSrc}
              alt="Petra Canyon logo"
              className="h-32 w-auto object-contain brightness-0 invert drop-shadow-[0_16px_30px_rgba(0,0,0,0.45)] xl:h-36"
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80">
            {badge}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 text-4xl font-serif sm:text-5xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{body}</p>
        </div>

        <div className="mx-auto mt-8 max-w-6xl lg:mt-10">
          <BookingWidget />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 lg:h-28">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,10,0)_0%,rgba(13,10,10,0.12)_34%,rgba(247,241,234,0.22)_70%,rgba(247,241,234,0.72)_100%)]" />
      </div>
    </section>
  );
}
