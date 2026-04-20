require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;
const HOTEL_EMAIL = "tthhaaeeeerr@gmail.com";

app.use(cors());
app.use(express.json());

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP credentials are missing. Fill SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in backend/.env.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

app.post("/api/book", async (req, res) => {
  const {
    fullName,
    email,
    phone,
    country,
    arrivalTime,
    roomType,
    notes,
    checkIn,
    checkOut,
    adults,
    children,
  } = req.body ?? {};

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: HOTEL_EMAIL,
      replyTo: email,
      subject: "طلب حجز جديد من الموقع",
      text: [
        "تم استلام طلب حجز جديد",
        "",
        `اسم العميل: ${fullName || "-"}`,
        `البريد الإلكتروني: ${email || "-"}`,
        `رقم الهاتف: ${phone || "-"}`,
        `الدولة: ${country || "-"}`,
        `وقت الوصول المتوقع: ${arrivalTime || "-"}`,
        `تاريخ الوصول: ${checkIn || "-"}`,
        `تاريخ المغادرة: ${checkOut || "-"}`,
        `عدد البالغين: ${adults ?? "-"}`,
        `عدد الأطفال: ${children ?? "-"}`,
        `نوع الغرفة: ${roomType || "-"}`,
        `ملاحظات: ${notes || "-"}`,
        "طريقة الدفع: نقدًا عند الوصول",
      ].join("\n"),
    });

    return res.status(200).json({
      ok: true,
      message: "Booking request sent successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message || "Could not send booking request.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
