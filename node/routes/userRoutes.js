import express from 'express'
import {loginUser, deleteUser, getAllUsers, getUser, updateUser, registerUser, verifyCode, resendCode } from '../controllers/UsuarioController.js'
import { verifyToken } from '../controllers/middleware.js';
const router = express.Router()

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/verify-code', verifyCode);
router.post('/resend', resendCode);
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "Esta es una ruta protegida", userId: req.user.userId });
});



export default router