import Link from "next/link";
import { getAllCollections } from "@/lib/collections";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HomePage() {
  const collections = getAllCollections();
  const featured = collections.filter((c) => c.featured);

  return (
    <>
      {/* ══ HERO ══ */}
      <section style={{
        minHeight: "100vh",
        paddingTop: 100, /* navbar height */
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

          {/* Text + buttons group */}
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

            {/* Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 24 }}>
              <Link href="/about" className="btn-outline">
                Learn Our Mission
              </Link>
              <Link href="/collections" className="btn-filled">
                Enter the Archive
              </Link>
            </div>
          </div>

          {/* Space Mono tagline */}
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

        {/* Scroll indicator — centred */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 16,
            color: "#FFFFFF", margin: 0, textAlign: "center",
          }}>
            Scroll to see collections
          </p>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden style={{ animation: "arrowBounce 1.8s ease-in-out infinite" }}>
            <line x1="20" y1="6" x2="20" y2="34" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <polyline points="10,26 20,35 30,26" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </section>

      {/* ══ FEATURED COLLECTIONS ══ */}
      {featured.length > 0 && (
        <section className="kente-border" style={{ background: "transparent", padding: "80px 24px", backdropFilter: "blur(1px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <ScrollReveal>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#C17D11", marginBottom: 40,
              }}>
                — Featured Collection
              </p>
            </ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
              {featured.map((col, i) => (
                <ScrollReveal key={col.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <Link href={`/collections/${col.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <div className="collection-card" style={{
                      background: "#FBF6EC", border: "1px solid rgba(201,168,76,0.3)",
                      borderRadius: 8, overflow: "hidden", cursor: "pointer",
                    }}>
                      <div style={{ height: 6, background: `linear-gradient(90deg, ${col.coverColor}, #C9A84C)` }}/>
                      <div style={{ padding: "28px 26px" }}>
                        <span style={{
                          fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700,
                          letterSpacing: "0.2em", textTransform: "uppercase" as const,
                          color: "#C17D11", display: "block", marginBottom: 12,
                        }}>
                          Collection {col.number}
                        </span>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, color: "#1C1C1A", margin: "0 0 10px", lineHeight: 1.2 }}>
                          {col.title}
                        </h2>
                        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 15, color: "#2C1F10", margin: "0 0 20px" }}>
                          {col.subtitle}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                          <div>
                            <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#8B5A08", margin: 0 }}>{col.region}</p>
                            <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#4A3520", margin: "2px 0 0" }}>{col.yearRange}</p>
                          </div>
                          <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "#8B3A2F", letterSpacing: "0.04em" }}>
                            Open →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ MISSION STATEMENT ══ */}
      <section style={{ background: "rgba(12,10,8,0.86)", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}/>
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
          <ScrollReveal>
            <p style={{
              fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.2, color: "#E3C87A", margin: "0 0 36px",
            }}>
              &ldquo;The archive stands with the communities whose stories it holds. We are not neutral on injustice.&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.75, color: "#4A3520", margin: 0, maxWidth: 560 }}>
              History is not neutral. Neither is silence. This archive was built to make certain that the voices of those who were silenced by states, corporations, and colonial structures can be found, heard, and learned from — by anyone, anywhere.
            </p>
          </ScrollReveal>
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
