const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: String,
  image: String,
  pricing: Number,
  shippingCost: Number
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
