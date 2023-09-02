const express = require('express');

const {
    getAllVacancies
} = require('../controllers/vacancy-controller');

const router = express.Router();

router.get('/vacancies', getAllVacancies)



module.exports = router;
