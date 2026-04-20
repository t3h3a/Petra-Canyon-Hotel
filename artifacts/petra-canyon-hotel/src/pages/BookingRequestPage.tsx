import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { ArrowLeft, CalendarDays, CheckCircle2, Mail, MapPin, Phone, Send, ShieldCheck, Sparkles, Users } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";
import { getLocalizedRoom, hotelLocationInfo, roomCatalog, siteImages } from "@/content/site-content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const TARGET_EMAIL = "tthhaaeeeerr@gmail.com";
const HOTEL_PHONE = "+96232154333";
const API_BASE_URL = "http://localhost:5000/api";

const roomCapacityRules = {
  standardSingle: 1,
  standardDouble: 2,
  standardTwin: 2,
  deluxeDouble: 3,
  deluxeTwin: 3,
  superiorTriple: 3,
  suite: 3,
  presidentialSuite: 3,
} as const;

type BookingFormState = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  arrivalTime: string;
  roomType: string;
  notes: string;
};

const bookingRequestCopy = {
  en: {
    back: "Back to home",
    eyebrow: "Direct reservation request",
    title: "Send your stay request and the hotel will confirm it with you",
    body:
      "This page does not take online payment. Send your main stay details and the reservations team will follow up with you directly.",
    loginTitle: "Login first",
    loginBody: "To send the reservation request from your account, log in or create an account first.",
    loginAction: "Login",
    signupAction: "Create account",
    detailsTitle: "Stay details",
    detailsBody: "Review the selected stay details, then complete the final contact information before sending.",
    nights: "Nights",
    formTitle: "Contact details",
    formBody: "Your account details are already filled in. Update your phone, add arrival time and notes, then send the request.",
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number",
    country: "Country",
    arrivalTime: "Estimated arrival time",
    roomType: "Room type",
    notes: "Additional notes",
    notesPlaceholder: "Example: twin beds, quiet room, late arrival, or any other important note.",
    send: "Send reservation request",
    sending: "Sending request...",
    cardTitle: "Pay at the hotel",
    cardBody: "No money is charged on the website. The hotel team will follow up and payment happens at check-in.",
    cardPoint1: "No online payment on the website",
    cardPoint2: "The request goes directly to reservations",
    cardPoint3: "Cash or card payment at arrival",
    successTitle: "Reservation request sent",
    successBody: "Your request was sent successfully to the temporary reservations email and the team can follow up with you.",
    summaryAdults: "Adults",
    summaryChildren: "Children",
    summaryGuests: "Total guests",
    summaryCheckIn: "Check-in",
    summaryCheckOut: "Check-out",
    roomCapacity: "Room capacity",
    roomMismatchTitle: "Selected room does not match the guest count",
    roomMismatchBody: "The selected room cannot host the current number of guests. Please choose one of the available matching rooms below.",
    matchingRoomHint: "Only room types that fit your guest count remain available here.",
    requestFailed: "The reservation request could not be sent right now. Make sure the API and SMTP settings are running, then try again.",
  },
  ar: {
    back: "العودة إلى الرئيسية",
    eyebrow: "طلب حجز مباشر",
    title: "أرسل طلب إقامتك الآن وسيتواصل الفندق معك لتأكيد الحجز",
    body:
      "هذه الصفحة لا تطلب الدفع الآن. فقط أرسل بيانات إقامتك الأساسية، وسيصل الطلب إلى قسم الحجوزات ثم يتم التواصل معك، والدفع يكون داخل الفندق عند الوصول.",
    loginTitle: "سجل الدخول أولاً",
    loginBody: "حتى ترسل الطلب من داخل حسابك في الموقع، سجل الدخول أو أنشئ حساباً أولاً.",
    loginAction: "تسجيل الدخول",
    signupAction: "إنشاء حساب",
    detailsTitle: "تفاصيل الإقامة",
    detailsBody: "راجع بيانات إقامتك ثم أكمل معلومات التواصل حتى يصل الطلب إلى الحجوزات.",
    nights: "الليالي",
    formTitle: "معلومات التواصل",
    formBody: "بيانات الحساب تم تعبئتها تلقائياً. عدّل الهاتف أو أضف وقت الوصول والملاحظات ثم أرسل الطلب.",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    country: "الدولة",
    arrivalTime: "وقت الوصول المتوقع",
    roomType: "نوع الغرفة",
    notes: "ملاحظات إضافية",
    notesPlaceholder: "مثال: سريران منفصلان، غرفة هادئة، وصول متأخر، أو أي ملاحظة مهمة.",
    send: "إرسال طلب الحجز",
    sending: "جارٍ إرسال الطلب...",
    cardTitle: "الدفع داخل الفندق",
    cardBody: "لن يتم خصم أي مبلغ من الموقع. فريق الفندق سيتابع معك، والدفع يتم عند الوصول.",
    cardPoint1: "لا يوجد دفع إلكتروني داخل الموقع",
    cardPoint2: "الطلب يصل مباشرة إلى بريد الحجوزات",
    cardPoint3: "الدفع نقداً أو بالفيزا عند الوصول",
    successTitle: "تم إرسال طلب الحجز",
    successBody: "وصل طلبك بنجاح إلى بريد الحجوزات المؤقت، وسيتم التواصل معك لاحقاً لتأكيد الإقامة.",
    summaryAdults: "البالغون",
    summaryChildren: "الأطفال",
    summaryGuests: "إجمالي الضيوف",
    summaryCheckIn: "تسجيل الوصول",
    summaryCheckOut: "تسجيل المغادرة",
    roomCapacity: "سعة الغرفة",
    roomMismatchTitle: "نوع الغرفة لا يناسب عدد الضيوف",
    roomMismatchBody: "الغرفة المختارة لا تتسع لعدد الضيوف الحالي. اختر من الغرف المناسبة المتاحة فقط.",
    matchingRoomHint: "ستظهر هنا فقط أنواع الغرف المناسبة لعدد الضيوف المدخل.",
    requestFailed: "تعذر إرسال الطلب الآن. تأكد من تشغيل API وإعداد SMTP ثم حاول مرة أخرى.",
  },
  fr: {
    back: "Retour a l'accueil",
    eyebrow: "Demande de reservation",
    title: "Envoyez votre demande et l'hotel vous recontactera pour confirmer",
    body:
      "Cette page ne prend aucun paiement en ligne. Envoyez simplement vos informations principales, puis l'equipe des reservations vous repondra.",
    loginTitle: "Connectez-vous d'abord",
    loginBody: "Pour envoyer la demande depuis votre compte, connectez-vous ou creez un compte avant de continuer.",
    loginAction: "Connexion",
    signupAction: "Creer un compte",
    detailsTitle: "Details du sejour",
    detailsBody: "Verifiez les informations choisies puis completez vos coordonnees avant l'envoi.",
    nights: "Nuits",
    formTitle: "Coordonnees",
    formBody: "Les donnees du compte sont preremplies. Ajoutez votre heure d'arrivee et vos notes puis envoyez la demande.",
    fullName: "Nom complet",
    email: "E-mail",
    phone: "Telephone",
    country: "Pays",
    arrivalTime: "Heure d'arrivee estimee",
    roomType: "Type de chambre",
    notes: "Notes complementaires",
    notesPlaceholder: "Exemple : lits separes, chambre calme, arrivee tardive ou toute autre demande importante.",
    send: "Envoyer la demande",
    sending: "Envoi en cours...",
    cardTitle: "Paiement a l'hotel",
    cardBody: "Aucun montant n'est preleve sur le site. Le paiement se fait a l'arrivee.",
    cardPoint1: "Aucun paiement en ligne",
    cardPoint2: "La demande part directement a la reservation",
    cardPoint3: "Paiement en especes ou par carte a l'arrivee",
    successTitle: "Demande envoyee",
    successBody: "Votre demande a ete envoyee avec succes a l'adresse temporaire des reservations.",
    summaryAdults: "Adultes",
    summaryChildren: "Enfants",
    summaryGuests: "Total des voyageurs",
    summaryCheckIn: "Arrivee",
    summaryCheckOut: "Depart",
    roomCapacity: "Capacite de la chambre",
    roomMismatchTitle: "La chambre selectionnee ne correspond pas au nombre de voyageurs",
    roomMismatchBody: "La chambre choisie ne peut pas accueillir le nombre actuel de voyageurs. Veuillez choisir une chambre compatible.",
    matchingRoomHint: "Seules les chambres compatibles avec votre nombre de voyageurs restent disponibles ici.",
    requestFailed: "Impossible d'envoyer la demande maintenant. Verifiez l'API et la configuration SMTP puis reessayez.",
  },
} as const;

export default function BookingRequestPage() {
  const { language, dir } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const adults = Number(params.get("adults") || 2);
  const children = Number(params.get("children") || 0);
  const totalGuests = adults + children;
  const copy = bookingRequestCopy[language];

  const safeCheckIn = checkIn ? parseISO(checkIn) : new Date();
  const safeCheckOut = checkOut ? parseISO(checkOut) : addDays(safeCheckIn, 1);
  const nights = Math.max(1, differenceInCalendarDays(safeCheckOut, safeCheckIn));

  const [form, setForm] = useState<BookingFormState>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    arrivalTime: "",
    roomType: roomCatalog[0]?.key ?? "standardDouble",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!user) return;

    setForm((current) => ({
      ...current,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      country: user.country,
    }));
  }, [user]);

  const matchingRooms = useMemo(
    () => roomCatalog.filter((room) => roomCapacityRules[room.key] >= totalGuests),
    [totalGuests],
  );

  useEffect(() => {
    if (!matchingRooms.length) return;

    if (!matchingRooms.some((room) => room.key === form.roomType)) {
      setForm((current) => ({ ...current, roomType: matchingRooms[0].key }));
    }
  }, [form.roomType, matchingRooms]);

  const selectedRoom = roomCatalog.find((room) => room.key === form.roomType) ?? matchingRooms[0] ?? roomCatalog[0];
  const localizedRoom = selectedRoom ? getLocalizedRoom(selectedRoom, language) : null;
  const selectedRoomCapacity = selectedRoom ? roomCapacityRules[selectedRoom.key] : 0;
  const isRoomMatchValid = selectedRoomCapacity >= totalGuests;

  const updateField = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isRoomMatchValid) {
      toast({
        title: copy.roomMismatchTitle,
        description: copy.roomMismatchBody,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          country: form.country,
          arrivalTime: form.arrivalTime,
          roomType: localizedRoom?.name ?? form.roomType,
          notes: form.notes,
          checkIn: format(safeCheckIn, "yyyy-MM-dd"),
          checkOut: format(safeCheckOut, "yyyy-MM-dd"),
          adults,
          children,
        }),
      });

      const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || copy.requestFailed);
      }

      setIsSent(true);
      toast({
        title: copy.successTitle,
        description: copy.successBody,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.requestFailed;

      toast({
        title: copy.requestFailed,
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[linear-gradient(180deg,#f4ede7_0%,#f9f5ef_42%,#ffffff_100%)]">
      <Navbar />

      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${siteImages.hero})` }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,110,84,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.9),transparent_38%)]" />
        </div>

        <div className="relative container mx-auto px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
              {copy.back}
            </Link>

            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <aside className="overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(145deg,rgba(59,38,31,0.95),rgba(120,73,56,0.86))] text-white shadow-[0_25px_80px_rgba(53,29,20,0.22)]">
                <div className="relative h-52 overflow-hidden">
                  <img src={siteImages.hero} alt="Petra Canyon" className="absolute inset-0 h-full w-full object-cover opacity-40" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,10,10,0.05),rgba(14,10,10,0.72))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85">
                      <Sparkles className="h-3.5 w-3.5" />
                      {copy.eyebrow}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                  <div>
                    <h1 className="text-3xl font-serif leading-tight sm:text-4xl">{copy.title}</h1>
                    <p className="mt-4 text-sm leading-7 text-white/78 sm:text-base">{copy.body}</p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                    <h2 className="text-xl font-serif">{copy.detailsTitle}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/72">{copy.detailsBody}</p>

                    <div className="mt-5 grid gap-3">
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3">
                        <span className="text-sm text-white/72">{copy.summaryCheckIn}</span>
                        <span className="font-semibold">{format(safeCheckIn, "dd MMM yyyy")}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3">
                        <span className="text-sm text-white/72">{copy.summaryCheckOut}</span>
                        <span className="font-semibold">{format(safeCheckOut, "dd MMM yyyy")}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.summaryAdults}</p>
                          <p className="mt-2 text-2xl font-semibold">{adults}</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.summaryChildren}</p>
                          <p className="mt-2 text-2xl font-semibold">{children}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3">
                        <span className="text-sm text-white/72">{copy.summaryGuests}</span>
                        <span className="font-semibold">{totalGuests}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3">
                        <span className="text-sm text-white/72">{copy.nights}</span>
                        <span className="font-semibold">{nights}</span>
                      </div>
                      {localizedRoom ? (
                        <div className="rounded-2xl bg-white/10 px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.roomType}</p>
                          <p className="mt-2 text-lg font-semibold">{localizedRoom.name}</p>
                          <p className="mt-1 text-sm text-white/72">{localizedRoom.currentPrice}</p>
                          <p className="mt-1 text-sm text-white/72">
                            {copy.roomCapacity}: {selectedRoomCapacity}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                    <h2 className="text-xl font-serif">{copy.cardTitle}</h2>
                    <p className="mt-3 text-sm leading-6 text-white/72">{copy.cardBody}</p>
                    <ul className="mt-4 space-y-3 text-sm text-white/86">
                      <li className="flex items-center gap-3">
                        <ShieldCheck className="h-4 w-4 text-white/70" />
                        <span>{copy.cardPoint1}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-white/70" />
                        <span>{copy.cardPoint2}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-white/70" />
                        <span>{copy.cardPoint3}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

              <div className="rounded-[2rem] border border-primary/10 bg-white/85 p-6 shadow-[0_20px_70px_rgba(43,27,21,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
                {!isAuthenticated ? (
                  <div className="rounded-[1.75rem] border border-primary/10 bg-secondary/20 p-8">
                    <h2 className="text-3xl font-serif text-foreground">{copy.loginTitle}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{copy.loginBody}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href="/login" className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">
                        {copy.loginAction}
                      </Link>
                      <Link href="/signup" className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-semibold text-foreground">
                        {copy.signupAction}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                      <div>
                        <h2 className="text-3xl font-serif text-foreground">{copy.formTitle}</h2>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{copy.formBody}</p>
                      </div>

                      <div className="grid gap-3 rounded-[1.5rem] bg-secondary/25 p-5">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{TARGET_EMAIL}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">+962 321 54 333</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-primary" />
                          <a
                            href={hotelLocationInfo.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-foreground transition hover:text-primary"
                          >
                            {hotelLocationInfo.areaLabel}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <CalendarDays className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            {format(safeCheckIn, "dd MMM")} - {format(safeCheckOut, "dd MMM yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{copy.fullName}</label>
                          <Input value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{copy.email}</label>
                          <Input type="email" value={form.email} readOnly className="h-12 rounded-2xl border-primary/10 bg-secondary/25" />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{copy.phone}</label>
                          <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{copy.country}</label>
                          <Input value={form.country} onChange={(e) => updateField("country", e.target.value)} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{copy.arrivalTime}</label>
                          <Input value={form.arrivalTime} onChange={(e) => updateField("arrivalTime", e.target.value)} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{copy.roomType}</label>
                          <Select value={form.roomType} onValueChange={(value) => updateField("roomType", value)}>
                            <SelectTrigger className="h-12 rounded-2xl border-primary/10 bg-background/70">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-primary/10 bg-white/95 backdrop-blur-md">
                              {roomCatalog.map((room) => (
                                <SelectItem key={room.key} value={room.key} disabled={roomCapacityRules[room.key] < totalGuests}>
                                  {getLocalizedRoom(room, language).name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs leading-6 text-muted-foreground">{copy.matchingRoomHint}</p>
                        </div>
                      </div>

                      {!isRoomMatchValid ? (
                        <div className="rounded-[1.5rem] border border-destructive/20 bg-destructive/5 px-5 py-4">
                          <p className="text-sm font-semibold text-destructive">{copy.roomMismatchTitle}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy.roomMismatchBody}</p>
                        </div>
                      ) : null}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">{copy.notes}</label>
                        <Textarea
                          value={form.notes}
                          onChange={(e) => updateField("notes", e.target.value)}
                          placeholder={copy.notesPlaceholder}
                          className="min-h-[9rem] rounded-[1.5rem] border-primary/10 bg-background/70"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(197,138,112,0.09),rgba(255,255,255,0.82))] px-5 py-5">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{copy.cardTitle}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{copy.cardBody}</p>
                        </div>
                        <Button type="submit" disabled={isSubmitting || !isRoomMatchValid} className="h-12 rounded-full px-6 text-sm font-semibold disabled:opacity-70">
                          <Send className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                          {isSubmitting ? copy.sending : copy.send}
                        </Button>
                      </div>
                    </form>

                    {isSent ? (
                      <div className="mt-6 rounded-[1.75rem] border border-emerald-200 bg-emerald-50/90 p-5 text-emerald-950">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                          <div>
                            <h3 className="text-xl font-serif">{copy.successTitle}</h3>
                            <p className="mt-2 text-sm leading-6 text-emerald-900/80">{copy.successBody}</p>
                            <a href={`tel:${HOTEL_PHONE}`} className="mt-4 inline-flex h-10 items-center rounded-full border border-emerald-300 px-4 text-sm font-semibold text-emerald-900">
                              +962 321 54 333
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
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
