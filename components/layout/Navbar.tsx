"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header role="banner" aria-label="Site header" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(30, 30, 30, 0.17)",
      backdropFilter: "blur(2px)",
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 clamp(24px, 6vw, 120px)",
    }}>
      {/* Logo */}
      <Link href="/" aria-label="The Soil Archive — home" style={{ textDecoration: "none", maxWidth: 230, flexShrink: 1 }}>
        <div className="nav-logo-title" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 32, color: "#FFFFFF", lineHeight: 1.15 }}>
          The Soil Archive
        </div>
        <div className="nav-logo-sub" style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, marginTop: 2 }}>
          African History, Documented
        </div>
      </Link>

      {/* Desktop nav */}
      <nav role="navigation" aria-label="Primary navigation" style={{ display: "flex", alignItems: "center", gap: 64 }} className="nav-desktop">
        <div style={{ display: "flex", alignItems: "center", gap: 64 }}>
          <Link href="/#about" className="nav-link" style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 18, color: "#FFFFFF", textDecoration: "none" }}>
            About
          </Link>
          <Link href="/#contact" className="nav-link" style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 18, color: "#FFFFFF", textDecoration: "none" }}>
            Contact
          </Link>
        </div>
        <Link href="/#archive" className="btn-press" style={{
          fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 16,
          color: "#F5E6C8", background: "#8B4513",
          padding: "10px 20px", borderRadius: 2,
          textDecoration: "none", display: "inline-block",
          transition: "background 0.2s, transform 0.1s cubic-bezier(0.16,1,0.3,1)",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#6B3410")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#8B4513")}
        >
          View Archive
        </Link>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-menu"
        className="nav-mobile-btn"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
      >
        <span aria-hidden="true" style={{ fontSize: 24, color: "#FFFFFF" }}>{menuOpen ? "✕" : "☰"}</span>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-nav-menu"
          role="navigation"
          aria-label="Mobile navigation"
          style={{
            position: "absolute", top: 100, left: 0, right: 0,
            background: "rgba(20,16,12,0.97)",
            padding: "24px clamp(24px, 6vw, 120px) 32px",
          }}
        >
          {[
            { href: "/#about", label: "About" },
            { href: "/#contact", label: "Contact" },
            { href: "/#archive", label: "View Archive" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              display: "block", fontFamily: "var(--font-body)", fontWeight: 400,
              fontSize: 20, color: "#FFFFFF", padding: "14px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)", textDecoration: "none",
            }}>
              {label}
            </Link>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 680px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 681px) {
          .nav-mobile-btn { display: none !important; }
        }
        @media (max-width: 400px) {
          .nav-logo-title { font-size: 26px !important; }
          .nav-logo-sub { display: none; }
        }
      `}</style>
    </header>
  );
}
