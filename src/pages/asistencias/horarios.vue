<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        :grid="$q.screen.xs"
        title="Horarios"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
      >
        <template v-slot:top-right>
           <q-btn
            flat
            color="green-6"
            icon-right="add"
            label="Crear"
            @click="go_tonew"
          />
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section no-caps @click="exportTable"
                      >Exportar</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </template>
        <template v-slot:body="props" >
          <q-tr clickable :props="props"  @click="go_todetalle(props.row.id)">
          <q-td key="hora_entrada" :props="props">
            {{ props.row.hora_entrada }}
          </q-td>

          <q-td key="hora_salida" :props="props">
            {{ props.row.hora_salida }}
          </q-td>
          <q-td key="tipo" :props="props" >
            {{ props.row.tipo }}
          </q-td>
           </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ref } from "vue";
import Export from "../../utils/ExportTable";
import storeUsuarios from "src/store/configuracion/index";

export default {
  name: "usuarios",
  setup() {
    return {};
  },
  data() {
    return {
      filter: ref(""),
      columns: [
        {
          name: "hora_entrada",
          field: "hora_entrada",
          required: true,
          label: "Hora de entrada",
          align: "center",
          sortable: true,
        },
        {
          name: "hora_salida",
          field: "hora_salida",
          required: true,
          label: "Hora de salida",
          align: "center",
          sortable: true,
        },
        {
          name: "tipo",
          align: "center",
          label: "Tipo",
          field: "tipo",
          sortable: true,
        },

      ],
      rows: [],
    };
  },
  mounted() {
    this.fetchUsuarios();
  },
  methods: {
    ...mapActions("configuracion", ["fetchUsuarios"]),
    fetchUsuarios() {
      this.$store.dispatch("asistencias/fetchHorarios").then((response) => {
        this.rows = response;
      });
    },
    go_todetalle(id) {
      this.$router.push({
        name: 'horarios_detalle',
        params: { id: id },
      });
    },
    go_tonew(id) {
      this.$router.push({
        name: "horarios_detalle",
        params: { id: 0, action: "new" },
      });
    },
    exportTable() {
      Export.exportTable(this.columns, this.rows);
    },
  },
};
</script>
