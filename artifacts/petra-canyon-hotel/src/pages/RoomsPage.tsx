import { Link } from "wouter";
import { BedDouble, Check, CircleAlert, Users } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getLocalizedRoom, roomCatalog, siteImages } from "@/content/site-content";
import { pageHeroSlides } from "@/content/page-hero-slides";

const roomRules = {
  standardSingle: {
    allowed: false,
    en: "For one guest only, with no extra guest allowed.",
    ar: "غرفة لشخص واحد فقط ولا تقبل أي إضافة.",
    fr: "Pour une personne uniquement, sans ajout possible.",
  },
  standardDouble: {
    allowed: false,
    en: "For two guests only, with no extra bed.",
    ar: "غرفة لشخصين فقط ولا تقبل إضافة تخت.",
    fr: "Pour deux personnes uniquement, sans lit supplémentaire.",
  },
  standardTwin: {
    allowed: false,
    en: "Twin setup for two guests only, with no extra bed.",
    ar: "غرفة بسريرين لشخصين فقط ولا تقبل إضافة تخت.",
    fr: "Deux lits simples pour deux personnes, sans lit supplementaire.",
  },
  deluxeDouble: {
    allowed: true,
    en: "Fits two guests, with one extra guest possible.",
    ar: "تتسع لشخصين ويمكن إضافة شخص واحد فقط.",
    fr: "Pour deux personnes avec la possibilite d'ajouter une seule personne.",
  },
  deluxeTwin: {
    allowed: true,
    en: "Fits two guests, with one extra guest possible.",
    ar: "تتسع لشخصين ويمكن إضافة شخص واحد فقط.",
    fr: "Pour deux personnes avec la possibilite d'ajouter une seule personne.",
  },
  superiorTriple: {
    allowed: true,
    en: "Three beds for three guests, with paid extra arrangement on request.",
    ar: "غرفة بثلاثة أسرّة وثلاثة أشخاص، مع إمكانية ترتيب إضافة حسب الطلب.",
    fr: "Trois lits pour trois personnes, avec supplement possible sur demande.",
  },
  suite: {
    allowed: true,
    en: "Base capacity for two guests, with one extra bed possible.",
    ar: "السعة الأساسية لشخصين ويمكن إضافة تخت لشخص إضافي.",
    fr: "Capacite de base pour deux personnes avec un lit supplementaire possible.",
  },
  presidentialSuite: {
    allowed: true,
    en: "Base capacity for two guests, with one extra bed possible.",
    ar: "السعة الأساسية لشخصين ويمكن إضافة تخت لشخص إضافي.",
    fr: "Capacite de base pour deux personnes avec un lit supplementaire possible.",
  },
} as const;

export default function RoomsPage() {
  const { t, language } = useLanguage();

  const copy =
    language === "ar"
      ? {
          description: "تعرّف على أسعار الغرف الرسمية وسياسة الأطفال والإضافة لكل نوع غرفة بشكل واضح ومنظّم.",
          eyebrow: "الغرف",
          exploreLocation: "استكشف الموقع",
          sectionTitle: "أسعار الغرف",
          sectionBody: "الأسعار التالية هي الأسعار الأساسية للغرفة، وسيتم احتساب أي سرير إضافي وفق السياسة الموضحة أدناه.",
          nightlyRate: "السعر لليلة الواحدة",
          rateHint: "السعر الأساسي للغرفة",
          roomPolicyTitle: "سياسة هذه الغرفة",
          extraBedAllowed: "إضافة تخت متاحة",
          extraBedBlocked: "لا يمكن إضافة تخت",
          extraBedPrice: "سعر التخت الإضافي 15 دينار للشخص",
          childrenPolicyTitle: "سياسة الأطفال والإضافات",
          childrenUnderSix: "الأطفال تحت 6 سنوات: مجانًا",
          childOverSix: "من عمر 6 سنوات فما فوق: يُحسب كشخص بالغ",
          extraBedGeneral: "سعر إضافة التخت: 15 دينار للشخص الواحد",
          extraBedAllowedRooms: "إضافة التخت متاحة فقط في: غرف الديلوكس، الترابل، السويت، البريدينشال سويت",
          extraBedBlockedRooms: "إضافة التخت غير متاحة في: غرفة السنجل، الستاندارد توين، الستاندارد دبل",
          ageNote: "أي شخص عمره 6 سنوات أو أكثر يحتاج إلى تخت إضافي عند الزيادة عن السعة الأساسية للغرفة.",
        }
      : language === "fr"
        ? {
            description: "Consultez les tarifs officiels des chambres et la politique enfants/lit supplementaire pour chaque categorie.",
            eyebrow: "Chambres",
            exploreLocation: "Voir l'emplacement",
            sectionTitle: "Tarifs des chambres",
            sectionBody: "Les prix ci-dessous correspondent au tarif de base de la chambre. Tout lit supplementaire suit la politique indiquee.",
            nightlyRate: "Tarif par nuit",
            rateHint: "Tarif de base de la chambre",
            roomPolicyTitle: "Politique de cette chambre",
            extraBedAllowed: "Lit supplementaire disponible",
            extraBedBlocked: "Lit supplementaire non disponible",
            extraBedPrice: "Lit supplementaire: 15 JOD par personne",
            childrenPolicyTitle: "Politique enfants et supplements",
            childrenUnderSix: "Enfants de moins de 6 ans: gratuit",
            childOverSix: "A partir de 6 ans: compte comme un adulte",
            extraBedGeneral: "Lit supplementaire: 15 JOD par personne",
            extraBedAllowedRooms: "Disponible uniquement pour: Deluxe, Triple, Suite, Suite Presidentielle",
            extraBedBlockedRooms: "Non disponible pour: Single, Standard Twin, Standard Double",
            ageNote: "Toute personne de 6 ans ou plus a besoin d'un lit supplementaire si la capacite de base est depassee.",
          }
        : {
            description: "Review the official room rates together with the child policy and extra-bed rules for each stay type.",
            eyebrow: "Rooms",
            exploreLocation: "Explore location",
            sectionTitle: "Room rates",
            sectionBody: "The rates below are the base room prices. Any extra bed is charged according to the policy shown below.",
            nightlyRate: "Rate per night",
            rateHint: "Base room rate",
            roomPolicyTitle: "Room policy",
            extraBedAllowed: "Extra bed available",
            extraBedBlocked: "Extra bed not available",
            extraBedPrice: "Extra bed costs JOD 15 per person",
            childrenPolicyTitle: "Children and extra-bed policy",
            childrenUnderSix: "Children under 6 years old: free",
            childOverSix: "Guests aged 6 and above are counted as adults",
            extraBedGeneral: "Extra bed price: JOD 15 per person",
            extraBedAllowedRooms: "Extra bed is available only in: Deluxe, Triple, Suite, Presidential Suite",
            extraBedBlockedRooms: "Extra bed is not available in: Single, Standard Twin, Standard Double",
            ageNote: "Any guest aged 6 or more needs an extra bed when exceeding the room's base capacity.",
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
          <div className="mx-auto mb-10 max-w-4xl rounded-[2rem] border border-primary/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(248,240,233,0.96))] p-6 shadow-[0_24px_80px_rgba(32,18,12,0.08)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">{copy.sectionTitle}</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{copy.sectionBody}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border/80 bg-card p-5">
                <h3 className="flex items-center gap-2 text-lg font-serif">
                  <Users className="h-5 w-5 text-primary" />
                  {copy.childrenPolicyTitle}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li>{copy.childrenUnderSix}</li>
                  <li>{copy.childOverSix}</li>
                  <li>{copy.extraBedGeneral}</li>
                  <li>{copy.ageNote}</li>
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-border/80 bg-card p-5">
                <h3 className="flex items-center gap-2 text-lg font-serif">
                  <BedDouble className="h-5 w-5 text-primary" />
                  {copy.roomPolicyTitle}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                  <li>{copy.extraBedAllowedRooms}</li>
                  <li>{copy.extraBedBlockedRooms}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {roomCatalog.map((room) => {
              const localizedRoom = getLocalizedRoom(room, language);
              const rule = roomRules[room.key];

              return (
                <article
                  key={room.key}
                  className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
                >
                  <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative min-h-[18rem]">
                      <img src={room.image} alt={localizedRoom.name} className="absolute inset-0 h-full w-full object-cover" />
                    </div>

                    <div className="flex flex-col p-6 sm:p-8">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                          {room.size}
                        </span>
                        <span className="rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80">
                          {localizedRoom.view}
                        </span>
                      </div>

                      <h2 className="mt-5 text-3xl font-serif">{localizedRoom.name}</h2>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{localizedRoom.description}</p>

                      <div className="mt-6 flex items-center gap-2 text-sm text-foreground/80">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{localizedRoom.occupancy}</span>
                      </div>

                      <ul className="mt-6 space-y-3">
                        {localizedRoom.perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 rounded-[1.5rem] border border-primary/10 bg-secondary/20 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">{copy.nightlyRate}</p>
                        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-3xl font-semibold text-foreground">{room.currentPrice}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{copy.rateHint}</p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              rule.allowed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {rule.allowed ? copy.extraBedAllowed : copy.extraBedBlocked}
                          </span>
                        </div>

                        <div className="mt-4 rounded-2xl border border-border/60 bg-background/80 p-4">
                          <p className="text-sm font-semibold text-foreground">{copy.roomPolicyTitle}</p>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{rule[language]}</p>
                          {rule.allowed ? (
                            <p className="mt-2 text-sm font-medium text-primary">{copy.extraBedPrice}</p>
                          ) : null}
                        </div>
                      </div>

                      <p className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary/35 px-4 py-3 text-sm leading-6 text-muted-foreground">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{copy.ageNote}</span>
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
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
