import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UsuarioModel from './UsuarioModel.js';

// Definir el modelo
const BlogModel = db.define('blogs', {
    blog_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: { type: DataTypes.INTEGER,references: {model: 'Users', key: 'user_id'}},
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true }
    
},{
    tableName: 'blogs',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
BlogModel.belongsTo(UsuarioModel, { foreignKey: 'user_id' });
UsuarioModel.hasMany(BlogModel, { foreignKey: 'user_id' });
export default BlogModel;