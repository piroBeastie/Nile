import express from "express";
import stripe from "../config/stripe.js";
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/create-checkout-session", protect, async (req, res) => {
  const { cartItems } = req.body;

  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.product.name,
        images: [item.product.image],
      },
      unit_amount: item.product.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

  res.json({ url: session.url });
});

export default router;