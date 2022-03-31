import React, { useContext, useEffect, useState } from "react";
import { SelectionProductsContext } from "../../Context/SelectionProductsContext/SelectionProductsContext";
import { CartCountContext } from "../../Context/CartCountContext/CartCountContext";

import "./Cart.css";

function Cart() {
  const { productCart, setProductCart } = useContext(SelectionProductsContext);
  const { cartCount, setCartCount } = useContext(CartCountContext);

  const [item, setItem] = useState();

  useEffect(() => {
    setItem(productCart);
  }, [productCart]);

  console.log("product", productCart);
  console.log("item", item);

  const handleValueChange = (e) => {
    e.preventDefault();
    const itemChange = item.find(
      (product) => product.id === Number(e.target.id)
    );
    const oldCount = itemChange.count;
    itemChange.count = Number(e.target.value);
    const newCount = itemChange.count;

    if (oldCount > newCount) {
      setCartCount(cartCount - 1);
    } else {
      setCartCount(cartCount + 1);
    }

    console.log(item);
  };

  const deleteItem = (e) => {
    e.preventDefault();
    const itemtoDelete = productCart.find(
      (product) => product.id === Number(e.target.id)
    );
    const itemsLeft = item.filter(
      (product) => product.id !== Number(e.target.id)
    );
    setCartCount(cartCount - itemtoDelete.count);
    setProductCart(itemsLeft);
  };

  return (
    <>
      {item?.length ? (
        item.map((product) => (
          <div className="d-flex align-items-center m-4" key={product.id}>
            <img src={product.url} alt="" style={{ width: "18rem" }} />
            <div className="m-2">
              <h3>{product.title}</h3>
            </div>
            <div className="d-flex align-items-center ">
              <h5>Quantité</h5>
              <input
                id={product.id}
                className="m-5 border border-dark"
                type="number"
                min="1"
                defaultValue={product.count}
                onChange={(e) => handleValueChange(e)}
              />
              <button
                className="btn btn-warning"
                type="submit"
                id={product.id}
                onClick={(e) => deleteItem(e)}
              >
                Supprimer le produit
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="panier">Votre panier est vide</h1>
      )}
    </>
  );
}

export default Cart;
