"use client";
import { useEffect, useState } from "react";

const generateTx = () => {
  const wallets = ["0x1A2b...9Fc3","0x8E4d...2Ab1","0xF3c7...4E90","0x29aB...7d12","0x5Cc0...9e41","0xD1e2...3B87","0xA7f4...1C56"];
  const amounts = [0.5,1.2,2.5,3,5,0.8,1.5,4.2,0.3,6];
  return {
    wallet: wallets[Math.floor(Math.random() * wallets.length)],
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    time: Math.floor(Math.random() * 60),
  };
};

export default function TransactionTicker() {
  const [txs] = useState(() => Array.from({ length: 18 }, generateTx));

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, rgba(0,212,255,0.08), rgba(180,0,255,0.08))",
        borderBottom: "1px solid rgba(0,212,255,0.1)",
        height: "28px",
      }}
    >
      <div
        className="flex items-center gap-8 h-full whitespace-nowrap animate-ticker"
        style={{ width: "max-content" }}
      >
        {[...txs, ...txs].map((tx, i) => (
          <span key={i} className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-white/40">{tx.wallet}</span>
            <span className="text-neon-cyan">bought</span>
            <span className="text-white font-semibold">{tx.amount} ETH</span>
            <span className="text-white/30">of RMA</span>
            <span className="text-white/20">{tx.time}s ago</span>
            <span className="text-white/10 px-3">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
