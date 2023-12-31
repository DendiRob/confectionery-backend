import { Router } from'express';
import { body } from 'express-validator';
import { 
    getUsers,
    registration,
    login,
    logout,
    activate,
    refresh
 } from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = Router();

router.post('/registration',
body('email').isEmail(),
body('password').isLength({min: 3, max: 35}),
registration
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/users',authMiddleware as any, getUsers);


export default router;
