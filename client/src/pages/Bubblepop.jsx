// import React, { useEffect, useRef, useState } from "react";

// /**
//  * RisingBubblesGame.jsx
//  *
//  * Usage: import RisingBubblesGame from "./RisingBubblesGame";
//  *
//  * Features:
//  * - Bubbles spawn at the bottom and rise; click/tap to pop (score++)
//  * - Pop animation (expanding ring + fade)
//  * - Adjustable spawn rate and pause/reset controls
//  * - Responsive canvas, cleans up listeners/frames
//  */

// export default function RisingBubblesGame() {
//   const canvasRef = useRef(null);
//   const rafRef = useRef(null);
//   const lastSpawnRef = useRef(0);
//   const [running, setRunning] = useState(true);
//   const [score, setScore] = useState(0);
//   const [spawnInterval, setSpawnInterval] = useState(700); // ms between spawns
//   const bubblesRef = useRef([]); // active bubbles
//   const popsRef = useRef([]); // active pop animations

//   // Utility
//   const rand = (min, max) => Math.random() * (max - min) + min;
//   const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

//   // Resize canvas to fill parent/window
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     function resize() {
//       const dpr = window.devicePixelRatio || 1;
//       const w = window.innerWidth;
//       const h = window.innerHeight;
//       canvas.width = Math.floor(w * dpr);
//       canvas.height = Math.floor(h * dpr);
//       canvas.style.width = `${w}px`;
//       canvas.style.height = `${h}px`;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     }

//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   // Spawn a new bubble at bottom
//   const spawnBubble = (ctxWidth, ctxHeight) => {
//     const radius = rand(16, 50);
//     const x = rand(radius + 8, ctxWidth - radius - 8);
//     const y = ctxHeight + radius + rand(0, 40); // slightly off-screen bottom
//     const speed = rand(30, 110); // pixels per second
//     const hue = Math.floor(rand(180, 320)); // colorful range
//     return { id: Math.random().toString(36).slice(2), x, y, radius, speed, hue, popped: false };
//   };

//   // Pop a bubble (create pop animation and remove bubble)
//   const popBubble = (b) => {
//     // remove bubble from active
//     bubblesRef.current = bubblesRef.current.filter((bb) => bb.id !== b.id);
//     // add pop animation
//     popsRef.current.push({
//       x: b.x,
//       y: b.y,
//       t: 0,
//       duration: 420,
//       hue: b.hue,
//       maxR: b.radius * 2.2,
//     });
//     setScore((s) => s + 1);
//   };

//   // Hit detection for click/touch
//   const handlePointer = (clientX, clientY) => {
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = clientX - rect.left;
//     const y = clientY - rect.top;
//     // Find topmost bubble under pointer
//     const hit = [...bubblesRef.current].reverse().find((b) => {
//       const dx = x - b.x;
//       const dy = y - b.y;
//       return dx * dx + dy * dy <= b.radius * b.radius;
//     });
//     if (hit) popBubble(hit);
//   };

//   // Attach pointer handlers
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const onClick = (e) => {
//       handlePointer(e.clientX, e.clientY);
//     };
//     const onTouch = (e) => {
//       if (e.touches && e.touches[0]) {
//         handlePointer(e.touches[0].clientX, e.touches[0].clientY);
//       }
//     };
//     canvas.addEventListener("click", onClick);
//     canvas.addEventListener("touchstart", onTouch, { passive: true });

//     return () => {
//       canvas.removeEventListener("click", onClick);
//       canvas.removeEventListener("touchstart", onTouch);
//     };
//   }, []);

//   // Main loop
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let last = performance.now();

//     function step(ts) {
//       const dt = (ts - last) / 1000; // seconds
//       last = ts;

//       const w = canvas.clientWidth;
//       const h = canvas.clientHeight;

//       // Spawn logic
//       if (running && ts - lastSpawnRef.current >= spawnInterval) {
//         bubblesRef.current.push(spawnBubble(w, h));
//         lastSpawnRef.current = ts;
//       }

//       // Update bubbles (move up)
//       for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
//         const b = bubblesRef.current[i];
//         b.y -= b.speed * dt;
//         // slight horizontal drift
//         b.x += Math.sin((ts + i * 100) / 1500 + i) * 6 * dt;
//         // pop when reaching top
//         if (b.y + b.radius < 0 && !b.popped) {
//           b.popped = true;
//           // automatic pop (no score)
//           popsRef.current.push({
//             x: b.x,
//             y: Math.max(0, b.y + b.radius),
//             t: 0,
//             duration: 300,
//             hue: b.hue,
//             maxR: b.radius * 1.6,
//             scoreless: true,
//           });
//           bubblesRef.current.splice(i, 1);
//         }
//       }

//       // Update pops
//       for (let i = popsRef.current.length - 1; i >= 0; i--) {
//         const p = popsRef.current[i];
//         p.t += dt * 1000;
//         if (p.t > p.duration) {
//           popsRef.current.splice(i, 1);
//         }
//       }

//       // Draw
//       ctx.clearRect(0, 0, w, h);

//       // soft background
//       const bg = ctx.createLinearGradient(0, 0, 0, h);
//       bg.addColorStop(0, "#071130");
//       bg.addColorStop(1, "#071a2b");
//       ctx.fillStyle = bg;
//       ctx.fillRect(0, 0, w, h);

//       // Draw bubbles (back to front)
//       for (const b of bubblesRef.current) {
//         // subtle shadow
//         ctx.beginPath();
//         ctx.arc(b.x + 6, b.y + 10, b.radius * 0.98, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(6,10,24,0.3)";
//         ctx.fill();

//         // bubble gradient
//         const g = ctx.createRadialGradient(b.x - b.radius * 0.3, b.y - b.radius * 0.35, b.radius * 0.1, b.x, b.y, b.radius);
//         g.addColorStop(0, "rgba(255,255,255,0.9)");
//         g.addColorStop(0.2, `hsla(${b.hue},70%,65%,0.8)`);
//         g.addColorStop(1, `hsla(${b.hue},70%,45%,0.65)`);

//         ctx.beginPath();
//         ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
//         ctx.fillStyle = g;
//         ctx.fill();

//         // rim stroke
//         ctx.lineWidth = Math.max(1, b.radius * 0.04);
//         ctx.strokeStyle = "rgba(255,255,255,0.25)";
//         ctx.stroke();
//       }

//       // Draw pops (front)
//       for (const p of popsRef.current) {
//         const progress = clamp(p.t / p.duration, 0, 1);
//         const alpha = 1 - progress;
//         const r = p.maxR * (0.6 + 0.8 * progress);
//         // expanding ring
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
//         ctx.strokeStyle = `hsla(${p.hue},80%,65%,${0.9 * alpha})`;
//         ctx.lineWidth = 3 + 6 * (1 - alpha);
//         ctx.stroke();

//         // quick confetti dots (simple)
//         if (progress < 0.6) {
//           const dots = 6;
//           for (let k = 0; k < dots; k++) {
//             const ang = (k / dots) * Math.PI * 2 + progress * 4;
//             const rr = r * (0.6 + 0.4 * Math.random());
//             const dx = Math.cos(ang) * rr;
//             const dy = Math.sin(ang) * rr * 0.6;
//             ctx.beginPath();
//             ctx.arc(p.x + dx, p.y + dy, 2.2 * (1 - progress), 0, Math.PI * 2);
//             ctx.fillStyle = `hsla(${(p.hue + k * 20) % 360},90%,60%,${0.9 * alpha})`;
//             ctx.fill();
//           }
//         }
//       }

//       // HUD (score)
//       ctx.font = "bold 18px Inter, system-ui, sans-serif";
//       ctx.fillStyle = "rgba(255,255,255,0.92)";
//       ctx.fillText(`Score: ${score}`, 18, 28);

//       // request next frame
//       rafRef.current = requestAnimationFrame(step);
//     }

//     // initialize spawn timer - allow immediate spawn
//     lastSpawnRef.current = performance.now() - spawnInterval;
//     rafRef.current = requestAnimationFrame(step);

//     return () => cancelAnimationFrame(rafRef.current);
//   }, [running, spawnInterval, score]); // note: score included so HUD updates

//   // Controls: start/pause/reset/spawn rate
//   const handleReset = () => {
//     bubblesRef.current = [];
//     popsRef.current = [];
//     setScore(0);
//   };

//   return (
//     <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", background: "#071130" }}>
//       <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

//       {/* Simple HUD controls */}
//       <div
//         style={{
//           position: "absolute",
//           right: 14,
//           top: 14,
//           display: "flex",
//           gap: 10,
//           alignItems: "center",
//           background: "rgba(6,10,24,0.45)",
//           padding: "8px 10px",
//           borderRadius: 12,
//           color: "#eef2ff",
//           boxShadow: "0 6px 22px rgba(3,7,18,0.6)",
//           backdropFilter: "blur(6px)",
//           zIndex: 10,
//         }}
//       >
//         <button
//           onClick={() => setRunning((r) => !r)}
//           style={{
//             padding: "8px 12px",
//             borderRadius: 8,
//             border: "none",
//             cursor: "pointer",
//             background: running ? "#ef4444" : "#10b981",
//             color: "white",
//             fontWeight: 700,
//           }}
//         >
//           {running ? "Pause" : "Start"}
//         </button>

//         <button
//           onClick={handleReset}
//           style={{
//             padding: "8px 12px",
//             borderRadius: 8,
//             border: "none",
//             cursor: "pointer",
//             background: "#3b82f6",
//             color: "white",
//             fontWeight: 700,
//           }}
//         >
//           Reset
//         </button>

//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <label style={{ fontSize: 13, opacity: 0.9 }}>Spawn</label>
//           <input
//             type="range"
//             min={220}
//             max={1400}
//             value={spawnInterval}
//             onChange={(e) => setSpawnInterval(Number(e.target.value))}
//             style={{ width: 120 }}
//           />
//         </div>
//       </div>

//       {/* Score big display bottom-left */}
//       <div
//         style={{
//           position: "absolute",
//           left: 18,
//           bottom: 18,
//           color: "white",
//           fontWeight: 800,
//           fontSize: 28,
//           textShadow: "0 6px 18px rgba(0,0,0,0.5)",
//           zIndex: 10,
//         }}
//       >
//         {score}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";

export default function RisingBubblesGame() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [spawnInterval, setSpawnInterval] = useState(700);
  const bubblesRef = useRef([]);
  const popsRef = useRef([]);
  const starsRef = useRef([]); // ⭐ background stars
  const scoreAnimRef = useRef(0);

  // Utility
  const rand = (min, max) => Math.random() * (max - min) + min;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // Load sound
  const popSoundRef = useRef(null);
  useEffect(() => {
    popSoundRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3"
    );
  }, []);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Spawn bubble
  const spawnBubble = (ctxWidth, ctxHeight) => {
    const radius = rand(16, 50);
    const x = rand(radius + 8, ctxWidth - radius - 8);
    const y = ctxHeight + radius + rand(0, 40);
    const speed = rand(30, 110);
    const hue = Math.floor(rand(180, 320));
    return { id: Math.random().toString(36).slice(2), x, y, radius, speed, hue, popped: false };
  };

  // Pop bubble
  const popBubble = (b) => {
    bubblesRef.current = bubblesRef.current.filter((bb) => bb.id !== b.id);
    popsRef.current.push({
      x: b.x,
      y: b.y,
      t: 0,
      duration: 420,
      hue: b.hue,
      maxR: b.radius * 2.2,
    });
    setScore((s) => s + 1);
    scoreAnimRef.current = 1; // trigger bounce animation
    if (popSoundRef.current) {
      popSoundRef.current.currentTime = 0;
      popSoundRef.current.play().catch(() => {});
    }
  };

  // Hit detection
  const handlePointer = (clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const hit = [...bubblesRef.current].reverse().find((b) => {
      const dx = x - b.x;
      const dy = y - b.y;
      return dx * dx + dy * dy <= b.radius * b.radius;
    });
    if (hit) popBubble(hit);
  };

  // Pointer handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    const onClick = (e) => handlePointer(e.clientX, e.clientY);
    const onTouch = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchstart", onTouch);
    };
  }, []);

  // Init stars ⭐
  useEffect(() => {
    const numStars = 60;
    starsRef.current = Array.from({ length: numStars }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(0.5, 2),
      speed: rand(5, 20),
    }));
  }, []);

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let last = performance.now();

    function step(ts) {
      const dt = (ts - last) / 1000;
      last = ts;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Spawn bubble
      if (running && ts - lastSpawnRef.current >= spawnInterval) {
        bubblesRef.current.push(spawnBubble(w, h));
        lastSpawnRef.current = ts;
      }

      // Update bubbles
      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const b = bubblesRef.current[i];
        b.y -= b.speed * dt;
        b.x += Math.sin((ts + i * 100) / 1500 + i) * 6 * dt;
        if (b.y + b.radius < 0 && !b.popped) {
          b.popped = true;
          popsRef.current.push({
            x: b.x,
            y: Math.max(0, b.y + b.radius),
            t: 0,
            duration: 300,
            hue: b.hue,
            maxR: b.radius * 1.6,
            scoreless: true,
          });
          bubblesRef.current.splice(i, 1);
        }
      }

      // Update pops
      for (let i = popsRef.current.length - 1; i >= 0; i--) {
        const p = popsRef.current[i];
        p.t += dt * 1000;
        if (p.t > p.duration) popsRef.current.splice(i, 1);
      }

      // Update stars
      for (const s of starsRef.current) {
        s.y += s.speed * dt * 0.3;
        if (s.y > h) {
          s.y = -2;
          s.x = rand(0, w);
        }
      }

      // Draw bg
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#050b20");
      bg.addColorStop(1, "#0a142a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Stars
      ctx.fillStyle = "white";
      for (const s of starsRef.current) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bubbles
      for (const b of bubblesRef.current) {
        ctx.beginPath();
        ctx.arc(b.x + 6, b.y + 10, b.radius * 0.98, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,10,24,0.3)";
        ctx.fill();

        const g = ctx.createRadialGradient(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.35,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );
        g.addColorStop(0, "rgba(255,255,255,0.9)");
        g.addColorStop(0.2, `hsla(${b.hue},70%,65%,0.8)`);
        g.addColorStop(1, `hsla(${b.hue},70%,45%,0.65)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.lineWidth = Math.max(1, b.radius * 0.04);
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.stroke();
      }

      // Pops
      for (const p of popsRef.current) {
        const progress = clamp(p.t / p.duration, 0, 1);
        const alpha = 1 - progress;
        const r = p.maxR * (0.6 + 0.8 * progress);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${p.hue},80%,65%,${0.9 * alpha})`;
        ctx.lineWidth = 3 + 6 * (1 - alpha);
        ctx.stroke();
      }

      // Score animation
      if (scoreAnimRef.current > 0) {
        scoreAnimRef.current -= dt * 2;
        if (scoreAnimRef.current < 0) scoreAnimRef.current = 0;
      }
      const scale = 1 + scoreAnimRef.current * 0.4;

      // HUD Score
      ctx.save();
      ctx.translate(40, h - 40);
      ctx.scale(scale, scale);
      ctx.font = "bold 32px Inter, sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.fillText(score, 0, 0);
      ctx.restore();

      rafRef.current = requestAnimationFrame(step);
    }

    lastSpawnRef.current = performance.now() - spawnInterval;
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, spawnInterval, score]);

  const handleReset = () => {
    bubblesRef.current = [];
    popsRef.current = [];
    setScore(0);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", background: "#050b20" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          right: 14,
          top: 14,
          display: "flex",
          gap: 10,
          alignItems: "center",
          background: "rgba(20,30,60,0.55)",
          padding: "8px 12px",
          borderRadius: 12,
          color: "#eef2ff",
          boxShadow: "0 0 18px rgba(0,255,200,0.4)",
          backdropFilter: "blur(6px)",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setRunning((r) => !r)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: running ? "#ef4444" : "#10b981",
            color: "white",
            fontWeight: 700,
            boxShadow: "0 0 10px rgba(255,255,255,0.4)",
          }}
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#3b82f6",
            color: "white",
            fontWeight: 700,
            boxShadow: "0 0 10px rgba(100,200,255,0.5)",
          }}
        >
          Reset
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 13, opacity: 0.9 }}>Spawn</label>
          <input
            type="range"
            min={220}
            max={1400}
            value={spawnInterval}
            onChange={(e) => setSpawnInterval(Number(e.target.value))}
            style={{ width: 120 }}
          />
        </div>
      </div>
    </div>
  );
}
