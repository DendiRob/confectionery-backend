import { Router } from'express';
import { addVacancy, updateProduct, updateVacancy } from '../controllers/admin-controllers.js';


const router = Router();

router.post('/admin/update/product', updateProduct);
router.post('/admin/update/vacancy', updateVacancy);
router.post('/admin/add/vacancy', addVacancy);

export default router