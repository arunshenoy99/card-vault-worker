
# Card Vault Worker

A Cloudflare Worker that serves a personal credit card manager app (Card Vault) as a Single Page Application (SPA). This worker handles static asset delivery and supports client-side routing by falling back to `index.html` on unknown paths.

## Features

- Manage credit cards and track benefits like lounges, markup rates, and surcharges.
- Serves static assets from the `public/` directory using Cloudflare’s asset binding system.
- Supports SPA behavior by routing unknown paths back to `index.html`.
- Lightweight frontend with pure HTML, CSS, and vanilla JavaScript.
- Mobile-first responsive design for clean viewing on all devices.

## Project Structure

```
card-vault-worker/
├── public/                # Static assets (index.html, CSS, JS)
├── src/index.js            # Worker logic
├── wrangler.jsonc          # Worker configuration
└── assets/                 # Screenshots and images
```

## Worker Behavior

- `GET /` → Serves `index.html`
- `POST /card` → Store a card entry into KV
- `GET /cards` → Fetch all saved cards from KV
- `GET /any/unknown/path` → Falls back to serving `index.html` (SPA support)

## Local Development

Install dependencies:

```bash
npm install
```

Start local development server:

```bash
npx wrangler dev
```

## Deployment

Manual deployment:

```bash
npx wrangler publish
```

This project can be linked with GitHub Actions for automatic deployment if needed.

## Environment Configuration

Ensure you have configured KV namespace binding for storing card data in `wrangler.jsonc`.

Example KV binding:

```json
"kv_namespaces": [
  { "binding": "CARDS", "id": "your-kv-namespace-id" }
]
```
