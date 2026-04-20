import { Router } from "express";
import { z } from "zod";
import { sendBookingRequestEmail } from "../services/mailer";

const router = Router();

const bookingSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  country: z.string().trim().max(80).optional().default(""),
  arrivalTime: z.string().trim().max(80).optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10),
  roomType: z.string().trim().min(2).max(120),
});

router.post("/bookings/request", async (req, res) => {
  const parsed = bookingSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: "Please review the reservation form fields and try again.",
      errors: parsed.error.flatten(),
    });
  }

  const hotelEmail = process.env["BOOKING_TARGET_EMAIL"] ?? "tthhaaeeeerr@gmail.com";

  try {
    await sendBookingRequestEmail({
      hotelEmail,
      guestName: parsed.data.fullName,
      guestEmail: parsed.data.email,
      phone: parsed.data.phone,
      country: parsed.data.country,
      arrivalTime: parsed.data.arrivalTime,
      checkIn: parsed.data.checkIn,
      checkOut: parsed.data.checkOut,
      adults: parsed.data.adults,
      children: parsed.data.children,
      roomType: parsed.data.roomType,
      notes: parsed.data.notes,
    });

    return res.json({
      ok: true,
      message: "Your reservation request was sent successfully.",
    });
  } catch (error) {
    req.log.error({ err: error }, "Failed to send booking request email");

    return res.status(500).json({
      ok: false,
      message: "We could not send your reservation request right now. Please try again shortly.",
    });
  }
});

export default router;
