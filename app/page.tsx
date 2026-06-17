import Link from "next/link";
import { getAllCollections } from "@/lib/collections";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HomePage() {
  const collections = getAllCollections();
  const featured = collections.filter((c) => c.featured);

  return (
    <>
      {/* ══ HERO ══ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: "transparent",
          padding: "80px 24px",
        }}
      >
        {/* Breathing Adinkra watermark */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <svg
            width="600" height="600" viewBox="0 0 200 200"
            style={{
              position: "absolute", right: "-80px", top: "50%",
              transform: "translateY(-50%)", opacity: 0.035,
              animation: "slowRotate 60s linear infinite",
            }}
          >
            <ellipse cx="100" cy="100" rx="50" ry="85" stroke="#C17D11" strokeWidth="2" fill="none"/>
            <ellipse cx="100" cy="100" rx="85" ry="50" stroke="#8B3A2F" strokeWidth="2" fill="none"/>
            <circle cx="100" cy="100" r="22" stroke="#1A3A1A" strokeWidth="2" fill="none"/>
            <circle cx="100" cy="100" r="60" stroke="#C9A84C" strokeWidth="1" fill="none" strokeDasharray="8 6"/>
          </svg>
          <div style={{
            position: "absolute", top: 0, left: "-10%", width: "40%", height: "100%",
            backgroundImage: "repeating-linear-gradient(135deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 2px, transparent 2px, transparent 20px)",
            pointerEvents: "none",
          }}/>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <span style={{
              display: "inline-block", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#C17D11",
              marginBottom: 28, borderBottom: "1px solid rgba(193,125,17,0.3)", paddingBottom: 6,
            }}>
              A Public Digital Archive
            </span>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h1 style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 1.05,
              letterSpacing: "-0.025em", color: "#1C1C1A", margin: "0 0 32px", maxWidth: 840,
            }}>
              The earth<br/>
              <em style={{ fontStyle: "italic", color: "#8B3A2F" }}>remembers</em><br/>
              what states try<br/>to erase.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p style={{
              fontFamily: "var(--font-body)", fontStyle: "italic",
              fontSize: "clamp(17px, 2vw, 22px)", lineHeight: 1.7, color: "#2C1F10",
              maxWidth: 560, margin: "0 0 44px",
            }}>
              The Soil Archive is a public digital archive housing suppressed African voices, histories, and justice stories. A living record of resistance and memory — not a museum, but a reckoning.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <Link href="/collections" style={{
                fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 14,
                color: "#FBF6EC", background: "#1A3A1A", padding: "14px 28px",
                borderRadius: 4, textDecoration: "none", letterSpacing: "0.06em", display: "inline-block",
              }}>
                Enter the Archive
              </Link>
              <Link href="/about" style={{
                fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: 14,
                color: "#1A1410", background: "transparent", padding: "13px 28px",
                borderRadius: 4, border: "1px solid rgba(28,28,26,0.25)",
                textDecoration: "none", letterSpacing: "0.04em", display: "inline-block",
              }}>
                About the Archive
              </Link>
            </div>
          </ScrollReveal>
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
        @keyframes slowRotate {
          from { transform: translateY(-50%) rotate(0deg); }
          to   { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </>
  );
}
