import db from "../database/db.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

const UsuarioModel = db.define('Users', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    verificationCode: { type: DataTypes.STRING, allowNull: true}

}, {
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
UsuarioModel.beforeCreate(async (user) => {
    if (user.password) {
        console.log('Encriptando contraseña...');
        user.password = await bcrypt.hash(user.password, 10);
        console.log('Contraseña encriptada');
    }
});

export default UsuarioModel;