import { useLanguage } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import restaurantImg from "@assets/generated_images/hotel_restaurant.png";

export function Restaurant() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24" id="restaurant">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-serif text-foreground md:text-5xl">{t.restaurant.title}</h2>
            <div className="mb-8 h-1 w-16 bg-primary"></div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.restaurant.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[280px] overflow-hidden rounded-lg shadow-xl sm:h-[360px] md:h-[440px] lg:h-[500px]"
          >
            <img 
              src={restaurantImg} 
              alt={t.restaurant.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
