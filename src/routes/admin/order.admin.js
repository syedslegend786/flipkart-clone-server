import express from 'express'
const router = express.Router();
import { requireSignIn, adminMiddleware } from '../../commonmiddlewares/index.js'
import { getOrders, updateOrderStatus } from '../../controllers/admin/order.admin.js'

router.post('/admin/orderstatus/update', requireSignIn, adminMiddleware, updateOrderStatus)
router.get('/admin/getallorder', requireSignIn, adminMiddleware, getOrders)

export default router