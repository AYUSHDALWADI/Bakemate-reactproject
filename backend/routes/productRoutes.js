const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  searchProducts
} = require("../controllers/productController");

// The search route MUST come before /:id, or it will be registered as an ID param.
router.get("/search", searchProducts);

router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
