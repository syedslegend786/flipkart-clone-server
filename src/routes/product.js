import express from 'express'
import { addReviews, getProductDetailById, productController, productsBySlug } from '../controllers/product.js'
import { requireSignIn, userMiddleware } from './../commonmiddlewares/index.js'
import multer from 'multer'
import shortid from 'shortid'
import path from 'path'
//

const router = express.Router()
//
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/product/create', requireSignIn, upload.array('productPictures'), productController)
router.get('/:productId/getProductDetail', getProductDetailById)

router.get('/products/:slug', productsBySlug)

router.post('/product/add/review', requireSignIn, userMiddleware, addReviews)
export default router