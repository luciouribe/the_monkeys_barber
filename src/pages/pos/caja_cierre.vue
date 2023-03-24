<template>
<q-page padding>
    <div align="left" class="q-gutter-md flex-center">
        <br />
        <br />
        <q-card>
            <q-toolbar class="bg-teal text-white q-my-md shadow-2">
                <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                        <div>
                            Sesión: {{ session_id }}
                        </div>
                    </div>
                </div>
                <q-space />
                <q-btn push dense to="/pos/session" class="q-mr-sm">
                    Continuar vendiendo
                </q-btn>

                <q-btn :disable="monto_real_caja" @click="validateCaja" dense push color="teal-10" class="q-mr-sm">
                    Validar cierre / Generar movimientos
                </q-btn>

            </q-toolbar>
            <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                    Responsable: {{ userSession.nombre }}
                    <q-item-section>
                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold">
                            <span class="cursor-pointer">Inicio: {{ session_on.fecha_apertura }}</span>
                        </q-item-label>
                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase">
                            <span class="cursor-pointer">Saldo inicial: {{ session_on.monto_caja_inicial }}</span>
                        </q-item-label>
                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase">
                            <span class="cursor-pointer">Pagos: ${{ total_calculo_pagos }}</span>
                        </q-item-label>
                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase">
                            <span class="cursor-pointer">Total venta: ${{ total_calculo }}</span>
                        </q-item-label>
                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase">
                            <span class="cursor-pointer">Total: ${{ total_calculo-total_calculo_pagos }}</span>
                        </q-item-label>
                    </q-item-section><br>

                </div>
                <div class="q-pa-md">
                    <div class="q-gutter-y-md column" style="max-width: 300px">
                        <q-input ref="inputCajaTotal" v-model="monto_real_caja" label="Total caja">
                            <template v-slot:prepend>
                                <q-icon name="attach_money" />
                            </template>
                        </q-input>
                    </div>
                </div>
            </q-card-section>
            <q-card-section>
                <div>
                    <q-table grid :rows="rows_ordenes" :columns="columns_ordenes" row-key="nombre">
                        <template v-slot:item="props">
                            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                                <q-card clickable @click="open_detail(props.row.id),orden_select=props.row.nombre">
                                    <q-card-section class="text-center  ">
                                        <strong style="fontSize: 12px;">{{ props.row.nombre }}
                                        </strong>
                                    </q-card-section>
                                    <q-card-section class="text-center  ">
                                        Total: {{ props.row.monto_total }}
                                    </q-card-section>
                                </q-card>
                            </div>
                        </template>
                    </q-table>
                    <q-dialog v-model="layout">
                        <q-card style="width: 700px;">
                            <q-card-section>
                                <div class="text-h6">{{orden_select}}</div>
                                <q-table :rows="rows_ordenes_lineas_select" :columns="columns_ordenes_linea" row-key="nombre">
                                    <template v-slot:item="props">
                                        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                                            <q-card clickable>
                                                <q-card-section class="text-center  ">
                                                    <strong style="fontSize: 12px;">{{ props.row.nombre }}
                                                    </strong>
                                                </q-card-section>
                                                <q-card-section class="text-center  ">
                                                    Precio: {{ props.row.precio_unitario }}
                                                </q-card-section>
                                            </q-card>
                                        </div>
                                    </template>
                                </q-table>
                            </q-card-section>
                            <q-card-actions align="right" class="bg-white text-teal">
                                <q-btn flat label="OK" v-close-popup />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                </div>
            </q-card-section>
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
import {
    useQuasar
} from 'quasar'
import Export from "../../utils/ExportTable";

export default {
    name: "caja_cierre",
    setup() {
        const $q = useQuasar()
    },
    data() {
        return {
            monto_real_caja: '',
            orden_select: '',
            layout: false,
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
                    sortable: true,
                },
                {
                    name: "monto_total",
                    label: "Monto total",
                    field: "monto_total",
                    sortable: true,
                },
            ],
            columns_ordenes_linea: [{
                    name: "nombre",
                    align: "center",
                    label: "Nombre",
                    field: "nombre",
                    sortable: true,
                },
                {
                    name: "precio_unitario",
                    label: "Precio",
                    field: "precio_unitario",
                    sortable: true,
                },
            ],
            rows_ordenes: [],
            rows_pagos: [],
            rows_ordenes_lineas: [],
            rows_ordenes_lineas_select: [],
            session_on: {
                fecha_apertura: '',
                monto_caja_inicial: '',
                monto_caja_total: '',
            },
            data_session_anterior: [{
                fecha: "2022-03-24",
                saldo: "850.00",
            }, ],
        };
    },
    mounted() {
        this.$refs.inputCajaTotal.focus()
    },
    created() {
        this.setUser()
        this.validateSession()
        this.validatePagosProv()

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
            return sum
        },
        total_calculo_pagos() {
            var lodash = require('lodash');
            let importes = []
            this.rows_pagos.forEach(element => importes.push(Number(element.monto)));
            var sum = lodash.sum(importes);
            const options2 = {
                style: 'currency',
                currency: 'MXN'
            };
            const numberFormat2 = new Intl.NumberFormat('es-MX', options2).format(sum);
            return sum
        },

    },
    methods: {
        ...mapActions("pos", ["fetchPosSession", "postNewSession", "postCierreCaja", "fetchPosPagosSesion"]),
        setUser() {
            this.username = sessionStorage.getItem("userName");
            this.userID = sessionStorage.getItem("userId");
        },

        validateSession() {
            this.fetchPosSession()
                .then((response) => {
                    let data = response.session
                    this.rows_ordenes = response.ordenes
                    this.rows_ordenes_lineas = response.ordenes_linea
                    if (data.state == 'close') {
                        this.state_session = false
                    } else if (data.state == 'in_session') {
                        sessionStorage.setItem("session_on", JSON.stringify(data));
                        this.state_session = true
                        this.session_id = data.nombre
                        this.userSession.id = data.usuario_id
                        this.userSession.nombre = data.nombre_usuario
                        this.userSession.email = data.email
                        this.userSession.tipo = data.tipo
                        this.session_on.fecha_apertura = data.inicio_at
                        this.session_on.monto_caja_inicial = data.monto_caja_inicial
                        this.session_on.monto_caja_total = data.monto_caja_total

                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        },
        validatePagosProv() {
            let sessiOn = JSON.parse(sessionStorage.getItem("session_on"));
            this.fetchPosPagosSesion(sessiOn.id)
                .then((response) => {
                    this.rows_pagos=response
                   
                })
                .catch((error) => {
                    console.error(error);
                });

        },

        validateCaja(data) {
            let formData = new FormData();
            let userID = sessionStorage.getItem("userId");
            let sessiOn = JSON.parse(sessionStorage.getItem("session_on"));
            formData.append("usuario_id", userID);
            formData.append("user_id", userID);
            formData.append("id", sessiOn.id);
            formData.append("monto_caja_final_real", this.monto_real_caja);
            formData.append("monto_caja_final", this.total_calculo);
            formData.append("monto_pagos_proveedor", this.total_calculo_pagos);
            formData.append("login_number", sessiOn.nombre);
            formData.append("picking_count", this.rows_ordenes.length);
            formData.append("ordenes", JSON.stringify(this.rows_ordenes));
            formData.append("r_object", '{}');
            if (this.monto_real_caja === 0) {
                let message = 'Ingrese un importe real en Total de caja'
                this.$q.notify({
                    type: 'negative',
                    message: message,
                    color: 'red',
                    position: 'center'
                })
            } else {
                this.postCierreCaja(formData)
                    .then((response) => {
                        let data = response[0]
                        if (data) {
                            this.$router.push({
                                path: "/pos_session",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

        },
        close_pos(data) {
            this.$router.push({
                path: "/pos/",
            });
        },
        open_detail(orden) {
            this.layout = true
            let result = this.rows_ordenes_lineas.filter(employee => employee.orden_id == orden);
            this.rows_ordenes_lineas_select = result
        },
        exportTable() {
            Export.exportTable(this.columns, this.rows);
        },
    },
};
</script>
