const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: String,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true });


const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;