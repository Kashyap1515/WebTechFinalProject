const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('../schemas/product-model');
const router = express.Router();

// Get products
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Product
router.get("/:id", async function (req, res) {
  try {
    const currProduct = await ProductModel.findById(req.params.id);
    if (!currProduct) return res.status(404).json({ message: 'Product Not Found' });
    res.status(200).json(currProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add Products
router.post('/', async (req, res) => {
  try {
    const newProduct = new ProductModel({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    const addedProduct = await newProduct.save();
    res.status(200).json(addedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Update Products
router.put('/:id', async (req, res) => {
  try {
    const newProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    if (!newProduct) return res.status(404).json({ error: 'Product Not Found..!!' });
    res.status(200).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Delete Product 
router.delete("/:id", async function (req, res) {
  try {
    const currProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!currProduct) return res.status(404).json({ message: 'Product Not Found' });
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
