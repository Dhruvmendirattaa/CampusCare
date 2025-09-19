
import React, { useEffect, useRef, useState } from "react";

export default function BreathingBubble() {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 640, height: 480 });
  const [autoBreathe, setAutoBreathe] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const particles = useRef([]);

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Initialize particles
  useEffect(() => {
    const W = canvasSize.width;
    const H = canvasSize.height;
    particles.current = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 2,
      speed: Math.random() * 0.6 + 0.3,
      alpha: Math.random() * 0.5 + 0.2,
    }));
  }, [canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    let radius = 60;
    const minR = 50;
    const maxR = Math.min(W, H) / 3;
    let phase = 0;
    let currentText = "Ready";
    let waveOffset = 0;

    function drawParticles() {
      particles.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${p.alpha})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y + p.r < 0) {
          p.y = H + p.r;
          p.x = Math.random() * W;
        }
      });
    }

    function draw(r, text, bgPulse, progress) {
      ctx.clearRect(0, 0, W, H);

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, `rgba(10,20,60,1)`);
      bg.addColorStop(1, `rgba(0,0,20,1)`);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Waves animation
      ctx.save();
      ctx.globalAlpha = 0.2 + bgPulse * 0.2;
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      const waveHeight = 40;
      const waveLength = 180;
      const baseY = H * 0.8;

      ctx.moveTo(0, baseY);
      for (let x = 0; x <= W; x++) {
        const y = baseY + Math.sin((x + waveOffset) / waveLength) * waveHeight * 0.5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw floating particles
      drawParticles();

      // Bubble gradient
      const g = ctx.createRadialGradient(W / 2 - r * 0.3, H / 2 - r * 0.3, r * 0.2, W / 2, H / 2, r);
      g.addColorStop(0, "rgba(255,255,255,0.95)");
      g.addColorStop(0.4, "rgba(160,200,255,0.6)");
      g.addColorStop(1, "rgba(30,50,100,0.9)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, r + 12, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 8;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#3b82f6";
      ctx.stroke();

      // Text inside bubble
      ctx.fillStyle = "white";
      ctx.font = `bold ${r * 0.3}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, W / 2, H / 2);

      // Cycle counter below bubble
      ctx.fillStyle = "white";
      ctx.font = `bold 28px Arial`;
      ctx.fillText(`Cycles: ${cycleCount}`, W / 2, H / 2 + r + 40);
    }

    let last = performance.now();
    let anim;

    function loop(ts) {
      const dt = (ts - last) / 1000;
      last = ts;

      waveOffset += 30 * dt;
      let bgPulse = 0.5;
      let progress = 0;

      if (autoBreathe) {
        phase += dt;
        const cycle = phase % 8;
        progress = (phase % 8) / 8;

        if (cycle < 3) {
          currentText = "Inhale";
          radius = minR + (maxR - minR) * (cycle / 3);
          bgPulse = cycle / 3;
        } else if (cycle < 4) {
          currentText = "Hold";
          bgPulse = 1;
        } else if (cycle < 7) {
          currentText = "Exhale";
          radius = maxR - (maxR - minR) * ((cycle - 4) / 3);
          bgPulse = 1 - (cycle - 4) / 3;
        } else {
          currentText = "Hold";
          bgPulse = 0.5;
        }

        // ✅ Increment cycleCount only after full round
        const fullCyclesCompleted = Math.floor(phase / 8);
        if (fullCyclesCompleted > cycleCount) {
          setCycleCount(fullCyclesCompleted);

          // Notification after every 5 full cycles
          if (fullCyclesCompleted % 5 === 0) {
            setNotifications((prev) => [
              ...prev,
              `🎉 Congrats! You’ve completed ${fullCyclesCompleted / 5} session(s)!`,
            ]);
            setTimeout(() => {
              setNotifications((prev) => prev.slice(1));
            }, 4000);
          }
        }
      }

      draw(radius, currentText, bgPulse, progress);
      anim = requestAnimationFrame(loop);
    }

    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, [canvasSize, autoBreathe, cycleCount]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#000",
        minHeight: "100vh",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {notifications.map((msg, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: 20 + idx * 60,
            background: "linear-gradient(135deg,#16a34a,#15803d)",
            padding: "14px 28px",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "18px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
            animation: "fadeInOut 4s ease forwards",
          }}
        >
          {msg}
        </div>
      ))}

      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ display: "block" }}
      />

      <button
        onClick={() => {
          setCycleCount(0);
          setNotifications([]);
          setAutoBreathe(!autoBreathe);
        }}
        style={{
          position: "absolute",
          bottom: "40px",
          padding: "12px 28px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg,#3b82f6,#2563eb)",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
        }}
      >
        {autoBreathe ? "Stop" : "Start"}
      </button>

      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
}
