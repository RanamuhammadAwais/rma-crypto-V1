"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is RMA Token?",
    a: "RMA (Resilient Monetary Asset) is a next-generation DeFi token built on Ethereum L2, featuring deflationary tokenomics, AI-powered yield optimization, and community governance. It's designed for long-term value accrual through its burn mechanism and staking ecosystem.",
  },
  {
    q: "How do I participate in the presale?",
    a: "Connect your Web3 wallet (MetaMask, WalletConnect, Coinbase Wallet, or Trust Wallet), click 'Buy RMA', and enter the ETH amount you want to invest. Minimum purchase is 0.1 ETH. Tokens will be claimable after the Token Generation Event (TGE).",
  },
  {
    q: "When will tokens be claimable?",
    a: "RMA tokens will be claimable starting at the Token Generation Event (TGE), which is scheduled approximately 30 days after the presale concludes. You'll receive a notification via email and Telegram once the claim portal is live.",
  },
  {
    q: "Is the smart contract audited?",
    a: "Yes. RMA's smart contracts have been audited by CertiK, one of the most respected blockchain security firms. The full audit report is available on our website. Additionally, we have a KYC-verified team and a bug bounty program active.",
  },
  {
    q: "What makes RMA deflationary?",
    a: "2% of every on-chain transaction is permanently burned, reducing the total circulating supply over time. Combined with a fixed max supply of 10 billion tokens and increasing demand from our ecosystem, this creates a long-term deflationary pressure on the token.",
  },
  {
    q: "What is the vesting schedule?",
    a: "Presale tokens have no vesting — 100% are available at TGE. Development and marketing allocations are vested over 12-24 months to ensure long-term commitment from the core team. This structure protects investors from early sell pressure.",
  },
  {
    q: "Which exchanges will list RMA?",
    a: "We have LOIs (Letters of Intent) from 2 top-10 CEXs and confirmed listings on Uniswap V3 and SushiSwap at launch. Exchange names will be announced publicly 2 weeks before TGE. We expect significant price discovery in the first 72 hours of trading.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      className="border-b"
      style={{ borderColor: "rgba(0,212,255,0.08)" }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className={`font-body font-semibold text-sm sm:text-base transition-colors duration-200 ${open ? "text-neon-blue" : "text-white/80 group-hover:text-white"}`}>
          {q}
        </span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: open ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)",
            border: open ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {open ? <Minus size={13} className="text-neon-blue" /> : <Plus size={13} className="text-white/50" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="font-body text-white/50 text-sm leading-relaxed pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.03) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-neon-blue tracking-[0.3em] block mb-3">COMMON QUESTIONS</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">
            Frequently <span className="gradient-text">Asked</span>
          </h2>
        </motion.div>

        <div className="glass-strong rounded-2xl px-6 sm:px-8" style={{ border: "1px solid rgba(0,212,255,0.12)" }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <motion.p
          className="text-center font-mono text-xs text-white/25 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Still have questions? Join our{" "}
          <a href="#" className="text-neon-blue hover:underline">Telegram community</a>{" "}
          or email{" "}
          <a href="mailto:support@rmatoken.io" className="text-neon-blue hover:underline">support@rmatoken.io</a>
        </motion.p>
      </div>
    </section>
  );
}
