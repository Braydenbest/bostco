# Bostco

A React storefront prototype built with Vite. It includes a searchable eight-item catalog, product detail pages, a shared shopping bag, and a demo checkout. Catalog and cart data are local to the browser; orders are not sent to a backend.

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

## Storefront routes

- `/` — landing page and catalog
- `/search?q=term` — shareable search results
- `/products/:productId` — product details
- `/checkout` — shipping form and demo order confirmation
- `/account` — profile, order management, and settings preview
- `/signup` — account signup preview
- `/signin` — sign-in preview

Add and update sample items in `src/products.js`. The checkout and account pages are UI prototypes only: they do not process payments or authenticate accounts. Demo profile details, preferences, and order changes are saved in this browser only; nothing is sent to a server. Standard delivery is shown as free for demo orders of $50 or more.

## Python backend

There is no backend code or API contract in this workspace yet. When one is available, run it separately (for example, on port `8000`), replace the local catalog/cart behavior with requests to its endpoints, and configure the backend to allow the Vite origin through CORS. The sample product photos are hosted by Unsplash and need an internet connection; replace them with your own product images when ready.
