import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ══ HERO ══ */}
      {/* Full viewport. Navbar is fixed at 100px. Content starts at y:188 (88px below navbar). */}
      <section style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 clamp(24px, 15.6vw, 225px)",
        background: "transparent",
        boxSizing: "border-box",
      }}>

        {/* Content block — starts 88px below navbar (100 + 88 = 188px from top, per Figma) */}
        <div style={{
          paddingTop: 188,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 989,
        }}>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(52px, 6.25vw, 90px)",
            lineHeight: 1,
            letterSpacing: "-0.06em",
            color: "#FFFFFF",
            margin: 0,
          }}>
            These words were<br />never delivered.
          </h1>

          <p style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "clamp(17px, 1.67vw, 24px)",
            lineHeight: 1.6,
            color: "#FFFFFF",
            margin: 0,
            maxWidth: 880,
          }}>
            The Soil Archive is a digital humanities platform dedicated to the preservation and
            public accessibility of suppressed African voices, testimonies, and historical records.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 24 }}>
            <Link href="/about" className="btn-outline">Learn Our Mission</Link>
            <Link href="/collections" className="btn-filled">Enter the Archive</Link>
          </div>

          <p style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.25vw, 24px)",
            color: "#FFFFFF",
            margin: 0,
            lineHeight: 1.5,
          }}>
            An ever-growing archive of recovered African voices.
          </p>
        </div>

        {/* Scroll indicator — pinned to bottom centre */}
        <div style={{
          marginTop: "auto",
          paddingBottom: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 16,
            color: "#FFFFFF",
            margin: 0,
            opacity: 0.85,
          }}>
            Scroll to see collections
          </p>
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none" aria-hidden
            style={{ animation: "arrowBounce 1.8s ease-in-out infinite", opacity: 0.85 }}>
            <line x1="12" y1="0" x2="12" y2="26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="4,19 12,27 20,19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </section>

      <style>{`
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
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
