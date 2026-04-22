import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { locationMoments, pageHeroSlides, siteImages } from "@/data";
import { useSiteContent } from "@/lib/site-content";

const locationCopy = {
  en: {
    description: "A dedicated location page helps guests understand proximity, practical travel details, and why the hotel works as a base for Petra visits.",
    eyebrow: "Destination",
    address: "Address",
    timing: "Guest timing",
    coordinates: "Coordinates",
    booking: "Booking and arrival",
    bookingBody: "Secure your dates before travel, then coordinate your arrival with reception for a smoother check-in and better local guidance.",
    mapTitle: "Map and directions",
    mapBody: "The hotel location is connected directly to its Google Maps pin so guests can navigate with less friction.",
    openMap: "Open map",
    getDirections: "Get directions",
  },
  ar: {
    description: "صفحة مستقلة للموقع توضح قرب الفندق من البترا وتفاصيل الوصول ولماذا يعد قاعدة مناسبة للزيارة.",
    eyebrow: "الوجهة",
    address: "العنوان",
    timing: "مواقيت الضيوف",
    coordinates: "الإحداثيات",
    booking: "الحجز والوصول",
    bookingBody: "احجز موعدك مسبقاً، ثم نسق وقت وصولك مع الاستقبال لتحصل على تجربة أسلس وتوجيه أفضل أثناء زيارة البترا.",
    mapTitle: "الخريطة والاتجاهات",
    mapBody: "تم ربط موقع الفندق مباشرة بنقطة Google Maps حتى يتمكن الضيف من فتح الموقع أو الحصول على الاتجاهات بسهولة.",
    openMap: "افتح الخريطة",
    getDirections: "احصل على الاتجاهات",
  },
  fr: {
    description: "Une page dédiée à l'emplacement aide les clients à comprendre la proximité, les détails pratiques d'arrivée et la valeur du lieu pour visiter Pétra.",
    eyebrow: "Destination",
    address: "Adresse",
    timing: "Horaires des clients",
    coordinates: "Coordonnées",
    booking: "Réservation et arrivée",
    bookingBody: "Réservez vos dates à l'avance puis coordonnez votre arrivée avec la réception pour un accueil plus fluide.",
    mapTitle: "Carte et itinéraire",
    mapBody: "L'emplacement de l'hôtel est relié directement à Google Maps pour faciliter l'arrivée et l'orientation des clients.",
    openMap: "Ouvrir la carte",
    getDirections: "Voir l'itinéraire",
  },
} as const;

export default function LocationPage() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();
  const copy = locationCopy[language];

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
                  {content.hotelInfo.coordinates}
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
                <iframe title="Petra Canyon map" src={content.hotelInfo.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[340px] w-full border-0" />
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-secondary/25 p-6">
                <h2 className="text-3xl font-serif">{copy.mapTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{copy.mapBody}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={content.hotelInfo.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                    {copy.openMap}
                  </a>
                  <a href={content.hotelInfo.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary">
                    {copy.getDirections}
                  </a>
                </div>
              </div>

              <h2 className="mt-8 text-3xl font-serif">{t.location.distancesTitle}</h2>
              <div className="mt-6 space-y-4">
                {t.location.distances.map((dist) => (
                  <div key={dist.name} className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background px-4 py-4">
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
                <a href="https://www.booking.com/hotel/jo/petra-canyon.en-gb.html" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
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
