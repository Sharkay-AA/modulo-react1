import React, { createContext, useState } from "react";

export const SelectionProductsContext = createContext();

const SelectionProductsContextProvider = (props) => {
  let productCart = [];
  
  const [selectionProducts, setSelectionProducts] = useState([]);



  return (
    <SelectionProductsContext.Provider
      value={{ selectionProducts, setSelectionProducts, productCart }}
    >
      {props.children}
    </SelectionProductsContext.Provider>
  );
};

export default SelectionProductsContextProvider;
