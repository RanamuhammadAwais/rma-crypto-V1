"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Rocket, Globe } from "lucide-react";

const phases = [
  {
    quarter: "Q1 2025",
    title: "Presale Launch",
    icon: Rocket,
    status: "completed",
    color: "#00d4ff",
    items: ["Smart contract deployment", "CertiK security audit", "Community building (50K+)", "Whitepaper release", "Presale Stage 1 & 2"],
  },
  {
    quarter: "Q2 2025",
    title: "Exchange Listings",
    icon: Clock,
    status: "active",
    color: "#b400ff",
    items: ["DEX listing on Uniswap", "CEX listing negotiations", "Liquidity provisioning", "Token claim portal", "Marketing campaign"],
  },
  {
    quarter: "Q3 2025",
    title: "Staking Platform",
    icon: Globe,
    status: "upcoming",
    color: "#00ffea",
    items: ["Staking dashboard launch", "Yield farming pools", "Governance portal v1", "Mobile app beta", "Partnership integrations"],
  },
  {
    quarter: "Q4 2025",
    title: "Global Expansion",
    icon: Globe,
    status: "upcoming",
    color: "#ff6600",
    items: ["Cross-chain bridge", "RMA DAO governance", "Enterprise partnerships", "100K+ holders target", "V2 protocol upgrade"],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-neon-blue tracking-[0.3em] block mb-3">TIMELINE</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">
            <span className="gradient-text">Roadmap</span> to Dominance
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, transparent, #00d4ff, #b400ff, #00ffea, #ff6600, transparent)" }}
          />

          <div className="space-y-8 lg:space-y-0">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.quarter}
                className={`relative lg:flex lg:items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Card */}
                <div className={`lg:w-[calc(50%-40px)] ${i % 2 === 0 ? "lg:text-right lg:pr-8" : "lg:text-left lg:pl-8"}`}>
                  <div
                    className="glass glow-card rounded-xl p-6 relative overflow-hidden"
                    style={{ border: `1px solid ${phase.color}25` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${phase.color}60, transparent)` }}
                    />

                    <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? "lg:justify-end" : "justify-start"}`}>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: `${phase.color}15`, border: `1px solid ${phase.color}30` }}
                      >
                        <phase.icon size={16} style={{ color: phase.color }} />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] tracking-widest" style={{ color: phase.color }}>{phase.quarter}</span>
                        <h3 className="font-display font-bold text-lg text-white leading-tight">{phase.title}</h3>
                      </div>
                    </div>

                    <ul className={`space-y-1.5 ${i % 2 === 0 ? "lg:text-right" : "text-left"}`}>
                      {phase.items.map((item, j) => (
                        <li key={j} className={`flex items-center gap-2 ${i % 2 === 0 ? "lg:justify-end" : "justify-start"}`}>
                          {phase.status === "completed" ? (
                            <CheckCircle2 size={12} className="text-green-400 flex-shrink-0" />
                          ) : (
                            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: phase.color }} />
                          )}
                          <span className={`font-body text-sm ${phase.status === "completed" ? "text-white/60 line-through decoration-green-400/50" : phase.status === "active" ? "text-white/80" : "text-white/40"}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Status badge */}
                    <div className={`mt-4 flex ${i % 2 === 0 ? "lg:justify-end" : "justify-start"}`}>
                      <span
                        className="font-mono text-[10px] px-3 py-1 rounded-full tracking-widest"
                        style={{
                          background: phase.status === "completed" ? "rgba(0,255,100,0.1)" : phase.status === "active" ? `${phase.color}15` : "rgba(255,255,255,0.05)",
                          border: `1px solid ${phase.status === "completed" ? "rgba(0,255,100,0.3)" : phase.status === "active" ? `${phase.color}40` : "rgba(255,255,255,0.1)"}`,
                          color: phase.status === "completed" ? "#00ff88" : phase.status === "active" ? phase.color : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {phase.status === "completed" ? "✓ COMPLETE" : phase.status === "active" ? "⚡ IN PROGRESS" : "◦ UPCOMING"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-dark-bg"
                    style={{
                      background: phase.color,
                      boxShadow: `0 0 15px ${phase.color}, 0 0 30px ${phase.color}50`,
                    }}
                  />
                </div>

                {/* Spacer for other side */}
                <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
