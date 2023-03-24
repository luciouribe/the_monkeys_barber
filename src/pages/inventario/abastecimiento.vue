<template>
<q-page padding>
    <div class="q-ma">
        <div class="rounded-borders text-center">
            <div class="row q-pa-md">
                <div class="col-7 q-pa-md">
                    <q-table class="my-sticky-column-table" title="Productos a cargar" :rows="rows" :columns="columns" row-key="name">
                        <template v-slot:body="props">
                            <q-tr clickable :props="props">
                                <q-td key="producto_id" :props="props">
                                    {{ props.row.producto_id }}
                                </q-td>
                                <q-td key="nombre" :props="props">
                                    {{ props.row.nombre }}
                                </q-td>
                                <q-td key="barcode" :props="props">
                                    {{ props.row.barcode }}
                                </q-td>
                                <q-td key="cantidad" :props="props">
                                    {{ props.row.cantidad }}
                                </q-td>
                                <q-td key="actions" :props="props">
                                    <q-btn round dense color="red" size="sm" icon="delete" @click="removeProduct(props.row)" />
                                </q-td>
                            </q-tr>
                        </template>
                        <template v-slot:bottom>
                            <q-btn color="secondary" icon="save" size="sm" @click="save_carga" label="Iniciar carga" />
                        </template>
                    </q-table>
                </div>
                <div class="col-5 q-pa-md">
                    <q-table class="my-sticky-column-table" :rows="productos" :columns="columnsPro" row-key="nombre" title="Catalogo" :filter="filter">
                        <template v-slot:top-right>
                            <q-input ref="searchfield" v-model="filter" placeholder="Buscar productros (F2)">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </template>
                        <template v-slot:body="props">
                            <q-tr clickable :props="props" @click="addProductOrden(props.row)">
                                <q-td key="nombre" :props="props">
                                    {{ props.row.nombre }}
                                </q-td>
                                <q-td key="barcode" :props="props">
                                    {{ props.row.barcode }}
                                </q-td>
                                <q-td key="precio" :props="props">
                                    ${{ props.row.precio }}
                                </q-td>

                            </q-tr>
                        </template>
                    </q-table>
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
    Notify
} from "quasar";
import {
    exportFile,
    useQuasar
} from "quasar";
import {
    defineComponent
} from "vue";
import {
    ref
} from "vue";

import storeProductos from "src/store/productos/index";
import ScannerDetector from 'js-scanner-detection'

function wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;
    formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);
    formatted = formatted.split('"').join('""');
    return `"${formatted}"`;
}
export default {
    name: "productos",
    setup() {
        return {};
    },
    data() {
        return {
            modelProd: null,
            filter: ref(""),
            productos: [],
            columns: [{
                    name: "producto_id",
                    field: "producto_id",
                    required: true,
                    label: "ID",
                    align: "left",
                    sortable: true,
                },
                {
                    name: "nombre",
                    field: "nombre",
                    required: true,
                    label: "Nombre",
                    align: "left",
                    sortable: true,
                },
                {
                    name: "barcode",
                    align: "center",
                    label: "Codigo de barra",
                    field: "barcode",
                    sortable: true,
                },
                {
                    name: "cantidad",
                    align: "center",
                    label: "Cantidad",
                    field: "cantidad",
                    sortable: true,
                },
                {
                    name: "actions",
                    align: "center",
                }
            ],
            columnsPro: [{
                    name: "nombre",
                    field: "nombre",
                    required: true,
                    label: "Nombre",
                    align: "left",
                    sortable: true,
                },
                {
                    name: "barcode",
                    align: "center",
                    label: "Codigo de barra",
                    field: "barcode",
                    sortable: true,
                },
                {
                    name: "precio",
                    field: "precio",
                },
            ],
            rows: [],
        };
    },
    mounted() {
        this.getProductos()
        let itemsSession = JSON.parse(sessionStorage.getItem("abastecimiento"));
        if (itemsSession) {
            if (itemsSession.length > 0) {
                this.rows = itemsSession
            }
        }
    },
    created() {
        let onComplete = (barcode) => {
            this.searchProduct(barcode)
        }
        let options = {
            onComplete: onComplete
        }
        let scannerDetector = new ScannerDetector(options)

    },
    methods: {
        ...mapActions("productos", ["fetchProductos"]),
        ...mapActions("pos", ["fetchPosProductos", "fetchPosProductosId", "postCargaInventario"]),
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
        save_carga() {
            let formData = new FormData();
            let userID = sessionStorage.getItem("userId");
            let sessiOn = JSON.parse(sessionStorage.getItem("session_on"));
            formData.append("usuario_id", userID);
            formData.append("user_id", userID);
            formData.append("productos", JSON.stringify(this.rows));
            formData.append("r_object", JSON.stringify('{}'));
            this.postCargaInventario(formData)
                .then((response) => {
                    console.log(response)
                    this.rows = []
                    sessionStorage.removeItem("abastecimiento");
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
            let result = this.rows.filter(it => it.producto_id == item.id);
            if (result.length > 0) {
                let elementIndex = this.rows.findIndex((obj => obj.producto_id == item.id));
                this.rows[elementIndex].cantidad = this.rows[elementIndex].cantidad + 1
            } else {
                let product = {
                    producto_id: item.id,
                    nombre: item.nombre,
                    barcode: item.barcode,
                    cantidad: 1,
                }
                this.rows.push(product);
            }
            sessionStorage.setItem("abastecimiento", JSON.stringify(this.rows));

        },
        go_todetalle(data) {
            this.$router.push({
                path: "/productos_detalle/" + data,
            });
        },
        removeProduct(value) {
            var index = this.rows.indexOf(value)
            if (index > -1) {
                this.rows.splice(index, 1)
            }
            sessionStorage.setItem("abastecimiento", JSON.stringify(this.rows));
        },
        filterFn(val, update) {

            update(() => {
                if (val === '') {
                    this.productos.value = this.productos
                } else {
                    const needle = val
                    this.productos = this.productos.filter(
                        v => v.indexOf(needle) > -1
                    )
                }
            })
        }
    }
}
</script>
