/* eslint-disable react/prop-types */
import { Minus, Plus, Trash2 } from "lucide-react";

// One row in the shopping cart showing the plant, quantity controls, and remove button.
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-img"
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23e8f5e9' width='80' height='80'/%3E%3C/svg%3E";
        }}
      />
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-unit">₹{item.price} each</p>
      </div>

      <div className="cart-item-qty">
        <button
          className="qty-btn"
          onClick={() => onDecrease(item.id)}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onIncrease(item.id)}
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="cart-item-subtotal">₹{subtotal}</div>

      <button
        className="remove-btn"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default CartItem;
