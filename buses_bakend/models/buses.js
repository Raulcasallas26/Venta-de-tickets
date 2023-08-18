import mongoose from "mongoose"

const busesSchema = new mongoose.Schema({
    id: { type: String, require: true },
    numero: { type: String, require: true, unique: true },
    placa: { type: String, require: true, unique: true },
    tipobus: { type: String, require: true },
    capacidad: { type: String, require: true },
    marca: { type: String, require: true },
    conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'conductores' },
    fechacreacion: { type: Date, default: Date.now },
    estado: { type: Boolean, default: true }
})


export default mongoose.model("buses", busesSchema)
