<template>
<q-page padding>
    <div class="q-pa">
        <table style="height:100px">
            <tr>
                <td style="width: 400px;">
                    <div class="shadow-1" style="height: 400px; ">
                        <q-card class="my-card">
                            <div id="divu" style="height:350px; overflow: scroll;">
                                <q-list v-for="(item, key) in orden_line">
                                    <q-item class=" bg-grey-3  shadow-2" clickable active-class="text-orange" :active="link === key" @click="selectedItem(key)">
                                        <q-item-section>
                                            <q-item-label>{{item.nombre}}
                                                <q-item-label align="right">${{item.precio}}
                                                    <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="removeProductOrden(orden_line,item)" />
                                                </q-item-label>
                                            </q-item-label>
                                            <q-item-label caption>{{item.cantidad}} {{item.uom}}</q-item-label>
                                        </q-item-section>
                                        <q-separator color="amber" inset />
                                    </q-item>
                                </q-list>
                                <br><br><br><br>
                            </div>
                            <q-item clickable align="right">
                                <q-item-section>

                                    <q-item-label><b style="fontSize: 16px;">TOTAL: {{total_calculo}}</b></q-item-label>
                                    <q-item-label caption>Impuestos: {{impuestos}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card>
                    </div>
                    <div class="shadow-1">
                        <q-separator class="rounded-borders " color="secondary" style="height: 4px;" />
                        <div class="q-ma">
                            <div class="rounded-borders text-center">
                                <div class="row flex flex-center">
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('1')" v-ripple class="bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>1</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('2')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>2</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('3')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>3</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" id="btn_cantidad" @click="changeColor('btn_cantidad'),tecladoSession('cant')" v-ripple class=" bg-white shadow-2" style="width:100%;">
                                            <q-item-section>
                                                <b>Cant.</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                </div>
                                <div class="row flex flex-center">
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('4')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>4</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('5')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>5</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('6')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>6</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" id="btn_desc" @click="changeColor('btn_desc'),tecladoSession('desc')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>Desc.</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>

                                </div>
                                <div class="row flex flex-center">
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('7')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>7</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('8')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>8</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('9')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>9</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" id="btn_prec" @click="changeColor('btn_prec'),tecladoSession('prec')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>Prec.</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                </div>
                                <div class="row flex flex-center">
                                    <div class="col q-pa">
                                        <q-item tag="label" id="btn_menos" @click="changeColor('btn_menos'),tecladoSession('+/-')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>+/-</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('0')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>0</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('.')" v-ripple class=" bg-white shadow-2" style="width:100%">
                                            <q-item-section>
                                                <b>.</b>
                                            </q-item-section>
                                        </q-item>
                                    </div>
                                    <div class="col q-pa">
                                        <q-item tag="label" @click="tecladoSession('backspace')" v-on:click.backspace="tecladoSession('backspace')" v-ripple class=" bg-white shadow-2" style="width:100%">
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
                    <div @click="goPago()">
                        <q-item v-ripple style="width:100%">
                            <q-item-section>
                                <q-btn padding="xl" icon="arrow_circle_right"> Pago</q-btn>
                            </q-item-section>
                        </q-item>
                    </div>
                </td>
                <td style="width: 700px;">
                    <div style="height:100%">
                        <q-card class="my-card">
                            <q-tabs v-model="tab_categorias" dense align="left" class="" :breakpoint="0">
                                <q-tab name="productos" label="Productos" />
                                <q-tab name="pago_proveedor" label="Pago proveedor" />
                            </q-tabs>
                            <q-tab-panels v-model="tab_categorias" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
                                <q-tab-panel name="productos">
                                    <div id="divu" style="height:650px; overflow: scroll;">
                                        <q-table grid :rows="productos" :columns="columns" row-key="nombre" :filter="filter">
                                            <template v-slot:top-right>
                                                <q-input ref="searchfield" rounded filled dense debounce="300" v-model="filter" placeholder="Buscar productros (F2)">
                                                    <template v-slot:append>
                                                        <q-icon name="search" />
                                                    </template>
                                                </q-input>
                                            </template>

                                            <template v-slot:item="props">

                                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                                                    <q-card @click="addProductOrden(props.row)">
                                                        <q-card-section class="text-center  ">
                                                            <q-img :src="images_irl+props.row.image" spinner-color="white" width="90px" img-class="my-custom-image" class="rounded-borders" />
                                                            <br> <strong style="fontSize: 12px;">{{ props.row.nombre }}
                                                                <br>${{ props.row.precio }} </strong>
                                                        </q-card-section>
                                                    </q-card>
                                                </div>

                                            </template>

                                        </q-table>
                                    </div>
                                </q-tab-panel>

                                <q-tab-panel name="pago_proveedor">
                                    <q-form @submit="postPagoProvee" class="q-gutter-md">
                                        <q-select filled clearable label="Proveedor" :options="proveedores" v-model="pago_prov.proveedor" :rules="[val => val !== null && val !== '' || 'Campo obligatorio']">
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                        <q-input filled type="number" v-model="pago_prov.monto" label="Monto a pagar *" lazy-rules :rules="[val => val !== null && val !== '' || 'Campo obligatorio']" />
                                        <q-input v-model="pago_prov.nota" filled type="textarea" label="Nota" :rules="[val => val !== null && val !== '' || 'Campo obligatorio']" />
                                        <div>
                                            <q-btn label="Continuar" type="submit" color="primary" />
                                            <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" @click="onReset" />
                                        </div>
                                    </q-form>
                                </q-tab-panel>

                            </q-tab-panels>

                        </q-card>
                    </div>
                </td>
            </tr>
        </table>
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
    name: "session",
    setup() {
        const $q = useQuasar()
    },
    data() {
        return {
            link: ref(''),
            tab_categorias: ref('productos'),
            filter: '',
            hora: "00:00:00",
            state_session: null,
            columns: [{
                    name: 'nombre',
                    align: 'center',
                    label: 'nombre',
                    field: 'nombre',
                    sortable: true
                },
                {
                    name: 'precio',
                    align: 'center',
                    label: 'precio',
                    field: 'precio',
                    sortable: true
                }
            ],

            productos: [],
            orden_line: [],
            impuestos: 0,
            subtotal: 0,
            total: 0,
            item_selected: null,
            teclado_cal: [],
            pago_prov: {
                proveedor: null,
                monto: null,
                nota: ''
            },
            proveedores: []
        };
    },
    mounted() {
        this.orden_session
        this.changeColor('btn_cantidad')
    },
    created() {

        document.addEventListener('keydown', (event) => {
            var keyValue = event.key;
            this.tecladoSession(keyValue)
        }, false);

        let onComplete = (barcode) => {
            this.searchProduct(barcode)
        }
        let options = {
            onComplete: onComplete
        }
        let scannerDetector = new ScannerDetector(options)
        this.getProductos()
        this.getProveedores()
        this.getConfigfPos()
    },
    computed: {
        images_irl() {
            var url = localStorage.getItem("images_url");
            return url
        },
        total_calculo() {
            var lodash = require('lodash');
            let importes = []
            this.orden_line.forEach(element => importes.push(element.precio));
            var sum = lodash.sum(importes);
            const options2 = {
                style: 'currency',
                currency: 'MXN'
            };
            const numberFormat2 = new Intl.NumberFormat('es-MX', options2).format(sum);
            return numberFormat2
        },
        orden_session() {
            let orden_on = sessionStorage.getItem("orden");
            if (orden_on) {
                if (orden_on.length === 0) {
                    console.log(orden_on)
                } else {
                    this.orden_line = JSON.parse(orden_on)
                }
            }

        }

    },
    methods: {
        ...mapActions("pos", ["fetchPosProductos", "fetchPosProductosId", "fetchPosSession", "postPagoProveedor", "fetchPosConfiguracion"]),
        ...mapActions("catalogos", ["fetchProveedores"]),
        getConfigfPos() {
            this.fetchPosConfiguracion().then((response) => {
                if (response.length > 0) {
                    sessionStorage.setItem("PosConfiguracion", JSON.stringify(response[0]));
                } else {
                    let PosConfig = {
                        nombre: "POS1",
                        diario_ventas_id: 1,
                        diario_factura_id: 1,
                        efectivo: "true",
                        tarjeta: "false",
                        facturacion: "false",
                        impresion_automatica: "true",
                        incluir_impuestos: "false",
                        salta_recibo: "false",
                        scanner: "true",
                        ip_impresora: '',
                        header_ticket: "Visuel Code",
                        footer_ticket: "Gracias por su compra!",
                        active: "true"
                    }
                    sessionStorage.setItem("PosConfiguracion", JSON.stringify(PosConfig));
                }

            });
        },
        getProveedores() {
            this.fetchProveedores()
                .then((response) => {
                    let data = response
                    response.forEach(element => this.proveedores.push({
                        label: element.nombres,
                        value: element.id,
                    }))
                })
                .catch((error) => {
                    console.error(error);
                });

        },
        onReset() {
            this.pago_prov.nota = null
            this.pago_prov.monto = null
            this.pago_prov.nota = null
        },
        postPagoProvee() {
            let formData = new FormData();
            let userID = sessionStorage.getItem("userId");
            let sessiOn = JSON.parse(sessionStorage.getItem("session_on"));
            formData.append("usuario_id", userID);
            formData.append("proveedor_id", this.pago_prov.proveedor.value);
            formData.append("user_id", userID);
            formData.append("nota", this.pago_prov.nota);
            formData.append("monto", this.pago_prov.monto);
            formData.append("pos_referencia", sessiOn.id);
            formData.append("r_object", JSON.stringify('{}'));
            this.postPagoProveedor(formData)
                .then((response) => {
                    let data = response
                    this.onReset()

                })
                .catch((error) => {
                    console.error(error);
                });

        },
        getProductos() {
            this.fetchPosProductos()
                .then((response) => {
                    let data = response
                    this.productos = response
                })
                .catch((error) => {
                    console.error(error);
                });

        },
        searchProduct(barcode) {
            let data = {
                barcode: barcode
            }
            this.fetchPosProductosId(data)
                .then((response) => {
                    let data = response
                    if (data.length === 0) {
                        let message = 'Código de barras desconocido. \n\n' + barcode
                        this.$q.notify({
                            type: 'negative',
                            message: message,
                            color: 'red',
                            position: 'center'
                        })
                    } else {
                        this.addProductOrden(data[0])
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        },
        addProductOrden(item) {
            let result = this.orden_line.filter(it => it.id == item.id);
            if (result.length > 0) {
                let elementIndex = this.orden_line.findIndex((obj => obj.id == item.id));
                this.orden_line[elementIndex].cantidad = this.orden_line[elementIndex].cantidad + 1
                this.orden_line[elementIndex].precio = this.orden_line[elementIndex].precio + this.orden_line[elementIndex].precio_unit
            } else {
                let it = {
                    id: item.id,
                    nombre: item.nombre,
                    precio_unit: item.precio,
                    precio: item.precio,
                    uom: item.uom,
                    cantidad: 1,
                }
                this.orden_line.push(it);
            }

            let index = this.orden_line.length - 1
            this.link = index
            sessionStorage.setItem("selectedProduct", index);
            this.setElements()
            var objDiv = document.getElementById("divu");
            objDiv.scrollTop = objDiv.scrollHeight;
        },
        removeProductOrden(arr, value) {
            var index = arr.indexOf(value)
            if (index > -1) {
                this.orden_line.splice(index, 1)
                this.setElements()
            }
        },
        removeProduct(arr) {
            this.orden_line.splice(-1, 1)
            this.setElements()
        },

        setElements(item) {
            sessionStorage.setItem("orden", JSON.stringify(this.orden_line));
        },
        selectItem(item) {
            this.item_selected = item.precio;
        },
        changeColor(btn) {
            document.getElementById('btn_cantidad').style = 'color:black;'
            document.getElementById('btn_desc').style = 'color:black;'
            document.getElementById('btn_prec').style = 'color:black;'
            document.getElementById('btn_menos').style = 'color:black;'

            document.getElementById(btn).style = 'color:red;'
            sessionStorage.setItem("btn_ope", btn);
        },
        tecladoSession(value) {
            if (value == 'cant') {

            } else if (value == 'desc') {

            } else if (value == 'prec') {

            } else if (value == 'ArrowUp') {

            } else if (value == 'ArrowDown') {

            } else if (value == '-') {

            } else if (value == '+') {

            } else if (value == 'Delete') {

            } else if (value == 'Backspace') {
                // this.removeCantidadItemSelect()
            } else if (value == 'backspace') {
                this.removeCantidadItemSelect()
            } else if (value.match('^[0-9.]')) {
                this.teclado_cal.push(value)
                let no_teclado = this.teclado_cal.join('')
                // this.putCantidadItemSelect(no_teclado)
            } else if (value == 'ArrowRight') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/pos/session') {
                    this.goPago()
                }
            } else if (value == 'F2') {
                let currentUrl = window.location.href
                let route = currentUrl.split("#")[1]
                if (route == '/pos/session') {
                    this.$refs.searchfield.focus()
                }
            }
        },
        removeCantidadItemSelect() {
            let btnop = sessionStorage.getItem("btn_ope")
            let itemselect = sessionStorage.getItem("selectedProduct");
            let itemsActualNumber = this.orden_line.length
            this.teclado_cal = []
            if (btnop == 'btn_cantidad') {
                if (itemselect >= 0) {
                    let cantItem = this.orden_line[itemselect].cantidad
                    if (Number(cantItem) === Number(1)) {
                        this.removeProduct()
                        sessionStorage.setItem("selectedProduct", Number(itemselect) - 1);
                        this.setElements()
                    } else if (Number(cantItem) > Number(0)) {
                        this.orden_line[itemselect].cantidad = this.orden_line[itemselect].cantidad - 1
                        this.orden_line[itemselect].precio = this.orden_line[itemselect].precio - Number(this.orden_line[itemselect].precio_unit)
                        // this.setElements()
                    }
                }
            }
        },
        putCantidadItemSelect(num) {
            let btnop = sessionStorage.getItem("btn_ope")
            let itemselect = sessionStorage.getItem("selectedProduct");
            let itemsActualNumber = this.orden_line.length
            if (btnop == 'btn_cantidad') {
                if (itemselect >= 0) {
                    let cantItem = this.orden_line[itemselect].cantidad
                    if (Number(cantItem) === Number(1)) {

                        sessionStorage.setItem("selectedProduct", Number(itemselect) - 1);
                    } else if (Number(cantItem) > Number(0)) {
                        this.orden_line[itemselect].cantidad = num
                        // this.orden_line[itemselect].precio = this.orden_line[itemselect].precio - Number(this.orden_line[itemselect].precio_unit)
                    }
                }
            }
        },
        selectedItem(value) {
            this.link = value
            sessionStorage.setItem("selectedProduct", value);
            this.teclado_cal = []

        },
        goPago() {
            if (this.orden_line.length === 0) {
                let message = 'Elija un producto '
                this.$q.notify({
                    type: 'negative',
                    message: message,
                    color: 'primary',
                    position: 'center'
                })
            } else {
                this.$router.push({
                    path: "/pos/pago",
                });
            }

        },
        exportTable() {
            Export.exportTable(this.columns, this.rows);
        },
    },
};
</script>
