import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const { amount, currency = 'usd', customer_email, metadata } = req.body || {};
    if (!amount || isNaN(amount)) return res.status(400).json({ error: 'Missing or invalid amount' });
    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      receipt_email: customer_email,
      metadata
    });
    res.status(200).json({ clientSecret: intent.client_secret });
  } catch (e) { res.status(400).json({ error: e.message }); }
}
