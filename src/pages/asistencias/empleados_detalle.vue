<template>
  <q-page padding>
    <div class="bg-visuel text-black rounded-borders">
      <q-toolbar inset>
        <q-breadcrumbs active-color="black" style="font-size: 15px">
          <q-breadcrumbs-el
            icon="inventory_2"
            to="/admin/empleados"
            label="Empleado"
          />
          <q-breadcrumbs-el :label="row.nombres" />
        </q-breadcrumbs>
      </q-toolbar>
      <q-card flat bordered class="my-card bg-grey-1 text-black">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">

            </div>
            <div class="col-7 q-mx-sm">
            </div>
            <div class="col-3">
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
                    <q-item clickable @click="deleteItem">
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
                  v-model="row.nombres"
                  label="Nombre *"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="row.apellido_paterno"
                  label="Apellido Paterno *"
                  class="q-my-md"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="row.apellido_materno"
                  label="Apellido Materno *"
                  class="q-my-md"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="row.puesto"
                  label="Puesto *"
                  class="q-my-md"
                />
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col-6">
                <q-input
                  :readonly="edit"
                  filled
                  v-model="row.correo"
                  label="Correo *"
                  type="email"
                  lazy-rules
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="row.tel"
                  label="Telefono *"
                  class="q-my-md"
                  type="number"
                  lazy-rules
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="row.direccion"
                  label="Dirección *"
                  class="q-my-md"
                />
                <q-select
                  filled
                  :readonly="edit"
                  v-model="row.horaario_id"
                  map-options
                  emit-value
                  class="q-my-md"
                  :options="horarios"
                  label="Horario *"
                />
                <q-select
                  filled
                  :readonly="edit"
                  v-model="row.usuario_id"
                  map-options
                  emit-value
                  class="q-my-md"
                  :options="usuarios"
                  label="Usuario *"
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
                  @click="save"
                  v-show="!saveput"
                  label="Guardar cambios"
                  color="blue"
                  icon="save"
                  size="sm"
                >
                </q-btn>
                <q-btn
                  @click="validate"
                  v-show="!savepost"
                  label="Guardar"
                  color="blue"
                  icon="save"
                  size="sm"
                >
                </q-btn>
                <q-btn
                  @click="createOf"
                  v-show="!edit"
                  label="Descartar"
                  color="red-9"
                  icon="delete"
                  size="sm"
                >
                </q-btn>
                <q-btn
                  @click="updateOn"
                  v-show="edit"
                  label="Editar"
                  color="red"
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
                  @click="createOn"
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
    <br />
    <div class="row items-center no-wrap">
      <div class="col-6">
        <q-input
          dense
          v-on:keyup.enter="AddComment"
          v-model="add_comment"
          label="Agrega un comentario aquí..."
        >
          <template v-slot:before>
            <q-avatar>
              <img :src="icon_user" />
            </q-avatar>
          </template>
          <template v-slot:append>
            <q-btn round dense flat icon="send" />
          </template>
        </q-input>
      </div>
    </div>
    <CommitsComponent :commits="commits" />
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
import { ref } from "vue";
import Track from "../../utils/TrackVisibility";
import Export from "../../utils/ExportTable";
import InfoUser from "../../utils/UserData";
import CommitsComponent from "src/layouts/utils/CommitsComponent.vue";

export default {
  name: "empleados_detalle",
  components: {
    CommitsComponent,
  },
  data() {
    return {
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
                    name: "apellido_paterno",
                    field: "apellido_paterno",
                    required: true,
                    label: "Apellido paterno",
                    align: "left",
                    sortable: true,
                },
                {
                    name: "apellido_materno",
                    field: "apellido_materno",
                    required: true,
                    label: "Apellido materno",
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
                {
                    name: "direccion",
                    align: "center",
                    label: "Direccion",
                    field: "direccion",
                    sortable: true,
                },
            ],
      track_visibility: ["nombres", "apellido_paterno", "apellido_materno"],
      uom: [],
      commits: [],
      commitspre: [],
      rowspre: [],
      savepost: true,
      saveput: true,
      add_comment: "",
      icon_user: InfoUser.icon_user(),
      rows: [],
      rowspre: [],
      row: [],
      tab: null,
      edit: true,
      usuarios: [],
      horarios: [],
    };
  },
  mounted() {
    this.fetchEmpleadosId();
    this.getUsuarios();
    this.getHorarios();
  },
  computed: {
    Documento: function () {
      return this.rows;
    },
    CommitsJSON: function () {
      let ro = this.Documento;
      return ro.r_object;
    },
  },
  methods: {

    ...mapActions("asistencias", ["fetchEmpleadosId", "fetchHorarios", "postEmpleado", "putEmpleado"]),
    ...mapActions("configuracion", ["fetchUsuarios"]),

    fetchEmpleadosId() {
      if (this.$route.params.action == "new") {
        this.createOn();
      } else {
        this.$store
          .dispatch("asistencias/fetchEmpleadosId", {id: this.$route.params.id})
          .then((res) => {
            let item = res[0];
            this.row = item;
            this.rows = item;
            this.commits = this.CommitsJSON.commits;
          });
      }
    },

    getUsuarios() {
      this.fetchUsuarios()
        .then((resp) => {
          resp.forEach(this.setUsuarios);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getHorarios() {
      this.fetchHorarios()
        .then((resp) => {
          resp.forEach(this.setHorarios);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    setUsuarios(element){
      this.usuarios.push({
        value: element.id,
        label: element.name
      });
    },

    setHorarios(element){
      this.horarios.push({
        value: element.id,
        label: String(`${element.hora_entrada} - ${element.hora_salida}`)
      });
    },

    validate() {
      if (
        !this.row.nombres ||
        !this.row.apellido_paterno ||
        !this.row.apellido_materno
      ) {
        Notify.create({
          type: "warning",
          message: "Rellena todos los campos solicitados",
        });
      } else {
        this.saveNew();
      }
    },

    saveNew() {
      let userId = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
                "post",
                this.track_visibility,
                this.row
            );
      let password = `${this.row.nombres}%${this.row.apellido_paterno.slice(0, 3)}`;
      let formData = new FormData();
      formData.append("usuario_id", userId);
      formData.append("nombres", this.row.nombres);
      formData.append("apellido_paterno", this.row.apellido_paterno);
      formData.append("apellido_materno", this.row.apellido_materno);
      formData.append("puesto", "");
      formData.append("departamento", "");
      formData.append("area", "");
      formData.append("ubicacion", this.row.ubicacion);
      formData.append("rfc", "");
      formData.append("direccion", "");
      formData.append("tel_trabajo", "");
      formData.append("correo", "");
      formData.append("tel", "");
      formData.append("image", "");
      formData.append("horaario_id", this.row.horaario_id);
      formData.append("state", 'open');
      formData.append("email_verified_at", "");
      formData.append("password", password);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", userId);
      this.postEmpleado(formData)
        .then((response) => {
          this.commits = response.r_object.commits;
          this.$router.push({
            name: "empleados_detalle",
            params: {
              id: response.id,
            },
          });
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Ocurrió un error al guardar el elemento ",
          });
          console.error(error);
        });
    },

    save() {
      let userId = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
        "put",
        this.track_visibility,
        this.rows,
        this.row
      );
      let password = `${this.row.nombres}%${this.row.apellido_paterno.slice(0, 3)}`;
      let formData = new FormData();
      formData.append("id", this.row.id);
      formData.append("usuario_id", userId);
      formData.append("nombres", this.row.nombres);
      formData.append("apellido_paterno", this.row.apellido_paterno);
      formData.append("apellido_materno", this.row.apellido_materno);
      formData.append("puesto", "");
      formData.append("departamento", "");
      formData.append("area", "");
      formData.append("ubicacion", "");
      formData.append("rfc", "");
      formData.append("direccion", "");
      formData.append("tel_trabajo", "");
      formData.append("correo", "");
      formData.append("tel", "");
      formData.append("image", "");
      formData.append("horaario_id", this.row.horaario_id);
      formData.append("state", 'open');
      formData.append("email_verified_at", "");
      formData.append("password", password);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", userId);
      this.putEmpleado(formData)
        .then((response) => {
          this.commits = response.r_object.commits;
          this.$router.push({
          name: "empleado_detalle",
          params: {
            id: response.id,
          },
        });
          this.edit = true;
          this.saveput = true;
          this.savepost = true;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Ocurrió un error al actualizar el elemento ",
          });
          console.error(error);
        });
    },
    deleteItem() {
      let formData = new FormData();
      let userId = sessionStorage.getItem("userId");
      formData.append("id", this.row.id);
      formData.append("user_id", user_id);
      this.deleteProducto(formData)
        .then(() => {
          this.rowspre = this.rows;
          this.$router.push({
            path: "/inv_productos",
          });
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Ocurrió un error al eliminar el elemento ",
          });
          console.log(error);
        });
    },
    createOn() {
      this.savepost = false;
      this.rowspre = this.rows;
      this.commitspre = this.commits;
      this.row = {
        id: "",
        nombre: "",
        barcode: "",
        tipo: "",
        uom: "",
        precio: "",
        r_object: "",
      };
      this.commits = [];
      this.edit = false;
      this.saveput = true;
    },
    updateOn() {
      this.rowspre = this.row;
      this.commitspre = this.commits;
      this.edit = false;
      this.saveput = false;
    },
    createOf() {
      if (this.$route.params.action == "new") {
        this.$router.push({
          path: "/empleados",
        });
      } else {
        if (this.rowspre) {
          this.row = this.rowspre;
          this.commits = this.commitspre;
        } else if (this.rowspre) {
          this.rowspre = this.row;
          this.commitspre = this.commits;
        }
        this.edit = true;
        this.savepost = true;
        this.saveput = true;
      }
    },
    AddComment() {
      let user_id = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
        "comment",
        this.track_visibility,
        this.rows,
        this.row,
        this.add_comment
      );
      let formData = {
        r_object: JSON.stringify(r_object),
        user_id: user_id,
        id: this.row.id,
      };
      this.putRobject(formData)
        .then((response) => {
          this.commits = response[0].r_object.commits;
          this.add_comment = null;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Ocurrió un error al actualizar el elemento ",
          });
          console.log(error);
        });
    },
    exportTable() {
      Export.exportTable(this.columns, [this.Documento]);
    },
  },
};
</script>
