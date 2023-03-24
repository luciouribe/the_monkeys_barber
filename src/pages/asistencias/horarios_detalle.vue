<template>
  <q-page padding>
    <div class="bg-visuel text-white">
      <q-toolbar inset>
        <q-breadcrumbs active-color="white" style="font-size: 15px">
          <q-breadcrumbs-el
            icon="inventory_2"
            to="/admin/horarios"
            label="Horario"
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
            <div class="col-3"></div>
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
                    <q-item clickable @click="deleteUser">
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
                  filled
                  :disable="edit"
                  v-model="row.hora_entrada"
                  mask="time"
                  :rules="[
                    'time',
                    (val) =>
                      (val !== null && val !== '') ||
                      'Selecciona la hora de entrada',
                  ]"
                  name="Hora de entrada *"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="row.hora_entrada">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-select
                  filled
                  :readonly="edit"
                  v-model="row.tipo"
                  map-options
                  emit-value
                  class="q-my-md"
                  :options="['matutino','verpertino','mixto']"
                  label="Tipo *"
                />
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col-6">
                <q-input
                  filled
                  :disable="edit"
                  v-model="row.hora_salida"
                  mask="time"
                  :rules="[
                    'time',
                    (val) =>
                      (val !== null && val !== '') ||
                      'Selecciona la hora de salida',
                  ]"
                  name="Hora de salida *"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="row.hora_salida">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
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
                  @click="saveNew"
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
  name: "horarios_detalle",
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
      track_visibility: ["hora_entrada", "hora_salida", "tipo","state"],
      commits: [],
      commitspre: [],
      add_comment: "",
      icon_user: InfoUser.icon_user(),
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
    this.fetchHorarioId();
  },
  created() {},

  methods: {
    ...mapActions("asistencias", [
      "fetchHorarioId",
      "postHorario",
      "putHorario",
      "deleteHorario",
      "putRobjectHorario",
    ]),
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
    dismiss() {
      this.rows.hora_entrada = "";
      this.rows.hora_salida = "";
      this.rows.tipo = "";
      this.rows.state = "";
      this.edit = true;
      this.savepost = true;
      this.saveput = true;
      this.$router.push({
        name: "horarios",
      });
    },
    validate() {
      if (this.user) {
        this.rows = JSON.parse(this.user);
      } else {
        this.rows.hora_entrada = "";
        this.rows.hora_salida = null;
        this.edit = false;
        this.savepost = false;
      }
    },
    fetchHorarioId() {
      if (this.$route.params.action == "new") {
        this.createOn();
      } else {
        this.$store
          .dispatch("asistencias/fetchHorarioId", { id: this.$route.params.id })
          .then((res) => {
            let item = res[0];
            this.row = item;
            this.rows = item;
            this.commits = this.CommitsJSON.commits;
          })
          .catch((error) => {
            console.error(error);
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
      formData.append("hora_entrada", this.row.hora_entrada + ':00');
      formData.append("hora_salida", this.row.hora_salida + ':00');
      formData.append("tipo", this.row.tipo);
      formData.append("state", "validado");
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", userId);
      this.postHorario(formData)
        .then((response) => {
          this.commits = response.r_object.commits;
          this.$router.push({
            name: "horarios_detalle",
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
      formData.append("hora_entrada", this.row.hora_entrada + ':00');
      formData.append("hora_salida", this.row.hora_salida + ':00');
      formData.append("tipo", this.row.tipo);
      formData.append("state", "validado");
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", userId);

      this.putHorario(formData)
        .then((response) => {
          this.edit = true;
          this.saveput = true;
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
    deleteUser() {
      let formData = new FormData();
      let userId = sessionStorage.getItem("userId");
      formData.append("id", this.rows.id);
      formData.append("user_id", userId);
      this.deleteUsuario(formData)
        .then(() => {
          this.rowspre = this.rows;
          this.$router.push({
            name: "/horarios",
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
        horario_entrada: "",
        horario_salida: "",
        tipo: "",
        state: "validado",
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
          name: "horarios",
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
