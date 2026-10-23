/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { plants, categories } from "../data/plants";
import PlantCard from "../components/PlantCard";

// Product listing page — displays plants with search and category filtering.
// The cart is managed in App.jsx and passed down via props.
function Products({ cart, onAddToCart }) {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Helper to check whether a plant is already in the cart
  const isInCart = (plantId) =>
    cart.some((item) => item.id === plantId);

  // Filter plants by both category and search query (name or description)
  const filteredPlants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return plants.filter((plant) => {
      const matchesCategory =
        filter === "All" || plant.category === filter;
      const matchesSearch =
        query === "" ||
        plant.name.toLowerCase().includes(query) ||
        plant.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  // Whether the search box has text — used to show the clear button
  const hasSearch = searchQuery.trim().length > 0;

  // Group filtered plants by category for display
  const groupedPlants = useMemo(() => {
    if (filter !== "All") return null;
    return categories
      .map((category) => ({
        category,
        items: filteredPlants.filter((p) => p.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [filter, filteredPlants]);

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Our Plant Collection</h1>
        <p>Browse our handpicked selection of indoor and house plants.</p>
      </div>

      {/* Search + Category filter bar */}
      <div className="product-controls">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {hasSearch && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="category-filters">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              className={filter === cat ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="result-count">
        {filteredPlants.length} plant{filteredPlants.length !== 1 ? "s" : ""} found
        {hasSearch && ` for "${searchQuery.trim()}"`}
      </p>

      {/* No results state */}
      {filteredPlants.length === 0 ? (
        <div className="no-results">
          <Search size={48} className="no-results-icon" />
          <h2>No plants found</h2>
          <p>Try a different search term or category.</p>
          <button
            className="cta-btn"
            onClick={() => {
              setSearchQuery("");
              setFilter("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : hasSearch || filter !== "All" ? (
        /* Flat grid when searching or a specific category is selected */
        <div className="plant-grid">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onAddToCart={onAddToCart}
              inCart={isInCart(plant.id)}
            />
          ))}
        </div>
      ) : (
        /* Grouped by category when no search and "All" is selected */
        groupedPlants.map((group) => (
          <section key={group.category} className="plant-category">
            <h2 className="category-title">{group.category}</h2>
            <div className="plant-grid">
              {group.items.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onAddToCart={onAddToCart}
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

export default Products;
