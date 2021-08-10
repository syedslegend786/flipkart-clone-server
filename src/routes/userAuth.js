import express from 'express'
import { requireSignIn } from '../commonmiddlewares/index.js';
import { userSignUp, userSignin, singOut } from '../controllers/userAuth.js';
import { check } from 'express-validator'
import { isSignUpValidate, signInValidator, signUpValidator } from '../validators/AuthValidators.js';
const router = express.Router();
router.post('/user/signup', signUpValidator, isSignUpValidate, userSignUp)



router.post('/user/signin', signInValidator, isSignUpValidate, userSignin)
router.post('/user/signout', singOut);

// router.post('/user/profile', requireSignIn, (req, res) => {
//     return res.status(200).json({
//         message: 'profile'
//     })
// })
export default router