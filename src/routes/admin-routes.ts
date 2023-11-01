import { Router } from'express';
import { updateProduct } from '../controllers/admin-controllers.js';


const router = Router();

router.post('/admin/update/product', updateProduct);
export default router