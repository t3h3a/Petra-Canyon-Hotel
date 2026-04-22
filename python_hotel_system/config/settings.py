from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[1]
INSTANCE_DIR = BASE_DIR / "instance"
INSTANCE_DIR.mkdir(exist_ok=True)

load_dotenv(BASE_DIR / ".env")


def _require_secret_key() -> str:
    secret_key = os.getenv("SECRET_KEY", "").strip()
    if not secret_key or secret_key == "change-this-secret-key":
        raise RuntimeError("SECRET_KEY must be set in python_hotel_system/.env and must not use the example placeholder.")
    return secret_key


def _parse_admin_emails() -> list[str]:
    configured = os.getenv("ADMIN_EMAILS", "")
    emails = [email.strip().lower() for email in configured.split(",") if email.strip()]
    bootstrap_email = os.getenv("ADMIN_BOOTSTRAP_EMAIL", "").strip().lower()
    if bootstrap_email and bootstrap_email not in emails:
        emails.append(bootstrap_email)
    if emails:
        return emails

    hotel_email = os.getenv("HOTEL_EMAIL", "").strip().lower()
    if hotel_email and hotel_email != "hotel@example.com":
        return [hotel_email]

    return []


def _parse_allowed_origins() -> list[str]:
    configured = os.getenv("FRONTEND_ORIGINS", "")
    configured_origins = [origin.strip().rstrip("/") for origin in configured.split(",") if origin.strip()]
    default_origins = [
        "https://t3h3a.github.io",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ]

    combined: list[str] = []
    for origin in [*configured_origins, *default_origins]:
        if origin and origin not in combined:
            combined.append(origin)

    return combined


def _env_flag(name: str, default: bool = False) -> bool:
    return os.getenv(name, str(default)).strip().lower() in {"1", "true", "yes", "on"}


class Config:
    """Central configuration for the Flask hotel system."""

    SECRET_KEY = _require_secret_key()
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{(INSTANCE_DIR / 'hotel.db').as_posix()}",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = os.getenv("MAIL_SERVER", "")
    MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
    MAIL_USE_SSL = os.getenv("MAIL_USE_SSL", "False").lower() == "true"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", MAIL_USERNAME)
    HOTEL_EMAIL = os.getenv("HOTEL_EMAIL", "hotel@example.com")
    FRONTEND_ORIGINS = _parse_allowed_origins()
    SESSION_COOKIE_SAMESITE = os.getenv("SESSION_COOKIE_SAMESITE", "Lax")
    SESSION_COOKIE_SECURE = _env_flag("SESSION_COOKIE_SECURE", False)
    ADMIN_EMAILS = _parse_admin_emails()
    ADMIN_BOOTSTRAP_EMAIL = os.getenv("ADMIN_BOOTSTRAP_EMAIL", "").strip().lower()
    ADMIN_BOOTSTRAP_PASSWORD_HASH = os.getenv("ADMIN_BOOTSTRAP_PASSWORD_HASH", "").strip()
    ADMIN_BOOTSTRAP_FULL_NAME = os.getenv("ADMIN_BOOTSTRAP_FULL_NAME", "Hotel Admin").strip()
    ADMIN_BOOTSTRAP_PHONE = os.getenv("ADMIN_BOOTSTRAP_PHONE", "+962700000000").strip()
    ADMIN_BOOTSTRAP_COUNTRY = os.getenv("ADMIN_BOOTSTRAP_COUNTRY", "Jordan").strip()
