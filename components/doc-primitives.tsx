import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, ExternalIcon } from "@/components/icons";

export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="doc-section" id={id}>
      <h2>
        <a href={`#${id}`}>{title}</a>
      </h2>
      {children}
    </section>
  );
}

export function Callout({
  title,
  children,
  tone = "note",
}: {
  title: string;
  children: ReactNode;
  tone?: "note" | "warning" | "dark";
}) {
  return (
    <aside className={`callout callout--${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="steps">{children}</ol>;
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li>
      <div className="step-copy">
        <h3>{title}</h3>
        {children}
      </div>
    </li>
  );
}

export function SplitChoice({
  title,
  children,
  href,
  action,
  external = false,
}: {
  title: string;
  children: ReactNode;
  href: string;
  action: string;
  external?: boolean;
}) {
  const body = (
    <>
      <h3>{title}</h3>
      <div>{children}</div>
      <span className="choice-action">
        {action} {external ? <ExternalIcon /> : <ArrowIcon />}
      </span>
    </>
  );

  return external ? (
    <a className="split-choice" href={href} target="_blank" rel="noreferrer">{body}</a>
  ) : (
    <Link className="split-choice" href={href}>{body}</Link>
  );
}

export function ToolTable({
  rows,
}: {
  rows: Array<{ name: string; capability: string; purpose: string }>;
}) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>Capability</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td><code>{row.name}</code></td>
              <td><code>{row.capability}</code></td>
              <td>{row.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} target="_blank" rel="noreferrer">{children}</a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}
