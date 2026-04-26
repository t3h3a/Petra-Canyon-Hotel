import { PageShell } from "@/components/PageShell";
import { RoomCard } from "@/components/RoomCard";
import { useLanguage } from "@/components/LanguageProvider";
import { getLocalizedRoom, pageHeroSlides, siteImages } from "@/data";
import {
  formatRoomPrice,
  getRoomBadgeText,
  getRoomExtraBedNotice,
  getRoomPolicyText,
  useSheetRoomData,
} from "@/lib/sheet-room-data";
import { useSiteContent } from "@/lib/site-content";

export default function RoomsPage() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();
  const { roomSettings, extraBedPrice, isLoading: isRatesLoading, error: ratesError } = useSheetRoomData();

  return (
    <PageShell title={t.rooms.title} description={t.welcome.content} image={siteImages.room} slides={pageHeroSlides.rooms} eyebrow={t.nav.rooms}>
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-6 flex justify-end">
            <p className="text-sm text-muted-foreground">
              {isRatesLoading ? "Updating live rates..." : ratesError ? "Showing fallback rates." : "Live rates from Google Sheets"}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {content.rooms.map((room) => {
              const localizedRoom = getLocalizedRoom(room, language);
              const dynamicSettings = roomSettings[room.key];

              return (
                <RoomCard
                  key={room.key}
                  image={room.image}
                  title={localizedRoom.name}
                  description={localizedRoom.description}
                  perks={localizedRoom.perks}
                  size={room.size}
                  view={localizedRoom.view}
                  price={formatRoomPrice(dynamicSettings.price)}
                  occupancy={localizedRoom.occupancy}
                  availability={localizedRoom.availability}
                  policy={getRoomPolicyText(language, room.key, dynamicSettings, extraBedPrice)}
                  badge={getRoomBadgeText(language, dynamicSettings, extraBedPrice)}
                  extraBedNote={getRoomExtraBedNotice(language, dynamicSettings, extraBedPrice)}
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
