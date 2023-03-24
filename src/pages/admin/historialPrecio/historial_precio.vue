<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Historial de precios"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :filter="filter"
      >
        <template v-slot:top-right>
          <!-- <q-btn
            flat
            color="green-6"
            icon-right="add"
            label="Crear"
            @click="go_tonew"
          /> -->
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
        <template v-slot:body="props">
          <q-tr clickable :props="props" @click="go_todetalle(props.row.id)">
            <q-td key="producto_id" :props="props">
              {{ props.row.producto_id }}
            </q-td>
            <q-td key="date" :props="props">
              {{ props.row.date }}
            </q-td>
            <q-td key="precio_unitario" :props="props">
              {{ props.row.precio_unitario }}
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
import Export from "../../../utils/ExportTable";

export default {
  name: "solicitud",
  setup() {
    return {};
  },
  data() {
    return {
      filter: ref(""),
      columns: [
        {
          name: "producto_id",
          field: "producto_id",
          required: true,
          label: "Producto",
          align: "left",
          sortable: true,
        },
        {
          name: "date",
          field: "date",
          required: true,
          label: "Fecha",
          align: "left",
          sortable: true,
        },
        {
          name: "precio_unitario",
          field: "precio_unitario",
          required: true,
          label: "Precio unitario",
          align: "left",
          sortable: true,
        },
      ],
      rows: [],
    };
  },
  mounted() {
    this.getHPrecios();
  },
  methods: {
    ...mapActions("productos", ["fetchHistorialPrecios"]),
    getHPrecios() {
      this.fetchHistorialPrecios().then((response) => {
        this.rows = response;
      });
    },
    go_todetalle(id) {
      this.$router.push({
        name: "historial_precio_detalle",
        params: {
          id: id,
        },
      });
    },
    go_tonew(id) {
      this.$router.push({
        name: "historial_precio_detalle",
        params: {
          id: 0,
          action: "new",
        },
      });
    },
    exportTable() {
      Export.exportTable(this.columns, this.rows);
    },
  },
};
</script>
