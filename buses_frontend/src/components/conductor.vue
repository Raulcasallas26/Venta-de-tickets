<template>
    <q-layout view="lHh lpR lFf">
        <nav id="menu" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand">Tickets</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    </ul>
                </div>
            </div>
        </nav>
        <q-header id="anim" reveal class="text-white">
            <q-toolbar>
                <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->
                <q-breadcrumbs-el label="Home " to="/usuario" icon="home" />
                <q-toolbar-title>
                    <q-avatar>
                        <!-- <img src="https://acortar.link/gigbOV"> -->
                    </q-avatar>
                    Autobuses
                </q-toolbar-title>

                <q-btn dense flat round icon="menu" @click="toggleRightDrawer()" />
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
            <div class="welcome">
                <q-btn id="nuevo" @click="agregar()">Nuevo Conductor</q-btn>
                <table>
                    <thead>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cedula</th>
                        <th>Telefono</th>
                        <th>N° Licencia</th>
                        <th>Categiria Licencia</th>
                        <th>Fecha de venciminto de licencia</th>
                        <th>Fecha de creacion</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </thead>
                    <tbody>
                        <tr v-for="(r, i) in conductor" :key="i">
                            <td>{{ r.nombre }}</td>
                            <td>{{ r.apellido }}</td>
                            <td>{{ r.cedula }}</td>
                            <td>{{ r.telefono }}</td>
                            <td>{{ r.numLicencia }}</td>
                            <td>{{ r.categoriaLicencia }}</td>
                            <td>{{ r.fechaVenLicencia }}</td>
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
                                <button @click="activar(r, i)" v-if="r.estado == true">❌</button>
                                <button @click="activar(r, i)" v-else>✅</button>
                                <button @click="edito(r)">📝</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </q-page-container>
        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Registro Conductores</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md" style="width: 500px">
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="nombre" label="Nombre" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="apellido" label="Apellido" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="cedula" label="Cedula" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="telefono" label="Telefono" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="numLicencia" label="N° de licencia" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="catLicencia" label="Categoria de licencia" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="fechaVenLicencia" mask="YYYY-MM-DD" filled type="date"
                                    label="Fecha de vencimiento de licencia" />
                            </div>
                        </q-card-section>

                        <!-- <q-separator inset /> -->
                        <q-card-section>
                            <div role="alert"
                                style="border: 2px solid red; border-radius: 20px; text-align: center; background-color: rgba(255, 0, 0, 0.304);"
                                v-if="check !== ''">
                                <div>
                                    {{ check }}
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Guardar" @click="guardar()" color="primary" v-close-popup/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="editar">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Edicion de Conductores</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md" style="width: 500px">
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="nombre" label="Nombre" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="apellido" label="Apellido" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="cedula" label="Cedula" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="telefono" label="Telefono" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="numLicencia" label="N° de licencia" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="catLicencia" label="Categoria de licencia" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="fechaVenLicencia" filled type="date"
                                    label="Fecha de vencimiento de licencia" @change="ver()" />

                            </div>
                        </q-card-section>
                        <q-card-section>

                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Guardar Edicion" @click="editarConductor()" color="primary" v-close-popup/>
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
import { useConductorStore } from "../stores/Conductor.js";
let rightDrawerOpen = ref(false)
let alert = ref(false)
let editar = ref(false)
let nombre = ref("");
let check = ref("")
let apellido = ref("");
let cedula = ref("");
let telefono = ref("");
let numLicencia = ref("");
let catLicencia = ref("");
let fechaVenLicencia = ref("");
let estado = ref(true);
let indice = ref(null)
const useConductor = useConductorStore();

async function listarConductores() {
    let Conductor = await useConductor.getConductor()
    console.log(Conductor);
    conductor.value = Conductor.data.conductores
}
listarConductores()

async function activar(r, i) {
    if (r.estado === true) {
        r.estado = (r._id, false)
    } else {
        r.estado = (r._id, true)
    }
}
async function editarConductor() {
    let r = await useConductor.editConductor(indice.value, {
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        telefono: telefono.value,
        numLicencia: numLicencia.value,
        catLicencia: catLicencia.value,
        fechaVenLicencia: fechaVenLicencia.value
    })
    console.log(r);
    listarConductores()
    limpiarLista()
}
function edito(r) {
    editar.value = true
    indice.value = r._id
    nombre.value = r.nombre
    apellido.value = r.apellido
    cedula.value = r.cedula
    telefono.value = r.telefono
    numLicencia.value = r.numLicencia
    catLicencia.value = r.categoriaLicencia.substring(0, 10)
    fechaVenLicencia.value = r.fechaVenLicencia.substring(0, 10)
}
async function guardar() {
    let r = await useConductor.addConductor({
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        telefono: telefono.value,
        numLicencia: numLicencia.value,
        categoriaLicencia: catLicencia.value,
        fechaVenLicencia: fechaVenLicencia.value,
    });
    console.log(r);
    limpiarLista()
    listarConductores()
}
// function validar() {
//     if (nombre.value.trim() === "") {
//         check.value = "Debes digitar tu Nombre";
//     } else if (apellido.value.trim() === "") {
//         check.value = "Debes digitar tu Apellido";
//     } else if (cedula.value.trim() === "") {
//         check.value = "Debes digitar el numero de Cedula";
//     } else if (telefono.value.trim() === "") {
//         check.value = "Debes digitar el numero de Telefono";
//     } else if (numLicencia.value.trim() === "") {
//         check.value = "Debes ingresar el numero de licencia";
//     } else if (catLicencia.value.trim() === "") {
//         check.value = "Debes ingrasar la categoria de licencia";
//     } else if (fechaVenLicencia.value.trim() === "") {
//         check.value = "Debes ingresar una fecha de vencimiento de la licencia";
//     } else {
//         limpiarLista()
//         check.value = ""
//         Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Registrado exitosamente",
//             showConfirmButton: false,
//             timer: 3000,
//         });
//         return true;
//     }
// }

function limpiarLista() {
    nombre.value = ""
    apellido.value = ""
    cedula.value = ""
    telefono.value = ""
    numLicencia.value = ""
    catLicencia.value = ""
    fechaVenLicencia.value = ""
}
function toggleRightDrawer() {
    rightDrawerOpen.value = !rightDrawerOpen.value
}
onMounted(() => {
    listarConductores()
})

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

#icon {
    width: 50px;
}

.welcome {
    display: block;
    text-align: center;
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
}
</style>