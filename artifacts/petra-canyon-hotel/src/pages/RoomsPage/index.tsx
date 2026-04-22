import { useEffect, useMemo, useState } from "react";

import { PageShell } from "@/components/PageShell";
import { RoomCard } from "@/components/RoomCard";
import { useLanguage } from "@/components/LanguageProvider";
import { apiRoomTypeToKey, fetchApiRooms, type ApiRoom } from "@/lib/hotel-api";
import { getLocalizedRoom, pageHeroSlides, siteImages } from "@/data";
import { useSiteContent } from "@/lib/site-content";

const roomRules = {
  standardSingle: { en: "For one guest only, with no extra guest allowed.", ar: "لشخص واحد فقط، ولا تقبل أي إضافة.", fr: "Pour une personne uniquement, sans ajout possible." },
  standardDouble: { en: "For two guests only, with no extra bed.", ar: "لشخصين فقط، ولا تقبل سريراً إضافياً.", fr: "Pour deux personnes uniquement, sans lit supplémentaire." },
  standardTwin: { en: "Twin setup for two guests only, with no extra bed.", ar: "بسريرين لشخصين فقط، ولا تقبل سريراً إضافياً.", fr: "Deux lits pour deux personnes uniquement, sans lit supplémentaire." },
  deluxeDouble: { en: "Fits two guests, with one extra guest possible.", ar: "تتسع لشخصين مع إمكانية إضافة شخص واحد.", fr: "Pour deux personnes avec possibilité d'ajouter une personne." },
  deluxeTwin: { en: "Fits two guests, with one extra guest possible.", ar: "تتسع لشخصين مع إمكانية إضافة شخص واحد.", fr: "Pour deux personnes avec possibilité d'ajouter une personne." },
  superiorTriple: { en: "Three beds for three guests, with paid extra arrangement on request.", ar: "ثلاثة أسرّة لثلاثة ضيوف مع ترتيب إضافي مدفوع عند الطلب.", fr: "Trois lits pour trois personnes avec supplément sur demande." },
  suite: { en: "Base capacity for two guests, with one extra bed possible.", ar: "السعة الأساسية لشخصين مع إمكانية سرير إضافي.", fr: "Capacité de base pour deux personnes avec un lit supplémentaire possible." },
  presidentialSuite: { en: "Base capacity for two guests, with one extra bed possible.", ar: "السعة الأساسية لشخصين مع إمكانية سرير إضافي.", fr: "Capacité de base pour deux personnes avec un lit supplémentaire possible." },
} as const;

export default function RoomsPage() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();
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

  const catalogWithApi = useMemo(
    () =>
      content.rooms.map((room) => ({
        room,
        apiRoom: apiRooms.find((apiRoom) => apiRoomTypeToKey[apiRoom.roomType] === room.key) ?? null,
      })),
    [apiRooms, content.rooms],
  );

  return (
    <PageShell title={t.rooms.title} description={t.welcome.content} image={siteImages.room} slides={pageHeroSlides.rooms} eyebrow={t.nav.rooms}>
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {catalogWithApi.map(({ room, apiRoom }) => {
              const localizedRoom = getLocalizedRoom(room, language);
              return (
                <RoomCard
                  key={room.key}
                  image={room.image}
                  title={localizedRoom.name}
                  description={localizedRoom.description}
                  perks={localizedRoom.perks}
                  size={room.size}
                  view={localizedRoom.view}
                  price={apiRoom ? `JOD ${apiRoom.price}` : room.currentPrice}
                  occupancy={apiRoom ? `${localizedRoom.occupancy} • ${apiRoom.capacity}` : localizedRoom.occupancy}
                  availability={apiRoom?.availability && apiRoom.availability !== "available" ? apiRoom.availability : localizedRoom.availability}
                  policy={roomRules[room.key][language]}
                  badge={room.taxes}
                  ctaLabel={t.booking.search}
                  ctaHref="https://www.booking.com/hotel/jo/petra-canyon.en-gb.html"
                  secondaryLabel={t.nav.location}
                  secondaryHref="/location"
                />
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
