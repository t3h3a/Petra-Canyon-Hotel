import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { HeroSlideshow } from "@/components/HeroSlideshow";

type PageShellProps = {
  title: string;
  description: string;
  image: string;
  slides?: readonly string[];
  eyebrow?: string;
  children: ReactNode;
};

export function PageShell({
  title,
  description,
  image,
  slides = [],
  eyebrow = "Petra Canyon Hotel",
  children,
}: PageShellProps) {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <section className="relative isolate overflow-hidden border-b border-border/50 bg-neutral-950 pt-28 sm:pt-32">
        <HeroSlideshow
          slides={slides}
          fallbackImage={image}
          overlayClassName="bg-[radial-gradient(circle_at_top,rgba(208,132,96,0.3),transparent_28%),linear-gradient(180deg,rgba(8,8,8,0.48),rgba(8,8,8,0.82))]"
          topGlowClassName="bg-[linear-gradient(180deg,rgba(8,8,8,0.58),transparent)]"
          bottomGlowClassName="bg-[linear-gradient(180deg,transparent,rgba(8,8,8,0.68))]"
        />

        <div className="relative container mx-auto px-4 pb-12 sm:px-6 sm:pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center text-white"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 sm:text-sm">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-serif sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              {description}
            </p>
          </motion.div>

          <div className="mx-auto mt-8 max-w-6xl lg:mt-10">
            <BookingWidget />
          </div>
        </div>
      </section>

      <main>{children}</main>
      <Footer />
    </div>
  );
}
