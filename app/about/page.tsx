import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = { title: "About — The Soil Archive" };

export default function AboutPage() {
  return (
    <div style={{ background: "transparent" }}>
      <section style={{ padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#C17D11", marginBottom: 20 }}>
              About the Archive
            </span>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(40px, 5.5vw, 72px)", lineHeight: 1.05, color: "#FFFFFF", margin: "0 0 40px" }}>
              A record against erasure.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.8, color: "#FFFFFF", margin: "0 0 28px" }}>
              The Soil Archive is a digital humanities initiative dedicated to the preservation, contextualization, and public accessibility of suppressed African historical records. It brings together primary documents, oral histories, archival materials, and immersive digital media to create publicly accessible collections that support scholarship, pedagogy, and civic engagement.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.8, color: "#FFFFFF", margin: "0 0 28px" }}>
              The archive operates at the intersection of digital humanities, postcolonial studies, African history, and environmental humanities. Each collection is developed through rigorous historical research, community consultation, and the integration of emerging technologies including AI-assisted voice synthesis, spatial audio, and immersive 3D environments.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.8, color: "#FFFFFF", margin: 0 }}>
              The Soil Archive is committed to ensuring that the communities whose histories it documents are active participants in the production of knowledge, not merely subjects of it. Each collection is developed in consultation with relevant community members, scholars, and cultural custodians.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="about-cols">
          <ScrollReveal>
            <div style={{ background: "rgba(20,15,10,0.5)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: "36px 32px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "#C9A84C", margin: "0 0 18px" }}>
                Our Method
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.8, color: "#FFFFFF", margin: 0 }}>
                Each collection begins with archival research and community engagement. Primary sources are gathered, verified, and contextualized before any digital production begins. Immersive media is developed only after the historical record has been established with rigor and care.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div style={{ background: "rgba(20,15,10,0.5)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: "36px 32px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "#C9A84C", margin: "0 0 18px" }}>
                Our Commitment
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.8, color: "#FFFFFF", margin: 0 }}>
                The Soil Archive is a living platform. Collections are added as research is completed and community consent is secured. Every record published here has been handled with the dignity its subjects deserve.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .about-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
