<template>
<q-page padding>
    <div align="center" class="q-pa-md row items-start q-gutter-md flex-center">
        <br />
        <br />
        <q-card class="my-card">
            <q-card-section>
                <q-icon name="point_of_sale" color="teal" size="4.4em" />
                <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                        Sesión
                        <div v-if="state_session == false">Apertura de caja</div>
                        <div v-else>
                            {{ session_id }}
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                    {{ userSession.nombre }}
                </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <div class="text-caption text-grey" v-if="state_session == true">
                    <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg text-teal">
                        <q-tab name="reporte" label="Reporte" />
                        <q-tab name="ordenes" label="Ordenes" />
                    </q-tabs>
                    <div class="q-gutter-y-sm">
                        <q-tab-panels v-model="tab" animated transition-prev="scale" transition-next="scale" class="text-white text-left">
                            <q-tab-panel name="reporte">
                                <q-item>
                                    <q-item-section avatar top>
                                        <q-icon name="shopping_cart" color="black" size="34px" />
                                    </q-item-section>
                                    <q-item-section top>
                                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary">
                                            <span class="cursor-pointer">Inicio: {{ session_on.fecha_apertura }}</span>
                                        </q-item-label>
                                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                                            <span class="cursor-pointer">Saldo inicial: ${{ session_on.monto_caja_inicial }}</span>
                                        </q-item-label>
                                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                                            <span class="cursor-pointer">Total: {{ total_calculo }}</span>
                                        </q-item-label>
                                    </q-item-section>

                                </q-item>
                            </q-tab-panel>
                            <q-tab-panel name="ordenes">
                                <q-table class="my-sticky-column-table" :rows="rows_ordenes" :columns="columns_ordenes" row-key="name" />
                            </q-tab-panel>
                        </q-tab-panels>
                    </div>
                </div>
                <div class="text-caption text-grey" v-else>
                    <q-table class="my-sticky-column-table" :columns="columns_session" :rows="data_session_anterior" :rows-per-page-options="[0]" />
                </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="center" v-if="state_session == true">
                <q-btn flat color="teal" @click="open_pos"> Reanudar </q-btn>
                <q-btn flat color="red" @click="close_pos"> Cerrar </q-btn>
            </q-card-actions>
            <q-card-actions align="center" v-else>
                <q-btn outline @click="open_new_pos" rounded color="teal" label="Nueva sesión" />
            </q-card-actions>
        </q-card>
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

export default {
    name: "caja",
    setup() {
        return {};
    },
    data() {
        return {
            hora: "00:00:00",
            state_session: null,
            label_caja: "Abrir caja",
            userID: null,
            tab: ref("reporte"),
            splitterModel: ref(20),
            session_id: "",
            userSession: {
                id: '',
                nombre: '',
                email: '',
                tipo: '',
            },
            columns_ordenes: [{
                    name: "nombre",
                    align: "center",
                    label: "Nombre",
                    field: "nombre",
                },
                {
                    name: "monto_total",
                    label: "Monto total",
                    field: "monto_total",
                    sortable: true,
                },
            ],
            rows_ordenes: [],
            session_on: {
                fecha_apertura: '',
                monto_caja_inicial: '0',
                monto_caja_total: '0',
            },
            data_session_anterior: [{
                fecha: '',
                saldo: '',
            }, ],
            columns_session: [{
                    name: "fecha",
                    align: "center",
                    field: "fecha",
                    label: "Última fecha de cierre",
                },
                {
                    name: "saldo",
                    align: "center",
                    field: "saldo",
                    label: "Saldo en efectivo",
                },
            ],
        };
    },
    mounted() {},
    created() {
        this.setUser()
        this.validateSession()
    },
    computed: {
        total_calculo() {
            var lodash = require('lodash');
            let importes = []
            this.rows_ordenes.forEach(element => importes.push(Number(element.monto_total)));
            var sum = lodash.sum(importes);
            const options2 = {
                style: 'currency',
                currency: 'MXN'
            };
            const numberFormat2 = new Intl.NumberFormat('es-MX', options2).format(sum);
            return numberFormat2
        },
    },
    methods: {
        ...mapActions("pos", ["fetchPosSession", "postNewSession"]),
        setUser() {
            this.username = sessionStorage.getItem("userName");
            this.userID = sessionStorage.getItem("userId");
        },

        validateSession() {
            this.fetchPosSession()
                .then((response) => {
                    let data = response.session
                    this.rows_ordenes = response.ordenes
                    if (data.state == 'close') {
                        this.state_session == false
                        this.data_session_anterior[0].fecha = data.finalizo_at
                        this.data_session_anterior[0].saldo = data.monto_caja_total_real
                    } else if (data.state == 'in_session') {
                        sessionStorage.setItem("session_on", JSON.stringify(data));
                        this.state_session = true
                        this.session_id = data.nombre
                        this.userSession.id = data.usuario_id
                        this.userSession.nombre = data.nombre_usuario
                        this.userSession.email = data.email
                        this.userSession.tipo = data.tipo
                        this.session_on.fecha_apertura = data.inicio_at
                        this.session_on.monto_caja_inicial = data.monto_caja_total_real
                        this.session_on.monto_caja_total = data.monto_caja_total

                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        },
        open_new_pos() {
            let formData = new FormData();
            let userID = sessionStorage.getItem("userId");
            formData.append("usuario_id", userID);
            formData.append("user_id", userID);
            if (this.data_session_anterior[0].saldo > 0) {
                formData.append("monto_caja_inicial", this.data_session_anterior[0].saldo);
                formData.append("monto_caja_inicial_real", this.data_session_anterior[0].saldo);
                formData.append("monto_caja_total", this.session_on.monto_caja_total);
                formData.append("monto_caja_total_real", this.data_session_anterior[0].saldo);
                formData.append("monto_caja_diferencia", '0');
                formData.append("monto_pagado", '0');
            } else {
                formData.append("monto_caja_inicial", this.session_on.monto_caja_inicial);
                formData.append("monto_caja_inicial_real", this.session_on.monto_caja_inicial);
                formData.append("monto_caja_total", this.session_on.monto_caja_total);
                formData.append("monto_caja_total_real", this.session_on.monto_caja_inicial);
                formData.append("monto_caja_diferencia", '0');
                formData.append("monto_pagado", '0');
            }
            this.postNewSession(formData)
                .then((response) => {
                    let data = response[0]
                    if (data) {
                        sessionStorage.setItem("session_on", JSON.stringify(data));
                        this.$router.push({
                            path: "/pos/session",
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        open_pos(data) {
            this.$router.push({
                path: "/pos/session",
            });
        },
        close_pos(data) {
            this.$router.push({
                path: "/pos/cierre",
            });
        },
        exportTable() {
            Export.exportTable(this.columns, this.rows);
        },
    },
};
</script>
