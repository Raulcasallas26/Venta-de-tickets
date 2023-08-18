import conductoresModel from "../models/conductores.js"

const httpconductores = {
    getconductores: async (req, res) => {
        const conductores = await conductoresModel.find();
        res.json({ conductores });
    },
    
    postConductores: async (req, res) => {
        const { nombre, apellido, cedula, telefono, numLicencia, categoriaLicencia, fechaVenLicencia } = req.body;
        const Conductor = new conductoresModel({
            nombre,
            apellido,
            cedula,
            telefono,
            numLicencia,
            categoriaLicencia,
            fechaVenLicencia
        });
        await Conductor.save() 
        res.json({
            mensaje: "1 conductores insertado!!",
            Conductor,
        });
    },
    putconductores: async(req, res) => {
        const { id } = req.params;
        const { nombre, apellido, cedula, telefono, numLicencia, categoriaLicencia, fechaVenLicencia } = req.body;
        const conductor = await conductoresModel.findByIdAndUpdate(id, {nombre, apellido, cedula, telefono, numLicencia, categoriaLicencia, fechaVenLicencia}, {new:true} )
        res.json({
            msg:"ok",
            conductor
        })
    },

    deleteconductores: (req, res) => {
        const { cedula } = req.params;
        const index = conductores.findIndex(item => item.cedula === cedula);

        if (index !== -1) {
            const conductoresEliminado = conductores.splice(index, 1);
            res.json({
                mensaje: "conductores eliminado exitosamente.",
                conductores: conductoresEliminado[0], // UsuarioEliminado es un array, así que toma el primer elemento
            });
        } else {
            res.json({ mensaje: "No se encontró el Usuario" });
        }
    },

};

const conductores = []; // Array que contiene los Usuarios

export default httpconductores;