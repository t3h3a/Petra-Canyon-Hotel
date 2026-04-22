import { Link } from "wouter";

import { PageShell } from "@/components/PageShell";
import { ServicesSection } from "@/components/ServicesSection";
import { useLanguage } from "@/components/LanguageProvider";
import { amenityHighlights, pageHeroSlides, siteImages } from "@/data";

const amenitiesPageCopy = {
  en: {
    description: "A dedicated amenities page makes the hotel feel more complete: wellness, convenience, family services, and practical travel support.",
    eyebrow: "Experience",
    planEyebrow: "Plan your stay",
    planTitle: "Combine comfort with a complete Petra itinerary",
    planBody: "Guests booking directly can use the property as a clean base for touring Petra, pool recovery afternoons, and evening dining without leaving the hotel.",
    visitRestaurant: "Visit restaurant page",
  },
  ar: {
    description: "صفحة مرافق مستقلة تجعل تجربة الفندق أكثر اكتمالاً، من الراحة والخدمات العائلية إلى الدعم العملي أثناء الرحلة.",
    eyebrow: "التجربة",
    planEyebrow: "خطط لإقامتك",
    planTitle: "اجمع بين الراحة وبرنامج متكامل لزيارة البترا",
    planBody: "يمكن للضيوف الاعتماد على الفندق كنقطة مريحة للانطلاق إلى البترا، ثم العودة للاستراحة قرب المسبح أو لتناول العشاء داخل الفندق.",
    visitRestaurant: "اذهب إلى صفحة المطعم",
  },
  fr: {
    description: "Une page dédiée aux services rend l'expérience plus complète, du bien-être aux services familiaux et au soutien pratique du voyage.",
    eyebrow: "Expérience",
    planEyebrow: "Planifiez votre séjour",
    planTitle: "Associez confort et itinéraire complet pour Pétra",
    planBody: "Les clients peuvent utiliser l'hôtel comme base confortable pour visiter Pétra, se détendre près de la piscine et profiter du dîner sur place.",
    visitRestaurant: "Voir la page restaurant",
  },
} as const;

export default function AmenitiesPage() {
  const { t, language } = useLanguage();
  const copy = amenitiesPageCopy[language];

  return (
    <PageShell title={t.amenities.title} description={copy.description} image={siteImages.pool} slides={pageHeroSlides.amenities} eyebrow={copy.eyebrow}>
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <ServicesSection
            items={amenityHighlights.map((item) => ({
              ...item,
              title: t.amenities[item.key as keyof typeof t.amenities],
            }))}
          />

          <div className="mt-12 rounded-[2rem] border border-border bg-secondary/20 p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.planEyebrow}</p>
                <h2 className="mt-4 text-3xl font-serif sm:text-4xl">{copy.planTitle}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{copy.planBody}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href="https://www.booking.com/hotel/jo/petra-canyon.en-gb.html"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  {t.booking.search}
                </a>
                <Link href="/restaurant" className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-background">
                  {copy.visitRestaurant}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
