const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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
  totalCost: Number,
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
