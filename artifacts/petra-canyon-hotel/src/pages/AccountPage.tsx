import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AccountPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const [, navigate] = useLocation();
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      fullName: user.fullName,
      phone: user.phone,
      country: user.country,
    });
  }, [user]);

  if (!isAuthenticated || !user) {
    navigate("/login");
    return null;
  }

  const copy =
    language === "ar"
      ? {
          title: "حسابي",
          body: "حدّث بياناتك الأساسية حتى تُملأ تلقائياً داخل صفحة طلب الحجز.",
          fullName: "الاسم الكامل",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف",
          country: "الدولة",
          save: "حفظ التغييرات",
          logout: "تسجيل الخروج",
          saved: "تم حفظ البيانات بنجاح.",
        }
      : language === "fr"
        ? {
            title: "Mon compte",
            body: "Mettez à jour vos informations principales pour qu'elles soient remplies automatiquement dans la demande de réservation.",
            fullName: "Nom complet",
            email: "E-mail",
            phone: "Téléphone",
            country: "Pays",
            save: "Enregistrer",
            logout: "Se déconnecter",
            saved: "Les informations ont bien été enregistrées.",
          }
        : {
            title: "My account",
            body: "Update your main details so they are filled automatically inside the booking request form.",
            fullName: "Full name",
            email: "Email",
            phone: "Phone",
            country: "Country",
            save: "Save changes",
            logout: "Logout",
            saved: "Your profile changes were saved.",
          };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[linear-gradient(180deg,#f5efe8_0%,#f9f4ed_40%,#fffdfb_100%)]">
      <Navbar />

      <section className="container mx-auto px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_70px_rgba(43,27,21,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
          <h1 className="text-4xl font-serif text-foreground">{copy.title}</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{copy.body}</p>

          <div className="mt-8 grid gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{copy.fullName}</label>
              <Input
                value={form.fullName}
                onChange={(e) => {
                  setStatus("");
                  setForm((current) => ({ ...current, fullName: e.target.value }));
                }}
                className="h-12 rounded-2xl border-primary/10 bg-background/70"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{copy.email}</label>
              <Input value={user.email} readOnly className="h-12 rounded-2xl border-primary/10 bg-secondary/25" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{copy.phone}</label>
                <Input
                  value={form.phone}
                  onChange={(e) => {
                    setStatus("");
                    setForm((current) => ({ ...current, phone: e.target.value }));
                  }}
                  className="h-12 rounded-2xl border-primary/10 bg-background/70"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{copy.country}</label>
                <Input
                  value={form.country}
                  onChange={(e) => {
                    setStatus("");
                    setForm((current) => ({ ...current, country: e.target.value }));
                  }}
                  className="h-12 rounded-2xl border-primary/10 bg-background/70"
                />
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <Button
                type="button"
                className="h-12 rounded-full px-6 text-sm font-semibold"
                onClick={() => {
                  updateProfile(form);
                  setStatus(copy.saved);
                }}
              >
                {copy.save}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-full px-6 text-sm font-semibold"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                {copy.logout}
              </Button>
            </div>

            {status && <p className="text-sm font-medium text-primary">{status}</p>}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
