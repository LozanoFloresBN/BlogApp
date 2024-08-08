import Users from "../models/UsuarioModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import {sendVerificationEmail} from "../controllers/emailService.js"
import dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;

export const getAllUsers = async (req,res) =>{
    try{
        const users = await Users.findAll()
        res.json(users)
    } catch(error){
        res.json({message: error.message})
    }
}

export const getUser = async (req,res)=>{
    try{
        const usuario = await Users.findAll({
            where:{user_id:req.params.id}
        })
        res.json(usuario[0])
    }catch(error){
        res.json({message: error.message})
    }   
}

export const createUser = async (req,res)=>{
    try{
        await Users.create(req.body)
        res.json({
            "message":"!Registro creado correctamente!"
        })
    }catch(error){
        res.json({message: error.message})
    }
}

export const updateUser = async (req,res)=>{
    try{
        await Users.update(req.body,{
            where:{user_id:req.params.id}
        })
        res.json({
            "message":"!Registro actualizado correctamente!"
        })
    }catch(error){
        res.json({message: error.message})
    }
}

export const deleteUser = async (req, res)=>{
    try{
        Users.destroy({
            where:{ user_id: req.params.id}
        })
        res.json({
            "message":"!Registro eliminado correctamente"
        })
    }catch(error){
        res.json({message: error.message})
    }
}

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }
        const newUser = await Users.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un nuevo código de verificación cada vez
        const verificationCode = crypto.randomInt(100000, 999999).toString();

        // Actualizar el código de verificación en la base de datos
        user.verificationCode = verificationCode;
        await user.save();

        // Enviar el código de verificación al correo del usuario
        await sendVerificationEmail(user.email, verificationCode);

        res.json({
            message: 'Código de verificación enviado a tu correo electrónico',
            requiresVerification: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Código de verificación incorrecto' });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Limpiar el código de verificación después de la verificación exitosa
        user.verificationCode = null;
        await user.save();

        res.json({
            message: 'Verificación exitosa',
            token,
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const resendCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Generar un nuevo código de verificación
        const newVerificationCode = crypto.randomInt(100000, 999999).toString();

        // Guardar el nuevo código de verificación en la base de datos
        user.verificationCode = newVerificationCode;
        await user.save();

        // Enviar el nuevo código de verificación al correo del usuario
        await sendVerificationEmail(user.email, newVerificationCode);

        res.json({ message: 'Código de verificación reenviado a tu correo electrónico' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

