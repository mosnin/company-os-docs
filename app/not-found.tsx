import Link from "next/link";
import { CompanyMark } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="not-found">
      <CompanyMark className="not-found__mark" />
      <p>404</p>
      <h1>This page is not in the ledger.</h1>
      <Link href="/">Return to the documentation</Link>
    </main>
  );
}
