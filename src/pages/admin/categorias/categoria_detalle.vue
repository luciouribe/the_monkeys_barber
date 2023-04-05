<template>
  <q-page padding>
    <div class="bg-visuel text-black rounded-borders">
      <q-toolbar inset>
        <q-breadcrumbs active-color="black" style="font-size: 15px">
          <q-breadcrumbs-el
            icon="inventory_2"
            to="/admin/categoria_producto"
            label="Categoria"
          />
          <q-breadcrumbs-el :label="row.nombre" />
        </q-breadcrumbs>
      </q-toolbar>
      <q-card flat bordered class="my-card bg-grey-1 text-black">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col q-mx-sm"></div>
            <div class="col-3">
              <q-btn-toggle
                v-model="row.tipo"
                spread
                :readonly="edit"
                size="sm"
                class="q-my-sm"
                no-caps
                rounded
                toggle-color="blue-grey-5"
                color="white"
                text-color="visuel"
                :options="[
                  { label: 'Normal', value: 'normal' },
                  { label: 'Ver', value: 'ver' },
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
                    <q-item clickable @click="deleteItem" v-show="setVisible('pos.categorias.delete')">
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
                  v-model="row.nombre"
                  label="Nombre *"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col-6">
                <q-select
                  filled
                  :readonly="edit"
                  v-model="row.cat_padre_id"
                  map-options
                  emit-value
                  :options="categorias"
                  label="Categoría Padre"
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
                  v-show="!saveput && setVisible('pos.categorias.edit')"
                  label="Guardar cambios"
                  color="blue"
                  icon="save"
                  size="sm"
                >
                </q-btn>
                <q-btn
                  v-show="!savepost && setVisible('pos.categorias.create')"
                  @click="saveNew"
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
                  v-show="edit && setVisible('pos.categorias.edit')"
                  @click="updateOn"
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
                  v-show="edit && setVisible('pos.categorias.create')"
                  size="sm"
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
import { mapActions } from "vuex";
import { Notify } from "quasar";
import { ref } from "vue";
import Track from "../../../utils/TrackVisibility";
import Export from "../../../utils/ExportTable";
import InfoUser from "../../../utils/UserData";
import CommitsComponent from "src/layouts/utils/CommitsComponent.vue";

export default {
  name: "categorias",
  components: {
    CommitsComponent,
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
  data() {
    return {
      track_visibility: ["nombre", "tipo", "cat_padre_id"],
      row: [],
      rows: [],
      commits: [],
      categorias: [],
      edit: true,
      savepost: true,
      saveput: true,
      rowspre: [],
      commitspre: [],
      rowspre: [],
      add_comment: [],
      icon_user: InfoUser.icon_user(),
    };
  },

  created() {
    this.fetchCategoriaId();
    this.getCategorias();
  },

  methods: {
    ...mapActions("productos", [
      "fetchCategorias",
      "postCategoria",
      "putCategoria",
      "deleteCategoria",
      "putRobject_Cat",
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
    fetchCategoriaId() {
      if (this.$route.params.action == "new") {
        this.createOn();
      } else {
        this.$store
          .dispatch("productos/fetchCategoriaId", { id: this.$route.params.id })
          .then(() => {
            let item = JSON.stringify(
              this.$store.getters["productos/getterCategoriaId"][0]
            );
            this.row = JSON.parse(item);
            this.rows = JSON.parse(item);
            this.commits = this.CommitsJSON.commits;
          });
      }
    },

    getCategorias() {
      this.fetchCategorias()
        .then(() => {
          let item = JSON.stringify(
            this.$store.getters["productos/getterCategorias"]
          );
          let data = JSON.parse(item);
          data.forEach(this.setCategorias);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setCategorias(element) {
      this.categorias.push({
        value: element.id,
        label: element.nombre,
      });
    },

    saveNew() {
      let user_id = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
        "post",
        this.track_visibility,
        this.row
      );
      let formData = new FormData();
      formData.append("nombre", this.row.nombre);
      formData.append("tipo", this.row.tipo);
      formData.append("cat_padre_id", this.row.cat_padre_id);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", user_id);
      this.postCategoria(formData).then((response) => {
        this.commits = response.r_object.commits;
        this.$router.push({
          name: "categoria_detalle",
          params: {
            id: response.id,
          },
        });
        this.edit = true;
        this.savepost = true;
        this.saveput = true;
      });
    },

    save() {
      let user_id = sessionStorage.getItem("userId");
      let r_object = Track.TrackVisibility(
        "put",
        this.track_visibility,
        this.rows,
        this.row
      );
      let formData = new FormData();
      formData.append("id", this.row.id);
      formData.append("nombre", this.row.nombre);
      formData.append("tipo", this.row.tipo);
      formData.append("cat_padre_id", this.row.cat_padre_id);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", user_id);
      this.putCategoria(formData).then((response) => {
        this.commits = response.r_object.commits;
        this.$router.push({
          name: "categoria_detalle",
          params: {
            id: response.id,
          },
        });
        this.edit = true;
        this.savepost = true;
        this.saveput = true;
      });
    },

    deleteItem() {
      let formData = new FormData();
      let user_id = sessionStorage.getItem("userId");
      formData.append("id", this.row.id);
      formData.append("user_id", user_id);
      this.deleteCategoria(formData)
        .then(() => {
          this.rowspre = this.rows;
          this.$router.push({
            path: "/categoria_producto",
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
      this.rowspre = this.row;
      this.commitspre = this.commits;
      this.row = {
        id: "",
        nombre: "",
        tipo: "",
        cat_padre_id: "",
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
          path: "/categoria_producto",
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
        id: this.rows.id,
      };
      this.putRobject_Cat(formData)
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
