import express from 'express'
import { initialData } from '../../controllers/admin/initialdata.js';

const router = express.Router();


router.post('/initialdata', initialData)

export default router;