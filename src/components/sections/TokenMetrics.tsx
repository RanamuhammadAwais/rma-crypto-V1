"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Lock, Coins, Percent, Users, BarChart3 } from "lucide-react";

function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

const metrics = [
  { icon: TrendingUp, label: "Presale Price", suffix: "", prefix: "$", value: 0.0042, decimals: 4, color: "#00d4ff", desc: "Per RMA token" },
  { icon: Coins, label: "Launch Price", suffix: "", prefix: "$", value: 0.015, decimals: 3, color: "#b400ff", desc: "3.5× presale price" },
  { icon: Lock, label: "Liquidity Locked", suffix: "%", prefix: "", value: 100, decimals: 0, color: "#00ffea", desc: "For 2 years" },
  { icon: BarChart3, label: "Total Supply", suffix: "B", prefix: "", value: 10, decimals: 0, color: "#0080ff", desc: "RMA tokens" },
  { icon: Percent, label: "Staking APY", suffix: "%", prefix: "", value: 147, decimals: 0, color: "#ff6b00", desc: "Current rate" },
  { icon: Users, label: "Holders", suffix: "K+", prefix: "", value: 12, decimals: 0, color: "#00ff88", desc: "Early investors" },
];

function MetricCard({ icon: Icon, label, prefix, suffix, value, decimals, color, desc, index }: typeof metrics[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCounter(
    decimals === 0 ? value : value * Math.pow(10, decimals),
    1800,
    inView
  );

  const displayValue = decimals === 0
    ? count
    : (count / Math.pow(10, decimals)).toFixed(decimals);

  return (
    <motion.div
      ref={ref}
      className="glass glow-card rounded-xl p-6 relative overflow-hidden group"
      style={{ border: `1px solid ${color}20` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-30"
        style={{ background: color, transform: "translate(50%, -50%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
        </div>

        <div className="font-display font-black text-3xl text-white mb-1">
          {prefix}{displayValue}{suffix}
        </div>
        <div className="font-body font-semibold text-white/70 text-sm mb-1">{label}</div>
        <div className="font-mono text-[10px] text-white/30 tracking-wide">{desc}</div>
      </div>
    </motion.div>
  );
}

export default function TokenMetrics() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-neon-blue tracking-[0.3em] block mb-3">TOKEN DATA</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">
            Token <span className="gradient-text">Metrics</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
