import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import { addItem } from "./CartSlice";
import { categories, plants } from "./data/plants";
import PlantCard from "./components/PlantCard";

function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart || []);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isInCart = (plantId) => cart.some((item) => item.id === plantId);

  const filteredPlants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return plants.filter((plant) => {
      const matchesCategory = filter === "All" || plant.category === filter;
      const matchesSearch =
        query === "" ||
        plant.name.toLowerCase().includes(query) ||
        plant.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  const groupedPlants = useMemo(() => {
    if (filter !== "All") {
      return [];
    }

    return categories
      .map((category) => ({
        category,
        items: filteredPlants.filter((plant) => plant.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [filter, filteredPlants]);

  const hasSearch = searchQuery.trim().length > 0;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!plants || plants.length === 0) {
    return (
      <div className="products-page">
        <div className="empty-cart">
          <h1>No plants available</h1>
          <p>Please check back soon for our new collection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Our Plant Collection</h1>
        <p>
          Browse our handpicked selection of indoor plants and bring a little
          more greenery home.
        </p>
      </div>

      <div className="product-controls">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {hasSearch && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="category-filters">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">
        {filteredPlants.length} plant{filteredPlants.length !== 1 ? "s" : ""} found
        {hasSearch ? ` for "${searchQuery.trim()}"` : ""} • {cartCount} in cart
      </p>

      {filteredPlants.length === 0 ? (
        <div className="no-results">
          <Search size={48} className="no-results-icon" />
          <h2>No plants found</h2>
          <p>Try a different search term or category.</p>
          <button
            type="button"
            className="cta-btn"
            onClick={() => {
              setSearchQuery("");
              setFilter("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : filter !== "All" || hasSearch ? (
        <div className="plant-grid">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onAddToCart={handleAddToCart}
              inCart={isInCart(plant.id)}
            />
          ))}
        </div>
      ) : (
        groupedPlants.map((group) => (
          <section key={group.category} className="plant-category">
            <h2 className="category-title">{group.category}</h2>
            <div className="plant-grid">
              {group.items.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onAddToCart={handleAddToCart}
                  inCart={isInCart(plant.id)}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default ProductList;
