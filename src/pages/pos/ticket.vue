<template>
<div class="q-pa-md text-center" style="font-size: 18px; width:100%">
 <img :src="logoIMG" height="30" width="30" /><br>
<p>{{empresa.nombre}}</p>
<p>{{empresa.header_ticket}}</p>
    {{orden.nombre}}<br>
   {{orden.fecha_orden}}<br>
    <div v-for="(item, index) in lineas">
        <p v-if="String(item.cantidad).concat(' ',item.nombre).slice(0, 16).length==16">
            {{ String(item.cantidad).concat(' ',item.nombre).slice(0, 16) }} <b v-for="i in 15">-</b> ${{item.precio}}</p>
        <p v-else="">
            {{ String(item.cantidad).concat(' ',item.nombre).slice(0, 16) }}
            <b v-for="i in Number(16)-Number(String(item.cantidad).concat(' ',item.nombre).length)+15">-</b> ${{item.precio}}
        </p>
    </div><br><br>
    Total: <b v-for="i in 24">-</b> ${{orden.monto_total}}<br>
    Cambio: <b v-for="i in 24">-</b> ${{orden.monto_total-orden.monto_pagado}}<br><br>
    <p style="line-height: 200%">{{empresa.footer_ticket}}</p>
    <br><br><br><br><br><br><br><br>

</div>
<br><br>
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
        this.logoIMG =  "icons/default.png";
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
