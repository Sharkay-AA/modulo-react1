import React, { useContext, useState } from "react";
import { CartCountContext } from "../../Context/CartCountContext/CartCountContext";
import { DisplayProductsContext } from "../../Context/DisplayProductsContext/DisplayProductsContext";
import { SelectionProductsContext } from "../../Context/SelectionProductsContext/SelectionProductsContext";

function HomePage() {
  const { displayProducts } = useContext(DisplayProductsContext);
  const { cartCount, setCartCount } = useContext(CartCountContext);
  const { productCart } = useContext(SelectionProductsContext);

  const [totalItemToAdd, setTotalItemToAdd] = useState(0);

  const addItem = (e) => {
    e.preventDefault();
    const id = Number(e.target.id);
    const itemToAdd = displayProducts.find((product) => product.id === id);

    if (!productCart.length) {
      itemToAdd.count = totalItemToAdd;
      productCart.push(itemToAdd);
    } else if (productCart.length) {
      const itemExist = productCart.find((product) => product.id === id);

      if (itemExist) {
        itemExist.count += totalItemToAdd;
      } else {
        itemToAdd.count = totalItemToAdd;
        productCart.push(itemToAdd);
      }
    }
    return productCart;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCartCount(cartCount + totalItemToAdd);
    addItem(e);
    e.target[0].value = 0;
    setTotalItemToAdd(0);
  };

  const handleValueChange = (e) => {
    e.preventDefault();
    setTotalItemToAdd(Number(e.target.value));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="row justify-content-center">
        {displayProducts.map((product) => (
          <div key={product.id} className="card m-4" style={{ width: "18rem" }}>
            <img src={product.url} alt="" />
            <div className="card-body m-2">
              <h3>{product.title}</h3>
            </div>
            <form id={product.id} onSubmit={(e) => handleSubmit(e)}>
              <div className="d-flex flex-column align-items-center ">
                <h5>Quantité</h5>
                <input
                  id={product.id}
                  className="m-5 border border-dark"
                  type="number"
                  min="1"
                  defaultValue="0"
                  onChange={(e) => handleValueChange(e)}
                />
                <button className="btn btn-warning">Ajouter au panier</button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
