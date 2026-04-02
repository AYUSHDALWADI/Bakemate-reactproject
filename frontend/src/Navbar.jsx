import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">Bakemate</Link>

      
    </nav>
  );
}

export default Navbar;
