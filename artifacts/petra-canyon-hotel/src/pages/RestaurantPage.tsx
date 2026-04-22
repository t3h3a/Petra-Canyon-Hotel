import { Gallery } from "@/components/Gallery";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { diningMoments, pageHeroSlides, siteImages } from "@/data";

const restaurantCopy = {
  en: {
    description: "A richer dining presentation with multiple culinary moments, stronger visuals, and a more premium hospitality tone.",
    eyebrow: "Dining",
    chefNote: "Chef's note",
    chefTitle: "Jordanian warmth with international range",
    highlights: "Dining highlights",
    items: [
      "Buffet breakfast for early Petra departures",
      "Vegetarian, halal, and dairy-free friendly options",
      "Indoor and garden-style seating experiences",
      "Poolside drinks and light afternoon service",
    ],
  },
  ar: {
    description: "عرض أغنى لتجربة الطعام مع لحظات متنوعة وصور أقوى وطابع ضيافة أكثر فخامة.",
    eyebrow: "المطعم",
    chefNote: "ملاحظة الشيف",
    chefTitle: "دفء أردني بطابع عالمي متوازن",
    highlights: "أبرز ملامح التجربة",
    items: [
      "بوفيه إفطار مناسب للانطلاق المبكر نحو البترا",
      "خيارات نباتية وحلال وخالية من الألبان",
      "جلسات داخلية وخارجية بأجواء مريحة",
      "مشروبات قرب المسبح وخدمة خفيفة بعد الظهر",
    ],
  },
  fr: {
    description: "Une présentation culinaire plus riche avec plusieurs moments, de meilleurs visuels et un ton d'hospitalité plus premium.",
    eyebrow: "Restaurant",
    chefNote: "Note du chef",
    chefTitle: "Chaleur jordanienne et ouverture internationale",
    highlights: "Temps forts du restaurant",
    items: [
      "Buffet du matin idéal pour les départs tôt vers Pétra",
      "Options végétariennes, halal et sans produits laitiers",
      "Espaces intérieurs et extérieurs agréables",
      "Boissons au bord de la piscine et service léger l'après-midi",
    ],
  },
} as const;

export default function RestaurantPage() {
  const { t, language } = useLanguage();
  const copy = restaurantCopy[language];

  return (
    <PageShell title={t.restaurant.title} description={copy.description} image={siteImages.restaurant} slides={pageHeroSlides.restaurant} eyebrow={copy.eyebrow}>
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <Gallery items={diningMoments.map((moment) => ({ ...moment }))} />

          <div className="mt-12 grid gap-8 rounded-[2rem] border border-border bg-card p-8 shadow-[0_18px_60px_rgba(0,0,0,0.05)] lg:grid-cols-[1fr_0.9fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.chefNote}</p>
              <h2 className="mt-4 text-3xl font-serif sm:text-4xl">{copy.chefTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{t.restaurant.desc}</p>
            </div>
            <div className="rounded-[1.5rem] bg-secondary/30 p-6">
              <h3 className="text-xl font-serif">{copy.highlights}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {copy.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
