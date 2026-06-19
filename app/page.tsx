import Link from "next/link";
import { getAllCollections } from "@/lib/collections";

export default function HomePage() {
  const collections = getAllCollections();
  return (
    <>
      {/* ══ HERO ══ */}
      {/* Full viewport. Navbar is fixed at 100px. Content starts at y:188 (88px below navbar). */}
      <section className="hero-section" style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 clamp(24px, 15.6vw, 225px)",
        background: "transparent",
        boxSizing: "border-box",
      }}>

        {/* Content block — starts 88px below navbar (100 + 88 = 188px from top, per Figma) */}
        <div className="hero-content" style={{
          paddingTop: 188,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 989,
        }}>
          <h1 className="hero-h1" style={{
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

        {/* Scroll indicator — pinned to bottom centre, hidden on mobile */}
        <div className="scroll-indicator" style={{
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

      {/* ══ ARCHIVE SECTION ══ */}
      <section style={{
        padding: "clamp(80px, 8.3vw, 120px) clamp(24px, 15.6vw, 225px)",
        background: "transparent",
      }}>

        {/* Label */}
        <span style={{
          fontFamily: "var(--font-ui)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase" as const,
          color: "#C9A84C",
          display: "block",
          marginBottom: 28,
        }}>
          The Archive
        </span>

        {/* Heading */}
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "clamp(40px, 5.3vw, 76px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "#FFFFFF",
          margin: "0 0 28px",
          maxWidth: 900,
        }}>
          Records that history did not preserve.
        </h2>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(16px, 1.25vw, 20px)",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.82)",
          margin: "0 0 64px",
          maxWidth: 820,
        }}>
          Each collection in The Soil Archive documents a distinct episode of historical
          suppression. Primary sources, contextual scholarship, and immersive media are
          brought together to support research, teaching, and public memory.
        </p>

        {/* Collection cards */}
        <div className="archive-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Live collections */}
          {collections.map((col) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} style={{ textDecoration: "none", display: "flex" }}>
              <article style={{
                background: "rgba(12, 10, 8, 0.62)",
                border: "1px solid rgba(201,168,76,0.13)",
                borderRadius: 4,
                padding: "32px 32px 28px",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                transition: "border-color 0.2s, background 0.2s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.32)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(20, 16, 12, 0.72)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.13)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(12, 10, 8, 0.62)";
                }}
              >
                {/* Card top meta */}
                <div style={{ marginBottom: 18 }}>
                  <span style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: 6,
                  }}>
                    {col.number}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: "0.02em",
                  }}>
                    {col.region} · {col.yearRange}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3vw, 44px)",
                  lineHeight: 1.1,
                  color: "#FFFFFF",
                  margin: "0 0 14px",
                }}>
                  {col.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  flex: 1,
                }}>
                  {col.description ?? col.subtitle}
                </p>

                {/* CTA */}
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "#C9A84C",
                  margin: "28px 0 0",
                }}>
                  Enter Collection →
                </p>
              </article>
            </Link>
          ))}

          {/* Coming-soon placeholder card */}
          <article style={{
            background: "rgba(12, 10, 8, 0.4)",
            border: "1px solid rgba(201,168,76,0.08)",
            borderRadius: 4,
            padding: "32px 32px 28px",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ marginBottom: 18 }}>
              <span style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.1em",
                display: "block",
                marginBottom: 6,
              }}>
                00{collections.length + 1}
              </span>
              <span style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                color: "rgba(255,255,255,0.22)",
              }}>
                To Be Announced
              </span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 44px)",
              lineHeight: 1.1,
              color: "rgba(255,255,255,0.3)",
              margin: "0 0 14px",
            }}>
              Next Collection
            </h3>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "rgba(255,255,255,0.28)",
              margin: 0,
              flex: 1,
            }}>
              Coming Soon.
            </p>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "rgba(201,168,76,0.35)",
              margin: "28px 0 0",
            }}>
              Enter Collection →
            </p>
          </article>
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
        @media (max-width: 680px) {
          .archive-cards { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 20px 48px !important;
            justify-content: center !important;
            height: 100svh !important;
          }
          .hero-content { padding-top: 0 !important; }
          .hero-h1 { font-size: 44px !important; }
          .scroll-indicator { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-h1 { font-size: 38px !important; letter-spacing: -0.04em !important; }
          .hero-content { gap: 16px !important; }
        }
      `}</style>
    </>
  );
}
