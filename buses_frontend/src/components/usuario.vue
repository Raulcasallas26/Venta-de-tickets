<template>
    <q-layout view="lHh lpR lFf" id="carr">
        <ul id="carr" class="navbar-nav">
            <q-breadcrumbs-el id="menu" label="Rutas " to="/rutas" icon="map" />
            <q-breadcrumbs-el id="menu" label="Tickets " to="/tickets" icon="note" />
            <q-breadcrumbs-el id="menu" label="Buses " to="/buses" icon="directions_bus" />
            <q-breadcrumbs-el id="menu" label="Ventas " to="/ventas" icon="notes" />
            <q-breadcrumbs-el id="menu" label="Cerrar Sesión " to="/" icon="exit" />
            <q-breadcrumbs-el id="menu" label="" to="" icon="" />
        </ul>
        <q-header id="anim" reveal class="text-white">
            <q-toolbar>
                <!-- <q-btn dense flat round icon="menu" @click="left" /> -->
                <!-- <q-breadcrumbs-el label="Home " to="/" icon="home" /> -->
                <q-breadcrumbs-el label="Cerrar Sesión" to="/" icon="home" />
                <q-toolbar-title>
                    <q-avatar>
                        <!-- <img src="https://acortar.link/gigbOV"> -->
                    </q-avatar>
                    Mi perfil
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
            <q-card id="car" class="my-card">
                <q-item>
                    <q-item-section>

                        <img style="border-radius: 50%; width: 80px; height: 80px;" src="../img/perfil.png">

                    </q-item-section>
                    <div v-for="(r, p) in user" :key="p"></div>
                    <q-item-section>
                        <q-item-label>Nombre</q-item-label>
                        <q-item-label>{{ nombre }}</q-item-label>
                        <q-item-label caption>Cargo</q-item-label>
                        <q-item-label caption>{{ cargo }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item-label>Apellido</q-item-label>
                <q-item-label caption>{{ apellido }}</q-item-label>
                <q-item-label>cedula</q-item-label>
                <q-item-label caption>{{ cedula }}</q-item-label>
                <q-item-label>telefono</q-item-label>
                <q-item-label caption>{{ telefono }}</q-item-label>
            </q-card>
        </q-page-container>
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
import { useUsuarioStore } from '../stores/Usuario.js';
let rightDrawerOpen = ref(true)
let users = ref([])
const right = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
}
const useUsuario = useUsuarioStore();
async function listarUsuarios() {
    let usuarios = await useUsuario.getUsers()
    console.log(usuarios);
    users.value = usuarios.data.Usuarios
    console.log(users.value.nombre);
}
listarUsuarios()
onMounted(() => {
    listarUsuarios()
})
</script>
<style scoped>
#foter {
    background-color: rgba(0, 68, 255, 0.774);
}

#menu {
    font-size: 18px;
    background-color: #00000050;
}

#navbarNav {
    margin-top: 50px;
    background-color: #00000051;
}

#menu {
    height: 100px;
    background-color: rgb(255, 255, 255);
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
    margin-top: 180px;
}</style>