import api from "./axios";

export const createStripeSession = (cartItems) => {
  return api.post("/payment/create-checkout-session", { cartItems });
};

export const createOrderAfterPayment = (sessionId) => {
  return api.post("/orders/create-after-payment", { sessionId });
};

export const getOrders = () => {
  return api.get("/orders");
};