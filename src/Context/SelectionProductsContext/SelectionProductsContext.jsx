import React, { createContext, useState } from "react";

export const SelectionProductsContext = createContext();

const SelectionProductsContextProvider = (props) => {
  const [productCart, setProductCart] = useState([]);

  return (
    <SelectionProductsContext.Provider value={{ productCart, setProductCart }}>
      {props.children}
    </SelectionProductsContext.Provider>
  );
};

export default SelectionProductsContextProvider;
