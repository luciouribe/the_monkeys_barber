<template>
<q-page padding>
    <div class="q-pa">
        <div class="row">
            <div class="col-9 q-pa-md text-center" style="font-size: 25px;"></div>
            <div class="col-3 q-pa-md text-right">
                <q-btn style="background:#39b54a;color:white" @click="goNewOrder">Nueva orden
                    <q-icon name="double_arrow" class="q-pl-xs"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col-6 q-pa-md">
                <div class="col q-pa-sm q-mx-sm flex flex-center">
                    <div class="shadow-1">
                        <iframe width="450" height="400" src="#/tiket/">
                        </iframe>

                    </div>
                </div>
            </div>
            <div class="col-6 q-pa-md text-center">
                <div class="row bg-white shadow-2 rounded-borders">
                    <div class="col q-pa-sm q-mx-xs">
                        <div class="q-pa-lg q-ma-lg text-grey-7" style="font-size: 25px;">
                            ¿Como le gustaría obtener su recibo?
                        </div>
                    </div>
                </div>
                <div class="col-8 q-px-md flex flex-center">
                    <div class="col q-pa-sm q-mr-lg">
                        <q-btn @click="printTicket" class="flex flex-center q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                            <q-icon name="print" style="font-size: 30px"></q-icon>
                            Imprimir
                        </q-btn>
                        <div class="flex flex-center q-pa-lg q-ma-lg bg-white rounded-borders">
                            <q-input bottom-slots type="email" label="Recibo por correo electrónico" clearable style="width:100%">
                                <template v-slot:prepend>
                                    <q-icon name="send" />
                                </template>
                                <template v-slot:append>
                                    <q-btn style="background:#39b54a;color:white">Enviar</q-btn>
                                </template>
                            </q-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</q-page>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapActions
} from "vuex";
import {
    ref
} from "vue";
import Export from "../../utils/ExportTable";

import {
    useQuasar
} from 'quasar'

export default {
    name: "recibo",

    data() {
        return {
            orden: [],
            total_pagar: '00.00',

        };
    },
    mounted() {

    },
    created() {
        let teclado3 = window.addEventListener('keydown', (event) => {
            var keyValue = event.key;
            this.tecladoRecibo(keyValue)
        }, true)
    },
    methods: {
        printTicket() {
            let windows = window.open('#/tiket', 'Visuel', 'height=400, width=600');
            windows.document.close();
            windows.print();
        },
        goNewOrder() {
            this.$router.push({
                path: "/pos/session",
            });
        },
        tecladoRecibo(value) {
            if (value == 'Enter') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/pos/recibo') {
                    this.printTicket()
                }
            } else if (value == 'End') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/pos/recibo') {
                    this.goNewOrder()
                }

            }
        },
    }
};
</script>
