import React, { useState } from "react";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1f2937" }}>
      {/* Hero Section */}
      <section style={{ padding: "4rem 1rem", background: "#f8fafc", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
          G-Force Exterior Cleaning
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: 600, margin: "0 auto" }}>
          Bringing back your home’s curb appeal with quality, care, and now — financing through Klarna for all projects.
        </p>
        <button
          onClick={() => setShowModal(true)}
          style={{
            marginTop: "1.5rem",
            background: "#2563eb",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Finance with Klarna
        </button>
      </section>

      {/* Services */}
      <section style={{ padding: "3rem 1rem", background: "#ffffff" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>
          Our Services
        </h2>
        <ul style={{ display: "grid", gap: "1rem", maxWidth: 800, margin: "0 auto" }}>
          <li>Pressure Washing</li>
          <li>Soft Wash Roof Cleaning</li>
          <li>House Washing</li>
          <li>Commercial Cleaning (Heavy Equipment, Dumpster Areas)</li>
          <li>HOA & Property Management Contracts</li>
        </ul>
      </section>

      {/* Reviews */}
      <section style={{ padding: "3rem 1rem", background: "#f1f5f9" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>
          What Our Clients Say
        </h2>
        <blockquote style={{ maxWidth: 700, margin: "0 auto", fontStyle: "italic" }}>
          “G-Force transformed our home’s appearance in one afternoon. Professional, friendly, and great attention to detail.” — Satisfied Customer
        </blockquote>
      </section>

      {/* FAQ */}
      <section style={{ padding: "3rem 1rem", background: "#ffffff" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p><strong>Q:</strong> Do you work with any budget?</p>
          <p><strong>A:</strong> Yes — especially for long-term contracts. We also have limited cancellations to keep projects on schedule.</p>
          <p><strong>Q:</strong> Do you offer financing?</p>
          <p><strong>A:</strong> Yes, all projects are eligible for financing through Klarna.</p>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: "3rem 1rem", background: "#f8fafc", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Get Your Free Quote</h2>
        <p>Call us at <a href="tel:7543340220">(754) 334-0220</a> or email <a href="mailto:bruce@gforcepressurewashing.com">bruce@gforcepressurewashing.com</a></p>
      </section>

      {/* Footer */}
      <footer style={{ padding: "1.5rem", background: "#1f2937", color: "white", textAlign: "center" }}>
        <p>© {new Date().getFullYear()} G-Force Exterior Cleaning Services</p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Klarna_Logo_black.svg/2560px-Klarna_Logo_black.svg.png"
          alt="Klarna"
          style={{ height: "30px", marginTop: "0.5rem" }}
        />
      </footer>

      {/* Klarna Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <div style={{ background: "white", padding: "2rem", borderRadius: "0.5rem", maxWidth: "500px" }}>
            <h3>Finance with Klarna</h3>
            <p>This is where your Klarna/Stripe integration will go.</p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "1rem",
                background: "#2563eb",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
