"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Perspective = "judge" | "front" | "back" | "gallery";

interface PerspectiveConfig {
  id: Perspective;
  label: string;
  description: string;
  /* cx/cy: position on the top-down SVG diagram (0–100 scale) */
  cx: number;
  cy: number;
  /*
   * AUDIO PLACEHOLDER:
   * Replace audioSrc with the path to the spatially-mixed audio track
   * for this perspective. Each track is a separate recording mixed to
   * reflect the acoustic position in the room.
   *
   * e.g. audioSrc: "/audio/ogoni-nine/judge-perspective.mp3"
   */
  audioSrc: string | null;
}

const PERSPECTIVES: PerspectiveConfig[] = [
  {
    id: "judge",
    label: "Judge's Bench",
    description:
      "From the military tribunal judge's position. The accused stand before you. The weight of the state's authority is at your back.",
    cx: 50,
    cy: 18,
    /* AUDIO PLACEHOLDER — Judge's Bench spatial mix: */ audioSrc: null,
  },
  {
    id: "front",
    label: "Front Row",
    description:
      "Behind the accused. You are close enough to see their faces. The tribunal's words land heavy in the air between you.",
    cx: 50,
    cy: 55,
    /* AUDIO PLACEHOLDER — Front Row spatial mix: */ audioSrc: null,
  },
  {
    id: "back",
    label: "Back of Room",
    description:
      "From the rear of the gallery. The accused are small figures at the front. The room feels vast. Sound carries differently here.",
    cx: 50,
    cy: 85,
    /* AUDIO PLACEHOLDER — Back of Room spatial mix: */ audioSrc: null,
  },
  {
    id: "gallery",
    label: "Side Gallery",
    description:
      "From the side — where international observers and press were permitted to sit, under restriction. A different angle on power.",
    cx: 88,
    cy: 50,
    /* AUDIO PLACEHOLDER — Side Gallery spatial mix: */ audioSrc: null,
  },
];

export default function ImmersiveCourtroom() {
  const [active, setActive] = useState<Perspective>("front");
  const [transitioning, setTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const FADE_MS = 500;

  const activePerspective = PERSPECTIVES.find((p) => p.id === active)!;

  const switchPerspective = useCallback(
    (next: Perspective) => {
      if (next === active || transitioning) return;
      setTransitioning(true);

      /* Fade out current audio */
      if (audioRef.current) {
        const audio = audioRef.current;
        const startVol = audio.volume;
        const step = startVol / (FADE_MS / 16);
        const fade = setInterval(() => {
          if (audio.volume > step) audio.volume -= step;
          else {
            audio.volume = 0;
            audio.pause();
            clearInterval(fade);
          }
        }, 16);
      }

      /* Switch after half the fade duration */
      setTimeout(() => {
        setActive(next);
        const nextConfig = PERSPECTIVES.find((p) => p.id === next)!;

        if (nextConfig.audioSrc) {
          const audio = new Audio(nextConfig.audioSrc);
          audio.volume = 0;
          audio.loop = true;
          audio.play().catch(() => {
            /* Autoplay blocked — user must interact first */
          });
          /* Fade in */
          const step = 1 / (FADE_MS / 16);
          const fadeIn = setInterval(() => {
            if (audio.volume < 1 - step) audio.volume += step;
            else {
              audio.volume = 1;
              clearInterval(fadeIn);
            }
          }, 16);
          audioRef.current = audio;
        }

        setTimeout(() => setTransitioning(false), FADE_MS);
      }, FADE_MS / 2);
    },
    [active, transitioning]
  );

  /* Cleanup audio on unmount */
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <div
      style={{
        background: "rgba(26,58,26,0.04)",
        border: "1px solid rgba(193,125,17,0.25)",
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "var(--font-ui)",
      }}
    >
      {/* Header */}
      <div
        className="courtroom-header"
        style={{
          background: "#1C1C1A",
          padding: "18px 28px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 16,
              fontWeight: 700,
              color: "#E3C87A",
              margin: 0,
            }}
          >
            The Tribunal Room — Port Harcourt, 1995
          </p>
          <p style={{ fontSize: 12, color: "#6B6B68", margin: "4px 0 0", fontStyle: "italic" }}>
            Immersive experience — choose a position in the room
          </p>
        </div>
        {/* Status: placeholder notice */}
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#C9A84C",
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: 3,
            padding: "3px 8px",
            whiteSpace: "nowrap",
          }}
        >
          Placeholder
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 420,
        }}
        className="courtroom-grid"
      >
        {/* Left: top-down floor plan + perspective switcher */}
        <div
          style={{
            background: "#F0DEBB",
            borderRight: "1px solid rgba(193,125,17,0.2)",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8B5A08",
              margin: 0,
            }}
          >
            Choose your seat
          </p>

          {/* Top-down courtroom SVG floor plan */}
          <svg
            viewBox="0 0 200 220"
            style={{ width: "100%", maxWidth: 280, margin: "0 auto" }}
            aria-label="Top-down courtroom floor plan with four perspective positions"
          >
            {/* Room outline */}
            <rect x="10" y="10" width="180" height="200" rx="4" fill="#E8D5A8" stroke="#C9A84C" strokeWidth="1.5"/>

            {/* Judge's bench */}
            <rect x="60" y="22" width="80" height="22" rx="3" fill="#1A3A1A" opacity="0.85"/>
            <text x="100" y="36" textAnchor="middle" fontSize="7" fill="#E3C87A" fontFamily="var(--font-ui)">TRIBUNAL BENCH</text>

            {/* Dock / accused */}
            <rect x="70" y="58" width="60" height="18" rx="2" fill="#8B3A2F" opacity="0.7"/>
            <text x="100" y="71" textAnchor="middle" fontSize="6" fill="#F5E6C8" fontFamily="var(--font-ui)">THE ACCUSED</text>

            {/* Gallery rows */}
            <rect x="20" y="92" width="160" height="10" rx="2" fill="#C9A84C" opacity="0.25"/>
            <rect x="20" y="108" width="160" height="10" rx="2" fill="#C9A84C" opacity="0.2"/>
            <rect x="20" y="124" width="160" height="10" rx="2" fill="#C9A84C" opacity="0.15"/>
            <rect x="20" y="140" width="160" height="10" rx="2" fill="#C9A84C" opacity="0.12"/>
            <rect x="20" y="156" width="160" height="10" rx="2" fill="#C9A84C" opacity="0.1"/>
            <text x="100" y="186" textAnchor="middle" fontSize="7" fill="#6B6B68" fontFamily="var(--font-ui)">PUBLIC GALLERY</text>

            {/* Side wall (gallery right) */}
            <rect x="168" y="80" width="14" height="80" rx="2" fill="#C17D11" opacity="0.2"/>
            <text x="175" y="125" textAnchor="middle" fontSize="6" fill="#8B5A08" fontFamily="var(--font-ui)" transform="rotate(90,175,125)">SIDE GALLERY</text>

            {/* Perspective position dots */}
            {PERSPECTIVES.map((p) => {
              const cx = (p.cx / 100) * 180 + 10;
              const cy = (p.cy / 100) * 200 + 10;
              const isActive = active === p.id;
              return (
                <g
                  key={p.id}
                  onClick={() => switchPerspective(p.id)}
                  className={`perspective-dot${isActive ? " active" : ""}`}
                  aria-label={`Switch to ${p.label}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && switchPerspective(p.id)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? 9 : 7}
                    fill={isActive ? "#C9A84C" : "rgba(201,168,76,0.35)"}
                    stroke={isActive ? "#C9A84C" : "#8B5A08"}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  {isActive && (
                    <circle cx={cx} cy={cy} r={13} fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5">
                      <animate attributeName="r" from="9" to="16" dur="1.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <text
                    x={cx}
                    y={cy + (p.cy > 80 ? -14 : 20)}
                    textAnchor="middle"
                    fontSize="5.5"
                    fill={isActive ? "#8B5A08" : "#9A8A6A"}
                    fontFamily="var(--font-ui)"
                    fontWeight={isActive ? "700" : "400"}
                  >
                    {p.label.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Perspective list (text buttons) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PERSPECTIVES.map((p) => (
              <button
                key={p.id}
                onClick={() => switchPerspective(p.id)}
                style={{
                  background: active === p.id ? "#1A3A1A" : "transparent",
                  border: `1px solid ${active === p.id ? "#C9A84C" : "rgba(193,125,17,0.25)"}`,
                  borderRadius: 5,
                  padding: "8px 14px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  fontWeight: active === p.id ? 600 : 400,
                  color: active === p.id ? "#E3C87A" : "#3A3A38",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: visual / audio experience */}
        <div
          style={{
            background: "#1C1C1A",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grain overlay for cinematic feel */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />

          {/* Main visual placeholder */}
          <div
            style={{
              position: "relative",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 8,
              padding: "32px 24px",
              marginBottom: 20,
              textAlign: "center",
              transition: `opacity ${FADE_MS}ms`,
              opacity: transitioning ? 0.3 : 1,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Courtroom illustration placeholder */}
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none" style={{ marginBottom: 20, opacity: 0.5 }}>
              {/* Abstract courtroom from current perspective */}
              <rect x="5" y="5" width="110" height="80" rx="3" stroke="#C9A84C" strokeWidth="0.5" fill="none" strokeDasharray="3 3"/>
              {/* Floor vanishing lines */}
              <line x1="60" y1="30" x2="10" y2="85" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
              <line x1="60" y1="30" x2="110" y2="85" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
              <line x1="60" y1="30" x2="60" y2="85" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3"/>
              {/* Bench outline */}
              <rect x="35" y="8" width="50" height="14" rx="2" stroke="#8B3A2F" strokeWidth="0.8" fill="rgba(139,58,47,0.15)"/>
              {/* Figures */}
              <circle cx="60" cy="42" r="3" stroke="#F5E6C8" strokeWidth="0.8" fill="none"/>
              <line x1="60" y1="45" x2="60" y2="58" stroke="#F5E6C8" strokeWidth="0.8"/>
              <line x1="55" y1="50" x2="65" y2="50" stroke="#F5E6C8" strokeWidth="0.8"/>
            </svg>

            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: 14,
                color: "#C9A84C",
                margin: "0 0 10px",
              }}
            >
              {activePerspective.label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                lineHeight: 1.75,
                color: "#9A8A6A",
                margin: "0 0 20px",
                maxWidth: 280,
              }}
            >
              {activePerspective.description}
            </p>

            {/* What this will be */}
            <div
              style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px dashed rgba(201,168,76,0.25)",
                borderRadius: 6,
                padding: "12px 16px",
                maxWidth: 300,
              }}
            >
              <p style={{ fontSize: 11, color: "#6B6B68", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>
                <span style={{ color: "#C9A84C", fontStyle: "normal", fontWeight: 600 }}>Full experience:</span> A spatially rendered 3D view of the tribunal room from this position, paired with a binaural audio mix capturing the room&apos;s acoustics as they sounded from this seat. Visual and audio transition simultaneously when you change perspective.
              </p>
            </div>
          </div>

          {/* Audio status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 5,
            }}
          >
            {/* Waveform placeholder */}
            <svg width="48" height="20" viewBox="0 0 48 20" fill="none" aria-hidden>
              {[4, 10, 7, 14, 5, 17, 8, 12, 6, 9, 15, 4].map((h, i) => (
                <rect
                  key={i}
                  x={i * 4 + 0.5}
                  y={(20 - h) / 2}
                  width="3"
                  height={h}
                  rx="1.5"
                  fill="rgba(201,168,76,0.3)"
                />
              ))}
            </svg>
            <div>
              <p style={{ fontSize: 11, color: "#6B6B68", margin: 0, fontStyle: "italic" }}>
                {/* AUDIO PLACEHOLDER: replace this note with actual track name when audio assets are ready */}
                Audio placeholder — spatial mix for {activePerspective.label.toLowerCase()} not yet available
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .courtroom-grid { grid-template-columns: 1fr !important; }
          .courtroom-header { padding: 14px 16px !important; }
        }
      `}</style>
    </div>
  );
}
