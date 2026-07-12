import { projects } from "../../data/projects";
import { site } from "../../data/site";

export const metadata = {
  title: `Work — ${site.name}`,
  description: "All case studies.",
};

export default function WorkIndex() {
  return (
    <main>
      <div className="work-index">
        <h1>Work</h1>
        <p className="work-sub">Five products, built end-to-end.</p>
      </div>
      <section style={{ paddingBottom: 48 }}>
        {projects.map((p, i) => (
          <a
            key={p.slug}
            href={`/work/${p.slug}/`}
            className={`feature-row${i % 2 === 1 ? " flip" : ""}`}
          >
            <div className="feature-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover} alt={p.cardTitle} loading="lazy" />
            </div>
            <div className="feature-text">
              <span className="card-tag">{p.tag}</span>
              <h3>{p.cardTitle}</h3>
              <p>{p.oneLiner}</p>
              <span className="read-link">Read case study →</span>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
