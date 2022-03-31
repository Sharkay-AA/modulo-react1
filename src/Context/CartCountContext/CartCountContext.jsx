import React, { createContext, useState } from "react";

export const CartCountContext = createContext();

const CartCountContextProvider = (props) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartCountContext.Provider value={{ cartCount, setCartCount }}>
      {props.children}
    </CartCountContext.Provider>
  );
};

export default CartCountContextProvider;
