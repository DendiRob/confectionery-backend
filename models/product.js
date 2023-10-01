const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    proteins:{
        type: Number,
        required: true,
    },
    fats:{
        type: Number,
        required: true,
    },
    carbohydrates:{
        type: Number,
        required: true,
    },
    photoPath:{
        type: String,
        required: true,
    },
    productID:{
        type: String,
        required: true,
    },
    energy: {
        type: Number,
        required: true,
    },
    expiration: {
        type: Number,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    composition:{
        type: String,
        required: true,
    },
    box_weight:{
        type: Number,
        required: true,
    }
});

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;