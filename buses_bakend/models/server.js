import express from "express"
import mongoose from "mongoose"
import usuarios from "../routes/Usuarios.js"
import buses from "../routes/buses.js"
import ticket from "../routes/tickets.js"
import clientes from "../routes/clientes.js"
import ruta from "../routes/rutas.js"
import conductores from "../routes/conductores.js"
import cors from "cors"
class Server { 
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    routes() { 
        this.app.use('/usuario', usuarios)
        this.app.use('/buses', buses)
        this.app.use('/ticket', ticket)
        this.app.use('/conduc',conductores)
        this.app.use('/clientes',clientes)
        this.app.use('/rutas',ruta)
    }

    conectarDB() {
        mongoose.connect(process.env.MONGODB)
        .then(() => console.log('Connected!'));
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static('public'))
    }
    escuchar() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
}

export default Server