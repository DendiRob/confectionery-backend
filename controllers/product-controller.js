const Product = require('../models/product');

const handleError = (res, error) => {
    res.status(500).json({error})
}

const getAllProducts = (req,res) => {
    Product
        .find()
        .then((product) => {
            res
                .status(200)
                .json(product)
        })
        .catch((err) => handleError(res, err))
};
const getSumProducts = (req,res) => {
    Product
        .find().count()
        .then((product) => {
            res
                .status(200)
                .json(product)
        })
        .catch((err) => handleError(res, err))
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
        .catch((err) => handleError(res, err))
}

const getProductById = (req, res) => {
    Product
    .find({"productID": `${req.params.id}`})
    .then((product) => {
        res
            .status(200)
            .json(product)
    })
    .catch((err) => handleError(res, err))
}

module.exports = {
    getAllProducts,
    getSomeProductsForCatalog,
    getSumProducts,
    getProductById,
}