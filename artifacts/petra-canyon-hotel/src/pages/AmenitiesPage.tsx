import { Link } from "wouter";
import { amenityHighlights, siteImages } from "@/content/site-content";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { pageHeroSlides } from "@/content/page-hero-slides";

const amenitiesPageCopy = {
  en: {
    description:
      "A dedicated amenities page makes the hotel feel more complete: wellness, convenience, family services, and practical travel support in one polished view.",
    eyebrow: "Experience",
    detailsEyebrow: "Extra services",
    detailsTitle: "More detailed facilities and practical guest services",
    planEyebrow: "Plan your stay",
    planTitle: "Combine comfort with a complete Petra itinerary",
    planBody:
      "Guests booking directly can use the property as a clean base for touring Petra, pool recovery afternoons, and evening dining without leaving the hotel.",
    visitRestaurant: "Visit restaurant page",
    groups: [
      {
        title: "Parking and reception",
        items: ["Free parking", "Valet parking", "Electric vehicle charging", "Express check-in and check-out", "Concierge service", "24-hour front desk"],
      },
      {
        title: "General comfort",
        items: ["Non-smoking rooms", "Soundproof rooms", "Family rooms", "Room service", "Heating", "Lift access", "Accessible facilities"],
      },
      {
        title: "Food and wellness",
        items: ["Excellent breakfast", "Snack bar", "Minibar", "Seasonal outdoor pool", "Fitness centre", "Tea and coffee maker in all rooms"],
      },
      {
        title: "Additional services",
        items: ["Airport shuttle", "Car hire", "Tour desk", "Luggage storage", "Laundry and housekeeping", "Child safety gates"],
      },
    ],
  },
  ar: {
    description:
      "صفحة مرافق مستقلة تجعل تجربة الفندق أكثر اكتمالاً، من الراحة والخدمات العائلية إلى الدعم العملي أثناء الرحلة.",
    eyebrow: "تجربة",
    detailsEyebrow: "خدمات إضافية",
    detailsTitle: "مرافق وخدمات أكثر تفصيلاً داخل الفندق",
    planEyebrow: "خطط لإقامتك",
    planTitle: "اجمع بين الراحة وبرنامج متكامل لزيارة البترا",
    planBody:
      "يمكن للضيوف الاعتماد على الفندق كنقطة مريحة للانطلاق إلى البترا، ثم العودة للاسترخاء عند المسبح أو تناول العشاء داخل الفندق.",
    visitRestaurant: "اذهب إلى صفحة المطعم",
    groups: [
      {
        title: "مواقف السيارات والاستقبال",
        items: ["موقف سيارات مجاني", "موقف صف السيارات", "محطة شحن للمركبات الكهربائية", "تسجيل الدخول والخروج السريع", "خدمة الكونسيرج", "مكتب استقبال يعمل على مدار 24 ساعة"],
      },
      {
        title: "الخدمات العامة والراحة",
        items: ["غرف غير مخصصة للتدخين", "غرف عازلة للصوت", "غرف عائلية", "خدمة الغرف", "التدفئة", "المصعد", "مرافق لذوي الإعاقة"],
      },
      {
        title: "الطعام والعافية",
        items: ["إفطار رائع", "بار وجبات خفيفة", "الميني بار", "مسبح خارجي موسمي", "مركز اللياقة البدنية", "ماكينة شاي وقهوة في جميع الغرف"],
      },
      {
        title: "خدمات إضافية",
        items: ["خدمة نقل المطار", "تأجير السيارات", "مكتب الجولات", "تخزين الأمتعة", "خدمات التنظيف والغسيل", "بوابات سلامة للأطفال"],
      },
    ],
  },
  fr: {
    description:
      "Une page dédiée aux services rend l'expérience plus complète, du bien-être aux services familiaux et au soutien pratique du voyage.",
    eyebrow: "Expérience",
    detailsEyebrow: "Services supplémentaires",
    detailsTitle: "Des équipements et services plus détaillés à l'hôtel",
    planEyebrow: "Planifiez votre séjour",
    planTitle: "Associez confort et itinéraire complet pour Petra",
    planBody:
      "Les clients peuvent utiliser l'hôtel comme base confortable pour visiter Petra, se détendre près de la piscine et profiter du dîner sur place.",
    visitRestaurant: "Voir la page restaurant",
    groups: [
      {
        title: "Parking et réception",
        items: ["Parking gratuit", "Service de voiturier", "Borne de recharge électrique", "Enregistrement rapide", "Service de conciergerie", "Réception ouverte 24h/24"],
      },
      {
        title: "Confort général",
        items: ["Chambres non-fumeurs", "Chambres insonorisées", "Chambres familiales", "Service en chambre", "Chauffage", "Ascenseur", "Accessibilité renforcée"],
      },
      {
        title: "Restauration et bien-être",
        items: ["Excellent petit-déjeuner", "Snack-bar", "Minibar", "Piscine extérieure saisonnière", "Centre de remise en forme", "Plateau thé et café dans toutes les chambres"],
      },
      {
        title: "Services additionnels",
        items: ["Navette aéroport", "Location de voitures", "Bureau d'excursions", "Bagagerie", "Blanchisserie et ménage", "Barrières de sécurité pour enfants"],
      },
    ],
  },
} as const;

export default function AmenitiesPage() {
  const { t, language } = useLanguage();
  const copy = amenitiesPageCopy[language];

  return (
    <PageShell title={t.amenities.title} description={copy.description} image={siteImages.pool} slides={pageHeroSlides.amenities} eyebrow={copy.eyebrow}>
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {amenityHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.key} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-serif">{t.amenities[item.key as keyof typeof t.amenities]}</h2>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary/80">{item.headline}</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-12 rounded-[2rem] border border-border bg-card p-8 shadow-[0_14px_40px_rgba(0,0,0,0.05)] sm:p-10">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.detailsEyebrow}</p>
              <h2 className="mt-4 text-3xl font-serif sm:text-4xl">{copy.detailsTitle}</h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {copy.groups.map((group) => (
                <div key={group.title} className="rounded-[1.5rem] border border-border/70 bg-secondary/15 p-6">
                  <h3 className="text-2xl font-serif">{group.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

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
