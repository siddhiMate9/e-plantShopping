
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { addItem } from "./CartSlice";
import { categories, plants } from "./data/plants";
import PlantCard from "./components/PlantCard";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart || []);

  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Group plants under the required category headings.
  const plantsArray = useMemo(() => {
    return categories.reduce((result, category) => {
      result[category] = plants.filter(
        (plant) => plant.category === category
      );
      return result;
    }, {});
  }, []);

  // Track plants already added to the cart.
  const addedToCart = useMemo(() => {
    return cart.reduce((result, item) => {
      result[item.name] = true;
      return result;
    }, {});
  }, [cart]);

  const calculateTotalQuantity = () => {
    return cart.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    );
  };

  const handleAddToCart = (plant) => {
    if (!addedToCart[plant.name]) {
      dispatch(addItem(plant));
    }
  };

  const query = searchQuery.trim().toLowerCase();

  const filteredPlants = plants.filter((plant) => {
    const matchesCategory =
      filter === "All" || plant.category === filter;

    const matchesSearch =
      !query ||
      plant.name.toLowerCase().includes(query) ||
      (plant.description || "").toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const showGroupedCategories = filter === "All" && !query;

  const displayedGroups = showGroupedCategories
    ? Object.entries(plantsArray)
        .filter(([, items]) => items.length > 0)
        .map(([category, items]) => ({ category, items }))
    : [{ category: filter, items: filteredPlants }];

  return (
    <div className="products-page">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Paradise Nursery
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Plants</Link>
          <Link to="/cart" className="navbar-cart">
            <ShoppingCart size={20} />
            Cart
            <span id="cart_quantity_count">
              {calculateTotalQuantity()}
            </span>
          </Link>
        </div>
      </nav>

      <header className="page-header">
        <h1>Our Plant Collection</h1>
        <p>
          Discover beautiful plants and bring more greenery into your home.
        </p>
      </header>

      <div className="product-controls">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="search"
            className="search-input"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="category-filters">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              className={
                filter === category
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">
        {filteredPlants.length} plants found ·{" "}
        {calculateTotalQuantity()} items in cart
      </p>

      {filteredPlants.length === 0 ? (
        <div className="no-results">
          <h2>No plants found</h2>
          <p>Try another search or category.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="product-list">
          {displayedGroups.map((group) => (
            <section
              key={group.category}
              className="plant-category"
            >
              <h2 className="category-title">
                {group.category}
              </h2>

              <div className="plant-grid">
                {group.items.map((plant) => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    onAddToCart={handleAddToCart}
                    inCart={Boolean(addedToCart[plant.name])}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
