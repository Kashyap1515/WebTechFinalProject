const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  products: [
    { 
      product: 
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
      },
      quantity: Number
    }
  ],
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
