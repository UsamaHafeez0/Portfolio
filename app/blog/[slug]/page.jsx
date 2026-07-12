import { posts } from "../../../data/posts";
import { site } from "../../../data/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  return { title: `${p.title} — ${site.name}`, description: p.summary };
}

export default function Post({ params }) {
  const p = posts.find((x) => x.slug === params.slug);
  return (
    <main className="post">
      <a href="/blog/" className="back">
        ← Writing
      </a>
      <time dateTime={p.date}>
        {new Date(p.date + "T00:00:00").toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h1>{p.title}</h1>
      <div className="post-body">
        {p.body.map((block, i) => {
          if (typeof block === "object" && block.code)
            return (
              <pre key={i}>
                <code>{block.code}</code>
              </pre>
            );
          if (typeof block === "object" && block.list)
            return (
              <ul key={i}>
                {block.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>;
          if (block.startsWith("### ")) return <h3 key={i}>{block.slice(4)}</h3>;
          if (block.startsWith("> "))
            return <blockquote key={i}>{block.slice(2)}</blockquote>;
          return <p key={i}>{block}</p>;
        })}
      </div>
      {p.canonicalUrl && (
        <p className="canonical-note">
          Originally published on{" "}
          <a href={p.canonicalUrl} target="_blank" rel="noreferrer">
            {p.canonicalLabel || "Medium"}
          </a>
          .
        </p>
      )}
    </main>
  );
}
