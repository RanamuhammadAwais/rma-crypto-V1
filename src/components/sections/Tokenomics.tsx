"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const slices = [
  { label: "Presale", pct: 40, color: "#00d4ff", desc: "Public presale allocation" },
  { label: "Liquidity", pct: 20, color: "#b400ff", desc: "DEX & CEX liquidity pools" },
  { label: "Staking Rewards", pct: 15, color: "#00ffea", desc: "Long-term staker incentives" },
  { label: "Development", pct: 15, color: "#0088ff", desc: "Protocol development fund" },
  { label: "Marketing", pct: 10, color: "#ff6600", desc: "Growth & partnerships" },
];

function DonutChart({ animate }: { animate: boolean }) {
  const r = 80;
  const cx = 110;
  const cy = 110;
  const circumference = 2 * Math.PI * r;

  let cumulative = 0;
  const arcs = slices.map(s => {
    const start = cumulative;
    cumulative += s.pct;
    return { ...s, start, end: cumulative };
  });

  return (
    <div className="relative w-56 h-56 mx-auto">
      <svg viewBox="0 0 220 220" className="w-full h-full -rotate-90">
        {/* Background ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="28" />

        {arcs.map((arc, i) => {
          const dashLen = (arc.end - arc.start) / 100 * circumference;
          const dashOffset = -(arc.start / 100) * circumference;
          return (
            <motion.circle
              key={arc.label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={arc.color}
              strokeWidth="24"
              strokeDasharray={`${animate ? dashLen : 0} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              style={{ filter: `drop-shadow(0 0 6px ${arc.color}80)` }}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={animate ? { strokeDasharray: `${dashLen} ${circumference}` } : {}}
              transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-black text-2xl text-white">10B</span>
        <span className="font-mono text-xs text-white/40">Total Supply</span>
      </div>
    </div>
  );
}

export default function Tokenomics() {
  const [animate, setAnimate] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="tokenomics" className="py-20 px-4 relative overflow-hidden" ref={ref}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-neon-cyan tracking-[0.3em] block mb-3">DISTRIBUTION</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">
            Token <span className="gradient-text">Economics</span>
          </h2>
        </motion.div>

        <div className="glass-strong rounded-2xl p-8" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Chart */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <DonutChart animate={animate} />
            </motion.div>

            {/* Legend */}
            <div className="flex-1 w-full space-y-4">
              {slices.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200"
                  style={{
                    background: active === i ? `${s.color}10` : "transparent",
                    border: active === i ? `1px solid ${s.color}30` : "1px solid transparent",
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body font-semibold text-white text-sm">{s.label}</span>
                      <span className="font-display font-bold" style={{ color: s.color }}>{s.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: s.color }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-white/30 hidden sm:block w-40">{s.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
