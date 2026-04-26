import { useEffect, useState } from "react";

type RoomApiRow = {
  "Room Type"?: string;
  Price?: string;
  "Extra Bed Allowed"?: string;
};

type PolicyApiRow = {
  "Policy Key"?: string;
  Value?: string;
};

type BookingFormState = {
  name: string;
  phone: string;
  email: string;
  nationality: string;
  checkin: string;
  checkout: string;
  guests: number;
  roomType: string;
  rooms: number;
  breakfast: boolean;
  airportPickup: boolean;
  extraBed: boolean;
  notes: string;
};

const ROOMS_API =
  "https://opensheet.elk.sh/1YUsCLjsVjk6MJjHld4Hep3OiOgRQL6MFSVKjUeZMX5s/Rooms";
const POLICIES_API =
  "https://opensheet.elk.sh/1YUsCLjsVjk6MJjHld4Hep3OiOgRQL6MFSVKjUeZMX5s/Policies";
const HOTEL_EMAIL = "tthhaaeeeerr@gmail.com";
const HOTEL_PHONE = "962779460107"; // without + for WhatsApp URL

function parsePrice(value: string | undefined) {
  const parsed = Number((value || "").replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function toYesNo(value: boolean) {
  return value ? "Yes" : "No";
}

export default function BookingForm() {
  const [rooms, setRooms] = useState<RoomApiRow[]>([]);
  const [policies, setPolicies] = useState<PolicyApiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    email: "",
    nationality: "",
    checkin: "",
    checkout: "",
    guests: 2,
    roomType: "",
    rooms: 1,
    breakfast: false,
    airportPickup: false,
    extraBed: false,
    notes: "",
  });

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(ROOMS_API).then((res) => res.json()),
      fetch(POLICIES_API).then((res) => res.json()),
    ])
      .then(([roomsData, policiesData]) => {
        console.log("Rooms:", roomsData);
        if (cancelled) {
          return;
        }

        const nextRooms = Array.isArray(roomsData) ? roomsData : [];
        setRooms(nextRooms);
        setPolicies(Array.isArray(policiesData) ? policiesData : []);
        setForm((current) => ({
          ...current,
          roomType: current.roomType || nextRooms[0]?.["Room Type"] || "",
        }));
        setLoading(false);
      })
      .catch((fetchError) => {
        if (cancelled) {
          return;
        }
        setError(fetchError instanceof Error ? fetchError.message : "Failed to fetch hotel data.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = <K extends keyof BookingFormState>(field: K, value: BookingFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const selectedRoom = rooms.find((room) => room["Room Type"] === form.roomType) || null;
  const extraBedAllowed = (selectedRoom?.["Extra Bed Allowed"] || "").trim().toLowerCase() === "yes";
  const effectiveExtraBedEnabled = Boolean(extraBedAllowed && form.extraBed);
  const extraBedPrice =
    parsePrice(
      policies.find((policy) => policy["Policy Key"]?.trim().toLowerCase() === "extra_bed_price")?.Value,
    ) || 0;
  const selectedRoomPrice = parsePrice(selectedRoom?.Price);

  const buildMessage = () => {
    const checkin = form.checkin || "Not specified";
    const checkout = form.checkout || "Not specified";
    const roomType = form.roomType || "Not specified";
    const checkinTime = form.checkin ? new Date(form.checkin).getTime() : NaN;
    const checkoutTime = form.checkout ? new Date(form.checkout).getTime() : NaN;
    const nights =
      Number.isFinite(checkinTime) && Number.isFinite(checkoutTime)
        ? Math.max(1, Math.ceil((checkoutTime - checkinTime) / 86400000))
        : "Not specified";

    return `
*📩 Booking Request*

━━━━━━━━━━━━━━━

*👤 Personal Information:*
Name: ${form.name || "Not specified"}
Phone: ${form.phone || "Not specified"}
Email: ${form.email || "Not specified"}
Nationality: ${form.nationality || "Not specified"}

━━━━━━━━━━━━━━━

*📅 Booking Details:*
Check-in: ${checkin}
Check-out: ${checkout}
Nights: ${nights}
Guests: ${form.guests}

━━━━━━━━━━━━━━━

*🏨 Room Details:*
Room Type: ${roomType}
Rooms: ${form.rooms}

━━━━━━━━━━━━━━━

*🍽️ Extra Services:*
Breakfast: ${toYesNo(form.breakfast)}
Airport Pickup: ${toYesNo(form.airportPickup)}
Extra Bed: ${toYesNo(effectiveExtraBedEnabled)}

━━━━━━━━━━━━━━━

*📝 Notes:*
${form.notes || "No notes"}

━━━━━━━━━━━━━━━
Sent from hotel website
`.trim();
  };

  const handleWhatsappBooking = () => {
    const message = buildMessage();
    window.open(
      `https://wa.me/${HOTEL_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleEmailBooking = () => {
    const message = buildMessage();
    const subject = encodeURIComponent("طلب حجز جديد");
    window.location.href =
      `mailto:${HOTEL_EMAIL}?subject=${subject}&body=${encodeURIComponent(message)}`;
  };

  return (
    <section
      className="w-full max-w-3xl rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-8"
      dir="rtl"
    >
      <div className="mb-8 text-right">
        <p className="text-sm font-semibold tracking-[0.22em] text-amber-700">BOOKING</p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900">نموذج الحجز</h2>
        <p className="mt-3 text-sm leading-7 text-gray-500">املأ بيانات الحجز ثم أرسلها مباشرة عبر واتساب أو البريد الإلكتروني.</p>
      </div>

      {loading ? (
        <div className="mb-6 rounded-2xl bg-amber-50 px-4 py-3 text-right text-sm text-amber-800">
          جاري تحميل بيانات الغرف...
        </div>
      ) : null}

      {error ? (
        <div className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-right text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {rooms.length > 0 ? (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {rooms.map((room) => (
            <div key={room["Room Type"]} className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-right">
              <h3 className="text-sm font-semibold text-gray-900">{room["Room Type"]}</h3>
              <p className="mt-1 text-sm text-gray-600">{parsePrice(room.Price)} JOD</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">الاسم</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-amber-500"
          />
        </label>

        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">رقم الهاتف</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-amber-500"
          />
        </label>

        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">البريد الإلكتروني</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-amber-500"
          />
        </label>

        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">الجنسية</span>
          <input
            type="text"
            value={form.nationality}
            onChange={(event) => updateField("nationality", event.target.value)}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-amber-500"
          />
        </label>

        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">تاريخ الدخول</span>
          <input
            type="date"
            value={form.checkin}
            onChange={(event) => updateField("checkin", event.target.value)}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-amber-500"
          />
        </label>

        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">تاريخ الخروج</span>
          <input
            type="date"
            value={form.checkout}
            onChange={(event) => updateField("checkout", event.target.value)}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-amber-500"
          />
        </label>

        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">عدد الضيوف</span>
          <input
            type="number"
            min="1"
            value={form.guests}
            onChange={(event) => updateField("guests", Number(event.target.value) || 1)}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-amber-500"
          />
        </label>

        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">نوع الغرفة</span>
          <select
            value={form.roomType}
            onChange={(event) => updateField("roomType", event.target.value)}
            className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-amber-500"
          >
            <option value="">اختر الغرفة</option>
            {rooms.map((room) => (
              <option key={room["Room Type"]} value={room["Room Type"]}>
                {room["Room Type"]} - {parsePrice(room.Price)} JOD
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-right">
          <span className="text-sm font-medium text-gray-700">عدد الغرف</span>
          <input
            type="number"
            min="1"
            value={form.rooms}
            onChange={(event) => updateField("rooms", Number(event.target.value) || 1)}
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-amber-500"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl bg-amber-50 p-4 text-right sm:grid-cols-3">
        <label className="flex items-center justify-end gap-3 text-sm font-medium text-gray-700">
          <span>إفطار</span>
          <input
            type="checkbox"
            checked={form.breakfast}
            onChange={(event) => updateField("breakfast", event.target.checked)}
            className="h-4 w-4 accent-amber-600"
          />
        </label>

        <label className="flex items-center justify-end gap-3 text-sm font-medium text-gray-700">
          <span>استقبال من المطار</span>
          <input
            type="checkbox"
            checked={form.airportPickup}
            onChange={(event) => updateField("airportPickup", event.target.checked)}
            className="h-4 w-4 accent-amber-600"
          />
        </label>

        <label className="flex items-center justify-end gap-3 text-sm font-medium text-gray-700">
          <span>سرير إضافي</span>
          <input
            type="checkbox"
            checked={form.extraBed}
            onChange={(event) => updateField("extraBed", event.target.checked)}
            disabled={!extraBedAllowed}
            className="h-4 w-4 accent-amber-600"
          />
        </label>
      </div>

      {selectedRoom ? (
        <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-right text-sm text-gray-700">
          <p><strong>السعر:</strong> {selectedRoomPrice} JOD</p>
          <p><strong>السرير الإضافي مسموح:</strong> {toYesNo(extraBedAllowed)}</p>
          <p><strong>سعر السرير الإضافي:</strong> {extraBedPrice} JOD</p>
        </div>
      ) : null}

      <label className="mt-6 grid gap-2 text-right">
        <span className="text-sm font-medium text-gray-700">ملاحظات</span>
        <textarea
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          rows={5}
          className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
        />
      </label>

      <div className="mt-8 flex flex-wrap justify-start gap-3">
        <button
          type="button"
          onClick={handleWhatsappBooking}
          className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          احجز عبر واتساب
        </button>
        <button
          type="button"
          onClick={handleEmailBooking}
          className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
        >
          Send via Email
        </button>
      </div>
    </section>
  );
}
