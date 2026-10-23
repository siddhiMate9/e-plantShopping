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

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrease = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity <= 1) {
      dispatch(removeItem(id));
      return;
    }

    dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
  };

  const handleCheckout = () => {
    setOrderConfirmed(true);
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
            Thank you for your purchase. Your {totalItems} plant
            {totalItems > 1 ? "s" : ""} will be delivered soon. The total is
            ₹{grandTotal}.
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
          <button type="button" className="cta-btn" onClick={() => navigate("/products")}>
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
          {totalItems} plant{totalItems > 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-img"
                onError={(event) => {
                  event.target.style.display = "none";
                }}
              />

              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="cart-item-unit">₹{item.price} each</p>
              </div>

              <div className="cart-item-qty" aria-label={`${item.name} quantity controls`}>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => handleDecrease(item.id, item.quantity)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => handleIncrease(item.id, item.quantity)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">₹{item.price * item.quantity}</div>

              <button
                type="button"
                className="remove-btn"
                onClick={() => dispatch(removeItem(item.id))}
                aria-label={`Remove ${item.name} from cart`}
              >
                <Trash2 size={18} />
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
          <button type="button" className="checkout-btn" onClick={handleCheckout}>
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