<template>
  <q-page padding>
    <div class="bg-visuel text-white rounded-borders">
      <q-toolbar inset>
        <q-breadcrumbs active-color="white" style="font-size: 15px">
          <q-breadcrumbs-el
            icon="inventory_2"
            to="/admin/historial_producto"
            label="Historial de precio"
          />
          <q-breadcrumbs-el :label="row.nombre" />
        </q-breadcrumbs>
      </q-toolbar>
      <q-card flat bordered class="my-card bg-grey-1 text-black">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col q-mx-sm"></div>
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
                    <q-item clickable @click="deleteItem" v-show="setVisible('inventario.historial_precio.delete')">
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
                <q-select
                  filled
                  readonly
                  v-model="row.producto_id"
                  map-options
                  emit-value
                  class="q-mb-md"
                  :options="productos"
                  label="Producto"
                />
                <q-input
                  readonly
                  filled
                  v-model="row.date"
                  label="Fecha"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </q-card-section>
              <q-separator vertical />
              <q-card-section class="col-6">
                <q-input
                  type="number"
                  readonly
                  filled
                  v-model="row.precio_unitario"
                  label="Precio unitario"
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
  name: "historial_precio_detalle",
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
      track_visibility: ["producto_id", "date", "precio_unitario"],
      row: [],
      rows: [],
      commits: [],
      productos: [],
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
    this.getProductos();
  },

  methods: {
    ...mapActions("productos", [
      "fetchProductos",
      "postHistorialPrecio",
      "putHistorialPrecio",
      "deleteHistorialPrecio",
      "putRobject_HP",
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
          .dispatch("productos/fetchHistorialPrecioId", { id: this.$route.params.id })
          .then(() => {
            let item = JSON.stringify(
              this.$store.getters["productos/getterHistorialPrecioId"][0]
            );
            this.row = JSON.parse(item);
            this.rows = JSON.parse(item);
            this.commits = this.CommitsJSON.commits;
          });
      }
    },

    getProductos() {
      this.fetchProductos()
        .then(() => {
          let item = JSON.stringify(
            this.$store.getters["productos/getterProductos"]
          );
          let dat = JSON.parse(item);
          dat.forEach(this.setProductos);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setProductos(element) {
      this.productos.push({
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
      formData.append("producto_id", this.row.producto_id);
      formData.append("date", this.row.date);
      formData.append("precio_unitario", this.row.precio_unitario);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", user_id);
      this.postHistorialPrecio(formData).then((response) => {
        this.commits = response.r_object.commits;
        this.$router.push({
          name: "historial_precio_detalle",
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
      formData.append("producto_id", this.row.producto_id);
      formData.append("date", this.row.date);
      formData.append("precio_unitario", this.row.precio_unitario);
      formData.append("r_object", JSON.stringify(r_object));
      formData.append("user_id", user_id);
      this.putHistorialPrecio(formData).then((response) => {
        this.commits = response.r_object.commits;
        this.$router.push({
          name: "historial_precio_detalle",
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
      this.deleteHistorialPrecio(formData)
        .then(() => {
          this.rowspre = this.rows;
          this.$router.push({
            path: "/historial_producto",
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
          path: "/historial_producto",
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
      this.putRobject_HP(formData)
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
