import { NextFunction, Request, Response } from "express";
import AdminService from "../service/admin-service.js";


//типизировать данные из боди
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {productID, newProductData} = req.body;
        const product = await AdminService.updateProduct(productID, newProductData)
        return res.json(product)
    } catch(e) {
        next(e)
    }
};

export const updateVacancy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {_id, newVacancyData} = req.body;
        const vacancy = await AdminService.updateVacancy(_id, newVacancyData)
        return res.json(vacancy)
    } catch(e) {
        next(e)
    }
};