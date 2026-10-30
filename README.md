<div align="center">

# 🛒 বাজার দর · BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
Track daily grocery prices across Bangladesh's markets — rice, pulses, oil, vegetables, fish, meat, eggs & spices.

[Live Demo](https://your-app.vercel.app) · [Report a Bug](../../issues)

</div>

---

## 📖 About

**BazarDor** is a Bangla-first web app that shows today's market prices for everyday essentials, how they changed since yesterday, and how prices differ from one market to another. Prices come from a public JSON API, and signed-in users can open detailed per-market comparisons.

## 🧰 Technologies Used

| Area | Tech |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) · React · TypeScript |
| Styling | Tailwind CSS · daisyUI |
| Authentication | [Better Auth](https://better-auth.com/) (email/password, Google, GitHub) |
| Database | MongoDB (Atlas) |
| Notifications | react-hot-toast |
| Data | Bazardor price API (`/products`, `/categories`) |
| Hosting | Vercel |

## ✨ Key Features

1. **Live price ticker & categories** — a scrolling marquee of today's prices (▲/▼ change %) and category chips, both loaded from the API.
2. **Price movers** — the "আজ দাম বেড়েছে ▲" and "আজ দাম কমেছে ▼" sections highlight the top 6 risers and fallers, followed by every product in a responsive grid.
3. **Category pages with sorting** — browse by category and sort by default, price low→high or high→low (numeric sort, Bengali numerals handled).
4. **Product details (protected)** — minimum, maximum and average price plus a market-by-market price table.
5. **Authentication & profile** — sign up / sign in with email, Google or GitHub, toast feedback, protected routes, and a profile page where users can update their name.

Also: skeleton loaders, a friendly 404 page, and a layout that works on mobile, tablet and desktop.

## 🚀 Getting Started

### 1. Clone and install
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### 2. Environment variables
Copy `.env.example` to `.env.local` and fill it in:

```dotenv
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/bazardor?retryWrites=true&w=majority
BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
# optional: override the price API
NEXT_PUBLIC_BAZARDOR_API_URL=https://api.api-store.workers.dev/api/bazardor
```

OAuth callback URLs to register:
- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

### 3. Run
```bash
npm run dev      # http://localhost:3000
npm run build    # production build
```

## 📁 Project Structure

```
src/
├── app/            # routes: /, /category/[slug], /product/[slug], /signin, /signup, /profile
├── components/     # layout, home, product, category, auth, profile, common
├── lib/            # api, auth, auth-client, mongodb, format helpers
├── types/          # shared TypeScript types
└── middleware.ts   # protects /product/* and /profile/*
```

## ☁️ Deploying to Vercel

1. Import the repo in Vercel and add every variable from `.env.local` (set `BETTER_AUTH_URL` to your live URL).
2. Add the live callback URLs (`https://<your-domain>/api/auth/callback/google` and `/github`) in the Google and GitHub consoles.
3. In MongoDB Atlas → Network Access, allow Vercel's IPs (`0.0.0.0/0` is the simple option).
4. Dynamic routes (`/category/[slug]`, `/product/[slug]`) are server-rendered, so refreshing any page works.


