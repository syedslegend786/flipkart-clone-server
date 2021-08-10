import express from 'express'
import { createCatagory, getCatagory, updateCatagory, deleteCatagory } from '../controllers/catagory.js'
import { adminMiddleware, requireSignIn, userMiddleware } from '../commonmiddlewares/index.js'
import path from 'path'
import multer from 'multer'
const router = express.Router()
//
import { __dirname } from '../commonmiddlewares/index.js'
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

const upload = multer({ storage: storage })
//
router.post('/catagory/create', requireSignIn, adminMiddleware, upload.single('catagoryPicture'), createCatagory)
router.get('/catagory/getCatagory', getCatagory)
router.post('/catagory/update', upload.array('catagoryPicture'), updateCatagory)
router.post('/catagory/delete', deleteCatagory);
export default router;

