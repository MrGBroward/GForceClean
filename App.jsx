import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
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

// Load publishable key from Netlify env (Vite style). If empty, the modal will warn.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("350.00"); // change default if you like
  const [email, setEmail] = useState("");

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
          customer_email: email || undefined,
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
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#0f172a" }}>
      {/* Hero */}
      <section style={{ padding: "4rem 1rem", background: "#f8fafc", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.75rem", fontWeight: 800 }}>G-Force Exterior Cleaning</h1>
        <p style={{ fontSize: "1.1rem", maxWidth: 740, margin: "0 auto", color: "#475569" }}>
          Restore your curb appeal the safe, professional way. We work with any budget (especially on long-term
          contracts), keep cancellations to a minimum, and offer financing through Klarna for all projects.
        </p>
        <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg"
            alt="Klarna"
            style={{ height: 22 }}
          />
          <span style={{ fontSize: 12, color: "#64748b" }}>*Subject to approval. Terms from Klarna.</span>
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center" }}>
          <a href="#contact" style={btnSolid}>Get a same-day quote</a>
          <button style={btnOutline} onClick={() => setShowModal(true)}>Finance with Klarna</button>
        </div>
      </section>

      {/* Services (short) */}
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

      {/* Contact */}
      <section id="contact" style={{ padding: "2.5rem 1rem", background: "#f8fafc", textAlign: "center" }}>
        <h2 style={h2}>Get Your Free Quote</h2>
        <p>Call <a href="tel:+17543340220">(754) 334-0220</a> or email <a href="mailto:bruce@gforcepressurewashing.com">bruce@gforcepressurewashing.com</a></p>
      </section>

      {/* Footer with Klarna badge */}
      <footer style={{ padding: "1.25rem", background: "#0f172a", color: "white", textAlign: "center" }}>
        <p>© {new Date().getFullYear()} G-Force Exterior Cleaning Services</p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Klarna_Logo_black.svg"
          alt="Klarna"
          style={{ height: 22, marginTop: 6, filter: "invert(1)" }}
        />
      </footer>

      {/* Modal */}
      {showModal && (
        <div style={modalBackdrop} onClick={(e) => e.currentTarget === e.target && setShowModal(false)}>
          <div style={modalCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>Finance with Klarna</h3>
              <button onClick={() => setShowModal(false)} style={xBtn} aria-label="Close">✕</button>
            </div>

            {/* Pre-step: amount + email */}
            {!clientSecret && (
              <div style={{ display: "grid", gap: 10 }}>
                <label>
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
                <label>
                  Email (for receipt)
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={input}
                    placeholder="optional@you.com"
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

            {/* Payment Element step */}
            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm email={email} onClose={() => setShowModal(false)} />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CheckoutForm({ email, onClose }) {
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
        return_url: window.location.href, // after Klarna redirect
        receipt_email: email || undefined
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

// ------- tiny styles
const btnSolid = {
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14
};
const btnOutline = {
  background: "transparent",
  color: "#0f172a",
  border: "1px solid #cbd5e1",
  padding: "12px 16px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14
};
const h2 = { fontSize: "1.75rem", fontWeight: 800, textAlign: "center", margin: 0, marginBottom: "0.5rem" };
const modalBackdrop = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12, zIndex: 50 };
const modalCard = { background: "#ffffff", borderRadius: 12, padding: 16, width: "100%", maxWidth: 520, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" };
const xBtn = { background: "transparent", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1 };
const input = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #cbd5e1", marginTop: 4 };
