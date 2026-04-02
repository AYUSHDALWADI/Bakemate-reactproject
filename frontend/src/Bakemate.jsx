import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartArrowDown,
  faTruckFast,
  faHeart,
  faSchool,
  faSearch,
  faBoxOpen,
  faSpinner,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons/faCommentDollar";
import { faPercent } from "@fortawesome/free-solid-svg-icons/faPercent";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";

import { useNavigate } from "react-router-dom";
import "./Bakemate.css";
import Login from "./login";
import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { imageMap } from "./imageMap";
import cakelogo from "../src/assets/cakelogo2.png";

import banner from "./assets/bannermain.jpg";


function Bakemate() {
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    alert("Logged out successfully");
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map((p) => ({
          ...p,
          id: p._id,
          image: imageMap[p.image] || p.image,
        }));
        setProducts(mappedData);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const executeSearch = (queryObj) => {
    const query = typeof queryObj === 'string' ? queryObj : searchQuery;
    if (queryObj && typeof queryObj.preventDefault === 'function') {
      queryObj.preventDefault();
    }
    
    setShowSuggestions(false);
    
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    setIsLoading(true);
    setHasSearched(true);
    
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map((p) => ({
          ...p,
          id: p._id,
          image: imageMap[p.image] || p.image,
        }));
        setSearchResults(mappedData);
      })
      .catch((err) => console.error("Error searching products:", err))
      .finally(() => setIsLoading(false));
  };

  const handleSearchInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (!val.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    // Live local filtering for suggestions
    const filtered = products
      .filter((p) => p.name.toLowerCase().includes(val.toLowerCase()))
      .slice(0, 5); // Limit 5 suggestions
      
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold" href="#">
            Bakemate
          </a>

          <form className="search-wrapper" onSubmit={executeSearch}>
            <div className="search-input-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                className="search-input" 
                placeholder="Search products, cakes, brownies..." 
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="search-suggestions">
                  {suggestions.map((s, index) => (
                    <li 
                      key={index} 
                      className="search-suggestion-item"
                      onClick={() => {
                        setSearchQuery(s.name);
                        executeSearch(s.name);
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} style={{color: '#8fa0b5', fontSize: 12}} />
                      {s.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="search-btn" type="submit">Search</button>
          </form>

          <div className="d-flex">
            {!isLoggedIn ? (
              <button className="btnmain" onClick={() => setShowLogin(true)}>
                <FontAwesomeIcon icon={faUser} />
              </button>
            ) : (
              <button className="btnmain" onClick={handleLogout}>
                Logout
              </button>
            )}

            <button className="btnmain" onClick={() => navigate("/cartdetails")}>
              <FontAwesomeIcon icon={faCartArrowDown} />
              <span className="cart-count">{cartItems.length}</span>
            </button>

          </div>
        </div>
      </nav>

      <div style={{ marginTop: "90px" }} />


      <section className="hero">
        <div className="hero-text">
          <p className="price">Starting At 99rs</p>
          <h1>The best cake <br />
            collection 2026</h1>
          <p className="offer">
            Exclusive offer <span>-20%</span>
          </p>
          <button className="hero-btn">Grab the opportunity Now</button>
        </div>
        <div className="hero-image">
          <img src={cakelogo} alt="logo" />
        </div>
      </section>


      <div className="container boxes">
        <div className="box1" >
          <div className="tr1">
            <h1>
              <FontAwesomeIcon icon={faTruckFast} size="1x" className="truck" />
            </h1>
          </div>
          <div className="tr2">
            <h5>Free Delivery</h5>
            <span className="spn1">Orders from all items</span>
          </div>
        </div>
        <div className="box2" >
          <div className="tr1">
            <h1>
              <FontAwesomeIcon icon={faCommentDollar} size="1x" className="truck" />
            </h1>
          </div>
          <div className="tr2">
            <h5>Return & Refund</h5>
            <span className="spn1">Money back guarantee</span>
          </div>
        </div>
        <div className="box3" >
          <div className="tr1">
            <h1>
              <FontAwesomeIcon icon={faPercent} size="1x" className="truck" />
            </h1>
          </div>
          <div className="tr2">
            <h5>Member Discount</h5>
            <span className="spn1">On order over 199rs</span>
          </div>
        </div>
        <div className="box4" >
          <div className="tr1">
            <h1>
              <FontAwesomeIcon icon={faPhone} size="1x" className="truck" />
            </h1>
          </div>
          <div className="tr2">
            <h5>Support 24/7</h5>
            <span className="spn1">Contact us 24 hours a day</span>
          </div>
        </div>
      </div>


      {hasSearched ? (
        <div className="container" style={{paddingTop: '30px'}}>
          <div className="search-header-container">
            <h2 className="search-header-title">Search Results</h2>
            <p className="search-results-count">
              Showing {searchResults.length} result(s) for "{searchQuery}"
            </p>
          </div>
          
          {isLoading ? (
            <div className="search-loading">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" />
              <span>Fetching products...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="featured-container">
              <div className="products-grid">
                {searchResults.map((product) => (
                  <div className="product-card search-product-card" key={product.id}>
                    <div className="image-box" onClick={() => navigate(`/productDetail/${product.id}`, { state: product })} style={{cursor: 'pointer'}}>
                      <img src={product.image} alt={product.name} />
                      <span className="heart">♥</span>
                    </div>
                    <div className="card-body">
                      <h3 className="prdname"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/productDetail/${product.id}`, { state: product })
                        }
                      >
                        {product.name}
                      </h3>
                      <small>By {product.brand}</small>
                      <p>{product.description}</p>
                      <div className="price">₹{product.price}</div>
                      
                      <button 
                        className="grid-cart-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if(addToCart) addToCart(product);
                        }}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <FontAwesomeIcon icon={faBoxOpen} className="empty-state-icon" />
              <h2>No products found for "{searchQuery}"</h2>
              <p>Try searching with a different keyword or check out our trending items.</p>
              <button 
                className="back-btn" 
                onClick={() => {
                  setHasSearched(false);
                  setSearchQuery("");
                }}
              >
                Back to Products
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <h1 className="ad1">Trending Products</h1>
          <div className="featured-container">
        <div className="products-grid">
          {products.slice(4, 8).map((product) => (
            <div className="product-card search-product-card" key={product.id}>
              <div className="image-box" onClick={() => navigate(`/productDetail/${product.id}`, { state: product })} style={{cursor: 'pointer'}}>
                <img src={product.image} alt={product.name} />
                <span className="heart">♥</span>
              </div>
              <div className="card-body">
                <h3 className="prdname"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/productDetail/${product.id}`, { state: product })
                  }
                >
                  {product.name}
                </h3>
                <small>By {product.brand}</small>
                <p>{product.description}</p>
                <div className="price">₹{product.price}</div>
                <button 
                  className="grid-cart-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(addToCart) addToCart(product);
                  }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-container">
        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
            <div className="product-card search-product-card" key={product.id}>
              <div className="image-box" onClick={() => navigate(`/productDetail/${product.id}`, { state: product })} style={{cursor: 'pointer'}}>
                <img src={product.image} alt={product.name} />
                <span className="heart">♥</span>
              </div>
              <div className="card-body">
                <h3 className="prdname"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/productDetail/${product.id}`, { state: product })
                  }
                >
                  {product.name}
                </h3>
                <small>By {product.brand}</small>
                <p>{product.description}</p>
                <div className="price">₹{product.price}</div>
                <button 
                  className="grid-cart-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(addToCart) addToCart(product);
                  }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container ad2">
        <div className="firstimage">
          <img src={banner} alt="" />
        </div>
        <div className="firsttext">
          <h3>Don't miss the offer!</h3>
          <h3>Grab it now</h3>
          <button className="btn3">Shop Now</button>
        </div>

      </div>
      <h1 className="ad1">Deals Of The Day</h1>
      <div className="featured-container">
        <div className="products-grid">
          {products.slice(3, 7).map((product) => (
            <div className="product-card search-product-card" key={product.id}>
              <div className="image-box" onClick={() => navigate(`/productDetail/${product.id}`, { state: product })} style={{cursor: 'pointer'}}>
                <img src={product.image} alt={product.name} />
                <span className="heart">♥</span>
              </div>
              <div className="card-body">
                <h3 className="prdname"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/productDetail/${product.id}`, { state: product })
                  }
                >
                  {product.name}
                </h3>
                <small>By {product.brand}</small>
                <p>{product.description}</p>
                <div className="price">₹{product.price}</div>
                <button 
                  className="grid-cart-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(addToCart) addToCart(product);
                  }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h1 className="ad1">Featured Product</h1>
      <div className="featured-container">
        <div className="products-grid">
          {products.slice(0, 3).map((product) => (
            <div className="product-card search-product-card" key={product.id}>
              <div className="image-box" onClick={() => navigate(`/productDetail/${product.id}`, { state: product })} style={{cursor: 'pointer'}}>
                <img src={product.image} alt={product.name} />
                <span className="heart">♥</span>
              </div>
              <div className="card-body">
                <h3 className="prdname"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/productDetail/${product.id}`, { state: product })
                  }
                >
                  {product.name}
                </h3>
                <small>By {product.brand}</small>
                <p>{product.description}</p>
                <div className="price">₹{product.price}</div>
                <button 
                  className="grid-cart-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(addToCart) addToCart(product);
                  }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
        </>
      )}

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
            <h4>USEFULL LINKS</h4>
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
            <span className="icon fb"><FontAwesomeIcon icon={faHeart} size="1x" className="" /></span>
            <span className="icon ig"><FontAwesomeIcon icon={faSchool} size="1x" className="" /></span>
            <span className="icon pin"><FontAwesomeIcon icon={faHeart} size="1x" className="" /></span>
            <span className="icon tw"><FontAwesomeIcon icon={faHeart} size="1x" className="" /></span>
          </div>
        </div>
      </footer>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default Bakemate;
