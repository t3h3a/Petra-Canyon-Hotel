from __future__ import annotations

from flask import Blueprint, current_app, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user

from ..extensions import db
from ..forms import BookingForm, LoginForm, RegisterForm
from ..models import Booking, Room, User
from ..services import send_booking_email
from ..utils import is_safe_redirect_target, room_is_available


main_bp = Blueprint("main", __name__)


def _is_email(value: str) -> bool:
    return "@" in value


@main_bp.route("/")
def home():
    featured_rooms = Room.query.order_by(Room.price.asc()).limit(4).all()
    return render_template("home.html", featured_rooms=featured_rooms)


@main_bp.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("main.rooms"))
    form = RegisterForm()
    if form.validate_on_submit():
        user = User(
            full_name=form.full_name.data.strip(),
            email=form.email.data.strip().lower(),
            phone=form.phone.data.strip(),
            nationality=form.nationality.data.strip(),
        )
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        flash("Account created successfully.", "success")
        return redirect(url_for("main.rooms"))
    return render_template("auth/register.html", form=form)


@main_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("main.rooms"))
    form = LoginForm()
    if form.validate_on_submit():
        identifier = form.identifier.data.strip()
        if _is_email(identifier):
            user = User.query.filter_by(email=identifier.lower()).first()
        else:
            user = User.query.filter_by(phone=identifier).first()
        if user is None or not user.check_password(form.password.data):
            flash("Incorrect email/phone or password.", "danger")
            return render_template("auth/login.html", form=form)
        login_user(user)
        flash("Logged in successfully.", "success")
        next_url = request.args.get("next")
        return redirect(next_url) if is_safe_redirect_target(next_url) else redirect(url_for("main.rooms"))
    return render_template("auth/login.html", form=form)


@main_bp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "info")
    return redirect(url_for("main.home"))


@main_bp.route("/rooms")
def rooms():
    all_rooms = Room.query.order_by(Room.price.asc()).all()
    return render_template("rooms/list.html", rooms=all_rooms)


@main_bp.route("/rooms/<int:room_id>", methods=["GET", "POST"])
def room_detail(room_id: int):
    room = Room.query.get_or_404(room_id)
    form = BookingForm()
    if form.validate_on_submit():
        if not current_user.is_authenticated:
            flash("You need to login before creating a booking.", "warning")
            return redirect(url_for("main.login", next=url_for("main.room_detail", room_id=room.id)))
        if form.guests_count.data > room.capacity:
            flash("Guest count exceeds room capacity.", "danger")
            return render_template("rooms/detail.html", room=room, form=form)
        check_in = form.check_in_date.data
        check_out = form.check_out_date.data
        if not room_is_available(room, check_in, check_out):
            flash("This room is not available for the selected dates.", "danger")
            return render_template("rooms/detail.html", room=room, form=form)
        total_days = max((check_out - check_in).days, 1)
        total_price = total_days * room.price
        booking = Booking(
            user_id=current_user.id,
            room_id=room.id,
            check_in_date=check_in,
            check_out_date=check_out,
            guests_count=form.guests_count.data,
            total_price=total_price,
            booking_status="confirmed",
        )
        db.session.add(booking)
        db.session.commit()
        try:
            send_booking_email(booking)
            flash(f"Booking #{booking.id} created and emailed to the hotel.", "success")
        except Exception as exc:
            current_app.logger.exception("Booking email failed: %s", exc)
            flash(f"Booking #{booking.id} was saved, but the email could not be sent. Check SMTP settings.", "warning")
        return redirect(url_for("main.my_bookings"))
    return render_template("rooms/detail.html", room=room, form=form)


@main_bp.route("/bookings")
@login_required
def my_bookings():
    bookings = Booking.query.filter_by(user_id=current_user.id).order_by(Booking.created_at.desc()).all()
    return render_template("bookings/list.html", bookings=bookings)
