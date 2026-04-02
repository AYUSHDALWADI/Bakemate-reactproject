
import './App.css'
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Bakemate from './Bakemate'
import ScrollToTopButton from "./ScrollToTopButton";
import ProductDetail from "./ProductDetail";
import Cartdetails from "./Cartdetails";
import Checkout from "./Checkout";


function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then(res => res.text())
      .then(data => {
        console.log("Backend Connected:", data);
      })
      .catch(err => console.log("Backend Error:", err));
  }, []);

  return (
    <>
      
      <ScrollToTopButton />

      <Routes>
        <Route path="/" element={<Bakemate />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/cartdetails" element={<Cartdetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  )
}

export default App
