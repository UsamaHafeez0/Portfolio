import { site } from "../data/site";
import { projects } from "../data/projects";
import { posts } from "../data/posts";

export const dynamic = "force-static";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}/`,
      lastModified: now,
    })),
    ...(posts.length > 0 ? [{ url: `${site.url}/blog/`, lastModified: now }] : []),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
    })),
  ];
}
