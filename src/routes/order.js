import express from 'express'
import { requireSignIn, userMiddleware } from '../commonmiddlewares/index.js'
import { createOrder, getOrders, orderDetailPage } from '../controllers/order.js';
const router = express.Router()

router.post('/user/order/create', requireSignIn, userMiddleware, createOrder)

router.get('/user/order/get', requireSignIn, userMiddleware, getOrders)

router.get('/order/detailpage/:orderId/:addressId', requireSignIn, userMiddleware, orderDetailPage)

export default router;