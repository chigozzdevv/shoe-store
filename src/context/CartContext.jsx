// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';
import { useShoeStore } from '../data/shoesData';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { shoes, getSizeQuantity } = useShoeStore();
  
  const addToCart = (product, size) => {
    // Check if we have enough stock of this size
    const availableQuantity = getSizeQuantity(product.id, size);
    
    if (availableQuantity <= 0) {
      alert("Sorry, this size is out of stock.");
      return;
    }
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.size === size);
      
      if (existingItem) {
        // Check if we would exceed available quantity
        if (existingItem.quantity + 1 > availableQuantity) {
          alert(`Sorry, we only have ${availableQuantity} of size ${size} in stock.`);
          return prevItems;
        }
        
        return prevItems.map(item => 
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, size }];
      }
    });
  };
  
  const removeFromCart = (id, size) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size)));
  };
  
  const updateQuantity = (id, size, quantity) => {
    // Get the actual available quantity
    const availableQuantity = getSizeQuantity(id, size);
    
    // Prevent setting more than available quantity
    if (quantity > availableQuantity) {
      alert(`Sorry, we only have ${availableQuantity} of size ${size} in stock.`);
      return;
    }
    
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal,
      cartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;