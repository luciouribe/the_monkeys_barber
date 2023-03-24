<template>
<q-page padding>
    <div class="q-pa-md">
        <q-table title="Empleados" :rows="rows" :columns="columns" row-key="id" :filter="filter">
            <template v-slot:top-right>
                <q-btn flat color="green-6" icon-right="add" label="Crear" @click="go_tonew" />
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
                <q-tr clickable :props="props" @click="go_todetalle(props.row.id)">
                    <q-td key="nombres" :props="props">
                        {{ `${props.row.nombres} ${props.row.apellido_paterno} ${props.row.apellido_materno}`}}
                    </q-td>
                    <q-td key="puesto" :props="props">
                        {{ props.row.puesto }}
                    </q-td>
                    <q-td key="correo" :props="props">
                        {{ props.row.correo }}
                    </q-td>
                    <q-td key="tel" :props="props">
                        {{ props.row.tel }}
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
                    name: "nombres",
                    field: "nombres",
                    required: true,
                    label: "Nombre",
                    align: "left",
                    sortable: true,
                },
                {
                    name: "puesto",
                    field: "puesto",
                    required: true,
                    label: "Puesto",
                    align: "left",
                    sortable: true,
                },
                {
                    name: "correo",
                    field: "correo",
                    required: true,
                    label: "Correo",
                    align: "left",
                    sortable: true,
                },
                {
                    name: "tel",
                    align: "center",
                    label: "Telefono",
                    field: "tel",
                    sortable: true,
                },
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
        ...mapActions("asistencias", ["fetchEmpleados"]),
        getEmpleados() {
            this.fetchEmpleados().then((response) => {
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
