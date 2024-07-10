import React, { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";
import axios from "axios";

export interface Product {
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
 
  cartItems: CartItem[];
  getAllProduct: (genderType: string) => Promise<Product[]>;

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

const getAllProduct = async (genderType: string) => {
  const response = await axios.get(`http://giveawayproject.jettonetto.org:8080/api/fashionitems?GenderType=${genderType}`);
  return response.data;
}

  const contextValue: ShopContextValue = {
    getAllProduct,
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
