import mongoose from "mongoose"

const clientesSchema = new mongoose.Schema({
    nombre:{type: String,require: true},
    apellido: {type: String, require: true}, 
    cedula:{type: String, unique:true ,require: true}, 
    telefono: {type: String, require: true},
})


export default mongoose.model("clientes", clientesSchema)
