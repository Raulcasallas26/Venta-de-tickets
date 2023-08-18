<template>
    <q-layout view="hHh lpR fFf">
        <nav id="menu" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand">Tickets</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <q-breadcrumbs-el label="Home" to="/usuario" icon="home" />
                    </ul>
                </div>
            </div>
        </nav>
        <q-header id="menu" elevated class=" text-white">
            <q-toolbar>

            </q-toolbar>
        </q-header>

        <q-header id="anim" elevated class=" text-white">
            <q-toolbar>
                <!-- <q-btn dense flat round icon="menu" @click="left()" /> -->
                <q-breadcrumbs-el label="Home " to="/usuario" icon="home" />
                <q-toolbar-title>
                    <q-avatar>
                        <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"> -->
                    </q-avatar>
                    Registro de Buses
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
                    <q-item clickable v-ripple to="/tickets">
                        <q-item-section avatar>
                            <q-icon name="note" />
                        </q-item-section>
                        <q-item-section id="bt">
                            Tickets
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
            <q-btn id="nuevo" @click="agregar()">Nuevo Bus</q-btn>
            <table>
                <thead>
                    <th>Numero</th>
                    <th>Placa</th>
                    <th>Tipo de bus</th>
                    <th>Capacidad</th>
                    <th>Marca</th>
                    <th>Conductor</th>
                    <th>Fecha de creacion</th>
                    <th>Estado</th>
                    <th>Opciones</th>
                </thead>
                <tbody>
                    <tr v-for="(r, i) in bus" :key="i">
                        <td>{{ r.numero }}</td>
                        <td>{{ r.placa }}</td>
                        <td>{{ r.tipobus }}</td>
                        <td>{{ r.capacidad }}</td>
                        <td>{{ r.marca }}</td>
                        <td>{{ r.conductor }}</td>
                        <td>{{ r.fechacreacion.substring(0, 10) }}</td>
                        <td>
                            <span v-if="r.estado == true" style="color: green;">
                                Activo
                            </span>
                            <span v-else style="color: red;">
                                Inactivo
                            </span>
                        </td>
                        <td>
                            <button @click="activar(r, i)" v-if="r.estado === true">❌</button>
                            <button @click="activar(r, i)" v-else>✅</button>
                            <button @click="edito(r)">📝</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </q-page-container>

        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Registro de buses</div>
                </q-card-section>
                <q-card flat bordered class="my-card">
                    <q-card-section>
                    </q-card-section>
                    <q-card-section class="q-pa-md" style="width: 500px">
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="numero" label="Numero" />
                        </div>
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="placa" label="Placa" />
                        </div>
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-select filled v-model="tipobus" :options="options" label="Tipo bus" />
                        </div>
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="capacidad" label="Capacidad" />
                        </div>
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="marca" label="Marca" />
                        </div>
                        <div class="q-pa-md" style="max-width: 500px">
                            <div class="q-gutter-md">
                                <q-select v-model="conductor" :options="conduc" label="Conductor" />
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator inset />
                    <q-card-section>

                    </q-card-section>
                </q-card>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Guardar" @click="guardar()" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="editar">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Registro de buses</div>
                </q-card-section>
                <q-card flat bordered class="my-card">
                    <q-card-section>
                    </q-card-section>
                    <q-card-section class="q-pa-md" style="width: 500px">
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="numero" label="Numero" />
                        </div>
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="placa" label="Placa" />
                        </div>
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-select filled v-model="tipobus" :options="options" label="Tipo bus" />
                        </div>
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="capacidad" label="Capacidad" />
                        </div>
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="marca" label="Marca" />
                        </div>
                        <div class="q-pa-md" style="max-width: 500px">
                            <div class="q-gutter-md">
                                <q-select v-model="conductor" :options="conduc" label="Conductor" />
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator inset />
                    <q-card-section>

                    </q-card-section>
                </q-card>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Guardar edicion" @click="editarbus()" color="primary" v-close-popup />
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
import { useBusStore } from "../stores/Bus.js";
import { onMounted, ref } from "vue";
const useBuses = useBusStore();
let alert = ref(false);
let editar = ref(false);
let numero = ref("");
let placa = ref("");
let tipobus = ref("");
let capacidad = ref("");
let marca = ref("");
let conductor = ref("");
let indice = ref(null)
let bus = ref([]);
let conduc = ref ([])
let options = ref([
    'Microbus', 'Minibus', 'Buseta', 'Buseton', 'Autobus'
])

async function listarBuses() {
    let buses = await useBuses.getBuses()
    console.log(buses);
    bus.value = buses.data.Buses
}

listarBuses()

async function editarbus() {
    let r = await useBuses.editBus(indice.value, {
        numero: numero.value,
        placa: placa.value,
        tipobus: tipobus.value,
        capacidad: capacidad.value,
        marca: marca.value,
        conductor: conductor.value,
    })
    console.log(r);
    listarBuses()
    limpiarLista()
}
function edito(r) {
    editar.value = true
    indice.value = r._id
    numero.value = r.numero
    placa.value = r.placa
    tipobus.value = r.tipobus
    capacidad.value = r.capacidad
    marca.value = r.marca
    conductor.value = r.conductor
}
async function guardar() {
    let r = await useBuses.addBuses({
        numero: numero.value,
        placa: placa.value,
        tipobus: tipobus.value,
        capacidad: capacidad.value,
        marca: marca.value,
        conductor: conductor.value
    });
    console.log(r);
    limpiarLista()
    listarBuses()
}
function limpiarLista() {
    numero.value = ""
    placa.value = ""
    tipobus.value = ""
    capacidad.value = ""
    marca.value = ""
    conductor.value = ""
}
async function activar(r, i) {
    console.log("hola soy activar");
    if (await i.estado === true) {
        bus.value[r].estado = false;
    } else {
        bus.value[r].estado = true;
    }
}

/* onMounted(() => {
    listarBuses()
}) */
let leftDrawerOpen = ref(false)
let rightDrawerOpen = ref(false)

const right = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
}

function agregar() {
    alert.value = true
}


</script>

<style scoped>
table {
    color: #000000;
    font-family: Helvetica, Arial, sans-serif;
    border-collapse: collapse;
}

td,
th {
    border: 1px solid rgb(117, 117, 117);
}

th {
    background: #5a77ee98;
    font-weight: bold;
    font-size: large;
    padding: 15px;
}

td {
    background: #5482cb;
    text-align: center;
    padding: 5px;
    font-size: medium;
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
    background: #f86300;
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