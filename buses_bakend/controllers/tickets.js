// import tickets from "../models/tickets.js";
import ticketsModel from "../models/tickets.js"

const httptickets = {
    gettickets: async (req, res) => {
        const ticket = await ticketsModel.find()
        res.json({ ticket })
    },
    getticketsCedula: async (req, res) => {
        const { cedula } = req.params;
        const ticket = tickets.find((item) => item.id == id);
        res.json({ ticket });
    },
    posttickets: async (req, res) => {
        const {numSilla,numViaje, bus, nombreVendedor, cliente, pago, fechaHoraCompra, fechaHoraSalida} = req.body;
        const ticket = new ticketsModel({
            numSilla,
            numViaje,
            bus,
            nombreVendedor,
            cliente,
            pago,
            fechaHoraCompra,
            fechaHoraSalida
        });
        await ticket.save()
        res.json({
            mensaje: "1 tickets insertado!!",
            ticket,
        });

    },
    deletetickets: (req, res) => {
        const { cedula } = req.params;
        const index = tickets.findIndex(item => item.cedula === cedula);

        if (index !== -1) {
            const ticketsEliminado = tickets.splice(index, 1);
            res.json({
                mensaje: "tickets eliminado exitosamente.",
                tickets: ticketsEliminado[0], // ticketsEliminado es un array, así que toma el primer elemento
            });
        } else {
            res.json({ mensaje: "No se encontró el tickets" });
        }
    },
};

const tickets = []; // Array que contiene los Usuarios

export default httptickets;