## Demo Terminal iFrame

- **Purpose**: Public, read-only Zuperior terminal clone for embedding in an iframe on the marketing site.
- **Tech**: Next.js (App Router), TypeScript, Tailwind CSS, TradingView widgets.

### Running locally

```bash
cd demo-terminal-iframe
npm install
npm run dev
```

App is served at `http://localhost:3000/` and renders the terminal directly on `/` and `/terminal`.

### Environment variables

- `NEXT_PUBLIC_BACKEND_API_URL` (optional): Read-only backend base URL for `/api/instruments` and related endpoints.
- `NEXT_PUBLIC_WS_URL` (required for live data): WebSocket endpoint for quotes and candles, e.g. `wss://<your-demo-ws-host>/ws`.

If `NEXT_PUBLIC_WS_URL` is not set, the app falls back to `wss://metaapi.zuperior.com/ws`.

### Iframe embedding

- Deploy this app (e.g. to Vercel) and embed it from your main site using:

```html
<iframe
  src="https://YOUR-DEMO-TERMINAL-IFRAME-URL/"
  style="width: 100%; height: 100%; border: none;"
  loading="lazy"
></iframe>
```

- The project does **not** enforce any auth in middleware and does not set restrictive frame headers, so it can be framed by your main domain (additional CSP/frame-ancestors can be configured at the hosting level if needed).


