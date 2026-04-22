from __future__ import annotations

from flask import current_app

from ..models import User


def is_admin_email(email: str | None) -> bool:
    if not email:
        return False

    admin_emails = current_app.config.get("ADMIN_EMAILS", [])
    return email.strip().lower() in admin_emails


def is_admin_user(user: User | None) -> bool:
    return bool(user and getattr(user, "is_authenticated", False) and is_admin_email(user.email))
