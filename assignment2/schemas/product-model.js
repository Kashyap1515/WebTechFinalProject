const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  image: String,
  price: Number,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
