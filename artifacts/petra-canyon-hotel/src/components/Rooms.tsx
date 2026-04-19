import { useLanguage } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import room1 from "@assets/generated_images/hotel_room.png";

export function Rooms() {
  const { t } = useLanguage();

  const rooms = [
    {
      key: "standard",
      img: room1,
    },
    {
      key: "deluxe",
      img: room1,
    },
    {
      key: "presidential",
      img: room1,
    },
    {
      key: "triple",
      img: room1,
    }
  ] as const;

  return (
    <section className="py-24 bg-background" id="rooms">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">{t.rooms.title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {rooms.map((room, index) => (
            <motion.div 
              key={room.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <img 
                  src={room.img} 
                  alt={t.rooms[room.key].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="bg-card border border-card-border border-t-0 rounded-b-lg p-6 md:p-8 shadow-sm group-hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-serif text-foreground mb-3">{t.rooms[room.key].name}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">{t.rooms[room.key].desc}</p>
                <span className="text-primary font-medium tracking-wide uppercase text-sm group-hover:underline underline-offset-4">
                  {t.rooms.book} →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
