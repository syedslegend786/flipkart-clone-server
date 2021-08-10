import express from 'express'
import { requireSignIn, userMiddleware } from '../commonmiddlewares/index.js';
import { createAddress, deleteAddress, getUserAddresses, userAddressEdit } from '../controllers/address.js';
import { addressValidators } from '../validators/addressValidators.js';
import { isSignUpValidate } from '../validators/AuthValidators.js';

const router = express.Router();

router.post('/user/address/create', addressValidators, isSignUpValidate, requireSignIn, userMiddleware, createAddress);

router.get('/user/address/get', requireSignIn, userMiddleware, getUserAddresses)

router.post('/user/address/edit', requireSignIn, userMiddleware, userAddressEdit)

router.post('/user/address/delete', requireSignIn, userMiddleware, deleteAddress)

export default router;
