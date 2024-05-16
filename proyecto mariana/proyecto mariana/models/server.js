import express from "express"
import mongoose from "mongoose"

import formacion from "../routes/P-F.js"
import login from "../routes/login.js"
import instructores from "../routes/instructores.js"

import cors from "cors"
class Server { 
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    routes() { 
        this.app.use('/formacion', formacion)
        this.app.use('/login', login)
        this.app.use('/instru', instructores)
    }

    conectarDB() {
        mongoose.connect(process.env.MONGODB)
        .then(() => console.log('Ya esta conectado'));
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }
    escuchar() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
    routes(){
        this.app.use('/login', login)
        this.app.use('/formacion', formacion)
        this.app.use('/instructores', instructores)
    }
}

export default Server