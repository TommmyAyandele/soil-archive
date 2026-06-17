"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: "var(--font-ui)",
        background: scrolled
          ? "rgba(240,222,187,0.96)"
          : "rgba(251,246,236,0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: 18,
                color: "#1C1C1A",
                letterSpacing: "0.02em",
              }}
            >
              The Soil Archive
            </span>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 400,
                fontSize: 10,
                color: "#2C1F10",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              African Voices, Recovered
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: "flex", gap: 32, alignItems: "center" }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 500,
                fontSize: 14,
                color: pathname.startsWith(href) ? "#C17D11" : "#3A3A38",
                letterSpacing: "0.04em",
                textDecoration: "none",
                borderBottom: pathname.startsWith(href) ? "1px solid #C9A84C" : "1px solid transparent",
                paddingBottom: 2,
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/collections"
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 13,
              color: "#FBF6EC",
              background: "#1A3A1A",
              padding: "8px 18px",
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C17D11")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1A3A1A")}
          >
            View Archive
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          className="show-mobile"
        >
          <span style={{ fontSize: 22, color: "#1C1C1A" }}>{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "#F0DEBB",
            borderTop: "1px solid rgba(201,168,76,0.3)",
            padding: "16px 24px 24px",
          }}
        >
          {[...NAV_LINKS, { href: "/collections", label: "View Archive →" }].map(({ href, label }) => (
            <Link
              key={`${href}-${label}`}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "var(--font-ui)",
                fontWeight: 500,
                fontSize: 16,
                color: "#1C1C1A",
                padding: "12px 0",
                borderBottom: "1px solid rgba(193,125,17,0.15)",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
