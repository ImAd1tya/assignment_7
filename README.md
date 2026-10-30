# বাজার দর (BazarDor)

বাজার দর helps people in Bangladesh quickly check everyday product prices and compare market-level price ranges in one place.

## Technologies

- Next.js 16 (App Router)
- React 19 and TypeScript
- Tailwind CSS 4 and daisyUI
- Better Auth with MongoDB
- React Hot Toast

## Key features

1. Browse daily prices for essential products, with price changes at a glance.
2. Explore products by category and sort prices from low to high or high to low, including Bengali numerals.
3. View product details, market price ranges, and regional comparisons.
4. Create an account and sign in with email/password, Google, or GitHub.
5. View and update profile information, with protected-route redirects and friendly loading and 404 pages.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the environment variables from `.env.example` in `.env.local`.
3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Production

Build and run the production app with:

```bash
npm run build
npm start
```

Set the same required environment variables in your deployment environment. For OAuth, configure each provider's callback URL to use the deployed app's `/api/auth/callback/{provider}` endpoint.
