import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";
import { getLocalizedRoom, hotelLocationInfo, roomCatalog, siteImages, type RoomKey } from "@/content/site-content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const TARGET_EMAIL = "tthhaaeeeerr@gmail.com";
const HOTEL_PHONE = "+96232154333";
const API_BASE_URL = "http://localhost:5000/api";
const EXTRA_PERSON_FEE = 15;

type BookingFormState = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  arrivalTime: string;
  notes: string;
};

type RoomSelection = {
  id: string;
  roomType: RoomKey;
  adults: number;
  childrenUnder6: number;
  children6Plus: number;
};

type RequestedGuestTotals = {
  adults: number;
  children: number;
};

const roomPolicies: Record<
  RoomKey,
  {
    basePrice: number;
    includedGuests: number;
    maxGuests: number;
    extraAllowed: boolean;
  }
> = {
  standardSingle: { basePrice: 50, includedGuests: 1, maxGuests: 1, extraAllowed: false },
  standardDouble: { basePrice: 60, includedGuests: 2, maxGuests: 2, extraAllowed: false },
  standardTwin: { basePrice: 60, includedGuests: 2, maxGuests: 2, extraAllowed: false },
  deluxeDouble: { basePrice: 65, includedGuests: 2, maxGuests: 3, extraAllowed: true },
  deluxeTwin: { basePrice: 65, includedGuests: 2, maxGuests: 3, extraAllowed: true },
  superiorTriple: { basePrice: 85, includedGuests: 3, maxGuests: 4, extraAllowed: true },
  suite: { basePrice: 105, includedGuests: 2, maxGuests: 3, extraAllowed: true },
  presidentialSuite: { basePrice: 150, includedGuests: 2, maxGuests: 3, extraAllowed: true },
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

const bookingRequestCopy = {
  en: {
    back: "Back to home",
    eyebrow: "Direct reservation request",
    title: "Build your stay request room by room",
    body: "Add one room or several rooms, choose the room type for each one, then review the estimated amount before sending the request.",
    loginTitle: "Login first",
    loginBody: "To send the reservation request from your account, log in or create an account first.",
    loginAction: "Login",
    signupAction: "Create account",
    detailsTitle: "Stay details",
    detailsBody: "Review your dates, then arrange the rooms and guests exactly the way you need.",
    nights: "Nights",
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
    roomCapacity: "Capacity",
    roomBaseRate: "Base room rate",
    extraGuests: "Extra guests charged",
    roomEstimate: "Estimated room total",
    estimateTitle: "Estimated amount",
    estimateBody: "This is an approximate amount based on the room prices and extra-person policy. Final confirmation remains with the hotel.",
    totalRooms: "Rooms",
    totalGuests: "Guests",
    totalEstimate: "Approximate total",
    mismatchTitle: "One or more rooms exceed the allowed capacity",
    mismatchBody: "Reduce guests in that room or choose a room type that accepts more people.",
    policyTitle: "Children and extra bed policy",
    under6: "Children under 6 years old stay free",
    above6: "Guests aged 6 or above are treated as adults",
    extraFee: "Each extra person is charged JOD 15",
    extraAvailability: "Extra beds are available only in Deluxe, Triple, Suite, and Presidential Suite",
    noExtraAvailability: "No extra bed is allowed in Single and Standard rooms",
    cardTitle: "Pay at the hotel",
    cardBody: "No money is charged on the website. The hotel team will review your request and payment happens at check-in.",
    cardPoint1: "No online payment on the website",
    cardPoint2: "The request goes directly to reservations",
    cardPoint3: "Cash or card payment at arrival",
    send: "Send reservation request",
    sending: "Sending request...",
    successTitle: "Reservation request sent",
    successBody: "Your request was sent successfully to the temporary reservations email and the team can follow up with you.",
    summaryCheckIn: "Check-in",
    summaryCheckOut: "Check-out",
    requestFailed: "The reservation request could not be sent right now. Make sure the API and SMTP settings are running, then try again.",
  },
  ar: {
    back: "العودة إلى الرئيسية",
    eyebrow: "طلب حجز مباشر",
    title: "رتّب طلب إقامتك غرفة غرفة",
    body: "أضف غرفة واحدة أو عدة غرف، واختر نوع كل غرفة وعدد الأشخاص فيها، ثم راجع المبلغ التقريبي قبل إرسال الطلب.",
    loginTitle: "سجل الدخول أولاً",
    loginBody: "حتى ترسل الطلب من داخل حسابك في الموقع، سجل الدخول أو أنشئ حساباً أولاً.",
    loginAction: "تسجيل الدخول",
    signupAction: "إنشاء حساب",
    detailsTitle: "تفاصيل الإقامة",
    detailsBody: "راجع التواريخ أولاً، ثم وزّع الأشخاص على الغرف بالشكل الذي يناسبك.",
    nights: "الليالي",
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
    roomCapacity: "السعة",
    roomBaseRate: "سعر الغرفة الأساسي",
    extraGuests: "الأشخاص الإضافيون المحسوبون",
    roomEstimate: "الإجمالي التقريبي للغرفة",
    estimateTitle: "المبلغ التقريبي",
    estimateBody: "هذا مبلغ تقريبي حسب أسعار الغرف وسياسة الأشخاص الإضافيين. التأكيد النهائي يكون من الفندق.",
    totalRooms: "عدد الغرف",
    totalGuests: "إجمالي الضيوف",
    totalEstimate: "الإجمالي التقريبي",
    mismatchTitle: "إحدى الغرف تتجاوز السعة المسموحة",
    mismatchBody: "خفّف عدد الأشخاص في هذه الغرفة أو اختر نوع غرفة يستوعب عددًا أكبر.",
    policyTitle: "سياسة الأطفال والإضافات",
    under6: "الأطفال تحت 6 سنوات مجاناً",
    above6: "من عمر 6 سنوات أو أكثر يُحسب كشخص بالغ",
    extraFee: "كل شخص إضافي يُحسب 15 دينار",
    extraAvailability: "الإضافة متاحة فقط في الديلوكس، الترابل، السويت، والبريدينشال سويت",
    noExtraAvailability: "لا يمكن إضافة تخت في السنجل وغرف الستاندارد",
    cardTitle: "الدفع داخل الفندق",
    cardBody: "لن يتم خصم أي مبلغ من الموقع. فريق الفندق يراجع الطلب ثم يتم الدفع عند الوصول.",
    cardPoint1: "لا يوجد دفع إلكتروني داخل الموقع",
    cardPoint2: "الطلب يصل مباشرة إلى بريد الحجوزات",
    cardPoint3: "الدفع نقداً أو بالفيزا عند الوصول",
    send: "إرسال طلب الحجز",
    sending: "جارٍ إرسال الطلب...",
    successTitle: "تم إرسال طلب الحجز",
    successBody: "وصل طلبك بنجاح إلى بريد الحجوزات المؤقت، وسيتم التواصل معك لاحقاً لتأكيد الإقامة.",
    summaryCheckIn: "تسجيل الوصول",
    summaryCheckOut: "تسجيل المغادرة",
    requestFailed: "تعذر إرسال الطلب الآن. تأكد من تشغيل API وإعداد SMTP ثم حاول مرة أخرى.",
  },
  fr: {
    back: "Retour a l'accueil",
    eyebrow: "Demande de reservation",
    title: "Composez votre demande chambre par chambre",
    body: "Ajoutez une ou plusieurs chambres, choisissez le type pour chacune, puis verifiez le montant estimatif avant l'envoi.",
    loginTitle: "Connectez-vous d'abord",
    loginBody: "Pour envoyer la demande depuis votre compte, connectez-vous ou creez un compte avant de continuer.",
    loginAction: "Connexion",
    signupAction: "Creer un compte",
    detailsTitle: "Details du sejour",
    detailsBody: "Verifiez les dates puis repartissez les voyageurs selon les chambres souhaitees.",
    nights: "Nuits",
    formTitle: "Coordonnees",
    formBody: "Les donnees du compte sont preremplies. Ajoutez votre heure d'arrivee, votre telephone et vos notes puis envoyez la demande.",
    fullName: "Nom complet",
    email: "E-mail",
    phone: "Telephone",
    country: "Pays",
    arrivalTime: "Heure d'arrivee estimee",
    notes: "Notes complementaires",
    notesPlaceholder: "Exemple : chambres communicantes, cote calme, arrivee tardive ou toute autre demande importante.",
    roomsTitle: "Chambres demandees",
    roomLabel: "Chambre",
    roomType: "Type de chambre",
    adults: "Adultes",
    childUnder6: "Enfants de moins de 6 ans",
    childOver6: "Enfants de 6 ans et plus",
    addRoom: "Ajouter une chambre",
    removeRoom: "Supprimer la chambre",
    roomSummary: "Resume de la chambre",
    roomCapacity: "Capacite",
    roomBaseRate: "Tarif de base",
    extraGuests: "Voyageurs supplementaires factures",
    roomEstimate: "Total estimatif de la chambre",
    estimateTitle: "Montant estimatif",
    estimateBody: "Ce montant est indicatif, calcule selon les tarifs des chambres et la politique des voyageurs supplementaires.",
    totalRooms: "Chambres",
    totalGuests: "Voyageurs",
    totalEstimate: "Total estimatif",
    mismatchTitle: "Une chambre depasse la capacite autorisee",
    mismatchBody: "Reduisez les voyageurs dans cette chambre ou choisissez une categorie qui accepte plus de personnes.",
    policyTitle: "Politique enfants et lits supplementaires",
    under6: "Les enfants de moins de 6 ans sont gratuits",
    above6: "A partir de 6 ans, le voyageur est compte comme adulte",
    extraFee: "Chaque personne supplementaire coute 15 JOD",
    extraAvailability: "Le lit supplementaire est disponible uniquement en Deluxe, Triple, Suite et Suite Presidentielle",
    noExtraAvailability: "Aucun lit supplementaire en Single et en chambres Standard",
    cardTitle: "Paiement a l'hotel",
    cardBody: "Aucun montant n'est preleve sur le site. L'equipe de l'hotel revoit la demande puis le paiement se fait a l'arrivee.",
    cardPoint1: "Aucun paiement en ligne",
    cardPoint2: "La demande part directement a la reservation",
    cardPoint3: "Paiement en especes ou par carte a l'arrivee",
    send: "Envoyer la demande",
    sending: "Envoi en cours...",
    successTitle: "Demande envoyee",
    successBody: "Votre demande a ete envoyee avec succes a l'adresse temporaire des reservations.",
    summaryCheckIn: "Arrivee",
    summaryCheckOut: "Depart",
    requestFailed: "Impossible d'envoyer la demande maintenant. Verifiez l'API et la configuration SMTP puis reessayez.",
  },
} as const;

function makeRoomSelection(roomType: RoomKey, adults: number, childrenUnder6: number, children6Plus: number, idSeed: number): RoomSelection {
  return {
    id: `room-${idSeed}`,
    roomType,
    adults,
    childrenUnder6,
    children6Plus,
  };
}

function getRoomGuestCount(room: RoomSelection) {
  return room.adults + room.childrenUnder6 + room.children6Plus;
}

function getAllowedRoomTypesForGuests(guestCount: number) {
  return roomTypeOrder.filter((roomType) => roomPolicies[roomType].maxGuests >= guestCount);
}

function createRoomFromRemainingGuests(
  remaining: RequestedGuestTotals,
  idSeed: number,
) {
  const adults = Math.max(1, remaining.adults);
  const childrenUnder6 = remaining.adults > 0 ? remaining.children : 0;
  const totalGuests = adults + childrenUnder6;
  const allowedRoomTypes = getAllowedRoomTypesForGuests(totalGuests);
  const roomType = allowedRoomTypes[0] ?? "standardSingle";

  return makeRoomSelection(roomType, adults, childrenUnder6, 0, idSeed);
}

export default function BookingRequestPage() {
  const { language, dir } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialCheckIn = params.get("checkIn");
  const initialCheckOut = params.get("checkOut");
  const initialAdults = Number(params.get("adults") || 2);
  const initialChildren = Number(params.get("children") || 0);
  const copy = bookingRequestCopy[language];
  const requestedGuests = useMemo<RequestedGuestTotals>(
    () => ({
      adults: Math.max(1, initialAdults),
      children: Math.max(0, initialChildren),
    }),
    [initialAdults, initialChildren],
  );
  const pageCopy =
    language === "ar"
      ? {
          remainingGuests: "الضيوف المتبقون غير موزعين على غرف",
          assignGuestsHint: "عند إضافة غرفة جديدة سيتم استخدام الضيوف المتبقين من الطلب الأصلي أولاً.",
          addGuestsAllowed: "يمكن إضافة ضيف أو سرير إضافي لهذا النوع من الغرف",
          addGuestsBlocked: "لا يمكن إضافة ضيف أو سرير إضافي لهذا النوع من الغرف",
        }
      : language === "fr"
        ? {
            remainingGuests: "Voyageurs encore non attribues a une chambre",
            assignGuestsHint: "Quand vous ajoutez une chambre, les voyageurs restants de la recherche initiale sont utilises d'abord.",
            addGuestsAllowed: "Ce type de chambre accepte un voyageur ou un lit supplementaire",
            addGuestsBlocked: "Ce type de chambre n'accepte aucun voyageur ou lit supplementaire",
          }
        : {
            remainingGuests: "Guests still not assigned to a room",
            assignGuestsHint: "Adding a new room uses the remaining guests from the original search first.",
            addGuestsAllowed: "Extra guest or extra bed can be added in this room type",
            addGuestsBlocked: "No extra guest or extra bed is allowed in this room type",
          };

  const safeCheckIn = initialCheckIn ? parseISO(initialCheckIn) : new Date();
  const safeCheckOut = initialCheckOut ? parseISO(initialCheckOut) : addDays(safeCheckIn, 1);
  const nights = Math.max(1, differenceInCalendarDays(safeCheckOut, safeCheckIn));

  const [form, setForm] = useState<BookingFormState>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    arrivalTime: "",
    notes: "",
  });
  const [rooms, setRooms] = useState<RoomSelection[]>([createRoomFromRemainingGuests(requestedGuests, 1)]);
  const [roomSeed, setRoomSeed] = useState(2);
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

  useEffect(() => {
    setRooms((current) =>
      current.map((room) => {
        const guestCount = getRoomGuestCount(room);
        const allowedRoomTypes = getAllowedRoomTypesForGuests(guestCount);

        if (!allowedRoomTypes.length || allowedRoomTypes.includes(room.roomType)) {
          return room;
        }

        return {
          ...room,
          roomType: allowedRoomTypes[0],
        };
      }),
    );
  }, []);

  const roomDetails = useMemo(
    () =>
      rooms.map((room) => {
        const policy = roomPolicies[room.roomType];
        const chargedGuests = room.adults + room.children6Plus;
        const freeGuests = room.childrenUnder6;
        const extraGuests = Math.max(0, chargedGuests - policy.includedGuests);
        const roomTotal = policy.basePrice + extraGuests * EXTRA_PERSON_FEE;
        const totalPeople = chargedGuests + freeGuests;
        const isValid = totalPeople > 0 && totalPeople <= policy.maxGuests;

        return {
          ...room,
          policy,
          chargedGuests,
          freeGuests,
          extraGuests,
          totalPeople,
          roomTotal,
          isValid,
        };
      }),
    [rooms],
  );

  const totals = useMemo(
    () =>
      roomDetails.reduce(
        (acc, room) => {
          acc.rooms += 1;
          acc.guests += room.totalPeople;
          acc.estimate += room.roomTotal;
          return acc;
        },
        { rooms: 0, guests: 0, estimate: 0 },
      ),
    [roomDetails],
  );

  const remainingGuests = useMemo(() => {
    const assignedAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const assignedChildren = rooms.reduce((sum, room) => sum + room.childrenUnder6 + room.children6Plus, 0);

    return {
      adults: Math.max(0, requestedGuests.adults - assignedAdults),
      children: Math.max(0, requestedGuests.children - assignedChildren),
    };
  }, [requestedGuests, rooms]);

  const remainingGuestCount = remainingGuests.adults + remainingGuests.children;

  const hasInvalidRoom = roomDetails.some((room) => !room.isValid);

  const updateField = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateRoom = (id: string, patch: Partial<RoomSelection>) => {
    setRooms((current) => current.map((room) => (room.id === id ? { ...room, ...patch } : room)));
  };

  const addRoom = () => {
    if (remainingGuestCount <= 0) {
      toast({
        title: pageCopy.remainingGuests,
        description: pageCopy.assignGuestsHint,
      });
      return;
    }

    setRooms((current) => [...current, createRoomFromRemainingGuests(remainingGuests, roomSeed)]);
    setRoomSeed((current) => current + 1);
  };

  const removeRoom = (id: string) => {
    setRooms((current) => (current.length === 1 ? current : current.filter((room) => room.id !== id)));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasInvalidRoom) {
      toast({
        title: copy.mismatchTitle,
        description: copy.mismatchBody,
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
          notes: form.notes,
          checkIn: format(safeCheckIn, "yyyy-MM-dd"),
          checkOut: format(safeCheckOut, "yyyy-MM-dd"),
          adults: roomDetails.reduce((sum, room) => sum + room.adults, 0),
          children: roomDetails.reduce((sum, room) => sum + room.childrenUnder6 + room.children6Plus, 0),
          totalGuests: totals.guests,
          estimatedTotal: totals.estimate,
          rooms: roomDetails.map((room) => ({
            roomType: getLocalizedRoom(roomCatalog.find((entry) => entry.key === room.roomType) ?? roomCatalog[0], language).name,
            adults: room.adults,
            childrenUnder6: room.childrenUnder6,
            children6Plus: room.children6Plus,
            extraGuests: room.extraGuests,
            estimatedTotal: room.roomTotal,
          })),
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
          <div className="mx-auto max-w-7xl">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
              {copy.back}
            </Link>

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
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
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-2xl bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.totalRooms}</p>
                          <p className="mt-2 text-2xl font-semibold">{totals.rooms}</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.totalGuests}</p>
                          <p className="mt-2 text-2xl font-semibold">{totals.guests}</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.nights}</p>
                          <p className="mt-2 text-2xl font-semibold">{nights}</p>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white/10 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/60">{copy.totalEstimate}</p>
                        <p className="mt-2 text-3xl font-semibold">JOD {totals.estimate}</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/60">{pageCopy.remainingGuests}</p>
                        <p className="mt-2 text-3xl font-semibold">{remainingGuestCount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                    <h2 className="text-xl font-serif">{copy.policyTitle}</h2>
                    <ul className="mt-4 space-y-3 text-sm text-white/86">
                      <li className="flex items-center gap-3">
                        <ShieldCheck className="h-4 w-4 text-white/70" />
                        <span>{copy.under6}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-white/70" />
                        <span>{copy.above6}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <BedDouble className="h-4 w-4 text-white/70" />
                        <span>{copy.extraFee}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-white/70" />
                        <span>{copy.extraAvailability}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-white/70" />
                        <span>{copy.noExtraAvailability}</span>
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

                    <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
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
                          <Input value={form.country} onChange={(e) => updateField("country", e.target.value)} required className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">{copy.arrivalTime}</label>
                          <Input value={form.arrivalTime} onChange={(e) => updateField("arrivalTime", e.target.value)} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
                        </div>
                        <div className="rounded-[1.5rem] border border-primary/10 bg-secondary/20 px-5 py-4">
                          <p className="text-sm font-semibold text-foreground">{copy.estimateTitle}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy.estimateBody}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="text-2xl font-serif text-foreground">{copy.roomsTitle}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{pageCopy.assignGuestsHint}</p>
                          </div>
                          <Button type="button" onClick={addRoom} disabled={remainingGuestCount <= 0} className="rounded-full px-5 disabled:opacity-60">
                            <Plus className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                            {copy.addRoom}
                          </Button>
                        </div>

                        {roomDetails.map((room, index) => {
                          const localizedRoom = getLocalizedRoom(roomCatalog.find((entry) => entry.key === room.roomType) ?? roomCatalog[0], language);
                          const allowedRoomTypes = getAllowedRoomTypesForGuests(room.totalPeople);

                          return (
                            <div
                              key={room.id}
                              className={`rounded-[1.75rem] border p-5 shadow-[0_18px_60px_rgba(0,0,0,0.05)] ${
                                room.isValid ? "border-primary/10 bg-white" : "border-destructive/30 bg-destructive/5"
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <h4 className="text-xl font-serif text-foreground">
                                  {copy.roomLabel} {index + 1}
                                </h4>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => removeRoom(room.id)}
                                  disabled={rooms.length === 1}
                                  className="rounded-full text-destructive disabled:opacity-40"
                                >
                                  <Trash2 className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                                  {copy.removeRoom}
                                </Button>
                              </div>

                              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-foreground">{copy.roomType}</label>
                                  <Select value={room.roomType} onValueChange={(value) => updateRoom(room.id, { roomType: value as RoomKey })}>
                                    <SelectTrigger className="h-12 rounded-2xl border-primary/10 bg-background/70">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-primary/10 bg-white/95 backdrop-blur-md">
                                      {roomTypeOrder.map((roomType) => (
                                        <SelectItem
                                          key={roomType}
                                          value={roomType}
                                          disabled={!allowedRoomTypes.includes(roomType)}
                                        >
                                          {getLocalizedRoom(roomCatalog.find((entry) => entry.key === roomType) ?? roomCatalog[0], language).name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">{copy.adults}</label>
                                    <Input
                                      type="number"
                                      min="1"
                                      max="6"
                                      value={room.adults}
                                      onChange={(e) => {
                                        const nextRoom = {
                                          ...room,
                                          adults: Math.max(1, Number(e.target.value) || 1),
                                        };
                                        const allowedRoomTypes = getAllowedRoomTypesForGuests(getRoomGuestCount(nextRoom));
                                        updateRoom(room.id, {
                                          adults: nextRoom.adults,
                                          roomType: allowedRoomTypes.includes(room.roomType) ? room.roomType : allowedRoomTypes[0] ?? room.roomType,
                                        });
                                      }}
                                      className="h-12 rounded-2xl border-primary/10 bg-background/70"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">{copy.childUnder6}</label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="6"
                                      value={room.childrenUnder6}
                                      onChange={(e) => {
                                        const nextRoom = {
                                          ...room,
                                          childrenUnder6: Math.max(0, Number(e.target.value) || 0),
                                        };
                                        const allowedRoomTypes = getAllowedRoomTypesForGuests(getRoomGuestCount(nextRoom));
                                        updateRoom(room.id, {
                                          childrenUnder6: nextRoom.childrenUnder6,
                                          roomType: allowedRoomTypes.includes(room.roomType) ? room.roomType : allowedRoomTypes[0] ?? room.roomType,
                                        });
                                      }}
                                      className="h-12 rounded-2xl border-primary/10 bg-background/70"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">{copy.childOver6}</label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="6"
                                      value={room.children6Plus}
                                      onChange={(e) => {
                                        const nextRoom = {
                                          ...room,
                                          children6Plus: Math.max(0, Number(e.target.value) || 0),
                                        };
                                        const allowedRoomTypes = getAllowedRoomTypesForGuests(getRoomGuestCount(nextRoom));
                                        updateRoom(room.id, {
                                          children6Plus: nextRoom.children6Plus,
                                          roomType: allowedRoomTypes.includes(room.roomType) ? room.roomType : allowedRoomTypes[0] ?? room.roomType,
                                        });
                                      }}
                                      className="h-12 rounded-2xl border-primary/10 bg-background/70"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="mt-5 rounded-[1.5rem] border border-primary/10 bg-secondary/20 p-5">
                                <p className="text-sm font-semibold text-foreground">{copy.roomSummary}</p>
                                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                  <div className="rounded-2xl bg-white/80 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{copy.roomCapacity}</p>
                                    <p className="mt-2 text-lg font-semibold text-foreground">{room.policy.maxGuests}</p>
                                  </div>
                                  <div className="rounded-2xl bg-white/80 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{copy.roomBaseRate}</p>
                                    <p className="mt-2 text-lg font-semibold text-foreground">JOD {room.policy.basePrice}</p>
                                  </div>
                                  <div className="rounded-2xl bg-white/80 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{copy.extraGuests}</p>
                                    <p className="mt-2 text-lg font-semibold text-foreground">{room.extraGuests}</p>
                                  </div>
                                  <div className="rounded-2xl bg-white/80 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{copy.roomEstimate}</p>
                                    <p className="mt-2 text-lg font-semibold text-primary">JOD {room.roomTotal}</p>
                                  </div>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                  {localizedRoom.name} • {copy.totalGuests}: {room.totalPeople}
                                </p>
                                <div
                                  className={`mt-4 rounded-2xl px-4 py-3 text-sm font-medium ${
                                    room.policy.extraAllowed
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-stone-100 text-stone-600"
                                  }`}
                                >
                                  {room.policy.extraAllowed ? pageCopy.addGuestsAllowed : pageCopy.addGuestsBlocked}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {hasInvalidRoom ? (
                        <div className="rounded-[1.5rem] border border-destructive/20 bg-destructive/5 px-5 py-4">
                          <p className="text-sm font-semibold text-destructive">{copy.mismatchTitle}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy.mismatchBody}</p>
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
                          <p className="text-sm font-semibold text-foreground">{copy.totalEstimate}</p>
                          <p className="mt-1 text-2xl font-semibold text-primary">JOD {totals.estimate}</p>
                        </div>
                        <Button type="submit" disabled={isSubmitting || hasInvalidRoom} className="h-12 rounded-full px-6 text-sm font-semibold disabled:opacity-70">
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
