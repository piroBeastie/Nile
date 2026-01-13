import api from "./axios";

export const addToCart = (productId, quantity = 1) => {
  return api.post("/cart", {
    productId,
    quantity, 
  });
};

export const getCart = () => {
  return api.get("/cart");
};

export const removeFromCart = (itemId) => {
  return api.delete(`/cart/${itemId}`); 
};

export const updateCartQty = (itemId, quantity) => {
  return api.put(`/cart/${itemId}`, {
    quantity,
  });
};