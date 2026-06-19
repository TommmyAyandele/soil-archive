"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ padding: "48px 0" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: 28, color: "#FFFFFF", margin: "0 0 12px" }}>Received.</p>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.7)", margin: 0 }}>
          We will be in touch. Thank you for reaching out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
      <fieldset className="form-field">
        <legend>Name</legend>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
      </fieldset>
      <fieldset className="form-field">
        <legend>Email</legend>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email address" required />
      </fieldset>
      <fieldset className="form-field">
        <legend>Message</legend>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" rows={5} style={{ resize: "vertical" }} required />
      </fieldset>
      <button
        type="submit"
        style={{
          fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16,
          color: "#FFFFFF", background: "#8B4513",
          border: "none", borderRadius: 2, padding: "14px 0",
          width: "100%", cursor: "pointer", transition: "background 0.2s", marginTop: 4,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#6B3410")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#8B4513")}
      >
        Send Message
      </button>
    </form>
  );
}
