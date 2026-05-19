"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Chen",
    handle: "@marcuscrypto",
    avatar: "MC",
    color: "#00d4ff",
    text: "Got in on RMA presale stage 1. The technology behind this is genuinely impressive — I've reviewed 200+ projects and this tokenomics model is one of the best I've seen.",
    tokens: "500,000 RMA",
    date: "2 days ago",
  },
  {
    name: "Sarah K.",
    handle: "@defi_sarah",
    avatar: "SK",
    color: "#b400ff",
    text: "The team behind RMA has real experience in the space. Smart contract audit is clean, liquidity is locked, and the roadmap is realistic. This is the type of project that delivers.",
    tokens: "250,000 RMA",
    date: "5 days ago",
  },
  {
    name: "Ahmed Al-Rashid",
    handle: "@ahmed_web3",
    avatar: "AA",
    color: "#00ffea",
    text: "Been in crypto since 2017. RMA reminds me of early MATIC days. The presale price is insane value for what you're getting. I tripled my allocation.",
    tokens: "1,200,000 RMA",
    date: "1 week ago",
  },
  {
    name: "Julia Hartmann",
    handle: "@julia_defi",
    avatar: "JH",
    color: "#ff6600",
    text: "The staking APY is something else. 147%+ on a deflationary token with a locked liquidity pool? This is what I've been waiting for since last bull run.",
    tokens: "750,000 RMA",
    date: "3 days ago",
  },
  {
    name: "Tyler Nguyen",
    handle: "@tyler_eth",
    avatar: "TN",
    color: "#00ff88",
    text: "Convinced 4 of my close friends to buy in. The community is incredible — over 50K telegram members organically. This isn't manufactured hype, it's real momentum.",
    tokens: "350,000 RMA",
    date: "1 day ago",
  },
  {
    name: "Priya Sharma",
    handle: "@priya_blockchain",
    avatar: "PS",
    color: "#ff00aa",
    text: "As a blockchain developer myself I was skeptical. But after reading the full technical docs and smart contract code... I'm genuinely impressed. This team knows what they're doing.",
    tokens: "180,000 RMA",
    date: "4 days ago",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-neon-cyan tracking-[0.3em] block mb-3">INVESTORS SPEAK</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">
            Early <span className="gradient-text">Believers</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass glow-card rounded-xl p-6 flex flex-col gap-4"
              style={{ border: `1px solid ${t.color}15` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} fill={t.color} style={{ color: t.color }} />
                ))}
              </div>

              <p className="font-body text-white/65 text-sm leading-relaxed flex-1">"{t.text}"</p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-xs"
                    style={{ background: `${t.color}20`, border: `1px solid ${t.color}30`, color: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm">{t.name}</p>
                    <p className="font-mono text-[10px] text-white/30">{t.handle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-xs" style={{ color: t.color }}>{t.tokens}</p>
                  <p className="font-mono text-[9px] text-white/25">{t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
