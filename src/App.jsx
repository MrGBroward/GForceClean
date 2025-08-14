#cbd5e1" }}>See services</a>
          </div>
          <ul style={styles.bullets}>
            <li>Soft‑wash roofs</li>
            <li>House & building wash</li>
            <li>Driveways, sidewalks & pavers</li>
            <li>HOA & commercial schedules</li>
            <li>Heavy equipment & dumpster pads</li>
            <li>VIP Maintenance Plans</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
      <div style={{ ...styles.container, padding: "16px" }}>
        <div style={styles.columns(4)}>
          <div>📍 Locally owned</div>
          <div>🛡️ Fully insured</div>
          <div>⏱️ On‑time, low cancellations</div>
          <div>📄 Gov & HOA friendly</div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    {
      title: "Soft‑Wash Roof Cleaning",
      desc: "Eliminates Gloeocapsa magma safely using the correct SH percentage and dwell time—protects shingles and landscaping.",
      img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "House & Building Wash",
      desc: "Low‑pressure washing that lifts dirt, mildew, and grime without damage.",
      img: "https://images.unsplash.com/photo-1509927088009-6b2aafc0fb2d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Driveways, Pavers & Walkways",
      desc: "Concrete and paver restoration. Optional sealing for longer‑lasting protection and color pop.",
      img: "https://images.unsplash.com/photo-1595855758393-8fbb72171d88?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "HOA & Commercial",
      desc: "Property‑manager friendly schedules, preferred pricing, and clear tenant/owner communication.",
      img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop",
    },
  ];
  return (
    <section id="services" style={{ ...styles.container, padding: "64px 16px" }}>
      <h2 style={styles.h2}>Services</h2>
      <p style={styles.subtle}>We tailor every job to your property and budget. Long‑term contracts get preferred pricing and scheduling.</p>
      <div style={styles.cards}>
        {items.map((it) => (
          <article key={it.title} style={styles.card}>
            <img src={it.img} alt={it.title} style={styles.cardImg} />
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 600 }}>{it.title}</div>
              <div style={styles.muted}>{it.desc}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: 1, t: "Walkthrough", d: "We assess surfaces, plants, and runoff to plan a safe clean." },
    { n: 2, t: "Protect & Pre‑wet", d: "We pre‑wet landscaping and protect delicate areas." },
    { n: 3, t: "Soft‑Wash/Pressure", d: "Apply correct mix %, then rinse—no damage, no streaks." },
    { n: 4, t: "Final Rinse & QA", d: "Neutralize, tidy up, and verify you’re thrilled." },
  ];
  return (
    <section id="process" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
      <div style={{ ...styles.container, padding: "56px 16px" }}>
        <h2 style={styles.h2}>Our process</h2>
        <div style={styles.columns(4)}>
          {steps.map((s) => (
            <div key={s.n} style={styles.step}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Step {s.n}</div>
              <div style={{ marginTop: 4, fontWeight: 600 }}>{s.t}</div>
              <div style={styles.muted}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  ];
  return (
    <section id="gallery" style={{ ...styles.container, padding: "64px 16px" }}>
      <h2 style={styles.h2}>Before & after results</h2>
      <p style={styles.subtle}>Real work. Real shine.</p>
      <div style={styles.grid(4)}>
        {imgs.map((src, i) => (
          <img key={i} src={src} alt={`Project ${i + 1}`} style={styles.galleryImg} />
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const quotes = [
    {
      q: "G‑Force handles our community sidewalks and common areas on a tight schedule and budget—zero drama.",
      a: "Laura P., Property Manager",
    },
    {
      q: "Our roof and driveway look new again. They showed up on time and protected our landscaping.",
      a: "James R., Coral Springs Homeowner",
    },
  ];
  return (
    <section id="reviews" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
      <div style={{ ...styles.container, padding: "56px 16px" }}>
        <h2 style={styles.h2}>What clients say</h2>
        <div style={styles.grid(2)}>
          {quotes.map((c, i) => (
            <blockquote key={i} style={styles.quote}>
              <p style={{ margin: 0 }}>“{c.q}”</p>
              <footer style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>— {c.a}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section>
      <div style={{ ...styles.container, padding: "40px 16px" }}>
        <div style={styles.ctaBox}>
          <h3 style={{ margin: 0, fontSize: 24 }}>Pricing that fits your budget & schedule</h3>
          <p style={styles.subtle}>One‑time clean or VIP Maintenance Plan—predictable costs and less hassle. Long‑term contracts receive preferred pricing.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href="#contact" style={{ ...styles.button, background: "#0f172a", color: "white" }}>Request a quote</a>
            <a href="tel:+17543340220" style={{ ...styles.button, border: "1px solid #cbd5e1" }}>Call (754) 334‑0220</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Can you work within my budget or a long‑term contract?", a: "Yes. We can price per job or create a monthly/quarterly VIP Maintenance Plan with preferred rates." },
    { q: "Do you work around HOA/tenant schedules?", a: "Absolutely. We schedule off‑peak hours and provide advance notices to residents." },
    { q: "Is soft‑wash safe for my roof?", a: "Yes—when the correct SH percentage and dwell time are used. We protect landscaping and rinse thoroughly." },
    { q: "Are you insured and SAM.gov registered?", a: "Fully insured; COI available on request. SAM.gov registered for government contracts." },
  ];
  return (
    <section id="faq" style={{ ...styles.container, padding: "64px 16px" }}>
      <h2 style={styles.h2}>FAQ</h2>
      <div style={styles.grid(3)}>
        {faqs.map((f, i) => (
          <div key={i} style={styles.step}>
            <div style={{ fontWeight: 600 }}>{f.q}</div>
            <div style={styles.muted}>{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const subject = encodeURIComponent("New Quote Request — G‑Force Exterior Cleaning");
    const body = encodeURIComponent(
      `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nMessage: ${data.message}`
    );

    window.location.href = `mailto:bruce@gforcepressurewashing.com?subject=${subject}&body=${body}`;
    setStatus("Thanks! Your email client will open with the details.");
  }

  return (
    <section id="contact" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
      <div style={{ ...styles.container, padding: "56px 16px" }}>
        <h2 style={styles.h2}>Request a quote</h2>
        <p style={styles.subtle}>Same‑day responses during business hours.</p>
        <form onSubmit={handleSubmit} style={styles.formGrid}>
          <input name="name" required placeholder="Your name" style={styles.input} />
          <input name="phone" required placeholder="Phone" style={styles.input} />
          <input name="email" type="email" placeholder="Email (optional)" style={{ ...styles.input, gridColumn: "1 / -1" }} />
          <select name="service" style={{ ...styles.input, gridColumn: "1 / -1" }}>
            <option>Soft‑wash roof cleaning</option>
            <option>House/building wash</option>
            <option>Driveway & pavers</option>
            <option>HOA/Commercial</option>
            <option>Other</option>
          </select>
          <textarea name="message" rows={4} placeholder="Tell us about your property" style={{ ...styles.input, gridColumn: "1 / -1" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, gridColumn: "1 / -1" }}>
            <button style={{ ...styles.button, background: "#0f172a", color: "white" }}>Send request</button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg" alt="Klarna" style={{ height: 14 }} />
              <span>*Financing available via Klarna.</span>
            </div>
          </div>
          {status && <div style={{ gridColumn: "1 / -1", fontSize: 14, color: "#475569" }}>{status}</div>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div style={{ ...styles.container, padding: "40px 16px" }}>
        <div style={styles.grid(4)}>
          <div>
            <div style={{ fontWeight: 600 }}>G‑Force Exterior Cleaning Services Inc.</div>
            <div style={styles.muted}>2139 North University Drive<br />Coral Springs, FL 33071</div>
            <div style={{ marginTop: 8 }}><a href="tel:+17543340220" style={styles.link}>(754) 334‑0220</a></div>
            <div style={{ marginTop: 4 }}><a href="mailto:bruce@gforcepressurewashing.com" style={styles.link}>bruce@gforcepressurewashing.com</a></div>
            <div style={{ marginTop: 12 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg" alt="Klarna" style={{ height: 18 }} />
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Company</div>
            <ul style={styles.listPlain}>
              <li><a href="#services" style={styles.link}>Services</a></li>
              <li><a href="#process" style={styles.link}>Process</a></li>
              <li><a href="#gallery" style={styles.link}>Results</a></li>
              <li><a href="#contact" style={styles.link}>Contact</a></li>
            </ul>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Service areas</div>
            <ul style={styles.listPlain}>
              <li>Broward County</li>
              <li>Miami‑Dade County</li>
              <li>Palm Beach County</li>
            </ul>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Licensing & Insurance</div>
            <div style={styles.muted}>Full COI available on request. SAM.gov registered for GovCon.</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #e2e8f0", padding: "16px", textAlign: "center", fontSize: 12, color: "#64748b" }}>
        © {new Date().getFullYear()} G‑Force Exterior Cleaning Services Inc. All rights reserved.
      </div>
    </footer>
  );
}

// ==================
// Simple design tokens
// ==================
const styles = {
  page: { fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif", color: "#0f172a", lineHeight: 1.5 },
  container: { maxWidth: 1120, margin: "0 auto" },
  containerRow: { maxWidth: 1120, margin: "0 auto", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  header: { position: "sticky", top: 0, zIndex: 40, backdropFilter: "blur(6px)", background: "rgba(255,255,255,0.75)", borderBottom: "1px solid #e2e8f0" },
  h1: { fontSize: 40, margin: 0, fontWeight: 800 },
  h2: { fontSize: 28, margin: "0 0 8px 0", fontWeight: 700 },
  lead: { marginTop: 12, fontSize: 18, color: "#475569" },
  button: { display: "inline-block", padding: "12px 16px", borderRadius: 14, textDecoration: "none", fontSize: 14 },
  bullets: { marginTop: 16, padding: 0, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 6, listStyle: "none", color: "#475569", fontSize: 14 },
  subtle: { marginTop: 6, color: "#475569" },
  muted: { marginTop: 6, color: "#64748b", fontSize: 14 },
  cards: { marginTop: 20, display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12 },
  card: { border: "1px solid #e2e8f0", borderRadius: 14, background: "white", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  cardImg: { width: "100%", height: 140, objectFit: "cover" },
  grid: (n) => ({ marginTop: 16, display: "grid", gridTemplateColumns: `repeat(${n}, minmax(0,1fr))`, gap: 12 }),
  columns: (n) => ({ display: "grid", gridTemplateColumns: `repeat(${n}, minmax(0,1fr))`, gap: 12, alignItems: "start" }),
  step: { padding: 16, border: "1px solid #e2e8f0", borderRadius: 14, background: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  galleryImg: { width: "100%", height: 180, objectFit: "cover", borderRadius: 12, border: "1px solid #e2e8f0" },
  quote: { padding: 16, border: "1px solid #e2e8f0", borderRadius: 14, background: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
  ctaBox: { border: "1px solid #e2e8f0", borderRadius: 20, background: "linear-gradient(180deg,#f8fafc,#ffffff)", boxShadow: "0 1px 2px rgba(0,0,0,0.04)", padding: 24 },
  formGrid: { marginTop: 16, display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 12 },
  input: { width: "100%", padding: 12, borderRadius: 12, border: "1px solid #cbd5e1", fontSize: 14 },
  link: { color: "#0f172a", textDecoration: "none" },
  navLink: { color: "#0f172a", textDecoration: "none", fontSize: 14 },
};
