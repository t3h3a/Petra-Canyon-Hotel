from hotel_app import create_app, seed_rooms
from hotel_app.extensions import db


app = create_app()


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        inserted = seed_rooms()
        print(f"Seed completed. Inserted {inserted} rooms.")
