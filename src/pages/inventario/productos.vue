<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        :grid="$q.screen.xs"
        title="Treats"
        :rows="getProductos"
        :columns="columns"
        row-key="id"
        :filter="filter"
      >
        <template v-slot:top-left>
          <q-btn
            flat
            color="primary"
            icon-right="archive"
            label="CSV"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:top-right>
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
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="barcode" :props="props">
              {{ props.row.barcode }}
            </q-td>
            <q-td key="type" :props="props">
              {{ props.row.type }}
            </q-td>
            <q-td key="uom_id" :props="props">
              {{ props.row.uom_id[1] }}
            </q-td>
            <q-td key="list_price" :props="props">
              ${{ props.row.list_price }}
            </q-td>
            <q-td key="qty_available" :props="props">
              {{ props.row.qty_available }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
import { exportFile, useQuasar } from "quasar";
import { defineComponent } from "vue";
import { ref } from "vue";

import storeProductos from "src/store/productos/index";

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
      filter: ref(""),
      columns: [
        {
          name: "name",
          field: "name",
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
        { name: "type", label: "type", field: "type", sortable: true },
        { name: "uom_id", label: "uom_id", field: "uom_id" },
        { name: "list_price", label: "Precio", field: "list_price" },
        { name: "qty_available", label: "cantidad", field: "qty_available" },
      ],
      rows: [],
    };
  },
  mounted() {
    this.fetchProductos();
  },
  computed: {
    getProductos() {
      return this.$store.getters["productos/getterProductos"];
    },
  },
  methods: {
    ...mapActions("productos", ["fetchProductos"]),
    fetchProductos() {
      this.$store
          .dispatch("productos/fetchProductos")
          .then((response) => {
            this.rows = response;
          });
    },
    go_todetalle(data) {
      this.$router.push({
        path: "/productos_detalle/" + data,
      });
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.getProductos.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Descarga de archivo denegada por navegador...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>
