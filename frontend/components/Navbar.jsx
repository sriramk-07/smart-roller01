import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Live Dashboard" },
  { href: "/demo", label: "Demo Mode" },
  { href: "/guidance", label: "Guidance" },
  { href: "/summary", label: "Summary" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="brand">
        <div className="brand-badge">🏋️</div>
        <span>SmartRoll</span>
      </Link>

      <div className="nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}