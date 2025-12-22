import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems(prev => {
      const exists = prev.find(p => p._id === product._id);
      if (exists) return prev;
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function addToCart(product) {
    setCartItems(prev => {
        const exists = prev.find(p => p._id === product._id);

        if (exists) {
            return prev.map(item =>
                item._id === product._id
                ? { ...item, qty: item.qty + 1 }
                : item
            );
        }

        return [...prev, { ...product, qty: 1 }];
    });
  }

  function increaseQty(id) {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  }

  function decreaseQty(id) {
    setCartItems(prev =>
      prev
        .map(item =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );
  }


  function removeFromCart(id) {
    setCartItems(prev => prev.filter(item => item._id !== id));
  }

  return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart, increaseQty, decreaseQty}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}