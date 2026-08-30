import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { docHref, getAdjacentDocs, navigation, type DocPage } from "@/lib/docs";

type DocsShellProps = {
  doc: DocPage;
  children: ReactNode;
};

export function DocsShell({ doc, children }: DocsShellProps) {
  const adjacent = getAdjacentDocs(doc.slug);

  return (
    <div className="site-frame">
      <SiteHeader />
      <div className="docs-grid">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <nav>
            {navigation.map((group) => (
              <section className="nav-group" key={group.label}>
                <h2>{group.label}</h2>
                <div>
                  {group.items.map((item) => (
                    <Link
                      className={item.slug === doc.slug ? "is-active" : undefined}
                      href={docHref(item.slug)}
                      key={item.slug || "overview"}
                    >
                      {item.navLabel}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </nav>
          <div className="sidebar-foot">
            <span>Company OS docs</span>
            <span>Framework 0.6.0</span>
          </div>
        </aside>

        <main className="docs-main">
          <article className="doc-article">
            {children}
            <nav className="doc-pagination" aria-label="Previous and next pages">
              {adjacent.previous ? (
                <Link className="doc-pagination__previous" href={docHref(adjacent.previous.slug)}>
                  <span>Previous</span>
                  <strong>{adjacent.previous.title}</strong>
                </Link>
              ) : <span />}
              {adjacent.next ? (
                <Link className="doc-pagination__next" href={docHref(adjacent.next.slug)}>
                  <span>Next</span>
                  <strong>{adjacent.next.title}</strong>
                  <ArrowIcon />
                </Link>
              ) : null}
            </nav>
          </article>
        </main>

        <aside className="on-this-page" aria-label="On this page">
          <nav>
            <h2>On this page</h2>
            {doc.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.label}</a>
            ))}
          </nav>
          <a className="edit-link" href="https://github.com/mosnin/companyos" target="_blank" rel="noreferrer">
            Framework source
          </a>
        </aside>
      </div>
    </div>
  );
}
