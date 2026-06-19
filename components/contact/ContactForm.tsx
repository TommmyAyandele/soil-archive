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
        <p style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#FFFFFF", margin: "0 0 12px" }}>Received.</p>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.65)", margin: 0 }}>
          We will be in touch. Thank you for reaching out.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form" noValidate aria-label="Contact form">
        <div className="cf-field">
          <label htmlFor="cf-name" className="cf-label">Name</label>
          <input
            id="cf-name"
            className="cf-input"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            required
            aria-required="true"
          />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-email" className="cf-label">Email</label>
          <input
            id="cf-email"
            className="cf-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email address"
            autoComplete="email"
            required
            aria-required="true"
          />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-message" className="cf-label">Message</label>
          <textarea
            id="cf-message"
            className="cf-input"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={5}
            required
            aria-required="true"
          />
        </div>
        <button type="submit" className="cf-submit">
          Send Message
        </button>
      </form>

      <style>{`
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 560px;
          width: 100%;
        }
        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cf-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .cf-input {
          width: 100%;
          background: rgba(12,10,8,0.82);
          border: 1px solid rgba(201,168,76,0.28);
          border-radius: 4px;
          padding: 14px 16px;
          font-family: var(--font-body);
          font-size: 16px;
          color: #FFFFFF;
          outline: none;
          transition: border-color 0.18s;
          box-sizing: border-box;
          resize: vertical;
        }
        .cf-input::placeholder {
          color: rgba(255,255,255,0.22);
        }
        .cf-input:focus {
          border-color: #C9A84C;
        }
        .cf-submit {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 16px;
          color: #FFFFFF;
          background: #8B4513;
          border: none;
          border-radius: 4px;
          padding: 16px;
          width: 100%;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 4px;
          letter-spacing: 0.02em;
        }
        .cf-submit:hover { background: #6B3410; }
        @media (max-width: 480px) {
          .contact-form { max-width: 100%; }
          .cf-input { font-size: 16px; padding: 13px 14px; }
          .cf-submit { padding: 15px; font-size: 15px; }
        }
      `}</style>
    </>
  );
}
