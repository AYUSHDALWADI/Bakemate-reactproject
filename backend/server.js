const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const Cart = require("./models/Cart");

dotenv.config();
connectDB().then(() => {
  const seedDatabase = require("./config/seedDb");
  seedDatabase();
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Product Routes
app.use("/api/products", require("./routes/productRoutes"));

// POST append to cart
app.post("/api/cart", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cartItem = await Cart.findOne({ productId });
    
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ productId, quantity: quantity || 1 });
    }
    
    await cartItem.populate('productId');
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// GET all cart items
app.get("/api/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});