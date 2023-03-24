<template>
  <q-page padding>
    <div class="bg-visuel text-white rounded-borders">
      <q-toolbar inset>
        <q-breadcrumbs active-color="white" style="font-size: 15px">
          <q-breadcrumbs-el icon="inventory_2" to="/admin/empresa" label="Empresa" />
          <q-breadcrumbs-el :label="row.nombre" />
        </q-breadcrumbs>
      </q-toolbar>
      <q-card flat bordered class="my-card bg-grey-1 text-black">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                <q-btn
                  size="sm"
                  v-show="edit && setVisible('configuracion.empresa.create')"
                  @click="selectEmpresa"
                  label="Utilizar esta empresa "
                  color="blue-grey-5"
                  icon="done"
                >
                </q-btn>
              </div>
            </div>
            <div class="col-3">
              <q-btn-toggle
                v-model="row.active"
                spread
                :readonly="edit"
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
                    <q-item clickable @click="deleteempresa" v-show="setVisible('configuracion.empresa.delete')">
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
                  dense
                  :readonly="edit"
                  filled
                  v-model="row.nombre"
                  label="Nombre de empresa*"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  dense
                  :readonly="edit"
                  filled
                  v-model="row.slogan"
                  label="Slogan *"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-file
                  dense
                  :readonly="edit"
                  filled
                  bottom-slots
                  v-model="logo"
                  label="Logo"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop="logo = null"
                      class="cursor-pointer"
                    />
                  </template>

                  <template v-slot:hint> Sugerencia de campo </template>
                </q-file>
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col-6">
                <q-input
                  dense
                  :readonly="edit"
                  filled
                  v-model="row.direccion"
                  label="Dirección *"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  dense
                  :readonly="edit"
                  filled
                  v-model="row.cp"
                  label="Codigo postal *"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  dense
                  :readonly="edit"
                  filled
                  v-model="row.email"
                  label="Correo *"
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
                  @click="save"
                  v-show="!saveput && setVisible('configuracion.empresa.edit')"
                  label="Guardar cambios"
                  color="blue"
                  icon="save"
                  size="sm"
                >
                </q-btn>
                <q-btn
                  @click="saveNew"
                  v-show="!savepost && setVisible('configuracion.empresa.create')"
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
                  v-show="edit && setVisible('configuracion.empresa.edit')"
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
                  v-show="edit && setVisible('configuracion.empresa.create')"
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
        <q-separator />
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
import { Notify, Loading } from "quasar";
import Track from "../../utils/TrackVisibility";
import Export from "../../utils/ExportTable";
import InfoUser from "../../utils/UserData";
import storeEmpresa from "src/store/configuracion/index";
import CommitsComponent from "src/layouts/utils/CommitsComponent.vue";

export default {
  name: "empresa_detalle",
  computed: {
    Documento: function () {
      return this.row;
    },
    CommitsJSON: function () {
      let ro = this.Documento;
      return ro.r_object;
    },
  },
  data() {
    return {
      track_visibility: [
        "nombre",
        "slogan",
        "logo",
        "direccion",
        "cp",
        "email",
        "active",
      ],
      commits: [],
      commitspre: [],
      add_comment: "",
      icon_user: InfoUser.icon_user(),
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
          name: "state",
          align: "center",
          label: "state",
          field: "state",
          sortable: true,
        },
      ],
      row: [],
      rows: [],
      rowspre: [],
      savepost: true,
      saveput: true,
      edit: true,
      logo: null,
    };
  },
  components: {
    CommitsComponent,
  },
  mounted() {
    this.fetchEmpresaId();
  },
  created() {},

  methods: {
    ...mapActions("configuracion", [
      "fetchEmpresaId",
      "postEmpresa",
      "putEmpresa",
      "deleteEmpresa",
      "putRobject",
    ]),
    setVisible(permiso) {
      let permisos = JSON.parse(sessionStorage.getItem("permissions"));
      if (permisos) {
        let visible = permisos.indexOf(permiso) != -1 ? true : false;
        return visible;
      }else {
        return false;
      }
    },
    fetchEmpresaId() {
      if (this.$route.params.action == "new") {
        this.createOn();
      } else {
        this.$store
          .dispatch("configuracion/fetchEmpresaId", this.$route.params.id)
          .then(() => {
            let item = JSON.stringify(
              this.$store.getters["configuracion/getterEmpresasId"][0]
            );
            this.row = JSON.parse(item);
            this.rows = JSON.parse(item);
            this.commits = this.CommitsJSON.commits;
          });
      }
    },
    saveNew() {
      let formData = new FormData();
      let user_id = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
        "post",
        this.track_visibility,
        this.row
      );
      formData.append("nombre", this.row.nombre);
      formData.append("slogan", this.row.slogan);
      formData.append("logo", this.logo);
      formData.append("direccion", this.row.direccion);
      formData.append("cp", this.row.cp);
      formData.append("email", this.row.email);
      formData.append("active", this.row.active);
      formData.append("direccion", this.row.direccion);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", user_id);
      this.postEmpresa(formData)
        .then((response) => {
          this.commits = response.r_object.commits;
          this.$router.push({
            name: "empresa_detalle",
            params: { id: response.id },
          });
          this.edit = true;
          this.savepost = true;
          this.saveput = true;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Ocurrió un error al guardar el elemento ",
          });
          console.log(error);
        });
    },
    save() {
      let formData = new FormData();
      let user_id = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
        "put",
        this.track_visibility,
        this.rows,
        this.row
      );
      formData.append("nombre", this.row.nombre);
      formData.append("slogan", this.row.slogan);
      formData.append("logo", this.logo);
      formData.append("direccion", this.row.direccion);
      formData.append("cp", this.row.cp);
      formData.append("email", this.row.email);
      formData.append("active", this.row.active);
      formData.append("direccion", this.row.direccion);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", user_id);
      formData.append("id", this.row.id);

      this.putEmpresa(formData)
        .then((response) => {
          this.edit = true;
          this.saveput = true;
          this.row.logo = response[0].logo;
          this.commits = response[0].r_object.commits;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Ocurrió un error al actualizar el elemento ",
          });
          console.log(error);
        });
    },
    deleteempresa() {
      let formData = new FormData();
      let user_id = sessionStorage.getItem("userId");
      formData.append("id", this.row.id);
      formData.append("user_id", user_id);
      this.deleteEmpresa(formData)
        .then(() => {
          this.rowspre = this.rows;
          this.$router.push({
            path: "/empresa",
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
    selectEmpresa() {
      const empresa = {
        nombre: this.row.nombre,
        slogan: this.row.slogan,
        logo: this.row.logo,
        email: this.row.email,
      };
      sessionStorage.setItem("empresa", JSON.stringify(empresa));
      Notify.create({
        type: "positive",
        message: "Empresa seleccionada",
      });
      this.$router.push({name:"empresa"})
    },
    createOn() {
      this.savepost = false;
      this.rowspre = this.row;
      this.commitspre = this.commits;
      this.row = {
        id: "",
        nombre: "",
        slogan: "",
        logo: "",
        direccion: "",
        cp: "",
        email: "",
        active: 1,
        r_object: "",
      };
      this.commits = [];
      this.edit = false;
      this.saveput = true;
    },
    createOf() {
      if (this.$route.params.action == "new") {
        this.$router.push({
          path: "/empresa",
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
    updateOn() {
      this.rowspre = this.row;
      this.commitspre = this.commits;
      this.edit = false;
      this.saveput = false;
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
