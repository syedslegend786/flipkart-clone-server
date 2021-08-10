import express from 'express'
import { adminMiddleware, requireSignIn, upload } from '../../commonmiddlewares/index.js';
import { createPage, getPageBySlug } from '../../controllers/admin/page.js';
const router = express.Router();


router.post('/page/create', requireSignIn, adminMiddleware, upload.fields([{ name: 'banners' }, { name: 'products' }]), createPage);
router.get('/page/:cid/:type', getPageBySlug);

export default router;