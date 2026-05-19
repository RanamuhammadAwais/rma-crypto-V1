"use client";
import { motion } from "framer-motion";
import { TrendingUp, Users, ShieldCheck } from "lucide-react";
import dynamic from "next/dynamic";

const RMACoin = dynamic(() => import("@/components/three/RMACoin"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
        <div className="absolute inset-0 rounded-full border border-neon-blue/20 animate-ping" style={{ animationDuration: "2.5s" }} />
        <div className="absolute inset-8 rounded-full border border-neon-purple/20 animate-ping" style={{ animationDuration: "3.5s" }} />
        <div className="absolute inset-16 rounded-full border border-neon-cyan/20 animate-ping" style={{ animationDuration: "4s" }} />
        <span className="font-display font-black text-3xl gradient-text" style={{ zIndex: 10 }}>RMA</span>
      </div>
    </div>
  ),
});

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  `${Math.random() * 2.5 + 0.5}px`,
            height: `${Math.random() * 2.5 + 0.5}px`,
            left:   `${Math.random() * 100}%`,
            top:    `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#b400ff" : "#00ffea",
            opacity: Math.random() * 0.4 + 0.1,
            animation: `particleDrift ${Math.random() * 15 + 12}s linear infinite`,
            animationDelay: `${Math.random() * 12}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0 overflow-hidden pt-16 pb-8">
      {/* BG layers */}
      <div className="absolute inset-0 cyber-grid-bg" />
      <Particles />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 68%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(180,0,255,0.05) 0%, transparent 70%)" }} />

      {/* ── LEFT: copy ─────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left px-8 max-w-[520px] order-2 lg:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {/* Live badge */}
        <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-blue/25">
          <TrendingUp size={12} className="text-neon-cyan" />
          <span className="font-mono text-[11px] text-neon-cyan tracking-[0.2em]">TRENDING NOW — PRESALE LIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
        </div>

        <h1 className="font-display font-black leading-[1.05] mb-6" style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)" }}>
          <span className="text-white">Invest</span>
          <br />
          <span className="gradient-text">Before The</span>
          <br />
          <span className="text-white">World Knows</span>
        </h1>

        <p className="font-body text-base sm:text-lg text-white/55 max-w-md mb-8 leading-relaxed">
          The next generation decentralized ecosystem is launching soon.{" "}
          <span className="text-neon-cyan font-semibold">Early investors</span>{" "}
          get exclusive access before public release.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10">
          <a
            href="#presale"
            className="btn-glow relative px-8 py-4 rounded-xl font-display font-bold text-sm tracking-widest text-white text-center overflow-hidden group"
            style={{
              background: "linear-gradient(135deg,#005bcc,#6600cc)",
              boxShadow: "0 0 28px rgba(0,212,255,0.35),0 0 55px rgba(180,0,255,0.15)",
            }}
          >
            <span className="relative z-10">⚡ BUY RMA NOW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="#tokenomics"
            className="btn-glow px-8 py-4 rounded-xl font-display font-semibold text-sm tracking-widest text-neon-blue text-center"
            style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.3)" }}
          >
            WHITEPAPER
          </a>
        </div>

        {/* Trust line */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-neon-cyan/55">
          {["✓ CertiK Audited","✓ KYC Verified","✓ 12,847 Investors","✓ Liquidity Locked 2Y"].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT: 3D Coin ─────────────────────────────────── */}
      <motion.div
        className="relative z-10 order-1 lg:order-2 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, type: "spring", stiffness: 60, delay: 0.2 }}
      >
        {/* Drag hint */}
        <motion.p
          className="font-mono text-[10px] text-white/20 tracking-[0.25em] mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          ⟳ DRAG TO SPIN  ·  TOUCH SUPPORTED
        </motion.p>

        {/* Canvas container */}
        <div
          className="relative"
          style={{ width: "clamp(300px, 38vw, 480px)", height: "clamp(300px, 38vw, 480px)" }}
        >
          {/* Ambient glow behind coin */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 50% 55%, rgba(0,180,255,0.15) 0%, rgba(120,0,255,0.08) 45%, transparent 70%)",
            filter: "blur(24px)",
            transform: "scale(1.15)",
          }} />
          <RMACoin />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-[9px] text-white/18 tracking-widest">SCROLL</span>
        <div className="w-px h-7 bg-gradient-to-b from-neon-blue/35 to-transparent" />
      </motion.div>
    </section>
  );
}
