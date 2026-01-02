import api from "./axios";

export const createOrder = () => {
  return api.post("/orders");
};

export const getOrders = () => {
  return api.get("/orders");
};