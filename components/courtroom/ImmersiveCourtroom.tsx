"use client";

type Perspective = {
  id: string;
  label: string;
  position: string;
  description: string;
};

const PERSPECTIVES: Perspective[] = [
  {
    id: "judge",
    label: "Judge's Bench",
    position: "Tribunal Bench — North Wall",
    description:
      "From the military tribunal judge's position. The accused stand before you. The weight of the state's authority is at your back.",
  },
  {
    id: "front",
    label: "Front Row",
    position: "Public Gallery — Row 1",
    description:
      "Behind the accused. You are close enough to see their faces. The tribunal's words land heavy in the air between you.",
  },
  {
    id: "back",
    label: "Back of Room",
    position: "Public Gallery — Rear",
    description:
      "From the rear of the gallery. The accused are small figures at the front. The room feels vast. Sound carries differently here.",
  },
  {
    id: "gallery",
    label: "Side Gallery",
    position: "Restricted Press Section",
    description:
      "Where international observers and press were permitted to sit, under restriction. A different angle on power.",
  },
];

export default function ImmersiveCourtroom() {
  return (
    <div className="ic-wrap" role="region" aria-label="Immersive tribunal listening experience">
      {/* Left: context panel */}
      <div className="ic-left">
        <p className="ic-eyebrow" aria-hidden="true">Immersive Experience</p>
        <h3 className="ic-title">
          The Tribunal Room<br />
          Port Harcourt, 1995
        </h3>
        <p className="ic-body">
          Four spatial audio recordings will provide distinct listening experiences
          of the 1995 Special Military Tribunal proceedings, each reflecting how
          an individual&apos;s position in the room shaped their acoustic encounter
          with the exercise of state power.
        </p>
        <p className="ic-body">
          Select a position to hear the tribunal from that seat. Visual rendering
          and binaural audio will shift simultaneously to reflect the acoustic
          character of each location.
        </p>
        <div className="ic-status" aria-label="Production status: audio in production">
          <span className="ic-status-dot" aria-hidden="true" />
          <span className="ic-status-text">Audio in production. Visual rendering forthcoming.</span>
        </div>
      </div>

      {/* Right: 2×2 perspective card grid */}
      <div className="ic-grid" role="list" aria-label="Available listening perspectives">
        {PERSPECTIVES.map((p) => (
          <div key={p.id} className="ic-card" role="listitem">
            <p className="ic-card-position">{p.position}</p>
            <h4 className="ic-card-label">{p.label}</h4>
            <p className="ic-card-desc">{p.description}</p>
            <button
              type="button"
              disabled
              aria-disabled="true"
              aria-label={`Listen from the ${p.label} — audio not yet available`}
              className="ic-listen-btn"
            >
              Listen
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <line x1="0" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <polyline
                  points="7,1 12,5 7,9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .ic-wrap {
          display: flex;
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 8px;
          overflow: hidden;
        }
        .ic-left {
          flex: 0 0 38%;
          padding: 44px 36px;
          background: rgba(12,10,8,0.75);
          border-right: 1px solid rgba(201,168,76,0.15);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .ic-eyebrow {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C9A84C;
          margin: 0;
        }
        .ic-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 22px;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.3;
        }
        .ic-body {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.75);
          margin: 0;
        }
        .ic-status {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(201,168,76,0.07);
          border: 1px dashed rgba(201,168,76,0.28);
          border-radius: 4px;
        }
        .ic-status-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #C9A84C;
          flex-shrink: 0;
          opacity: 0.65;
        }
        .ic-status-text {
          font-family: var(--font-ui);
          font-size: 11px;
          color: rgba(201,168,76,0.8);
          line-height: 1.5;
        }
        .ic-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }
        .ic-card {
          padding: 32px 28px;
          background: rgba(20,15,10,0.65);
          border-bottom: 1px solid rgba(201,168,76,0.12);
          border-right: 1px solid rgba(201,168,76,0.12);
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 210px;
          transition: background 0.2s;
        }
        .ic-card:hover { background: rgba(30,22,14,0.78); }
        .ic-card-position {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C9A84C;
          margin: 0;
        }
        .ic-card-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 19px;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.2;
        }
        .ic-card-desc {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.75;
          color: rgba(255,255,255,0.70);
          margin: 0;
          flex: 1;
        }
        .ic-listen-btn {
          margin-top: 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.55);
          background: transparent;
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 3px;
          padding: 9px 16px;
          cursor: not-allowed;
          width: fit-content;
        }
        .ic-listen-btn:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 3px;
        }

        /* Tablet */
        @media (max-width: 860px) {
          .ic-wrap { flex-direction: column; }
          .ic-left {
            flex: none;
            border-right: none;
            border-bottom: 1px solid rgba(201,168,76,0.15);
            padding: 32px 28px;
          }
          .ic-status { margin-top: 4px; }
        }
        /* Mobile */
        @media (max-width: 560px) {
          .ic-grid { grid-template-columns: 1fr !important; }
          .ic-card { min-height: auto; padding: 24px 20px; }
          .ic-left { padding: 28px 20px; }
        }
      `}</style>
    </div>
  );
}
