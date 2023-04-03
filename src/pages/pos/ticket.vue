<template>
    <div class="q-pa-md text-center" style="font-size: 18px; width:100%">
        <img src="../../assets/logo_barber-sn-fondo.svg" height="100" width="70" />
        <img src="../../assets/wendys_completo.svg" height="100" width="70"/><br>
    </div>
    <div class="text-center" style="font-size: 10px; font-family: Courier New;">
        <p><strong>C. Bosques de México 323, Los Heroes Tecamac, 55764 Ojo de Agua, Méx.</strong></p>
        <p><strong>Citas: 55 3763 9638</strong></p>
        <strong>Folio: {{orden.nombre}}</strong><br>
    </div>
        <div class="row">
            <div class="col-2 text-left">
                <div style="font-size: 10px; font-family: Courier New;">
                    <div v-for="(item, index) in lineas" class="col-1 q-pa-sm q-mx-xs">
                        <strong>{{ item.cantidad }}</strong>
                    </div>
                </div>
            </div>

            <div class="col-6 text-center">
                <div style="font-size: 10px; font-family: Courier New;">
                    <div v-for="(item, index) in lineas" class="col-6 q-pa-sm q-mx-xs">
                        <strong>{{item.nombre}}</strong>
                    </div>
                </div>
            </div>

                <div class="col-3 text-right">
                    <div style="font-size: 10px; font-family: Courier New;">
                        <div v-for="(item, index) in lineas" class="col-3 q-pa-sm q-mx-xs">
                            <strong>$ {{ item.precio }}</strong>
                        </div>
                </div>
            </div>
        </div>
    <div class="col-8 text-center" style="font-size: 10px; font-family: Courier New;">
        <strong>Total: ${{orden.monto_total}}<br></strong>
        <strong>Efectivo: ${{orden.monto_pagado}}<br></strong>
        <strong>Cambio: ${{ orden.monto_pagado - orden.monto_total}}</strong>
    </div>
    <div class="col-6 text-center" style="font-size: 10px; font-family: Courier New;">
        <strong>
            <p>
                {{empresa.footer_ticket}} <br>
                {{orden.fecha_orden}}</p></strong>
    </div>
</template>

<script>
import {
    mapActions
} from "vuex";
import {
    Notify
} from "quasar";
import {
    ref
} from "vue";
export default {
    data() {
        return {
            orden: JSON.parse(sessionStorage.getItem("tiket")).orden,
            lineas: JSON.parse(sessionStorage.getItem("tiket")).lineas,
            logoIMG: "",
            header:"",
            footer:"",
            empresa: JSON.parse(sessionStorage.getItem("PosConfiguracion"))
        };
    },

    mounted() {
        this.orden_cal
        var urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
        sessionStorage.setItem("orden", '');
        // const myTimeout = setTimeout(window.close(), 50000);

    },
    created() {
        let teclado3 = window.addEventListener('keydown', (event) => {
            var keyValue = event.key;
            this.tecladoRecibo(keyValue)
        }, true)
    },
    computed: {

    },
    methods: {
        tecladoRecibo(value) {
            console.log(value)
            if (value == 'Enter') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/tiket') {
                    window.close();
                }
            } else if (value == 'Escape') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/tiket') {
                    window.close();
                }

            }
        },
    },
};
</script>

<style>
footer {
    display: none;
}
</style>
