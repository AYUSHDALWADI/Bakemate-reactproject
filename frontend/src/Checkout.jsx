import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
function Checkout() {
  
  // BACK BUTTON
  const handleBack = () => {
    navigate(-1); // go to previous page
  };

  const { cartItems, subtotal, discount } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // FORM STATES
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [upi, setUpi] = useState("");

  if (cartItems.length === 0) {
    return (
      

      <div className="container mt-5">
        <h3>Your cart is empty</h3>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Shopping
        </button>
      </div>
    );
  }

  // FREE DELIVERY
  const deliveryCharge = 0;

  const total = subtotal - discount + deliveryCharge;

  const handleOrder = () => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (!isLoggedIn) {
      alert("Please login first 🔐");
      return;
    }

    // VALIDATIONS
    if (!name || !mobile || !address || !city || !pincode) {
      alert("Please fill all delivery details ❌");
      return;
    }

    if (mobile.length !== 10) {
      alert("Enter valid 10 digit mobile number ❌");
      return;
    }

    if (paymentMethod === "upi" && !upi.includes("@")) {
      alert("Enter valid UPI ID ❌");
      return;
    }

    alert("Order Placed Successfully 🎉");
    navigate("/");
  };

  return (
   <>
<Navbar/>
    <div className="container mt-5">
      <h2>Checkout</h2>

      <div className="row mt-4">
        {/* ADDRESS */}
        <div className="col-md-7">
          <div className="card p-4 mb-3">
            <h5>Delivery Address</h5>

            <input
              className="form-control mb-2"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          {/* PAYMENT */}
          <div className="card p-4">
            <h5>Payment Method</h5>

            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <br />

            <label>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI Payment
            </label>

            {paymentMethod === "upi" && (
              <input
                className="form-control mt-2"
                placeholder="Enter UPI ID (example@upi)"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="col-md-5">
          <div className="card p-4">
            <h5>Order Summary</h5>

            {cartItems.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr />

            <p>Subtotal: ₹{subtotal}</p>
            <p>Discount: -₹{discount}</p>
            <p>Delivery: <b>FREE</b></p>

            <h5>Total: ₹{total}</h5>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handleOrder}
            >
              Place Order
            </button> <br />
             {/* BACK BUTTON */}
      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;
