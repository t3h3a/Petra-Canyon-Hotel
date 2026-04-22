import { type ReactNode, useEffect, useState } from "react";
import {
  BedDouble,
  CheckCircle2,
  Globe,
  Hotel,
  Languages,
  Mail,
  MapPin,
  RefreshCcw,
  Save,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useLocation } from "wouter";

import { useAuth } from "@/components/AuthProvider";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/hotel-api";
import { defaultSiteContent, type LocalizedText, type SiteContent, useSiteContent } from "@/lib/site-content";

const languages = ["ar", "en", "fr"] as const;

const sectionLinks = [
  { href: "#hotel-info", label: "بيانات الفندق", caption: "التواصل والموقع", icon: Hotel },
  { href: "#home-content", label: "الصفحة الرئيسية", caption: "العنوان والنصوص", icon: Languages },
  { href: "#rooms-content", label: "الغرف والأسعار", caption: "البطاقات والتفاصيل", icon: BedDouble },
] as const;

const adminWelcomeCopy = {
  ar: {
    badge: "Petra Canyon Admin",
    title: "أهلاً بالإدمن",
    body: "لوحة التحكم جاهزة لك الآن. راجع المحتوى، حرر التفاصيل، وابدأ إدارة تجربة الفندق من مساحة أوضح وأفخم.",
    cards: [
      { label: "المحتوى", value: "واجهة مرتبة" },
      { label: "الغرف", value: "تفاصيل أوضح" },
      { label: "التحكم", value: "دخول مباشر" },
    ],
  },
  en: {
    badge: "Petra Canyon Admin",
    title: "Welcome, Admin",
    body: "Your control room is ready. Review content, refine details, and manage the hotel experience from a clearer premium workspace.",
    cards: [
      { label: "Content", value: "Sharper layout" },
      { label: "Rooms", value: "Clearer details" },
      { label: "Control", value: "Direct access" },
    ],
  },
  fr: {
    badge: "Petra Canyon Admin",
    title: "Bienvenue, Admin",
    body: "Votre espace de gestion est prêt. Révisez le contenu, ajustez les détails et pilotez l'expérience de l'hôtel depuis une interface plus claire et plus élégante.",
    cards: [
      { label: "Contenu", value: "Interface nette" },
      { label: "Chambres", value: "Détails clairs" },
      { label: "Contrôle", value: "Accès direct" },
    ],
  },
} as const;

function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

function updateLocalizedValue(value: LocalizedText, language: keyof LocalizedText, nextValue: string): LocalizedText {
  return { ...value, [language]: nextValue };
}

function SectionFrame({
  id,
  eyebrow,
  title,
  description,
  icon,
  aside,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[2rem] border border-primary/10 bg-white/88 p-6 shadow-[0_24px_80px_rgba(56,34,24,0.08)] backdrop-blur-xl sm:p-8"
    >
      <div className="flex flex-col gap-5 border-b border-primary/10 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary/80">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-serif text-foreground sm:text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
            {icon}
          </div>
          {aside}
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

function FieldBlock({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-semibold text-foreground">{label}</label>
      {hint ? <p className="text-xs leading-6 text-muted-foreground">{hint}</p> : null}
      {children}
    </div>
  );
}

function MetricCard({ label, value, caption }: { label: string; value: string | number; caption: string }) {
  return (
    <div className="rounded-[1.6rem] border border-white/12 bg-white/10 p-5 backdrop-blur-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65">{label}</p>
      <p className="mt-3 text-3xl font-serif text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{caption}</p>
    </div>
  );
}

function QuickLinkCard({ href, label, caption, icon: Icon }: { href: string; label: string; caption: string; icon: typeof Hotel }) {
  return (
    <a
      href={href}
      className="group rounded-[1.6rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,236,226,0.82))] p-5 shadow-[0_18px_45px_rgba(76,46,32,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(76,46,32,0.11)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">{label}</p>
          <p className="text-sm leading-6 text-muted-foreground">{caption}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-primary transition-transform group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </a>
  );
}

export default function AdminPage() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const { language, dir } = useLanguage();
  const { content, setContent, refresh } = useSiteContent();
  const [, navigate] = useLocation();
  const [draft, setDraft] = useState<SiteContent>(cloneContent(content));
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setDraft(cloneContent(content));
  }, [content]);

  useEffect(() => {
    if (typeof window === "undefined" || isLoading || !isAuthenticated || !isAdmin) {
      return;
    }

    const shouldShowWelcome = window.sessionStorage.getItem("petra-admin-welcome") === "pending";
    if (!shouldShowWelcome) {
      return;
    }

    setShowWelcome(true);
    window.sessionStorage.removeItem("petra-admin-welcome");

    const timer = window.setTimeout(() => {
      setShowWelcome(false);
    }, 10000);

    return () => window.clearTimeout(timer);
  }, [isAdmin, isAuthenticated, isLoading]);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      navigate("/account");
    }
  }, [isAdmin, isAuthenticated, isLoading, navigate]);

  if (isLoading || !isAuthenticated || !isAdmin || !user) {
    return null;
  }

  const roomCount = draft.rooms.length;
  const languageCount = languages.length;
  const completeHotelFields = [
    draft.hotelInfo.hotelEmail,
    draft.hotelInfo.hotelPhone,
    draft.hotelInfo.areaLabel,
    draft.hotelInfo.coordinates,
    draft.hotelInfo.mapsUrl,
    draft.hotelInfo.embedUrl,
  ].filter(Boolean).length;
  const heroPreview = draft.homePage.title.ar || draft.homePage.title.en || draft.homePage.title.fr;
  const explorePreview = draft.homePage.exploreBody.ar || draft.homePage.exploreBody.en || draft.homePage.exploreBody.fr;
  const roomsWithAvailability = draft.rooms.filter((room) => languages.some((language) => Boolean(room.availability?.[language]))).length;
  const welcomeCopy = adminWelcomeCopy[language];

  const handleSave = async () => {
    setIsSaving(true);
    setStatus("");

    try {
      const response = await apiRequest<{ ok: boolean; message: string; content: SiteContent }>("/api/admin/content", {
        method: "PUT",
        body: JSON.stringify({ content: draft }),
      });
      setContent(response.content);
      setStatus(response.message);
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "تعذر حفظ التعديلات.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[linear-gradient(180deg,#efe6dd_0%,#f5eee7_30%,#fbf8f3_100%)]">
      {showWelcome ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#120d0b_0%,#241713_38%,#5a392d_100%)] px-6" dir={dir}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,209,138,0.15),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(210,120,74,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
          <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 blur-3xl animate-[admin-welcome-pulse_10s_ease-in-out_forwards]" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center text-white">
            <div className="rounded-full border border-white/12 bg-white/8 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.42em] text-white/76 animate-[admin-welcome-fade-up_10s_ease_forwards]">
              {welcomeCopy.badge}
            </div>
            <h1 className="mt-8 text-4xl font-serif font-black leading-tight sm:text-6xl lg:text-7xl animate-[admin-welcome-title_10s_ease-in-out_forwards]">
              {welcomeCopy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-8 text-white/76 sm:text-lg animate-[admin-welcome-fade-up_10s_ease-in-out_forwards]">
              {welcomeCopy.body}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {welcomeCopy.cards.map((card) => (
                <div key={card.label} className="rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-md animate-[admin-welcome-card_10s_ease-in-out_forwards]">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-white/56">{card.label}</p>
                  <p className="mt-2 text-lg font-black text-white">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <Navbar />

      <section className="relative overflow-hidden border-b border-primary/10 bg-[linear-gradient(145deg,rgba(46,28,22,0.98),rgba(112,74,55,0.92))] pb-14 pt-28 text-white sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,196,120,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(215,140,97,0.18),transparent_30%)]" />
        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
            <div className="max-w-4xl">
              <Badge className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.38em] text-white/85 hover:bg-white/10">
                Petra Canyon Control Room
              </Badge>
              <h1 className="mt-6 text-4xl font-serif leading-tight sm:text-5xl lg:text-6xl">
                لوحة إدارة أجمل وأوضح لتحرير محتوى الفندق بسرعة وثقة
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-white/80 sm:text-base">
                رتبت الصفحة لتعرض أهم المعلومات أولاً، ثم التنقل السريع بين الأقسام، ثم الحقول مع معاينات مختصرة تساعدك تعرف أين
                يظهر كل تعديل داخل الموقع.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button type="button" className="rounded-full bg-white px-6 text-sm font-semibold text-primary hover:bg-white/90" onClick={handleSave} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "جاري الحفظ..." : "حفظ جميع التعديلات"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/15 hover:text-white"
                  onClick={() => {
                    setDraft(cloneContent(defaultSiteContent));
                    setStatus("");
                  }}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  استعادة المحتوى الافتراضي
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-amber-200" />
                <p className="text-sm font-semibold text-white">حساب الأدمن الحالي</p>
              </div>
              <p className="mt-4 break-all text-lg font-semibold text-white">{user.email}</p>
              <p className="mt-2 text-sm leading-7 text-white/72">
                التعديلات هنا تنعكس على بيانات الفندق، النصوص الرئيسية، وبطاقات الغرف بدون الحاجة للدخول على عدة ملفات أو شاشات.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                <MetricCard label="الأقسام" value={3} caption="مقسمة بوضوح حسب نوع المحتوى." />
                <MetricCard label="اللغات" value={languageCount} caption="عربي، إنجليزي، وفرنسي في نفس الشاشة." />
                <MetricCard label="الغرف" value={roomCount} caption="كل غرفة لها مساحة تحرير مستقلة." />
              </div>
            </div>
          </div>

          {status ? (
            <div className="mt-8 rounded-[1.5rem] border border-white/12 bg-white/10 px-5 py-4 text-sm font-medium text-white/90 backdrop-blur-md">
              {status}
            </div>
          ) : null}
        </div>
      </section>

      <section className="container mx-auto px-4 pt-8 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {sectionLinks.map((section) => (
            <QuickLinkCard key={section.href} href={section.href} label={section.label} caption={section.caption} icon={section.icon} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 pt-8 sm:px-6">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-8">
            <SectionFrame
              id="hotel-info"
              eyebrow="Section 01"
              title="بيانات الفندق والموقع"
              description="هذا القسم خاص بمعلومات التواصل والخرائط والبيانات التي تظهر للزوار في الواجهة الرئيسية وصفحات الموقع."
              icon={<Hotel className="h-6 w-6" />}
              aside={
                <div className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
                  اكتمال البيانات: {completeHotelFields}/6
                </div>
              }
            >
              <div className="mb-5 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
                <div className="rounded-[1.6rem] border border-primary/10 bg-[linear-gradient(180deg,#fffdfa_0%,#f8f1ea_100%)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/75">كيف ستظهر للزائر</p>
                  <p className="mt-3 text-lg font-semibold text-foreground">{draft.hotelInfo.areaLabel || "اسم المنطقة سيظهر هنا"}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{draft.hotelInfo.coordinates || "أضف الإحداثيات أو عنوانًا موجزًا للموقع."}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="rounded-full border-primary/15 bg-white/80 px-3 py-1 text-xs text-primary">
                      {draft.hotelInfo.hotelEmail || "بريد الفندق"}
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-primary/15 bg-white/80 px-3 py-1 text-xs text-primary">
                      {draft.hotelInfo.hotelPhone || "هاتف الفندق"}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-primary/10 bg-white/80 p-5">
                  <p className="text-sm font-semibold text-foreground">نصيحة سريعة</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    احرص أن يكون رابط `Google Maps` مباشرًا للفتح، ورابط `embed` مخصصًا فقط للخريطة المضمنة داخل الصفحة.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <FieldBlock label="بريد الفندق" hint="البريد الظاهر في الموقع ووسائل التواصل.">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                    <Input
                      value={draft.hotelInfo.hotelEmail}
                      onChange={(e) => setDraft((current) => ({ ...current, hotelInfo: { ...current.hotelInfo, hotelEmail: e.target.value } }))}
                      className="h-12 rounded-2xl border-primary/10 bg-background/70 pl-11"
                    />
                  </div>
                </FieldBlock>

                <FieldBlock label="هاتف الفندق" hint="رقم الاتصال الرئيسي الذي يظهر للزوار.">
                  <Input
                    value={draft.hotelInfo.hotelPhone}
                    onChange={(e) => setDraft((current) => ({ ...current, hotelInfo: { ...current.hotelInfo, hotelPhone: e.target.value } }))}
                    className="h-12 rounded-2xl border-primary/10 bg-background/70"
                  />
                </FieldBlock>

                <FieldBlock label="اسم المنطقة الظاهر" hint="مثال: Petra, Jordan أو Wadi Musa.">
                  <Input
                    value={draft.hotelInfo.areaLabel}
                    onChange={(e) => setDraft((current) => ({ ...current, hotelInfo: { ...current.hotelInfo, areaLabel: e.target.value } }))}
                    className="h-12 rounded-2xl border-primary/10 bg-background/70"
                  />
                </FieldBlock>

                <FieldBlock label="الإحداثيات" hint="تفيد في وصف المكان أو عرضه داخل بيانات الموقع.">
                  <Input
                    value={draft.hotelInfo.coordinates}
                    onChange={(e) => setDraft((current) => ({ ...current, hotelInfo: { ...current.hotelInfo, coordinates: e.target.value } }))}
                    className="h-12 rounded-2xl border-primary/10 bg-background/70"
                  />
                </FieldBlock>

                <FieldBlock label="رابط Google Maps" hint="الرابط المباشر الذي يفتح الخريطة للزائر." className="lg:col-span-2">
                  <div className="relative">
                    <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                    <Input
                      value={draft.hotelInfo.mapsUrl}
                      onChange={(e) => setDraft((current) => ({ ...current, hotelInfo: { ...current.hotelInfo, mapsUrl: e.target.value } }))}
                      className="h-12 rounded-2xl border-primary/10 bg-background/70 pl-11"
                    />
                  </div>
                </FieldBlock>

                <FieldBlock label="رابط الخريطة المضمنة" hint="رابط iframe أو embed لعرض الخريطة داخل الصفحة." className="lg:col-span-2">
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                    <Input
                      value={draft.hotelInfo.embedUrl}
                      onChange={(e) => setDraft((current) => ({ ...current, hotelInfo: { ...current.hotelInfo, embedUrl: e.target.value } }))}
                      className="h-12 rounded-2xl border-primary/10 bg-background/70 pl-11"
                    />
                  </div>
                </FieldBlock>
              </div>
            </SectionFrame>

            <SectionFrame
              id="home-content"
              eyebrow="Section 02"
              title="محتوى الصفحة الرئيسية"
              description="حرر الشريط التعريفي والعنوان الرئيسي ونص الاستكشاف لكل لغة مع معاينة مختصرة قبل النزول إلى الحقول."
              icon={<Languages className="h-6 w-6" />}
              aside={<div className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">Hero Preview</div>}
            >
              <div className="mb-5 rounded-[1.8rem] border border-primary/10 bg-[linear-gradient(135deg,#fffdf9_0%,#f3e6db_100%)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/75">المعاينة الحالية</p>
                <h3 className="mt-3 text-2xl font-serif text-foreground">{heroPreview || "العنوان الرئيسي سيظهر هنا"}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                  {explorePreview || "أضف وصفًا مختصرًا يساعد الزائر يفهم تجربة الإقامة وما يميّز الفندق."}
                </p>
              </div>

              <div className="grid gap-5 xl:grid-cols-3">
                {languages.map((language) => (
                  <div key={language} className="rounded-[1.6rem] border border-primary/10 bg-[linear-gradient(180deg,#fffdfa_0%,#f8f1ea_100%)] p-5 shadow-[0_18px_45px_rgba(76,46,32,0.05)]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">{language}</p>
                      <Badge variant="outline" className="rounded-full border-primary/15 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
                        Hero Copy
                      </Badge>
                    </div>

                    <div className="mt-4 rounded-[1.2rem] border border-primary/10 bg-white/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">Preview</p>
                      <p className="mt-2 line-clamp-2 text-base font-semibold text-foreground">{draft.homePage.title[language] || "بدون عنوان بعد"}</p>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {draft.homePage.exploreBody[language] || "أضف وصفًا موجزًا لهذه اللغة."}
                      </p>
                    </div>

                    <div className="mt-5 grid gap-4">
                      <FieldBlock label="Badge">
                        <Input
                          value={draft.homePage.badge[language]}
                          onChange={(e) =>
                            setDraft((current) => ({
                              ...current,
                              homePage: {
                                ...current.homePage,
                                badge: updateLocalizedValue(current.homePage.badge, language, e.target.value),
                              },
                            }))
                          }
                          className="h-12 rounded-2xl border-primary/10 bg-white"
                        />
                      </FieldBlock>

                      <FieldBlock label="العنوان الرئيسي">
                        <Input
                          value={draft.homePage.title[language]}
                          onChange={(e) =>
                            setDraft((current) => ({
                              ...current,
                              homePage: {
                                ...current.homePage,
                                title: updateLocalizedValue(current.homePage.title, language, e.target.value),
                              },
                            }))
                          }
                          className="h-12 rounded-2xl border-primary/10 bg-white"
                        />
                      </FieldBlock>

                      <FieldBlock label="نص الاستكشاف" hint="الوصف الطويل الظاهر في بداية الصفحة الرئيسية.">
                        <Textarea
                          value={draft.homePage.exploreBody[language]}
                          onChange={(e) =>
                            setDraft((current) => ({
                              ...current,
                              homePage: {
                                ...current.homePage,
                                exploreBody: updateLocalizedValue(current.homePage.exploreBody, language, e.target.value),
                              },
                            }))
                          }
                          className="min-h-36 rounded-[1.4rem] border-primary/10 bg-white"
                        />
                      </FieldBlock>
                    </div>
                  </div>
                ))}
              </div>
            </SectionFrame>

            <SectionFrame
              id="rooms-content"
              eyebrow="Section 03"
              title="الغرف والأسعار والتفاصيل"
              description="كل غرفة أصبحت بطاقة مستقلة فيها بيانات أساسية بالأعلى ثم النصوص المترجمة أسفلها، حتى يسهل معرفة ما الذي يتغير لكل غرفة."
              icon={<BedDouble className="h-6 w-6" />}
              aside={
                <div className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
                  توفر مضاف لـ {roomsWithAvailability}/{roomCount} غرفة
                </div>
              }
            >
              <div className="grid gap-6">
                {draft.rooms.map((room, roomIndex) => (
                  <div
                    key={room.key}
                    className="overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(180deg,#fffdf9_0%,#f7efe6_100%)] shadow-[0_24px_80px_rgba(56,34,24,0.06)]"
                  >
                    <div className="flex flex-col gap-5 border-b border-primary/10 px-6 py-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/75">Room Profile</p>
                          <Badge variant="outline" className="rounded-full border-primary/15 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
                            {room.key}
                          </Badge>
                        </div>
                        <h3 className="mt-3 text-2xl font-serif text-foreground">{room.name.ar || room.name.en || room.key}</h3>
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                          عدّل الأسعار والمحتوى النصي لهذه الغرفة. أضفت لك فصلًا أوضح بين البيانات التشغيلية والنصوص التي يراها الزائر.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-[1.2rem] border border-primary/10 bg-white/80 px-4 py-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">Current</p>
                          <p className="mt-2 text-sm font-semibold text-foreground">{room.currentPrice || "غير محدد"}</p>
                        </div>
                        <div className="rounded-[1.2rem] border border-primary/10 bg-white/80 px-4 py-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">Size</p>
                          <p className="mt-2 text-sm font-semibold text-foreground">{room.size || "غير محدد"}</p>
                        </div>
                        <div className="rounded-[1.2rem] border border-primary/10 bg-white/80 px-4 py-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">Availability</p>
                          <p className="mt-2 text-sm font-semibold text-foreground">{room.availability?.ar || room.availability?.en || "غير مضاف"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-6">
                      <div className="rounded-[1.6rem] border border-primary/10 bg-white/75 p-5">
                        <div className="mb-4 flex items-center gap-2">
                          <WandSparkles className="h-4 w-4 text-primary" />
                          <p className="text-sm font-semibold text-foreground">البيانات الأساسية</p>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-3">
                          <FieldBlock label="السعر الحالي">
                            <Input
                              value={room.currentPrice}
                              onChange={(e) =>
                                setDraft((current) => {
                                  const next = cloneContent(current);
                                  next.rooms[roomIndex].currentPrice = e.target.value;
                                  return next;
                                })
                              }
                              className="h-12 rounded-2xl border-primary/10 bg-white"
                            />
                          </FieldBlock>

                          <FieldBlock label="السعر القديم">
                            <Input
                              value={room.originalPrice}
                              onChange={(e) =>
                                setDraft((current) => {
                                  const next = cloneContent(current);
                                  next.rooms[roomIndex].originalPrice = e.target.value;
                                  return next;
                                })
                              }
                              className="h-12 rounded-2xl border-primary/10 bg-white"
                            />
                          </FieldBlock>

                          <FieldBlock label="الحجم">
                            <Input
                              value={room.size}
                              onChange={(e) =>
                                setDraft((current) => {
                                  const next = cloneContent(current);
                                  next.rooms[roomIndex].size = e.target.value;
                                  return next;
                                })
                              }
                              className="h-12 rounded-2xl border-primary/10 bg-white"
                            />
                          </FieldBlock>

                          <FieldBlock label="ملاحظة السعر أو البادج" className="lg:col-span-3">
                            <Input
                              value={room.taxes}
                              onChange={(e) =>
                                setDraft((current) => {
                                  const next = cloneContent(current);
                                  next.rooms[roomIndex].taxes = e.target.value;
                                  return next;
                                })
                              }
                              className="h-12 rounded-2xl border-primary/10 bg-white"
                            />
                          </FieldBlock>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-5 xl:grid-cols-3">
                        {languages.map((language) => (
                          <div key={language} className="rounded-[1.6rem] border border-primary/10 bg-white/85 p-5">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">{language}</p>
                              <Badge variant="outline" className="rounded-full border-primary/15 bg-secondary/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
                                Guest Facing
                              </Badge>
                            </div>

                            <div className="mt-4 rounded-[1.2rem] border border-primary/10 bg-background/45 p-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">معاينة سريعة</p>
                              <p className="mt-2 line-clamp-2 text-base font-semibold text-foreground">{room.name[language] || "اسم الغرفة"}</p>
                              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{room.description[language] || "أضف وصفًا مختصرًا هنا."}</p>
                            </div>

                            <div className="mt-5 grid gap-4">
                              <FieldBlock label="اسم الغرفة">
                                <Input
                                  value={room.name[language]}
                                  onChange={(e) =>
                                    setDraft((current) => {
                                      const next = cloneContent(current);
                                      next.rooms[roomIndex].name[language] = e.target.value;
                                      return next;
                                    })
                                  }
                                  className="h-12 rounded-2xl border-primary/10 bg-background/60"
                                />
                              </FieldBlock>

                              <FieldBlock label="السعة">
                                <Input
                                  value={room.occupancy[language]}
                                  onChange={(e) =>
                                    setDraft((current) => {
                                      const next = cloneContent(current);
                                      next.rooms[roomIndex].occupancy[language] = e.target.value;
                                      return next;
                                    })
                                  }
                                  className="h-12 rounded-2xl border-primary/10 bg-background/60"
                                />
                              </FieldBlock>

                              <FieldBlock label="الإطلالة">
                                <Input
                                  value={room.view[language]}
                                  onChange={(e) =>
                                    setDraft((current) => {
                                      const next = cloneContent(current);
                                      next.rooms[roomIndex].view[language] = e.target.value;
                                      return next;
                                    })
                                  }
                                  className="h-12 rounded-2xl border-primary/10 bg-background/60"
                                />
                              </FieldBlock>

                              <FieldBlock label="التوفر الظاهر">
                                <Input
                                  value={room.availability?.[language] ?? ""}
                                  onChange={(e) =>
                                    setDraft((current) => {
                                      const next = cloneContent(current);
                                      next.rooms[roomIndex].availability = {
                                        ...(next.rooms[roomIndex].availability ?? {}),
                                        [language]: e.target.value,
                                      };
                                      return next;
                                    })
                                  }
                                  className="h-12 rounded-2xl border-primary/10 bg-background/60"
                                />
                              </FieldBlock>

                              <FieldBlock label="الوصف">
                                <Textarea
                                  value={room.description[language]}
                                  onChange={(e) =>
                                    setDraft((current) => {
                                      const next = cloneContent(current);
                                      next.rooms[roomIndex].description[language] = e.target.value;
                                      return next;
                                    })
                                  }
                                  className="min-h-32 rounded-[1.4rem] border-primary/10 bg-background/60"
                                />
                              </FieldBlock>

                              <FieldBlock label="المزايا" hint="اكتب كل ميزة في سطر منفصل.">
                                <Textarea
                                  value={room.perks[language].join("\n")}
                                  onChange={(e) =>
                                    setDraft((current) => {
                                      const next = cloneContent(current);
                                      next.rooms[roomIndex].perks[language] = e.target.value
                                        .split("\n")
                                        .map((item) => item.trim())
                                        .filter(Boolean);
                                      return next;
                                    })
                                  }
                                  className="min-h-36 rounded-[1.4rem] border-primary/10 bg-background/60"
                                />
                              </FieldBlock>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionFrame>
          </div>

          <aside className="xl:sticky xl:top-28 xl:h-fit">
            <div className="rounded-[2rem] border border-primary/10 bg-white/88 p-6 shadow-[0_24px_80px_rgba(56,34,24,0.08)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-lg font-semibold text-foreground">ملخص سريع</p>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-[1.4rem] border border-primary/10 bg-[linear-gradient(180deg,#fffdfa_0%,#f7efe6_100%)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">عنوان الصفحة الرئيسية</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">{heroPreview || "لم يتم إدخال عنوان بعد."}</p>
                </div>

                <div className="rounded-[1.4rem] border border-primary/10 bg-white/80 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <p className="text-sm leading-7 text-muted-foreground">ابدأ من بيانات الفندق، ثم راجع نصوص الصفحة الرئيسية، وبعدها حرر الغرف حتى تحافظ على تسلسل منطقي أثناء التعديل.</p>
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-primary/10 bg-white/80 p-4">
                  <p className="text-sm font-semibold text-foreground">نقاط متابعة</p>
                  <div className="mt-3 grid gap-3">
                    <div className="rounded-2xl bg-background/70 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">البريد والهاتف</p>
                      <p className="mt-1 text-sm text-foreground">{draft.hotelInfo.hotelEmail && draft.hotelInfo.hotelPhone ? "مكتمل" : "يحتاج مراجعة"}</p>
                    </div>
                    <div className="rounded-2xl bg-background/70 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">الموقع والخرائط</p>
                      <p className="mt-1 text-sm text-foreground">{draft.hotelInfo.mapsUrl && draft.hotelInfo.embedUrl ? "مكتمل" : "يحتاج روابط"}</p>
                    </div>
                    <div className="rounded-2xl bg-background/70 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">توفر الغرف</p>
                      <p className="mt-1 text-sm text-foreground">{roomsWithAvailability} من {roomCount} غرفة تحتوي على نص توفر.</p>
                    </div>
                  </div>
                </div>

                <Button type="button" className="h-12 w-full rounded-full text-sm font-semibold" onClick={handleSave} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "جاري الحفظ..." : "حفظ التعديلات الآن"}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
