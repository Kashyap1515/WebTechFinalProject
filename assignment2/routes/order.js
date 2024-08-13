const express = require('express');
const mongoose = require('mongoose');
const OrderModel = require('../schemas/order-model');
const router = express.Router();

// Get orders
router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
      const newOrder = new OrderModel({
          _id: new mongoose.Types.ObjectId(),
          ...req.body
      });
      const addedOrder = await newOrder.save();
      res.status(200).json(addedOrder);
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
});

router.delete("/", async function (req, res) {
  try {
    const order = await OrderModel.deleteMany({});
    if (order.deletedCount === 0) return res.status(404).json({ message: 'Cart Not Found' });
    res.status(200).json({ message: "Cart Deleted Successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
