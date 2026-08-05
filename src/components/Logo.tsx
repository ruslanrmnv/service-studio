/* Monogram: an R whose leg runs off into a stem and a leaf. The body takes
   currentColor, so it follows the text in both themes; stem and leaf are
   always the accent. Decorative — the wordmark sits next to it. */
export default function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 50 V16 H34 A9 9 0 0 1 34 32 H20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 32 C36 40 42 44 46 50"
        stroke="var(--c-accent)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M46 50 C46 42 48 36 53 31"
        stroke="var(--c-accent)"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}
