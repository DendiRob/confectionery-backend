const Product = require('../models/product');

const getAllProducts = (req,res) => {
    Product
        .find()
        .then((product) => {
            res
                .status(200)
                .json(product)
        })
        .catch((err) => {
            res
                .status(500)
                console.log(err)

        })
};

module.exports = {
    getAllProducts
}