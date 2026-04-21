import { useState } from "react";
import { Link, useLocation } from "wouter";
import { LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteImages } from "@/content/site-content";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";

type AuthMode = "login" | "signup";

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const { language } = useLanguage();
  const { login, register } = useAuth();
  const [, navigate] = useLocation();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    country: "",
  });

  const copy =
    language === "ar"
      ? {
          loginTitle: "تسجيل الدخول",
          loginBody: "سجل الدخول حتى تملأ بيانات الحجز بسرعة ويصل طلبك من الحساب الذي تستخدمه في الموقع.",
          signupTitle: "إنشاء حساب",
          signupBody: "أنشئ حساباً بسيطاً ليتم حفظ اسمك وبريدك ورقمك واستخدامها مباشرة داخل طلبات الحجز.",
          fullName: "الاسم الكامل",
          email: "البريد الإلكتروني",
          password: "كلمة المرور",
          phone: "رقم الهاتف",
          country: "الدولة",
          login: "دخول",
          signup: "إنشاء الحساب",
          switchToLogin: "لديك حساب بالفعل؟ سجل الدخول",
          switchToSignup: "ليس لديك حساب؟ أنشئ حساباً جديداً",
        }
      : language === "fr"
        ? {
            loginTitle: "Connexion",
            loginBody: "Connectez-vous pour remplir plus vite vos demandes et utiliser les informations de votre compte.",
            signupTitle: "Créer un compte",
            signupBody: "Créez un compte simple pour conserver votre nom, e-mail et téléphone et les réutiliser pour vos demandes.",
            fullName: "Nom complet",
            email: "E-mail",
            password: "Mot de passe",
            phone: "Téléphone",
            country: "Pays",
            login: "Se connecter",
            signup: "Créer le compte",
            switchToLogin: "Vous avez déjà un compte ? Connectez-vous",
            switchToSignup: "Vous n'avez pas de compte ? Créez-en un",
          }
        : {
            loginTitle: "Login",
            loginBody: "Sign in so your booking requests use your saved details and move faster.",
            signupTitle: "Create account",
            signupBody: "Create a simple account so your name, email, and phone are reused automatically in booking requests.",
            fullName: "Full name",
            email: "Email",
            password: "Password",
            phone: "Phone",
            country: "Country",
            login: "Login",
            signup: "Create account",
            switchToLogin: "Already have an account? Log in",
            switchToSignup: "No account yet? Create one",
          };

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (mode === "login") {
      const result = login(form.email, form.password);
      if (!result.ok) {
        setError(result.message || "Unable to login.");
        return;
      }
      navigate("/account");
      return;
    }

    const result = register(form);
    if (!result.ok) {
      setError(result.message || "Unable to create account.");
      return;
    }
    navigate("/account");
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[linear-gradient(180deg,#f5efe8_0%,#f9f4ed_40%,#fffdfb_100%)]">
      <Navbar />

      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${siteImages.hero})` }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(189,121,86,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.92))]" />
        </div>

        <div className="relative container mx-auto px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <aside className="rounded-[2rem] border border-primary/10 bg-[linear-gradient(145deg,rgba(61,40,32,0.96),rgba(127,79,60,0.86))] p-8 text-white shadow-[0_24px_80px_rgba(47,26,20,0.2)]">
              <h1 className="text-4xl font-serif">{mode === "login" ? copy.loginTitle : copy.signupTitle}</h1>
              <p className="mt-4 text-sm leading-7 text-white/78 sm:text-base">
                {mode === "login" ? copy.loginBody : copy.signupBody}
              </p>
            </aside>

            <div className="rounded-[2rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_70px_rgba(43,27,21,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
              <form className="grid gap-5" onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{copy.fullName}</label>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                      <Input value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70 pl-11" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{copy.email}</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70 pl-11" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{copy.password}</label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                    <Input type="password" value={form.password} onChange={(e) => updateField("password", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70 pl-11" />
                  </div>
                </div>

                {mode === "signup" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{copy.phone}</label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
                        <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="h-12 rounded-2xl border-primary/10 bg-background/70 pl-11" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{copy.country}</label>
                      <Input value={form.country} onChange={(e) => updateField("country", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                    </div>
                  </>
                )}

                {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                <Button type="submit" className="mt-2 h-12 rounded-full text-sm font-semibold">
                  {mode === "login" ? copy.login : copy.signup}
                </Button>
              </form>

              <div className="mt-6">
                {mode === "login" ? (
                  <Link href="/signup" className="text-sm font-semibold text-primary">
                    {copy.switchToSignup}
                  </Link>
                ) : (
                  <Link href="/login" className="text-sm font-semibold text-primary">
                    {copy.switchToLogin}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
