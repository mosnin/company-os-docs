"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CompanyMark, CloseIcon, ExternalIcon, MenuIcon } from "@/components/icons";
import { DocsSearch } from "@/components/docs-search";
import { docHref, navigation } from "@/lib/docs";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>
        <Link className="brand" href="/" aria-label="Company OS documentation home">
          <CompanyMark className="brand__mark" />
          <span className="brand__name">Company OS</span>
          <span className="brand__divider" aria-hidden="true" />
          <span className="brand__docs">Docs</span>
        </Link>
        <div className="header-search">
          <DocsSearch />
        </div>
        <nav className="header-links" aria-label="Project links">
          <a href="https://www.companyos.sh" target="_blank" rel="noreferrer">
            Open app
          </a>
          <a href="https://github.com/mosnin/companyos" target="_blank" rel="noreferrer">
            GitHub <ExternalIcon />
          </a>
        </nav>
      </header>

      {menuOpen ? (
        <div className="mobile-nav-layer" role="presentation" onMouseDown={() => setMenuOpen(false)}>
          <aside
            className="mobile-nav"
            aria-label="Documentation navigation"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav__head">
              <Link className="brand brand--drawer" href="/" onClick={() => setMenuOpen(false)}>
                <CompanyMark className="brand__mark" />
                <span className="brand__name">Company OS</span>
                <span className="brand__docs">Docs</span>
              </Link>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
                <CloseIcon />
              </button>
            </div>
            <nav className="mobile-nav__links">
              {navigation.map((group) => (
                <section key={group.label}>
                  <h2>{group.label}</h2>
                  {group.items.map((item) => {
                    const href = docHref(item.slug);
                    const active = pathname === href || pathname === href.slice(0, -1);
                    return (
                      <Link
                        className={active ? "is-active" : undefined}
                        href={href}
                        key={item.slug || "overview"}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.navLabel}
                      </Link>
                    );
                  })}
                </section>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}
