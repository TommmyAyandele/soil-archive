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
  /* Set to the YouTube video ID when the recording is ready. Null shows the pending state. */
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
          title={`${perspective.label} — tribunal perspective`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="ic-video-wrap" aria-label={`Recording for ${perspective.label} — forthcoming`}>
      <span className="ic-forthcoming" aria-hidden="true">— forthcoming —</span>
    </div>
  );
}

export default function ImmersiveCourtroom({ heroConfig }: Props = {}) {
  const isHero = !!heroConfig;

  return (
    <div
      className={`ic-wrap${isHero ? " ic-hero" : ""}`}
      role="region"
      aria-label={isHero ? `${heroConfig!.title} — perspective recordings` : "Tribunal perspective recordings"}
    >
      {/* ── Left: collection intro ── */}
      <div className="ic-left">
        {isHero ? (
          <>
            <p className="ic-eyebrow">Collection {heroConfig!.number}</p>
            <h1 className="ic-hero-title">{heroConfig!.title}</h1>
            <p className="ic-hero-subtitle">{heroConfig!.subtitle}</p>
            <p className="ic-hero-meta">
              {heroConfig!.region}<span aria-hidden="true"> · </span>{heroConfig!.yearRange}
            </p>
            <div className="ic-rule" aria-hidden="true" />
            <p className="ic-body">{heroConfig!.description}</p>
            {heroConfig!.tags && heroConfig!.tags.length > 0 && (
              <ul className="ic-tags" aria-label="Collection themes">
                {heroConfig!.tags.map((tag) => (
                  <li key={tag} className="ic-tag">{tag}</li>
                ))}
              </ul>
            )}
            <p className="ic-footnote">
              Recordings will be linked as they become available.
            </p>
          </>
        ) : (
          <>
            <p className="ic-eyebrow" aria-hidden="true">Perspectives</p>
            <h3 className="ic-hero-title" style={{ fontSize: "clamp(24px,2.5vw,36px)" }}>
              The Tribunal Room<br />Port Harcourt, 1995
            </h3>
            <div className="ic-rule" aria-hidden="true" />
            <p className="ic-body">
              Four recordings document the 1995 Special Military Tribunal from distinct positions —
              each reflecting how location in the room shaped one&apos;s encounter with the proceedings.
            </p>
            <p className="ic-footnote">
              Recordings will be linked as they become available.
            </p>
          </>
        )}
      </div>

      {/* ── Right: perspective cards ── */}
      <div className="ic-grid" role="list" aria-label="Tribunal room perspectives">
        {PERSPECTIVES.map((p) => (
          <article key={p.id} className="ic-card" role="listitem">
            <VideoSlot perspective={p} />
            <div className="ic-card-body">
              <p className="ic-card-position">{p.position}</p>
              <h4 className="ic-card-label">{p.label}</h4>
              <p className="ic-card-desc">{p.description}</p>
              <p className="ic-card-cta" aria-hidden={!p.videoId}>
                {p.videoId ? "Watch Recording →" : "Recording forthcoming."}
              </p>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        /* ─── Outer wrapper ─── */
        .ic-wrap {
          display: flex;
          border: 1px solid rgba(201,168,76,0.13);
          border-radius: 4px;
          overflow: hidden;
        }
        .ic-hero {
          border: none;
          border-radius: 0;
          border-bottom: 1px solid rgba(201,168,76,0.13);
          min-height: 100svh;
          padding-top: 100px;
        }

        /* ─── Left panel ─── */
        .ic-left {
          flex: 0 0 38%;
          padding: clamp(36px, 4vw, 60px) clamp(24px, 4vw, 56px);
          border-right: 1px solid rgba(201,168,76,0.13);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ic-hero .ic-left {
          flex: 0 0 40%;
          justify-content: center;
        }
        .ic-eyebrow {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #C9A84C;
          margin: 0;
        }
        .ic-hero-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: clamp(32px, 3.8vw, 56px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0;
        }
        .ic-hero-subtitle {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(15px, 1.3vw, 18px);
          color: rgba(255,255,255,0.75);
          margin: 0;
          line-height: 1.55;
        }
        .ic-hero-meta {
          font-family: var(--font-ui);
          font-size: 12px;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }
        .ic-rule {
          height: 1px;
          background: rgba(201,168,76,0.18);
          flex-shrink: 0;
        }
        .ic-body {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.75);
          margin: 0;
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
          color: rgba(201,168,76,0.7);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 2px;
          padding: 3px 7px;
        }
        .ic-footnote {
          font-family: var(--font-body);
          font-style: italic;
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          margin: 0;
          margin-top: auto;
        }

        /* ─── Card grid ─── */
        .ic-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          padding: 12px;
          align-content: stretch;
        }
        .ic-card {
          background: rgba(12,10,8,0.62);
          border: 1px solid rgba(201,168,76,0.13);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .ic-card:hover {
          border-color: rgba(201,168,76,0.28);
        }

        /* ─── Video slot ─── */
        .ic-video-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: rgba(8,6,4,0.9);
          border-bottom: 1px solid rgba(201,168,76,0.08);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 10px;
        }
        .ic-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .ic-forthcoming {
          font-family: var(--font-body);
          font-style: italic;
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.04em;
        }

        /* ─── Card text ─── */
        .ic-card-body {
          padding: 18px 20px 20px;
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
          color: rgba(255,255,255,0.5);
          margin: 0;
        }
        .ic-card-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(16px, 1.5vw, 20px);
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
          flex: 1;
        }
        .ic-card-cta {
          font-family: var(--font-body);
          font-size: 13px;
          color: rgba(201,168,76,0.5);
          margin: 8px 0 0;
        }

        /* ─── Responsive ─── */
        @media (max-width: 860px) {
          .ic-wrap { flex-direction: column; }
          .ic-left {
            flex: none;
            border-right: none;
            border-bottom: 1px solid rgba(201,168,76,0.13);
          }
          .ic-hero { min-height: auto; }
          .ic-hero .ic-left { justify-content: flex-start; }
          .ic-footnote { margin-top: 8px; }
        }
        @media (max-width: 540px) {
          .ic-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .ic-hero-title { font-size: 30px !important; }
        }
      `}</style>
    </div>
  );
}
