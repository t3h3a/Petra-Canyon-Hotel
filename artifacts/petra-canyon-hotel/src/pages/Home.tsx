import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { useLanguage } from "@/components/LanguageProvider";
import { amenityHighlights, diningMoments, roomCatalog, siteImages } from "@/content/site-content";
import slide1 from "../../../../img/صور رأيسية/صورة1.jpeg";
import slide2 from "../../../../img/صور رأيسية/صورة2.jpeg";
import slide3 from "../../../../img/صور رأيسية/صورة3.jpeg";
import slide4 from "../../../../img/صور رأيسية/صورة4.jpeg";
import slide5 from "../../../../img/صور رأيسية/صورة5.jpeg";

const LOGO_SRC = "/petra-canyon-logo.png?v=3";
const HOME_HERO_SLIDES = [slide1, slide2, slide3, slide4, slide5];

export default function Home() {
  const { t, dir, language } = useLanguage();

  const roomPreviewDescriptions = {
    en: {
      standard: "Warm contemporary room with plush bedding, smart work corner, minibar, and calm stone-inspired finishes.",
      deluxe: "Spacious stay with lounge seating, upgraded linens, premium bath amenities, and broad sunset-facing windows.",
    },
    ar: {
      standard: "غرفة دافئة بتصميم عصري مع سرير مريح وركن عمل أنيق وميني بار وتشطيبات هادئة مستوحاة من الحجر.",
      deluxe: "إقامة أوسع مع جلسة مريحة ومفروشات مطورة وتجهيزات حمام أفضل ونوافذ واسعة بإطلالة مميزة.",
    },
    fr: {
      standard: "Chambre contemporaine chaleureuse avec literie moelleuse, coin travail soigné, minibar et finitions apaisantes.",
      deluxe: "Séjour plus spacieux avec coin salon, linge amélioré, équipements de bain premium et larges fenêtres lumineuses.",
    },
  } as const;

  const amenityPreviewDescriptions = {
    en: [
      "Terraced swimming decks with sun loungers and a relaxed canyon backdrop.",
      "Cardio and strength essentials for guests keeping a full wellness routine.",
      "Breakfast buffet, curated lunch plates, and dinner service with local influence.",
      "Mocktails, coffee, and light bites served in a resort-style outdoor setting.",
    ],
    ar: [
      "مسابح خارجية مع جلسات استرخاء ومشهد هادئ ينسجم مع أجواء الوادي.",
      "معدات أساسية لتمارين اللياقة والقوة للضيوف الذين يحافظون على روتينهم اليومي.",
      "بوفيه إفطار وأطباق غداء مختارة وخدمة عشاء بنكهة محلية مميزة.",
      "مشروبات وقهوة ووجبات خفيفة تقدم بجانب المسبح في أجواء مريحة.",
    ],
    fr: [
      "Piscines extérieures en terrasses avec chaises longues et ambiance canyon apaisante.",
      "Équipements cardio et renforcement pour les voyageurs gardant leur routine bien-être.",
      "Buffet du matin, déjeuner soigné et dîner aux touches locales.",
      "Mocktails, café et bouchées légères servis dans une atmosphère extérieure détendue.",
    ],
  } as const;

  const roomPreviewCopy = roomPreviewDescriptions[language] as Record<string, string>;

  const diningPreviewDescriptions = {
    en: [
      "A generous buffet with baked goods, fruit, hot dishes, and Jordanian staples served in a bright morning setting.",
      "Light and hearty plates balanced for travelers returning from Petra or enjoying a day by the pool.",
      "Refined dinner service with warm lighting, international favorites, and authentic local flavors.",
    ],
    ar: [
      "بوفيه صباحي غني بالمخبوزات والفواكه والأطباق الساخنة والخيارات الأردنية في أجواء مشرقة.",
      "أطباق خفيفة ومشبعة تناسب العائدين من البترا أو الباحثين عن استراحة قرب المسبح.",
      "أجواء عشاء أنيقة بإضاءة دافئة ونكهات محلية وعالمية متوازنة.",
    ],
    fr: [
      "Buffet matinal généreux avec viennoiseries, fruits, plats chauds et saveurs jordaniennes.",
      "Assiettes légères et généreuses idéales après Petra ou pendant une journée piscine.",
      "Service du soir raffiné avec lumière chaude, classiques internationaux et touches locales.",
    ],
  } as const;

  const copy =
    language === "ar"
      ? {
          heroTitle: "\u062A\u062C\u0631\u0628\u0629 \u0625\u0642\u0627\u0645\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0628\u062A\u0635\u0645\u064A\u0645 \u0623\u0646\u064A\u0642 \u0648\u0648\u0627\u0636\u062D",
          exploreEyebrow: "\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0641\u0646\u062F\u0642",
          exploreTitle: "\u0643\u0644 \u0642\u0633\u0645 \u0623\u0633\u0627\u0633\u064A \u0623\u0635\u0628\u062D \u0644\u0647 \u0635\u0641\u062D\u062A\u0647 \u0627\u0644\u062E\u0627\u0635\u0629",
          exploreBody:
            "\u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u062A\u062C\u0645\u064A\u0639 \u0643\u0644 \u0634\u064A\u0621 \u0641\u064A \u0635\u0641\u062D\u0629 \u0648\u0627\u062D\u062F\u0629 \u0637\u0648\u064A\u0644\u0629\u060C \u0623\u0635\u0628\u062D \u0628\u0625\u0645\u0643\u0627\u0646 \u0627\u0644\u0636\u064A\u0641 \u0627\u0644\u062A\u0646\u0642\u0644 \u0628\u064A\u0646 \u0627\u0644\u063A\u0631\u0641 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0648\u0627\u0644\u0645\u0637\u0639\u0645 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0628\u0634\u0643\u0644 \u0623\u0648\u0636\u062D.",
          cards: [
            {
              href: "/rooms",
              title: "\u0627\u0644\u063A\u0631\u0641 \u0648\u0627\u0644\u0623\u062C\u0646\u062D\u0629",
              description: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u063A\u0631\u0641 \u0645\u0639 \u0645\u0642\u0627\u0631\u0646\u0627\u062A \u0623\u0648\u0636\u062D \u0648\u0635\u0648\u0631 \u0623\u0641\u0636\u0644 \u0648\u0645\u0633\u0627\u0631 \u062D\u062C\u0632 \u0645\u0628\u0627\u0634\u0631.",
            },
            {
              href: "/amenities",
              title: "\u0627\u0644\u0645\u0631\u0627\u0641\u0642",
              description: "\u0627\u0644\u0631\u0627\u062D\u0629 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0648\u062F\u0639\u0645 \u0627\u0644\u0631\u062D\u0644\u0629 \u0645\u0639\u0631\u0648\u0636\u0629 \u0628\u0637\u0631\u064A\u0642\u0629 \u062A\u0639\u0643\u0633 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0641\u0646\u062F\u0642.",
            },
            {
              href: "/restaurant",
              title: "\u0627\u0644\u0645\u0637\u0639\u0645",
              description: "\u0645\u0634\u0627\u0647\u062F \u0637\u0639\u0627\u0645 \u0623\u063A\u0646\u0649 \u0648\u0635\u0648\u0631 \u0623\u0642\u0648\u0649 \u0648\u0623\u062C\u0648\u0627\u0621 \u0623\u0643\u062B\u0631 \u062C\u0627\u0630\u0628\u064A\u0629.",
            },
            {
              href: "/location",
              title: "\u0627\u0644\u0645\u0648\u0642\u0639",
              description: "\u0645\u0639\u0627\u0644\u0645 \u0642\u0631\u064A\u0628\u0629 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0648\u0635\u0648\u0644 \u0648\u0623\u0633\u0628\u0627\u0628 \u0645\u062B\u0627\u0644\u064A\u0629 \u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0646\u062F\u0642 \u0644\u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0628\u062A\u0631\u0627.",
            },
          ],
          openPage: "\u0627\u0641\u062A\u062D \u0627\u0644\u0635\u0641\u062D\u0629",
          featuredEyebrow: "\u0625\u0642\u0627\u0645\u0629 \u0645\u0645\u064A\u0632\u0629",
          diningEyebrow: "\u0644\u0645\u062D\u0629 \u0639\u0646 \u0627\u0644\u0645\u0637\u0639\u0645",
          diningTitle: "\u062A\u062C\u0631\u0628\u0629 \u0645\u0637\u0639\u0645 \u0623\u063A\u0646\u0649 \u0648\u0623\u0643\u062B\u0631 \u0639\u0645\u0642\u0627\u064B",
          diningLink: "\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0637\u0639\u0645",
          heroBadge: "\u0641\u0646\u062F\u0642 \u0628\u062A\u0631\u0627 \u0643\u0627\u0646\u064A\u0648\u0646",
          desktopBrand: "Petra Canyon",
        }
      : language === "fr"
        ? {
            heroTitle: "Une exp\u00E9rience de s\u00E9jour compl\u00E8te, con\u00E7ue avec plus d'\u00E9l\u00E9gance",
            exploreEyebrow: "D\u00E9couvrir l'h\u00F4tel",
            exploreTitle: "Chaque grand espace dispose maintenant de sa propre page",
            exploreBody:
              "Au lieu de tout compresser dans une seule page, les clients peuvent d\u00E9sormais parcourir les chambres, les services, le restaurant et l'emplacement avec plus de clart\u00E9.",
            cards: [
              {
                href: "/rooms",
                title: "Chambres & Suites",
                description: "Types de chambres mieux compar\u00E9s, visuels plus forts et acc\u00E8s direct \u00E0 la r\u00E9servation.",
              },
              {
                href: "/amenities",
                title: "Services",
                description: "Bien-\u00EAtre, confort et accompagnement du voyage pr\u00E9sent\u00E9s comme une vraie exp\u00E9rience h\u00F4teli\u00E8re.",
              },
              {
                href: "/restaurant",
                title: "Restaurant",
                description: "Moments culinaires, meilleure imagerie et ambiance plus immersive.",
              },
              {
                href: "/location",
                title: "Emplacement",
                description: "Sites proches, informations d'arriv\u00E9e et atouts du lieu pour visiter P\u00E9tra.",
              },
            ],
            openPage: "Ouvrir la page",
            featuredEyebrow: "S\u00E9jour en vedette",
            diningEyebrow: "Aper\u00E7u du restaurant",
            diningTitle: "Une pr\u00E9sentation du restaurant plus riche et plus immersive",
            diningLink: "Voir la page restaurant",
            heroBadge: "Hotel Petra Canyon",
            desktopBrand: "Petra Canyon",
          }
        : {
            heroTitle: "A complete stay experience with a more polished multi-page design",
            exploreEyebrow: "Explore the hotel",
            exploreTitle: "Each major area now has its own dedicated page",
            exploreBody:
              "Instead of compressing everything into one long page, guests can move through rooms, services, dining, and location with clearer context.",
            cards: [
              {
                href: "/rooms",
                title: "Rooms & Suites",
                description: "Dedicated room types with stronger comparisons, visuals, and direct booking paths.",
              },
              {
                href: "/amenities",
                title: "Amenities",
                description: "Wellness, convenience, and travel-support services presented as a premium experience.",
              },
              {
                href: "/restaurant",
                title: "Restaurant",
                description: "Dining moments, richer imagery, and a clearer sense of atmosphere and culinary range.",
              },
              {
                href: "/location",
                title: "Location",
                description: "Nearby landmarks, arrival details, and why the hotel is well placed for Petra trips.",
              },
            ],
            openPage: "Open page",
            featuredEyebrow: "Featured stay",
            diningEyebrow: "Dining preview",
            diningTitle: "Restaurant storytelling with more depth",
            diningLink: "View dining page",
            heroBadge: "Petra Canyon Hotel",
            desktopBrand: "Petra Canyon",
          };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-background">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-stone-950 pt-28 sm:pt-32">
        <HeroSlideshow
          slides={HOME_HERO_SLIDES}
          fallbackImage={siteImages.hero}
          intervalMs={6000}
          overlayClassName="bg-[radial-gradient(circle_at_top,rgba(229,149,111,0.34),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_26%),linear-gradient(135deg,rgba(12,10,10,0.3),rgba(12,10,10,0.78))]"
          topGlowClassName="bg-[linear-gradient(180deg,rgba(10,8,8,0.58),transparent)]"
          bottomGlowClassName="bg-[linear-gradient(180deg,transparent,rgba(12,10,10,0.72))]"
        />

        <div className="relative container mx-auto px-4 pb-10 sm:px-6 sm:pb-14 lg:pb-18">
          <div className={`mb-8 hidden lg:flex ${dir === "rtl" ? "justify-end" : "justify-start"}`}>
            <div className="rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.38em] text-white/90">
              {copy.desktopBrand}
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mx-auto mb-8 hidden w-full justify-center lg:flex">
              <img
                src={LOGO_SRC}
                alt="Petra Canyon logo"
                className="h-32 w-auto object-contain brightness-0 invert drop-shadow-[0_16px_30px_rgba(0,0,0,0.45)] xl:h-36"
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.heroBadge}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 text-4xl font-serif sm:text-5xl lg:text-7xl"
            >
              {copy.heroTitle}
            </motion.h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              {t.welcome.content}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-6xl lg:mt-10">
            <BookingWidget />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 lg:h-28">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,10,0)_0%,rgba(13,10,10,0.12)_34%,rgba(247,241,234,0.22)_70%,rgba(247,241,234,0.72)_100%)]" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f1ea_0%,#fbf7f2_20%,hsl(var(--background))_100%)] pt-18 pb-16 sm:pt-22 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(180deg,rgba(247,241,234,0.62),rgba(251,247,242,0.16),rgba(255,255,255,0))]" />
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.34),rgba(255,255,255,0)_72%)]" />
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.featuredEyebrow}</p>
            <h2 className="mt-4 text-3xl font-serif sm:text-4xl">{t.rooms.title}</h2>
            <div className="mt-8 grid gap-4">
              {roomCatalog.slice(0, 2).map((room) => (
                <div key={room.key} className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 shadow-[0_18px_55px_rgba(49,27,18,0.07)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-serif">{t.rooms[room.key].name}</h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {room.size}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{roomPreviewCopy[room.key]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {amenityHighlights.slice(0, 4).map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 shadow-[0_18px_55px_rgba(49,27,18,0.07)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{t.amenities[item.key as keyof typeof t.amenities]}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{amenityPreviewDescriptions[language][index]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fcfaf7_0%,#ffffff_60%,#fbf7f2_100%)] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_center,rgba(214,171,146,0.08),rgba(214,171,146,0)_70%)]" />
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

          <div className="grid gap-6 lg:grid-cols-3">
            {diningMoments.map((moment, index) => (
              <article key={moment.title} className="overflow-hidden rounded-[1.75rem] border border-[rgba(211,196,185,0.6)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(251,246,240,0.88))] shadow-[0_22px_70px_rgba(49,27,18,0.08)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1">
                <div className="relative h-60">
                  <img src={moment.image} alt={moment.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif">{moment.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{diningPreviewDescriptions[language][index]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
