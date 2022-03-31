import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartCountContext } from "../Context/CartCountContext/CartCountContext";

function Navbar(props) {
  const { cartCount } = useContext(CartCountContext);

  return (
    <nav className="navbar navbar-light bg-light justify-content-center align-items-baseline">
      <Link className="navbar-brand" to="/">
        Accueil
      </Link>
      <Link className="navbar-brand" to="cart">
        Panier{" "}
        <span className="d-inline-flex w-50 justify-content-center bg-danger border rounded-circle p-1 text-white">
          {cartCount}
        </span>
      </Link>
    </nav>
  );
}

export default Navbar;
