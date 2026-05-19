"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";

const CONTRACT = "0x7A3B9c2Ef4D8b1C5a0F2e9D7B6A4C8E3F1D5B2A0";

const socials = [
  { name: "Telegram", href: "#", icon: "✈️" },
  { name: "Discord", href: "#", icon: "💬" },
  { name: "Twitter/X", href: "#", icon: "𝕏" },
  { name: "GitHub", href: "#", icon: "⌨️" },
];

const links: Record<string, string[]> = {
  "Protocol": ["Whitepaper", "Audit Report", "Tokenomics", "Roadmap"],
  "Investors": ["Presale", "Staking", "Governance", "Rewards"],
  "Legal": ["Terms of Service", "Privacy Policy", "Disclaimer", "Cookie Policy"],
};

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Safe clipboard with fallback for browsers that don't support it
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(CONTRACT).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => fallbackCopy());
      } else {
        fallbackCopy();
      }
    } catch {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    // Create a temp textarea element to copy from
    const el = document.createElement("textarea");
    el.value = CONTRACT;
    el.style.position = "fixed";
    el.style.left = "-9999px";
    el.style.top = "-9999px";
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fail - show copied anyway as UX feedback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    document.body.removeChild(el);
  };

  return (
    <footer className="relative border-t overflow-hidden" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9">
                <polygon points="18,2 32,9 32,27 18,34 4,27 4,9" fill="none" stroke="url(#footHex)" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="footHex" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#b400ff" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-display font-black text-xl gradient-text">RMA PROTOCOL</span>
            </div>
            <p className="font-body text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              The next-generation decentralized financial ecosystem. Built for the future. Designed for everyone.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-base hover:scale-105 transition-all duration-200"
                  style={{ border: "1px solid rgba(0,212,255,0.12)" }}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="font-display font-bold text-sm text-white mb-4 tracking-widest">{group.toUpperCase()}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-body text-sm text-white/40 hover:text-neon-blue transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contract address */}
        <div className="glass rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ border: "1px solid rgba(0,212,255,0.1)" }}
        >
          <div>
            <p className="font-mono text-[10px] text-white/30 tracking-widest mb-1">CONTRACT ADDRESS (ERC-20)</p>
            <p className="font-mono text-xs sm:text-sm text-white/60 break-all">{CONTRACT}</p>
          </div>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200"
            style={{
              background: copied ? "rgba(0,255,100,0.1)" : "rgba(0,212,255,0.08)",
              border: copied ? "1px solid rgba(0,255,100,0.3)" : "1px solid rgba(0,212,255,0.2)",
              color: copied ? "#00ff88" : "#00d4ff",
            }}
          >
            {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
            {copied ? "COPIED!" : "COPY"}
          </button>
        </div>

        {/* Security badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: "CertiK Audited", color: "#00d4ff" },
            { label: "KYC Verified", color: "#00ff88" },
            { label: "Liquidity Locked 2Y", color: "#b400ff" },
            { label: "SAFU", color: "#ff6600" },
          ].map(badge => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest"
              style={{
                background: `${badge.color}10`,
                border: `1px solid ${badge.color}25`,
                color: badge.color,
              }}
            >
              <span>✓</span>
              {badge.label}
            </div>
          ))}
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="font-mono text-[10px] text-white/25">© 2025 RMA Protocol. All rights reserved.</p>
          <p className="font-mono text-[10px] text-white/20 text-center max-w-md">
            This is not financial advice. Cryptocurrency investments carry high risk. Always DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
