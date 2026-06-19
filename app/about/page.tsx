import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = { title: "About — The Soil Archive" };

export default function AboutPage() {
  return (
    <div style={{ background: "transparent" }}>
      <section className="kente-border" style={{ padding: "120px 24px 64px", background: "rgba(180,110,20,0.12)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#C17D11", marginBottom: 20 }}>
              About the Archive
            </span>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.1, color: "#FFFFFF", margin: "0 0 28px" }}>
              What is the Soil Archive?
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 19, lineHeight: 1.75, color: "rgba(255,255,255,0.85)", margin: 0 }}>
              The Soil Archive is a public digital archive platform designed to house multiple collections of suppressed African voices, histories, and justice stories. It is built to grow — each new collection added without rebuilding anything, every voice recovered and held with care.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {[
            {
              heading: "Why This Archive Exists",
              body: `History is made by those who control the record. States suppress inconvenient truths. Corporations bury accountability. Colonial structures were built, in part, to make African history illegible to Africans themselves.\n\nThis archive refuses that erasure. It is a space where the people who were silenced — the activists, the writers, the farmers, the mothers, the community leaders — can be found, heard, and learned from.\n\nThe first collection, The Ogoni Nine, begins with Nigeria in 1995. It will not be the last.`,
            },
            {
              heading: "Our Framing",
              body: `We are not neutral on injustice.\n\nThis archive is justice-oriented, postcolonial, and grounded in African political and environmental history. We stand with the communities whose stories we hold. Our framing does not pretend to a false objectivity that treats perpetrators and victims as equally positioned.\n\nThis does not mean we are careless with facts. Accuracy and dignity are non-negotiable. Every piece of content in this archive is labelled — verified historical record, archival document, or placeholder — so visitors always know what they are reading.`,
            },
            {
              heading: "How the Archive is Built to Grow",
              body: `Every design and technical decision in this platform is made to support adding new collections over time without rebuilding anything.\n\nAdding a new collection requires only creating a new folder in the content directory with an MDX overview file, a JSON timeline, a JSON documents list, and a config file. No changes to the codebase.\n\nSee the README for full instructions on how to contribute a collection.`,
            },
            {
              heading: "A Note on Placeholders",
              body: `Some content in the current collections is labelled [PLACEHOLDER]. This means the full content — a photograph, a document, a testimony — is being authenticated, rights-cleared, or prepared. We label placeholders clearly rather than fill gaps with speculation.\n\nWe will never fabricate quotes, invent details, or present unverified material as fact.`,
            },
          ].map((section, i) => (
            <ScrollReveal key={section.heading} delay={(i % 3) as 0 | 1 | 2}>
              <div style={{ marginBottom: 56 }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, color: "#FFFFFF", margin: "0 0 18px" }}>
                  {section.heading}
                </h2>
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", margin: "0 0 18px" }}>
                    {para}
                  </p>
                ))}
                <div style={{ height: 1, background: "rgba(201,168,76,0.2)", marginTop: 40 }}/>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
