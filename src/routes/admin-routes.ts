import { Router } from'express';
import { updateProduct, updateVacancy } from '../controllers/admin-controllers.js';


const router = Router();

router.post('/admin/update/product', updateProduct);
router.post('/admin/update/vacancy', updateVacancy)
export default router