const express = require('express');
const {
    getAllProducts,
    getSomeProductsForCatalog,
    getSumProducts,
    getProductById
} = require('../controllers/product-controller')

const router = express.Router();


router.get('/products', getAllProducts)
router.get('/products/sum', getSumProducts) 
router.get('/products/catalog', getSomeProductsForCatalog )
router.get('/products/:id', getProductById)

module.exports = router;