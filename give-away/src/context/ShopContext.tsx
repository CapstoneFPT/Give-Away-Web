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

interface Cart {
  [key: number]: number;
}

interface ShopContextValue {
  all_product: Product[];
  cartItems: Cart;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
}

export const ShopContext = createContext<ShopContextValue | null>(null);

const getDefaultCart = (): Cart => {
  let cart: Cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [cartItems, setCartItems] = useState<Cart>(getDefaultCart());

  const addToCart = (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const contextValue: ShopContextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
