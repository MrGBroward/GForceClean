import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

/* Stripe publishable key via Netlify env (kept for your Klarna/Stripe modal if you want it later) */
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

/* Optional: link to your commercial-only site */
const COMMERCIAL_URL = "https://your-commercial-squarespace-site.com";

/* ---------- tiny helper ---------- */
function ImageWithFallback({ srcs = [], alt = "", style }) {
  const [i, setI] = useState(0);
  if (!srcs.length) return null;
  return (
    <img
      src={srcs[i]}
      alt={alt}
      style={style}
      onError={() => setI((p) => (p + 1 < srcs.length ? p + 1 : p))}
    />
  );
}

/* ---------- HEADER ---------- */
function Header() {
  return (
    <header style={{ background: colors.ink, color: "white", borderBottom: `1px solid ${colors.borderDark}` }}>
      <div style={{ ...container, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
        <img
          src="/images/logo.png"
          alt="G-Force Exterior Cleaning"
          style={{ height: 72, width: "auto", objectFit: "contain" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div style={{ fontWeight: 800, fontSize: 18 }}>G-Force Exterior Cleaning</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <a href="#contact" style={btnMini}>Free Quote</a>
          <a href={COMMERCIAL_URL} target="_blank" rel="noreferrer" style={btnMiniOutline}>Commercial</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section style={{ padding: "3rem 1rem", background: colors.panel, borderBottom: `1px solid ${colors.borderDark}` }}>
      <div style={container}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
          <img
            src="/images/veteran-owned.png"
            alt="Veteran Owned"
            style={{ height: 56, width: "auto" }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <ImageWithFallback
            srcs={[
              "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
            ]}
            alt="Klarna"
            style={{ height: 32 }}
          />
        </div>

        <h1 style={{ fontSize: "2.35rem", marginBottom: "0.5rem", fontWeight: 800, color: "white", textAlign: "center" }}>
          Pressure Washing & Soft Wash Roof Cleaning in Broward County
        </h1>

        <p style={{ fontSize: "1.05rem", maxWidth: 920, margin: "0 auto", color: "#cbd5e1", textAlign: "center" }}>
          Welcome to <strong>G-Force Exterior Cleaning Services</strong> — your veteran-owned local expert for
          <strong> pressure cleaning in Broward County</strong>, including Coral Springs, Parkland, and Fort Lauderdale.
          We provide roof soft washing, driveway &amp; paver cleaning, and full exterior pressure cleaning that
          restores curb appeal and protects your property. Flexible scheduling, photo documentation, and financing via Klarna.
        </p>

        <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" style={btnSolid}>Get a Free Quote</a>
          <a href="#gallery" style={btnOutline}>See Before &amp; After</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES (with internal links) ---------- */
function ServicesSection() {
  return (
    <section style={{ padding: "2rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>Our Exterior Cleaning Services in Broward County</h2>
        <ul style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 12, color: colors.sub }}>
          <li><a href="/services/soft-wash-roof-cleaning.html" style={link}>Soft Wash Roof Cleaning in Broward County</a></li>
          <li><a href="/services/house-and-building-wash.html" style={link}>House &amp; Building Washing in Coral Springs</a></li>
          <li><a href="/services/pressure-cleaning-driveways-sidewalks-pavers.html" style={link}>Pressure Cleaning – Driveways, Sidewalks &amp; Pavers (Sealing Optional)</a></li>
          <li><a href="/services/hoa-and-commercial-schedules.html" style={link}>HOA &amp; Commercial Pressure Cleaning Schedules in Broward</a></li>
          <li><a href="/services/heavy-equipment-and-dumpster-pads.html" style={link}>Heavy Equipment &amp; Dumpster Pad Cleaning</a></li>
        </ul>
        <p style={{ maxWidth: 900, margin: "14px auto 0", color: colors.sub, textAlign: "center" }}>
          Whether you need one-time service or recurring <strong>pressure cleaning services in Broward County</strong> for HOAs and commercial sites,
          G-Force delivers consistent, professional results.
        </p>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const items = [
    { quote: "Our roof looks brand new after G-Force’s soft wash roof cleaning.", name: "Homeowner – Coral Springs, FL" },
    { quote: "Reliable and punctual. They handle our HOA’s sidewalks and common areas flawlessly.", name: "HOA Board – Parkland, FL" },
    { quote: "Driveway pressure washing and paver sealing were excellent. Big improvement in curb appeal.", name: "Property Manager – Fort Lauderdale, FL" }
  ];
  return (
    <section style={{ padding: "2rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>What Clients Say</h2>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {items.map((t, i) => (
            <div key={i} style={{ ...sectionCard, padding: 16 }}>
              <p style={{ margin: 0, color: colors.sub }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ marginTop: 8, fontSize: 12, color: colors.sub }}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
function BeforeAfterGallery() {
  const photos = [
    { src: "/images/condo-dirty.jpg",                  width: 1200, height: 800, alt: "Condo exterior before soft wash in Broward County", title: "Condo Wall – Before Cleaning" },
    { src: "/images/before-and-after-bulldozer-2.jpg", width: 1200, height: 800, alt: "Bulldozer before and after deep cleaning",        title: "Bulldozer – Before & After" },
    { src: "/images/before-and-after-house-2.jpg",     width: 1200, height: 800, alt: "House exterior soft wash in Coral Springs",      title: "House Exterior – Before & After" },
    { src: "/images/gas-station-before-and-after.jpg", width: 1200, height: 800, alt: "Gas station pressure cleaning before and after", title: "Gas Station – Before & After" }
  ];
  const [index, setIndex] = useState(-1);

  return (
    <section id="gallery" style={{ padding: "60px 20px", backgroundColor: "#f8f8f8" }}>
      <div style={container}>
        <h2 style={{ ...h2, textAlign: "center", marginBottom: 12 }}>Before &amp; After Pressure Cleaning Results</h2>
        <p style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 28px", fontSize: "1.05rem", color: colors.sub }}>
          See the difference professional <strong>pressure cleaning in Broward County</strong> makes—fast, safe, and long-lasting results.
        </p>

        <PhotoAlbum
          layout="columns"
          photos={photos}
          columns={(w) => (w < 600 ? 1 : 2)}
          spacing={8}
          renderPhoto={({ wrapperStyle, imageProps, photo }) => (
            <div style={{ ...wrapperStyle }}>
              <img {...imageProps} alt={photo.alt} style={{ width: "100%", height: "auto", borderRadius: 8 }} />
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6, textAlign: "center" }}>{photo.title}</div>
            </div>
          )}
          onClick={({ index }) => setIndex(index)}
        />

        <Lightbox open={index >= 0} close={() => setIndex(-1)} slides={photos.map((p) => ({ src: p.src, alt: p.alt }))} />
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const qas = [
    { q: "Do you serve all of Broward County?", a: "Yes—most work is in Broward, and we cover nearby Miami-Dade and Palm Beach on request." },
    { q: "Is pressure cleaning safe for my roof and plants?", a: "We use a soft-wash approach for roofs and pre-wet landscaping to protect plants." },
    { q: "Can you schedule early mornings or weekends?", a: "Absolutely. We offer early morning, weekend, and off-peak scheduling for homes, HOAs, and businesses." },
    { q: "Do you offer financing?", a: "Yes. Finance projects through Klarna via Stripe on this page." },
    { q: "Do you handle commercial/HOA properties?", a: "Yes. We provide recurring maintenance with photo documentation and flexible pricing." }
  ];
  const [open, setOpen] = useState(-1);
  return (
    <section style={{ padding: "2rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>Q&amp;A</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {qas.map((item, i) => (
            <div key={i} style={{ ...sectionCard, overflow: "hidden" }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{ width: "100%", textAlign: "left", padding: 16, background: "transparent", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                aria-expanded={open === i}
              >
                <span style={{ fontWeight: 600 }}>{item.q}</span>
                <span style={{ opacity: 0.6 }}>{open === i ? "–" : "+"}</span>
              </button>
              {open === i && <div style={{ padding: "0 16px 16px 16px", color: colors.sub }}>{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT (AJAX Netlify Form) ---------- */
function ContactForm() {
  const [status, setStatus] = React.useState("idle"); // idle | submitting | success | error
  const [error, setError] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams(formData).toString(); // Netlify expects urlencoded

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error("Form submit failed");
      }
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div style={{ ...sectionCard, padding: 16, background: "#f8fafc" }}>
        <h3 style={{ marginTop: 0 }}>Thanks! Your request has been sent.</h3>
        <p>
          We’ll be in touch shortly. If it’s urgent, call{" "}
          <a href="tel:+17543340220" style={{ color: colors.ink }}>(754) 334-0220</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      style={{ ...sectionCard, padding: 16, display: "grid", gap: 12 }}
    >
      {/* Let Netlify know which form this is */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot (hidden) */}
      <p style={{ display: "none" }}>
        <label>Don’t fill this out: <input name="bot-field" /></label>
      </p>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        <label style={label}>Name<input name="name" required style={input} /></label>
        <label style={label}>Email<input type="email" name="email" required style={input} /></label>
      </div>

      <label style={label}>What would you like cleaned?
        <textarea name="message" rows={4} required style={{ ...input, resize: "vertical" }} />
      </label>

      <button type="submit" disabled={status === "submitting"} style={btnSolid}>
        {status === "submitting" ? "Sending…" : "Send"}
      </button>

      {status === "error" && (
        <div style={{ color: "#b91c1c", fontSize: 13 }}>{error}</div>
      )}
    </form>
  );
}

function ContactSection() {
  return (
    <section id="contact" style={{ padding: "2rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>
          Request a Free Pressure Washing Estimate
        </h2>
        <p style={{ textAlign: "center", color: colors.sub, marginBottom: 16 }}>
          Prefer to talk now? Call{" "}
          <a href="tel:+17543340220" style={{ color: colors.ink }}>
            (754) 334-0220
          </a>
        </p>
        <ContactForm />
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer style={{ padding: "1.25rem", background: colors.ink, color: "white", textAlign: "center", borderTop: `1px solid ${colors.borderDark}` }}>
      <div style={{ ...container, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
          <img src="/images/veteran-owned.png" alt="Veteran Owned" style={{ height: 46, width: "auto" }}
               onError={(e) => (e.currentTarget.style.display = "none")} />
          <ImageWithFallback
            srcs={[
              "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
            ]}
            alt="Klarna"
            style={{ height: 34, filter: "invert(1)" }}
          />
        </div>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://www.facebook.com/profile.php?id=61576689505011" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>Facebook</a>
          <a href="https://www.instagram.com/"mr.g_pressure_washing" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>Instagram</a>
          <a href="https://g.page/r/CUsc9DDyJzH7EB0/review" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>Google Business Profile</a>
          <a href="https://www.yelp.com/biz/g-force-exterior-cleaning-services-coral-springs" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>Yelp</a>
        </div>

        <p style={{ margin: 0 }}>
          Proudly serving Coral Springs, Parkland, Fort Lauderdale &amp; all of Broward County · © {new Date().getFullYear()} G-Force Exterior Cleaning Services
        </p>
      </div>
    </footer>
  );
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: colors.text, background: colors.pageBg }}>
      <Header />
      <Hero />
      <ServicesSection />
      <Testimonials />
      <BeforeAfterGallery />
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
}

/* ---------- styles ---------- */
const colors = {
  ink: "#0f172a",
  text: "#0f172a",
  sub: "#475569",
  border: "#e2e8f0",
  borderDark: "#1f2937",
  accent: "#0f172a",
  pageBg: "#e5e7eb",
  cardBg: "#ffffff",
  panel: "#1f2937"
};

const btnSolid = { background: "#334155", color: "white", border: "none", padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontSize: 14 };
const btnOutline = { background: "transparent", color: "white", border: "1px solid #94a3b8", padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontSize: 14 };
const btnMini = { background: "#334155", color: "white", border: "none", padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13 };
const btnMiniOutline = { background: "transparent", color: "white", border: "1px solid #94a3b8", padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13 };
const h2 = { fontSize: "1.75rem", fontWeight: 800, margin: 0, color: colors.text };
const container = { maxWidth: 1000, margin: "0 auto" };
const sectionCard = { background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: 16, boxShadow: "0 1px 2px rgba(2,6,23,0.06)" };
const label = { display: "grid", gap: 6, fontSize: 14, color: colors.text };
const input = { width: "100%", padding: "10px 12px", borderRadius: 12, border: `1px solid ${colors.border}`, background: "#fff", marginTop: 4 };
const link = { color: colors.ink, textDecoration: "underline" };
