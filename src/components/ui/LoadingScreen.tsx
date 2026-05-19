"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-bg cyber-grid-bg"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow BG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-neon-blue/5 blur-3xl animate-pulse" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Logo */}
      <motion.div
        className="relative mb-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Hexagon ring */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="absolute inset-0 animate-spin-slow" viewBox="0 0 112 112" fill="none">
            <polygon
              points="56,4 104,28 104,84 56,108 8,84 8,28"
              stroke="url(#hexGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
            />
            <defs>
              <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#b400ff" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute inset-0 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} viewBox="0 0 112 112" fill="none">
            <polygon
              points="56,14 94,34 94,78 56,98 18,78 18,34"
              stroke="url(#hexGrad2)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2 8"
            />
            <defs>
              <linearGradient id="hexGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00ffea" />
                <stop offset="100%" stopColor="#b400ff" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-display font-black text-3xl gradient-text">RMA</span>
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="font-mono text-neon-blue text-sm mb-8 tracking-[0.3em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        INITIALIZING PROTOCOL...
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #00d4ff, #b400ff, #00ffea)",
            width: `${Math.min(progress, 100)}%`,
          }}
          transition={{ duration: 0.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      <motion.p className="font-mono text-white/30 text-xs mt-3 tracking-widest">
        {Math.min(Math.floor(progress), 100)}%
      </motion.p>
    </motion.div>
  );
}
