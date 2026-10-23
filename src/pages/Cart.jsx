import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Check, ArrowLeft } from "lucide-react";
import CartItem from "../components/CartItem";

// Shopping cart page — lists all cart items with quantity controls and totals.
// Also handles the checkout confirmation state.
function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const navigate = useNavigate();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Total number of individual plants in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Grand total price
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setOrderConfirmed(true);
  };

  // Order confirmation screen
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
            {totalItems > 1 ? "s" : ""} (total ₹{grandTotal}) will be delivered
            to your door soon. A confirmation email is on its way.
          </p>
          <button
            className="cta-btn"
            onClick={() => {
              // Clear confirmed state and send user back to products
              cart.forEach((item) => onRemove(item.id));
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

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <ShoppingCart size={64} className="empty-cart-icon" />
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven't added any plants yet.</p>
          <button className="cta-btn" onClick={() => navigate("/products")}>
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
        <p>{totalItems} plant{totalItems > 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
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
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
          <button
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

export default Cart;
