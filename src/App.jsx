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
        // no email collected/sent per your request
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
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#0f172a", background: colors.pageBg }}>
      {/* Hero */}
      <section style={{ padding: "4rem 1rem", background: "#f8fafc", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.75rem", fontWeight: 800 }}>
          G-Force Exterior Cleaning
        </h1>
        <p style={{ fontSize: "1.1rem", maxWidth: 740, margin: "0 auto", color: "#475569" }}>
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
          <span style={{ fontSize: 12, color: "#64748b" }}>*Subject to approval. Terms from Klarna.</span>
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" style={btnSolid}>Call for a quote</a>
          <button style={btnOutline} onClick={() => setShowModal(true)}>Finance with Klarna</button>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "2.5rem 1rem", background: "#ffffff" }}>
        <h2 style={h2}>Services</h2>
        <ul style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 8, color: "#475569" }}>
          <li>Soft-wash roof cleaning</li>
          <li>House & building wash</li>
          <li>Driveways, sidewalks & pavers (sealing optional)</li>
          <li>HOA & commercial schedules</li>
          <li>Heavy equipment & dumpster pads</li>
        </ul>
      </section>

      {/* Contact (Netlify Form) */}
      <section id="contact" style={{ padding: "2.5rem 1rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ ...h2, marginBottom: 12 }}>Get Your Free Quote</h2>
          <p style={{ textAlign: "center", color: "#475569", marginBottom: 16 }}>
            Prefer to call? <a href="tel:+17543340220" style={{ color: "#0f172a" }}>(754) 334-0220</a>
          </p>

          {/* Netlify will detect this form and collect submissions in the dashboard */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            style={{ display: "grid", gap: 12, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16 }}
          >
            {/* Required hidden inputs for Netlify Forms */}
            <input type="hidden" name="form-name" value="contact" />
            <p style={{ display: "none" }}>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
              <label style={label}>
                Name
                <input name="name" required style={input} />
              </label>
              <label style={label}>
                Email
                <input type="email" name="email" required style={input} />
              </label>
            </div>

            <label style={label}>
              What would you like cleaned?
              <textarea name="message" rows={4} required style={{ ...input, resize: "vertical" }} />
            </label>

            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <button type="submit" style={btnSolid}>Send</button>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
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

      {/* Footer with Klarna badge */}
      <footer style={{ padding: "1.25rem", background: "#0f172a", color: "white", textAlign: "center" }}>
        <p>© {new Date().getFullYear()} G-Force Exterior Cleaning Services</p>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <ImageWithFallback
            srcs={[
              "https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/512px-Klarna_Logo_black.svg.png"
            ]}
            alt="Klarna"
            style={{ height: 22, marginTop: 6, filter: "invert(1)" }}
          />
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
                <label style={label}>
                  Project amount (USD)
                  <input
                    type="number"
                    step="0.01"
                    min="50"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={input}
                    placeholder="e.g., 350.00"
                  />
                </label>
                <button style={btnSolid} onClick={startPayment}>
                  Continue to payment
                </button>
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
      confirmParams: {
        return_url: window.location.href
      }
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

/* ---------- style tokens (polished) ---------- */
const colors = {
  ink: "#0f172a",
  text: "#0f172a",
  sub: "#475569",
  border: "#e2e8f0",
  accent: "#0f172a",
  pageBg: "#f1f5f9",     // NEW: soft page background
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

const container = { maxWidth: 960, margin: "0 auto" }; // NEW: consistent width

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

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: `1px solid ${colors.border}`,
  background: "#fff",
  marginTop: 4,
};

const h2 = { fontSize: "1.75rem", fontWeight: 800, textAlign: "center", margin: 0 };
const modalBackdrop = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12, zIndex: 50 };
const modalCard = { background: "#ffffff", borderRadius: 12, padding: 16, width: "100%", maxWidth: 520, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" };
const xBtn = { background: "transparent", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1 };
const label = { display: "grid", gap: 6, fontSize: 14, color: "#0f172a" };
const input = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #cbd5e1", marginTop: 4 };
