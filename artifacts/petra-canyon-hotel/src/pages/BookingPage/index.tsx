import { format, parseISO } from "date-fns";
import { CalendarDays, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/components/LanguageProvider";
import {
  getEffectiveRoomCapacity,
  ROOM_INCLUDED_GUESTS,
  useSheetRoomData,
} from "@/lib/sheet-room-data";
import { getLocalizedRoom, HOTEL_EMAIL, HOTEL_PHONE, siteImages, type RoomKey } from "@/data";
import { useSiteContent } from "@/lib/site-content";

type RoomSelection = {
  id: string;
  roomType: RoomKey;
  adults: number;
  childrenUnder6: number;
  children6Plus: number;
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
    formTitle: "Contact details",
    formBody: "Enter your details, arrival time, and notes, then send the reservation request directly to the hotel.",
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
    estimateBody: "This is an approximate amount based on the live room prices and extra-bed policy. Final confirmation remains with the hotel.",
    totalEstimate: "Approximate total",
    send: "Send reservation request",
    emailSend: "Send via Email",
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
    ratesLoading: "Updating live rates...",
    ratesFallback: "Showing fallback rates.",
    ratesLive: "Live rates from Google Sheets",
  },
  ar: {
    back: "العودة إلى الرئيسية",
    eyebrow: "طلب حجز مباشر",
    title: "رتب طلب إقامتك غرفة غرفة",
    body: "أضف غرفة واحدة أو عدة غرف، ثم راجع المبلغ التقريبي قبل إرسال الطلب.",
    formTitle: "معلومات التواصل",
    formBody: "أدخل معلوماتك ووقت الوصول والملاحظات ثم أرسل طلب الحجز مباشرة إلى الفندق.",
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
    estimateBody: "هذا مبلغ تقريبي حسب الأسعار المباشرة وسياسة السرير الإضافي، والتأكيد النهائي يكون من الفندق.",
    totalEstimate: "الإجمالي التقريبي",
    send: "إرسال طلب الحجز",
    emailSend: "Send via Email",
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
    ratesLoading: "يتم تحديث الأسعار المباشرة...",
    ratesFallback: "يتم عرض الأسعار الاحتياطية.",
    ratesLive: "أسعار مباشرة من Google Sheets",
  },
  fr: {
    back: "Retour à l'accueil",
    eyebrow: "Demande de réservation directe",
    title: "Composez votre demande chambre par chambre",
    body: "Ajoutez une ou plusieurs chambres, puis vérifiez le montant estimatif avant l'envoi.",
    formTitle: "Coordonnées",
    formBody: "Renseignez vos coordonnées, votre heure d'arrivée et vos notes, puis envoyez directement la demande à l'hôtel.",
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
    estimateBody: "Montant indicatif basé sur les tarifs en direct et la politique du lit supplémentaire.",
    totalEstimate: "Total estimatif",
    send: "Envoyer la demande",
    emailSend: "Send via Email",
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
    ratesLoading: "Mise à jour des tarifs en direct...",
    ratesFallback: "Affichage des tarifs de secours.",
    ratesLive: "Tarifs en direct depuis Google Sheets",
  },
} as const;

function getGuestCount(room: RoomSelection) {
  return room.adults + room.childrenUnder6 + room.children6Plus;
}

export default function BookingPage() {
  const { language } = useLanguage();
  const { content } = useSiteContent();
  const { roomSettings, extraBedPrice, isLoading: isRatesLoading, error: ratesError } = useSheetRoomData();
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

  const safeCheckIn = parseISO(checkIn);
  const safeCheckOut = parseISO(checkOut);
  const nights = Math.max(1, Math.ceil((safeCheckOut.getTime() - safeCheckIn.getTime()) / 86400000));

  const roomRows = rooms.map((room) => {
    const localizedRoom = getLocalizedRoom(content.rooms.find((entry) => entry.key === room.roomType) ?? content.rooms[0], language);
    const guestCount = getGuestCount(room);
    const settings = roomSettings[room.roomType];
    const includedGuests = ROOM_INCLUDED_GUESTS[room.roomType];
    const allowedCapacity = getEffectiveRoomCapacity(room.roomType, settings);
    const extraGuests = Math.max(0, guestCount - includedGuests);
    const extraGuestFee = settings.extraBedAllowed ? extraBedPrice : 0;
    const roomTotal = nights * (settings.price + extraGuests * extraGuestFee);

    return {
      ...room,
      title: localizedRoom.name,
      options: roomTypeOrder.map((roomType) => {
        const optionSettings = roomSettings[roomType];
        const optionCapacity = getEffectiveRoomCapacity(roomType, optionSettings);
        return {
          value: roomType,
          label: getLocalizedRoom(content.rooms.find((entry) => entry.key === roomType) ?? content.rooms[0], language).name,
          disabled: guestCount > optionCapacity,
        };
      }),
      summary: `${localizedRoom.name} - ${guestCount} ${copy.guests}`,
      totals: [
        `${copy.capacity}: ${allowedCapacity}`,
        `${copy.base}: JOD ${settings.price}`,
        `${copy.extraGuests}: ${extraGuests}`,
        `${copy.estimatedTotal}: JOD ${roomTotal}`,
      ],
      invalid: guestCount > allowedCapacity,
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

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.country.trim()) {
      setError(copy.requestFailed);
      return;
    }

    if (hasInvalidRoom) {
      setError(copy.requestFailed);
      return;
    }

    setIsSubmitting(true);
    const message = `
*📩 Booking Request*

━━━━━━━━━━━━━━━

*👤 Personal Information:*
Name: ${form.fullName}
Phone: ${form.phone}
Email: ${form.email}
Country: ${form.country}

━━━━━━━━━━━━━━━

*📅 Booking Details:*
Check-in: ${checkIn}
Check-out: ${checkOut}
Nights: ${nights}
Arrival Time: ${form.arrivalTime || "Not specified"}

━━━━━━━━━━━━━━━

*🏨 Room Details:*
${roomRows
  .map(
    (room, index) =>
      `Room ${index + 1}: ${room.title}\nAdults: ${room.adults}\nChildren under 6: ${room.childrenUnder6}\nChildren 6+: ${room.children6Plus}\nEstimated Total: JOD ${room.totalPrice}`,
  )
  .join("\n\n")}

━━━━━━━━━━━━━━━

*📝 Notes:*
${form.notes || "No notes"}

━━━━━━━━━━━━━━━
Sent from hotel website
`.trim();

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLElement | null;
    const channel = submitter?.dataset.bookingChannel ?? "whatsapp";

    if (channel === "email") {
      const subject = encodeURIComponent("طلب حجز جديد");
      window.location.href = `mailto:${HOTEL_EMAIL}?subject=${subject}&body=${encodeURIComponent(message)}`;
    } else {
      window.open(
        `https://wa.me/${HOTEL_PHONE}?text=${encodeURIComponent(message)}`,
        "_blank",
      );
    }
    setIsSent(true);
    setIsSubmitting(false);
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
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{copy.eyebrow}</p>
                <h1 className="mt-4 text-4xl font-serif text-foreground">{copy.title}</h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{copy.body}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {isRatesLoading ? copy.ratesLoading : ratesError ? copy.ratesFallback : copy.ratesLive}
              </p>
            </div>

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
                emailSend: copy.emailSend,
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
