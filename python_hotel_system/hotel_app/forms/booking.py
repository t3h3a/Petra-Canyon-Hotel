from __future__ import annotations

from datetime import date

from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange, Optional, ValidationError


class BookingForm(FlaskForm):
    check_in_date = DateField("Check In Date", validators=[DataRequired()], format="%Y-%m-%d")
    check_out_date = DateField("Check Out Date", validators=[DataRequired()], format="%Y-%m-%d")
    guests_count = IntegerField("Guests Count", validators=[DataRequired(), NumberRange(min=1, max=10)])
    notes = TextAreaField("Notes", validators=[Optional(), Length(max=1000)])
    submit = SubmitField("Book Now")

    def validate_check_in_date(self, field: DateField) -> None:
        if field.data < date.today():
            raise ValidationError("Check-in date cannot be in the past.")

    def validate_check_out_date(self, field: DateField) -> None:
        if self.check_in_date.data and field.data <= self.check_in_date.data:
            raise ValidationError("Check-out date must be after check-in date.")
