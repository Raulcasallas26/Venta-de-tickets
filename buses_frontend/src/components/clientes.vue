<template>
    <q-layout view="lHh lpR lFf">
        <nav id="menu" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand">Clientes</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <q-breadcrumbs-el label="Home  " to="/usuario" icon="home" />
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
                    Clientes
                </q-toolbar-title>

                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
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
            <div class="welcome">
                <q-btn id="nuevo" @click="agregar()">Nuevo Cliente</q-btn>
                
                <table>
                    <thead>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cedula</th>
                        <th>Telefono</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </thead>
                    <q-spinner-grid color="teal" v-if="cargar === true"/>
                    <tbody v-else>                        
                        <tr v-for="(r, i) in users" :key="i">
                            <td>{{ r.nombre }}</td>
                            <td>{{ r.apellido }}</td>
                            <td>{{ r.cedula }}</td>
                            <td>{{ r.telefono }}</td>
                            <td>
                                <span v-if="r.estado==true" style="color: green;">
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
            </div>
        </q-page-container>
        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Registro</div>
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
                                <q-input v-model="email" label="E-mail" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="direccion" label="Direccion" />
                            </div>
                            <q-input v-model="contrasena" filled :type="isPwd ? 'password' : 'text'" label="Contraseña">
                                <template v-slot:append>
                                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                        @click="isPwd = !isPwd" />
                                </template>
                            </q-input>
                        </q-card-section>
                        <q-card-section>

                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Guardar" @click="guardar()" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="editar">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Edición</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-card flat bordered class="my-card">
                        <q-card-section class="q-pa-md" style="width: 500px">
                            <div class="q-pa-md" style="max-width: 500px">
                                <div class="q-gutter-md">
                                    <q-select v-model="rol" :options="options_rol" label="Rol" />
                                </div>
                            </div>
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
                                <q-input v-model="email" label="E-mail" />
                            </div>
                            <div class="q-gutter-md" style="max-width: 500px">
                                <q-input v-model="direccion" label="Direccion" />
                            </div>
                        </q-card-section>
                        <q-card-section>

                        </q-card-section>
                    </q-card>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                    <q-btn flat label="Guardar edición" @click="editarUsers()" color="primary" v-close-popup />
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
import { useUsuarioStore } from "../stores/Usuario.js";
let leftDrawerOpen = ref(false)
let rightDrawerOpen = ref(false)
let alert = ref(false)
let editar = ref(false)
let users = ref([])
let nombre = ref("");
let apellido = ref("");
let cedula = ref("");
let telefono = ref("");
let email = ref("");
let direccion = ref("");
let contrasena = ref("")
let rol = ref(null);
let estado = ref(true);
let isPwd = ref(true);
let indice = ref(null)
const options_rol = ref([
    'Administrador', 'Vendedor'
])
const useUsuario = useUsuarioStore();
async function editarUsers() {
    let r = await useUsuario.editUsers(indice.value, {
        rol: rol.value,
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        telefono: telefono.value,
        email: email.value,
        direccion: direccion.value,
    })
    console.log(r);
    listarUsuarios()
    limpiarLista()
}
function edito(r) {
    editar.value = true
    indice.value = r._id
    rol.value = r.rol
    nombre.value = r.nombre
    apellido.value = r.apellido
    cedula.value = r.cedula
    telefono.value = r.telefono
    email.value = r.email
    direccion.value = r.direccion
}
async function listarUsuarios() {
    let usuarios = await useUsuario.getUsers()
    console.log(usuarios);
    users.value = usuarios.data.Usuarios
}
async function activar(r,i) {
    if (r.estado === true) {
        r.estado =(r._id, false)
    } else {
        r.estado =(r._id, true)
    }
}
async function guardar() {
    let r = await useUsuario.addUsuario({
        rol: rol.value,
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        telefono: telefono.value,
        email: email.value,
        direccion: direccion.value,
        contrasena: contrasena.value
    });
    console.log(r);
    limpiarLista()
    listarUsuarios()
}
listarUsuarios()
function limpiarLista() {
    rol.value = ""
    nombre.value = ""
    apellido.value = ""
    cedula.value = ""
    telefono.value = ""
    email.value = ""
    direccion.value = ""
    contrasena.value = ""
}
function toggleRightDrawer() {
    rightDrawerOpen.value = !rightDrawerOpen.value
}
onMounted(() => {
    listarUsuarios()
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