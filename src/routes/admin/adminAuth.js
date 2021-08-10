import express from 'express'
import { requireSignIn } from '../../commonmiddlewares/index.js';
import { signout, userSignin, userSignUp } from '../../controllers/admin/adminAuth.js'
import { isSignUpValidate, signInValidator, signUpValidator } from '../../validators/AuthValidators.js';
const router = express.Router();
router.post('/admin/signup', signUpValidator, isSignUpValidate, userSignUp)

router.post('/admin/signin', signInValidator, isSignUpValidate, userSignin)

router.post('/admin/signout', signout)

export default router