<template>
<q-layout view="hHh Lpr fFf">
    <q-header elevated>
        <q-toolbar class="bg-visuel text-white q-px-lg">
            <img src="../assets/logo_barber-sn-fondo.svg" height="35" width="65" />
            <img src="../assets/wendys_completo.svg" height="35" width="65" />
            <q-toolbar-title>
                <div class="text-white q-pt-sm" :hidden="$q.screen.lt.sm">
                    {{ empresa.nombre }}
                </div>
            </q-toolbar-title>
            <div class="q-pr-md text-white">
                {{ fecha }}
                <q-chip size="18px" icon="schedule">
                    {{ hora }}
                </q-chip>
                <q-btn-dropdown stretch flat icon="perm_identity" :label="username">
                    <q-list>
                        <q-item-label header>Configuración</q-item-label>
                        <q-item clickable v-close-popup tabindex="0" to="/perfil">
                            <q-item-section avatar>
                                <q-avatar color="secondary" text-color="white">
                                    <img :src="icon_user" height="35" width="65" />
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ username }}</q-item-label>
                                <q-item-label caption>Perfil</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator inset spaced />
                        <q-item v-close-popup tabindex="0">
                            <div align="center">
                                <q-btn flat icon="logout" style="color: #39b54a" label="Salir" @click="logout()" />
                            </div>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </q-toolbar>
        <q-tabs v-model="tab" align="left" dense no-caps inline-label class="bg-visuel text-white shadow-2">
            <q-tab name="productos" icon="reorder" label="Productos" @click="$router.push('inv_productos')" />
            <q-tab name="categoria_producto" icon="category" label="Categorías" @click="$router.push('categoria_producto')" />
            <q-tab name="historial_producto" icon="price_change" label="Historial de precios " @click="$router.push('historial_producto')" />
            <q-tab name="uom_producto" icon="straighten" label="Unidad de medida" @click="$router.push('uom_producto')" />

        </q-tabs>
    </q-header>

    <q-page-container>
        <router-view />
    </q-page-container>
    <q-footer align="center" reveal elevated class="bg-visuel text-white shadow-2" small>
        <div class="text">ⓒ Visuel Code Technologys</div>
    </q-footer>
</q-layout>
</template>

<script>
import {
    defineComponent,
    ref
} from "vue";
import {
    mapActions
} from "vuex";
import InfoUser from "../utils/UserData";
export default {
    name: "MainLayoutAdmin",
    data() {
        return {
            hora: "00:00:00",
            fecha: "",
            username: "",
            route: "",
            text: "",
            tab: ref("inventario"),
            empresa: [],
            logoIMG: "",
            icon_user: InfoUser.icon_user(),
        };
    },
    mounted() {
        this.mueveReloj()
        this.getEmpresa()
        this.empresa = JSON.parse(sessionStorage.getItem("empresa"));
        this.setUser();
        if (this.empresa) {
            var urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
            this.logoIMG = urlsplit + "/images/empresa/" + this.empresa.logo;
        } else {
            this.empresa = {
                nombre: "POS",
                slogan: "",
                logo: "",
            };
            var urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
            this.logoIMG = urlsplit + "/images/empresa/icon.png";
        }
    },
    methods: {
        ...mapActions("auth", ["sendLogoutRequest"]),
        ...mapActions("configuracion", ["fetchEmpresaActive"]),
        mueveReloj() {
            setInterval(() => {
                var momentoActual = new Date()
                var horaActual = momentoActual.toLocaleTimeString()
                this.hora = horaActual
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                var fechaActual = momentoActual.toLocaleDateString('es-US', options)
                this.fecha = fechaActual
            }, (1000));
        },
        setUser() {
            let userID = sessionStorage.getItem("userId");
            this.$store.dispatch("configuracion/fetchUsuarioId", userID).then(() => {
                let item = JSON.stringify(
                    this.$store.getters["configuracion/getterUsuarioId"][0]
                );
                let user = JSON.parse(item);
                this.username = user.name;
                sessionStorage.setItem("userName", user.name);
                sessionStorage.setItem("userEmail", user.email);
            });
        },
        validateSession() {
            if (!sessionStorage.getItem("X_Token")) {
                this.$store.commit("auth/logout");
                this.$router.push({
                    path: "/login",
                });
            }
        },
        logout() {
            let X_Token = sessionStorage.getItem("X_Token");
            this.sendLogoutRequest(X_Token).then(() => {
                this.$router.push({
                    path: "/login",
                });
            });
        },
        getEmpresa() {
            this.$store
                .dispatch("configuracion/fetchEmpresaActive", this.$route.params.id)
                .then((response) => {
                    let empresa_row = response[0]
                    const empresa = {
                        nombre: empresa_row.nombre,
                        slogan: empresa_row.slogan,
                        logo: empresa_row.logo,
                        email: empresa_row.email,
                    };
                    sessionStorage.setItem("empresa", JSON.stringify(empresa));
                });
        },
    },
};
</script>

<style>
.text-visuel {
    color: #455a64 !important;
}

.bg-visuel {
    background: #455a64 !important;
}

.butt-visuel {
    background: #26a69a !important;
}
</style>
