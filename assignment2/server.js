const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Create HTTP server
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Accept-Language, Accept-Encoding');
    next();
});

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const commentRoutes = require('./routes/comment');
const cartRoutes = require('./routes/cart');

const url = 'mongodb+srv://kashyapkalathiya654:iCoKGaEwaI9Ro958@assignment2.9ky9xmu.mongodb.net/?retryWrites=true&w=majority&appName=assignment2';

mongoose.connect(url)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/cart', cartRoutes);

// Listen Server on     Specific PORT
const PORT = 8080;
server.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});
