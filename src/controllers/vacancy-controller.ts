import Vacancy from '../models/vacancy.js';
import { Request, Response } from 'express';

const handleError = (res: Response, error: Error) => {
    res.status(500).json({error})
}

const getAllVacancies = (req: Request, res: Response) => {
    Vacancy
        .find()
        .then((vacancy) => {
            res
                .status(200)
                .json(vacancy)
        })
        .catch((err) => handleError(res, err))
};
const getSingleVacancy = (req: Request,res: Response) => {
    Vacancy
        .find({"_id": `${req.params.id}`})
        .then((vacancy) => {
            res
                .status(200)
                .json(vacancy)
        })
        .catch((err) => handleError(res, err))
};

export {
    getAllVacancies,
    getSingleVacancy
}