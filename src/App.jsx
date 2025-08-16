import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

/* Stripe publishable key via Netlify env */
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

/* Replace with your commercial-only Squarespace URL if applicable */
const COMMERCIAL_URL = "https://your-commercial-squarespace-site.com";

/* ---------------- helpers ---------------- */
function ImageWithFallback({ srcs = [], alt = "", style }) {
  const [i, setI] = useState(0);
  if (!srcs.length) return null;
  return (
    <img
      src={srcs[i]}
      alt={alt}
      style={style}
      onError={() => setI((prev) => (prev + 1 < srcs.length ? prev + 1 : prev))}
    />
  );
}

/* ---------------- Header ---------------- */
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

/* ---------------- Hero (SEO-optimized) ---------------- */
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

/* ---------------- Services ---------------- */
function ServicesSection() {
  return (
    <section style={{ padding: "2rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>Our Exterior Cleaning Services in Broward County</h2>

        <ul style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 12, color: colors.sub }}>
          <li>
            <a href="/services/soft-wash-roof-cleaning.html" style={link}>
              Soft Wash Roof Cleaning in Broward County
            </a>
          </li>
          <li>
            <a href="/services/house-and-building-wash.html" style={link}>
              House &amp; Building Washing in Coral Springs
            </a>
          </li>
          <li>
            <a href="/services/pressure-cleaning-driveways-sidewalks-pavers.html" style={link}>
              Pressure Cleaning – Driveways, Sidewalks &amp; Pavers (Sealing Optional)
            </a>
          </li>
          <li>
            <a href="/services/hoa-and-commercial-schedules.html" style={link}>
              HOA &amp; Commercial Pressure Cleaning Schedules in Broward
            </a>
          </li>
          <li>
            <a href="/services/heavy-equipment-and-dumpster-pads.html" style={link}>
              Heavy Equipment &amp; Dumpster Pad Cleaning
            </a>
          </li>
        </ul>

        <p style={{ maxWidth: 900, margin: "14px auto 0", color: colors.sub, textAlign: "center" }}>
          Whether you need one-time service or recurring <strong>pressure cleaning services in Broward County</strong> for HOAs and commercial sites,
          G-Force delivers consistent, professional results.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Testimonials (with local cues) ---------------- */
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

/* ---------------- FAQ ---------------- */
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

/* ---------------- Gallery (2 columns; public paths) ---------------- */
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

/* ---------------- Contact (Netlify form) ---------------- */
function ContactSection() {
  return (
    <section id="contact" style={{ padding: "2rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>Request a Free Pressure Washing Estimate</h2>
        <p style={{ textAlign: "center", color: colors.sub, marginBottom: 16 }}>
          Prefer to talk now? Call <a href="tel:+17543340220" style={{ color: colors.ink }}>(754) 334-0220</a>
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/thanks"
          style={{ ...sectionCard, padding: 16, display: "grid", gap: 12 }}
        >
          <input type="hidden" name="form-name" value="contact" />
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

          <button type="submit" style={btnSolid}>Send</button>
        </form>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
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
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>Instagram</a>
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

/* ---------------- Klarna / Stripe modal ---------------- */
function CheckoutForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError("");

    const { error: err } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href }
    });

    if (err) {
      setError(err.message || "Payment could not be confirmed.");
      setSubmitting(false);
    } else {
      onClose();
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <PaymentElement />
      {error && <div style={{ color: "#b91c1c", fontSize: 13 }}>{error}</div>}
      <button type="submit" disabled={!stripe || submitting} style={btnSolid}>
        {submitting ? "Processing…" : "Pay / Apply with Klarna"}
      </button>
    </form>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("350.00");

  async function startPayment() {
    try {
      const cents = Math.round(parseFloat(amount) * 100);
      if (!cents || cents <= 0) return alert("Enter a valid amount (e.g., 350.00)");
      const res = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cents, currency: "usd", metadata: { source: "GForce Netlify" } })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create payment intent");
      setClientSecret(data.clientSecret);
    } catch (e) {
      alert(e.message || "Could not start payment");
    }
  }

  const options = clientSecret ? { clientSecret } : undefined;

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

      {showModal && (
        <div style={modalBackdrop} onClick={(e) => e.currentTarget === e.target && setShowModal(false)}>
          <div style={modalCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>Finance with Klarna</h3>
              <button onClick={() => setShowModal(false)} style={xBtn} aria-label="Close">✕</button>
            </div>

            {!clientSecret && (
              <div style={{ display: "grid", gap: 10 }}>
                <label style={label}>Project amount (USD)
                  <input type="number" step="0.01" min="50" value={amount} onChange={(e) => setAmount(e.target.value)} style={input} placeholder="e.g., 350.00" />
                </label>
                <button style={btnSolid} onClick={startPayment}>Continue to payment</button>
                {!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY && (
                  <div style={{ fontSize: 12, color: "#b91c1c" }}>
                    Missing publishable key. Add <code>VITE_STRIPE_PUBLISHABLE_KEY</code> in Netlify → Environment variables.
                  </div>
                )}
              </div>
            )}

            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm onClose={() => setShowModal(false)} />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- styles ---------------- */
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
const modalBackdrop = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12, zIndex: 50 };
const modalCard = { background: colors.cardBg, borderRadius: 16, padding: 16, width: "100%", maxWidth: 520, boxShadow: "0 12px 30px rgba(2,6,23,0.24)", border: `1px solid ${colors.border}` };
const xBtn = { background: "transparent", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1 };
const label = { display: "grid", gap: 6, fontSize: 14, color: colors.text };
const input = { width: "100%", padding: "10px 12px", borderRadius: 12, border: `1px solid ${colors.border}`, background: "#fff", marginTop: 4 };
const link = { color: colors.ink, textDecoration: "underline" };
