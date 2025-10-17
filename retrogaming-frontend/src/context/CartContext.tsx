import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CartItem {
  product_id: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product_id: number, quantity?: number) => void;
  removeFromCart: (product_id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product_id: number, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product_id === product_id);
      if (existing) {
        return prev.map(item =>
          item.product_id === product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product_id, quantity }];
      }
    });
  };

  const removeFromCart = (product_id: number) => {
    setCart(prev => prev.filter(item => item.product_id !== product_id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
};