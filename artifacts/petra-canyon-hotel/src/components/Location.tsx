import { useLanguage } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

export function Location() {
  const { t, dir } = useLanguage();

  return (
    <section className="py-24 bg-secondary/20 border-t border-border/50" id="location">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">{t.location.title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card p-8 rounded-lg shadow-sm border border-card-border"
          >
            <div className="flex items-start gap-4 mb-8">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-xl mb-2 text-foreground">Address</h3>
                <p className="text-muted-foreground">{t.location.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-xl mb-2 text-foreground">Check-in / Check-out</h3>
                <p className="text-muted-foreground">{t.location.checkInOut}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 rounded-lg shadow-sm border border-card-border"
          >
            <h3 className="font-serif text-xl mb-6 text-foreground">{t.location.distancesTitle}</h3>
            <ul className="space-y-4">
              {t.location.distances.map((dist, idx) => (
                <li key={idx} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0">
                  <span className="text-muted-foreground">{dist.name}</span>
                  <span className="font-medium text-foreground bg-secondary/50 px-2 py-1 rounded text-sm" dir="ltr">
                    {dist.dist}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
