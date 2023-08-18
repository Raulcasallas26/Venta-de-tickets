<template >
    <q-layout view="lHh lpR lFf">
        <div>
            <nav id="menu" class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand">Tickets</a>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <q-breadcrumbs-el label="Iniciar sesion  " to="/login" icon="login" />
                        </ul>
                    </div>
                </div>
            </nav>
            <q-header id="anim" reveal class="text-white">
                <q-toolbar>
                    <!-- <q-btn dense flat round icon="menu" @click="left" /> -->

                    <q-toolbar-title>
                        <q-avatar>
                            <!-- <img src="https://acortar.link/gigbOV"> -->
                        </q-avatar>
                        Autobuses
                    </q-toolbar-title>

                    <!-- <q-btn dense flat round icon="menu" @click="right" /> -->
                </q-toolbar>
            </q-header>

            <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile">

            </q-drawer>

            <!-- <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile">
                <q-btn id="bt" label="Home" to="/" icon="home"></q-btn><br>
                <q-btn id="bt" label="Login" to="/login" icon="login"></q-btn><br>
                <q-btn id="bt" label="Rutas" icon="map" to="/rutas"></q-btn><br>
            </q-drawer> -->

            <q-page-container>
                <router-view />

                <div class="welcome">
                    <h1>Bienvenido a Autobuses</h1>
                    <p>¡Gracias por visitarnos!</p>
                    <q-btn id="inicio" class="btn btn-outline-success me-5" to="/login">Iniciar Sesion</q-btn>
                </div>
            </q-page-container>

            <!-- <q-footer id="anim" class="text-white" style="height: 50px;">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://acortar.link/vBIVg8"> 
                    </q-avatar>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer> -->
        </div>
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
import { ref } from 'vue'
let leftDrawerOpen = ref(false)
let rightDrawerOpen = ref(false)
function left() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const right = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
<style scoped>
#foter {
    background-color: rgba(0, 68, 255, 0.774);
}

#menu {
    height: 100px;
}

#bt {
    background: #fff;
    /* color de fondo */
    color: #000000;
    /* color de fuente */
    border: 2px solid #2f2f38a2;
    /* tamaño y color de borde */
    padding: 5px 15px;
    border-radius: 5px;
    /* redondear bordes */
    position: relative;
    z-index: 1;
    overflow: hidden;
    display: inline-block;
    margin: 2px;
}

#bt:hover {
    color: #fff;
    /* color de fuente hover */
}

#bt::after {
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
    transform: scale(0, 0) rotate(-180deg);
    transition: all 0.3s ease;
}

#bt:hover::after {
    transition: all 0.3s ease-out;
    transform: scale(1, 1) rotate(0deg);
}

#inicio {
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
}

#inicio:hover {
    color: #fff;
    /* color de fuente hover */
}

#inicio::after {
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

#inicio:hover::after {
    transition: all 0.3s ease-out;
    transform: scale(1, 1);
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
</style>