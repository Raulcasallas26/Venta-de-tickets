import busesModel from "../models/buses.js"

const httpbuses = {
    getbuses: async (req, res) => {
        const Buses = await busesModel.find().populate("conductor"); 
        res.json({ Buses }); 
    },
    getbusesCedula: async (req, res) => { 
        const { cedula } = req.params;
        const bus = buses.find((item) => item.placa == placa);

        res.json({ bus });
    },
    postbuses: async (req, res) => {
        const { numero, placa, tipobus, capacidad, marca, conductor } = req.body;
        const bus = new busesModel({
            numero,
            placa,
            tipobus, 
            capacidad, 
            marca,
            conductor
        }); 
        await bus.save()
        res.json({
            mensaje: "1 buses insertado!!",
            bus,
        });

    },
    putbuses: async(req, res) => {
        const { id } = req.params;
        const { numero, placa, tipobus, capacidad, marca, conductor } = req.body;
        const bus = await busesModel.findByIdAndUpdate(id, {numero, placa, tipobus, capacidad, marca, conductor }, {new:true} )
        res.json({
            msg:"ok",
            bus 
        })
    },

    deletebuses: (req, res) => {
        const { cedula } = req.params;
        const index = buses.findIndex(item => item.cedula === cedula);

        if (index !== -1) {
            const busesEliminado = buses.splice(index, 1);
            res.json({
                mensaje: "buses eliminado exitosamente.",
                bus: busesEliminado[0], // busesEliminado es un array, así que toma el primer elemento
            });
        } else {
            res.json({ mensaje: "No se encontró el bus" });
        }
    },

};

const buses = []; // Array que contiene los Usuarios

export default httpbuses;