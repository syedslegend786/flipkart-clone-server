import express from 'express'
import { requireSignIn, userMiddleware } from '../commonmiddlewares/index.js';
import { addToCartController, decrementProductQty, getCartItems, incrementProductQty, removeProductFromCrt } from '../controllers/cart.js';
const router = express.Router();

router.post('/user/addToCart', requireSignIn, userMiddleware, addToCartController);

router.get('/user/getUserCart', requireSignIn, userMiddleware, getCartItems)

router.post(`/user/cart/increment/:slug`, requireSignIn, userMiddleware, incrementProductQty)

router.post(`/user/cart/decrement/:slug`, requireSignIn, userMiddleware, decrementProductQty)

router.post('/user/cart/deleteproduct', requireSignIn, userMiddleware, removeProductFromCrt)

export default router;