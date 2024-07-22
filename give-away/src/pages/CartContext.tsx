  import React, {
    createContext,
    useReducer,
    useContext,
    ReactNode,
    useEffect,
  } from "react";
  import { Modal } from "antd";

  interface Product {
    itemId: any;
    name: string;
    sellingPrice: number;
    color: string;
    size: string;
    gender: string;
    brand: string;
    shopAddress: string;
  }

  interface CartState {
    cartItems: Product[];
    userId: string | null;
    itemToRemove: Product | null;
  }

  type CartAction =
    | { type: "ADD_TO_CART"; payload: Product }
    | { type: "REMOVE_FROM_CART"; payload: any }
    | { type: "SET_USER"; payload: string | null }
    | { type: "CLEAR_CART" };

  const initialState: CartState = {
    cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
    userId: null,
    itemToRemove: null,
  };

  const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
      case "ADD_TO_CART":
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      case "REMOVE_FROM_CART":
        const updatedCartItems = state.cartItems.filter(
          (item) => item.itemId !== action.payload.itemId
        );
        return { ...state, cartItems: updatedCartItems, itemToRemove: null };
      case "SET_USER":
        return { ...state, userId: action.payload, cartItems: [] };
      case "CLEAR_CART":
        return { ...state, cartItems: [] };
      default:
        return state;
    }
  };

  interface CartContextType {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
    isItemInCart: (itemId: any) => boolean;
  }

  const CartContext = createContext<CartContextType>({
    state: initialState,
    dispatch: () => null,
    isItemInCart: () => false,
    
  });

  export const useCart = () => useContext(CartContext);

  export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    const isItemInCart = (itemId: any) => {
      return state.cartItems.some((item) => item.itemId === itemId);
    };

    return (
      <CartContext.Provider value={{ state, dispatch, isItemInCart }}>
        {children}
      </CartContext.Provider>
    );
  };
