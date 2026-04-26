# Petra Canyon Hotel

Frontend-only workspace for the Petra Canyon Hotel website.

## Run

From the workspace root:

```bash
pnpm install
pnpm dev
```

This starts the hotel app from `artifacts/petra-canyon-hotel`.

## Data Source

The frontend reads room pricing and policy data directly from Google Sheets:

- `Rooms`: `id`, `name_en`, `name_ar`, `name_fr`, `desc_en`, `desc_ar`, `desc_fr`, `price`, `extra_bed_allowed`
- `Policies`

No backend service is required for local development or deployment.

## Build

```bash
pnpm build:hotel
```

## Preview

```bash
pnpm serve:hotel
```
