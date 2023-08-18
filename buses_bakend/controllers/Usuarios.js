import Usuario from "../models/Usuarios.js"
import bcryptjs from "bcryptjs"

const httpUsuarios = {
    getUsuario: async (req, res) => {
        const Usuarios = await Usuario.find();
        res.json({ Usuarios });
    },
    getUsuarioCedula: async (req, res) => {
        const { cedula } = req.params;
        const Usuario = Usuarios.find((item) => item.cedula == cedula);
        res.json({ Usuario });
    },
    postUsuario: async (req, res) => {
        const { nombre, apellido, cedula, telefono, rol, email, direccion, contrasena } = req.body;
        const Usuarios = new Usuario({
            nombre,
            apellido,
            cedula,
            telefono,
            rol,
            email,
            direccion,
            contrasena
        });
        const salt = bcryptjs.genSaltSync(30);
        Usuarios.contrasena = bcryptjs.hashSync(contrasena, salt)
        await Usuarios.save()
        res.json({
            mensaje: "1 Usuario insertado!!",
            Usuarios,
        });

    },
    putUsuario: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, cedula, telefono, rol, email, direccion } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(id, { nombre, apellido, cedula, telefono, rol, email, direccion }, { new: true })
        res.json({
            msg: "ok",
            usuario
        })
    },
    usuarioPutChangeState: async (req, res) => {
        const { id } = req.params  
        const usu = await Usuario.findById(id)
        let usuario = null
        if (usu.estado) {
            usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
        } else {
            usuario = await Usuario.findByIdAndUpdate(id, { estado: true })
        }
        const usuarioAutenticado = req.usuario
        res.json({
            msj: "fue cambiado el estado",
            usuario,
            usuarioAutenticado
        }) 
    },

    deleteUsuario: (req, res) => {
        const { cedula } = req.params;
        const index = Usuarios.findIndex(item => item.cedula === cedula);

        if (index !== -1) {
            const UsuarioEliminado = Usuarios.splice(index, 1);
            res.json({
                mensaje: "Usuario eliminado exitosamente.",
                Usuario: UsuarioEliminado[0], // UsuarioEliminado es un array, así que toma el primer elemento
            });
        } else {
            res.json({ mensaje: "No se encontró el Usuario" });
        }
    },

};

const Usuarios = []; // Array que contiene los Usuarios

export default httpUsuarios;

