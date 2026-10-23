import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-content">
          <span className="hero-badge">
            🌿 Indoor Plant Specialists
          </span>
          <h1>
            Bring Nature <span className="hero-accent">Home.</span>
          </h1>
          <p className="hero-intro">
            Discover calming greenery, healthier living, and beautiful indoor
            plants that make every room feel fresh, vibrant, and alive. Paradise
            Nursery helps you turn your home into a peaceful green retreat.
          </p>
          <button type="button" className="cta-btn" onClick={() => navigate("/products")}>
            Get Started
          </button>
        </div>

        <div className="landing-visual" aria-label="Paradise Nursery plant collection">
          <div className="visual-card visual-card-large">
            <div className="visual-badge">Best Sellers</div>
            <h3>Air-purifying plants</h3>
            <p>Healthy homes start with greener living.</p>
          </div>
          <div className="visual-card visual-card-small">
            <span>100% plant care guidance</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const cartCount = useSelector((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar cartCount={cartCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>
            Paradise Nursery &mdash; Bring Nature Home. &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
