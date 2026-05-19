"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/ui/Navbar";
import TransactionTicker from "@/components/ui/TransactionTicker";
import HeroSection from "@/components/sections/HeroSection";
import PresaleSection from "@/components/sections/PresaleSection";
import TokenMetrics from "@/components/sections/TokenMetrics";
import WhyInvest from "@/components/sections/WhyInvest";
import Tokenomics from "@/components/sections/Tokenomics";
import Roadmap from "@/components/sections/Roadmap";
import WalletSection from "@/components/sections/WalletSection";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <main className="relative bg-dark-bg min-h-screen overflow-x-hidden">
      <div className="scanline" />
      <Cursor />
      <Navbar />
      <TransactionTicker />
      <HeroSection />
      <PresaleSection />
      <TokenMetrics />
      <WhyInvest />
      <Tokenomics />
      <Roadmap />
      <WalletSection />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
