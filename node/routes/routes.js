import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from '../controllers/BlogController.js'
import { verifyToken } from '../controllers/middleware.js';
const router = express.Router()

router.get('/', verifyToken, getAllBlogs);
router.get('/:id', verifyToken, getBlog);
router.post('/', verifyToken, createBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "Esta es una ruta protegida", userId: req.user.userId });
});
export default router
