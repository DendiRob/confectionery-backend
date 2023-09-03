const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    conditions:{
        type: Array,
        required: true,
    },
    duties:{
        type: Array,
        required: true,
    },
    requirements:{
        type: Array,
        required: true,
    },
    salary:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
});

const Vacancy = mongoose.model('Vacancy',VacancySchema);

module.exports = Vacancy;