"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Presale", href: "#presale" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Community", href: "#community" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3 shadow-lg shadow-neon-blue/5" : "py-5 bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
              <polygon points="18,2 32,9 32,27 18,34 4,27 4,9" fill="none" stroke="url(#navHex)" strokeWidth="1.5" />
              <polygon points="18,7 27,12 27,24 18,29 9,24 9,12" fill="rgba(0,212,255,0.05)" stroke="url(#navHex2)" strokeWidth="1" />
              <defs>
                <linearGradient id="navHex" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#b400ff" />
                </linearGradient>
                <linearGradient id="navHex2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00ffea" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display font-black text-[9px] text-neon-blue">R</span>
          </div>
          <span className="font-display font-bold text-lg tracking-wider gradient-text">RMA</span>
          <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-[10px] font-mono tracking-widest animate-pulse">
            <Zap size={8} /> LIVE
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="font-body font-semibold text-sm text-white/60 hover:text-neon-blue transition-all duration-200 tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-blue transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#presale"
            className="btn-glow relative px-5 py-2 rounded font-display font-semibold text-xs tracking-widest text-white"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(180,0,255,0.15))",
              border: "1px solid rgba(0,212,255,0.3)",
            }}
          >
            BUY RMA
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-neon-blue p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass-strong mx-4 mt-2 rounded-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body font-semibold text-white/70 hover:text-neon-blue transition-colors py-1 border-b border-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#presale"
                className="text-center py-3 rounded font-display font-semibold text-sm tracking-widest"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(180,0,255,0.2))",
                  border: "1px solid rgba(0,212,255,0.3)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                BUY RMA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
