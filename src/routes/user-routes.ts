import {Router} from'express';
import { 
    getUsers,
    registration,
    login,
    logout
 } from '../controllers/user-controller.js';

const router = Router();

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link');
router.get('/refresh');
router.get('/users', getUsers);


export default router;
