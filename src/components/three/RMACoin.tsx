"use client";
import { useEffect, useRef } from "react";

export default function RMACoin() {
  const coinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrame: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 25;
      mouseY = (e.clientY / window.innerHeight - 0.5) * -20;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;
      if (coinRef.current) {
        coinRef.current.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;
      }
      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: "900px" }}>
      {/* Glow rings behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 65%)",
            animation: "rmaPulse 3s ease-in-out infinite",
          }}
        />
        {/* Spinning orbit ring 1 */}
        <div
          className="absolute w-60 h-60 rounded-full"
          style={{
            border: "1px solid rgba(0,212,255,0.2)",
            animation: "rmaSpin 12s linear infinite",
          }}
        />
        {/* Spinning orbit ring 2 */}
        <div
          className="absolute w-68 h-68 rounded-full"
          style={{
            width: "272px", height: "272px",
            border: "1px dashed rgba(180,0,255,0.15)",
            animation: "rmaSpin 20s linear infinite reverse",
          }}
        />
        {/* Orbit dots */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const r = 120;
          const x = 50 + Math.cos(rad) * r;
          const y = 50 + Math.sin(rad) * r;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: "6px", height: "6px",
                left: `calc(50% + ${Math.cos(rad) * 120}px - 3px)`,
                top: `calc(50% + ${Math.sin(rad) * 120}px - 3px)`,
                background: i % 2 === 0 ? "#00d4ff" : "#b400ff",
                boxShadow: `0 0 8px ${i % 2 === 0 ? "#00d4ff" : "#b400ff"}`,
                animation: `rmaSpin ${12 + i * 2}s linear infinite`,
                transformOrigin: `${50 - Math.cos(rad) * 120}px ${50 - Math.sin(rad) * 120}px`,
              }}
            />
          );
        })}
      </div>

      {/* 3D Coin */}
      <div
        ref={coinRef}
        style={{
          width: "190px",
          height: "190px",
          transformStyle: "preserve-3d",
          position: "relative",
          animation: "rmaFloat 5s ease-in-out infinite",
        }}
      >
        {/* Front face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, #081428, #162840, #0a1e38, #1a3060, #0e2040, #081428)",
            border: "3px solid rgba(0,212,255,0.7)",
            boxShadow: "0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.25), inset 0 0 25px rgba(0,80,180,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Inner decorative ring */}
          <div style={{
            position: "absolute",
            inset: "12px",
            borderRadius: "50%",
            border: "1px solid rgba(180,0,255,0.5)",
            boxShadow: "0 0 12px rgba(180,0,255,0.4), inset 0 0 12px rgba(180,0,255,0.1)",
          }} />
          {/* Circuit lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }} viewBox="0 0 190 190">
            <circle cx="95" cy="95" r="55" stroke="#00d4ff" strokeWidth="0.5" fill="none" strokeDasharray="3 8" />
            <circle cx="95" cy="95" r="72" stroke="#b400ff" strokeWidth="0.5" fill="none" strokeDasharray="2 12" />
            {[0, 60, 120, 180, 240, 300].map((a, i) => (
              <line
                key={i}
                x1="95" y1="95"
                x2={95 + Math.cos((a * Math.PI) / 180) * 68}
                y2={95 + Math.sin((a * Math.PI) / 180) * 68}
                stroke="#00d4ff"
                strokeWidth="0.5"
                strokeDasharray="3 6"
                opacity="0.4"
              />
            ))}
          </svg>
          {/* RMA text */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              fontSize: "38px",
              letterSpacing: "-1px",
              color: "#00d4ff",
              textShadow: "0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.3)",
              lineHeight: 1,
            }}>
              RMA
            </div>
            <div style={{
              fontFamily: "monospace",
              fontSize: "8px",
              letterSpacing: "0.35em",
              color: "rgba(0,255,234,0.8)",
              textShadow: "0 0 10px #00ffea",
              marginTop: "4px",
            }}>
              PROTOCOL
            </div>
          </div>
          {/* Shine */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 45%, rgba(0,0,0,0.15) 100%)",
          }} />
        </div>

        {/* Edge thickness layers */}
        {[4, 8, 12].map((z, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              transform: `translateZ(-${z}px)`,
              background: `rgba(0, ${80 - i * 20}, ${150 - i * 30}, ${0.8 - i * 0.2})`,
              border: "2px solid rgba(0,100,180,0.3)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes rmaFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes rmaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rmaPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
