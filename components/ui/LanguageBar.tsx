"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const LANG_LABELS: Record<string, string> = {
  english: "English",
  khana: "Khana",
  igbo: "Igbo",
  hausa: "Hausa",
  yoruba: "Yoruba",
};

interface Props {
  slug: string;
  currentLang: string;
  availableLangs: string[];
}

export default function LanguageBar({ slug, currentLang, availableLangs }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function switchLang(lang: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (lang === "english") {
      params.delete("lang");
    } else {
      params.set("lang", lang);
    }
    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname);
    });
  }

  const allLangs = ["english", "khana", "igbo", "hausa", "yoruba"];

  return (
    <>
      <div
        className="lang-bar"
        role="navigation"
        aria-label="Reading language selector"
        style={{
          marginTop: 100,
          minHeight: 52,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px 20px",
          padding: "10px clamp(20px, 6vw, 120px)",
          background: "rgba(10,8,6,0.6)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          opacity: isPending ? 0.7 : 1,
          transition: "opacity 0.15s",
        }}
      >
        <span
          className="lang-label"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            flexShrink: 0,
          }}
        >
          Reading Language
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
          {allLangs.map((lang) => {
            const isActive = lang === currentLang;
            const isAvailable = availableLangs.includes(lang);
            const label = LANG_LABELS[lang] ?? lang;

            return (
              <button
                key={lang}
                className={isAvailable && !isActive ? "btn-press" : ""}
                onClick={() => isAvailable && !isActive && switchLang(lang)}
                disabled={!isAvailable}
                aria-pressed={isActive}
                aria-disabled={!isAvailable}
                aria-label={
                  isActive
                    ? `${label} — currently selected`
                    : isAvailable
                    ? `Switch to ${label}`
                    : `${label} — translation coming soon`
                }
                style={{
                  background: isActive ? "rgba(139,69,19,0.35)" : "none",
                  border: isActive
                    ? "1px solid rgba(139,69,19,0.7)"
                    : isAvailable
                    ? "1px solid rgba(255,255,255,0.18)"
                    : "1px solid transparent",
                  borderRadius: 2,
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: isActive
                    ? "#FFFFFF"
                    : isAvailable
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(255,255,255,0.2)",
                  cursor: isActive ? "default" : isAvailable ? "pointer" : "not-allowed",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .lang-label { display: none; }
          .lang-bar { padding: 8px 20px !important; gap: 4px !important; }
        }
      `}</style>
    </>
  );
}
