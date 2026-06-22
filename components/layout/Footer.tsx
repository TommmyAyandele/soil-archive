import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="kente-border"
      style={{
        background: "#1C1C1A",
        color: "rgba(255,255,255,0.7)",
        fontFamily: "var(--font-mono)",
        padding: "56px 24px 36px",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 22,
                color: "#F5E6C8",
                margin: "0 0 10px",
              }}
            >
              The Soil Archive
            </p>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 20px",
                maxWidth: 240,
              }}
            >
              A public digital archive housing suppressed African voices, histories, and justice stories.
            </p>
            {/* Adinkra Gye Nyame symbol (SVG) */}
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-label="Gye Nyame — Adinkra symbol of supremacy of God">
              <ellipse cx="20" cy="20" rx="10" ry="16" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
              <ellipse cx="20" cy="20" rx="16" ry="10" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="20" r="4" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
              <line x1="20" y1="4" x2="20" y2="36" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
              <line x1="4" y1="20" x2="36" y2="20" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
            </svg>
          </div>

          {/* Collections */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C17D11", margin: "0 0 16px" }}>
              Collections
            </p>
            <Link href="/collections/ogoni-nine" className="footer-link" style={{ display: "inline-block", fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 10, textDecoration: "none" }}>
              001 — The Ogoni Nine
            </Link>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontStyle: "italic", margin: 0 }}>
              More collections forthcoming
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C17D11", margin: "0 0 16px" }}>
              Navigate
            </p>
            {[
              { href: "/", label: "Home" },
              { href: "/#archive", label: "The Archive" },
              { href: "/about", label: "About the Archive" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="footer-link" style={{ display: "inline-block", fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 10, textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Mission note */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C17D11", margin: "0 0 16px" }}>
              A Note on the Archive
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
              This archive stands with the communities whose stories it holds. We are not neutral on injustice. Content is presented with care for accuracy and dignity.
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.15)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            © {new Date().getFullYear()} The Soil Archive. Public archive. Not for commercial use.
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, fontStyle: "italic" }}>
            The earth remembers what states try to erase.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kente-border { padding: 40px 20px 28px !important; }
          .kente-border .footer-grid { gap: 32px !important; margin-bottom: 32px !important; }
        }
        @media (max-width: 480px) {
          .kente-border { padding: 32px 16px 24px !important; }
        }
      `}</style>
    </footer>
  );
}
