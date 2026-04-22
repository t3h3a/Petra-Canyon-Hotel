from __future__ import annotations

import re

from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length, ValidationError

from ..models import User

PHONE_PATTERN = re.compile(r"^[0-9+\-\s()]{7,20}$")


class RegisterForm(FlaskForm):
    full_name = StringField("Full Name", validators=[DataRequired(), Length(min=3, max=120)])
    email = StringField("Email", validators=[DataRequired(), Email(), Length(max=160)])
    phone = StringField("Phone", validators=[DataRequired(), Length(min=7, max=30)])
    nationality = StringField("Nationality", validators=[DataRequired(), Length(min=2, max=80)])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=8, max=128)])
    confirm_password = PasswordField(
        "Confirm Password",
        validators=[DataRequired(), EqualTo("password", message="Passwords must match.")],
    )
    submit = SubmitField("Create Account")

    def validate_email(self, field: StringField) -> None:
        if User.query.filter_by(email=field.data.strip().lower()).first():
            raise ValidationError("This email is already registered.")

    def validate_phone(self, field: StringField) -> None:
        phone = field.data.strip()
        if not PHONE_PATTERN.match(phone):
            raise ValidationError("Enter a valid phone number.")
        if User.query.filter_by(phone=phone).first():
            raise ValidationError("This phone number is already registered.")


class LoginForm(FlaskForm):
    identifier = StringField("Email or Phone", validators=[DataRequired(), Length(min=3, max=160)])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=8, max=128)])
    submit = SubmitField("Login")
