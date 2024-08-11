const express = require('express');
const mongoose = require('mongoose');
const OrderModel = require('../schemas/order-model');
const router = express.Router();

// Get orders
router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).send(orders);
  } catch (error) {
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

module.exports = router;
