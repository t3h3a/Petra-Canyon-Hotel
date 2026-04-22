from __future__ import annotations

from datetime import datetime

from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from ..extensions import db, login_manager


class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(160), unique=True, nullable=False, index=True)
    phone = db.Column(db.String(30), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    nationality = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    bookings = db.relationship("Booking", back_populates="user", lazy=True, cascade="all, delete-orphan")

    def set_password(self, raw_password: str) -> None:
        self.password_hash = generate_password_hash(raw_password)

    def check_password(self, raw_password: str) -> bool:
        return check_password_hash(self.password_hash, raw_password)


class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(20), unique=True, nullable=False, index=True)
    room_type = db.Column(db.String(80), nullable=False, index=True)
    price = db.Column(db.Float, nullable=False)
    included_guests = db.Column(db.Integer, nullable=False, default=2)
    capacity = db.Column(db.Integer, nullable=False)
    extra_allowed = db.Column(db.Boolean, nullable=False, default=False)
    extra_person_fee = db.Column(db.Float, nullable=False, default=15)
    description = db.Column(db.Text, nullable=False)
    availability = db.Column(db.String(20), default="available", nullable=False)

    bookings = db.relationship("Booking", back_populates="room", lazy=True, cascade="all, delete-orphan")


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=False, index=True)
    check_in_date = db.Column(db.Date, nullable=False, index=True)
    check_out_date = db.Column(db.Date, nullable=False, index=True)
    guests_count = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    booking_status = db.Column(db.String(20), default="confirmed", nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user = db.relationship("User", back_populates="bookings")
    room = db.relationship("Room", back_populates="bookings")

    @property
    def nights(self) -> int:
        return max((self.check_out_date - self.check_in_date).days, 1)


@login_manager.user_loader
def load_user(user_id: str) -> User | None:
    return db.session.get(User, int(user_id))
