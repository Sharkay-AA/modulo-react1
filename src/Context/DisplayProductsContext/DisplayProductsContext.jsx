import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DisplayProductsContext = createContext();

const DisplayProductsContextProvider = (props) => {
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?albumId=1&_limit=10")
      .then((res) => {
        setDisplayProducts(res.data);
      });
  }, []);

  return (
    <DisplayProductsContext.Provider value={{ displayProducts }}>
      {props.children}
    </DisplayProductsContext.Provider>
  );
};

export default DisplayProductsContextProvider;
