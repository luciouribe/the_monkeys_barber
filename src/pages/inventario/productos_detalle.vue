<template>
  <q-page padding>
    <div class="bg-visuel text-white" >
      <q-toolbar inset >
        <q-breadcrumbs active-color="white" style="font-size: 15px">
          <q-breadcrumbs-el icon="inventory_2" to="/inv_productos" label="Productos" />
          <q-breadcrumbs-el :label="getProductos.nombre" />
        </q-breadcrumbs>
      </q-toolbar>
      <q-card flat bordered class="my-card bg-grey-1 text-black">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <!-- <div class="text-h6">{{ getProductos.nombre }}</div> --><!-- <div class="text-h6">{{ getProductos.nombre }}</div> -->
            </div>
            <div class="col-3">
              <q-btn-toggle
                v-model="getProductos.active"
                spread
                readonly
                size="sm"
                class="my-custom-toggle"
                no-caps
                rounded
                toggle-color="blue-grey-5"
                color="white"
                text-color="visuel"
                :options="[
                  { label: 'Activo', value: 1 },
                  { label: 'Inactivo', value: 0 },
                ]"
              />
            </div>
            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section no-caps @click="exportTable"
                        >Exportar</q-item-section
                      >
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Duplicar</q-item-section>
                    </q-item>
                    <q-item clickable v-show="setVisible('pos.productos.show')">
                      <q-item-section>Eliminar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>
        <q-card-section
          ><q-form class="q-gutter-md">
            <q-card-section horizontal>
              <q-card-section class="col-6">
                <q-input
                  :readonly="edit"
                  filled
                  v-model="getProductos.nombre"
                  label="Nombre *"
                  hint="Name and surname"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="getProductos.nombre"
                  label="Nombre *"
                  hint="Name and surname"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col-6">
                <q-input
                  :readonly="edit"
                  filled
                  type="number"
                  v-model="getProductos.codigo"
                  label="Codigo *"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Please type your age',
                  ]"
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="getProductos.nombre"
                  label="Nombre *"
                  hint="Name and surname"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="getProductos.nombre"
                  label="Nombre *"
                  hint="Name and surname"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </q-card-section>
            </q-card-section>
          </q-form>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="q-pa-md q-gutter-sm text-h6">
                <q-btn
                  @click="edit = true"
                  v-show="!edit && setVisible('pos.productos.create')"
                  label="Guardar"
                  color="blue"
                  icon="save"
                  size="sm"
                >
                </q-btn>
                <q-btn
                  @click="edit = true"
                  v-show="!edit"
                  label="Descartar"
                  color="red-9"
                  icon="delete"
                  size="sm"
                >
                </q-btn>
                <q-btn
                  @click="edit = false"
                  v-show="edit"
                  label="Editar"
                  color="visuel"
                  icon="mode_edit"
                  size="sm"
                >
                </q-btn>
              </div>
            </div>
            <div class="col">
              <div class="text-h6" align="right">
                <q-btn
                  size="sm"
                  v-show="edit"
                  @click="edit = false"
                  label="Crear"
                  color="secondary"
                  icon="add"
                >
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
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
  data() {
    return {
      columns: [
        {
          name: "nombre",
          field: "nombre",
          required: true,
          label: "Nombre",
          align: "left",
          sortable: true,
        },
        {
          name: "codigo",
          align: "center",
          label: "Codigo",
          field: "codigo",
          sortable: true,
        },
        { name: "precio", label: "Precio", field: "precio", sortable: true },
        { name: "descripcion", label: "Descripcion", field: "descripcion" },
      ],
      rows: Object,
      tab: null,
      model: ref("one"),
      stateDocument: 1,
      edit: true,
    };
  },
  mounted() {
    this.fetchProductoId();
  },
  created() {
    this.fetchProductoId();
  },
  computed: {
    getProductos() {
      if (this.$store.getters["productos/getterProductoId"][0]) {
        return this.$store.getters["productos/getterProductoId"][0];
      } else {
        return true;
      }
    },
    getProductos2() {
      return this.$store.getters["productos/getterProductoId"];
    },
  },
  methods: {
    ...mapActions("productos", ["fetchProductoId"]),
    setVisible(permiso) {
      let permisos = JSON.parse(sessionStorage.getItem("permissions"));
      if (permisos) {
        let visible = permisos.indexOf(permiso) != -1 ? true : false;
        return visible;
      }else {
        return false;
      }
    },
    fetchProductoId() {
      this.$store.dispatch("productos/fetchProductoId", this.$route.params.id);
      this.rows = storeProductos.state.producto;
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.getProductos2.map((row) =>
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
