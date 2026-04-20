import { useLanguage } from "@/components/LanguageProvider";
import { hotelLocationInfo } from "@/content/site-content";
import { FaWhatsapp, FaFacebook, FaYoutube, FaLinkedin, FaStar } from "react-icons/fa";
import { 
  SiVisa, SiMastercard, SiAmericanexpress, 
  SiJcb, SiDiscover 
} from "react-icons/si";

export function Footer() {
  const { t, language } = useLanguage();
  const reviewCopy =
    language === "ar"
      ? {
          title: "كيف كانت إقامتك؟",
          body: "إذا أعجبتك التجربة، قيّمنا على Google وساعد ضيوفاً آخرين في اكتشاف الفندق.",
          action: "قيّمنا",
        }
      : language === "fr"
        ? {
            title: "Comment s'est passé votre séjour ?",
            body: "Si votre expérience vous a plu, laissez-nous une note sur Google et aidez d'autres voyageurs à nous découvrir.",
            action: "Donnez votre avis",
          }
        : {
            title: "How was your stay?",
            body: "If you enjoyed your experience, rate us on Google and help other guests discover the hotel.",
            action: "Rate Us",
          };

  return (
    <footer className="bg-neutral-900 py-14 text-neutral-300 sm:py-16" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 grid grid-cols-1 gap-8 border-b border-neutral-800 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:pb-12">
          
          <div className="space-y-4">
            <h3 className="mb-4 font-serif text-2xl text-white">Petra Canyon</h3>
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(196,137,111,0.14))] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.18)]">
              <div className="flex justify-center gap-2 text-primary sm:justify-start">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar key={index} className="h-4 w-4" />
                ))}
              </div>
              <h4 className="mt-3 font-serif text-xl text-white">{reviewCopy.title}</h4>
              <p className="mt-2 text-sm leading-6 text-white/72">
                {reviewCopy.body}
              </p>
              <a
                href={hotelLocationInfo.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                {reviewCopy.action}
              </a>
            </div>
            <p className="max-w-xs text-sm leading-6 opacity-80">
              {t.location.address}
            </p>
            <a
              href={hotelLocationInfo.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:border-primary/40 hover:bg-primary/10"
            >
              Google Maps
            </a>
            <p className="break-all text-sm font-semibold text-white/90">
              <a href="mailto:reservations@petracanyon.com" className="hover:text-primary transition-colors">reservations@petracanyon.com</a>
            </p>
            <p className="text-sm font-semibold text-white/90" dir="ltr">
              <a href="tel:+96232154333" className="hover:text-primary transition-colors">+962 321 54 333</a>
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-serif text-xl text-white">{t.footer.contact}</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://api.whatsapp.com/send/?phone=%2B962778844335&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" /> +962 77 88 44 33 5
              </a>
              <a 
                href="https://www.booking.com/hotel/jo/petra-canyon.en-gb.html" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Booking.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-serif text-xl text-white">{t.footer.follow}</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.facebook.com/profile.php?id=100076396955662" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@petracanyonhotel" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://jo.linkedin.com/company/petra-canyon" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-serif text-xl text-white">{t.footer.payments}</h4>
            <div className="flex flex-wrap gap-3">
              <SiVisa className="w-10 h-8 opacity-70" />
              <SiMastercard className="w-10 h-8 opacity-70" />
              <SiAmericanexpress className="w-10 h-8 opacity-70" />
              <SiJcb className="w-10 h-8 opacity-70" />
              <SiDiscover className="w-10 h-8 opacity-70" />
            </div>
          </div>

        </div>

        <div className="text-center text-xs opacity-60 sm:text-sm">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
