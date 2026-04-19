import { useLanguage } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import restaurantImg from "@assets/generated_images/hotel_restaurant.png";

export function Restaurant() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background" id="restaurant">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">{t.restaurant.title}</h2>
            <div className="w-16 h-1 bg-primary mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.restaurant.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
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
