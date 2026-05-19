"use client";
import { motion } from "framer-motion";
import { TrendingUp, Users, ShieldCheck } from "lucide-react";
import RMACoin from "@/components/three/RMACoin";

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#b400ff" : "#00ffea",
            opacity: Math.random() * 0.5 + 0.1,
            animation: `particleDrift ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Backgrounds */}
      <div className="absolute inset-0 cyber-grid-bg" />
      <Particles />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(180,0,255,0.06) 0%, transparent 70%)" }}
      />

      {/* Trending badge */}
      <motion.div
        className="relative z-10 mb-6 flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-blue/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TrendingUp size={13} className="text-neon-cyan" />
        <span className="font-mono text-xs text-neon-cyan tracking-widest">TRENDING NOW — PRESALE LIVE</span>
        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
      </motion.div>

      {/* 3D CSS Coin */}
      <motion.div
        className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mb-4"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
      >
        <RMACoin />
      </motion.div>

      {/* Hero text */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          className="font-display font-black text-4xl sm:text-5xl md:text-7xl leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className="text-white">Invest Before </span>
          <span className="gradient-text">The World</span>
          <br />
          <span className="text-white">Discovers It</span>
        </motion.h1>

        <motion.p
          className="font-body text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          The next generation decentralized ecosystem is launching soon.{" "}
          <span className="text-neon-cyan">Early investors</span> get exclusive access before public release.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <a
            href="#presale"
            className="btn-glow relative w-full sm:w-auto px-8 py-4 rounded-lg font-display font-bold text-sm tracking-widest text-white text-center"
            style={{
              background: "linear-gradient(135deg, #0066cc 0%, #7700cc 100%)",
              boxShadow: "0 0 30px rgba(0,212,255,0.3)",
            }}
          >
            ⚡ BUY NOW
          </a>

          <a
            href="#tokenomics"
            className="btn-glow w-full sm:w-auto px-8 py-4 rounded-lg font-display font-semibold text-sm tracking-widest text-neon-blue text-center"
            style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.3)",
            }}
          >
            WHITEPAPER
          </a>

          <a
            href="#community"
            className="btn-glow w-full sm:w-auto px-8 py-4 rounded-lg font-display font-semibold text-sm tracking-widest text-white/70 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            JOIN COMMUNITY
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-neon-cyan" />
            Audited by CertiK
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-neon-cyan" />
            KYC Verified
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="flex items-center gap-2">
            <Users size={12} className="text-neon-cyan" />
            12,847 Investors
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-neon-cyan" />
            Liquidity Locked 2Y
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-[10px] text-white/20 tracking-widest">SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-neon-blue/50 to-transparent" />
      </motion.div>
    </section>
  );
}
