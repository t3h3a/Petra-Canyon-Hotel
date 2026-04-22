from __future__ import annotations

from datetime import date

from ..models import Booking, Room


def room_is_available(room: Room, check_in: date, check_out: date) -> bool:
    """Checks room status and overlapping bookings."""
    if room.availability != "available":
        return False

    overlapping_booking = (
        Booking.query.filter(
            Booking.room_id == room.id,
            Booking.booking_status.in_(("pending", "confirmed")),
            Booking.check_in_date < check_out,
            Booking.check_out_date > check_in,
        )
        .first()
    )
    return overlapping_booking is None
