import React from 'react'

export default function App() {
  // Example of a safe public image reference (no bundler import needed):
  // Put your file at: public/images/gas-station-before-and-after.jpg
  // Then reference it like this:
  const exampleImg = '/images/gas-station-before-and-after.jpg' // optional; remove if you don't have it yet

  return (
    <main style={{ fontFamily: 'system-ui, Arial, sans-serif', lineHeight: 1.5, padding: 24 }}>
      <h1>G-Force Exterior Cleaning Services</h1>
      <p>Site is live. Replace this content with your real components.</p>

      <section style={{ marginTop: 16, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Before & After (Example)</h2>
        <p>
          If you place an image at <code>public/images/gas-station-before-and-after.jpg</code>, it will appear below.
        </p>
        <img
          src={exampleImg}
          alt="Gas station before and after (example)"
          style={{ maxWidth: '100%', borderRadius: 8 }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </section>
    </main>
  )
}
