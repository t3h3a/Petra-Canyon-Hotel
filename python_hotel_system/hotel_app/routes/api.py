from __future__ import annotations

from datetime import date

from flask import Blueprint, current_app, jsonify, request
from flask_login import current_user, login_required, login_user, logout_user
from flask_wtf.csrf import generate_csrf

from ..extensions import db
from ..models import Booking, Room, User
from ..services import send_booking_email
from ..utils import is_admin_user, load_site_content, room_is_available, save_site_content


api_bp = Blueprint("api", __name__, url_prefix="/api")


ROOM_TYPE_TO_NUMBER = {
    "Standard Single Room": "101",
    "Standard Double Room": "102",
    "Standard Twin Room": "103",
    "Deluxe Double Room": "201",
    "Deluxe Twin Room": "202",
    "Triple Room": "203",
    "Suite": "301",
    "Presidential Suite": "401",
}


def _user_payload(user: User) -> dict[str, str | int]:
    return {
        "id": user.id,
        "fullName": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "country": user.nationality,
        "isAdmin": is_admin_user(user),
    }


def _json_success(payload: dict, status_code: int = 200):
    return jsonify({"csrfToken": generate_csrf(), **payload}), status_code


def _json_error(message: str, status_code: int = 400):
    return jsonify({"ok": False, "message": message, "csrfToken": generate_csrf()}), status_code


def _request_payload() -> dict:
    payload = request.get_json(silent=True)
    if isinstance(payload, dict):
        return payload
    if request.form:
        return request.form.to_dict()
    return {}


@api_bp.get("/health")
def health():
    return jsonify({"ok": True, "status": "healthy"}), 200


@api_bp.get("/auth/me")
def auth_me():
    return _json_success({"ok": True, "user": _user_payload(current_user) if current_user.is_authenticated else None})


@api_bp.post("/auth/register")
def auth_register():
    payload = _request_payload()

    full_name = str(payload.get("fullName", "")).strip()
    email = str(payload.get("email", "")).strip().lower()
    phone = str(payload.get("phone", "")).strip()
    country = str(payload.get("country", "")).strip()
    password = str(payload.get("password", ""))

    if len(full_name) < 3:
        return _json_error("Full name must be at least 3 characters.")
    if "@" not in email:
        return _json_error("Enter a valid email address.")
    if len(phone) < 7:
        return _json_error("Enter a valid phone number.")
    if len(country) < 2:
        return _json_error("Country is required.")
    if len(password) < 8:
        return _json_error("Password must be at least 8 characters.")
    if User.query.filter_by(email=email).first():
        return _json_error("An account with this email already exists.")
    if User.query.filter_by(phone=phone).first():
        return _json_error("An account with this phone number already exists.")

    user = User(
        full_name=full_name,
        email=email,
        phone=phone,
        nationality=country,
    )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    login_user(user)

    return _json_success({"ok": True, "user": _user_payload(user)})


@api_bp.post("/auth/login")
def auth_login():
    payload = _request_payload()
    safe_payload = {
        key: ("***" if "password" in key.lower() else value)
        for key, value in payload.items()
    }
    current_app.logger.info(
        "Auth login payload received: content_type=%s is_json=%s payload=%s",
        request.content_type,
        request.is_json,
        safe_payload,
    )

    identifier = str(
        payload.get("emailOrPhone")
        or payload.get("identifier")
        or payload.get("email")
        or ""
    ).strip()
    password = str(payload.get("password", ""))

    if not identifier or not password:
        return _json_error("Email/phone and password are required.", 401)

    if "@" in identifier:
        user = User.query.filter_by(email=identifier.lower()).first()
    else:
        user = User.query.filter_by(phone=identifier).first()

    if user is None or not user.check_password(password):
        return _json_error("Incorrect email/phone or password.", 401)

    login_user(user)
    return _json_success({"ok": True, "user": _user_payload(user)})


@api_bp.post("/auth/logout")
def auth_logout():
    if current_user.is_authenticated:
        logout_user()
    return _json_success({"ok": True})


@api_bp.put("/auth/profile")
@login_required
def auth_profile():
    payload = _request_payload()
    full_name = str(payload.get("fullName", "")).strip()
    phone = str(payload.get("phone", "")).strip()
    country = str(payload.get("country", "")).strip()

    if len(full_name) < 3:
        return _json_error("Full name must be at least 3 characters.")
    if len(phone) < 7:
        return _json_error("Enter a valid phone number.")
    if len(country) < 2:
        return _json_error("Country is required.")

    duplicate_phone = User.query.filter(User.phone == phone, User.id != current_user.id).first()
    if duplicate_phone:
        return _json_error("This phone number is already used by another account.")

    current_user.full_name = full_name
    current_user.phone = phone
    current_user.nationality = country
    db.session.commit()

    return _json_success({"ok": True, "user": _user_payload(current_user)})


@api_bp.get("/rooms")
def api_rooms():
    rooms = Room.query.order_by(Room.price.asc()).all()
    return _json_success(
        {
            "ok": True,
            "rooms": [
                {
                    "id": room.id,
                    "roomNumber": room.room_number,
                    "roomType": room.room_type,
                    "price": room.price,
                    "includedGuests": room.included_guests,
                    "capacity": room.capacity,
                    "extraAllowed": room.extra_allowed,
                    "extraPersonFee": room.extra_person_fee,
                    "description": room.description,
                    "availability": room.availability,
                }
                for room in rooms
            ],
        }
    )


@api_bp.get("/site-content")
def api_site_content():
    return _json_success({"ok": True, "content": load_site_content()})


@api_bp.get("/admin/content")
@login_required
def api_admin_content():
    if not is_admin_user(current_user):
        return _json_error("Admin access is required.", 403)

    return _json_success({"ok": True, "content": load_site_content()})


@api_bp.put("/admin/content")
@login_required
def api_admin_content_update():
    if not is_admin_user(current_user):
        return _json_error("Admin access is required.", 403)

    payload = _request_payload()
    content = payload.get("content", {})
    if not isinstance(content, dict):
        return _json_error("Invalid content payload.")

    saved = save_site_content(content)
    return _json_success({"ok": True, "message": "Admin content saved successfully.", "content": saved})


@api_bp.post("/bookings")
@login_required
def api_bookings():
    payload = _request_payload()
    check_in_raw = str(payload.get("checkIn", "")).strip()
    check_out_raw = str(payload.get("checkOut", "")).strip()
    room_requests = payload.get("rooms", [])

    if not check_in_raw or not check_out_raw:
        return _json_error("Check-in and check-out are required.")
    if not isinstance(room_requests, list) or not room_requests:
        return _json_error("At least one room is required.")

    try:
        check_in = date.fromisoformat(check_in_raw)
        check_out = date.fromisoformat(check_out_raw)
    except ValueError:
        return _json_error("Dates must be in YYYY-MM-DD format.")

    if check_out <= check_in:
        return _json_error("Check-out must be after check-in.")

    created: list[Booking] = []

    for item in room_requests:
        room_type = str(item.get("roomType", "")).strip()
        adults = int(item.get("adults", 0))
        children_under_6 = int(item.get("childrenUnder6", 0))
        children_6_plus = int(item.get("children6Plus", 0))
        guests_count = adults + children_under_6 + children_6_plus

        if not room_type or guests_count <= 0:
            return _json_error("Each room request must include roomType and valid guest counts.")

        room_number = ROOM_TYPE_TO_NUMBER.get(room_type)
        room = Room.query.filter_by(room_number=room_number).first() if room_number else None
        if room is None:
            room = Room.query.filter_by(room_type=room_type).first()

        if room is None:
            return _json_error(f"Room type not found: {room_type}")
        if guests_count > room.capacity:
            return _json_error(f"{room.room_type} exceeds its allowed capacity.")
        charged_guests = adults + children_6_plus
        extra_guests = max(0, charged_guests - room.included_guests)
        if extra_guests > 0 and not room.extra_allowed:
            return _json_error(f"{room.room_type} does not allow extra guests.")
        if not room_is_available(room, check_in, check_out):
            return _json_error(f"{room.room_type} is not available for the selected dates.")

        total_days = max((check_out - check_in).days, 1)
        nightly_total = room.price + (extra_guests * room.extra_person_fee)
        booking = Booking(
            user_id=current_user.id,
            room_id=room.id,
            check_in_date=check_in,
            check_out_date=check_out,
            guests_count=guests_count,
            total_price=total_days * nightly_total,
            booking_status="confirmed",
        )
        db.session.add(booking)
        created.append(booking)

    db.session.commit()

    email_errors: list[str] = []
    for booking in created:
        try:
            send_booking_email(booking)
        except Exception as exc:  # pragma: no cover
            email_errors.append(str(exc))

    return _json_success(
        {
            "ok": True,
            "message": "Bookings created successfully." if not email_errors else "Bookings saved, but one or more emails failed.",
            "bookings": [
                {
                    "id": booking.id,
                    "roomType": booking.room.room_type,
                    "roomNumber": booking.room.room_number,
                    "checkIn": booking.check_in_date.isoformat(),
                    "checkOut": booking.check_out_date.isoformat(),
                    "guestsCount": booking.guests_count,
                    "totalPrice": booking.total_price,
                    "bookingStatus": booking.booking_status,
                    "createdAt": booking.created_at.isoformat(),
                }
                for booking in created
            ],
        }
    )
