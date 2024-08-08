import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    console.log('Headers:', req.headers);
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token extraído:', token);
    
    if (!token) {
        return res.status(403).json({ message: "Se requiere un token de acceso" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido: " + error.message });
    }
};

export default verifyToken