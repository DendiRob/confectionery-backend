import {Router} from'express';
import { body } from 'express-validator';
import { 
    getUsers,
    registration,
    login,
    logout,
    activate,
 } from '../controllers/user-controller.js';

const router = Router();

router.post('/registration',
body('email').isEmail(),
body('password').isLength({min: 3, max: 35}),
registration
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh');
router.get('/users', getUsers);


export default router;
