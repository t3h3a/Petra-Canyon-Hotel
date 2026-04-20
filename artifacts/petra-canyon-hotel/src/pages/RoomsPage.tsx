import { Link } from "wouter";
import { Check, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { roomCatalog, siteImages } from "@/content/site-content";
import { pageHeroSlides } from "@/content/page-hero-slides";

export default function RoomsPage() {
  const { t, language } = useLanguage();

  const copy =
    language === "ar"
      ? {
          description: "استكشف خيارات الإقامة مع مقارنات أوضح وصور أقوى ومسارات حجز مباشرة تناسب كل نوع من أنواع الإقامة.",
          eyebrow: "إقامة",
          exploreLocation: "استكشف الموقع",
          priceNote: "الأسعار والتوفر يتغيران حسب التواريخ ونوع الغرفة، لذلك يتم عرض آخر سعر فعلي عبر Booking.com عند فتح صفحة الحجز.",
        }
      : language === "fr"
        ? {
            description: "Découvrez les options d'hébergement avec des comparaisons plus claires, de meilleurs visuels et des accès directs à la réservation.",
            eyebrow: "Séjour",
            exploreLocation: "Voir l'emplacement",
            priceNote: "Les prix et la disponibilité changent selon les dates et le type de chambre, la valeur en direct reste donc sur Booking.com.",
          }
        : {
            description: "Explore dedicated accommodation options with clearer comparisons, strong imagery, and direct booking entry points for every stay style.",
            eyebrow: "Stay",
            exploreLocation: "Explore location",
            priceNote: "Room prices and availability change by dates and room type, so the live payable rate remains on Booking.com.",
          };

  return (
    <PageShell
      title={t.rooms.title}
      description={copy.description}
      image={siteImages.room}
      slides={pageHeroSlides.rooms}
      eyebrow={copy.eyebrow}
    >
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {roomCatalog.map((room) => (
              <article
                key={room.key}
                className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[18rem]">
                    <img src={room.image} alt={t.rooms[room.key].name} className="absolute inset-0 h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-col p-6 sm:p-8">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                        {room.size}
                      </span>
                      <span className="rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80">
                        {room.view}
                      </span>
                    </div>

                    <h2 className="mt-5 text-3xl font-serif">{t.rooms[room.key].name}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{room.description}</p>

                    <div className="mt-6 flex items-center gap-2 text-sm text-foreground/80">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{room.occupancy}</span>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {room.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 rounded-2xl bg-secondary/35 px-4 py-3 text-sm leading-6 text-muted-foreground">
                      {copy.priceNote}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="https://www.booking.com/hotel/jo/petra-canyon.en-gb.html"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                      >
                        {t.booking.search}
                      </a>
                      <Link
                        href="/location"
                        className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/40"
                      >
                        {copy.exploreLocation}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
