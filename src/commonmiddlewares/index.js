import jwt from 'jsonwebtoken'
export const requireSignIn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SECRETS);
    if (user) {
        req.user = user
        // console.log(user)
        next()
    } else {
        return res.status(400).json({
            error: 'You need to logg in to proceed '
        })
    }
}
export const adminMiddleware = (req, res, next) => {
    if (req.user.role === 'admin') {
        next()
    } else {
        return res.status(400).json({
            error: "Admin access denied"
        })
    }
}
export const userMiddleware = (req, res, next) => {
    if (req.user.role === 'user') {
        next()
    } else {
        return res.status(400).json({
            error: 'user access denied'
        })
    }
}

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export { __dirname };
import multer from 'multer'
import path from 'path';
import shortid from 'shortid'
//
//multer...
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

export const upload = multer({ storage: storage })