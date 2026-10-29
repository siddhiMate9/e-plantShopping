
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ShoppingCart, Trash2 } from "lucide-react";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart || []);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const grandTotal = cart.reduce(
    (total, item) =>
      total + Number(item.cost ?? item.price ?? 0) * Number(item.quantity || 0),
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: Number(item.quantity || 0) + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      handleRemove(item);
      return;
    }

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    window.alert("Checkout coming soon!");
  };

  if (orderConfirmed) {
    return (
      <div className="cart-page">
        <div className="confirmation-box">
          <div className="confirmation-icon">
            <Check size={48} />
          </div>
          <h1>Order Confirmed!</h1>
          <p>
            Thank you for shopping with Paradise Nursery.
          </p>
          <button
            type="button"
            className="cta-btn"
            onClick={() => {
              setOrderConfirmed(false);
              navigate("/products");
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <ShoppingCart size={64} className="empty-cart-icon" />
          <h1>Your Cart is Empty</h1>
          <p>Looks like you have not added any plants yet.</p>
          <button
            type="button"
            className="cta-btn"
            onClick={() => navigate("/products")}
          >
            Browse Plants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Your Shopping Cart</h1>
        <p>
          {totalItems} plant{totalItems !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />

              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-unit-price">
                  ₹{item.cost ?? item.price} each
                </p>
              </div>

              <div
                className="cart-item-quantity"
                aria-label={`${item.name} quantity controls`}
              >
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => handleIncrement(item)}
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                ₹{(item.cost ?? item.price) * item.quantity}
              </div>

              <button
                type="button"
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
                aria-label={`Delete ${item.name}`}
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Plants</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row summary-total">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            type="button"
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          <button
            type="button"
            className="continue-shopping-btn"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft size={18} /> Continue Shopping
          </button>
        </aside>
      </div>
    </div>
  );
}

export default CartItem;
