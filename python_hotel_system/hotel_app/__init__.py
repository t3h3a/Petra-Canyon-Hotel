from __future__ import annotations

from flask import Flask, current_app, jsonify, redirect, request, url_for
from flask_cors import CORS
from sqlalchemy import inspect, text

from config import Config

from .extensions import csrf, db, login_manager
from .models import Room, User
from .routes import api_bp, main_bp
from .seed_data import ROOM_SEED_DATA


def create_app(config_object: type[Config] = Config) -> Flask:
    app = Flask(__name__, instance_relative_config=True, template_folder="templates", static_folder="static")
    app.config.from_object(config_object)
    db.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)
    login_manager.login_view = "main.login"
    login_manager.login_message_category = "warning"

    @login_manager.unauthorized_handler
    def unauthorized():
        if request.path.startswith("/api/"):
            return jsonify({"ok": False, "message": "Authentication is required."}), 401
        return redirect(url_for("main.login", next=request.url))

    if app.config.get("FRONTEND_ORIGINS"):
        CORS(
            app,
            resources={
                r"/api/*": {
                    "origins": app.config["FRONTEND_ORIGINS"],
                    "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
                    "allow_headers": ["Content-Type", "X-CSRFToken"],
                },
            },
            supports_credentials=True,
        )

    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp)

    with app.app_context():
        db.create_all()
        ensure_room_schema()
        ensure_admin_user()

    @app.cli.command("init-db")
    def init_db_command() -> None:
        with app.app_context():
            db.create_all()
            ensure_room_schema()
            ensure_admin_user()
            print("Database tables created.")

    @app.cli.command("seed-rooms")
    def seed_rooms_command() -> None:
        with app.app_context():
            inserted = seed_rooms()
            print(f"Seed completed. Inserted {inserted} rooms.")

    @app.context_processor
    def inject_now():
        from datetime import datetime
        return {"current_year": datetime.utcnow().year}

    return app


def seed_rooms() -> int:
    inserted = 0
    for room_data in ROOM_SEED_DATA:
        existing = Room.query.filter_by(room_number=room_data["room_number"]).first()
        if existing:
            existing.room_type = room_data["room_type"]
            existing.price = room_data["price"]
            existing.included_guests = room_data["included_guests"]
            existing.capacity = room_data["capacity"]
            existing.extra_allowed = room_data["extra_allowed"]
            existing.extra_person_fee = room_data["extra_person_fee"]
            existing.description = room_data["description"]
            continue

        room = Room(
            room_number=room_data["room_number"],
            room_type=room_data["room_type"],
            price=room_data["price"],
            included_guests=room_data["included_guests"],
            capacity=room_data["capacity"],
            extra_allowed=room_data["extra_allowed"],
            extra_person_fee=room_data["extra_person_fee"],
            description=room_data["description"],
            availability="available",
        )
        db.session.add(room)
        inserted += 1

    db.session.commit()
    return inserted


def ensure_room_schema() -> None:
    """Adds room pricing-policy columns for already-created databases."""
    inspector = inspect(db.engine)
    columns = {column["name"] for column in inspector.get_columns("rooms")}
    statements: list[str] = []

    if "included_guests" not in columns:
        statements.append("ALTER TABLE rooms ADD COLUMN included_guests INTEGER NOT NULL DEFAULT 2")
    if "extra_allowed" not in columns:
        statements.append("ALTER TABLE rooms ADD COLUMN extra_allowed BOOLEAN NOT NULL DEFAULT 0")
    if "extra_person_fee" not in columns:
        statements.append("ALTER TABLE rooms ADD COLUMN extra_person_fee FLOAT NOT NULL DEFAULT 15")

    for statement in statements:
        db.session.execute(text(statement))

    if statements:
        db.session.commit()


def ensure_admin_user() -> None:
    configured_email = str(current_app.config.get("ADMIN_BOOTSTRAP_EMAIL", "")).strip().lower()
    configured_password_hash = str(current_app.config.get("ADMIN_BOOTSTRAP_PASSWORD_HASH", "")).strip()
    configured_phone = str(current_app.config.get("ADMIN_BOOTSTRAP_PHONE", "")).strip()
    configured_full_name = str(current_app.config.get("ADMIN_BOOTSTRAP_FULL_NAME", "Hotel Admin")).strip() or "Hotel Admin"
    configured_country = str(current_app.config.get("ADMIN_BOOTSTRAP_COUNTRY", "Jordan")).strip() or "Jordan"

    if not configured_email or not configured_password_hash or not configured_phone:
        return

    user = User.query.filter_by(email=configured_email).first()
    if user is None:
        user = User(
            full_name=configured_full_name,
            email=configured_email,
            phone=configured_phone,
            nationality=configured_country,
            password_hash=configured_password_hash,
        )
        db.session.add(user)
        db.session.commit()
        return

    changed = False
    if user.password_hash != configured_password_hash:
        user.password_hash = configured_password_hash
        changed = True
    if configured_phone and user.phone != configured_phone:
        existing_phone_user = User.query.filter(User.phone == configured_phone, User.id != user.id).first()
        if existing_phone_user is None:
            user.phone = configured_phone
            changed = True
    if user.full_name != configured_full_name:
        user.full_name = configured_full_name
        changed = True
    if user.nationality != configured_country:
        user.nationality = configured_country
        changed = True

    if changed:
        db.session.commit()
