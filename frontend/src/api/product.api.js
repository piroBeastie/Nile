import api from "./axios";

export const getAllProducts = () =>
  api.get("/products");

export const getProductById = (id) =>
  api.get(`/products/${id}`);
