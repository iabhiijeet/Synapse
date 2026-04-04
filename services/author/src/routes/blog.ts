import express from 'express'
import { createBlog, deleteBlog, updateBlogs } from '../controller/blog.js';
import { isAuth } from '../middleware/isAuth.js';
import uploadfile from '../middleware/multer.js';
const router = express.Router();

router.post('/create',isAuth, uploadfile, createBlog);
router.post('/update/:id',isAuth,uploadfile, updateBlogs);
router.get('/delete/:id',isAuth, deleteBlog);


export default router;