import mongoose from "mongoose";

const instructoresSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    nombres:{type:String, required: true},
    apellidos:{type:String, required: true},
    numeroIdentificacion:{type:String, required: true, unique: true},
    telefono:{type:String, required: true, unique: true},
    email:{type:String, required: true, unique: true},
    password:{type:String, required: true},
    perfilProfesional:{type:String, required: true},
    curriculum:{type:String, required: true, },
    estado:{type: Boolean, default: true},
    idRolUsuario:{type:String, required: false,},
    idRedConocimiento:{type:String, required: false},
}) 

export default mongoose.model("instructores", instructoresSchema)