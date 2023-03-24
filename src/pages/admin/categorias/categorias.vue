<template>
<q-page padding>
    <div class="q-pa-md">
        <q-table title="Categorías" :rows="rows" :columns="columns" row-key="id" :filter="filter">
            <template v-slot:top-right>
                <q-btn flat color="green-6" icon-right="add" label="Crear" @click="go_tonew" v-show="setVisible('pos.categorias.create')" />
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
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </template>
            <template v-slot:body="props">
                <q-tr clickable :props="props" @click="go_todetalle(props.row.id)">
                    <q-td key="nombre" :props="props">
                        {{ props.row.nombre }}
                    </q-td>
                    <q-td key="tipo" :props="props">
                        {{ props.row.tipo }}
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
import Export from "../../../utils/ExportTable";

export default {
    name: "categorias",
    setup() {
        return {};
    },
    data() {
        return {
            filter: ref(""),
            columns: [{
                    name: "nombre",
                    field: "nombre",
                    required: true,
                    label: "Nombre",
                    align: "left",
                    sortable: true,
                },
                {
                    name: "tipo",
                    field: "tipo",
                    required: true,
                    label: "Tipo",
                    align: "left",
                    sortable: true,
                },

            ],
            rows: [],
        };
    },
    mounted() {
        this.getCategorias();
    },
    methods: {
        ...mapActions("productos", ["fetchCategorias"]),
        setVisible(permiso) {
          let permisos = JSON.parse(sessionStorage.getItem("permissions"));
          if (permisos) {
            let visible = permisos.indexOf(permiso) != -1 ? true : false;
            return visible;
          }else {
            return false;
          }
        },
        getCategorias() {
            this.fetchCategorias().then((response) => {
                this.rows = response;
            });
        },
        go_todetalle(id) {
            this.$router.push({
                name: "categoria_detalle",
                params: {
                    id: id
                },
            });
        },
        go_tonew(id) {
            this.$router.push({
                name: "categoria_detalle",
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
