import { projects } from "../data/projects";
import { experience, skills } from "../data/experience";
import { site } from "../data/site";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Usama Hafeez · Software Engineer</p>
        <h1>Products, built end-to-end.</h1>
        <p>
          I&apos;m Usama — an engineer who ships whole products. At Braid, I
          built the core banking dashboard used by US banks. Before that:
          consumer and operations apps used by hundreds of thousands of
          people.
        </p>
        <div className="hero-ctas">
          <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn">
            Book a call
          </a>
          <a href="#work" className="btn-ghost">
            View work ↓
          </a>
        </div>
      </section>

      <section className="section" id="work">
        <h2 className="section-label">Selected work</h2>
        {projects
          .filter((p) => p.featured)
          .map((p, i) => (
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

        <div className="marquee" aria-label="All projects">
          <div className="marquee-track">
            {[...projects, ...projects].map((p, i) => (
              <a key={`${p.slug}-${i}`} href={`/work/${p.slug}/`} className="mini-card">
                <div className="mini-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt={p.cardTitle} loading="lazy" />
                </div>
                <span className="mini-name">
                  {p.cardTitle} <span className="mini-tag">{p.tag}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="view-all-row">
          <a href="/work/" className="btn-ghost">
            View all work →
          </a>
        </div>
      </section>

      <section className="section" id="experience">
        <h2 className="section-label">Experience</h2>
        {experience.map((e) => (
          <div className="exp-row" key={e.company}>
            <div>
              <div className="exp-company">
                {e.company}
                {e.current && <span className="badge-current">Now</span>}
              </div>
              <div className="exp-role">{e.role}</div>
            </div>
            <p className="exp-note">{e.note}</p>
            {e.period && <span className="exp-period">{e.period}</span>}
          </div>
        ))}
      </section>

      <section className="section" id="about">
        <h2 className="section-label">About</h2>
        <p className="about-text">
          What I offer is end-to-end ownership: taking a product from
          architecture through launch, then running and improving it after. I
          work solo when a project needs one engineer and slot into a team
          when it doesn&apos;t. Most of that work has been in domains with low
          margin for error — banking, payments, live operations — where
          performance and reliability are part of the job.
        </p>
        <p className="about-text">Currently at Braid and Drops, across fintech and consumer.</p>
        <div className="skills">
          {skills.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
