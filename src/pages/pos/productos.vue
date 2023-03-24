<template>
<div class="q-pa-md">
    <q-table title="Treats" :filter="filter" :rows="rows_productos" :columns="columns_productos" color="primary" row-key="name">
        <template v-slot:top-left>
            <q-input ref="searchfield" rounded filled dense debounce="300" v-model="filter" placeholder="Buscar productros">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>
        <template v-slot:top-right>
            <q-btn color="primary" flat icon-right="archive" label="Exportar a csv" no-caps @click="exportTable" />
        </template>
    </q-table>
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
    name: "productos",
    setup() {
        return {};
    },
    data() {
        return {
            filter: '',
            columns_productos: [{
                    name: "nombre",
                    align: "center",
                    label: "Nombre",
                    field: "nombre",
                },
                {
                    name: "barcode",
                    label: "Codigo",
                    field: "barcode",
                    sortable: true,
                },
                {
                    name: "precio",
                    label: "Precio",
                    field: "precio",
                    sortable: true,
                },
                {
                    name: "tipo",
                    label: "Tipo",
                    field: "tipo",
                    sortable: true,
                },
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
        ...mapActions("catalogos", ["fetchProductos"]),

        getProductos() {
            this.fetchProductos()
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
