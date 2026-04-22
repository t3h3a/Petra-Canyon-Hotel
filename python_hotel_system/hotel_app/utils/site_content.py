from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

from flask import current_app

from ..extensions import db
from ..models import Room


ROOM_KEY_TO_TYPE = {
    "standardSingle": "Standard Single Room",
    "standardDouble": "Standard Double Room",
    "standardTwin": "Standard Twin Room",
    "deluxeDouble": "Deluxe Double Room",
    "deluxeTwin": "Deluxe Twin Room",
    "superiorTriple": "Triple Room",
    "suite": "Suite",
    "presidentialSuite": "Presidential Suite",
}


def _content_file() -> Path:
    return Path(current_app.instance_path) / "site_content.json"


def load_site_content() -> dict[str, Any]:
    path = _content_file()
    if not path.exists():
        return {}

    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def save_site_content(payload: dict[str, Any]) -> dict[str, Any]:
    sanitized = _sanitize_payload(payload)
    path = _content_file()
    path.write_text(json.dumps(sanitized, ensure_ascii=False, indent=2), encoding="utf-8")
    _sync_room_prices(sanitized.get("rooms", []))
    return sanitized


def _sanitize_payload(payload: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(payload, dict):
        return {}

    content: dict[str, Any] = {}
    for section in ("hotelInfo", "homePage", "rooms"):
        value = payload.get(section)
        if value is not None:
            content[section] = value
    return content


def _parse_price(value: Any) -> float | None:
    if isinstance(value, (int, float)):
        return float(value)
    if not isinstance(value, str):
        return None

    match = re.search(r"(\d+(?:\.\d+)?)", value.replace(",", ""))
    if not match:
        return None
    return float(match.group(1))


def _sync_room_prices(rooms_payload: list[dict[str, Any]]) -> None:
    if not isinstance(rooms_payload, list):
        return

    updated = False
    for room_payload in rooms_payload:
        if not isinstance(room_payload, dict):
            continue

        room_key = str(room_payload.get("key", "")).strip()
        room_type = ROOM_KEY_TO_TYPE.get(room_key)
        if not room_type:
            continue

        room = Room.query.filter_by(room_type=room_type).first()
        if room is None:
            continue

        parsed_price = _parse_price(room_payload.get("currentPrice"))
        if parsed_price is not None and room.price != parsed_price:
            room.price = parsed_price
            updated = True

        description = room_payload.get("description", {})
        if isinstance(description, dict):
            english_description = str(description.get("en", "")).strip()
            if english_description and room.description != english_description:
                room.description = english_description
                updated = True

    if updated:
        db.session.commit()
