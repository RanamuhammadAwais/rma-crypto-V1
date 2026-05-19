"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  }, [target]);
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [calc]);
  return time;
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 glass cyber-border rounded-lg flex items-center justify-center">
        <span className="font-display font-black text-2xl sm:text-3xl neon-text-blue">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-mono text-[9px] text-white/40 mt-1 tracking-widest">{label}</span>
    </div>
  );
}

type PurchaseStep = "idle" | "confirm" | "processing" | "success";

function PurchaseModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("0.5");
  const [step, setStep] = useState<PurchaseStep>("idle");
  const rmaAmount = (parseFloat(amount || "0") * 50000).toLocaleString();

  const handleBuy = async () => {
    setStep("confirm");
  };

  const handleConfirm = async () => {
    setStep("processing");
    await new Promise(r => setTimeout(r, 2500));
    setStep("success");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={step === "idle" ? onClose : undefined} />
      <motion.div
        className="relative w-full max-w-md glass-strong rounded-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        style={{ border: "1px solid rgba(0,212,255,0.2)" }}
      >
        {/* Header glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent" />

        <div className="p-6">
          {/* Close */}
          {step !== "processing" && (
            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
              <X size={18} />
            </button>
          )}

          {step === "idle" && (
            <>
              <h3 className="font-display font-bold text-xl mb-1 gradient-text">Buy RMA Tokens</h3>
              <p className="font-mono text-xs text-white/40 mb-6">Presale Stage 1 — 1 ETH = 50,000 RMA</p>

              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs text-white/50 mb-2 block tracking-widest">ETH AMOUNT</label>
                  <div className="flex items-center gap-3 glass rounded-lg p-3" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
                    <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      min="0.1"
                      step="0.1"
                      className="flex-1 bg-transparent font-display text-2xl text-white outline-none w-full"
                    />
                    <span className="font-mono text-sm text-neon-blue font-semibold">ETH</span>
                  </div>
                </div>

                <div className="glass rounded-lg p-3 flex justify-between items-center" style={{ border: "1px solid rgba(0,255,234,0.1)" }}>
                  <span className="font-mono text-xs text-white/50">You receive</span>
                  <span className="font-display text-xl text-neon-cyan font-bold">{rmaAmount} RMA</span>
                </div>

                {/* Quick amounts */}
                <div className="flex gap-2">
                  {["0.1","0.5","1","2","5"].map(v => (
                    <button
                      key={v}
                      onClick={() => setAmount(v)}
                      className={`flex-1 py-1.5 rounded text-xs font-mono transition-all ${
                        amount === v
                          ? "bg-neon-blue/20 border border-neon-blue/50 text-neon-blue"
                          : "glass border border-white/10 text-white/50 hover:border-neon-blue/30"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: "rgba(255,165,0,0.05)", border: "1px solid rgba(255,165,0,0.1)" }}>
                  <AlertCircle size={14} className="text-yellow-500 mt-0.5 shrink-0" />
                  <p className="font-mono text-[10px] text-yellow-500/70 leading-relaxed">
                    Tokens will be claimable after TGE. Ensure your wallet supports ERC-20 tokens.
                  </p>
                </div>

                <button
                  onClick={handleBuy}
                  className="w-full py-4 rounded-lg font-display font-bold text-sm tracking-widest text-white"
                  style={{
                    background: "linear-gradient(135deg, #0066cc, #7700cc)",
                    boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                  }}
                >
                  CONFIRM PURCHASE
                </button>
              </div>
            </>
          )}

          {step === "confirm" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full glass cyber-border flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-black text-2xl text-neon-blue">{amount}</span>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Confirm Transaction</h3>
              <p className="font-mono text-xs text-white/40 mb-6">
                {amount} ETH → {rmaAmount} RMA
              </p>
              <div className="glass rounded-lg p-4 mb-6 text-left space-y-2">
                {[
                  ["Amount", `${amount} ETH`],
                  ["Tokens", `${rmaAmount} RMA`],
                  ["Gas (est.)", "~$4.20"],
                  ["Stage", "Presale 1"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="font-mono text-xs text-white/40">{k}</span>
                    <span className="font-mono text-xs text-white">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("idle")}
                  className="flex-1 py-3 rounded-lg font-display text-sm tracking-wide text-white/50 glass"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  BACK
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 rounded-lg font-display font-bold text-sm tracking-widest text-white"
                  style={{ background: "linear-gradient(135deg, #0066cc, #7700cc)" }}
                >
                  APPROVE
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="text-center py-8">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-neon-blue/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-t-2 border-neon-blue animate-spin" />
                <div className="absolute inset-2 rounded-full border-t-2 border-neon-purple animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Processing Transaction</h3>
              <p className="font-mono text-xs text-white/40 animate-pulse">Waiting for blockchain confirmation...</p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(0,255,100,0.1)", border: "1px solid rgba(0,255,100,0.3)" }}
              >
                <CheckCircle2 size={40} className="text-green-400" />
              </motion.div>
              <h3 className="font-display font-bold text-2xl mb-2 text-green-400">Purchase Successful!</h3>
              <p className="font-mono text-xs text-white/40 mb-2">{rmaAmount} RMA tokens reserved</p>
              <p className="font-mono text-[10px] text-white/30 mb-6">
                Tx: 0x{Math.random().toString(16).substr(2, 40)}...
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-lg font-display font-bold text-sm tracking-widest text-white"
                style={{ background: "linear-gradient(135deg, #0066cc, #7700cc)" }}
              >
                CLOSE
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PresaleSection() {
  const [showModal, setShowModal] = useState(false);
  const endDate = new Date(Date.now() + 18 * 24 * 3600 * 1000 + 7 * 3600 * 1000);
  const { d, h, m, s } = useCountdown(endDate);

  const raised = 2_847_500;
  const goal = 5_000_000;
  const progress = (raised / goal) * 100;

  return (
    <section id="presale" className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.03) 50%, transparent)" }}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass-strong rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(0,212,255,0.2)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top glow line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-neon-blue via-50% to-transparent" />

          <div className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="font-mono text-xs text-neon-cyan tracking-widest">PRESALE STAGE 1 — LIVE NOW</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl gradient-text">RMA Token Presale</h2>
              </div>
              <div className="glass px-4 py-2 rounded-lg text-center" style={{ border: "1px solid rgba(180,0,255,0.2)" }}>
                <p className="font-mono text-[10px] text-white/40 tracking-widest">PRESALE PRICE</p>
                <p className="font-display font-bold text-xl text-neon-purple">$0.0042</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-xs text-white/50">Raised: <span className="text-neon-cyan">${raised.toLocaleString()}</span></span>
                <span className="font-mono text-xs text-white/50">Goal: <span className="text-white">${goal.toLocaleString()}</span></span>
              </div>
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ background: "linear-gradient(90deg, #00d4ff, #b400ff, #00ffea)" }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg" style={{ boxShadow: "0 0 10px #00d4ff" }} />
                </motion.div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[10px] text-white/30">{progress.toFixed(1)}% Complete</span>
                <span className="font-mono text-[10px] text-neon-blue">12,847 Investors</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="mb-8">
              <p className="font-mono text-xs text-white/40 text-center mb-4 tracking-widest">PRESALE ENDS IN</p>
              <div className="flex items-center justify-center gap-3">
                <CountdownBox value={d} label="DAYS" />
                <span className="font-display text-2xl text-neon-blue/50 mb-4">:</span>
                <CountdownBox value={h} label="HOURS" />
                <span className="font-display text-2xl text-neon-blue/50 mb-4">:</span>
                <CountdownBox value={m} label="MINS" />
                <span className="font-display text-2xl text-neon-blue/50 mb-4">:</span>
                <CountdownBox value={s} label="SECS" />
              </div>
            </div>

            {/* Buy button */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-5 rounded-xl font-display font-black text-lg tracking-widest text-white relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #0055bb 0%, #6600bb 50%, #0055bb 100%)",
                backgroundSize: "200% 100%",
                boxShadow: "0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(180,0,255,0.1)",
              }}
            >
              <span className="relative z-10">⚡ BUY RMA — STAGE 1</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <p className="font-mono text-[10px] text-white/25 text-center mt-3">
              1 ETH = 50,000 RMA · Launch price $0.015 · 3.5× gain at TGE
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && <PurchaseModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </section>
  );
}
