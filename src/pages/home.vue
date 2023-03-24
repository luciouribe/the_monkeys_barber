<template>
<q-page padding>
    <div class="q-ma">
        <div class="rounded-borders text-center">
            <div class="row q-pa-md">
                <div class="col-4">
                    <q-date color="blue-grey-8" v-model="fechas" range /><br><br>
                    <q-checkbox color="blue-grey-8" v-model="sales_day" label="Ventas del día" />
                    <q-separator />
                    <q-card-actions label="Filtros">
                        Homeopátia
                        <q-checkbox color="blue-grey-8" v-model="homeopatia" label="" />
                        <q-btn color="blue-grey-8" label="Buscar" @click="getProductos()"/>
                    </q-card-actions>
                </div>
                <div class="col">
                    <q-table  title="Treats" :filter="filter" :rows="rows_ordenes" :columns="columns_productos" color="primary" row-key="name">
                        <template v-slot:top-left>
                            <q-input ref="searchfield" rounded filled dense debounce="300" v-model="filter" placeholder="Buscar ordenes">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </template>
                        <template v-slot:top-right>
                            <q-btn color="primary" flat icon-right="archive" label="Exportar a csv" no-caps @click="exportTable" />
                        </template>
                        <template v-slot:body="props">
                            <q-tr clickable :props="props">
                                <q-td key="producto" :props="props">
                                    {{ props.row.producto }}
                                </q-td>
                                <q-td key="categoria" :props="props">
                                    {{ props.row.categoria }}
                                </q-td>
                                <q-td key="fecha_orden" :props="props">
                                    {{ props.row.fecha_orden }}
                                </q-td>
                                <q-td key="orden" :props="props">
                                    {{ props.row.orden }}
                                </q-td>
                                <q-td key="responsable" :props="props">
                                    {{ props.row.responsable }}
                                </q-td>
                                <q-td key="sesion" :props="props">
                                    {{ props.row.sesion }}
                                </q-td>
                                <q-td key="cantidad" :props="props">
                                    {{ props.row.cantidad }}
                                </q-td>
                                <q-td key="precio_unitario" :props="props">
                                    {{ props.row.precio_unitario }}
                                </q-td>
                     
                               
                            </q-tr>
                        </template>
                    </q-table>
                    <q-dialog v-model="detailOrden">
                        <q-card>
                            <q-card-section class="row items-center ">
                                <q-space />
                                <q-btn icon="close" flat round dense v-close-popup />
                            </q-card-section>

                            <q-card-section>
                                <q-table :title="order_active" :rows="detailsOrder" :columns="columns_ordenes_line" row-key="name" />
                            </q-card-section>
                        </q-card>
                    </q-dialog>
              
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
import moment from 'moment'
import Export from "../utils/ExportTable";
var duration = moment.duration({'days' : 5});
let dateAfter =moment().subtract(duration).format('YYYY/MM/DD');
let dateNow =moment(new Date()).subtract(-1, 'days').format('YYYY/MM/DD')
export default {
    name: "ordenes",
    setup() {
        return {};
    },
    data() {
        return {
            homeopatia: false,
            fechas: ref({
                from: dateAfter,
                to: dateNow,
            }),
            detailOrden: false,
            filter: '',
            order_active: '',
            columns_ordenes_line: [{
                    name: "producto",
                    align: "center",
                    label: "Producto",
                    field: "producto",
                },
                {
                    name: "precio_unitario",
                    align: "center",
                    label: "Precio",
                    field: "precio_unitario",
                },
                {
                    name: "cantidad",
                    align: "center",
                    label: "cantidad",
                    field: "cantidad",
                }
            ],
            detailsOrder: [],
            columns_productos: [{
                    name: "producto",
                    align: "center",
                    label: "Producto",
                    field: "producto",
                }, {
                    name: "categoria",
                    align: "center",
                    label: "Categoria",
                    field: "categoria",
                },
                {
                    name: "fecha_orden",
                    label: "Fecha",
                    field: "fecha_orden",
                    sortable: true,
                },
                {
                    name: "orden",
                    label: "Orden",
                    field: "orden",
                    sortable: true,
                },
                {
                    name: "responsable",
                    label: "responsable",
                    field: "responsable",
                    sortable: true,
                },
                {
                    name: "sesion",
                    label: "sesion",
                    field: "sesion",
                },
                {
                    name: "cantidad",
                    label: "Cantidad",
                    field: "cantidad",
                },
                {
                    name: "precio_unitario",
                    label: "Precio unitario",
                    field: "precio_unitario",
                    sortable: true,
                }
            ],
            rows_ordenes: [],
            sales_day:false,
        };
    },
    mounted() {
        this.getProductos()
    },
    created() {

    },
    computed: {

    },
    methods: {
        ...mapActions("catalogos", ["fetchOrdenes","fetchOrdenesFilter"]),

        getProductos() {
             const params = {
                    fecha_inicio: this.fechas.from,
                    fecha_fin: this.fechas.to,
                    filter1: this.homeopatia,
                    filter2: this.sales_day,
                };
            this.fetchOrdenesFilter(params)
                .then((response) => {
                    this.rows_ordenes = response

                })
                .catch((error) => {
                    console.error(error);
                });

        },

        exportTable() {
            Export.exportTable(this.columns_productos, this.rows_ordenes);
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
