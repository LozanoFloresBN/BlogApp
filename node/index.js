import express from "express"
import cors from 'cors'
import db from "./database/db.js"
import blogRoutes from './routes/routes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
app.use( cors())
app.use(express.json())
app.use('/blogs',blogRoutes)
app.use('/users',userRoutes);

try{
    await db.authenticate()
    console.log('Conexion exitosa a la BD')
}catch(error){
    console.log(`El error de la conexion es: ${error}`)
}

app.listen(8080, ()=>{
    console.log('server UP running in http://localhost:8080/')
})