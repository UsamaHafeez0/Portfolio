import { projects, getProject } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  return { title: `${p.title} — Usama Hafeez`, description: p.oneLiner };
}

function sectionId(heading) {
  if (heading.toLowerCase() === "impact") return "impact";
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function TextSection({ s, id }) {
  return (
    <section id={id} className={`case-section${id === "impact" ? " impact" : ""}`}>
      <h2>{s.heading}</h2>
      {s.body ? <p>{s.body}</p> : null}
      {s.bullets?.length > 0 && (
        <ul className="impact-list">
          {s.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {s.images?.length > 1 && (
        <div className="shot-row" style={{ marginTop: 40 }}>
          {s.images.map((im) => (
            <figure className="shot" style={{ marginTop: 0 }} key={im.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt={im.caption || s.heading} loading="lazy" />
              {im.caption && <figcaption>{im.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

export default function CaseStudy({ params }) {
  const p = getProject(params.slug);
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];
  const hasImpact = p.sections.some((s) => s.heading.toLowerCase() === "impact");
  let rowCount = 0;

  return (
    <main className="case">
      <a href="/work/" className="back">
        ← All work
      </a>

      <header className="case-header">
        <h1>{p.title}</h1>
        <p className="one-liner">{p.oneLiner}</p>
        {hasImpact && (
          <a href="#impact" className="jump-impact">
            See the impact ↓
          </a>
        )}
      </header>

      <dl className="meta">
        {Object.entries(p.meta).map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>
              {typeof v === "object" && v.href ? (
                <a href={v.href} target="_blank" rel="noreferrer">
                  {v.label} ↗
                </a>
              ) : (
                v
              )}
            </dd>
          </div>
        ))}
      </dl>

      <aside className="tldr">
        <h2>TL;DR</h2>
        <ul>
          {p.tldr.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </aside>

      {p.capabilities?.length > 0 && (
        <section className="case-section">
          <h2>In the box</h2>
          <div className="chips">
            {p.capabilities.map((c) => {
              const label = typeof c === "string" ? c : c.label;
              const target = typeof c === "string" ? null : c.target;
              return target ? (
                <a key={label} href={`#${target}`} className="chip chip-link">
                  {label}
                </a>
              ) : (
                <span key={label} className="chip">
                  {label}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {p.sections.map((s) => {
        const id = sectionId(s.heading);
        if (s.images?.length === 1) {
          const flip = rowCount++ % 2 === 0;
          return (
            <section key={s.heading} id={id} className={`case-row${flip ? " flip" : ""}`}>
              <figure className={`case-row-media${s.images[0].phone ? " phone" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.images[0].src}
                  alt={s.images[0].caption || s.heading}
                  data-zoom={s.images[0].src}
                  loading="lazy"
                />
                {s.images[0].caption && <figcaption>{s.images[0].caption}</figcaption>}
              </figure>
              <div className="case-row-text">
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            </section>
          );
        }
        if (s.images?.length > 1) {
          const flip = rowCount++ % 2 === 0;
          return (
            <section
              key={s.heading}
              id={id}
              className={`case-row${flip ? " flip" : ""} gallery-row${s.phones ? " phones" : ""}`}
              data-gallery
              data-idx="0"
            >
              <div className="case-row-media">
                <div className="acc-band">
                  <div className="acc-gallery">
                    {s.images.map((im, i) => (
                      <div key={im.src} className={`acc-item${i === 0 ? " active" : ""}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={im.src}
                          data-full={im.src}
                          data-cap={im.caption || s.heading}
                          alt={im.caption || s.heading}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="band-controls">
                  <p className="gallery-caption">{s.images[0].caption}</p>
                  <div className="band-arrows">
                    <button className="arrow-btn gal-prev" type="button" aria-label="Previous screen">
                      ‹
                    </button>
                    <button className="arrow-btn gal-next" type="button" aria-label="Next screen">
                      ›
                    </button>
                  </div>
                </div>
              </div>
              <div className="case-row-text">
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            </section>
          );
        }
        return <TextSection key={s.heading} s={s} id={id} />;
      })}

      <nav className="case-nav">
        {prev ? <a href={`/work/${prev.slug}/`}>← {prev.cardTitle}</a> : <span />}
        {next ? <a href={`/work/${next.slug}/`}>{next.cardTitle} →</a> : <span />}
      </nav>
    </main>
  );
}
