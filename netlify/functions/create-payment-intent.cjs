const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
    }
    const { amount, currency } = JSON.parse(event.body || "{}");
    if (!amount || !currency) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing amount or currency" }) };
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true }
    });
    return { statusCode: 200, body: JSON.stringify({ clientSecret: paymentIntent.client_secret }) };
  } catch (err) {
    console.error("Stripe error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
