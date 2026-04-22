from __future__ import annotations

import smtplib
from email.message import EmailMessage

from flask import current_app

from ..models import Booking


def send_booking_email(booking: Booking) -> None:
    """Send booking details to hotel mailbox using SMTP from .env."""
    config = current_app.config

    required = [
        config.get("MAIL_SERVER"),
        config.get("MAIL_PORT"),
        config.get("MAIL_USERNAME"),
        config.get("MAIL_PASSWORD"),
        config.get("MAIL_DEFAULT_SENDER"),
        config.get("HOTEL_EMAIL"),
    ]
    if not all(required):
        raise RuntimeError("SMTP settings are incomplete. Check your .env file.")

    guest = booking.user
    room = booking.room
    message = EmailMessage()
    message["Subject"] = f"حجز جديد من الموقع - Booking #{booking.id}"
    message["From"] = config["MAIL_DEFAULT_SENDER"]
    message["To"] = config["HOTEL_EMAIL"]
    message["Reply-To"] = guest.email
    message.set_content(
        "\n".join(
            [
                f"رقم الحجز: {booking.id}",
                f"اسم العميل: {guest.full_name}",
                f"البريد الإلكتروني: {guest.email}",
                f"رقم الهاتف: {guest.phone}",
                f"الجنسية: {guest.nationality}",
                f"رقم الغرفة: {room.room_number}",
                f"نوع الغرفة: {room.room_type}",
                f"تاريخ الدخول: {booking.check_in_date}",
                f"تاريخ الخروج: {booking.check_out_date}",
                f"عدد الأشخاص: {booking.guests_count}",
                f"عدد الليالي: {booking.nights}",
                f"السعر الإجمالي: {booking.total_price:.2f}",
                f"وقت إنشاء الحجز: {booking.created_at}",
            ]
        ),
        charset="utf-8",
    )

    if config.get("MAIL_USE_SSL"):
        with smtplib.SMTP_SSL(config["MAIL_SERVER"], config["MAIL_PORT"]) as smtp:
            smtp.login(config["MAIL_USERNAME"], config["MAIL_PASSWORD"])
            smtp.send_message(message)
        return

    with smtplib.SMTP(config["MAIL_SERVER"], config["MAIL_PORT"]) as smtp:
        if config.get("MAIL_USE_TLS"):
            smtp.starttls()
        smtp.login(config["MAIL_USERNAME"], config["MAIL_PASSWORD"])
        smtp.send_message(message)
