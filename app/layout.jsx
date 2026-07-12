import "./globals.css";
import { site } from "../data/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
};

function CtaBand() {
  return (
    <section className="cta-band">
      <div>
        <h2>Have a product to build?</h2>
        <p>15 minutes, no slides — let&apos;s talk about it.</p>
      </div>
      <div className="cta-actions">
        <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn">
          Book a call
        </a>
        <span className="cta-alt">
          or email <a href={`mailto:${site.email}`}>{site.email}</a>
        </span>
      </div>
    </section>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="nav">
            <a href="/" className="nav-name">
              {site.name}
            </a>
            <div className="nav-links">
              <a href="/work/">Work</a>
              <a href="/#experience" className="nav-dot">
                Experience
              </a>
              <a href="/blog/">Blog</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="btn-sm">
                Book a call
              </a>
            </div>
          </nav>
          {children}
          <CtaBand />
          <footer className="footer">
            <p>© {new Date().getFullYear()} {site.name}</p>
            <div className="links">
              <a href="/blog/">Blog</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </footer>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function openLB(srcs,caps,idx){var o=document.createElement('div');o.className='lightbox';var img=document.createElement('img');function show(i){idx=(i+srcs.length)%srcs.length;img.src=srcs[idx];img.alt=caps[idx]||'';}if(srcs.length>1){var p=document.createElement('button');p.className='lb-arrow lb-prev';p.innerHTML='&#8249;';p.onclick=function(ev){ev.stopPropagation();show(idx-1);};var n=document.createElement('button');n.className='lb-arrow lb-next';n.innerHTML='&#8250;';n.onclick=function(ev){ev.stopPropagation();show(idx+1);};o.appendChild(p);o.appendChild(n);}img.onclick=function(ev){ev.stopPropagation();if(srcs.length>1)show(idx+1);};function key(ev){if(ev.key==='Escape'){o.remove();document.removeEventListener('keydown',key);}else if(ev.key==='ArrowRight'){show(idx+1);}else if(ev.key==='ArrowLeft'){show(idx-1);}}o.onclick=function(){o.remove();document.removeEventListener('keydown',key);};o.appendChild(img);document.body.appendChild(o);show(idx);document.addEventListener('keydown',key);}
document.addEventListener('click',function(e){var g=e.target.closest('[data-gallery]');if(g){var slots=Array.prototype.slice.call(g.querySelectorAll('.acc-item'));var imgs=slots.map(function(it){return it.querySelector('img');});var master=imgs.map(function(t){return t.getAttribute('data-full');});var caps=imgs.map(function(t){return t.getAttribute('data-cap')||'';});var n=master.length;var cur=parseInt(g.getAttribute('data-idx')||'0',10);var strip=g.querySelector('.acc-gallery');var capEl=g.querySelector('.gallery-caption');var apply=function(){slots.forEach(function(it,j){var k=(cur+j)%n;var im=it.querySelector('img');im.src=master[k];im.alt=caps[k];});if(capEl)capEl.textContent=caps[cur];g.setAttribute('data-idx',cur);};var setIdx=function(i){cur=((i%n)+n)%n;if(strip){strip.classList.add('swap');setTimeout(function(){apply();strip.classList.remove('swap');},150);}else{apply();}};if(e.target.closest('.gal-prev')){setIdx(cur-1);return;}if(e.target.closest('.gal-next')){setIdx(cur+1);return;}var it=e.target.closest('.acc-item');if(it){var j=slots.indexOf(it);if(j===0){openLB(master,caps,cur);}else{setIdx(cur+j);}return;}}var z=e.target.closest('[data-zoom]');if(z){openLB([z.getAttribute('data-zoom')],[z.getAttribute('alt')||''],0);}});})();`,
          }}
        />
      </body>
    </html>
  );
}
