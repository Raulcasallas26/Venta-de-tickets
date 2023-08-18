import mongoose from "mongoose"

const rutaSchema = new mongoose.Schema({
    codigo:{type: String, require:true, unique:true},
    bus:{type: mongoose.Schema.Types.ObjectId, ref:'buses'},
    origen: {type: String, require:true}, 
    destino:{type: String, require:true},
    tiempoEnRuta: {type: String, require:true},
    horaSalida: {type: String, require:true},
    fechaSalida: {type: String, require:true}, 
    precioDeTicket: {type: String, require:true}, 
    estado: {type: Boolean, default: true},
})


export default mongoose.model("rutas", rutaSchema)
