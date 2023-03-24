<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Empresa"
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
            v-show="setVisible('configuracion.empresa.create')"
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
        <template v-slot:body="props">
          <q-tr clickable :props="props" @click="go_todetalle(props.row.id)">
            <q-td key="nombre" :props="props">
              {{ props.row.nombre }}
            </q-td>
            <q-td key="direccion" :props="props">
              {{ props.row.direccion }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="created_at" :props="props">
              {{ props.row.created_at }}
            </q-td>
            <q-td key="active" :props="props">
              {{ props.row.active }}
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
import storeConfiguracion from "src/store/configuracion/index";

export default {
  name: "empresa",
  setup() {
    return {};
  },
  data() {
    return {
      filter: ref(""),
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
          name: "direccion",
          align: "center",
          label: "Dirección",
          field: "direccion",
          sortable: true,
        },
        {
          name: "email",
          align: "center",
          label: "Correo",
          field: "email",
          sortable: true,
        },
        {
          name: "created_at",
          align: "center",
          label: "Creado el",
          field: "created_at",
          sortable: true,
        },
        {
          name: "active",
          align: "center",
          label: "state",
          field: "active",
          sortable: true,
        },
      ],
      rows: [],
    };
  },
  mounted() {
    this.fetchEmpresas();
  },
  computed: {
    getEmpresas() {
      return this.$store.getters["configuracion/getterEmpresas"];
    },
  },
  methods: {
    ...mapActions("configuracion", ["fetchEmpresas"]),
    setVisible(permiso) {
      let permisos = JSON.parse(sessionStorage.getItem("permissions"));
      if (permisos) {
        let visible = permisos.indexOf(permiso) != -1 ? true : false;
        return visible;
      }else {
        return false;
      }
    },
    fetchEmpresas() {
      this.$store.dispatch("configuracion/fetchEmpresas").then((response) => {
        this.rows = response;
      });
    },
    go_todetalle(id) {
      this.$router.push({
        name: "empresa_detalle",
        params: { id: id },
      });
    },
    go_tonew(id) {
      this.$router.push({
        name: "empresa_detalle",
        params: { id: 0, action: "new" },
      });
    },
    exportTable() {
      Export.exportTable(this.columns, this.getEmpresas);
    },
  },
};
</script>
