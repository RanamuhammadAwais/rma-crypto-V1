import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RMA Token — Invest Before The World Discovers It",
  description: "The next generation decentralized ecosystem. Early investors get exclusive access before public launch. Join the RMA presale now.",
  keywords: "RMA, crypto, token, presale, DeFi, blockchain, investment, Web3",
  openGraph: {
    title: "RMA Token — Early Investor Access",
    description: "The next generation decentralized ecosystem is launching soon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
