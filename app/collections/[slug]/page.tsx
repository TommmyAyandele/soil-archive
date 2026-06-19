import { notFound } from "next/navigation";
import {
  getCollectionConfig,
  getCollectionOverview,
  getCollectionTimeline,
  getCollectionDocuments,
  getAllCollections,
} from "@/lib/collections";
import Timeline from "@/components/timeline/Timeline";
import ImmersiveCourtroom from "@/components/courtroom/ImmersiveCourtroom";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateStaticParams() {
  return getAllCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getCollectionConfig(slug);
  if (!config) return {};
  return {
    title: `${config.title} — The Soil Archive`,
    description: config.subtitle,
  };
}

const SECTION_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-ui)",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#C17D11",
  display: "block",
  marginBottom: 20,
};

const SECTION_HEADING: React.CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontWeight: 700,
  fontSize: "clamp(24px, 3.5vw, 40px)",
  lineHeight: 1.15,
  color: "#FFFFFF",
  margin: "0 0 28px",
};

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getCollectionConfig(slug);
  if (!config) notFound();

  const overview = getCollectionOverview(slug);
  const timeline = getCollectionTimeline(slug);
  const documents = getCollectionDocuments(slug);

  return (
    <div style={{ background: "transparent" }}>

      {/* ══ HERO ══ */}
      <section style={{
        background: "transparent",
        padding: "120px 24px 72px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Grain texture */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}/>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#C9A84C", margin: "0 0 20px" }}>
            Collection {config.number}
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading)", fontWeight: 900,
            fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.05,
            color: "#FFFFFF", margin: "0 0 16px",
          }}>
            {config.title}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 20, color: "#FFFFFF", margin: "0 0 32px", maxWidth: 580 }}>
            {config.subtitle}
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#FFFFFF" }}>{config.region}</span>
            <span style={{ color: "rgba(201,168,76,0.4)" }}>·</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#FFFFFF" }}>{config.yearRange}</span>
          </div>
        </div>
      </section>

      {/* ══ OVERVIEW ══ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 64 }} className="overview-grid">
          <div>
            <ScrollReveal>
              <span style={SECTION_LABEL}>— Overview &amp; Historical Context</span>
            </ScrollReveal>
            {overview && (
              <div
                className="prose-archive"
                style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.8, color: "#FFFFFF" }}
                dangerouslySetInnerHTML={{ __html: mdToHtml(overview.content) }}
              />
            )}
          </div>

          {/* Sidebar: the nine names */}
          <aside>
            <ScrollReveal>
              <div style={{
                background: "#1C1C1A", borderRadius: 8, padding: "28px 24px",
                position: "sticky", top: 80,
              }}>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#C9A84C", margin: "0 0 16px" }}>
                  The Nine
                </p>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: "#FFFFFF", margin: "0 0 18px", fontStyle: "italic" }}>
                  Executed 10 November 1995
                </p>
                {[
                  "Ken Saro-Wiwa",
                  "Saturday Dobee",
                  "Nordu Eawo",
                  "Daniel Gbooko",
                  "Paul Levura",
                  "Felix Nuate",
                  "Baribor Bera",
                  "Barinem Kiobel",
                  "John Kpuinen",
                ].map((name) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }}/>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, color: "#E3C87A", lineHeight: 1.3 }}>
                      {name}
                    </span>
                  </div>
                ))}

                {/* Language selector */}
                <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#FFFFFF", margin: "0 0 12px" }}>
                    Language
                  </p>
                  {["English", "Khana", "Igbo", "Hausa", "Yoruba"].map((lang, i) => (
                    <button key={lang} disabled={i > 0} style={{
                      display: "block", width: "100%", textAlign: "left" as const,
                      fontFamily: "var(--font-ui)", fontSize: 13,
                      color: i === 0 ? "#E3C87A" : "#FFFFFF",
                      background: "none", border: "none", padding: "4px 0",
                      cursor: i === 0 ? "default" : "not-allowed",
                      fontWeight: i === 0 ? 600 : 400,
                    }}>
                      {lang}{i > 0 && <span style={{ fontSize: 10, color: "#5A5248", marginLeft: 8 }}>— coming soon</span>}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      {/* ══ IMMERSIVE COURTROOM ══ */}
      <section style={{ background: "rgba(180,110,20,0.08)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span style={SECTION_LABEL}>— The Tribunal Room</span>
            <h2 style={SECTION_HEADING}>Immersive Courtroom Experience</h2>
            <p style={{
              fontFamily: "var(--font-body)", fontStyle: "italic",
              fontSize: 17, lineHeight: 1.75, color: "#FFFFFF", maxWidth: 600, margin: "0 0 40px",
            }}>
              Choose a position in the room. When the full experience is ready, both the visual rendering and the spatial audio will shift simultaneously to reflect your position — giving the physical sensation of moving through the tribunal space.
            </p>
          </ScrollReveal>
          <ImmersiveCourtroom />
        </div>
      </section>

      {/* ══ PRIMARY DOCUMENTS ══ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span style={SECTION_LABEL}>— Primary Documents</span>
            <h2 style={SECTION_HEADING}>Texts, Speeches &amp; Photographs</h2>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {documents.map((doc, i) => (
              <ScrollReveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                <article className="doc-article" style={{
                  background: doc.placeholder ? "rgba(255,255,255,0.4)" : "#FDFAF3",
                  border: `1px solid ${doc.placeholder ? "rgba(201,168,76,0.18)" : "rgba(201,168,76,0.35)"}`,
                  borderRadius: 8,
                  padding: "32px 36px",
                  position: "relative",
                  ...(doc.type === "photograph" ? {} : {}),
                }}>
                  {doc.placeholder && (
                    <span style={{
                      position: "absolute", top: 16, right: 16,
                      fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase" as const,
                      color: "#C9A84C", background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.25)", borderRadius: 3, padding: "3px 8px",
                    }}>
                      Placeholder
                    </span>
                  )}

                  <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" as const }}>
                    <span style={{
                      fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 700,
                      letterSpacing: "0.14em", textTransform: "uppercase" as const,
                      color: "#8B5A08", background: "rgba(193,125,17,0.1)",
                      border: "1px solid rgba(193,125,17,0.2)", borderRadius: 3, padding: "3px 8px",
                    }}>
                      {doc.type}
                    </span>
                    {doc.date && (
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#4A3520" }}>{doc.date}</span>
                    )}
                    {doc.author && (
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#2C1F10" }}>— {doc.author}</span>
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20,
                    color: "#1C1C1A", margin: "0 0 18px",
                  }}>
                    {doc.title}
                  </h3>

                  <div
                    className={doc.type === "photograph" ? "doc-reveal" : ""}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.82,
                      color: doc.placeholder ? "#9A8A6A" : "#2A2A28",
                      whiteSpace: "pre-wrap",
                      fontStyle: doc.type === "poem" ? "italic" : "normal",
                    }}
                  >
                    {doc.body}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section style={{ background: "rgba(180,110,20,0.08)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span style={SECTION_LABEL}>— Timeline</span>
            <h2 style={SECTION_HEADING}>Key Events, {config.yearRange}</h2>
          </ScrollReveal>
          {timeline.length > 0 ? (
            <Timeline entries={timeline} />
          ) : (
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "#FFFFFF" }}>
              Timeline coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ══ TEACHING RESOURCES ══ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span style={SECTION_LABEL}>— Teaching Resources</span>
            <h2 style={SECTION_HEADING}>For Educators &amp; Students</h2>
          </ScrollReveal>
          <div className="teaching-box" style={{
            background: "rgba(201,168,76,0.08)", border: "1px dashed rgba(201,168,76,0.3)",
            borderRadius: 8, padding: "40px 36px",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 17,
              color: "#FFFFFF", margin: "0 0 20px",
            }}>
              [PLACEHOLDER] Teaching resources for this collection are in preparation. This section will include:
            </p>
            <ul style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#FFFFFF", lineHeight: 2, margin: 0 }}>
              <li>Curriculum-aligned discussion guides</li>
              <li>Downloadable timeline posters</li>
              <li>Annotated primary source packets</li>
              <li>Video explainers on Ogoni history and MOSOP</li>
              <li>Glossary of key terms (Ogoni, Niger Delta, MOSOP, environmental justice)</li>
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        .overview-grid { }
        @media (max-width: 860px) {
          .overview-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .doc-article { padding: 20px 16px !important; }
          .teaching-box { padding: 24px 16px !important; }
        }
        .prose-archive h2 { font-family: var(--font-heading); font-size: 22px; color: #FFFFFF; margin: 40px 0 16px; }
        .prose-archive h3 { font-family: var(--font-heading); font-size: 18px; color: #FFFFFF; margin: 32px 0 12px; }
        .prose-archive p { margin: 0 0 22px; }
        .prose-archive strong { font-weight: 700; color: #FFFFFF; }
        .prose-archive em { font-style: italic; }
        .prose-archive ul, .prose-archive ol { padding-left: 24px; margin: 0 0 22px; }
        .prose-archive li { margin-bottom: 8px; }
        .prose-archive hr { border: none; border-top: 1px solid rgba(201,168,76,0.25); margin: 40px 0; }
        .prose-archive blockquote { border-left: 3px solid #C9A84C; margin: 0 0 22px; padding-left: 20px; font-style: italic; color: #FFFFFF; }
      `}</style>
    </div>
  );
}

/* Minimal MDX/Markdown → HTML for the overview prose content */
function mdToHtml(md: string): string {
  return md
    .replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#{1}\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^---$/gm, "<hr/>")
    .replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|o|b|h|e])/gm, "")
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("<h") || block.startsWith("<hr") || block.startsWith("<blockquote")) return block;
      return `<p>${block}</p>`;
    })
    .join("\n");
}
