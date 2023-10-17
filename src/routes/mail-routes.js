import express from'express';

import {
    sendOrder
} from '../controllers/mail-controller.js'

const router = express.Router();


router.post('/mail/sendOrder', sendOrder);


export default router
