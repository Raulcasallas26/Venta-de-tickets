import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true },
    apellido:{type: String, required: true}, 
    cedula: {type: String,  required: true, unique: true},  
    telefono: {type: String, required: true}, 
    rol: {type: String,  required: true},
    email: {type:String, required: true, unique: true}, 
    direccion:{type: String, required: true}, 
    contrasena:{type: String, required: true},
    estado:{type: Boolean, default:true, require:true },
    fechacreacion:{type: String,default: Date.now,}
})


export default mongoose.model("Usuario", usuarioSchema)

