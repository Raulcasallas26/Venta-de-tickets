// import clientes from "../models/clientes.js";
import clientesModel from "../models/clientes.js"

const httpclientes = {
    getclientes: async (req, res) => {
        const Cliente = await clientesModel.find();
        res.json({ Cliente });
    },
    getclientesCedula: async (req, res) => {
        const { cedula } = req.params;
        const cliente = clientesModel.find((item) => item.cedula == cedula);
        res.json({ cliente });
    },
    postclientes: async (req, res) => {
        const { nombre, apellido, cedula, telefono } = req.body;
        const cliente = new clientesModel({
            nombre,
            apellido, 
            cedula,
            telefono,
            
        });
        await cliente.save()
        res.json({
            mensaje: "1 clientes insertado!!",
            cliente,
        });

    },
    putclientes: (req, res) => {
        const { cedula } = req.params;
        const { nombre, telefono } = req.body;

        let sw = 0;
        for (let i = 0; i < clientes.length; i++) {
            if (cedula == clientes[i].cedula) {
                if (nombre !== undefined) clientes[i].nombre = nombre;
                if (telefono !== undefined) clientes[i].telefono = telefono;
                sw = 1;
                break;
            }
        }

        if (sw === 1) {
            res.json({
                mensaje: "Registro modificado correctamente",
                clientes: clientes.find((item) => item.cedula === cedula),
            });
        } else {
            res.json({ mensaje: "No se encontró el cliente con la cédula proporcionada" });
        }
    },

    deleteclientes: (req, res) => {
        const { cedula } = req.params;
        const index = clientes.findIndex(item => item.cedula === cedula);

        if (index !== -1) {
            const clientesEliminado = clientes.splice(index, 1);
            res.json({
                mensaje: "clientes eliminado exitosamente.",
                clientes: clientesEliminado[0], // UsuarioEliminado es un array, así que toma el primer elemento
            });
        } else {
            res.json({ mensaje: "No se encontró el Usuario" });
        }
    },

};

const clientes = []; // Array que contiene los Usuarios

export default httpclientes;