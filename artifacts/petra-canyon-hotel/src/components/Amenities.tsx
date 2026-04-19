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
    <section className="py-24 bg-secondary/30" id="amenities">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">{t.amenities.title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {amenities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-card-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
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
