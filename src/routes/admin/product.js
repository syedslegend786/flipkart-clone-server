import express from 'express';
import { requireSignIn, adminMiddleware } from '../../commonmiddlewares/index.js'
import { removeProductAdmin } from '../../controllers/admin/product.js';

const router = express.Router();


router.post('/admin/product/delete', requireSignIn, adminMiddleware, removeProductAdmin)


export default router;