// netlify/functions/create-payment-intent.js

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Netlify Function to create a Stripe Payment Intent
 */
exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { amount, currency } = JSON.parse(event.body);

    if (!amount || !currency) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing amount or currency" }),
      };
    }

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
