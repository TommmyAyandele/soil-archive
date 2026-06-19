import Link from "next/link";
import { getAllCollections } from "@/lib/collections";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "All Collections — The Soil Archive",
};

export default function CollectionsIndexPage() {
  const collections = getAllCollections();

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Header */}
      <section className="kente-border" style={{ padding: "120px 24px 64px", background: "rgba(180,110,20,0.12)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span style={{
              display: "block", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#C17D11", marginBottom: 20,
            }}>
              The Archive
            </span>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h1 style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1,
              color: "#1C1C1A", margin: "0 0 20px",
            }}>
              All Collections
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p style={{
              fontFamily: "var(--font-body)", fontStyle: "italic",
              fontSize: 18, lineHeight: 1.7, color: "#2C1F10", maxWidth: 540, margin: 0,
            }}>
              Each collection is a recovered archive — a place where silenced voices, buried histories, and ongoing struggles for justice are held and made accessible.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Collection grid */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {collections.length === 0 ? (
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "#2C1F10" }}>
              No collections found. Add a collection to the <code>content/collections/</code> directory.
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
              {collections.map((col, i) => (
                <ScrollReveal key={col.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <Link href={`/collections/${col.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <article className="collection-card" style={{
                      background: "rgba(255,248,225,0.35)", border: "1px solid rgba(201,168,76,0.3)",
                      borderRadius: 8, overflow: "hidden",
                    }}>
                      <div style={{ height: 6, background: `linear-gradient(90deg, ${col.coverColor}, #C9A84C)` }}/>
                      <div style={{ padding: "30px 28px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                          <span style={{
                            fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700,
                            letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#C17D11",
                          }}>
                            {col.number}
                          </span>
                          <span style={{
                            fontFamily: "var(--font-ui)", fontSize: 11,
                            color: "#4A3520", letterSpacing: "0.04em",
                          }}>
                            {col.year}
                          </span>
                        </div>

                        <h2 style={{
                          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24,
                          color: "#1C1C1A", margin: "0 0 8px", lineHeight: 1.2,
                        }}>
                          {col.title}
                        </h2>
                        <p style={{
                          fontFamily: "var(--font-body)", fontStyle: "italic",
                          fontSize: 15, color: "#2C1F10", margin: "0 0 20px",
                        }}>
                          {col.subtitle}
                        </p>

                        <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#8B5A08", margin: "0 0 16px" }}>
                          {col.region}
                        </p>

                        {/* Tags */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                          {col.tags.slice(0, 3).map((tag) => (
                            <span key={tag} style={{
                              fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 500,
                              color: "#2C1F10", background: "rgba(201,168,76,0.12)",
                              border: "1px solid rgba(201,168,76,0.2)",
                              borderRadius: 3, padding: "3px 8px",
                              letterSpacing: "0.06em",
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span style={{
                          fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600,
                          color: "#8B3A2F", letterSpacing: "0.04em",
                        }}>
                          Open collection →
                        </span>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}

              {/* Coming soon placeholder */}
              <ScrollReveal delay={collections.length % 4 as 0 | 1 | 2 | 3}>
                <div style={{
                  background: "rgba(255,255,255,0.3)", border: "1px dashed rgba(201,168,76,0.3)",
                  borderRadius: 8, padding: "30px 28px", display: "flex",
                  flexDirection: "column", justifyContent: "center", minHeight: 240,
                }}>
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.22em", textTransform: "uppercase" as const,
                    color: "#C9A84C", display: "block", marginBottom: 16,
                  }}>
                    Coming
                  </span>
                  <p style={{
                    fontFamily: "var(--font-heading)", fontStyle: "italic",
                    fontSize: 18, color: "#4A3520", margin: 0,
                  }}>
                    More collections are being researched, authenticated, and prepared for publication.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
