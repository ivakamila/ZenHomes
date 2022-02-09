import React, { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "../reducers/reducer";

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export const CartStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeFromCart = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };

  const addCount = (item) => {
    dispatch({
      type: "ADD_COUNT",
      payload: item,
    });
  };

  const minusCount = (item) => {
    dispatch({
      type: "MINUS_COUNT",
      payload: item,
    });
  };

  const emptyCart = () => {
    dispatch({
      type: "EMPTY_CART",
    });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        removeFromCart,
        addCount,
        minusCount,
        emptyCart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
