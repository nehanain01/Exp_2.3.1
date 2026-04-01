const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST seed some products
router.post("/seed", async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany([
      { name: "Laptop",     price: 999,  category: "Electronics", stock: 10 },
      { name: "Phone",      price: 499,  category: "Electronics", stock: 25 },
      { name: "Headphones", price: 199,  category: "Electronics", stock: 50 },
      { name: "Desk",       price: 299,  category: "Furniture",   stock: 8  },
      { name: "Chair",      price: 149,  category: "Furniture",   stock: 15 },
      { name: "Notebook",   price: 9,    category: "Stationery",  stock: 100}
    ]);
    res.json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Seed Error" });
  }
});

module.exports = router;