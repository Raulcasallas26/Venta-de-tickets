import mongoose from "mongoose"

const conductoresSchema = new mongoose.Schema({
    nombre:{type: String,require: true},
    apellido: {type: String,require: true},
    cedula:{type: String,require: true,  unique:true}, 
    telefono: {type: String,require: true},
    numLicencia: {type: String,require: true, unique:true},
    categoriaLicencia:{type: String,require: true},
    fechaVenLicencia: {type: Date,require: true},
    fechacreacion: {type: Date, default: Date.now},
    estado: {type: Boolean, default: true, require: true},
})


export default mongoose.model("conductores", conductoresSchema)
