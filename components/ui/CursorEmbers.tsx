"use client";

import { useEffect } from "react";

export default function CursorEmbers() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastX = 0, lastY = 0;

    const spawnEmber = (x: number, y: number) => {
      const ember = document.createElement("div");
      ember.className = "cursor-ember";
      const size = 6 + Math.random() * 8;
      const dx = (Math.random() - 0.5) * 20;
      const dy = -10 - Math.random() * 14;
      ember.style.cssText = `
        width:${size}px; height:${size}px;
        left:${x - size / 2}px; top:${y - size / 2}px;
        transform: translate(${dx}px,${dy}px);
        transition: transform 0.7s ease-out;
      `;
      document.body.appendChild(ember);
      setTimeout(() => ember.remove(), 750);
    };

    let lastSpawn = 0;
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 12 && now - lastSpawn > 35) {
        spawnEmber(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
        lastSpawn = now;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return null;
}
