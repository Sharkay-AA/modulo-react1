import React, { useContext, useEffect, useState } from "react";
import { SelectionProductsContext } from "../../Context/SelectionProductsContext/SelectionProductsContext";
import { CartCountContext } from "../../Context/CartCountContext/CartCountContext";

import "./Cart.css";

function Cart() {
  // Import des différents contextes
  const { productCart, setProductCart } = useContext(SelectionProductsContext);
  const { cartCount, setCartCount } = useContext(CartCountContext);

  // Produit a modifier
  const [item, setItem] = useState();


// Lorsque le panier change , actualisation des produits
  useEffect(() => {
    setItem(productCart);
  }, [productCart]);

// Fonction de modification de la quantité
  const handleValueChange = (e) => {
    e.preventDefault();

    // Selection du produit a modifier
    const itemChange = item.find(product => product.id === Number(e.target.id));

    // Enregistrement de la quantité actuelle : Pour la gestion d'incrémentation / décrémentation du badge 
    const oldCount = itemChange.count;

    // Modification de la quantité
    itemChange.count = Number(e.target.value);

    // Enregistrement de la nouvelle quantité :  Pour la gestion d'incrémentation / décrémentation du badge 
    const newCount = itemChange.count;

    // Si l'ancienne quantité est supérieure a la nouvelle : décrémentation du badge
    if (oldCount > newCount) {
      setCartCount(cartCount - 1);

    // Si l'ancienne quantité est inférieure a la nouvelle : incrémentation du badge
    } else {
      setCartCount(cartCount + 1);
    }
  };

// Fonction de suppresion d'un produit
  const deleteItem = (e) => {
    e.preventDefault();

    // Selection du produit a supprimer
    const itemtoDelete = productCart.find(product => product.id === Number(e.target.id));

    // Enregistrement des produis restant après avoir retiré le produit choisi
    const itemsLeft = item.filter(product => product.id !== Number(e.target.id));

    // Modification du badge en décrémentant de la quantité du produit supprimé
    setCartCount(cartCount - itemtoDelete.count);

    // Mise a jour du panier avec les produits restants
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
