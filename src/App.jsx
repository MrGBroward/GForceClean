import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

/* Gallery libs */
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

/* Stripe publishable key from Netlify env */
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

/* TODO: replace with your commercial Squarespace URL */
const COMMERCIAL_URL = "https://www.gforceclean.com/";

/* ---------- helpers ---------- */
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

/* ---------- header ---------- */
function Header() {
  return (
{/* Services */}
<section style={{ padding: "2rem 1rem" }}>
  <div style={container}>
    <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>Services</h2>
    <ul style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 12, color: colors.sub }}>
      <li>
        <a href="/services/soft-wash-roof-cleaning.html" style={{ color: colors.ink, textDecoration: "underline" }}>
          Soft-wash roof cleaning
        </a>
      </li>
      <li>
        <a href="/services/house-and-building-wash.html" style={{ color: colors.ink, textDecoration: "underline" }}>
          House &amp; building wash
        </a>
      </li>
      <li>
        <a href="/services/pressure-cleaning-driveways-sidewalks-pavers.html" style={{ color: colors.ink, textDecoration: "underline" }}>
          Pressure Cleaning – Driveways, sidewalks &amp; pavers (sealing optional)
        </a>
      </li>
      <li>
        <a href="/services/hoa-and-commercial-schedules.html" style={{ color: colors.ink, textDecoration: "underline" }}>
          HOA &amp; commercial schedules
        </a>
      </li>
      <li>
        <a href="/services/heavy-equipment-and-dumpster-pads.html" style={{ color: colors.ink, textDecoration: "underline" }}>
          Heavy equipment &amp; dumpster pads
        </a>
      </li>
    </ul>
  </div>
</section>

/* ---------- testimonials ---------- */
function Testimonials() {
  const items = [
    { quote: "G-Force made our roof and driveway look brand new. On time, careful, and priced right.", name: "Erica P.", role: "Homeowner – Coral Springs" },
    { quote: "Reliable, fast, and professional. Perfect for HOA common areas and sidewalks.", name: "David R.", role: "HOA Board Member – Pembroke Pines" },
    { quote: "Our storefront shines after every service. Customers noticed immediately.", name: "Monique L.", role: "Retail Manager – Fort Lauderdale" }
  ];
  return (
    <section style={{ padding: "2rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>What Clients Say</h2>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {items.map((t, i) => (
            <div key={i} style={{ ...sectionCard, padding: 16 }}>
              <p style={{ margin: 0, color: colors.sub }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ marginTop: 8, fontSize: 12, color: colors.sub }}>{t.name} — {t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const qas = [
    { q: "Do you serve all of Broward County?", a: "Yes—most of our work is in Broward, and we cover nearby areas in Miami-Dade and Palm Beach by request." },
    { q: "Is pressure cleaning safe for my roof and plants?", a: "We use a soft-wash approach for roofs and pre-wet landscaping to protect plants. We also rinse surfaces thoroughly." },
    { q: "Can you schedule early mornings or weekends?", a: "Absolutely. We work around traffic and business hours—early mornings, weekends, or off-peak times." },
    { q: "Do you offer financing?", a: "Yes. Through Klarna via Stripe. Choose 'Finance with Klarna' on this page to apply." },
    { q: "Do you handle commercial/HOA properties?", a: "Yes. We offer long-term and multi-site schedules with flexible pricing and photo documentation." }
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

/* ---------- Gallery (2 columns, public paths only) ---------- */
function BeforeAfterGallery() {
  // Only include images that actually exist in /public/images/
  const photos = [
    { src: "/images/condo-dirty.jpg",                  width: 800, height: 600, alt: "Dirty condo sidewalk before and after cleaning", title: "Condo Sidewalk – Before and After" },
    { src: "/images/before-and-after-bulldozer-2.jpg", width: 800, height: 600, alt: "Bulldozer before and after cleaning", title: "Bulldozer – Before & After" },
    { src: "/images/before-and-after-house-2.jpg",     width: 800, height: 600, alt: "House exterior before and after cleaning", title: "House Exterior – Before & After" },
    { src: "/images/gas-station-before-and-after.jpg", width: 800, height: 600, alt: "Gas station before and after cleaning", title: "Gas Station – Before & After" }
  ];
  const [index, setIndex] = React.useState(-1);

  return (
    <section id="gallery" style={{ padding: "60px 20px", backgroundColor: "#f8f8f8" }}>
      <div style={container}>
        <h2 style={{ ...h2, textAlign: "center", marginBottom: 12 }}>Before &amp; After Gallery</h2>
        <p style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 28px", fontSize: "1.05rem", color: colors.sub }}>
          See the difference professional cleaning makes. Every job is done with care, precision, and results you can see immediately.
        </p>

        <PhotoAlbum
          layout="columns"
          photos={photos}
          columns={(w) => (w < 600 ? 1 : 2)}   // 1 column on mobile, 2 on larger screens
          spacing={8}
          renderPhoto={({ wrapperStyle, imageProps, photo }) => (
            <div style={{ ...wrapperStyle }}>
              <img {...imageProps} alt={photo.alt} style={{ width: "100%", height: "auto", borderRadius: 8 }} />
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6, textAlign: "center" }}>{photo.title}</div>
            </div>
          )}
          onClick={({ index }) => setIndex(index)}
        />

        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={photos.map((p) => ({ src: p.src, alt: p.alt }))}
        />
      </div>
    </section>
  );
}

/* ---------- Checkout form (Stripe) ---------- */
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

/* ---------- App ---------- */
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

      {/* Hero */}
      <section style={{ padding: "3rem 1rem", background: colors.panel, borderBottom: `1px solid ${colors.borderDark}` }}>
        <div style={container}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            <img
              src="/images/veteran-owned.png"
              alt="Veteran Owned"
              style={{ height: 48, width: "auto" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <ImageWithFallback
              srcs={[
                "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
              ]}
              alt="Klarna"
              style={{ height: 28 }}
            />
          </div>

          <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem", fontWeight: 800, color: "white", textAlign: "center" }}>
            G-Force Exterior Cleaning
          </h1>
          <p style={{ fontSize: "1.05rem", maxWidth: 880, margin: "0 auto", color: "#cbd5e1", textAlign: "center" }}>
            <strong>G-Force Exterior Cleaning Services</strong> provides professional <strong>pressure cleaning in Broward County</strong> and the surrounding South Florida area. We help homes, HOAs, and commercial properties look their best while protecting roofs, paint, and landscaping. Our services include pressure washing driveways, roof cleaning, and full exterior cleaning. We schedule around your needs—early mornings, weekends, or off-peak hours—and we offer financing and flexible pricing, especially for long-term and multi-site contracts. Expect clear communication, photo documentation, and results you can see.
          </p>

          <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={btnSolid}>Free Quote</a>
            <button style={btnOutline} onClick={() => setShowModal(true)}>Finance with Klarna</button>
            <a href={COMMERCIAL_URL} target="_blank" rel="noreferrer" style={btnOutline}>Commercial Services</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "2rem 1rem" }}>
        <div style={container}>
          <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>Services</h2>
          <ul style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 8, color: colors.sub }}>
            <p style="text-align:center;margin-top:12px;color:#64748b">
  Service details:
              
  <li><a href="/services/soft-wash-roof-cleaning.html" style={{ color: colors.ink, textDecoration: "underline" }}>Soft-wash roof cleaning</a></li>
  <li><a href="/services/house-and-building-wash.html" style={{ color: colors.ink, textDecoration: "underline" }}>House &amp; building wash</a></li>
  <li><a href="/services/pressure-cleaning-driveways-sidewalks-pavers.html" style={{ color: colors.ink, textDecoration: "underline" }}>Pressure Cleaning – Driveways, sidewalks &amp; pavers (sealing optional)</a></li>
  <li><a href="/services/hoa-and-commercial-schedules.html" style={{ color: colors.ink, textDecoration: "underline" }}>HOA &amp; commercial schedules</a></li>
  <li><a href="/services/heavy-equipment-and-dumpster-pads.html" style={{ color: colors.ink, textDecoration: "underline" }}>Heavy equipment &amp; dumpster pads</a></li>
</ul>
        </div>
      </section>

      <Testimonials />
      <BeforeAfterGallery />
      <FAQ />

      {/* Contact */}
      <section id="contact" style={{ padding: "2rem 1rem" }}>
        <div style={container}>
          <h2 style={{ ...h2, marginBottom: 12, textAlign: "center" }}>Get Your Free Quote</h2>
          <p style={{ textAlign: "center", color: colors.sub, marginBottom: 16 }}>
            Prefer to call? <a href="tel:+17543340220" style={{ color: colors.ink }}>(754) 334-0220</a>
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

      {/* Footer */}
      <footer style={{ padding: "1.25rem", background: colors.ink, color: "white", textAlign: "center", borderTop: `1px solid ${colors.borderDark}` }}>
        <div style={{ ...container, display: "grid", gap: 10 }}>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
            <img
              src="/images/veteran-owned.png"
              alt="Veteran Owned"
              style={{ height: 40, width: "auto" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <ImageWithFallback
              srcs={[
                "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
              ]}
              alt="Klarna"
              style={{ height: 32, filter: "invert(1)" }}
            />
          </div>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} G-Force Exterior Cleaning Services</p>
        </div>
      </footer>

      {/* Modal: Klarna / Stripe */}
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
const container = { maxWidth: 980, margin: "0 auto" };
const sectionCard = { background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: 16, boxShadow: "0 1px 2px rgba(2,6,23,0.06)" };
const modalBackdrop = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12, zIndex: 50 };
const modalCard = { background: colors.cardBg, borderRadius: 16, padding: 16, width: "100%", maxWidth: 520, boxShadow: "0 12px 30px rgba(2,6,23,0.24)", border: `1px solid ${colors.border}` };
const xBtn = { background: "transparent", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1 };
const label = { display: "grid", gap: 6, fontSize: 14, color: colors.text };
const input = { width: "100%", padding: "10px 12px", borderRadius: 12, border: `1px solid ${colors.border}`, background: "#fff", marginTop: 4 };
