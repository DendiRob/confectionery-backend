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
const getSumProducts = (req,res) => {
    Product
        .find().count()
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
const getSomeProductsForCatalog = (req,res) => {

    const skipProducts = +req.query.skip;

    Product
        .find().skip(skipProducts).limit(15)
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
}

module.exports = {
    getAllProducts,
    getSomeProductsForCatalog,
    getSumProducts,
}