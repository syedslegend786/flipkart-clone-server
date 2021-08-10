import userSchema from './../modules/userAuth.js'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
export const userSignUp = (req, res) => {
    userSchema.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) {
                return res.status(400).json({
                    error: "email already exists"
                })
            }
            const {
                firstName,
                lastName,
                email,
                userName,
                password
            } = req.body
            const hash_password = await bcrypt.hash(password, 10)
            const _user = new userSchema({
                firstName,
                lastName,
                email,
                userName,
                hash_password
            })
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        error: error
                    })
                }
                if (data) {
                    return res.status(200).json({
                        data: data
                    })
                }
            })
        })
}

//signin...

export const userSignin = (req, res) => {
    userSchema.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            if (user) {
                const isPassword = await user.authenticate(req.body.password)
                console.log(isPassword)
                if (isPassword && user.role == 'user') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRETS, { expiresIn: '1d' });
                    res.cookie('token', token, { expiresIn: '1d' })
                    const { _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName,
                    } = user
                    return res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstName,
                            lastName,
                            email,
                            role,
                            fullName,
                        }
                    })
                } else {
                    return res.status(400).json({
                        error: 'wrong password'
                    })
                }
            } else {
                return res.status(400).json({
                    error: 'User not found'
                })
            }
        })
}
export const singOut = (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({
        message: 'User logged Out successfully'
    })
}