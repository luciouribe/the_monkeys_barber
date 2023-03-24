<template>
  <q-page padding>
    <div class="bg-visuel text-white">
      <q-toolbar inset>
        <q-breadcrumbs active-color="white" style="font-size: 15px">
          <q-breadcrumbs-el
            icon="inventory_2"
            to="/admin/usuarios"
            label="Usuario"
          />
          <q-breadcrumbs-el v-if="!row.name" icon="add" label="Crear" />
          <q-breadcrumbs-el :label="row.name" />
        </q-breadcrumbs>
      </q-toolbar>
      <q-card flat bordered class="my-card bg-grey-1 text-black">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <!-- <div class="text-h6">{{ getUsuario.nombre }}</div> --><!-- <div class="text-h6">{{ getUsuario.nombre }}</div> -->
            </div>
            <div class="col-3">
              <q-btn-toggle
                v-model="row.state"
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
                  { label: 'Activo', value: 'open' },
                  { label: 'Inactivo', value: 'close' },
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
                    <q-item clickable @click="deleteUser" v-show="setVisible('configuracion.usuarios.delete')">
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
                  v-model="row.name"
                  label="Nombre *"
                  lazy-rules
                  dense
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-input
                  :readonly="edit"
                  filled
                  v-model="row.email"
                  label="Correo *"
                  dense
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col-6">
                <q-select
                  :readonly="edit"
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Selecciona el tipo de usuario',
                  ]"
                  lazy-rules
                  dense
                  filled
                  v-model="role"
                  :options="roles"
                  emit-value
                  label="Rol"
                />
                <q-input
                  v-model="password"
                  v-show="!savepost"
                  dense
                  filled
                  hint="Contraseña *"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <q-btn
                  class="q-ma-md"
                  @click="randomPass"
                  v-show="!savepost"
                  label="Generar contraseña"
                  color="green"
                  icon="key"
                  size="sm"
                ></q-btn>
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
                  v-show="!saveput && setVisible('configuracion.usuarios.edit')"
                  label="Guardar cambios"
                  color="blue"
                  icon="save"
                  size="sm"
                >
                </q-btn>
                <q-btn
                  @click="saveNew"
                  v-show="!savepost && setVisible('configuracion.usuarios.create')"
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
                  v-show="edit && setVisible('configuracion.usuarios.edit')"
                  label="Editar"
                  color="visuel"
                  icon="mode_edit"
                  size="sm"
                >
                </q-btn>
              </div>
            </div>
            <div class="col">
              <div class="q-pa-md q-gutter-sm text-h6" align="right">
                <q-btn
                  size="sm"
                  v-show="!edit && setVisible('configuracion.usuarios.edit')"
                  @click="resetPass()"
                  label="Generar nueva contraseña"
                  color="blue-9"
                  icon="key"
                />
                <q-btn
                  size="sm"
                  v-show="!edit && setVisible('configuracion.usuarios.edit')"
                  @click="removeRol()"
                  label="Remover rol"
                  color="red-9"
                  icon="delete"
                />
                <q-btn
                  size="sm"
                  v-show="edit && setVisible('configuracion.usuarios.create')"
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
    <q-dialog v-model="dialogPass" persistent>
      <q-layout
        view="hHh Lpr fFf"
        container
        class="bg-white"
        style="max-height: 350px"
      >
        <q-header class="bg-visuel">
          <q-toolbar>
            <q-toolbar-title>Nueva contraseña</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>
        <q-page-container>
          <q-page padding>
            <p>
              <q-list
                bordered
                class="rounded-borders"
                style="min-width: 300px; min-height: 100px"
              >
                <q-item>
                  <q-item-section class="q-pa-lg">
                    <p class="text-center q-mb-xl" style="font-size: large">
                      Se ha actualizado la contraseña
                    </p>
                    <p class="text-center" style="font-size: xx-large">
                      {{ password }}
                    </p>
                  </q-item-section>
                </q-item>
              </q-list>
            </p>
          </q-page>
        </q-page-container>
        <q-footer class="bg-visuel text-white">
          <q-toolbar inset> </q-toolbar>
        </q-footer>
      </q-layout>
    </q-dialog>
    <div class="row items-center no-wrap">
      <div class="col-6">
        <q-input
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
import storeUsuario from "src/store/configuracion/index";

export default {
  name: "usuarios_detalle",
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
      dialogPass: false,
      track_visibility: ["name", "email", "state", "role"],
      commits: [],
      commitspre: [],
      add_comment: "",
      icon_user: InfoUser.icon_user(),
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
          label: "email",
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
          label: "Estado",
          field: "state",
          sortable: true,
        },
      ],
      row: [],
      rows: [],
      rowspre: [],
      password: "",
      randomPassword: "",
      isPwd: ref(true),
      savepost: true,
      saveput: true,
      edit: true,
      roles: [],
      role: "",
    };
  },

  components: {
    CommitsComponent,
  },

  mounted() {
    this.getRoles();
    this.fetchUsuarioId();
  },
  created() {},

  methods: {
    ...mapActions("configuracion", [
      "fetchUsuarioId",
      "postUsuario",
      "putUsuario",
      "deleteUsuario",
      "resetPassword",
      "putRobjectUsuario",
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
    async getRoles() {
      try {
        let res = await this.$store.dispatch("permisos/getRoles");
        res.forEach(this.setRoles);
      } catch (error) {
        console.error(error);
      }
    },
    setRoles(element) {
      this.roles.push({
        label: element.name,
        value: element.name,
      });
    },
    removeRol() {
      try {
        let formData = new FormData();
        formData.append("id", this.row.id);
        formData.append("roleName", this.row.roles[0].name);
        this.$store.dispatch("permisos/removeRole", formData);
        this.edit = true;
        this.saveput = true;
        Notify.create({
          type: "positive",
          message: "Se removió el rol exitosamente",
        });
      } catch (error) {
        console.error(error);
      }
    },
    dismiss() {
      this.rows.name = "";
      this.rows.email = "";
      this.rows.tipo = "";
      this.rows.state = "";
      this.password = null;
      this.confirm = false;
      this.edit = true;
      this.savepost = true;
      this.saveput = true;
      this.$router.push({
        path: "usuarios",
      });
    },
    randomPass() {
      for (let i = 0; i < 10; i++) {
        this.randomPassword += String.fromCharCode(
          (Math.floor(Math.random() * 100) % 94) + 33
        );
      }
      this.password = this.randomPassword;
      this.randomPassword = "";
    },
    validate() {
      if (this.user) {
        this.rows = JSON.parse(this.user);
      } else {
        this.rows.name = "";
        this.rows.email = null;
        this.rows.tipo = "";
        this.rows.state = "";
        this.password = null;
        this.edit = false;
        this.savepost = false;
      }
    },
    validateForm(form) {
      let rules = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      if (form == "created") {
        if (
          !this.rows.name ||
          !this.rows.email ||
          !this.rows.tipo ||
          !this.rows.state ||
          !this.password
        ) {
          Notify.create({
            type: "warning",
            message: "Contesta todos los campos.",
          });
        } else {
          if (rules.exec(this.rows.email)) {
            this.saveNew();
          } else {
            Notify.create({
              type: "warning",
              message: "Ingresa una direción de email valida.",
            });
          }
        }
      } else {
        if (!this.rows.name || !this.rows.email || !this.rows.tipo) {
          Notify.create({
            type: "warning",
            message: "Contesta todos los campos.",
          });
        } else {
          if (rules.exec(this.rows.email)) {
            this.save();
          } else {
            Notify.create({
              type: "warning",
              message: "Ingresa una direción de email valida.",
            });
          }
        }
      }
    },
    fetchUsuarioId() {
      if (this.$route.params.action == "new") {
        this.createOn();
      } else {
        this.$store
          .dispatch("configuracion/fetchUsuarioId", this.$route.params.id)
          .then(() => {
            let item = JSON.stringify(
              this.$store.getters["configuracion/getterUsuarioId"]
            );
            this.row = JSON.parse(item);
            this.rows = JSON.parse(item);
            this.role = this.row.roles[0].name;
            this.commits = this.CommitsJSON.commits;
          });
      }
    },
    saveNew() {
      let formData = new FormData();
      let userId = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
        "post",
        this.track_visibility,
        this.row
      );
      formData.append("name", this.row.name);
      formData.append("email", this.row.email);
      formData.append("contraseña", this.password);
      formData.append("tipo", this.row.tipo);
      formData.append("role", this.role);
      formData.append("state", this.row.state);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", userId);
      this.postUsuario(formData)
        .then((response) => {
          this.commits = response.r_object.commits;
          this.$router.push({
            name: "usuarios_detalle",
            params: { id: response.id },
          });
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
      let userId = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
        "put",
        this.track_visibility,
        this.rows,
        this.row
      );
      formData.append("id", this.row.id);
      formData.append("name", this.row.name);
      formData.append("email", this.row.email);
      formData.append("role", this.role);
      formData.append("state", this.row.state);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", userId);

      this.putUsuario(formData)
        .then((response) => {
          this.edit = true;
          this.saveput = true;
          this.commits = response.r_object.commits;
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Ocurrió un error al actualizar el elemento ",
          });
          console.log(error);
        });
    },
    deleteUser() {
      let formData = new FormData();
      let userId = sessionStorage.getItem("userId");
      formData.append("id", this.rows.id);
      formData.append("user_id", userId);
      this.deleteUsuario(formData)
        .then(() => {
          this.rowspre = this.rows;
          this.$router.push({
            path: "/usuarios",
          });
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: "Error al modificar",
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
        name: "",
        email: "",
        tipo: "",
        state: "open",
        r_object: "",
        user_id: sessionStorage.getItem("userId"),
      };
      this.commits = [];
      this.edit = false;
      this.saveput = true;
    },
    createOf() {
      if (this.$route.params.action == "new") {
        this.$router.push({
          path: "/usuarios",
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
    resetPass() {
      this.randomPass();
      let formData = new FormData();
      formData.append("id", this.row.id);
      formData.append("newPassword", this.password);
      console.log(this.password);
      try {
        this.resetPassword(formData);
        this.dialogPass = true;
      } catch (error) {
        console.error(error);
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
      this.putRobjectUsuario(formData)
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
