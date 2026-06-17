export default function AdinkraSpinner({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className="adinkra-spinner"
      aria-label="Loading…"
    >
      {/* Simplified Gye Nyame / Nyame Dua inspired form */}
      <ellipse cx="20" cy="20" rx="10" ry="16" stroke="#C9A84C" strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="16" ry="10" stroke="#8B3A2F" strokeWidth="2" />
      <circle cx="20" cy="20" r="4" stroke="#1A3A1A" strokeWidth="2" />
    </svg>
  );
}
