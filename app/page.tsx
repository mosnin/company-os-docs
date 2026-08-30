import { DocsContent } from "@/components/docs-content";
import { DocsShell } from "@/components/docs-shell";
import { getDoc } from "@/lib/docs";

export default function HomePage() {
  const doc = getDoc("");
  if (!doc) return null;
  return (
    <DocsShell doc={doc}>
      <DocsContent doc={doc} />
    </DocsShell>
  );
}
