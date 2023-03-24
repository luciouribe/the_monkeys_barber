<template>
<q-page padding>
    <div class="bg-visuel text-white rounded-borders">
        <q-toolbar inset>
            <q-breadcrumbs active-color="white" style="font-size: 15px">
                <q-breadcrumbs-el icon="inventory_2" to="/admin/inv_productos" label="Productos" />
                <q-breadcrumbs-el :label="row.nombre" />
            </q-breadcrumbs>
        </q-toolbar>
        <q-card flat bordered class="my-card bg-grey-1 text-black">
            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col">
                        <q-btn outline rounded :disable="edit" color="primary" label="Agregar imágen" icon="camera" @click="$refs.photo.click()" />
                        <q-btn outline rounded color="primary" class="q-my-sm" label="Ver imágen" icon="camera" @click="imgDialog = true" />
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
                                        <q-item-section no-caps @click="exportTable">Exportar</q-item-section>
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
            <q-card-section>
                <q-form class="q-gutter-md">
                    <q-card-section horizontal>
                        <q-card-section class="col-6">
                            <q-input :readonly="edit" filled v-model="row.nombre" label="Nombre *" lazy-rules :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" />
                            <q-input :readonly="edit" filled v-model="row.precio" label="Precio *" type="number" prefix="$" lazy-rules :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" />
                            <q-input :readonly="edit" filled v-model="row.proveedor_ref" label="Proveedor" class="q-my-md" />
                            <q-input :readonly="edit" filled v-model="row.descripcion" label="Descripcion" class="q-my-md" />
                            <q-input :readonly="edit" filled v-model="row.descripcion_compra" label="Descripcion de compra" class="q-my-md" />
                            <q-input :readonly="edit" filled v-model="row.descripcion_venta" label="Descripcion de venta" class="q-my-md" />
                        </q-card-section>
                        <q-separator vertical />
                        <q-card-section class="col-6">
                            <q-input :readonly="edit" filled class="text-uppercase" v-model="row.barcode" label="Codigo de barras *" lazy-rules :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Please type something',
                  ]" />
                            <q-select filled :readonly="edit" v-model="row.categoria_id" map-options emit-value class="q-my-md" :options="categorias" label="Categoría" />
                            <q-select filled :readonly="edit" v-model="row.uom_id" map-options emit-value class="q-my-md" :options="uom" label="Unidad de medida" />
                            <div class="bg-grey-2 q-pa-sm rounded-borders">
                                <q-checkbox name="venta_ok" v-model="row.venta_ok" true-value="true" false-value="false" label="Venta" />

                                <q-checkbox name="compra_ok" v-model="row.compra_ok" true-value="true" false-value="false" label="Compra" />
                            </div>
                        </q-card-section>
                    </q-card-section>
                </q-form>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="q-pa-md q-gutter-sm text-h6">
                            <q-btn @click="save" v-show="!saveput" label="Guardar cambios" color="blue" icon="save" size="sm">
                            </q-btn>
                            <q-btn @click="validate" v-show="!savepost" label="Guardar" color="blue" icon="save" size="sm">
                            </q-btn>
                            <q-btn @click="createOf" v-show="!edit" label="Descartar" color="red-9" icon="delete" size="sm">
                            </q-btn>
                            <q-btn @click="updateOn" v-show="edit" label="Editar" color="visuel" icon="mode_edit" size="sm">
                            </q-btn>
                        </div>
                    </div>
                    <div class="col">
                        <div class="text-h6" align="right">
                            <q-btn size="sm" v-show="edit" @click="createOn" label="Crear" color="secondary" icon="add">
                            </q-btn>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
    <input hidden type="file" accept="image/*" ref="photo" @input="takePicture" />
    <q-dialog v-model="imgDialog" persistent>
        <q-layout view="hHh Lpr fFf" container class="bg-white" style="max-height: 650px">
            <q-header class="bg-visuel">
                <q-toolbar>
                    <q-toolbar-title>Imágen del producto</q-toolbar-title>
                    <q-btn flat v-close-popup round dense icon="close" />
                </q-toolbar>
            </q-header>
            <q-page-container>
                <q-page padding>
                    <p>
                        <q-list bordered class="rounded-borders" style="max-width: 600px">
                            <q-item>
                                <q-item-section top>
                                    <q-img v-if="imgDialog" :src="photo" />
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
    <br />
    <div class="row items-center no-wrap">
        <div class="col-6">
            <q-input dense v-on:keyup.enter="AddComment" v-model="add_comment" label="Agrega un comentario aquí...">
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
import {
    mapState,
    mapGetters,
    mapActions
} from "vuex";
import {
    Notify
} from "quasar";
import {
    ref
} from "vue";
import Track from "../../../utils/TrackVisibility";
import Export from "../../../utils/ExportTable";
import InfoUser from "../../../utils/UserData";
import CommitsComponent from "src/layouts/utils/CommitsComponent.vue";

export default {
    name: "productos",
    components: {
        CommitsComponent,
    },
    data() {
        return {
            columns: [{
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
                {
                    name: "precio",
                    label: "Precio",
                    field: "precio",
                    sortable: true
                },
                {
                    name: "descripcion",
                    label: "Descripcion",
                    field: "descripcion"
                },
            ],
            track_visibility: ["nombre", "barcode", "tipo", "uom", "precio"],
            categorias: [],
            uom: [],
            commits: [],
            commitspre: [],
            rowspre: [],
            imgDialog: false,
            savepost: true,
            saveput: true,
            add_comment: "",
            icon_user: InfoUser.icon_user(),
            rows: [],
            rowspre: [],
            row: [],
            photo: [],
            file: [],
            tab: null,
            model: ref("one"),
            stateDocument: 1,
            edit: true,
        };
    },
    mounted() {
        this.getCategorias();
        this, this.getUOM();
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
        Documento: function () {
            return this.rows;
        },
        CommitsJSON: function () {
            let ro = this.Documento;
            return ro.r_object;
        },
    },
    methods: {
        ...mapActions("productos", [
            "fetchProductoId",
            "putRobject",
            "fetchCategorias",
            "fetchUOM",
            "postProducto",
            "putProducto",
            "deleteProducto",
        ]),
        fetchProductoId() {
            if (this.$route.params.action == "new") {
                this.createOn();
            } else {
                this.$store
                    .dispatch("productos/fetchProductoId", this.$route.params.id)
                    .then(() => {
                        let item = JSON.stringify(
                            this.$store.getters["productos/getterProductoId"][0]
                        );
                        this.row = JSON.parse(item);
                        this.rows = JSON.parse(item);
                        this.commits = this.CommitsJSON.commits;
                        let urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
                        this.photo = urlsplit + this.row.image;
                    });
            }
        },

        getCategorias() {
            this.fetchCategorias()
                .then((resp) => {
                    resp.forEach(this.setCategorias);
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

        getUOM() {
            this.fetchUOM()
                .then((resp) => {
                    resp.forEach(this.setUOM);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        setUOM(element) {
            this.uom.push({
                value: element.id,
                label: element.nombre,
            });
        },

        takePicture() {
            this.photo = [];
            const input = this.$refs.photo;
            const files = input.files;
            if (files && files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.photo = e.target.result;
                    this.imgDialog = true;
                    this.file = files[0];
                };
                reader.readAsDataURL(files[0]);
            }
        },

        validate() {
            if (
                !this.row.nombre ||
                !this.row.precio ||
                !this.row.proveedor_ref ||
                !this.row.barcode ||
                !this.row.categoria_id ||
                !this.row.uom_id ||
                !this.row.venta_ok ||
                !this.row.compra_ok ||
                !this.file
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
            let user_id = sessionStorage.getItem("userId");
            let r_object = Track.TrackVisibility(
                "post",
                this.track_visibility,
                this.row
            );
            let descripcion = !this.row.descripcion ? " " : this.row.descripcion;
            let descripcion_compra = !this.row.descripcion_compra ?
                " " :
                this.row.descripcion_compra;
            let descripcion_venta = !this.row.descripcion_venta ?
                " " :
                this.row.descripcion_venta;

            let formData = new FormData();
            formData.append("nombre", this.row.nombre);
            formData.append("default_codigo", 0);
            formData.append("codigo", 0);
            formData.append("proveedor_ref", this.row.proveedor_ref);
            formData.append("active", true);
            formData.append("barcode", this.row.barcode.toUpperCase());
            formData.append("producto", this.file);
            formData.append("precio", this.row.precio);
            formData.append("precio_extra", 0);
            formData.append("st_precio", 0);
            formData.append("precio_estandar", 0);
            formData.append("descripcion", descripcion);
            formData.append("descripcion_compra", descripcion_compra);
            formData.append("descripcion_venta", descripcion_venta);
            formData.append("categoria_id", this.row.categoria_id);
            formData.append("tipo", 'almacenable');
            formData.append("volumen", 0);
            formData.append("peso", 0);
            formData.append("garantia", 0);
            formData.append("venta_ok", this.row.venta_ok);
            formData.append("compra_ok", this.row.compra_ok);
            formData.append("uom_id", this.row.uom_id);
            formData.append("r_object", JSON.stringify(r_object));
            formData.append("user_id", user_id);
            this.postProducto(formData)
                .then((response) => {
                    this.commits = response.r_object.commits;
                    this.$router.push({
                        name: "productos_detalle",
                        params: {
                            id: response.id,
                        },
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
                    console.error(error);
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
            let descripcion = !this.row.descripcion ? " " : this.row.descripcion;
            let descripcion_compra = !this.row.descripcion_compra ?
                " " :
                this.row.descripcion_compra;
            let descripcion_venta = !this.row.descripcion_venta ?
                " " :
                this.row.descripcion_venta;
            let formData = new FormData();
            formData.append("id", this.row.id);
            formData.append("nombre", this.row.nombre);
            formData.append("imgBefore", this.row.image);
            formData.append("producto", this.file);
            formData.append("default_codigo", 0);
            formData.append("codigo", 0);
            formData.append("proveedor_ref", this.row.proveedor_ref);
            formData.append("active", true);
            formData.append("barcode", this.row.barcode.toUpperCase());
            formData.append("precio", this.row.precio);
            formData.append("precio_extra", 0);
            formData.append("st_precio", 0);
            formData.append("precio_estandar", 0);
            formData.append("descripcion", descripcion);
            formData.append("descripcion_compra", descripcion_compra);
            formData.append("descripcion_venta", descripcion_venta);
            formData.append("categoria_id", this.row.categoria_id);
            formData.append("tipo", 'almacenable');
            formData.append("volumen", 0);
            formData.append("peso", 0);
            formData.append("garantia", 0);
            formData.append("venta_ok", this.row.venta_ok);
            formData.append("compra_ok", this.row.compra_ok);
            formData.append("uom_id", this.row.uom_id);
            formData.append("r_object", JSON.stringify(r_object));
            formData.append("user_id", user_id);
            this.putProducto(formData)
                .then((response) => {
                    this.commits = response[0].r_object.commits;
                    this.edit = true;
                    this.saveput = true;
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
            let user_id = sessionStorage.getItem("userId");
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
            this.rowspre = this.row;
            this.commitspre = this.commits;
            this.row = {
                id: "",
                nombre: "",
                barcode: "",
                tipo: "",
                uom: "",
                descripcion: "-",
                descripcion: "-",
                descripcion_compra: "-",
                descripcion_venta: "-",
                proveedor_ref: "-",
                venta_ok: ref('true'),
                compra_ok: ref('true'),
                r_object: "",
            }
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
                    path: "/inv_productos",
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
