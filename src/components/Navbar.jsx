/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Leaf } from "lucide-react";

function Navbar({ cartCount }) {
  const location = useLocation();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <Leaf size={24} className="navbar-leaf" />
        <span>Paradise Nursery</span>
      </Link>

      <nav className="navbar-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Home
        </Link>
        <Link
          to="/products"
          className={
            location.pathname === "/products" ? "nav-link active" : "nav-link"
          }
        >
          Plants
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "nav-link active" : "nav-link"}
        >
          About Us
        </Link>
        <Link to="/cart" className="cart-link" aria-label="Shopping cart">
          <ShoppingCart size={22} />
          <span className="cart-count">{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
