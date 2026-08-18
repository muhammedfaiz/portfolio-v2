export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="7" fill="var(--color-bg)" />
      <defs>
        <linearGradient id="logo-g" x1="9" y1="7" x2="23" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7ecbff" />
          <stop offset="1" stopColor="var(--color-accent)" />
        </linearGradient>
      </defs>
      <path fill="url(#logo-g)" d="M9 7h12l2 2v3H14v2.5h6v5h-6V25H9z" />
    </svg>
  );
}
