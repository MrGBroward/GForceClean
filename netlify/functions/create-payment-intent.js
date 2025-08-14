const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
  try {
    const { amount, currency = 'usd', customer_email, metadata } = JSON.parse(event.body || '{}');
    if (!amount || isNaN(amount)) {
      return { statusCode: 400, body: 'Missing or invalid amount' };
    }
    const intent = await stripe.paymentIntents.create({
      amount,                      // integer cents, e.g. 25000 for $250.00
      currency,
      automatic_payment_methods: { enabled: true },  // enables Klarna when eligible
      receipt_email: customer_email,
      metadata
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientSecret: intent.client_secret })
    };
  } catch (e) {
    return { statusCode: 400, body: e.message };
  }
};
