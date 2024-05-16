import { defineStore } from 'pinia'
import axios from "axios"
import { urlBackend } from '../routes/direccion.js'
import { ref } from "vue"
export const useUsuarioStore = defineStore(
    "usuarios", () => {
        let cargar = ref(false)
        const addUsuario = async (info) => {
            try {
                let res = await axios.post(`${urlBackend}/usuario`, info)
                return res
            } catch (error) {
                console.log("hay un error en la post");
                return error
            }
        }

        const getUsers = async () => {
            try {
                let res = await axios.get(`${urlBackend}/usuario`)
                return res
            } catch (error) {
                console.log("hay un error en el get");
                return error
            }
        }
        const editUsers = async (id, info) => {
            try {
                let res = await axios.put(`${urlBackend}/usuario/${id}`, info)
                return res
            } catch (error) {
                console.log("hay un error en edirUsers");
                return error
            }
        }
        const activarUser = async (id) => {
            try {
                let res = await axios.put(`${urlBackend}/usuario/estado/${id}`)
                return res.data
            } catch (error) {
                console.log("hay un error en activarUser");
                return error
            }
        }
        return {
            addUsuario, getUsers, editUsers, activarUser, cargar
        }
    }
)
