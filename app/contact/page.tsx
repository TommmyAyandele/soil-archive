"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ background: "transparent" }}>
      <section className="kente-border" style={{ padding: "120px 24px 64px", background: "rgba(180,110,20,0.12)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#C17D11", marginBottom: 20 }}>
              Contact
            </span>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.1, color: "#FFFFFF", margin: "0 0 20px" }}>
              Get in Touch
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 18, lineHeight: 1.7, color: "#FFFFFF", maxWidth: 540, margin: 0 }}>
              Whether you have archival material to contribute, a correction to flag, a collaboration to propose, or a question about the collections — we want to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="contact-grid">

          {/* Form */}
          <ScrollReveal>
            {submitted ? (
              <div style={{
                padding: "48px 36px", background: "rgba(10,30,10,0.06)",
                border: "1px solid rgba(26,58,26,0.15)", borderRadius: 8, textAlign: "center",
              }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 20px" }}>
                  <circle cx="24" cy="24" r="22" stroke="#1A3A1A" strokeWidth="1.5"/>
                  <path d="M14 24l7 7 13-13" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, color: "#FFFFFF", margin: "0 0 10px" }}>Received.</h2>
                <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 16, color: "#FFFFFF", margin: 0 }}>
                  We will be in touch. Thank you for reaching out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <fieldset className="form-field">
                  <legend>Your name</legend>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="enter your name" required />
                </fieldset>

                <fieldset className="form-field">
                  <legend>Email address</legend>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="enter email address" required />
                </fieldset>

                <fieldset className="form-field">
                  <legend>Subject</legend>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="" disabled>select a subject</option>
                    <option value="contribution">Archival contribution or donation</option>
                    <option value="correction">Correction or factual concern</option>
                    <option value="collaboration">Collaboration or partnership</option>
                    <option value="press">Press enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </fieldset>

                <fieldset className="form-field">
                  <legend>Message</legend>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="describe your enquiry in as much detail as you can" rows={6} style={{ resize: "vertical" }}/>
                </fieldset>

                <button type="submit" style={{
                  fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 15,
                  color: "#FBF6EC", background: "#1A3A1A",
                  border: "none", borderRadius: 6, padding: "16px 0",
                  width: "100%", cursor: "pointer", transition: "background 0.2s", marginTop: 4,
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#C17D11")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#1A3A1A")}
                >
                  Send Message
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal delay={1}>
            <div>
              {[
                {
                  title: "Contributing to the Archive",
                  body: "If you have primary source materials — letters, photographs, testimonies, documents — relating to suppressed African histories, we want to hear from you. All contributions are authenticated before publication.",
                },
                {
                  title: "Corrections",
                  body: "We are committed to accuracy. If you identify a factual error, an attribution mistake, or content that misrepresents a community or individual, please contact us immediately. We will investigate and correct promptly.",
                },
                {
                  title: "Permissions",
                  body: "For permissions to reproduce archive content for educational or journalistic use, please write to us with the specific content and intended use.",
                },
              ].map((item) => (
                <div key={item.title} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "#FFFFFF", margin: "0 0 12px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.75, color: "#FFFFFF", margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        fieldset.form-field { border: 1px solid rgba(201,168,76,0.35); border-radius: 8px; padding: 2px 14px 14px; background: #FFFFFF; margin: 0; transition: border-color 0.18s; }
        fieldset.form-field:focus-within { border-color: #C17D11; }
        fieldset.form-field legend { font-family: var(--font-ui); font-weight: 400; font-size: 12px; color: #9A8A6A; padding: 0 4px; margin-left: -4px; line-height: 1; background: #FFFFFF; }
        fieldset.form-field input, fieldset.form-field textarea, fieldset.form-field select { width: 100%; border: none; outline: none; font-family: var(--font-body); font-size: 16px; color: #1C1C1A; background: transparent; padding: 0; resize: none; }
        fieldset.form-field select { cursor: pointer; }
        @media (max-width: 720px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
