import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} environment variable is required.`);
  }

  return value;
}

function createTransport() {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(requiredEnv("SMTP_PORT"));
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  const secure = process.env["SMTP_SECURE"] === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendBookingRequestEmail(input: {
  hotelEmail: string;
  guestName: string;
  guestEmail: string;
  phone: string;
  country: string;
  arrivalTime: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: string;
  notes: string;
}) {
  const transporter = createTransport();
  const fromAddress = process.env["SMTP_FROM"] ?? requiredEnv("SMTP_USER");

  const text = [
    "تم استلام طلب حجز جديد",
    "",
    `اسم العميل: ${input.guestName}`,
    `البريد الإلكتروني: ${input.guestEmail}`,
    `رقم الهاتف: ${input.phone}`,
    `الدولة: ${input.country || "-"}`,
    `وقت الوصول المتوقع: ${input.arrivalTime || "-"}`,
    `تاريخ الوصول: ${input.checkIn}`,
    `تاريخ المغادرة: ${input.checkOut}`,
    `عدد البالغين: ${input.adults}`,
    `عدد الأطفال: ${input.children}`,
    `نوع الغرفة: ${input.roomType}`,
    `ملاحظات: ${input.notes || "-"}`,
    "طريقة الدفع: نقدًا عند الوصول",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #2d221d;">
      <h2 style="margin-bottom: 16px;">تم استلام طلب حجز جديد</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">اسم العميل:</td><td style="padding: 8px 0;">${escapeHtml(input.guestName)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">البريد الإلكتروني:</td><td style="padding: 8px 0;">${escapeHtml(input.guestEmail)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">رقم الهاتف:</td><td style="padding: 8px 0;">${escapeHtml(input.phone)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">الدولة:</td><td style="padding: 8px 0;">${escapeHtml(input.country || "-")}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">وقت الوصول المتوقع:</td><td style="padding: 8px 0;">${escapeHtml(input.arrivalTime || "-")}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">تاريخ الوصول:</td><td style="padding: 8px 0;">${escapeHtml(input.checkIn)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">تاريخ المغادرة:</td><td style="padding: 8px 0;">${escapeHtml(input.checkOut)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">عدد البالغين:</td><td style="padding: 8px 0;">${input.adults}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">عدد الأطفال:</td><td style="padding: 8px 0;">${input.children}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">نوع الغرفة:</td><td style="padding: 8px 0;">${escapeHtml(input.roomType)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">ملاحظات:</td><td style="padding: 8px 0;">${escapeHtml(input.notes || "-")}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">طريقة الدفع:</td><td style="padding: 8px 0;">نقدًا عند الوصول</td></tr>
        </tbody>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: input.hotelEmail,
    replyTo: input.guestEmail,
    subject: "طلب حجز جديد من الموقع",
    text,
    html,
  });
}
