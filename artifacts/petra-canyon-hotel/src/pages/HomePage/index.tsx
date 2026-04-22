import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/ServicesSection";
import { useLanguage } from "@/components/LanguageProvider";
import { amenityHighlights, diningMoments, getLocalizedRoom, homeHeroSlides, siteImages } from "@/data";
import { apiRoomTypeToKey, fetchApiRooms, type ApiRoom } from "@/lib/hotel-api";
import { useSiteContent } from "@/lib/site-content";

export default function HomePage() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const copy = {
    badge: content.homePage.badge[language],
    title: content.homePage.title[language],
    exploreEyebrow: content.homePage.exploreEyebrow[language],
    exploreTitle: content.homePage.exploreTitle[language],
    exploreBody: content.homePage.exploreBody[language],
    cards: content.homePage.cards.map((card) => ({
      href: card.href,
      title: card.title[language],
      description: card.description[language],
    })),
    openPage: content.homePage.openPage[language],
    featuredEyebrow: content.homePage.featuredEyebrow[language],
    diningEyebrow: content.homePage.diningEyebrow[language],
    diningTitle: content.homePage.diningTitle[language],
    diningLink: content.homePage.diningLink[language],
    guestsMax: content.homePage.guestsMax[language],
  };
  const [apiRooms, setApiRooms] = useState<ApiRoom[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadRooms() {
      try {
        const rooms = await fetchApiRooms();
        if (!cancelled) {
          setApiRooms(rooms);
        }
      } catch {
        if (!cancelled) {
          setApiRooms([]);
        }
      }
    }

    void loadRooms();
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredRooms = useMemo(
    () =>
      content.rooms.slice(0, 2).map((room) => ({
        room,
        apiRoom: apiRooms.find((apiRoom) => apiRoomTypeToKey[apiRoom.roomType] === room.key) ?? null,
      })),
    [apiRooms, content.rooms],
  );

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-background">
      <Navbar />
      <HeroSection
        badge={copy.badge}
        title={copy.title}
        body={t.welcome.content}
        logoSrc={siteImages.logo}
        slides={homeHeroSlides}
        fallbackImage={siteImages.hero}
      />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f1ea_0%,#fbf7f2_20%,hsl(var(--background))_100%)] pt-18 pb-16 sm:pt-22 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.exploreEyebrow}</p>
              <h2 className="mt-4 text-3xl font-serif sm:text-4xl lg:text-5xl">{copy.exploreTitle}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{copy.exploreBody}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {copy.cards.map((card, index) => (
              <Link key={card.href} href={card.href} className="group overflow-hidden rounded-[2rem] border border-[rgba(211,196,185,0.6)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(251,246,240,0.9))] shadow-[0_24px_80px_rgba(49,27,18,0.08)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={[siteImages.room, siteImages.pool, siteImages.restaurant, siteImages.hero][index]}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="text-3xl font-serif">{card.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-white/80">{card.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-white">
                      {copy.openPage}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(246,239,232,0.92),rgba(242,234,226,0.64))] py-16 sm:py-20">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.featuredEyebrow}</p>
            <h2 className="mt-4 text-3xl font-serif sm:text-4xl">{t.rooms.title}</h2>
            <div className="mt-8 grid gap-4">
              {featuredRooms.map(({ room, apiRoom }) => (
                <div key={room.key} className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 shadow-[0_18px_55px_rgba(49,27,18,0.07)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-serif">{getLocalizedRoom(room, language).name}</h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {apiRoom ? `JOD ${apiRoom.price}` : room.currentPrice}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{getLocalizedRoom(room, language).description}</p>
                  {apiRoom ? <p className="mt-3 text-sm font-medium text-primary">{apiRoom.capacity} {copy.guestsMax}</p> : null}
                </div>
              ))}
            </div>
          </div>

          <ServicesSection
            items={amenityHighlights.slice(0, 4).map((item) => ({
              ...item,
              title: t.amenities[item.key as keyof typeof t.amenities],
            }))}
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fcfaf7_0%,#ffffff_60%,#fbf7f2_100%)] py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.diningEyebrow}</p>
              <h2 className="mt-4 text-3xl font-serif sm:text-4xl">{copy.diningTitle}</h2>
            </div>
            <Link href="/restaurant" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              {copy.diningLink}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Gallery items={diningMoments.map((item) => ({ ...item }))} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
