"use client";

const LANGUAGES = ["English", "Khana", "Igbo", "Hausa", "Yoruba"];

export default function LanguageBar() {
  return (
    <div
      role="navigation"
      aria-label="Reading language selector"
      style={{
        marginTop: 100,
        height: 52,
        display: "flex",
        alignItems: "center",
        gap: 28,
        padding: "0 clamp(24px, 6vw, 120px)",
        background: "rgba(10,8,6,0.6)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)",
        flexShrink: 0,
      }}>
        Reading Language
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
        {LANGUAGES.map((lang, i) => (
          <button
            key={lang}
            disabled={i > 0}
            aria-pressed={i === 0 ? "true" : undefined}
            aria-disabled={i > 0 ? "true" : undefined}
            aria-label={i > 0 ? `${lang} — translation coming soon` : `${lang} — currently selected`}
            style={{
              background: "none",
              border: i === 0 ? "1px solid rgba(255,255,255,0.25)" : "1px solid transparent",
              borderRadius: 2,
              padding: "4px 12px",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: i === 0 ? "#FFFFFF" : "rgba(255,255,255,0.25)",
              cursor: i === 0 ? "default" : "not-allowed",
              fontWeight: i === 0 ? 600 : 400,
              transition: "color 0.15s",
            }}
          >
            {lang}
            {i > 0 && (
              <span aria-hidden="true" style={{ fontSize: 10, opacity: 0.6, marginLeft: 6 }}>
                ·
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
