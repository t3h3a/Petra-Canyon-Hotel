import { format, parseISO } from "date-fns";
import { CalendarDays, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

import { useAuth } from "@/components/AuthProvider";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/components/LanguageProvider";
import { appendStoredBookings } from "@/lib/booking-storage";
import { apiRequest, roomKeyToApiType, type BookingSummary } from "@/lib/hotel-api";
import { getLocalizedRoom, siteImages, type RoomKey } from "@/data";
import { useSiteContent } from "@/lib/site-content";

type RoomSelection = {
  id: string;
  roomType: RoomKey;
  adults: number;
  childrenUnder6: number;
  children6Plus: number;
};

const roomPolicies: Record<RoomKey, { basePrice: number; maxGuests: number; extraPersonFee: number }> = {
  standardSingle: { basePrice: 50, maxGuests: 1, extraPersonFee: 15 },
  standardDouble: { basePrice: 60, maxGuests: 2, extraPersonFee: 15 },
  standardTwin: { basePrice: 60, maxGuests: 2, extraPersonFee: 15 },
  deluxeDouble: { basePrice: 65, maxGuests: 3, extraPersonFee: 15 },
  deluxeTwin: { basePrice: 65, maxGuests: 3, extraPersonFee: 15 },
  superiorTriple: { basePrice: 85, maxGuests: 4, extraPersonFee: 15 },
  suite: { basePrice: 105, maxGuests: 3, extraPersonFee: 15 },
  presidentialSuite: { basePrice: 150, maxGuests: 3, extraPersonFee: 15 },
};

const roomTypeOrder: RoomKey[] = [
  "standardSingle",
  "standardDouble",
  "standardTwin",
  "deluxeDouble",
  "deluxeTwin",
  "superiorTriple",
  "suite",
  "presidentialSuite",
];

const copyByLanguage = {
  en: {
    back: "Back to home",
    eyebrow: "Direct reservation request",
    title: "Build your stay request room by room",
    body: "Add one room or several rooms, choose the room type for each one, then review the estimated amount before sending the request.",
    loginTitle: "Login first",
    loginBody: "To send the reservation request from your account, log in or create an account first.",
    loginAction: "Login",
    signupAction: "Create account",
    formTitle: "Contact details",
    formBody: "Your account details are already filled in. Update your phone, arrival time, and notes, then send the request.",
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number",
    country: "Country",
    arrivalTime: "Estimated arrival time",
    notes: "Additional notes",
    notesPlaceholder: "Example: connected rooms, quiet side, late arrival, or any important request.",
    roomsTitle: "Requested rooms",
    roomLabel: "Room",
    roomType: "Room type",
    adults: "Adults",
    childUnder6: "Children under 6",
    childOver6: "Children 6+",
    addRoom: "Add another room",
    removeRoom: "Remove room",
    roomSummary: "Room summary",
    estimateTitle: "Estimated amount",
    estimateBody: "This is an approximate amount based on the room prices and extra-person policy. Final confirmation remains with the hotel.",
    totalEstimate: "Approximate total",
    send: "Send reservation request",
    sending: "Sending request...",
    roomsHint: "Adjust the guest mix in each room before sending the request.",
    successTitle: "Reservation request sent",
    successBody: "Your request was sent successfully to the hotel.",
    requestFailed: "The reservation request could not be sent right now. Check the API and SMTP settings, then try again.",
    capacity: "Capacity",
    base: "Base",
    extraGuests: "Extra guests",
    estimatedTotal: "Estimated total",
    guests: "guests",
  },
  ar: {
    back: "العودة إلى الرئيسية",
    eyebrow: "طلب حجز مباشر",
    title: "رتّب طلب إقامتك غرفة غرفة",
    body: "أضف غرفة واحدة أو عدة غرف، ثم راجع المبلغ التقريبي قبل إرسال الطلب.",
    loginTitle: "سجل الدخول أولاً",
    loginBody: "حتى ترسل الطلب من داخل حسابك، سجل الدخول أو أنشئ حساباً أولاً.",
    loginAction: "تسجيل الدخول",
    signupAction: "إنشاء حساب",
    formTitle: "معلومات التواصل",
    formBody: "بيانات الحساب تم تعبئتها تلقائياً. عدّل الهاتف ووقت الوصول والملاحظات ثم أرسل الطلب.",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    country: "الدولة",
    arrivalTime: "وقت الوصول المتوقع",
    notes: "ملاحظات إضافية",
    notesPlaceholder: "مثال: غرف متجاورة، جهة هادئة، وصول متأخر، أو أي طلب مهم.",
    roomsTitle: "الغرف المطلوبة",
    roomLabel: "الغرفة",
    roomType: "نوع الغرفة",
    adults: "البالغون",
    childUnder6: "أطفال تحت 6",
    childOver6: "أطفال 6+",
    addRoom: "إضافة غرفة أخرى",
    removeRoom: "حذف الغرفة",
    roomSummary: "ملخص الغرفة",
    estimateTitle: "المبلغ التقريبي",
    estimateBody: "هذا مبلغ تقريبي حسب أسعار الغرف وسياسة الأشخاص الإضافيين، والتأكيد النهائي يكون من الفندق.",
    totalEstimate: "الإجمالي التقريبي",
    send: "إرسال طلب الحجز",
    sending: "جارٍ إرسال الطلب...",
    roomsHint: "وزّع الضيوف على الغرف قبل إرسال الطلب.",
    successTitle: "تم إرسال طلب الحجز",
    successBody: "تم إرسال طلبك بنجاح إلى الفندق.",
    requestFailed: "تعذر إرسال الطلب الآن. تأكد من تشغيل الـ API وإعدادات SMTP ثم حاول مرة أخرى.",
    capacity: "السعة",
    base: "الأساس",
    extraGuests: "الضيوف الإضافيون",
    estimatedTotal: "الإجمالي التقريبي",
    guests: "ضيوف",
  },
  fr: {
    back: "Retour à l'accueil",
    eyebrow: "Demande de réservation directe",
    title: "Composez votre demande chambre par chambre",
    body: "Ajoutez une ou plusieurs chambres, puis vérifiez le montant estimatif avant l'envoi.",
    loginTitle: "Connectez-vous d'abord",
    loginBody: "Pour envoyer la demande depuis votre compte, connectez-vous ou créez un compte avant de continuer.",
    loginAction: "Connexion",
    signupAction: "Créer un compte",
    formTitle: "Coordonnées",
    formBody: "Les données du compte sont préremplies. Ajoutez votre téléphone, votre heure d'arrivée et vos notes.",
    fullName: "Nom complet",
    email: "E-mail",
    phone: "Téléphone",
    country: "Pays",
    arrivalTime: "Heure d'arrivée estimée",
    notes: "Notes complémentaires",
    notesPlaceholder: "Exemple : chambres communicantes, côté calme, arrivée tardive ou autre demande importante.",
    roomsTitle: "Chambres demandées",
    roomLabel: "Chambre",
    roomType: "Type de chambre",
    adults: "Adultes",
    childUnder6: "Enfants de moins de 6 ans",
    childOver6: "Enfants de 6 ans et plus",
    addRoom: "Ajouter une chambre",
    removeRoom: "Supprimer la chambre",
    roomSummary: "Résumé de la chambre",
    estimateTitle: "Montant estimatif",
    estimateBody: "Montant indicatif basé sur les tarifs des chambres et la politique des voyageurs supplémentaires.",
    totalEstimate: "Total estimatif",
    send: "Envoyer la demande",
    sending: "Envoi en cours...",
    roomsHint: "Répartissez les voyageurs entre les chambres avant l'envoi.",
    successTitle: "Demande envoyée",
    successBody: "Votre demande a été envoyée avec succès à l'hôtel.",
    requestFailed: "Impossible d'envoyer la demande maintenant. Vérifiez l'API et la configuration SMTP puis réessayez.",
    capacity: "Capacité",
    base: "Base",
    extraGuests: "Voyageurs supplémentaires",
    estimatedTotal: "Total estimatif",
    guests: "voyageurs",
  },
} as const;

function getGuestCount(room: RoomSelection) {
  return room.adults + room.childrenUnder6 + room.children6Plus;
}

function getAllowedRoomTypes(guestCount: number) {
  return roomTypeOrder.filter((roomType) => roomPolicies[roomType].maxGuests >= guestCount);
}

export default function BookingPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { content } = useSiteContent();
  const copy = copyByLanguage[language];
  const params = useMemo(() => new URLSearchParams(window.location.search), []);

  const checkIn = params.get("checkIn") ?? new Date().toISOString().slice(0, 10);
  const checkOut = params.get("checkOut") ?? new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const [rooms, setRooms] = useState<RoomSelection[]>([
    {
      id: "room-1",
      roomType: "standardDouble",
      adults: Math.max(1, Number(params.get("adults") || 2)),
      childrenUnder6: Math.max(0, Number(params.get("children") || 0)),
      children6Plus: 0,
    },
  ]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    arrivalTime: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm((current) => ({
      ...current,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      country: user.country,
    }));
  }, [user]);

  const safeCheckIn = parseISO(checkIn);
  const safeCheckOut = parseISO(checkOut);
  const nights = Math.max(1, Math.ceil((safeCheckOut.getTime() - safeCheckIn.getTime()) / 86400000));

  const roomRows = rooms.map((room) => {
    const localizedRoom = getLocalizedRoom(content.rooms.find((entry) => entry.key === room.roomType) ?? content.rooms[0], language);
    const guestCount = getGuestCount(room);
    const allowedRoomTypes = getAllowedRoomTypes(guestCount);
    const policy = roomPolicies[room.roomType];
    const extraGuests = Math.max(0, guestCount - 2);
    const roomTotal = nights * (policy.basePrice + extraGuests * policy.extraPersonFee);

    return {
      ...room,
      title: localizedRoom.name,
      options: roomTypeOrder.map((roomType) => ({
        value: roomType,
        label: getLocalizedRoom(content.rooms.find((entry) => entry.key === roomType) ?? content.rooms[0], language).name,
        disabled: !allowedRoomTypes.includes(roomType),
      })),
      summary: `${localizedRoom.name} - ${guestCount} ${copy.guests}`,
      totals: [
        `${copy.capacity}: ${policy.maxGuests}`,
        `${copy.base}: JOD ${policy.basePrice}`,
        `${copy.extraGuests}: ${extraGuests}`,
        `${copy.estimatedTotal}: JOD ${roomTotal}`,
      ],
      invalid: guestCount > policy.maxGuests,
      totalPrice: roomTotal,
      guestCount,
    };
  });

  const hasInvalidRoom = roomRows.some((room) => room.invalid);
  const totalEstimate = `JOD ${roomRows.reduce((sum, room) => sum + room.totalPrice, 0)}`;

  const updateField = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateRoom = (roomId: string, updater: (room: RoomSelection) => RoomSelection) => {
    setRooms((current) => current.map((room) => (room.id === roomId ? updater(room) : room)));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!isAuthenticated || !user) {
      setError(copy.loginBody);
      return;
    }

    if (hasInvalidRoom) {
      setError(copy.requestFailed);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiRequest<{ ok: boolean; bookings: BookingSummary[] }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          checkIn,
          checkOut,
          notes: [form.arrivalTime ? `Arrival time: ${form.arrivalTime}` : "", form.notes].filter(Boolean).join("\n"),
          rooms: roomRows.map((room) => ({
            roomType: roomKeyToApiType[room.roomType],
            adults: room.adults,
            childrenUnder6: room.childrenUnder6,
            children6Plus: room.children6Plus,
          })),
        }),
      });

      appendStoredBookings(user.email, response.bookings);
      setIsSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : copy.requestFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[linear-gradient(180deg,#f5efe8_0%,#f9f4ed_40%,#fffdfb_100%)]">
      <Navbar />

      <section className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${siteImages.hero})` }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(189,121,86,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.92))]" />
        </div>

        <div className="relative container mx-auto px-4 pb-16 sm:px-6 sm:pb-20">
          <Link href="/" className="inline-flex items-center rounded-full border border-primary/10 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground">
            {copy.back}
          </Link>

          <div className="mt-6 rounded-[2rem] border border-primary/10 bg-white/90 p-6 shadow-[0_20px_70px_rgba(43,27,21,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-serif text-foreground">{copy.title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{copy.body}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <h2 className="text-3xl font-serif text-foreground">{copy.formTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{copy.formBody}</p>
              </div>

              <div className="grid gap-3 rounded-[1.5rem] bg-secondary/25 p-5">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{content.hotelInfo.hotelEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{content.hotelInfo.hotelPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <a href={content.hotelInfo.mapsUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-foreground transition hover:text-primary">
                    {content.hotelInfo.areaLabel}
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

            {!isAuthenticated ? (
              <div className="mt-8 rounded-[1.75rem] border border-primary/10 bg-secondary/20 p-8">
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
            ) : isLoading ? null : (
              <BookingForm
                labels={{
                  fullName: copy.fullName,
                  email: copy.email,
                  phone: copy.phone,
                  country: copy.country,
                  arrivalTime: copy.arrivalTime,
                  notes: copy.notes,
                  notesPlaceholder: copy.notesPlaceholder,
                  roomsTitle: copy.roomsTitle,
                  roomLabel: copy.roomLabel,
                  roomType: copy.roomType,
                  adults: copy.adults,
                  childUnder6: copy.childUnder6,
                  childOver6: copy.childOver6,
                  addRoom: copy.addRoom,
                  removeRoom: copy.removeRoom,
                  roomSummary: copy.roomSummary,
                  estimateTitle: copy.estimateTitle,
                  estimateBody: copy.estimateBody,
                  totalEstimate: copy.totalEstimate,
                  send: copy.send,
                  sending: copy.sending,
                  roomsHint: copy.roomsHint,
                }}
                form={form}
                rooms={roomRows}
                estimate={totalEstimate}
                canAddRoom={rooms.length < 4}
                submitting={isSubmitting}
                onChangeField={updateField}
                onRoomTypeChange={(roomId, value) => updateRoom(roomId, (room) => ({ ...room, roomType: value as RoomKey }))}
                onGuestChange={(roomId, field, value) => updateRoom(roomId, (room) => ({ ...room, [field]: Math.max(field === "adults" ? 1 : 0, value) }))}
                onAddRoom={() => setRooms((current) => [...current, { id: `room-${current.length + 1}`, roomType: "standardDouble", adults: 2, childrenUnder6: 0, children6Plus: 0 }])}
                onRemoveRoom={(roomId) => setRooms((current) => current.filter((room) => room.id !== roomId))}
                onSubmit={handleSubmit}
              />
            )}

            {error ? <p className="mt-6 text-sm font-medium text-destructive">{error}</p> : null}

            {isSent ? (
              <div className="mt-6 rounded-[1.75rem] border border-emerald-200 bg-emerald-50/90 p-5 text-emerald-950">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <h3 className="text-xl font-serif">{copy.successTitle}</h3>
                    <p className="mt-2 text-sm leading-6 text-emerald-900/80">{copy.successBody}</p>
                    <a href={`tel:${content.hotelInfo.hotelPhone}`} className="mt-4 inline-flex h-10 items-center rounded-full border border-emerald-300 px-4 text-sm font-semibold text-emerald-900">
                      {content.hotelInfo.hotelPhone}
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
