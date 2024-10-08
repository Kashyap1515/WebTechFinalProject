const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true , unique: true },
    shippingAddress: { type: String },
    role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
