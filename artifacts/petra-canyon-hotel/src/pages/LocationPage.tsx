import { hotelLocationInfo, locationMoments, siteImages } from "@/content/site-content";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { pageHeroSlides } from "@/content/page-hero-slides";

export default function LocationPage() {
  const { t, language } = useLanguage();

  const copy =
    language === "ar"
      ? {
          description:
            "\u0635\u0641\u062D\u0629 \u0645\u0633\u062A\u0642\u0644\u0629 \u0644\u0644\u0645\u0648\u0642\u0639 \u062A\u0648\u0636\u062D \u0642\u0631\u0628 \u0627\u0644\u0641\u0646\u062F\u0642 \u0645\u0646 \u0627\u0644\u0628\u062A\u0631\u0627 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0648\u0644\u0645\u0627\u0630\u0627 \u064A\u0639\u062F \u0642\u0627\u0639\u062F\u0629 \u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0632\u064A\u0627\u0631\u0629.",
          eyebrow: "\u0627\u0644\u0648\u062C\u0647\u0629",
          address: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646",
          timing: "\u0645\u0648\u0627\u0642\u064A\u062A \u0627\u0644\u0636\u064A\u0648\u0641",
          coordinates: "\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A",
          booking: "\u0627\u0644\u062D\u062C\u0632 \u0648\u0627\u0644\u0648\u0635\u0648\u0644",
          bookingBody:
            "\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0645\u0633\u0628\u0642\u0627\u064B\u060C \u062B\u0645 \u0646\u0633\u0642 \u0648\u0642\u062A \u0648\u0635\u0648\u0644\u0643 \u0645\u0639 \u0627\u0644\u0627\u0633\u062A\u0642\u0628\u0627\u0644 \u0644\u062A\u062D\u0635\u0644 \u0639\u0644\u0649 \u062A\u062C\u0631\u0628\u0629 \u0623\u0633\u0644\u0633 \u0648\u062A\u0648\u062C\u064A\u0647 \u0623\u0641\u0636\u0644 \u0623\u062B\u0646\u0627\u0621 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0628\u062A\u0631\u0627.",
          mapTitle: "\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0648\u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A",
          mapBody: "\u062A\u0645 \u0631\u0628\u0637 \u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0646\u062F\u0642 \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u0646\u0642\u0637\u0629 Google Maps \u062D\u062A\u0649 \u064A\u062A\u0645\u0643\u0646 \u0627\u0644\u0636\u064A\u0641 \u0645\u0646 \u0641\u062A\u062D \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0628\u0633\u0647\u0648\u0644\u0629.",
          openMap: "\u0627\u0641\u062A\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629",
          getDirections: "\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A",
        }
      : language === "fr"
        ? {
            description:
              "Une page d\u00E9di\u00E9e \u00E0 l'emplacement aide les clients \u00E0 comprendre la proximit\u00E9, les d\u00E9tails pratiques d'arriv\u00E9e et la valeur du lieu pour visiter P\u00E9tra.",
            eyebrow: "Destination",
            address: "Adresse",
            timing: "Horaires des clients",
            coordinates: "Coordonn\u00E9es",
            booking: "R\u00E9servation et arriv\u00E9e",
            bookingBody:
              "R\u00E9servez vos dates \u00E0 l'avance puis coordonnez votre arriv\u00E9e avec la r\u00E9ception pour un accueil plus fluide et de meilleurs conseils sur place.",
            mapTitle: "Carte et itin\u00E9raire",
            mapBody: "L'emplacement de l'h\u00F4tel est maintenant reli\u00E9 directement \u00E0 son point Google Maps pour faciliter l'arriv\u00E9e et l'orientation des clients.",
            openMap: "Ouvrir la carte",
            getDirections: "Voir l'itin\u00E9raire",
          }
        : {
            description:
              "A dedicated location page helps guests understand proximity, practical travel details, and why the hotel works as a base for Petra visits.",
            eyebrow: "Destination",
            address: "Address",
            timing: "Guest timing",
            coordinates: "Coordinates",
            booking: "Booking and arrival",
            bookingBody:
              "Secure your dates before travel, then coordinate your arrival with reception for a smoother check-in and better local guidance.",
            mapTitle: "Map and directions",
            mapBody: "The hotel location is now connected directly to its Google Maps pin so guests can open the map and navigate with less friction.",
            openMap: "Open map",
            getDirections: "Get directions",
          };

  return (
    <PageShell title={t.location.title} description={copy.description} image={siteImages.hero} slides={pageHeroSlides.location} eyebrow={copy.eyebrow}>
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
              <h2 className="text-3xl font-serif">{copy.address}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{t.location.address}</p>

              <div className="mt-6 rounded-[1.5rem] border border-primary/10 bg-secondary/20 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{copy.coordinates}</p>
                <p className="mt-2 text-base font-semibold text-foreground" dir="ltr">
                  {hotelLocationInfo.coordinates}
                </p>
              </div>

              <h3 className="mt-8 text-xl font-serif">{copy.timing}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{t.location.checkInOut}</p>

              <div className="mt-8 grid gap-4">
                {locationMoments.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl bg-secondary/20 p-5">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
              <div className="overflow-hidden rounded-[1.75rem] border border-primary/10 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
                <iframe
                  title="Petra Canyon map"
                  src={hotelLocationInfo.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[340px] w-full border-0"
                />
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-secondary/25 p-6">
                <h2 className="text-3xl font-serif">{copy.mapTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{copy.mapBody}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={hotelLocationInfo.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    {copy.openMap}
                  </a>
                  <a
                    href={hotelLocationInfo.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
                  >
                    {copy.getDirections}
                  </a>
                </div>
              </div>

              <h2 className="mt-8 text-3xl font-serif">{t.location.distancesTitle}</h2>
              <div className="mt-6 space-y-4">
                {t.location.distances.map((dist) => (
                  <div
                    key={dist.name}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background px-4 py-4"
                  >
                    <span className="text-sm text-muted-foreground sm:text-base">{dist.name}</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary" dir="ltr">
                      {dist.dist}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-secondary/25 p-6">
                <h3 className="text-xl font-serif">{copy.booking}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{copy.bookingBody}</p>
                <a
                  href="https://www.booking.com/hotel/jo/petra-canyon.en-gb.html"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  {t.booking.search}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
