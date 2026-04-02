const Product = require("../models/Product");

const products = [
  {
    name: "Blueberry Pancakes",
    brand: "Waffles And Pancakes",
    description: "Festive blueberry house for holiday celebrations.",
    price: 99.99,
    image: "Blueberrypancake",
    category: "Pancakes"
  },
  {
    name: "White Bread",
    brand: "Croissants",
    description: "Flaky croissant soft bread.",
    price: 49.99,
    image: "Whitebread",
    category: "Bread"
  },
  {
    name: "Mango Cheesecake",
    brand: "Waffles And Pancakes",
    description: "Soft mango cheese cake with cream cheese frosting.",
    price: 349.49,
    image: "mangocake",
    category: "Cakes"
  },
  {
    name: "Lotus Biscoff Cake",
    brand: "Waffles And Pancakes",
    description: "Moist cake piece packed with lotus biscoff flavour.",
    price: 399.99,
    image: "biscoff",
    category: "Cakes"
  },
  {
    name: "Caramel Chocolate Cake",
    brand: "Waffles And Pancakes",
    description: "Soft doughnuts with a classic caramel glaze.",
    price: 499.99,
    image: "caramelcake",
    category: "Cakes"
  },
  {
    name: "Chocolate Brownie",
    brand: "Croissants",
    description: "Fluffy brownie with rich chocolate filling.",
    price: 99.99,
    image: "chocolatebrownie",
    category: "Brownies"
  },
  {
    name: "Raspberry Rose Cake",
    brand: "Waffles And Pancakes",
    description: "Tangy and sweet raspberry tart with buttery crust.",
    price: 249.99,
    image: "rasberry",
    category: "Cakes"
  },
  {
    name: "Brown Bread",
    brand: "By Croissants",
    description: "Toasted garlic bread with herbs and butter.",
    price: 79.99,
    image: "brownbread",
    category: "Bread"
  }
];

const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Seeding initial products...");
      await Product.insertMany(products);
      console.log("Products seeded successfully.");
    } else {
      console.log(`Database already has ${count} products. Skipping seeding.`);
    }
  } catch (error) {
    console.error("Error checking/seeding database:", error);
  }
};

module.exports = seedDatabase;
