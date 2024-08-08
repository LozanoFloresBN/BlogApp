import BlogModel from "../models/BlogModel.js";

export const getAllBlogs = async (req,res) =>{
    try{
        const blogs = await BlogModel.findAll({ where: { is_active: true } });
        res.json(blogs);
    } catch(error){
        res.json({message: error.message})
    }
}

export const getBlog = async (req,res)=>{
    try{
        const blog = await BlogModel.findAll({
            where:{blog_id:req.params.id}   
        })
        res.json(blog[0])
    }catch(error){
        res.json({message: error.message})
    }   
}

export const createBlog = async (req,res)=>{
    try{
        await BlogModel.create(req.body)
        res.json({
            "message":"!Registro creado correctamente!"
        })
    }catch(error){
        res.json({message: error.message})
    }
}


export const updateBlog = async (req,res)=>{
    try{
        await BlogModel.update(req.body,{
            where:{blog_id:req.params.id}
        })
        res.json({
            "message":"!Registro actualizado correctamente!"
        })
    }catch(error){
        res.json({message: error.message})
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params; // Obtener ID del blog desde los parámetros de la solicitud

        // Verificar si el ID está definido
        if (!id) {
            return res.status(400).json({ message: 'ID del blog no proporcionado' });
        }

        // Actualizar el blog para marcarlo como eliminado
        const [updated] = await BlogModel.update(
            { is_active: false, deleted_at: new Date() },
            { where: { blog_id: id } }
        );

        // Verificar si el blog fue encontrado y actualizado
        if (updated) {
            res.json({ message: 'Blog marcado como eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Blog no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
