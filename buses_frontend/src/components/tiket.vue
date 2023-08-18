<template>
    <q-layout view="lHh lpR lFf">
        <q-header id="anim" reveal class="text-white">
            <q-toolbar>
                <!-- <q-btn dense flat round icon="menu" @click="left" /> -->
                <q-breadcrumbs-el label="Home " to="/usuario" icon="home" />
                <q-toolbar-title>
                    <q-avatar>
                        <!-- <img src="https://acortar.link/gigbOV"> -->
                    </q-avatar>
                    Tickets
                </q-toolbar-title>
                <q-btn dense flat round icon="menu" @click="right" />
            </q-toolbar>
        </q-header>
        <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile">

        </q-drawer>
        <q-drawer show-if-above :width="200" :breakpoint="400" v-model="rightDrawerOpen" side="right" behavior="mobile">
            <q-img class="absolute-top" src="../img/fondo1.jpg"
                style="height: 150px; background-image: linear-gradient(to bottom,rgba(5, 5, 5, 0.7),rgba(0, 0, 0, 0.7))">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="56px" class="q-mb-sm">
                        <img src="../img/perfil.png">
                    </q-avatar>
                    <div class="text-weight-bold">Razvan Stoenescu</div>
                    <div>@rstoenescu</div>
                </div>
            </q-img>
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item clickable v-ripple to="/rutas">
                        <q-item-section avatar>
                            <q-icon name="map" />
                        </q-item-section>
                        <q-item-section id="bt">
                            Rutas
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-ripple to="/ventas">
                        <q-item-section avatar>
                            <q-icon name="store" />
                        </q-item-section>
                        <q-item-section id="bt">
                            Ventas
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-ripple to="/buses">
                        <q-item-section avatar>
                            <q-icon name="directions_bus" />
                        </q-item-section>
                        <q-item-section id="bt">
                            Buses
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-ripple to="/cliente">
                        <q-item-section avatar>
                            <q-icon name="people" />
                        </q-item-section>
                        <q-item-section id="bt">
                            Clientes
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-ripple to="/usuarios">
                        <q-item-section avatar>
                            <q-icon name="people" />
                        </q-item-section>
                        <q-item-section id="bt">
                            Usuarios
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-ripple to="/conduc">
                        <q-item-section avatar>
                            <q-icon name="people" />
                        </q-item-section>
                        <q-item-section id="bt">
                            Conductores
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-ripple to="/">
                        <q-item-section avatar>
                            <q-icon name="home" />
                        </q-item-section>
                        <q-item-section id="bt">
                            Cerrar Sesion
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>
        <q-page-container>
            <router-view />
            <q-select filled v-model="model" :options="options" label="Rutas" />
            <q-card flat bordered class="my-card" style="width: 600px; justify-content: center;">
                <q-card-section class="q-pa-md" style="width: 600px">
                    <div class="q-gutter-md" style="max-width: 600px">
                        <q-input v-model="cedula" label="Cedula" />
                    </div>
                    <div class="q-gutter-md" style="max-width: 600px">
                        <q-input v-model="nombre" label="Nombre" />
                    </div>
                    <div class="q-gutter-md" style="max-width: 600px">
                        <q-input v-model="apellido" label="Apellido" />
                    </div>
                    <div class="q-gutter-md" style="max-width: 600px">
                        <q-input v-model="telefono" label="# Telefono" />
                    </div>
                    <div class="q-gutter-md" style="max-width: 600px">
                        <q-input v-model="precio" label="Precio" />
                    </div>
                    <q-btn id="nuevo" @click="agregar(), guardarCliente()">Comprar</q-btn>
                </q-card-section>
            </q-card>
            <q-card flat bordered class="my-card" style="justify-content: center;">
                <q-card-section class="q-pa-md" style="width: 600px">
                    <button class="btn btn-success" v-for="index in puestos" :key="(index)" id="boton">{{ String(index)
                    }}</button>
                </q-card-section>
            </q-card>


        </q-page-container>
        <q-dialog v-model="factura">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Factura</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md" style="width: 500px">
                            <div id="app" class="col-11">
                                <div class="row">
                                    <div class="col-10">
                                        <b>NIT: </b>
                                        <span>1589650225</span><br>
                                        <i>Vendedor: </i>
                                        <span>{{ }}</span><br>
                                        <i># Viaje: </i>
                                        <span>{{ }}</span>
                                    </div>
                                    <div class="col-2">
                                        <img src="" />
                                    </div>
                                </div>
                                <hr />
                                <b>Factura para: </b>
                                <span>{{ }}</span><br>
                                <b>Cedula: </b>
                                <span>{{ }}</span><br>
                                <b># Silla: </b>
                                <span>{{ }}</span><br>
                                <b># bus: </b>
                                <span>{{ }}</span><br>
                                <b>Placa: </b>
                                <span>{{ }}</span><br>
                                <b>N° de factura: </b>
                                <span>{{ }}</span><br>
                                <b>Fecha de Expedicion: </b>
                                <span>{{ }}</span><br>
                                <b>Fecha de vencimiento: </b>
                                <span>{{ }}</span><br>
                                <div class="cond row">
                                    <div class="col-12 mt-3"><br>
                                        <b>Valor: </b>
                                        <p style="font-size:xx-large;"></p>
                                        <p>
                                            Contactos
                                            <br />
                                            Venta de tickets
                                            <br />
                                            TEL: 3215897565
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </q-card-section>
                        <q-card-section>
                        </q-card-section>
                    </q-card>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Imprimir" @click="factura()" color="primary" />
                    <q-btn flat label="Perfil" to="/usuario" color="primary" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-footer id="foter" reveal elevated>
            <q-toolbar>
                <q-toolbar-title>
                    <span></span>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClienteStore } from "../stores/cliente.js"
let rightDrawerOpen = ref(false)
let nombre = ref("");
let apellido = ref("");
let cedula = ref("");
let telefono = ref("")
let puestos = ref(15)
let precio = ref("5500")
let factura = ref(false)
let indice = ref(null)
let model = ref(null)
let clien = ref([])
let options = ref([])
const useCliente = useClienteStore();
async function editCliente() {
    let r = await useCliente.editCliente(indice.value, {
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        telefono: telefono.value,
    })
    console.log(r);
    limpiarLista()
}
// async function listarCliente() {
//     let cliente = await useCliente.getCliente()
//     console.log(cliente);
//     clien.value = cliente.data.cliente
// }

async function guardarCliente() {
    let r = await useCliente.addCliente({
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        telefono: telefono.value,
    });
    console.log(r);
    limpiarLista()
}
function limpiarLista() {
    nombre.value = ""
    apellido.value = ""
    cedula.value = ""
    telefono.value = ""
}
const right = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
}
function agregar() {
    factura.value = true
}
</script>

<style scoped>
.factura {
    table-layout: fixed;
}

.fact-info>div>h5 {
    font-weight: bold;
}

.factura>thead {
    border-top: solid 3px #000;
    border-bottom: 3px solid #000;
}

.factura>thead>tr>th:nth-child(2),
.factura>tbod>tr>td:nth-child(2) {
    width: 300px;
}

.factura>thead>tr>th:nth-child(n+3) {
    text-align: right;
}

.factura>tbody>tr>td:nth-child(n+3) {
    text-align: right;
}

.factura>tfoot>tr>th,
.factura>tfoot>tr>th:nth-child(n+3) {
    font-size: 24px;
    text-align: right;
}

.cond {
    border-top: solid 2px #000;
}

tr:nth-child(even) td {
    background: #b6c7f551;
}

tr:nth-child(odd) td {
    background: #FEFEFE;
}

tr td:hover {
    background: #ff80003a;
    color: #0429fd;
}

#foter {
    background-color: rgba(0, 68, 255, 0.774);
}

#col {
    margin: 50px;
}

#bt {
    background: #fff;
    /* color de fondo */
    color: #000000;
    border-radius: 5px;
    margin: 5px;
    font-size: large;
}
#bt:hover {
    background: #ff80003a;
    color: #0429fd;
}

#anim {
    color: #fff;
    background-color: rgb(255, 115, 0);
}

#icon {
    width: 50px;
}

#bt {
    background: #fff;
    /* color de fondo */
    color: #000000;
    border-radius: 5px;
    margin: 5px;
    font-size: large;
}
#bt:hover {
    background: #ff80003a;
    color: #0429fd;
}

#nuevo {
    background: #fff;
    /* color de fondo */
    color: #000000;
    /* color de fuente */
    border: 2px solid #b0aef3;
    /* tamaño y color de borde */
    padding: 16px 20px;
    border-radius: 3px;
    /* redondear bordes */
    position: relative;
    z-index: 1;
    overflow: hidden;
    display: inline-block;
    margin: 5px;
}

#nuevo:hover {
    color: #fff;
    /* color de fuente hover */
}

#nuevo::after {
    content: "";
    background: rgba(0, 68, 255, 0.774);
    /* color de fondo hover */
    position: absolute;
    z-index: -1;
    padding: 16px 20px;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: scale(0, 0);
    transition: all 0.3s ease;
}

#nuevo:hover::after {
    transition: all 0.3s ease-out;
    transform: scale(1, 1);
}</style>