import { useLanguage } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { hotelLocationInfo } from "@/content/site-content";

export function Location() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border/50 bg-secondary/20 py-16 sm:py-20 lg:py-24" id="location">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="mb-4 text-3xl font-serif text-foreground md:text-5xl">{t.location.title}</h2>
          <div className="mx-auto h-1 w-24 bg-primary"></div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-lg border border-card-border bg-card p-5 shadow-sm sm:p-8"
          >
            <div className="mb-8 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="min-w-0">
                <h3 className="font-serif text-xl mb-2 text-foreground">Address</h3>
                <p className="text-muted-foreground">{t.location.address}</p>
                <a
                  href={hotelLocationInfo.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition hover:bg-primary/10"
                >
                  Google Maps
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="min-w-0">
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
            className="rounded-lg border border-card-border bg-card p-5 shadow-sm sm:p-8"
          >
            <h3 className="font-serif text-xl mb-6 text-foreground">{t.location.distancesTitle}</h3>
            <ul className="space-y-4">
              {t.location.distances.map((dist, idx) => (
                <li key={idx} className="flex items-center justify-between gap-3 border-b border-border/50 pb-2 last:border-0">
                  <span className="min-w-0 text-sm text-muted-foreground sm:text-base">{dist.name}</span>
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
