const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        ref: 'Category'
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// POST SAVE method to connect with webhook  for sending notification mail after checking notifications field

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;