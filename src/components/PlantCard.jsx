import { Plus, Check } from "lucide-react";
import { useState } from "react";

// A single product card shown in the grid on the Products page.
function PlantCard({ plant, onAddToCart, inCart }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="plant-card">
      <div className="plant-card-img-wrap">
        {imgError ? (
          <div className="plant-card-fallback">
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            src={plant.image}
            alt={plant.name}
            className="plant-card-img"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="plant-card-body">
        <h3 className="plant-card-name">{plant.name}</h3>
        <p className="plant-card-price">₹{plant.price}</p>
        <p className="plant-card-desc">{plant.description}</p>
        <button
          className="add-cart-btn"
          onClick={() => onAddToCart(plant)}
          disabled={inCart}
        >
          {inCart ? (
            <>
              <Check size={18} /> Added
            </>
          ) : (
            <>
              <Plus size={18} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export default PlantCard;
