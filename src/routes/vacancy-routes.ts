import express from'express';

import {
    getAllVacancies,
    getSingleVacancy,
} from '../controllers/vacancy-controller.js';

const router = express.Router();

router.get('/vacancies', getAllVacancies);
router.get('/vacancies/:id', getSingleVacancy);


export default router;
