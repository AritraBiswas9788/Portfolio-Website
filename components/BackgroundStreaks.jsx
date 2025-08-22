"use client";
import React, { useRef, useEffect } from "react";

const BackgroundStreaks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const streaks = [];
    const numStreaks = 40;

    // Circle target (your photo)
    const targetX = window.innerWidth - 300; // adjust based on layout
    const targetY = window.innerHeight / 2; // roughly center vertically

    for (let i = 0; i < numStreaks; i++) {
      streaks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        length: Math.random() * 20 + 10,
        color: "lime",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      streaks.forEach((s) => {
        // Move towards target
        const dx = targetX - s.x;
        const dy = targetY - s.y;
        s.vx += dx * 0.0005;
        s.vy += dy * 0.0005;

        s.x += s.vx;
        s.y += s.vy;

        // Trail effect
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * s.length, s.y - s.vy * s.length);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Wrap around edges
        if (s.x > canvas.width) s.x = 0;
        if (s.x < 0) s.x = canvas.width;
        if (s.y > canvas.height) s.y = 0;
        if (s.y < 0) s.y = canvas.height;
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default BackgroundStreaks;
