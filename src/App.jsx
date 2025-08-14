import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

/* ---------- tiny helper: image fallback (for Klarna logo reliability) ---------- */
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

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("350.00"); // default; change anytime

  async function startPayment() {
    try {
      const cents = Math.round(parseFloat(amount) * 100);
      if (!cents || cents <= 0) {
        alert("Enter a valid amount (e.g., 350.00)");
        return;
      }
      const res = await fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cents,
          currency: "usd",
          metadata: { source: "GForce Netlify" }
        })
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
      {/* Hero */}
      <section
        style={{
          padding: "4rem 1rem",
          background: "linear-gradient(180deg, #eef2ff 0%, #f8fafc 50%, #f1f5f9 100%)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={container}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.75rem", fontWeight: 800, color: colors.ink }}>
            G-Force Exterior Cleaning
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: 740, margin: "0 auto", color: colors.sub }}>
            Restore your curb appeal the safe, professional way. We work with any budget (especially on long-term
            contracts), keep cancellations to a minimum, and offer financing through Klarna for all projects.
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
            <ImageWithFallback
              srcs={[
                "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
              ]}
              alt="Klarna"
              style={{ height: 22 }}
            />
            <span style={{ fontSize: 12, color: colors.sub }}>*Subject to approval. Terms from Klarna.</span>
          </div>
          <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={btnSolid}>Call for a quote</a>
            <button style={btnOutline} onClick={() => setShowModal(true)}>Finance with Klarna</button>
          </div>
        </div>
      </section>

      {/* About Me (placeholder copy for now) */}
      <section style={{ padding: "2.5rem 1rem" }}>
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
      <section style={{ padding: "2.5rem 1rem" }}>
        <div style={container}>
          <h2 style={{ ...h2, marginBottom: 12 }}>Services</h2>
          <ul style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 8, color: colors.sub }}>
            <li>Soft-wash roof cleaning</li>
            <li>House & building wash</li>
            <li>Driveways, sidewalks & pavers (sealing optional)</li>
            <li>HOA & commercial schedules</li>
            <li>Heavy equipment & dumpster pads</li>
          </ul>
        </div>
      </section>
     
      <Testimonials />
      
<BeforeAfterGallery />
      
 /* ---------- Before & After (grid of split photos) ---------- */
function BeforeAfterGallery() {
  // 🔁 Replace these with your EXACT filenames in /public/images (case-sensitive)
  const images = [
    { src: "/images/ Gas station before and after ", alt: "Gas station" },
    { src: "/images/ Condo Dirty ", alt: "Condo dirty" },
    { src: "/images/ Before and after Bulldozer 2.jpg", alt: "Bulldozer" },
    { src: "/images/ Before and after House 2.jpg", alt: "House" },
  ];

  return (
    <section style={{ padding: "2.5rem 1rem", background: "#f8fafc" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12 }}>Before &amp; After</h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
          }}
        >
          {images.map((img, i) => (
            <div key={i} style={{ ...sectionCard, overflow: "hidden" }}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stripe checkout form (no email) ---------- */
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

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    {
      quote:
        "G-Force made our roof and driveway look brand new. On time, careful, and priced right.",
      name: "Erica P.",
      role: "Homeowner – Coral Springs",
      photo: "https://i.imgur.com/6VBx3io.png" // optional headshot; replace later
    },
    {
      quote:
        "Reliable, fast, and professional. Perfect for HOA common areas and sidewalks.",
      name: "David R.",
      role: "HOA Board Member – Pembroke Pines",
      photo: "https://i.imgur.com/6VBx3io.png"
    },
    {
      quote:
        "Our storefront shines after every service. Customers noticed immediately.",
      name: "Monique L.",
      role: "Retail Manager – Fort Lauderdale",
      photo: "https://i.imgur.com/6VBx3io.png"
    }
  ];

  return (
    <section style={{ padding: "2.5rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12 }}>What Clients Say</h2>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
          }}
        >
          {items.map((t, i) => (
            <div key={i} style={{ ...sectionCard, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `1px solid ${colors.border}`,
                    flexShrink: 0
                  }}
                >
                  <ImageWithFallback
                    srcs={[t.photo]}
                    alt={t.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
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

/* ---------- Before / After (single slider) ---------- */
function BeforeAfter({ beforeSrc, afterSrc, alt = "Before and after" }) {
  const [pos, setPos] = useState(50); // 0..100%
  return (
    <div style={{ ...sectionCard, position: "relative", overflow: "hidden", height: 320 }}>
      {/* Before image */}
      <img
        src={beforeSrc}
        alt={`${alt} - before`}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* After image clipped to slider position */}
      <div style={{ position: "absolute", inset: 0, width: `${pos}%`, overflow: "hidden`" }}>
        <img
          src={afterSrc}
          alt={`${alt} - after`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      {/* Drag slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        style={{ position: "absolute", left: 12, right: 12, bottom: 12, width: "calc(100% - 24px)" }}
        aria-label="Before/After slider"
      />
    </div>
  );
}

/* ---------- Before & After Gallery (section) ---------- */
function BeforeAfterGallery() {
  // Add your pairs here. Paths are relative to /public
  const pairs = [
    {
      before: "/images/roof-before.jpg",
      after: "/images/roof-after.jpg",
      alt: "Roof cleaning"
    },
    {
      before: "/images/driveway-before.jpg",
      after: "/images/driveway-after.jpg",
      alt: "Driveway cleaning"
    },
    // Add more like:
    // { before: "/images/pavers-before.jpg", after: "/images/pavers-after.jpg", alt: "Paver cleaning" },
  ];

  return (
    <section style={{ padding: "2.5rem 1rem" }}>
      <div style={container}>
        <h2 style={{ ...h2, marginBottom: 12 }}>Before &amp; After</h2>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {pairs.map((p, i) => (
            <BeforeAfter key={i} beforeSrc={p.before} afterSrc={p.after} alt={p.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- style tokens (polished) ---------- */
const colors = {
  ink: "#0f172a",
  text: "#0f172a",
  sub: "#475569",
  border: "#e2e8f0",
  accent: "#0f172a",
  pageBg: "#f1f5f9",
  cardBg: "#ffffff",
};

const btnSolid = {
  background: colors.accent,
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14,
};

const btnOutline = {
  background: "transparent",
  color: colors.accent,
  border: `1px solid ${colors.border}`,
  padding: "12px 16px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14,
};

const h2 = {
  fontSize: "1.75rem",
  fontWeight: 800,
  textAlign: "center",
  margin: 0,
  color: colors.text,
};

const container = { maxWidth: 960, margin: "0 auto" };

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
