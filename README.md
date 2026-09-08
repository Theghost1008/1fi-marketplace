# 1Fi Marketplace

This is my submission for the 1Fi SDE Intern assignment — building out the
**1Fi Marketplace** section inside the existing Shop page of the 1Fi app.

## What 1Fi actually does (context for the feature)

1Fi lets users shop on 0%-interest EMI backed by their mutual fund
portfolio — you pledge your MF units as collateral instead of redeeming
them, so your investments stay invested and keep compounding while you
pay off the purchase. That's the model this Marketplace section is built
around: every product shows EMI plans in that spirit (0% interest,
tenure-based monthly amounts, no credit score requirement), not a
conventional lender EMI.

The Shop page has three tabs: **Top Brands** and **Nearby Stores** (left
blank per the assignment spec — no implementation required there), and
**Marketplace**, which is the actual deliverable.

## Features

- Product listing grid with images, brand, price, and starting EMI
- Search across all three tabs (Top Brands, Nearby Stores, Marketplace) —
  filters what's currently showing based on the active tab
- Product detail screen: variant selection (e.g. storage/color), EMI plan
  selection with tenure and monthly amount, and a CTA to proceed
- Loading, error (with retry), and empty states on both the listing and
  detail screens — not just the happy path
- Pull-to-refresh on the product grid

## Tech stack

- **Expo (React Native)** — SDK 57, TypeScript
- **React Navigation** (native stack) — Shop → Product Detail
- **TanStack React Query** — data fetching, caching, loading/error state
- Mock data + a small API layer standing in for a real backend

## Why it's built this way

**Data layer is separated from UI on purpose.** Nothing in the
components reads from `mockData.ts` directly — everything goes through
`marketplaceApi.ts`, which is the one place that would change if this
were wired to a real backend. Swap the two functions in there for real
`fetch` calls and nothing else in the app needs to move.

**The mock API has a deliberate failure switch.** There's a
`SIMULATE_FAILURE_RATE` constant in `marketplaceApi.ts`, set to `0` by
default. Since there's no real backend here, errors would otherwise
never happen — so this is how I actually tested the error/retry UI
during development rather than just writing it and hoping it works.

**Theme tokens are centralized, not hardcoded.** Every color, spacing
value, and font weight lives in `src/theme/token.ts`. I initially built
this against a generic placeholder palette, then went back and matched
it against real screenshots of the 1Fi app's Home/Shop/Profile screens —
the violet brand color, the lavender-tinted background, the segmented
toggle style (solid white active pill inside a soft rounded track,
not filled chips), and the pill-shaped buttons all come from that.

## Project structure

```
.
├── .gitignore
├── App.tsx
├── LICENSE
├── app.json
├── assets/
│   ├── promo_banner.png
├── babel.config.js
├── package-lock.json
├── package.json
├── src/
│   ├── api/
│   │   ├── marketplaceApi.ts
│   │   └── mockData.ts
│   ├── components/
│   │   ├── EMIPlanCard.tsx
│   │   ├── ErrorView.tsx
│   │   ├── LoadingView.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── ProductsCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SectionTabs.tsx
│   │   └── VariantSelector.tsx
│   ├── hooks/
│   │   ├── useProduct.ts
│   │   └── useProductList.ts
│   ├── navigation/
│   │   └── RootNavigator.tsx
│   ├── screens/
│   │   ├── MarketplaceScreen.tsx
│   │   ├── ProductDetailsScreen.tsx
│   │   └── ShopScreen.tsx
│   ├── theme/
│   │   └── token.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── currency.ts
└── tsconfig.json
```

## Running it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or run on an emulator with `npx expo start --android` / `--ios`.

## What's intentionally not implemented

- **Top Brands and Nearby Stores** — left blank, exactly as the
  assignment spec calls for. Search still works against whatever
  placeholder content is there.
- **No real backend** — everything runs off mock data with a simulated
  network delay, which is explicitly allowed by the assignment ("you may
  use mock APIs/data sources where backend integration is not
  available").
- **No persistence** — selections (variant, EMI plan) reset if you
  navigate away and back, since there's no real checkout flow to persist
  them toward.
- **Pixel-perfect font matching** — the real app uses what looks like a
  rounded geometric sans-serif; this build uses the RN system font at a
  matched weight/size rather than bundling a custom font file, since I
  didn't have a definitive source for the exact typeface.

## Mapping to the assignment's evaluation criteria

- **Product understanding** — EMI plans reflect the actual LAMF (loan
  against mutual funds) mechanic 1Fi uses, not a generic BNPL EMI
- **UI/UX consistency** — theme tokens, segment toggle, and button shapes
  matched against real app screenshots
- **Engineering quality** — data layer, hooks, and UI are cleanly
  separated; components are reusable across both screens
- **Functionality** — full flow from listing → detail → variant/EMI
  selection → proceed CTA
- **Data/API handling** — abstracted behind one API module, ready to
  point at a real backend
- **Attention to detail** — loading, error (with retry), and empty
  states are handled everywhere data is fetched, not just assumed