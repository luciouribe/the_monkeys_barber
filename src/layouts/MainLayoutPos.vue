<template>
<q-layout view="hHh Lpr fFf">
    <q-header elevated>
        <q-toolbar class="bg-visuel text-black q-px-lg">
            <img src="../assets/logo_barber-sn-fondo.png" height="80" width="80" />
            <q-toolbar-title>
                <img src="../assets/wendys_completo.png" height="80" />
            </q-toolbar-title>
            <div class="q-pr-md text-black">
                <q-chip size="18px">
                    {{ fecha }}
                </q-chip>
                <q-chip size="18px" icon="schedule">
                    {{ hora }}
                </q-chip>
                <q-btn flat @click="confirm=true">
                    <q-icon name="logout" /> Cerrar</q-btn>
            </div>
        </q-toolbar>

    </q-header>
    <q-dialog v-model="confirm" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="logout" color="secondary" text-color="black" />
                <span class="q-ml-sm">¿Estas seguro de cerrar la sesión?</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="secondary" v-close-popup />
                <q-btn flat label="Confirmar" @click="close_pos" color="secondary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-page-container>
        <router-view />
    </q-page-container>
    <q-footer align="center" reveal elevated class="bg-visuel text-black shadow-2" small>
        <div class="text">ⓒ Visuel Code</div>
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
    name: "MainLayoutPos",
    data() {
        return {
            confirm: ref(false),
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
        close_pos(data) {
            // sessionStorage.setItem("orden", "");
            this.$router.push({
                path: "/pos_session/",
            });
        },
    },
};
</script>

<style>
.text-visuel {
  color: #030303 !important;
}

.bg-visuel {
  background: #f7f4f4 !important;
}

.butt-visuel {
  background: #000000 !important;
}
</style>
