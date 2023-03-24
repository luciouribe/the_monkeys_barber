<template>
<div class="q-pa-md">
    <q-table title="Treats" :filter="filter" :rows="rows_productos" :columns="columns_productos" color="primary" row-key="name">
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
            <q-tr clickable :props="props" @click="detailOrden=true,detailsOrder=props.row.lineas_orden,order_active=props.row.orden">
                <q-td key="orden" :props="props">
                    {{ props.row.orden }}
                </q-td>
                <q-td key="sesion" :props="props">
                    {{ props.row.sesion }}
                </q-td>
                <q-td key="fecha_orden" :props="props">
                    {{ props.row.fecha_orden }}
                </q-td>
                <q-td key="monto_total" :props="props">
                    {{ props.row.monto_total }}
                </q-td>
                <q-td key="state" :props="props">
                    {{ props.row.state }}
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
    name: "ordenes",
    setup() {
        return {};
    },
    data() {
        return {
            homeopatia: false,
            detailOrden: false,
            filter: '',
            order_active: '',
            columns_ordenes_line: [{
                    name: "nombre",
                    align: "center",
                    label: "Producto",
                    field: "nombre",
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
                    name: "orden",
                    align: "center",
                    label: "Orden",
                    field: "orden",
                }, {
                    name: "sesion",
                    align: "center",
                    label: "Caja",
                    field: "sesion",
                },
                {
                    name: "fecha_orden",
                    label: "Fecha",
                    field: "fecha_orden",
                    sortable: true,
                },
                {
                    name: "monto_total",
                    label: "Total",
                    field: "monto_total",
                    sortable: true,
                },
                {
                    name: "state",
                    label: "Estado",
                    field: "state",
                    sortable: true,
                }
            ],
            rows_productos: [],
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
        ...mapActions("catalogos", ["fetchOrdenes"]),

        getProductos() {
            this.fetchOrdenes()
                .then((response) => {
                    this.rows_productos = response

                })
                .catch((error) => {
                    console.error(error);
                });

        },

        exportTable() {
            Export.exportTable(this.columns_productos, this.rows_productos);
        },
    },
};
</script>
