<template>
    <q-layout view="lHh lpR lFf">

        <q-header id="anim" reveal class="text-white">
            <q-toolbar>
                <!-- <q-btn dense flat round icon="menu" @click="left" /> -->
                <q-breadcrumbs-el label="Home " to="/" icon="home" />
                <q-toolbar-title>
                    <q-avatar>
                        <!-- <img src="https://acortar.link/gigbOV"> -->
                    </q-avatar>
                    Login
                </q-toolbar-title>
                <!-- <q-btn dense flat round icon="menu" @click="right" /> -->
            </q-toolbar>
        </q-header>
        <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile">
        </q-drawer>
        <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile">
        </q-drawer>
        <q-page-container>
            <router-view />
            <q-card id="card" flat bordered class="my-card">
                <q-card-section>
                    <div clsass="text-h6">Iniciar sesion</div>
                </q-card-section>
                <q-card-section class="q-pa-md" style="width: 500px">
                    <div class="q-pa-md" style="max-width: 500px">
                        <div class="q-gutter-md">
                            <q-select  :options="options_rol" label="Rol" />
                        </div>
                    </div>
                    <div class="q-gutter-md" style="max-width: 500px">
                        <q-input  label="Cedula" />
                    </div>
                    <q-input id="contra" class="q-gutter-md" label="Contraseña" filled :type="isPwd ? 'password' : 'text'"
                        hint="">
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                @click="isPwd = !isPwd" />
                        </template>
                    </q-input>

                </q-card-section>

                <q-separator inset />
                <q-btn id="ventik" class="btn btn-outline-success me-5" to="/usuario">Iniciar</q-btn>
                <q-card-section>

                </q-card-section>
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
import { ref } from 'vue'
let leftDrawerOpen = ref(false)
let rightDrawerOpen = ref(false)
let isPwd= ref(true)
const options_rol = ref([
    'Administrador', 'Vendedor'
])
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
#contra{
    margin: px;
}

#qbt {
    margin-right: 10px;
}

#card {
    margin-top: 80px;
}

#bt1 {
    margin-top: 20px;
    background: linear-gradient(#00f 80%, #002df800);
    color: #fff;
}

#bt {
    background: linear-gradient(#00f 80%, #002df800);
    margin-top: 5px;
    color: #fff;
}

#anim {
    color: #fff;
    background-color: rgb(255, 115, 0);
}

#icon {
    width: 50px;
}
</style>