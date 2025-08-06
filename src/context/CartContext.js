import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const getLoggedInUserEmail = () => {
  try {
    const user = localStorage.getItem('userEmail')
    return user || null;
  } catch (error) {
    return null;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userEmail, setUserEmail] = useState(getLoggedInUserEmail());

  useEffect(() => {
    const email = getLoggedInUserEmail();
    setUserEmail(email);

    if (email) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userEmail]);

  const addToCart = (product, quantity = 1) => {
    const email = getLoggedInUserEmail();
    if (!email) return false;

    setUserEmail(email); 
    setCartItems(prev => {
      const exist = prev.find(item => item._id === product._id);
      if (exist) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });

    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const increaseQuantity = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


    const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
