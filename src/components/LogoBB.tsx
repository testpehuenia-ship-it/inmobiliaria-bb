export default function LogoBB() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
      {/* Top loop of B (Dark Grey) */}
      <path d="M 20 12 L 36 12 C 48 12, 48 30, 36 30 L 20 30" fill="transparent" stroke="#373f45" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spine of B (Dark Grey) */}
      <rect x="16" y="12" width="8" height="40" fill="#373f45" rx="3" />
      {/* Bottom loop as a house roof and walls (Green) */}
      <path d="M 16 34 L 34 20 L 52 34 L 52 52 L 20 52" fill="transparent" stroke="#789B85" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Inner square/window */}
      <path d="M 32 38 L 38 38 L 38 44 L 32 44 Z" fill="transparent" stroke="#373f45" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 32 41 L 38 41" stroke="#373f45" strokeWidth="2" />
      <path d="M 35 38 L 35 44" stroke="#373f45" strokeWidth="2" />
    </svg>
  );
}
