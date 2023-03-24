<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        :grid="$q.screen.xs"
        title="Usuarios"
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
            v-show="setVisible('configuracion.usuarios.create')"
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
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>

          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="created_at" :props="props" >
            {{ props.row.created_at }}
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
          name: "name",
          field: "name",
          required: true,
          label: "Nombre",
          align: "left",
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
          name: "state",
          align: "center",
          label: "Creado el",
          field: "state",
          sortable: true,
        },
        {
          name: "created_at",
          align: "center",
          label: "state",
          field: "created_at",
          sortable: true,
        },

      ],
      rows: [],
    };
  },
  mounted() {
    this.fetchUsuarios();
  },
  computed: {
    getUsuarios() {
      return this.$store.getters["configuracion/getterUsuarios"];
    },
  },
  methods: {
    ...mapActions("configuracion", ["fetchUsuarios"]),
    setVisible(permiso) {
      let permisos = JSON.parse(sessionStorage.getItem("permissions"));
      if (permisos) {
        let visible = permisos.indexOf(permiso) != -1 ? true : false;
        return visible;
      }else {
        return false;
      }
    },
    fetchUsuarios() {
      this.$store.dispatch("configuracion/fetchUsuarios").then((response) => {
        this.rows = response;
      });
    },
    go_todetalle(id) {
      this.$router.push({
        name: 'usuarios_detalle',
        params: { id: id },
      });
    },
    go_tonew(id) {
      this.$router.push({
        name: "usuarios_detalle",
        params: { id: 0, action: "new" },
      });
    },
    exportTable() {
      Export.exportTable(this.columns, this.rows);
    },
  },
};
</script>
