import Product from "../models/product.js";
import { Request, Response, request } from 'express';


const handleError = (res: Response, error: Error) => {
    res.status(500).json({error})
}

const getAllProducts = (req: Request, res: Response) => {
    Product
        .find()
        .then((product) => {
            res
                .status(200)
                .json(product)
        })
        .catch((err) => handleError(res, err))
};
const getSumProducts = (req: Request,res: Response) => {
    Product
        .find().count()
        .then((product) => {
            res
                .status(200)
                .json(product)
        })
        .catch((err) => handleError(res, err))
};
const getSomeProductsForCatalog = (req: Request | undefined ,res: Response) => {

    if (req && req.query && req.query.skip !== undefined){
        
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
}

const getProductById = (req: Request, res: Response) => {
    Product
    .find({"productID": `${req.params.id}`})
    .then((product) => {
        res
            .status(200)
            .json(product)
    })
    .catch((err) => handleError(res, err))
}

export {
    getAllProducts,
    getSomeProductsForCatalog,
    getSumProducts,
    getProductById,
}