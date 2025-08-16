import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

/** ====== Replace this with your real Squarespace URL when ready ====== */
const COMMERCIAL_URL = "https://www.gforceclean.com/";

/* ---------- tiny helper: image fallback ---------- */
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

/* ---------- Header with logo ---------- */
function Header() {
  return (
    <header style={{ background: colors.ink, color: "white", borderBottom: `1px solid ${colors.borderDark}` }}>
      <div style={{ ...container, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
        {/* Your logo (upload to public/images/logo.png) */}
        <img
          src="/images/logo.png"
          alt="G-Force Exterior Cleaning"
          style={{ height: 44, width: "auto", objectFit: "contain" }}
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

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    { quote: "G-Force made our roof and driveway look brand new. On time, careful, and priced right.", name: "Erica P.", role: "Homeowner – Coral Springs", photo: "https://i.imgur.com/6VBx3io.png" },
    { quote: "Reliable, fast, and professional. Perfect for HOA common areas and sidewalks.", name: "David R.", role: "HOA Board Member – Pembroke Pines", photo: "https://i.imgur.com/6VBx3io.png" },
    { quote: "Our storefront shines after every service. Customers noticed immediately.", name: "Monique L.", role: "Retail Manager – Fort Lauderdale", photo: "https://i.imgur.com/6VBx3io.png" }
  ];
  return (
    <section style={{ padding: "2.5rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12 }}>What Clients Say</h2>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {items.map((t, i) => (
            <div key={i} style={{ ...sectionCard, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: `1px solid ${colors.border}`, flexShrink: 0 }}>
                  <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: colors.sub }}>{t.role}</div>
                </div>
              </div>
              <p style={{ color: colors.sub, margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Before & After Gallery (no duplicates; uses /public/images) ---------- */
function BeforeAfterGallery() {
  // Only include images you actually have in public/images/
  const photos = [
    { src: "/images/condo-dirty.jpg",              width: 1600, height: 900, alt: "Condo exterior cleaning before & after in South Florida" },
    { src: "/images/before-and-after-house-2.jpg", width: 1600, height: 900, alt: "House pressure washing before & after in Broward County" },
    // Add more later as you upload them:
    // { src: "/images/before-and-after-bulldozer-2.jpg", width: 1600, height: 900, alt: "Heavy equipment pressure washing before & after" }
  ];
  const [index, setIndex] = React.useState(-1);

  return (
    <section style={{ padding: "2.5rem 1rem", background: colors.panel }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12 }}>Before &amp; After</h2>
        <PhotoAlbum layout="rows" photos={photos} targetRowHeight={260} onClick={({ index }) => setIndex(index)} />
        <Lightbox open={index >= 0} close={() => setIndex(-1)} slides={photos.map((p) => ({ src: p.src, alt: p.alt }))} />
      </div>
    </section>
  );
}

/* ---------- FAQ / Q&A (accordion) ---------- */
function FAQ() {
  const qas = [
    {
      q: "Do you serve all of Broward County?",
      a: "Yes—most of our work is in Broward, but we also cover nearby areas in Miami-Dade and Palm Beach by request."
    },
    {
      q: "Is pressure cleaning safe for my roof and plants?",
      a: "We use a soft-wash approach for roofs and pre-wet landscaping to protect plants. We also rinse surfaces thoroughly."
    },
    {
      q: "Can you schedule early mornings or weekends?",
      a: "Absolutely. We work around traffic and business hours—early mornings, weekends, or off-peak times."
    },
    {
      q: "Do you offer financing?",
      a: "Yes. Through Klarna via Stripe. Choose 'Finance with Klarna' on this page to apply."
    },
    {
      q: "Do you handle commercial/HOA properties?",
      a: "Yes. We offer long-term and multi-site schedules with flexible pricing and photo documentation."
    }
  ];
  const [open, setOpen] = useState(-1);

  return (
    <section style={{ padding: "2.5rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12 }}>Q&A</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {qas.map((item, i) => (
            <div key={i} style={{ ...sectionCard, overflow: "hidden" }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{ width: "100%", textAlign: "left", padding: 16, background: "transparent", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                aria-expanded={open === i}
              >
                <span style={{ fontWeight: 600 }}>{item.q}</span>
                <span style={{ opacity: 0.6 }}>{open === i ? "–" : "+"}</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 16px 16px 16px", color: colors.sub }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Social Links ---------- */
function SocialLinks() {
  const links = [
    { href: "https://facebook.com/", label: "Facebook" },
    { href: "https://instagram.com/", label: "Instagram" },
    { href: "https://www.google.com/maps", label: "Google" },
    { href: "https://yelp.com/", label: "Yelp" },
  ];
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ color: "white", opacity: 0.9 }}>
          {l.label}
        </a>
      ))}
    </div>
  );
}

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
      <section style={{ padding: "3.25rem 1rem", background: colors.panel, borderBottom: `1px solid ${colors.borderDark}` }}>
        <div style={container}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            {/* Veteran Owned badge (upload to public/images/veteran-owned.png) */}
            <img
              src="/images/veteran-owned.png"
              alt="Veteran Owned"
              style={{ height: 32, width: "auto" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <ImageWithFallback
              srcs={[
                "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
              ]}
              alt="Klarna"
              style={{ height: 18 }}
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

      {/* About */}
      <section style={{ padding: "2.25rem 1rem" }}>
        <div style={{ ...container, ...sectionCard, padding: 16 }}>
          <h2 style={{ ...h2, marginBottom: 8 }}>About G-Force</h2>
          <p style={{ color: colors.sub, margin: 0 }}>
            Hi, I’m Mr. G. I help homeowners, HOAs, and businesses in Broward keep properties looking their best with
            safe soft-wash methods and reliable scheduling. We’ll tailor a plan for your budget—one-time clean or VIP
            Maintenance—so you get predictable costs and great results.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "2.25rem 1rem" }}>
        <div style={container}>
          <h2 style={{ ...h2, marginBottom: 12 }}>Services</h2>
          <ul style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 8, color: colors.sub }}>
            <li>Soft-wash roof cleaning</li>
            <li>House & building wash</li>
            <li>Pressure Cleaning – Driveways, sidewalks & pavers (sealing optional)</li>
            <li>HOA & commercial schedules</li>
            <li>Heavy equipment & dumpster pads</li>
          </ul>
        </div>
      </section>

      <Testimonials />
      <BeforeAfterGallery />
      <FAQ />

      {/* Contact (Netlify Form) */}
    {/* Contact (Netlify Form) */}
<section id="contact" style={{ padding: "2.25rem 1rem" }}>
  <div style={container}>
    <h2 style={{ ...h2, marginBottom: 12 }}>Get Your Free Quote</h2>
    <p style={{ textAlign: "center", color: colors.sub, marginBottom: 16 }}>
      Prefer to call? <a href="tel:+17543340220" style={{ color: colors.ink }}>(754) 334-0220</a>
    </p>

    <ContactForm />
  </div>
</section>

          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thanks" style={{ ...sectionCard, padding: 16, display: "grid", gap: 12 }}>
            <input type="hidden" name="form-name" value="contact" />
            <p style={{ display: "none" }}><label>Don’t fill this out: <input name="bot-field" /></label></p>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
              <label style={label}>Name<input name="name" required style={input} /></label>
              <label style={label}>Email<input type="email" name="email" required style={input} /></label>
            </div>

            <label style={label}>What would you like cleaned?<textarea name="message" rows={4} required style={{ ...input, resize: "vertical" }} /></label>

            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button type="submit" style={btnSolid}>Send</button>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: colors.sub }}>
                <ImageWithFallback
                  srcs={[
                    "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
                  ]}
                  alt="Klarna"
                  style={{ height: 14 }}
                />
                <span>*Financing available.</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Footer with Veteran + Social */}
      <footer style={{ padding: "1.25rem", background: colors.ink, color: "white", textAlign: "center", borderTop: `1px solid ${colors.borderDark}` }}>
        <div style={{ ...container, display: "grid", gap: 10 }}>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
            <img
              src="/images/veteran-owned.png"
              alt="Veteran Owned"
              style={{ height: 26, width: "auto" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <ImageWithFallback
              srcs={[
                "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
              ]}
              alt="Klarna"
              style={{ height: 20, filter: "invert(1)" }}
            />
          </div>

          <SocialLinks />

          <p style={{ margin: 0 }}>© {new Date().getFullYear()} G-Force Exterior Cleaning Services</p>
        </div>
      </footer>

      {/* Stripe/Klarna Modal */}
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

/* ---------- Stripe checkout form ---------- */
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

/* ---------- styles ---------- */
const colors = {
  ink: "#0f172a",
  text: "#0f172a",
  sub: "#475569",
  border: "#e2e8f0",
  borderDark: "#1f2937",
  accent: "#0f172a",
  pageBg: "#e5e7eb",   // darker gray background
  cardBg: "#ffffff",
  panel: "#1f2937"     // dark hero/panel background
};

const btnSolid = {
  background: "#334155",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14,
};

const btnOutline = {
  background: "transparent",
  color: "white",
  border: `1px solid #94a3b8`,
  padding: "12px 16px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14,
};

const btnMini = {
  background: "#334155",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 13,
};

const btnMiniOutline = {
  background: "transparent",
  color: "white",
  border: `1px solid #94a3b8`,
  padding: "8px 12px",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 13,
};

const h2 = {
  fontSize: "1.75rem",
  fontWeight: 800,
  textAlign: "center",
  margin: 0,
  color: colors.text,
};

const container = { maxWidth: 980, margin: "0 auto" };

const sectionCard = {
  background: colors.cardBg,
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  boxShadow: "0 1px 2px rgba(2,6,23,0.06)",
};

const modalBackdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 12,
  zIndex: 50,
};

const modalCard = {
  background: colors.cardBg,
  borderRadius: 16,
  padding: 16,
  width: "100%",
  maxWidth: 520,
  boxShadow: "0 12px 30px rgba(2,6,23,0.24)",
  border: `1px solid ${colors.border}`,
};

const xBtn = { background: "transparent", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1 };
const label = { display: "grid", gap: 6, fontSize: 14, color: colors.text };
const input = { width: "100%", padding: "10px 12px", borderRadius: 12, border: `1px solid ${colors.border}`, background: "#fff", marginTop: 4 };
