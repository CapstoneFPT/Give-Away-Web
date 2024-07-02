import React, { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";

interface Product {
  id: number;
  name: string;
  category: string;
  clothType?: string;
  image: any;
  new_price: number;
  old_price: number;
}

interface CartItem {
  id: number; // Only ID is needed to identify the product in the cart
}

interface ShopContextValue {
  all_product: Product[];
  cartItems: CartItem[];
  addToCart: (productId: number) => void; // Quantity removed
  removeFromCart: (productId: number) => void;
}

export const ShopContext = createContext<ShopContextValue | null>(null);

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productId: number) => {
    // Directly add the product to the cart without quantity
    setCartItems((prev) => [...prev, { id: productId }]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const contextValue: ShopContextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  console.log(cartItems);
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
