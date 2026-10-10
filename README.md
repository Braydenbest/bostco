# Bostco

A React storefront prototype built with Vite. Product search, category filters, and the shopping bag currently use in-memory demo data.

## Requirements

- Node.js 20 or newer with npm

## Run locally

From the project folder, install the dependencies and start the development server:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (normally [http://localhost:5173](http://localhost:5173)). Stop the server with `Ctrl+C`.

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Python backend

There is no backend code or API contract in this workspace yet. When one is available, run it separately (for example, on port `8000`), replace the demo data and cart behavior in `src/main.jsx` with requests to its endpoints, and configure the backend to allow the Vite origin through CORS. The sample product photos are hosted by Unsplash and need an internet connection; replace them with your own product images when ready.
