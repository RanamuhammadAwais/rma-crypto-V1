"use client";
import { motion } from "framer-motion";
import { Brain, Shield, Flame, Vote, Zap, Gift } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Ecosystem",
    desc: "Advanced AI algorithms optimize trading, staking rewards, and protocol decisions in real time.",
    color: "#00d4ff",
  },
  {
    icon: Shield,
    title: "Secure Infrastructure",
    desc: "Triple-audited smart contracts with multi-sig governance and battle-tested security protocols.",
    color: "#b400ff",
  },
  {
    icon: Flame,
    title: "Deflationary Tokenomics",
    desc: "2% of every transaction is permanently burned, reducing supply and increasing token value over time.",
    color: "#ff4400",
  },
  {
    icon: Vote,
    title: "Community Governance",
    desc: "RMA holders vote on protocol upgrades, treasury allocation, and ecosystem partnerships.",
    color: "#00ffea",
  },
  {
    icon: Zap,
    title: "High Scalability",
    desc: "Built on a Layer-2 architecture processing 100,000+ TPS with near-zero gas fees.",
    color: "#ffaa00",
  },
  {
    icon: Gift,
    title: "Early Investor Rewards",
    desc: "Presale participants receive 3× staking multipliers, exclusive NFT drops, and priority access.",
    color: "#00ff88",
  },
];

export default function WhyInvest() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* BG effect */}
      <div className="absolute inset-0 cyber-grid-bg opacity-50" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(180,0,255,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-neon-purple tracking-[0.3em] block mb-3">INVESTMENT CASE</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            Why <span className="gradient-text">Invest</span> in RMA?
          </h2>
          <p className="font-body text-white/50 max-w-xl mx-auto text-lg">
            RMA isn't just another token. It's the foundation of a next-generation financial ecosystem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass glow-card rounded-xl p-6 relative overflow-hidden group"
              style={{ border: `1px solid ${f.color}18` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${f.color}08 0%, transparent 60%)` }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
              >
                <f.icon size={22} style={{ color: f.color }} />
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                  style={{ background: f.color }}
                />
                <f.icon size={22} style={{ color: f.color }} className="relative z-10" />
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-2">{f.title}</h3>
              <p className="font-body text-white/50 text-sm leading-relaxed">{f.desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${f.color}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
