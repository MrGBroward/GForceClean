// File: netlify/functions/create-payment-intent.js
const Stripe = require('stripe');

// ⬇️ THIS is where your Netlify env var is read.
// Make sure Site settings → Environment variables has STRIPE_SECRET_KEY set.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

exports.handler = async (event) => {
  // Optional: basic CORS for local tests / cross-origin forms
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { amount, currency = 'usd', customer_email, metadata } = JSON.parse(event.body || '{}');

    // Validate amount (Stripe expects an integer number of the smallest currency unit)
    if (!amount || isNaN(amount) || amount <= 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing or invalid amount' }) };
    }

    const intent = await stripe.paymentIntents.create({
      amount,                   // e.g. 35000 for $350.00
      currency,                 // 'usd'
      automatic_payment_methods: { enabled: true }, // enables Klarna when eligible
      receipt_email: customer_email,
      metadata,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ clientSecret: intent.client_secret }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: err.message || 'Failed to create PaymentIntent' }),
    };
  }
};
