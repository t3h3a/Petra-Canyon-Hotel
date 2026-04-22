# Petra-Canyon-Hotel

Petra Canyon Hotel website workspace.

## Run The Hotel App

Use the workspace root command:

```bash
pnpm dev
```

This starts the actual hotel frontend from `artifacts/petra-canyon-hotel`.

## Run The API Locally

Start the Python backend in a second terminal:

```bash
pnpm run dev:api
```

The frontend dev server proxies `/api/*` to `http://127.0.0.1:5000`, so both processes must be running.

## Run Your Device As The Server

To run the hotel backend from your own machine in a more stable way:

```bash
pnpm run serve:api
```

This starts the Flask app through `waitress` on `0.0.0.0:5000`.

Important:

- On your local network, other devices can use `http://YOUR_LOCAL_IP:5000`.
- GitHub Pages cannot run Python. It can only host the frontend.
- If you want the GitHub Pages site to use your own machine as the live backend, your machine must expose a public HTTPS URL.
- The practical way is to use a tunnel such as Cloudflare Tunnel and set `VITE_API_BASE_URL` in GitHub Actions secrets to that HTTPS URL.

## Required Backend Environment

See `python_hotel_system/.env.example`.

For local development, make sure these values are correct:

```env
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
SESSION_COOKIE_SAMESITE=Lax
SESSION_COOKIE_SECURE=False
```

For a public HTTPS frontend such as GitHub Pages, use values like:

```env
FRONTEND_ORIGINS=https://t3h3a.github.io
SESSION_COOKIE_SAMESITE=None
SESSION_COOKIE_SECURE=True
```

## Official Deployment

Use this production setup:

- Frontend: GitHub Pages
- Backend: Render web service

This repo now includes [render.yaml](./render.yaml) for the backend service.

To finish the live deployment:

1. Push the repo to GitHub.
2. In Render, create a new Blueprint from this repository.
3. Let Render create the `petra-canyon-hotel-api` web service.
4. Fill these required Render environment variables:
   - `SECRET_KEY`
   - `MAIL_SERVER`
   - `MAIL_PORT`
   - `MAIL_USE_TLS`
   - `MAIL_USE_SSL`
   - `MAIL_USERNAME`
   - `MAIL_PASSWORD`
   - `MAIL_DEFAULT_SENDER`
   - `HOTEL_EMAIL`
   - `ADMIN_BOOTSTRAP_PASSWORD_HASH`
5. Keep GitHub Pages enabled for this repo.

The frontend production build already falls back to:

```text
https://petra-canyon-hotel-api.onrender.com
```

So once the Render backend is created with that exact service name, the live site can talk to it without changing frontend code again.
