import { useLanguage } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Rooms } from "@/components/Rooms";
import { Amenities } from "@/components/Amenities";
import { Restaurant } from "@/components/Restaurant";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Welcome Section */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-8">
              {t.welcome.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              {t.welcome.content}
            </p>
          </motion.div>
        </div>
      </section>

      <Rooms />
      <Amenities />
      <Restaurant />
      <Location />
      <Footer />
    </div>
  );
}
