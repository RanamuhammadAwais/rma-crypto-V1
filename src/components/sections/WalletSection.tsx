"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, Wallet } from "lucide-react";

const wallets = [
  { name: "MetaMask", desc: "Most popular Web3 wallet", color: "#f6851b", icon: "🦊" },
  { name: "WalletConnect", desc: "Connect any mobile wallet", color: "#3b99fc", icon: "🔗" },
  { name: "Coinbase Wallet", desc: "Trusted by millions worldwide", color: "#0052ff", icon: "💙" },
  { name: "Trust Wallet", desc: "Secure multi-chain wallet", color: "#3375bb", icon: "🛡️" },
];

// Fake address generator
const fakeAddress = () => {
  const hex = () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0");
  return `0x${hex()}${hex()}...${hex()}`;
};

type Step = "idle" | "connecting" | "connected";

export default function WalletSection() {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string | null>(null);
  const [address] = useState(fakeAddress);
  const [step, setStep] = useState<Step>("idle");

  const handleConnect = async (name: string) => {
    if (connected || connecting) return;
    setConnecting(name);
    setStep("connecting");
    // Pure simulation — no real wallet calls
    await new Promise(r => setTimeout(r, 2000));
    setConnected(name);
    setConnecting(null);
    setStep("connected");
  };

  const handleDisconnect = () => {
    setConnected(null);
    setStep("idle");
  };

  return (
    <section id="community" className="py-20 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent, rgba(180,0,255,0.03) 50%, transparent)" }}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-neon-purple tracking-[0.3em] block mb-3">WALLET</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            Connect Your <span className="gradient-text">Wallet</span>
          </h2>
          <p className="font-body text-white/50 max-w-md mx-auto">
            Choose your preferred wallet to participate in the RMA presale.
          </p>
        </motion.div>

        {/* Connected banner */}
        <AnimatePresence>
          {step === "connected" && connected && (
            <motion.div
              className="mb-8 glass rounded-xl p-5 flex items-center justify-between"
              style={{ border: "1px solid rgba(0,255,100,0.3)" }}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(0,255,100,0.1)" }}>
                  <CheckCircle2 size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="font-body font-semibold text-green-400 text-sm">Connected via {connected}</p>
                  <p className="font-mono text-xs text-white/40">{address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="font-mono text-xs text-white/40">Balance</p>
                  <p className="font-display font-bold text-white text-sm">2.45 ETH</p>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="p-2 rounded-lg glass text-white/40 hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wallet cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {wallets.map((w, i) => {
            const isConnecting = connecting === w.name;
            const isConnected = connected === w.name;
            const isDisabled = !!connecting || !!connected;

            return (
              <motion.button
                key={w.name}
                className="glass glow-card rounded-xl p-5 text-left relative overflow-hidden group transition-all"
                style={{
                  border: `1px solid ${isConnected ? w.color + "55" : "rgba(255,255,255,0.06)"}`,
                  opacity: isDisabled && !isConnecting && !isConnected ? 0.5 : 1,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleConnect(w.name)}
                disabled={isDisabled}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${w.color}08 0%, transparent 70%)` }}
                />

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${w.color}15`, border: `1px solid ${w.color}25` }}
                  >
                    {w.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-white text-sm">{w.name}</h3>
                      {isConnected && (
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      )}
                    </div>
                    <p className="font-body text-sm text-white/40">{w.desc}</p>
                  </div>

                  {/* State indicator */}
                  {isConnecting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin flex-shrink-0" />
                  ) : isConnected ? (
                    <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                  ) : (
                    <div
                      className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0 transition-all group-hover:opacity-100 opacity-0"
                      style={{
                        background: `${w.color}15`,
                        border: `1px solid ${w.color}30`,
                        color: w.color,
                      }}
                    >
                      CONNECT
                    </div>
                  )}
                </div>

                {/* Connecting state overlay */}
                {isConnecting && (
                  <div className="absolute inset-0 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      <span className="font-mono text-[10px] text-white/60 tracking-widest">CONNECTING...</span>
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-6 space-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-white/25 flex items-center justify-center gap-2">
            <Wallet size={11} className="opacity-50" />
            UI demo — no real wallet connection is made
          </p>
          <p className="font-mono text-[10px] text-white/15">
            Full integration will be available at launch
          </p>
        </motion.div>
      </div>
    </section>
  );
}
