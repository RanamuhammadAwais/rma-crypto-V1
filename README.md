# RMA Protocol — Crypto Launch Website

A premium cyberpunk-themed crypto presale website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.

## Features

- 🚀 Next.js 15 App Router
- 🎨 Cyberpunk / Web3 aesthetic with neon gradients
- 💎 3D animated RMA coin (React Three Fiber)
- ⚡ Live presale section with countdown timer
- 💼 Simulated wallet connection (MetaMask, WalletConnect, Coinbase, Trust)
- 🛒 Simulated token purchase flow with multi-step modal
- 📊 Animated token metrics with counters
- 🍩 Tokenomics donut chart (pure SVG)
- 🗺️ Futuristic roadmap timeline
- 💬 Investor testimonials
- ❓ Animated FAQ accordion
- 📜 Live transaction ticker
- 🖱️ Custom cursor
- 📱 Fully responsive

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deploys.

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles + cyberpunk theme
│   ├── layout.tsx         # Root layout + SEO metadata
│   └── page.tsx           # Main page
├── components/
│   ├── sections/          # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── PresaleSection.tsx
│   │   ├── TokenMetrics.tsx
│   │   ├── WhyInvest.tsx
│   │   ├── Tokenomics.tsx
│   │   ├── Roadmap.tsx
│   │   ├── WalletSection.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── three/
│   │   └── RMACoin.tsx    # 3D coin with React Three Fiber
│   └── ui/
│       ├── LoadingScreen.tsx
│       ├── Cursor.tsx
│       ├── Navbar.tsx
│       └── TransactionTicker.tsx
└── hooks/
    └── useMousePosition.ts
```

## Customization

- **Colors**: Edit CSS variables in `globals.css`
- **Token name**: Search/replace "RMA" across components
- **Contract address**: Update in `Footer.tsx`
- **Presale data**: Edit `PresaleSection.tsx`
- **Token metrics**: Edit `TokenMetrics.tsx`
