import React, { useContext, useState } from "react";
import { DisplayProductsContext } from "../../Context/DisplayProductsContext/DisplayProductsContext";
import { CartCountContext } from "../../Context/CartCountContext/CartCountContext";
import { SelectionProductsContext } from "../../Context/SelectionProductsContext/SelectionProductsContext";

function HomePage() {
  // Import des différents contextes
  const { displayProducts } = useContext(DisplayProductsContext);
  const { cartCount, setCartCount } = useContext(CartCountContext);
  const { productCart } = useContext(SelectionProductsContext);

  // Compteur de quantité a ajouter
  const [totalItemToAdd, setTotalItemToAdd] = useState(0);

// Fonction d'ajout d'item dans le panier
  const addItem = (e) => {
    e.preventDefault();
    const id = Number(e.target.id);

    // Produit selectionné
    const itemToAdd = displayProducts.find(product => product.id === id);

    // Si panier vide : Ajout quantité choisie au produit , puis push dans tableaux des produits
    if (!productCart.length) {
      itemToAdd.count = totalItemToAdd;
      productCart.push(itemToAdd);

    // Si panier contient deja des articles
    } else if (productCart.length) {
      const itemSearch = productCart.find(product  => product.id === id);

      // Si le panier contient l'article qu'on selectionne : Incrementation de la quantitée
      if (itemSearch) {
        itemSearch.count += totalItemToAdd;

      // Si le panier ne contient pas l'article que l'on selectionne : Ajout d'un nouveau produit
      } else {
        itemToAdd.count = totalItemToAdd;
        productCart.push(itemToAdd);
      }
    }
    return productCart;
  };


// Fonction de soumission du formulaire : Produit + quantité
  const handleSubmit = (e) => {
    e.preventDefault();

  // Incrémentation du badge d'indication du nombre de produit dans le panier 
    setCartCount(cartCount + totalItemToAdd);

  // Appel de la fonction d'ajout d'item
    addItem(e);

  // Reinitialisation de la valeur de l'input
    e.target[0].value = 0;

  // Reintialisation du compteur de quantité a ajouter
    setTotalItemToAdd(0);
  };

// Fonction de selection de quantité a ajouter
  const itemQuantityChange = (e) => {
    e.preventDefault();

  // Incrementation du compteur de quantité 
    setTotalItemToAdd(Number(e.target.value));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="row justify-content-center">
        {displayProducts.map( product => (
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
                  onChange={(e) => itemQuantityChange(e)}
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
