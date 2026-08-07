import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="logo-wrap" aria-label="Todos Somos Joel">
      <span className="logo-mark">TSJ</span>
      {!compact && <span className="logo-copy"><strong>Todos Somos</strong><b>Joel</b></span>}
    </Link>
  );
}
