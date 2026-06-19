import Link from "next/link";
import { getAllCollections } from "@/lib/collections";
import ContactForm from "@/components/contact/ContactForm";

export default function HomePage() {
  const collections = getAllCollections();
  return (
    <>
      {/* ══ HERO ══ */}
      <section className="hero-section" style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 clamp(24px, 15.6vw, 225px)",
        background: "transparent",
        boxSizing: "border-box",
      }}>
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
            <Link href="#about" className="btn-outline">About the Archive</Link>
            <Link href="#archive" className="btn-filled">Enter the Archive</Link>
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

        <div className="scroll-indicator" style={{
          marginTop: "auto",
          paddingBottom: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 16, color: "#FFFFFF", margin: 0, opacity: 0.85 }}>
            Scroll to see collections
          </p>
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none" aria-hidden
            style={{ animation: "arrowBounce 1.8s ease-in-out infinite", opacity: 0.85 }}>
            <line x1="12" y1="0" x2="12" y2="26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="4,19 12,27 20,19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </section>

      {/* ══ ARCHIVE ══ */}
      <section id="archive" style={{
        padding: "clamp(80px, 8.3vw, 120px) clamp(24px, 15.6vw, 225px)",
        background: "transparent",
        scrollMarginTop: 100,
      }}>
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.16em", textTransform: "uppercase" as const,
          color: "#C9A84C", display: "block", marginBottom: 28,
        }}>
          The Archive
        </span>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontWeight: 700,
          fontSize: "clamp(40px, 5.3vw, 76px)", lineHeight: 1.05,
          letterSpacing: "-0.03em", color: "#FFFFFF",
          margin: "0 0 28px", maxWidth: 900,
        }}>
          Records that history did not preserve.
        </h2>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "clamp(16px, 1.25vw, 20px)",
          lineHeight: 1.75, color: "#FFFFFF", margin: "0 0 64px", maxWidth: 820,
        }}>
          Each collection in The Soil Archive documents a distinct episode of historical
          suppression. Primary sources, contextual scholarship, and immersive media are
          brought together to support research, teaching, and public memory.
        </p>

        <div className="archive-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {collections.map((col) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} style={{ textDecoration: "none", display: "flex" }}>
              <article className="archive-card" style={{
                background: "rgba(12, 10, 8, 0.62)",
                border: "1px solid rgba(201,168,76,0.13)",
                borderRadius: 4, padding: "32px 32px 28px",
                display: "flex", flexDirection: "column", width: "100%",
              }}>
                <div style={{ marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>
                    {col.number}
                  </span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.02em" }}>
                    {col.region} · {col.yearRange}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1, color: "#FFFFFF", margin: "0 0 14px" }}>
                  {col.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.7)", margin: 0, flex: 1 }}>
                  {col.description ?? col.subtitle}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#C9A84C", margin: "28px 0 0" }}>
                  Enter Collection →
                </p>
              </article>
            </Link>
          ))}

          <article style={{
            background: "rgba(12, 10, 8, 0.4)", border: "1px solid rgba(201,168,76,0.08)",
            borderRadius: 4, padding: "32px 32px 28px", display: "flex", flexDirection: "column",
          }}>
            <div style={{ marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>
                00{collections.length + 1}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>To Be Announced</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1, color: "rgba(255,255,255,0.4)", margin: "0 0 14px" }}>
              Next Collection
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,0.38)", margin: 0, flex: 1 }}>Coming Soon.</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(201,168,76,0.35)", margin: "28px 0 0" }}>Enter Collection →</p>
          </article>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{
        padding: "clamp(80px, 8vw, 120px) clamp(24px, 15.6vw, 225px)",
        background: "rgba(180,110,20,0.06)",
        scrollMarginTop: 100,
      }}>
        <div style={{ maxWidth: 860 }}>
          <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#C17D11", marginBottom: 20 }}>
            About the Archive
          </span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1.05, color: "#FFFFFF", margin: "0 0 40px" }}>
            A record against erasure.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.8, color: "#FFFFFF", margin: "0 0 24px" }}>
            The Soil Archive is a digital humanities initiative dedicated to the preservation, contextualization, and public accessibility of suppressed African historical records. It brings together primary documents, oral histories, archival materials, and immersive digital media to create publicly accessible collections that support scholarship, pedagogy, and civic engagement.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.8, color: "#FFFFFF", margin: "0 0 24px" }}>
            The archive operates at the intersection of digital humanities, postcolonial studies, African history, and environmental humanities. Each collection is developed through rigorous historical research, community consultation, and the integration of emerging technologies including AI-assisted voice synthesis, spatial audio, and immersive 3D environments.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.8, color: "#FFFFFF", margin: "0 0 48px" }}>
            The Soil Archive is committed to ensuring that the communities whose histories it documents are active participants in the production of knowledge, not merely subjects of it. Each collection is developed in consultation with relevant community members, scholars, and cultural custodians.
          </p>
          <div className="about-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "rgba(20,15,10,0.55)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: "32px 28px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "#C9A84C", margin: "0 0 16px" }}>Our Method</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.8, color: "#FFFFFF", margin: 0 }}>
                Each collection begins with archival research and community engagement. Primary sources are gathered, verified, and contextualized before any digital production begins. Immersive media is developed only after the historical record has been established with rigor and care.
              </p>
            </div>
            <div style={{ background: "rgba(20,15,10,0.55)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: "32px 28px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "#C9A84C", margin: "0 0 16px" }}>Our Commitment</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.8, color: "#FFFFFF", margin: 0 }}>
                The Soil Archive is a living platform. Collections are added as research is completed and community consent is secured. Every record published here has been handled with the dignity its subjects deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{
        padding: "clamp(80px, 8vw, 120px) clamp(24px, 15.6vw, 225px)",
        background: "transparent",
        scrollMarginTop: 100,
      }}>
        <div style={{ maxWidth: 860 }}>
          <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#C17D11", marginBottom: 20 }}>
            Get in Touch
          </span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: 1.1, color: "#FFFFFF", margin: "0 0 16px" }}>
            Contribute to the record.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: "0 0 48px", maxWidth: 520 }}>
            The Soil Archive welcomes contributions from researchers, archivists, community members, and institutions. If you hold primary materials or wish to propose a new collection, we want to hear from you.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{
        background: "#1C1C1A",
        padding: "28px clamp(24px, 15.6vw, 225px)",
        display: "flex", flexWrap: "wrap" as const,
        justifyContent: "space-between", alignItems: "center", gap: 12,
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()} The Soil Archive — Public archive. Not for commercial use.
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          African voices, recovered.
        </span>
      </footer>

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
          align-items: center; text-decoration: none; transition: background 0.2s;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.1); }
        .btn-filled {
          font-family: var(--font-body); font-weight: 400; font-size: 16px;
          color: #FFFFFF; background: #8B4513;
          border: 2px solid #8B4513; border-radius: 2px;
          padding: 0 20px; height: 48px; display: inline-flex;
          align-items: center; text-decoration: none; transition: background 0.2s;
        }
        .btn-filled:hover { background: #6B3410; border-color: #6B3410; }
        .archive-card { transition: border-color 0.2s, background 0.2s; }
        .archive-card:hover { border-color: rgba(201,168,76,0.32) !important; background: rgba(20,16,12,0.72) !important; }

        /* ── Tablet (≤900px) ── */
        @media (max-width: 900px) {
          #archive, #about, #contact {
            padding-left: 40px !important;
            padding-right: 40px !important;
          }
          footer { padding-left: 40px !important; padding-right: 40px !important; }
        }

        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 20px 48px !important;
            justify-content: center !important;
            height: 100svh !important;
          }
          .hero-content { padding-top: 0 !important; gap: 20px !important; }
          .hero-h1 { font-size: 44px !important; letter-spacing: -0.04em !important; }
          .scroll-indicator { display: none !important; }

          #archive {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 64px !important;
            padding-bottom: 64px !important;
          }
          #archive h2 { font-size: 30px !important; letter-spacing: -0.02em !important; }
          #archive > p { font-size: 16px !important; margin-bottom: 36px !important; }

          #about {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 64px !important;
            padding-bottom: 64px !important;
          }
          #about h2 { font-size: 34px !important; margin-bottom: 28px !important; }
          #about p { font-size: 16px !important; }

          #contact {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 64px !important;
            padding-bottom: 64px !important;
          }
          #contact h2 { font-size: 30px !important; }
          #contact > div > p { font-size: 16px !important; margin-bottom: 32px !important; }

          footer {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 24px !important;
            padding-bottom: 24px !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }

        /* ── Small mobile (≤480px) ── */
        @media (max-width: 480px) {
          .hero-h1 { font-size: 36px !important; }
          .hero-content { gap: 16px !important; }
          .btn-outline, .btn-filled { font-size: 14px !important; padding: 0 16px !important; height: 44px !important; }
        }

        /* ── Grid stacking ── */
        @media (max-width: 680px) {
          .archive-cards { grid-template-columns: 1fr !important; }
          .about-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
