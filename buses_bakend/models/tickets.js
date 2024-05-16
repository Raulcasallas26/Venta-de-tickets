import mongoose from "mongoose"

const ticketsSchema = new mongoose.Schema({
    id:{type: String, require: true, },
    numViaje: {type: mongoose.Schema.Types.ObjectId, ref:'rutas'},
    bus:{type: mongoose.Schema.Types.ObjectId, ref:'buses'},
    numSilla: {type: String, required: true},
    nombreVendedor: {type: String, required: true}, 
    cliente: {type: mongoose.Schema.Types.ObjectId, ref:'cliente'},
    pago:{type: String, require: true}, 
    fechaHoraCompra:{type: Date, default: Date.now},
    fechaHoraSalida:{type: String, require: true},
})


export default mongoose.model("tickets", ticketsSchema)
