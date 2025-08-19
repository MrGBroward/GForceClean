import React from "react";

/* =========================
   Design tokens (declare once)
   ========================= */
const colors = {
  bg: "#0f172a",       // deep slate (hero)
  panel: "#f8fafc",    // light section
  ink: "#0f172a",
  sub: "#334155",
  border: "#e5e7eb",
  primary: "#0074de"
};

const container = { maxWidth: 1200, margin: "0 auto", padding: "0 18px" };
const h1 = { fontSize: "2.5rem", lineHeight: 1.2, margin: "0 0 12px" };
const h2 = { fontSize: "1.6rem", margin: "0 0 8px" };
const p  = { margin: "0 0 12px", color: colors.sub, fontSize: 18 };

const btnSolid = {
  display: "inline-block", background: colors.ink, color: "#fff",
  padding: "12px 18px", borderRadius: 8, textDecoration: "none",
  border: `1px solid ${colors.ink}`
};
const btnOutline = {
  display: "inline-block", background: "#fff", color: colors.ink,
  padding: "12px 18px", borderRadius: 8, textDecoration: "none",
  border: `1px solid ${colors.border}`
};

/* =========================
   Header (with enlarged logos + Klarna)
   ========================= */
function Header() {
  return (
    <header style={{ background: "#fff", borderBottom: `1px solid ${colors.border}` }}>
      <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 80, gap: 16 }}>
        {/* Brand + logos */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: colors.ink }}>
          {/* Company logo (upload to /public/images/logo.png) */}
          <img
            src="/images/logo.png"
            alt="G-Force Exterior Cleaning Services"
            style={{ height: 96, width: "auto", display: "block" }}   // doubled from 48 → 96
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <span style={{ fontWeight: 800, fontSize: "1.35rem" }}>G-Force Exterior Cleaning</span>
          {/* Veteran-owned badge (upload to /public/images/veteran-owned.png) */}
          <img
            src="/images/veteran-owned.png"
            alt="Veteran Owned"
            style={{ height: 72, width: "auto", display: "block" }}    // doubled from 36 → 72
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </a>

        {/* Nav */}
        <nav style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <a href="#services" style={{ color: colors.ink, textDecoration: "none" }}>Services</a>
          <a href="#gallery" style={{ color: colors.ink, textDecoration: "none" }}>Gallery</a>
          <a href="#contact" style={{ color: colors.ink, textDecoration: "none" }}>Contact</a>
          <a href="/finance.html" style={{ ...btnOutline, padding: "8px 14px" }}>Finance with Klarna</a>
        </nav>
      </div>
    </header>
  );
}

/* =========================
   Hero (bold text + veteran line + Klarna)
   ========================= */
function Hero() {
  return (
    <section style={{ background: colors.bg, color: "#fff", padding: "64px 0" }}>
      <div style={{ ...container, maxWidth: 1200 }}>
        <h1 style={{ ...h1, color: "#fff" }}>Pressure Cleaning in Broward County</h1>
        <p style={{ ...p, color: "#dbeafe", marginBottom: 8 }}>
          <strong>Veteran-Owned &amp; Insured.</strong> G-Force Exterior Cleaning Services helps South Florida
          properties look their best while protecting roofs, paint, and landscaping.
        </p>
        <p style={{ ...p, color: "#cbd5e1", marginBottom: 0 }}>
          We schedule around your needs—early mornings, weekends, or off-peak hours—and we offer financing and
          flexible pricing, especially for long-term and multi-site contracts. Expect clear communication, photo
          documentation, and results you can see.
        </p>
        <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#contact" style={btnSolid}>Get a Free Quote</a>
          <a href="/finance.html" style={btnOutline}>Finance with Klarna</a>
          <a href="#gallery" style={btnOutline}>See Before &amp; After</a>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Services (internal links)
   ========================= */
function ServicesSection() {
  return (
    <section id="services" style={{ padding: "32px 0", background: "#fff" }}>
      <div style={container}>
        <h2 style={h2}>Services</h2>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li><a href="/services/soft-wash-roof-cleaning.html">Soft-wash roof cleaning</a></li>
          <li><a href="/services/house-and-building-wash.html">House &amp; building wash</a></li>
          <li><a href="/services/pressure-cleaning-driveways-sidewalks-pavers.html">Pressure Cleaning – Driveways, sidewalks &amp; pavers (sealing optional)</a></li>
          <li><a href="/services/hoa-and-commercial-schedules.html">HOA &amp; commercial schedules</a></li>
          <li><a href="/services/heavy-equipment-and-dumpster-pads.html">Heavy equipment &amp; dumpster pads</a></li>
        </ul>
        <p style={{ marginTop: 10 }}><a href="/services.html">View all services →</a></p>
      </div>
    </section>
  );
}

/* =========================
   Gallery (static images; safe if missing)
   ========================= */
function GallerySection() {
  const imgStyle = { width: "100%", borderRadius: 12, border: `1px solid ${colors.border}` };
  const grid = {
    display: "grid", gap: 14,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
  };
  return (
    <section id="gallery" style={{ padding: "32px 0", background: colors.panel }}>
      <div style={container}>
        <h2 style={h2}>Before &amp; After</h2>
        <div style={grid}>
          <img src="/images/condo-dirty.jpg" alt="Condo exterior cleaning – before" style={imgStyle} />
          <img src="/images/before-and-after-house-2.jpg" alt="House cleaning – before & after" style={imgStyle} />
          <img src="/images/before-and-after-bulldozer-2.jpg" alt="Heavy equipment cleaning – before & after" style={imgStyle} />
        </div>
        <p style={{ ...p, marginTop: 10 }}></p>
      </div>
    </section>
  );
}

/* =========================
   Contact (Netlify Forms)
   ========================= */
function ContactSection() {
  const field = { display: "grid", gap: 6, marginBottom: 12 };
  const label = { fontSize: 14, color: colors.sub };
  const input = { padding: "10px 12px", borderRadius: 8, border: `1px solid ${colors.border}`, background: "#fff" };

  return (
    <section id="contact" style={{ padding: "32px 0", background: "#fff" }}>
      <div style={container}>
        <h2 style={h2}>Request a Free Quote</h2>
        <form name="contact" method="POST" data-netlify="true" action="/thanks" style={{ maxWidth: 560 }}>
          <input type="hidden" name="form-name" value="contact" />
          <div style={field}>
            <label htmlFor="name" style={label}>Name</label>
            <input id="name" name="name" type="text" required style={input} />
          </div>
          <div style={field}>
            <label htmlFor="email" style={label}>Email</label>
            <input id="email" name="email" type="email" required style={input} />
          </div>
          <div style={field}>
            <label htmlFor="service" style={label}>What do you want cleaned?</label>
            <textarea id="service" name="service" rows="4" style={{ ...input, resize: "vertical" }} />
          </div>
          <button type="submit" style={{ ...btnSolid, cursor: "pointer" }}>Send</button>
          <p style={{ ...p, fontSize: 13, marginTop: 10 }}>
            Financing available through Klarna. Ask for details.
          </p>
        </form>
      </div>
    </section>
  );
}

/* =========================
   Footer
   ========================= */
function Footer() {
  const linkStyle = { color: "#fff", textDecoration: "underline", margin: "0 10px" };
  return (
    <footer style={{ background: "#222", color: "#fff", padding: "2rem 1rem", textAlign: "center" }}>
      <p style={{ margin: "0 0 10px" }}>© {new Date().getFullYear()} G-Force Exterior Cleaning Services</p>
      <p style={{ margin: "0 0 16px" }}>
        <a href="/privacy-policy.html" style={linkStyle}>Privacy Policy</a>
        <a href="/finance.html" style={linkStyle}>Finance with Klarna</a>
      </p>
      <div style={{ marginTop: "0.5rem" }}>
        <a href="https://www.facebook.com/profile.php?id=61576689505011" target="_blank" rel="noopener noreferrer" style={linkStyle}>Facebook</a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Instagram</a>
        <a href="https://g.page/r/CUsc9DDyJzH7EB0/review" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google</a>
        <a href="https://www.yelp.com/biz/g-force-exterior-cleaning-services-coral-springs" target="_blank" rel="noopener noreferrer" style={linkStyle}>Yelp</a>
      </div>
    </footer>
  );
}

/* =========================
   App Root
   ========================= */
export default function App() {
  return (
    <div>
      <Header />
      <Hero />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
