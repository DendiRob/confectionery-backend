import { NextFunction, Request, Response } from "express";
import AdminService from "../service/admin-service.js";



export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {productID, newProductData} = req.body;
        const product = await AdminService.updateProduct(productID, newProductData)
        return res.json(product)
    } catch(e) {
        console.log(e)
        next(e)
    }
};