import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ══ HERO ══ */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 120,
        padding: "100px clamp(24px, 15.6vw, 225px) 60px",
        background: "transparent",
        boxSizing: "border-box",
      }}>
        {/* Main content block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 989 }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(48px, 6.25vw, 90px)",
              lineHeight: 1.02,
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              margin: 0,
            }}>
              These words were<br />never delivered.
            </h1>

            <p style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "clamp(18px, 1.67vw, 24px)",
              lineHeight: 1.6,
              color: "#FFFFFF",
              margin: 0,
              maxWidth: 989,
            }}>
              The Soil Archive is a digital humanities platform dedicated to the preservation and public accessibility of suppressed African voices, testimonies, and historical records.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 24 }}>
              <Link href="/about" className="btn-outline">Learn Our Mission</Link>
              <Link href="/collections" className="btn-filled">Enter the Archive</Link>
            </div>
          </div>

          <p style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 400,
            fontSize: "clamp(16px, 1.67vw, 24px)",
            color: "#FFFFFF",
            margin: 0,
            lineHeight: 1.4,
          }}>
            An ever-growing archive of recovered African voices.
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 16, color: "#FFFFFF", margin: 0 }}>
            Scroll to see collections
          </p>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden style={{ animation: "arrowBounce 1.8s ease-in-out infinite" }}>
            <line x1="20" y1="6" x2="20" y2="34" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <polyline points="10,26 20,35 30,26" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </section>

      <style>{`
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }
        .btn-outline {
          font-family: var(--font-body); font-weight: 400; font-size: 16px;
          color: #FFFFFF; background: transparent;
          border: 2px solid #FFFFFF; border-radius: 2px;
          padding: 0 20px; height: 48px; display: inline-flex;
          align-items: center; text-decoration: none;
          transition: background 0.2s;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.1); color: #FFFFFF; }
        .btn-filled {
          font-family: var(--font-body); font-weight: 400; font-size: 16px;
          color: #F5E6C8; background: #8B4513;
          border: 2px solid #8B4513; border-radius: 2px;
          padding: 0 20px; height: 48px; display: inline-flex;
          align-items: center; text-decoration: none;
          transition: background 0.2s;
        }
        .btn-filled:hover { background: #6B3410; border-color: #6B3410; color: #F5E6C8; }
      `}</style>
    </>
  );
}
