import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  const [notification, setNotification] = useState({ show: false, itemName: "" });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, cartQuantity: quantity }];
    });

    // Trigger notification
    setNotification({ show: true, itemName: product.name });
    setTimeout(() => {
      setNotification({ show: false, itemName: "" });
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.cartQuantity || 0),
      0
    );
  };
  
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        notification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
