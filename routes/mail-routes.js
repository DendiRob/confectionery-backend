const express = require('express');
const {
    sendOrder
}= require('../controllers/mail-controller')

const router = express.Router();


router.post('/mail/sendOrder',sendOrder);


module.exports = router;
