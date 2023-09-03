const express = require('express');

const {
    getAllVacancies,
    getSingleVacancy,
} = require('../controllers/vacancy-controller');

const router = express.Router();

router.get('/vacancies', getAllVacancies);
router.get('/vacancies/:id', getSingleVacancy);




module.exports = router;
