import { useLanguage } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import { 
  Waves, Dumbbell, Utensils, GlassWater, 
  Wifi, Car, Bell, Coffee, 
  Plane, DollarSign, Users, Map 
} from "lucide-react";

export function Amenities() {
  const { t } = useLanguage();

  const amenities = [
    { icon: Waves, key: 'pool' },
    { icon: Dumbbell, key: 'fitness' },
    { icon: Utensils, key: 'restaurant' },
    { icon: GlassWater, key: 'bar' },
    { icon: Wifi, key: 'wifi' },
    { icon: Car, key: 'parking' },
    { icon: Bell, key: 'frontDesk' },
    { icon: Coffee, key: 'roomService' },
    { icon: Plane, key: 'shuttle' },
    { icon: DollarSign, key: 'exchange' },
    { icon: Users, key: 'meeting' },
    { icon: Map, key: 'tour' },
  ] as const;

  return (
    <section className="bg-secondary/30 py-16 sm:py-20 lg:py-24" id="amenities">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="mb-4 text-3xl font-serif text-foreground md:text-5xl">{t.amenities.title}</h2>
          <div className="mx-auto h-1 w-24 bg-primary"></div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {amenities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex min-h-[9.5rem] flex-col items-center rounded-lg border border-card-border bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm md:text-base font-medium text-foreground">
                  {t.amenities[item.key]}
                </h4>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
