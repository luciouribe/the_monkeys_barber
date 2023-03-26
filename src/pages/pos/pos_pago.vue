<template>
<q-page padding>
    <div class="q-pa">
        <div class="row">
            <div class="col-3 q-pa-md">
                <q-btn color="white" text-color="black" to="/pos/session">
                    <q-icon name="navigate_before" class="q-pl-xs"></q-icon>
                    Regresar
                </q-btn>
            </div>
            <div class="col-6 q-pa-md text-center" style="font-size: 25px;">Registro de pago</div>
            <div class="col-3 q-pa-md text-right">
                <q-btn color="secondary" @click="new_order" :disabled="!state_order">Validar
                    <q-icon name="keyboard_arrow_right" class="q-pl-xs"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col-4 q-pa-md">
                <div class="col q-pa-sm q-mx-sm">
                    <q-btn @click="newPago('efectivo')" class="flex flex-center q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                        <q-icon name="local_atm" style="font-size: 30px"></q-icon>
                        Efectivo (MXN)
                    </q-btn>
                    <q-btn @click="newPago('tarjeta')" class="flex flex-center q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                        <q-icon name="credit_card" style="font-size: 30px"></q-icon>
                        Tarjeta
                    </q-btn>

                    <!--  <q-btn class="q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                        <q-icon name="account_circle" style="font-size: 30px"></q-icon>
                        Cliente
                    </q-btn>-->
                    <!-- <q-item tag="label" v-ripple class="q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                        <q-item-section avatar>
                            <q-checkbox v-model="factura" val="orange" color="secondary" />
                        </q-item-section>
                       <q-item-section>
                            <q-item-label>
                                <q-icon name="description" style="font-size: 30px"></q-icon> Factura
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                -->
                </div>
            </div>
            <div class="col-8 q-pa-md text-center">
                <div class="row bg-white shadow-2">
                    <div class="col q-pa">
                        <q-markup-table>
                            <thead>
                                <tr>
                                    <th class="text-left">Total</th>
                                    <th class="text-right">Entregado</th>
                                    <th class="text-right">Cambio</th>
                                    <th class="text-right">Metodo</th>
                                    <th class="text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <q-tr v-for="(item, key) in rows_pago" 
                                    @click="selectedItem(rows_pago,item)">
                                    <q-td key="total" :style="item.style">
                                        {{ item.debe }}
                                    </q-td>
                                    <q-td key="entregado" :style="item.style_edit">
                                        {{ item.entregado }}
                                        <q-popup-edit buttons v-model="item.entregado" v-slot="scope">
                                            <q-input v-model="scope.value" dense autofocus />
                                        </q-popup-edit>
                                    </q-td>
                                    <q-td key="cambio" :style="item.style">
                                        {{ total_calculo_order }}
                                    </q-td>
                                    <q-td key="metodo" :style="item.style">
                                        {{ item.metodo }}
                                    </q-td>
                                    <q-td key="actions" :style="item.style">
                                        <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="removePago(rows_pago,item)" />
                                    </q-td>
                                </q-tr>

                                <div style="font-size: 18px;">
                                    
                                </div>
                            </tbody>

                        </q-markup-table>

                        <div v-show="!state_pay">
                            <div class="flex flex-center q-pa-lg q-ma-lg" style="font-size: 45px;color:#39b54a">
                                {{total_calculo}}
                            </div>
                            <div class="text-caption text-grey">
                                Por favor seleccione un método de pago
                                {{num_teclado}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <q-separator color="#455a64" inset size="5px" style="width:90%" />
                    <div class="col-12">
                        <div class="rounded-borders text-center">
                            <div class="row flex flex-center">
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('1')" v-ripple class="bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>1</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('2')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>2</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('3')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>3</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <!-- <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('+10')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>+10</b>
                                        </q-item-section>
                                    </q-item>
                                </div>-->
                            </div>
                            <div class="row flex flex-center">
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('4')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>4</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('5')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>5</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('6')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>6</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <!-- <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('+20')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>+20</b>
                                        </q-item-section>
                                    </q-item>
                                </div>-->

                            </div>
                            <div class="row flex flex-center">
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('7')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>7</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('8')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>8</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('9')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>9</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                               <!--  <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('+50')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>+50</b>
                                        </q-item-section>
                                    </q-item>
                                </div>-->
                            </div>
                            <div class="row flex flex-center">
                                <!--<div class="col q-pa">
                                    <q-item tag="label" @click="teclado('c')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>C</b>
                                        </q-item-section>
                                    </q-item>
                                </div>-->
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('0')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>0</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('.')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>.</b>
                                        </q-item-section>
                                    </q-item>
                                </div>
                                <div class="col q-pa">
                                    <q-item tag="label" @click="teclado('backspace')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                        <q-item-section>
                                            <b>
                                                <q-icon size="2em" name="backspace"></q-icon>
                                            </b>
                                        </q-item-section>
                                    </q-item>
                                </div>

                            </div>

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
import ScannerDetector from 'js-scanner-detection'
import {
    useQuasar
} from 'quasar'

export default {
    name: "pago",
    setup() {

    },
    data() {
        return {
            link: ref('inbox'),
            tab_categorias: ref('productos'),
            filter: ref(''),
            factura: false,
            orden_line: [],
            total_pagar: '00.00',
            rows_pago: [],
            impuestos: 0,
            subtotal: 0,
            total: 0,
            debe_calcula: 0,
            selected: [],
            teclado_cal: [],
            state_validate: true,
            configuracion: JSON.parse(sessionStorage.getItem("PosConfiguracion")),
            columns_pago: [{
                    name: "total",
                    align: "left",
                    label: "Total",
                    field: "total",
                },
                {
                    name: "entregado",
                    align: "left",
                    label: "Entregado",
                    field: "entregado",
                },
                {
                    name: "cambio",
                    align: "left",
                    label: "Cambio",
                    field: "cambio",
                },
                {
                    name: "metodo",
                    align: "left",
                    label: "Método",
                    field: "metodo",
                }, ,
                {
                    name: "actions",
                    align: "left",
                    field: "actions",
                },
            ],
        };
    },
    mounted() {

    },
    created() {
        this.orden_session
        document.addEventListener('keydown', (event) => {
            var keyValue = event.key;
            this.teclado(keyValue)
        }, false);
    },
    computed: {
        total_calculo() {
            var lodash = require('lodash');
            let importes = []
            this.orden_line.forEach(element => importes.push(Number(element.precio)));
            var sum = lodash.sum(importes);
            const options2 = {
                style: 'currency',
                currency: 'MXN'
            };
            const numberFormat2 = new Intl.NumberFormat('es-MX', options2).format(sum);
            return numberFormat2
        },
        total_calculo_order() {
            var lodash = require('lodash');
            let importes = []
            this.orden_line.forEach(element => importes.push(Number(element.precio)));
            var sum = lodash.sum(importes);
            let importes2 = []
            this.rows_pago.forEach(element => importes2.push(Number(element.entregado)));
            var sum2 = lodash.sum(importes2);
            let total_cambio = sum2 - sum 
            return total_cambio
        },
        state_order() {
            let total_cambio = this.total_calculo_order
            if (total_cambio > 0) {
                return true
            } else if (total_cambio === 0) {
                return true
            } else if (total_cambio < 0) {
                return false
            }
        },
        total_calculo_entregado() {
            var lodash = require('lodash');
            let importes = []
            this.rows_pago.forEach(element => importes.push(Number(element.entregado)));
            var sum = lodash.sum(importes);
            return sum
        },
        orden_session() {
            let orden_on = sessionStorage.getItem("orden");
            if (orden_on.length === 0) {
                this.orden_line = []
            } else {
                this.orden_line = JSON.parse(orden_on)
            }
        },
        state_pay() {
            if (this.rows_pago.length === 0) {
                return false
            } else {
                return true
            }
        },
        num_teclado() {
            let no_teclado = this.teclado_cal.join('')
            if (this.rows_pago.length === 0) {

                return 0
            } else {
                let selectItemOn = sessionStorage.getItem("selectedItem");
                if (this.rows_pago[selectItemOn]) {
                    this.rows_pago[selectItemOn].entregado = no_teclado
                } else {

                }

                return no_teclado
            }

        }
    },
    methods: {
        ...mapActions("pos", ["fetchPosSession", "fetchPosProductos", "fetchPosProductosId", "postNewOrder"]),
        removeProduct() {
            this.orden_line.splice(-1, 1)
        },
        new_order() {
            let formData = new FormData();
            let userID = sessionStorage.getItem("userId");
            let sessiOn = JSON.parse(sessionStorage.getItem("session_on"));
            formData.append("usuario_id", userID);
            formData.append("user_id", userID);
            formData.append("nombre", '');
            formData.append("monto_total",  String(this.total_calculo).replace('$','').replace(',',''));
            formData.append("monto_impuestos", '0');
            formData.append("monto_pagado", String(this.total_calculo_entregado).replace('$',''));
            formData.append("monto_regreso", this.total_calculo_entregado);
            formData.append("lista_precios_id", '');
            formData.append("configuracion_id", this.configuracion.id);
            formData.append("factura_id", '');
            formData.append("poliza_id", '');
            formData.append("tipo_recoleccion", '');
            formData.append("nota", '');
            formData.append("pos_referencia", sessiOn.id);
            formData.append("lineas_orden", JSON.stringify(this.orden_line));
            formData.append("r_object", JSON.stringify('{}'));
            this.postNewOrder(formData)
                .then((response) => {
                    let data = response[0]
                    if (data) {
                        window.location.replace("#/pos/recibo");
                        let ticket = {
                            'orden': data,
                            'lineas': this.orden_line
                        }
                        sessionStorage.setItem("tiket", JSON.stringify(ticket));
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        },
        newPago(tipo) {
            if (tipo === 'tarjeta') {
                let pago = {
                    debe: this.total_calculo,
                    entregado: 0,
                    cambio: 0,
                    metodo: 'Tarjeta',
                    actions: '',
                    style: 'font-size: 15px; background-color:#ffff; color:black;',
                    style_edit: 'font-size: 15px; background-color:#FFFF; color:black;'
                }
                this.rows_pago.push(pago)
                this.selectedItem(this.rows_pago, pago)
            } else if (tipo === 'efectivo') {
                let pago = {
                    debe: this.total_calculo,
                    entregado: 0,
                    cambio: 0,
                    metodo: 'Efectivo (MXN)',
                    actions: '',
                    style: 'font-size: 15px; background-color:#ffff; color:black;',
                    style_edit: 'font-size: 15px; background-color:#FFFF; color:black;'
                }
                this.rows_pago.push(pago)
                this.selectedItem(this.rows_pago, pago)
            }

        },
        removePago(arr, value) {
            var index = arr.indexOf(value)
            if (index > -1) {
                this.rows_pago.splice(index, 1)
            }
        },
        teclado(value) {
            if (value == '+10') {
                this.teclado_cal.push(10)
            } else if (value == '+20') {
                let cal = Number(this.teclado_cal) + 20
                this.teclado_cal.push(cal)
            } else if (value == '+50') {
                this.teclado_cal.push(50)
            } else if (value == 'ArrowUp') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/pos/pago') {
                    let itemAct = sessionStorage.getItem("selectedItem");
                    if (itemAct > 0) {
                        let itemIndex = itemAct - 1
                        this.selectedItemArrow(itemIndex)
                    }
                }

            } else if (value == 'ArrowDown') {
                let itemAct = sessionStorage.getItem("selectedItem");
                if (this.rows_pago.length === Number(itemAct) + 1) {
                } else {
                    let itemIndex = Number(itemAct) + 1
                    this.selectedItemArrow(itemIndex)
                }
            } else if (value == 'ArrowLeft') {
                this.$router.push({
                    path: "/pos/session",
                });
            } else if (value == '-') {
                this.rows_pago.splice(-1, 1)
            } else if (value == '+') {
                this.newPago('efectivo')
            } else if (value == 'Delete') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/pos/pago') {
                    let itemAct = sessionStorage.getItem("selectedItem");
                    this.rows_pago.splice(itemAct, 1)
                }
            } else if (value == 'Backspace') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/pos/pago') {
                    if (this.teclado_cal) {
                        this.teclado_cal.splice(-1, 1)
                    }
                }
            } else if (value == 'backspace') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/pos/pago') {
                    this.teclado_cal.splice(-1, 1)
                }
            } else if (value.match('^[0-9.]')) {
                this.teclado_cal.push(value)
            } 
            // else if (value == 'Enter') {
            //     let currentUrl = window.location.href
            //     let route = currentUrl.split("#")[1]
            //     if (route == '/pos/pago') {
            //         if (this.state_order === true) {
            //             console.log(this.new_order())
            //             this.new_order()
            //             this.state_order === false
            //         }
            //     }
            // }
        },
        selectedItemArrow(value) {
            let style1 = 'font-size: 15px; background-color:#ffff; color:black;'
            this.rows_pago.forEach(element => (element.style = style1, element.style_edit = style1));
            this.rows_pago[value].style = 'font-size: 15px; background-color:#44b1a7; color:#ffff;'
            this.rows_pago[value].style_edit = 'font-size: 15px; background-color:#ffff; color:#44b1a7;'
            sessionStorage.setItem("selectedItem", value);
            this.teclado_cal = []
        },
        selectedItem(arr, value) {
            var index = arr.indexOf(value)
            if (index > -1) {
                let style1 = 'font-size: 15px; background-color:#ffff; color:black;'
                this.rows_pago.forEach(element => (element.style = style1, element.style_edit = style1));
                this.rows_pago[index].style = 'font-size: 15px; background-color:#44b1a7; color:#ffff;'
                this.rows_pago[index].style_edit = 'font-size: 15px; background-color:#ffff; color:#44b1a7;'
                sessionStorage.setItem("selectedItem", index);
                this.teclado_cal = []
            }
        },
    },
};
</script>
