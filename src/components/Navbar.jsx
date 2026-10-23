import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Leaf } from "lucide-react";

// Top navigation bar shown on every page.
// Shows the logo, a link to the products page, and the cart icon with item count.
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
        <Link to="/cart" className="cart-link">
          <ShoppingCart size={22} />
          <span className="cart-count">{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
