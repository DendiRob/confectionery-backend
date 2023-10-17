import express from 'express';
import {
    getAllProducts,
    getSomeProductsForCatalog,
    getSumProducts,
    getProductById
} from '../controllers/product-controller.js'

const router = express.Router();


router.get('/products', getAllProducts)
router.get('/products/sum', getSumProducts) 
router.get('/products/catalog', getSomeProductsForCatalog )
router.get('/products/:id', getProductById)

export default router