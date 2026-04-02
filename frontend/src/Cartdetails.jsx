
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cartdetails.css";
import Navbar from "./Navbar";

function Cartdetails() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    subtotal,
    discount,
    total
  } = useContext(CartContext);

  const navigate = useNavigate();

  // BACK BUTTON
  const handleBack = () => {
    navigate(-1); // go to previous page
  };

  // CHECKOUT CONDITION
  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
      alert("Please login to continue checkout");
      return;
    }

    navigate("/checkout");
  };

  return (
    <>
    <Navbar/>
    <div className="cart-page container mt-5">


      {/* BACK BUTTON */}
      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>

      <h2 className="mb-4">🛒 Your Cart</h2>

      {/* EMPTY CART */}
      {cartItems.length === 0 && (
        <p className="empty-cart">
          Your cart is empty. <br />
          <span>please order Something</span>
        </p>
      )}

      {/* CART ITEMS */}
      {cartItems.map(item => (
        <div className="cart-card" key={item.id}>
          
          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.name}
            className="cart-img"
          />

          {/* DETAILS */}
          <div className="cart-info">
            <h5>{item.name}</h5>
            <p className="price">₹{item.price}</p>

            <div className="qty-box">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>
          </div>

          {/* REMOVE */}
          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      {/* SUMMARY */}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="row">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>

          <div className="row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default Cartdetails;
