import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { useAuth } from "@/components/AuthProvider";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { readStoredBookings } from "@/lib/booking-storage";
import type { BookingSummary } from "@/lib/hotel-api";

const copyByLanguage = {
  en: {
    title: "My account",
    body: "Update your main details so they are filled automatically inside the booking request form.",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    country: "Country",
    save: "Save changes",
    logout: "Logout",
    saved: "Your profile changes were saved.",
    bookingsTitle: "My bookings",
    emptyBookings: "No bookings yet.",
    room: "Room",
    stay: "Stay",
    guests: "Guests",
    total: "Total",
  },
  ar: {
    title: "حسابي",
    body: "حدّث بياناتك الأساسية حتى يتم تعبئتها تلقائياً داخل صفحة طلب الحجز.",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    country: "الدولة",
    save: "حفظ التغييرات",
    logout: "تسجيل الخروج",
    saved: "تم حفظ البيانات بنجاح.",
    bookingsTitle: "حجوزاتي",
    emptyBookings: "لا توجد حجوزات حتى الآن.",
    room: "الغرفة",
    stay: "الإقامة",
    guests: "الضيوف",
    total: "الإجمالي",
  },
  fr: {
    title: "Mon compte",
    body: "Mettez à jour vos informations principales pour les réutiliser automatiquement dans la demande de réservation.",
    fullName: "Nom complet",
    email: "E-mail",
    phone: "Téléphone",
    country: "Pays",
    save: "Enregistrer",
    logout: "Se déconnecter",
    saved: "Les informations ont bien été enregistrées.",
    bookingsTitle: "Mes réservations",
    emptyBookings: "Aucune réservation pour le moment.",
    room: "Chambre",
    stay: "Séjour",
    guests: "Voyageurs",
    total: "Total",
  },
} as const;

export default function AccountPage() {
  const { language } = useLanguage();
  const copy = copyByLanguage[language];
  const { user, isAuthenticated, isLoading, updateProfile, logout } = useAuth();
  const [, navigate] = useLocation();
  const [status, setStatus] = useState("");
  const [bookings, setBookings] = useState<BookingSummary[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm({
      fullName: user.fullName,
      phone: user.phone,
      country: user.country,
    });
    setBookings(readStoredBookings(user.email));
  }, [user]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated || !user) {
    navigate("/login");
    return null;
  }

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
              <Input value={form.fullName} onChange={(e) => { setStatus(""); setForm((current) => ({ ...current, fullName: e.target.value })); }} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{copy.email}</label>
              <Input value={user.email} readOnly className="h-12 rounded-2xl border-primary/10 bg-secondary/25" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{copy.phone}</label>
                <Input value={form.phone} onChange={(e) => { setStatus(""); setForm((current) => ({ ...current, phone: e.target.value })); }} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{copy.country}</label>
                <Input value={form.country} onChange={(e) => { setStatus(""); setForm((current) => ({ ...current, country: e.target.value })); }} className="h-12 rounded-2xl border-primary/10 bg-background/70" />
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <Button type="button" className="h-12 rounded-full px-6 text-sm font-semibold" onClick={async () => {
                const result = await updateProfile(form);
                setStatus(result.ok ? copy.saved : result.message || "");
              }}>
                {copy.save}
              </Button>
              <Button type="button" variant="outline" className="h-12 rounded-full px-6 text-sm font-semibold" onClick={async () => {
                await logout();
                navigate("/");
              }}>
                {copy.logout}
              </Button>
            </div>

            {status ? <p className="text-sm font-medium text-primary">{status}</p> : null}
          </div>

          <div className="mt-10 border-t border-primary/10 pt-8">
            <h2 className="text-2xl font-serif text-foreground">{copy.bookingsTitle}</h2>
            {bookings.length ? (
              <div className="mt-5 grid gap-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-[1.5rem] border border-primary/10 bg-background/70 p-5">
                    <p className="text-sm font-semibold text-primary">Booking #{booking.id}</p>
                    <p className="mt-2 text-sm text-foreground">
                      <strong>{copy.room}:</strong> {booking.roomType} ({booking.roomNumber})
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      <strong>{copy.stay}:</strong> {booking.checkIn} - {booking.checkOut}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      <strong>{copy.guests}:</strong> {booking.guestsCount}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      <strong>{copy.total}:</strong> JOD {booking.totalPrice}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">{copy.emptyBookings}</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
