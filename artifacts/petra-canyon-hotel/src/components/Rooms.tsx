import { useLanguage } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import room1 from "@assets/generated_images/hotel_room.png";

export function Rooms() {
  const { t } = useLanguage();

  const rooms = [
    { key: "standard", img: room1 },
    { key: "deluxe", img: room1 },
    { key: "presidential", img: room1 },
    { key: "triple", img: room1 },
  ] as const;

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24" id="rooms">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="mb-4 text-3xl font-serif text-foreground md:text-5xl">{t.rooms.title}</h2>
          <div className="mx-auto h-1 w-24 bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:gap-10">
          {rooms.map((room, index) => (
            <motion.div
              key={room.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex h-full cursor-pointer flex-col"
            >
              <div className="relative h-56 overflow-hidden rounded-t-lg sm:h-64 md:h-72 lg:h-80">
                <div className="absolute inset-0 z-10 bg-black/20 transition-colors group-hover:bg-black/10" />
                <img
                  src={room.img}
                  alt={t.rooms[room.key].name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col rounded-b-lg border border-card-border border-t-0 bg-card p-5 shadow-sm transition-shadow group-hover:shadow-md md:p-6 lg:p-8">
                <h3 className="mb-3 text-xl font-serif text-foreground sm:text-2xl">{t.rooms[room.key].name}</h3>
                <p className="mb-6 line-clamp-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  {t.rooms[room.key].desc}
                </p>
                <span className="mt-auto text-sm font-medium uppercase tracking-wide text-primary underline-offset-4 group-hover:underline">
                  {t.rooms.book}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
