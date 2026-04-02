import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartFlatbed,
  faBookmark,
  faHeart,
  faUser,
  faCartArrowDown,
  faSchool
} from "@fortawesome/free-solid-svg-icons";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import { imageMap } from "./imageMap";

import "./Bakemate.css";
import "./Product.css";
import Login from "./login";
import Navbar from "./Navbar"

function ProductDetail() {
  const { state: productFromState } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(productFromState);
  const [isLoading, setIsLoading] = useState(!productFromState);
  const [showLogin, setShowLogin] = useState(false);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    if (!product && id) {
      fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct({
            ...data,
            id: data._id,
            image: imageMap[data.image] || data.image
          });
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [id, product]);

  if (isLoading) {
    return (
      <div className="container mt-5" style={{paddingTop: '100px'}}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // SAFETY CHECK
  if (!product) {
    return (
      <div className="container mt-5" style={{paddingTop: '100px'}}>
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* NAVBAR */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold">Bakemate</span>

          <form
            className="d-flex mx-auto"
            style={{
              width: "30%",
              border: "3px solid rgba(0, 204, 255, 0.91)",
              borderRadius: "8px",
            }}
          >
            <input className="form-control" placeholder="Search products" />
            <button className="btn btn-outline-success">Search</button>
          </form>

          <div className="d-flex gap-2">
            <button className="btnmain" onClick={() => setShowLogin(true)}>
              <FontAwesomeIcon icon={faUser} />
            </button>

            <button
              className="btnmain"
              onClick={() => navigate("/cartdetails")}
            >
              <FontAwesomeIcon icon={faCartArrowDown} />
              <span className="cart-count">{cartItems.length}</span>
            </button>
          </div>
        </div>
      </nav>

      <div style={{ marginTop: "90px" }} />

      {/* TOP BACK BUTTON */}
      <div className="container">
        <div className="top-back">
          <button className="back-btn" onClick={handleBack}>
            ← Back
          </button>
        </div>

        {/* PRODUCT SECTION */}
        <div className="prd1">
          <div className="prd-img">
            <img
              src={product.image}
              alt={product.name}
              className="imgdet"
            />
          </div>

          <div className="prd-det">
            <h5>{product.name}</h5>

            <p className="text-secondary mb-2" style={{ fontSize: '0.9rem', color: '#666' }}>
              <strong>Brand:</strong> {product.brand || "Bakemate"} &nbsp;|&nbsp; <strong>Category:</strong> {product.category || "Bakery"}
            </p>

            <div className="rating">
              ⭐⭐⭐⭐ <span>4.56</span>
            </div>

            <div className="price">
              <span className="new">₹{product.price}</span>
            </div>

            <p className="ab1">About the product</p>
            <p>{product.description}</p>

            <div className="btncart">
              <button
                className="cart"
                onClick={() => addToCart(product)}
              >
                <FontAwesomeIcon icon={faCartFlatbed} />
              </button>

              <button className="cart1">
                <FontAwesomeIcon icon={faBookmark} />
              </button>

              <button className="cart2">
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-col">
            <h4>CUSTOMER SERVICE</h4>
            <p>Contact Us</p>
            <p>Returns & Refunds</p>
            <p>Terms & Conditions</p>
            <p>FAQ</p>
          </div>

          <div className="divider"></div>

          <div className="footer-col">
            <h4>USEFUL LINKS</h4>
            <p>Account Details</p>
            <p>Orders</p>
          </div>

          <div className="divider"></div>

          <div className="footer-col">
            <h4>NEWSLETTER</h4>
            <p className="newsletter-text">SIGN UP FOR OUR NEWSLETTER</p>
            <div className="newsletter">
              <input type="email" placeholder="Please Enter Your Email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 BAKEMATE | All Rights Reserved.</p>

          <div className="socials">
            <span className="icon fb">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <span className="icon ig">
              <FontAwesomeIcon icon={faSchool} />
            </span>
            <span className="icon pin">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <span className="icon tw">
              <FontAwesomeIcon icon={faHeart} />
            </span>
          </div>
        </div>
      </footer>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default ProductDetail;
