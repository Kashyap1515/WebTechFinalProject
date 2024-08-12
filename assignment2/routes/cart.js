const express = require('express');
const mongoose = require('mongoose');
const CartModel = require('../schemas/cart-model');
const router = express.Router();


// Get carts Data
router.get('/', async (req, res) => {
  try {
    const carts = await CartModel.find().populate('product');
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

// Add Product to Cart
router.post('/', async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    let newCart = await CartModel.findOne({ user, product });

    if (newCart) {
      newCart.quantity += quantity;
    } else {
      newCart = new CartModel({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
      });
    }
    await newCart.save();
    res.status(200).json(newCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Delete Cart 
router.delete("/:id", async function (req, res) {
  try {
    const currCart = await CartModel.findByIdAndDelete(req.params.id);
    if (!currCart) return res.status(404).json({ message: 'Cart Not Found' });
    res.status(200).json("Cart Deleted Successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/", async function (req, res) {
  try {
    const currCart = await CartModel.deleteMany({});
    if (currCart.deletedCount === 0) return res.status(404).json({ message: 'Cart Not Found' });
    res.status(200).json("Cart Deleted Successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
