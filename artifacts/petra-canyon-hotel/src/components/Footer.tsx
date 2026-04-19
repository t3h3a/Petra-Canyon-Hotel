import { useLanguage } from "@/components/LanguageProvider";
import { FaWhatsapp, FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { 
  SiVisa, SiMastercard, SiAmericanexpress, 
  SiJcb, SiDiscover 
} from "react-icons/si";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-neutral-800 pb-12">
          
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-white mb-6">Petra Canyon</h3>
            <p className="text-sm opacity-80">
              {t.location.address}
            </p>
            <p className="text-sm font-semibold text-white/90">
              <a href="mailto:info@petracanyonhotel.com" className="hover:text-primary transition-colors">info@petracanyonhotel.com</a>
            </p>
            <p className="text-sm font-semibold text-white/90" dir="ltr">
              <a href="tel:+96232156266" className="hover:text-primary transition-colors">+962 3 215 6266</a>
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl text-white mb-6">{t.footer.contact}</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://wa.me/962777000000" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" /> WhatsApp
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
            <h4 className="font-serif text-xl text-white mb-6">{t.footer.follow}</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl text-white mb-6">{t.footer.payments}</h4>
            <div className="flex flex-wrap gap-3">
              <SiVisa className="w-10 h-8 opacity-70" />
              <SiMastercard className="w-10 h-8 opacity-70" />
              <SiAmericanexpress className="w-10 h-8 opacity-70" />
              <SiJcb className="w-10 h-8 opacity-70" />
              <SiDiscover className="w-10 h-8 opacity-70" />
            </div>
          </div>

        </div>

        <div className="text-center text-sm opacity-60">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
