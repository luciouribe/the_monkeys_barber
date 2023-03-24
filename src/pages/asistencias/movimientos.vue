<template>
<q-page padding>
    <div class="q-pa-md">
        <q-table title="Movimientos" :rows="rows" :columns="columns" row-key="id" :filter="filter">
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <div class="col-auto">
                    <q-btn color="grey-7" round flat icon="more_vert">
                        <q-menu cover auto-close>
                            <q-list>
                                <q-item clickable>
                                    <q-item-section no-caps @click="exportTable">Exportar</q-item-section>
                                </q-item>
                                <q-item clickable to="/admin/import_data">
                                    <q-item-section no-caps>Importar</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </template>
            <template v-slot:body="props">
                <q-tr clickable :props="props" >
                    <q-td key="nombre" :props="props">
                        {{ props.row.nombre }}
                    </q-td>
                    <q-td key="hora" :props="props">
                        {{ props.row.hora }}
                    </q-td>
                    <q-td key="state" :props="props">
                        {{ props.row.state }}
                    </q-td>
                
                </q-tr>
            </template>
        </q-table>
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
    name: "solicitud",
    setup() {
        return {};
    },
    data() {
        return {
            filter: ref(""),
            columns: [{
                    name: "nombre",
                    field: "nombre",
                    label: "Nombre",
                    align: "center",
                },
                {
                    name: "hora",
                    field: "hora",
                    label: "Fecha",
                    align: "center",
                },
                {
                    name: "state",
                    field: "state",
                    label: "Estado",
                    align: "center",
                }
            ],
            rows: [],
        };
    },
    mounted() {
        this.getEmpleados();
    },
    computed: {
       
    },
    methods: {
        ...mapActions("asistencias", ["fetchMovimientos"]),
        getEmpleados() {
            this.fetchMovimientos().then((response) => {
                this.rows = response;
            });
        },
        go_todetalle(id) {
            this.$router.push({
                name: "empleados_detalle",
                params: {
                    id: id
                },
            });
        },
        go_tonew(id) {
            this.$router.push({
                name: "empleados_detalle",
                params: {
                    id: 0,
                    action: "new"
                },
            });
        },
        exportTable() {
            Export.exportTable(this.columns, this.rows);
        },
    },
};
</script>
