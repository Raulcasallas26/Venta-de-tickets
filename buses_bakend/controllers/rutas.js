import rutaModel from "../models/rutas.js"

const httprutas = {
    getrutas: async (req, res) => {
        const rutas = await rutaModel.find();
        res.json({ rutas });
    },
    getrutasid: async (req, res) => {
        const { cedula } = req.params;
        const ruta = rutas.find((item) => item.cedula == cedula);

        res.json({ ruta });
    },
    postrutas: async (req, res) => {
        const { codigo, bus, origen, destino, tiempoEnRuta, precioDeTicket, horaSalida, fechaSalida} = req.body;
        const ruta = new rutaModel({
            codigo,
            bus, 
            origen,
            destino, 
            tiempoEnRuta,
            precioDeTicket, 
            horaSalida,
            fechaSalida
        }); 
        await ruta.save()

        res.json({
            mensaje: "1 ruta agregada!!",
            ruta,
        });
    },
    putrutas: async(req, res) => {
        const { id } = req.params;
        const { codigo, origen, destino, tiempoEnRuta, precioDeTicket, horaSalida, fechaSalida } = req.body;
        const ruta = await rutaModel.findByIdAndUpdate(id, {codigo, origen, destino, tiempoEnRuta, precioDeTicket, horaSalida, fechaSalida}, {new:true} )
        res.json({
            msg:"ok",
            ruta
        })
    },

    rutaPutChangeState: async (req, res) => {
        const { id } = req.params 
        const usu = await rutaModel.findById(id)
        let ruta = null
        if (usu.estado) {
            ruta = await rutaModel.findByIdAndUpdate(id, { estado: false })
        } else {
            ruta = await rutaModel.findByIdAndUpdate(id, { estado: true })
        }

        const rutaAutenticado = req.ruta

        res.json({
    
            ruta,
            rutaAutenticado
        })
    },

    deleterutas: (req, res) => {
        const { cedula } = req.params;
        const index = rutas.findIndex(item => item.cedula === cedula);

        if (index !== -1) {
            const rutasEliminada = rutas.splice(index, 1);
            res.json({
                mensaje: "rutas eliminada exitosamente.",
                ruta: rutasEliminada[0], // rutasEliminado es un array, así que toma el primer elemento
            });
        } else {
            res.json({ mensaje: "No se encontro la ruta" });
        }
    },

};

const rutas = []; // Array que contiene las rutas

export default httprutas;