"use client";

export interface HeroConfig {
  number: string;
  title: string;
  subtitle: string;
  region: string;
  yearRange: string;
  description: string;
  tags?: string[];
}

interface Props {
  heroConfig?: HeroConfig;
}

type Perspective = {
  id: string;
  label: string;
  position: string;
  description: string;
  /* Set to the YouTube video ID (e.g. "dQw4w9WgXcQ") when the recording is ready.
     Leave null to show the pending placeholder. */
  videoId: string | null;
};

const PERSPECTIVES: Perspective[] = [
  {
    id: "judge",
    label: "Judge's Bench",
    position: "Tribunal Bench — North Wall",
    description:
      "From the military tribunal judge's position. The accused stand before you. The weight of the state's authority is at your back.",
    videoId: null,
  },
  {
    id: "front",
    label: "Front Row",
    position: "Public Gallery — Row 1",
    description:
      "Behind the accused. You are close enough to see their faces. The tribunal's words land heavy in the air between you.",
    videoId: null,
  },
  {
    id: "back",
    label: "Back of Room",
    position: "Public Gallery — Rear",
    description:
      "From the rear of the gallery. The accused are small figures at the front. The room feels vast. Sound carries differently here.",
    videoId: null,
  },
  {
    id: "gallery",
    label: "Side Gallery",
    position: "Restricted Press Section",
    description:
      "Where international observers and press were permitted to sit, under restriction. A different angle on power.",
    videoId: null,
  },
];

function VideoSlot({ perspective }: { perspective: Perspective }) {
  if (perspective.videoId) {
    return (
      <div className="ic-video-wrap">
        <iframe
          className="ic-iframe"
          src={`https://www.youtube.com/embed/${perspective.videoId}?rel=0&modestbranding=1&color=white`}
          title={`${perspective.label} — tribunal perspective video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="ic-video-wrap ic-video-pending" aria-label={`Video for ${perspective.label} — pending`}>
      {/* Play button outline */}
      <div className="ic-play-btn" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
          <polygon points="5,3 18,10 5,17" fill="rgba(201,168,76,0.55)" />
        </svg>
      </div>
      <p className="ic-pending-label">Video coming soon</p>
    </div>
  );
}

export default function ImmersiveCourtroom({ heroConfig }: Props = {}) {
  const isHero = !!heroConfig;

  return (
    <div
      className={`ic-wrap${isHero ? " ic-hero" : ""}`}
      role="region"
      aria-label={
        isHero
          ? `${heroConfig!.title} — perspective video experience`
          : "Immersive tribunal perspective experience"
      }
    >
      {/* ── Left panel ── */}
      <div className="ic-left">
        {isHero ? (
          <>
            <p className="ic-eyebrow">Collection {heroConfig!.number}</p>
            <h1 className="ic-hero-title">{heroConfig!.title}</h1>
            <p className="ic-hero-subtitle">{heroConfig!.subtitle}</p>
            <p className="ic-hero-meta">
              {heroConfig!.region}
              <span aria-hidden="true"> · </span>
              {heroConfig!.yearRange}
            </p>
            <div className="ic-divider" aria-hidden="true" />
            <p className="ic-body">{heroConfig!.description}</p>
            {heroConfig!.tags && heroConfig!.tags.length > 0 && (
              <ul className="ic-tags" aria-label="Collection themes">
                {heroConfig!.tags.map((tag) => (
                  <li key={tag} className="ic-tag">{tag}</li>
                ))}
              </ul>
            )}
            <div className="ic-status" aria-label="Production status: video in production">
              <span className="ic-status-dot" aria-hidden="true" />
              <span className="ic-status-text">
                Perspective videos in production. Each view will be linked when available.
              </span>
            </div>
          </>
        ) : (
          <>
            <p className="ic-eyebrow" aria-hidden="true">Immersive Experience</p>
            <h3 className="ic-title">
              The Tribunal Room<br />
              Port Harcourt, 1995
            </h3>
            <p className="ic-body">
              Four video recordings document the 1995 Special Military Tribunal from distinct
              positions in the room — each reflecting how an individual&apos;s physical location
              shaped their encounter with the proceedings.
            </p>
            <p className="ic-body">
              Select a perspective to watch from that position. Videos will be linked as they
              become available.
            </p>
            <div className="ic-status" aria-label="Production status: video in production">
              <span className="ic-status-dot" aria-hidden="true" />
              <span className="ic-status-text">
                Perspective videos in production.
              </span>
            </div>
          </>
        )}
      </div>

      {/* ── Right: 2×2 perspective card grid ── */}
      <div className="ic-grid" role="list" aria-label="Tribunal room perspectives">
        {PERSPECTIVES.map((p) => (
          <div key={p.id} className="ic-card" role="listitem">
            {/* Video — top of card, edge-to-edge */}
            <VideoSlot perspective={p} />

            {/* Text — padded below */}
            <div className="ic-card-text">
              <p className="ic-card-position">{p.position}</p>
              <h4 className="ic-card-label">{p.label}</h4>
              <p className="ic-card-desc">{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* ── Base wrapper ── */
        .ic-wrap {
          display: flex;
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 8px;
          overflow: hidden;
        }

        /* ── Hero mode ── */
        .ic-hero {
          border: none;
          border-radius: 0;
          border-bottom: 1px solid rgba(201,168,76,0.15);
          min-height: 100svh;
          padding-top: 100px;
        }
        .ic-hero .ic-left {
          justify-content: center;
          padding: clamp(40px, 4vw, 64px) clamp(28px, 5vw, 72px);
          flex: 0 0 40%;
          gap: 16px;
        }

        /* ── Left panel ── */
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
        .ic-hero-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: clamp(32px, 3.8vw, 58px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0;
        }
        .ic-hero-subtitle {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(15px, 1.3vw, 19px);
          color: rgba(255,255,255,0.75);
          margin: 0;
          line-height: 1.5;
        }
        .ic-hero-meta {
          font-family: var(--font-ui);
          font-size: 12px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }
        .ic-divider {
          height: 1px;
          background: rgba(201,168,76,0.2);
          flex-shrink: 0;
        }
        .ic-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ic-tag {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C9A84C;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 3px;
          padding: 3px 8px;
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
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(201,168,76,0.07);
          border: 1px dashed rgba(201,168,76,0.28);
          border-radius: 4px;
          flex-shrink: 0;
        }
        .ic-status-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #C9A84C;
          flex-shrink: 0;
          opacity: 0.65;
          margin-top: 3px;
        }
        .ic-status-text {
          font-family: var(--font-ui);
          font-size: 11px;
          color: rgba(201,168,76,0.8);
          line-height: 1.6;
        }

        /* ── Card grid ── */
        .ic-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }
        .ic-card {
          background: rgba(20,15,10,0.65);
          border-bottom: 1px solid rgba(201,168,76,0.12);
          border-right: 1px solid rgba(201,168,76,0.12);
          display: flex;
          flex-direction: column;
          transition: background 0.2s;
          overflow: hidden;
        }
        .ic-card:hover { background: rgba(30,22,14,0.78); }

        /* Video slot */
        .ic-video-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: rgba(8,6,4,0.95);
          border-bottom: 1px solid rgba(201,168,76,0.1);
          overflow: hidden;
          flex-shrink: 0;
        }
        .ic-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .ic-video-pending {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .ic-play-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.3);
          background: rgba(201,168,76,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ic-pending-label {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.45);
          margin: 0;
        }

        /* Card text area */
        .ic-card-text {
          padding: 20px 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
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
          font-size: 17px;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.2;
        }
        .ic-card-desc {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,0.65);
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .ic-wrap { flex-direction: column; }
          .ic-left {
            flex: none;
            border-right: none;
            border-bottom: 1px solid rgba(201,168,76,0.15);
            padding: 32px 28px !important;
          }
          .ic-hero {
            min-height: auto;
          }
          .ic-status { margin-top: 8px; }
        }
        @media (max-width: 560px) {
          .ic-grid { grid-template-columns: 1fr !important; }
          .ic-left { padding: 28px 20px !important; }
          .ic-hero-title { font-size: 32px !important; }
          .ic-card-text { padding: 16px 18px 20px; }
        }
      `}</style>
    </div>
  );
}
