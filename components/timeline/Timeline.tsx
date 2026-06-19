"use client";

import { useEffect, useRef } from "react";
import type { TimelineEntry } from "@/lib/collections";

interface Props {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Immediately show all entries
      containerRef.current?.querySelectorAll(".ink-entry").forEach((el) => {
        el.classList.add("visible");
      });
      return;
    }

    const els = containerRef.current?.querySelectorAll(".ink-entry");
    if (!els) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay || "0");
            setTimeout(() => el.classList.add("visible"), delay * 1000);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="timeline-wrap" style={{ position: "relative", paddingLeft: 0 }}>
      {/* Vertical line */}
      <div
        className="timeline-line"
        style={{
          position: "absolute",
          left: 80,
          top: 0,
          bottom: 0,
          width: 1,
          background: "linear-gradient(to bottom, transparent, #C9A84C 8%, #C17D11 50%, #C9A84C 92%, transparent)",
          zIndex: 0,
        }}
      />

      {entries.map((entry, i) => (
        <div
          key={i}
          className="ink-entry timeline-entry"
          data-delay={String(i * 0.06)}
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: "0 32px",
            marginBottom: 48,
            zIndex: 1,
          }}
        >
          {/* Year stamp */}
          <div style={{ paddingTop: 4, textAlign: "right", paddingRight: 24 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 13,
                color: "#C17D11",
                display: "block",
                letterSpacing: "0.04em",
              }}
            >
              {entry.year}
            </span>
            {/* Dot on the line */}
            <div
              className="timeline-dot"
              style={{
                position: "absolute",
                left: 74,
                top: 8,
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: "#F0DEBB",
                border: "2px solid #C9A84C",
                zIndex: 2,
              }}
            />
          </div>

          {/* Content */}
          <div
            className="timeline-card"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 6,
              padding: "18px 22px",
              backdropFilter: "blur(2px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 16,
                color: "#1C1C1A",
                margin: "0 0 8px",
                lineHeight: 1.3,
              }}
            >
              {entry.title}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.75,
                color: "#3A3A38",
                margin: 0,
              }}
            >
              {entry.body}
            </p>
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 520px) {
          .timeline-line { left: 48px !important; }
          .timeline-entry { grid-template-columns: 48px 1fr !important; gap: 0 12px !important; }
          .timeline-dot { left: 42px !important; }
          .timeline-card { padding: 14px 14px !important; }
        }
      `}</style>
    </div>
  );
}
