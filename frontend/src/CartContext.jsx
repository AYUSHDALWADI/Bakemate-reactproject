import { createContext, useState, useEffect } from "react";
import { imageMap } from "./imageMap";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    // GET from API
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/cart`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const merged = data.map(item => ({
            ...item.productId,
            qty: item.quantity,
            id: item.productId._id,
            image: imageMap[item.productId.image] || item.productId.image
          }));
          setCartItems(merged);
          localStorage.setItem("cart", JSON.stringify(merged));
        }
      })
      .catch(err => console.error(err));
  }, []);

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const addToCart = async (product) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id || product._id, quantity: 1 })
      });
    } catch (e) {
      console.error("Cart API Error", e);
    }

    setCartItems(prev => {
      const existing = prev.find(item => (item.id || item._id) === (product.id || product._id));
      if (existing) {
        return prev.map(item =>
          (item.id || item._id) === (product.id || product._id)
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // REMOVE
  const removeFromCart = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // QTY
  const increaseQty = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // TOTALS
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

 const discount =
  subtotal <= 500
    ? 50
    : subtotal <= 1000
    ? 100
    : 150;

  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        subtotal: subtotal.toFixed(2),
        discount,
        total: total.toFixed(2)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


