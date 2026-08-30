import type { MetadataRoute } from "next";
import { docs, docHref } from "@/lib/docs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return docs.map((doc) => ({
    url: new URL(docHref(doc.slug), "https://docs.companyos.sh").toString(),
    changeFrequency: doc.slug === "" ? "weekly" : "monthly",
    priority: doc.slug === "" ? 1 : 0.7,
  }));
}
