import { posts } from "../../data/posts";
import { site } from "../../data/site";

export const metadata = {
  title: `Writing — ${site.name}`,
  description: "Notes on building products end-to-end.",
};

export default function Blog() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <main className="blog-index">
      <h1>Writing</h1>
      <p className="blog-sub">Notes on building products end-to-end.</p>
      {sorted.length === 0 ? (
        <p className="blog-sub" style={{ marginTop: 40 }}>
          First posts are on the way.
        </p>
      ) : (
        sorted.map((p) => (
          <a key={p.slug} href={`/blog/${p.slug}/`} className="post-item">
            <time dateTime={p.date}>
              {new Date(p.date + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
          </a>
        ))
      )}
    </main>
  );
}
