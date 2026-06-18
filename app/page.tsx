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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px clamp(24px, 6vw, 96px) 48px",
        background: "transparent",
        position: "relative",
      }}>
        {/* Main content — vertically centred */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 860 }}>

          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(56px, 8.5vw, 110px)",
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            color: "#FFFFFF",
            margin: "0 0 32px",
          }}>
            These words were<br />never delivered.
          </h1>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 1.6vw, 20px)",
            lineHeight: 1.7,
            color: "#FFFFFF",
            margin: "0 0 40px",
            maxWidth: 640,
            opacity: 0.92,
          }}>
            The Soil Archive is a digital humanities platform dedicated to the preservation and public accessibility of suppressed African voices, testimonies, and historical records.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 16, marginBottom: 48 }}>
            <Link href="/about" style={{
              fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: 15,
              color: "#FFFFFF", background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.7)",
              padding: "13px 28px", textDecoration: "none",
              letterSpacing: "0.02em", display: "inline-block",
              transition: "background 0.2s",
            }}>
              Learn Our Mission
            </Link>
            <Link href="/collections" style={{
              fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 15,
              color: "#FFFFFF", background: "#8B4A1A",
              border: "1.5px solid #8B4A1A",
              padding: "13px 28px", textDecoration: "none",
              letterSpacing: "0.02em", display: "inline-block",
              transition: "background 0.2s",
            }}>
              Enter the Archive
            </Link>
          </div>

          {/* Monospace tagline */}
          <p style={{
            fontFamily: "ui-monospace, 'Courier New', monospace",
            fontSize: "clamp(13px, 1.2vw, 16px)",
            color: "#FFFFFF",
            opacity: 0.75,
            margin: 0,
            letterSpacing: "0.01em",
          }}>
            An ever-growing archive of recovered African voices.
          </p>
        </div>

        {/* Scroll indicator — bottom centre */}
        <div style={{ textAlign: "center", paddingTop: 32 }}>
          <p style={{
            fontFamily: "var(--font-ui)", fontSize: 13,
            color: "#FFFFFF", opacity: 0.6,
            margin: "0 0 10px", letterSpacing: "0.04em",
          }}>
            Scroll to see collections
          </p>
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden style={{ opacity: 0.6, animation: "arrowBounce 1.8s ease-in-out infinite" }}>
            <line x1="10" y1="0" x2="10" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="4,14 10,21 16,14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </>
  );
}
