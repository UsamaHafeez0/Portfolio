// Generates a zero-build static HTML preview mirroring the Next.js pages.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "preview");

// load data modules (ESM import via tmp .mjs copies)
async function loadData(name) {
  const src = readFileSync(join(root, "data", `${name}.js`), "utf8");
  const tmp = `/tmp/${name}.mjs`;
  writeFileSync(tmp, src);
  return import(tmp);
}
const { projects } = await loadData("projects");
const { site } = await loadData("site");
const { experience, skills } = await loadData("experience");
const { posts } = await loadData("posts");

mkdirSync(join(out, "images", "covers"), { recursive: true });
copyFileSync(join(root, "app", "globals.css"), join(out, "style.css"));
const coversDir = join(root, "public", "images", "covers");
for (const f of readdirSync(coversDir)) {
  copyFileSync(join(coversDir, f), join(out, "images", "covers", f));
}
try {
  for (const f of readdirSync(join(root, "public", "images"))) {
    if (f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".webp")) {
      copyFileSync(join(root, "public", "images", f), join(out, "images", f));
    }
  }
} catch {}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// self-contained: inline CSS + images as data URIs so pages render styled
// even when a single HTML file is opened in isolation
const css = readFileSync(join(root, "app", "globals.css"), "utf8");
const mime = { svg: "image/svg+xml", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };
function dataUri(publicPath) {
  const rel = publicPath.replace(/^\//, ""); // e.g. images/covers/braid.svg
  const buf = readFileSync(join(root, "public", rel));
  const ext = rel.split(".").pop().toLowerCase();
  return `data:${mime[ext] || "application/octet-stream"};base64,${buf.toString("base64")}`;
}

const blogNav = `<a href="blog.html">Blog</a>\n    `;

const shell = (title, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(title)}</title>
<style>
${css}
</style>
</head>
<body>
<div class="container">
<nav class="nav">
  <a href="index.html" class="nav-name">${esc(site.name)}</a>
  <div class="nav-links">
    <a href="work.html">Work</a>
    <a href="index.html#experience" class="nav-dot">Experience</a>
    ${blogNav}<a href="${site.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
    <a href="${site.bookingUrl}" target="_blank" rel="noreferrer" class="btn-sm">Book a call</a>
  </div>
</nav>
${body}
<section class="cta-band">
  <div>
    <h2>Have a product to build?</h2>
    <p>15 minutes, no slides — let's talk about it.</p>
  </div>
  <div class="cta-actions">
    <a href="${site.bookingUrl}" target="_blank" rel="noreferrer" class="btn">Book a call</a>
    <span class="cta-alt">or email <a href="mailto:${site.email}">${esc(site.email)}</a></span>
  </div>
</section>
<footer class="footer">
  <p>© ${new Date().getFullYear()} ${esc(site.name)}</p>
  <div class="links">
    ${blogNav}<a href="${site.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
    <a href="mailto:${site.email}">${esc(site.email)}</a>
  </div>
</footer>
</div>
<script>
(function(){function openLB(srcs,caps,idx){var o=document.createElement('div');o.className='lightbox';var img=document.createElement('img');function show(i){idx=(i+srcs.length)%srcs.length;img.src=srcs[idx];img.alt=caps[idx]||'';}if(srcs.length>1){var p=document.createElement('button');p.className='lb-arrow lb-prev';p.innerHTML='&#8249;';p.onclick=function(ev){ev.stopPropagation();show(idx-1);};var n=document.createElement('button');n.className='lb-arrow lb-next';n.innerHTML='&#8250;';n.onclick=function(ev){ev.stopPropagation();show(idx+1);};o.appendChild(p);o.appendChild(n);}img.onclick=function(ev){ev.stopPropagation();if(srcs.length>1)show(idx+1);};function key(ev){if(ev.key==='Escape'){o.remove();document.removeEventListener('keydown',key);}else if(ev.key==='ArrowRight'){show(idx+1);}else if(ev.key==='ArrowLeft'){show(idx-1);}}o.onclick=function(){o.remove();document.removeEventListener('keydown',key);};o.appendChild(img);document.body.appendChild(o);show(idx);document.addEventListener('keydown',key);}
document.addEventListener('click',function(e){var g=e.target.closest('[data-gallery]');if(g){var slots=Array.prototype.slice.call(g.querySelectorAll('.acc-item'));var imgs=slots.map(function(it){return it.querySelector('img');});var master=imgs.map(function(t){return t.getAttribute('data-full');});var caps=imgs.map(function(t){return t.getAttribute('data-cap')||'';});var n=master.length;var cur=parseInt(g.getAttribute('data-idx')||'0',10);var strip=g.querySelector('.acc-gallery');var capEl=g.querySelector('.gallery-caption');var apply=function(){slots.forEach(function(it,j){var k=(cur+j)%n;var im=it.querySelector('img');im.src=master[k];im.alt=caps[k];});if(capEl)capEl.textContent=caps[cur];g.setAttribute('data-idx',cur);};var setIdx=function(i){cur=((i%n)+n)%n;if(strip){strip.classList.add('swap');setTimeout(function(){apply();strip.classList.remove('swap');},150);}else{apply();}};if(e.target.closest('.gal-prev')){setIdx(cur-1);return;}if(e.target.closest('.gal-next')){setIdx(cur+1);return;}var it=e.target.closest('.acc-item');if(it){var j=slots.indexOf(it);if(j===0){openLB(master,caps,cur);}else{setIdx(cur+j);}return;}}var z=e.target.closest('[data-zoom]');if(z){openLB([z.getAttribute('data-zoom')],[z.getAttribute('alt')||''],0);}});})();
</script>
</body>
</html>`;

// ---------- homepage ----------
const cards = projects
  .map(
    (p) => `  <a href="${p.slug}.html" class="card">
    <div class="card-media"><img src="${dataUri(p.cover)}" alt="${esc(p.cardTitle)}" loading="lazy"/></div>
    <div class="card-body">
      <div class="card-title">${esc(p.cardTitle)} <span class="card-tag">${esc(p.tag)}</span></div>
      <p class="card-desc">${esc(p.cardDesc)}</p>
    </div>
  </a>`
  )
  .join("\n");

const expRows = experience
  .map(
    (e) => `  <div class="exp-row">
    <div>
      <div class="exp-company">${esc(e.company)}${e.current ? '<span class="badge-current">Now</span>' : ""}</div>
      <div class="exp-role">${esc(e.role)}</div>
    </div>
    <p class="exp-note">${esc(e.note)}</p>
    ${e.period ? `<span class="exp-period">${esc(e.period)}</span>` : ""}
  </div>`
  )
  .join("\n");

const skillChips = skills.map((s) => `    <span class="chip">${esc(s)}</span>`).join("\n");

const featuredRows = projects
  .filter((p) => p.featured)
  .map(
    (p, i) => `  <a href="${p.slug}.html" class="feature-row${i % 2 === 1 ? " flip" : ""}">
    <div class="feature-media"><img src="${dataUri(p.cover)}" alt="${esc(p.cardTitle)}" loading="lazy"/></div>
    <div class="feature-text">
      <span class="card-tag">${esc(p.tag)}</span>
      <h3>${esc(p.cardTitle)}</h3>
      <p>${esc(p.oneLiner)}</p>
      <span class="read-link">Read case study →</span>
    </div>
  </a>`
  )
  .join("\n");

const marqueeItems = [...projects, ...projects]
  .map(
    (p, i) => `    <a href="${p.slug}.html" class="mini-card">
      <div class="mini-media"><img src="${dataUri(p.cover)}" alt="${esc(p.cardTitle)}" loading="lazy"/></div>
      <span class="mini-name">${esc(p.cardTitle)} <span class="mini-tag">${esc(p.tag)}</span></span>
    </a>`
  )
  .join("\n");

const home = `<main>
<section class="hero">
  <p class="eyebrow">Usama Hafeez · Software Engineer</p>
  <h1>Products, built end-to-end.</h1>
  <p>I'm Usama — an engineer who ships whole products. At Braid, I built the core banking dashboard used by US banks. Before that: consumer and operations apps used by hundreds of thousands of people.</p>
  <div class="hero-ctas">
    <a href="${site.bookingUrl}" target="_blank" rel="noreferrer" class="btn">Book a call</a>
    <a href="#work" class="btn-ghost">View work ↓</a>
  </div>
</section>
<section class="section" id="work">
  <h2 class="section-label">Selected work</h2>
${featuredRows}
  <div class="marquee" aria-label="All projects">
    <div class="marquee-track">
${marqueeItems}
    </div>
  </div>
  <div class="view-all-row"><a href="work.html" class="btn-ghost">View all work →</a></div>
</section>
<section class="section" id="experience">
  <h2 class="section-label">Experience</h2>
${expRows}
</section>
<section class="section" id="about">
  <h2 class="section-label">About</h2>
  <p class="about-text">What I offer is end-to-end ownership: taking a product from architecture through launch, then running and improving it after. I work solo when a project needs one engineer and slot into a team when it doesn't. Most of that work has been in domains with low margin for error — banking, payments, live operations — where performance and reliability are part of the job.</p>
  <p class="about-text">Currently at Braid and Drops, across fintech and consumer.</p>
  <div class="skills">
${skillChips}
  </div>
</section>
</main>`;

writeFileSync(join(out, "index.html"), shell(site.title, home));

// ---------- work index ----------
const allRows = projects
  .map(
    (p, i) => `  <a href="${p.slug}.html" class="feature-row${i % 2 === 1 ? " flip" : ""}">
    <div class="feature-media"><img src="${dataUri(p.cover)}" alt="${esc(p.cardTitle)}" loading="lazy"/></div>
    <div class="feature-text">
      <span class="card-tag">${esc(p.tag)}</span>
      <h3>${esc(p.cardTitle)}</h3>
      <p>${esc(p.oneLiner)}</p>
      <span class="read-link">Read case study →</span>
    </div>
  </a>`
  )
  .join("\n");
writeFileSync(
  join(out, "work.html"),
  shell(
    `Work — ${site.name}`,
    `<main>\n<div class="work-index"><h1>Work</h1><p class="work-sub">Five products, built end-to-end.</p></div>\n<section style="padding-bottom:48px">\n${allRows}\n</section>\n</main>`
  )
);

// ---------- blog ----------
{
  const items = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(
      (p) => `  <a href="blog-${p.slug}.html" class="post-item">
    <time datetime="${p.date}">${new Date(p.date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
    <h2>${esc(p.title)}</h2>
    <p>${esc(p.summary)}</p>
  </a>`
    )
    .join("\n");
  const blogBody =
    posts.length === 0
      ? `<p class="blog-sub" style="margin-top:40px">First posts are on the way.</p>`
      : items;
  writeFileSync(
    join(out, "blog.html"),
    shell(`Writing — ${site.name}`, `<main class="blog-index">\n<h1>Writing</h1>\n<p class="blog-sub">Notes on building products end-to-end.</p>\n${blogBody}\n</main>`)
  );
  for (const p of posts) {
    const body = p.body
      .map((b) => {
        if (typeof b === "object" && b.code) return `<pre><code>${esc(b.code)}</code></pre>`;
        if (typeof b === "object" && b.list)
          return `<ul>${b.list.map((li) => `<li>${esc(li)}</li>`).join("")}</ul>`;
        if (b.startsWith("## ")) return `<h2>${esc(b.slice(3))}</h2>`;
        if (b.startsWith("### ")) return `<h3>${esc(b.slice(4))}</h3>`;
        if (b.startsWith("> ")) return `<blockquote>${esc(b.slice(2))}</blockquote>`;
        return `<p>${esc(b)}</p>`;
      })
      .join("\n");
    const canonical = p.canonicalUrl
      ? `<p class="canonical-note">Originally published on <a href="${p.canonicalUrl}" target="_blank" rel="noreferrer">${esc(p.canonicalLabel || "Medium")}</a>.</p>`
      : "";
    writeFileSync(
      join(out, `blog-${p.slug}.html`),
      shell(
        `${p.title} — ${site.name}`,
        `<main class="post">\n<a href="blog.html" class="back">← Writing</a>\n<time datetime="${p.date}">${new Date(p.date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>\n<h1>${esc(p.title)}</h1>\n<div class="post-body">\n${body}\n</div>\n${canonical}\n</main>`
      )
    );
  }
}

// ---------- case pages ----------
projects.forEach((p, idx) => {
  const prev = projects[idx - 1];
  const next = projects[idx + 1];
  const meta = Object.entries(p.meta)
    .map(([k, v]) => {
      const val =
        typeof v === "object" && v.href
          ? `<a href="${v.href}" target="_blank" rel="noreferrer">${esc(v.label)} ↗</a>`
          : esc(v);
      return `    <div><dt>${esc(k)}</dt><dd>${val}</dd></div>`;
    })
    .join("\n");
  const tldr = p.tldr.map((t) => `      <li>${esc(t)}</li>`).join("\n");
  const chips = (p.capabilities || [])
    .map((c) => {
      const label = typeof c === "string" ? c : c.label;
      const target = typeof c === "string" ? null : c.target;
      return target
        ? `      <a href="#${target}" class="chip chip-link">${esc(label)}</a>`
        : `      <span class="chip">${esc(label)}</span>`;
    })
    .join("\n");
  const slugId = (h) =>
    h.toLowerCase() === "impact"
      ? "impact"
      : h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const hasImpact = p.sections.some((s) => s.heading.toLowerCase() === "impact");
  let rowCount = 0;
  const sections = p.sections
    .map((s) => {
      const id = ` id="${slugId(s.heading)}"`;
      if (s.images?.length >= 1) {
        const flip = rowCount++ % 2 === 0;
        let media;
        if (s.images.length === 1) {
          const im = s.images[0];
          const uri = dataUri(im.src);
          media = `<figure class="case-row-media${im.phone ? " phone" : ""}"><img src="${uri}" data-zoom="${uri}" alt="${esc(im.caption || s.heading)}" loading="lazy"/>${im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ""}</figure>`;
          return `<section${id} class="case-row${flip ? " flip" : ""}">
  ${media}
  <div class="case-row-text"><h2>${esc(s.heading)}</h2><p>${esc(s.body)}</p></div>
</section>`;
        }
        const uris = s.images.map((im) => dataUri(im.src));
        const items = s.images
          .map(
            (im, i) =>
              `<div class="acc-item${i === 0 ? " active" : ""}"><img src="${uris[i]}" data-full="${uris[i]}" data-cap="${esc(im.caption || s.heading)}" alt="${esc(im.caption || s.heading)}" loading="lazy"/></div>`
          )
          .join("");
        return `<section${id} class="case-row${flip ? " flip" : ""} gallery-row${s.phones ? " phones" : ""}" data-gallery data-idx="0">
  <div class="case-row-media">
    <div class="acc-band"><div class="acc-gallery">${items}</div></div>
    <div class="band-controls">
      <p class="gallery-caption">${esc(s.images[0].caption || "")}</p>
      <div class="band-arrows">
        <button class="arrow-btn gal-prev" type="button" aria-label="Previous screen">‹</button>
        <button class="arrow-btn gal-next" type="button" aria-label="Next screen">›</button>
      </div>
    </div>
  </div>
  <div class="case-row-text"><h2>${esc(s.heading)}</h2><p>${esc(s.body)}</p></div>
</section>`;
      }
      let imgs = "";
      if (s.images?.length > 1) {
        imgs =
          `\n  <div class="shot-row" style="margin-top:40px">` +
          s.images
            .map(
              (im) =>
                `<figure class="shot" style="margin-top:0"><img src="${dataUri(im.src)}" alt="${esc(im.caption || s.heading)}" loading="lazy"/>${im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ""}</figure>`
            )
            .join("") +
          `</div>`;
      }
      const isImpact = s.heading.toLowerCase() === "impact";
      const bullets = s.bullets?.length
        ? `\n  <ul class="impact-list">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
        : "";
      return `<section${id} class="case-section${isImpact ? " impact" : ""}">
  <h2>${esc(s.heading)}</h2>
  ${s.body ? `<p>${esc(s.body)}</p>` : ""}${bullets}${imgs}
</section>`;
    })
    .join("\n");

  const body = `<main class="case">
<a href="work.html" class="back">← All work</a>
<header class="case-header">
  <h1>${esc(p.title)}</h1>
  <p class="one-liner">${esc(p.oneLiner)}</p>
  ${hasImpact ? '<a href="#impact" class="jump-impact">See the impact ↓</a>' : ""}
</header>
<dl class="meta">
${meta}
</dl>
<aside class="tldr">
  <h2>TL;DR</h2>
  <ul>
${tldr}
  </ul>
</aside>
${chips ? `<section class="case-section">
  <h2>In the box</h2>
  <div class="chips">
${chips}
  </div>
</section>` : ""}
${sections}
<nav class="case-nav">
  ${prev ? `<a href="${prev.slug}.html">← ${esc(prev.cardTitle)}</a>` : "<span></span>"}
  ${next ? `<a href="${next.slug}.html">${esc(next.cardTitle)} →</a>` : "<span></span>"}
</nav>
</main>`;

  writeFileSync(join(out, `${p.slug}.html`), shell(`${p.title} — ${site.name}`, body));
});

console.log("Preview generated:", out, "| posts:", posts.length);
