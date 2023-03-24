<template>
<q-page padding>
    <div class="bg-visuel text-white rounded-borders">
        <q-toolbar inset>
            <q-breadcrumbs active-color="white" style="font-size: 15px">
                <q-breadcrumbs-el icon="inventory_2" to="/configuracion" label="Configuración" />
                <q-breadcrumbs-el :label="row.nombre" />
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
                                        <q-item-section no-caps @click="exportTable">Exportar</q-item-section>
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
                            <q-select filled :readonly="edit" v-model="row.diario_ventas_id" map-options emit-value class="q-my-md" :options="diarios" label="Diario de venta" />
                            <q-select filled :readonly="edit" v-model="row.diario_factura_id" map-options emit-value class="q-my-md" :options="diarios" label="Diario de facturacion" />
                            <div class="bg-grey-2 q-pa-sm rounded-borders">
                                <q-checkbox :disable="edit" name="efectivo" v-model="row.efectivo" true-value="true" false-value="false" label="Efectivo" />
                                <q-checkbox :disable="edit" name="tarjeta" v-model="row.tarjeta" true-value="true" false-value="false" label="Tarjeta" />
                                <q-checkbox :disable="edit" name="facturacion" v-model="row.facturacion" true-value="true" false-value="false" label="Facturacion" />
                                <q-checkbox :disable="edit" name="impresion_automatica" v-model="row.impresion_automatica" true-value="true" false-value="false" label="Impresion automatica" />
                                <q-checkbox :disable="edit" name="incluir_impuestos" v-model="row.incluir_impuestos" true-value="true" false-value="false" label="Incluir impuestos" />
                                <q-checkbox :disable="edit" name="salta_recibo" v-model="row.salta_recibo" true-value="true" false-value="false" label="Salta recibo" />
                                <q-checkbox :disable="edit" name="scanner" v-model="row.scanner" true-value="true" false-value="false" label="Scanner" />
                            </div>
                        </q-card-section>
                        <q-separator vertical />
                        <q-card-section class="col-6">
                            <q-input :readonly="edit" filled v-model="row.header_ticket" label="Cabecera de Ticket " type="textarea" lazy-rules /><br>
                            <q-input :readonly="edit" filled v-model="row.footer_ticket" label="Pie de Ticket " type="textarea" lazy-rules />

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
    ref
} from "vue";
import {
    useQuasar
} from 'quasar'
import Track from "../../utils/TrackVisibility";
import Export from "../../utils/ExportTable";
import InfoUser from "../../utils/UserData";
import CommitsComponent from "src/layouts/utils/CommitsComponent.vue";
import {
    Notify
} from "quasar";

export default {
    name: "configuracion",
    components: {
        CommitsComponent,
    },
    setup() {
        const $q = useQuasar()
    },
    data() {
        return {
            track_visibility: ["nombre"],
            rows: [],
            rowspre: [],
            row: [],
            edit: true,
            commits: [],
            commitspre: [],
            savepost: true,
            saveput: true,
            add_comment: "",
            icon_user: InfoUser.icon_user(),
            diarios: []
        };
    },
    mounted() {

    },
    created() {
        this.getDiarios(9)
        this.getConfigfPos()
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
        ...mapActions("pos", ["fetchPosConfiguracion", "PostPosConfiguracion", "PutPosConfiguracion", "GetDiarios"]),
        getDiarios() {
            this.GetDiarios().then((response) => {
                let dirs = []
                response.forEach(element => dirs.push({
                    label: element.nombre,
                    value: element.id
                }));
                this.diarios = dirs

            })
        },
        getConfigfPos() {
            this.fetchPosConfiguracion().then((response) => {
                if (response.length > 0) {
                    this.rows = response[0];
                    this.row = response[0];
                    this.commits = this.CommitsJSON.commits;
                } else {
                    this.createOn();
                }

            });
        },
        validate() {
            if (
                !this.row.nombre
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
            let formData = new FormData();
            formData.append("nombre", this.row.nombre);
            formData.append("diario_ventas_id", this.row.diario_ventas_id);
            formData.append("diario_factura_id", this.row.diario_factura_id);
            formData.append("efectivo", this.row.efectivo);
            formData.append("tarjeta", this.row.tarjeta);
            formData.append("facturacion", this.row.facturacion);
            formData.append("impresion_automatica", this.row.impresion_automatica);
            formData.append("salta_recibo", this.row.salta_recibo);
            formData.append("scanner", this.row.scanner);
            formData.append("ip_impresora", '');
            formData.append("header_ticket", this.row.header_ticket);
            formData.append("footer_ticket", this.row.footer_ticket);
            formData.append("active", this.row.active);
            formData.append("r_object", JSON.stringify(r_object));
            formData.append("user_id", user_id);
            this.PostPosConfiguracion(formData)
                .then((response) => {
                    this.commits = response.r_object.commits;
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
            let formData = new FormData();
            formData.append("id", this.row.id);
            formData.append("nombre", this.row.nombre);
            formData.append("diario_ventas_id", this.row.diario_ventas_id);
            formData.append("diario_factura_id", this.row.diario_factura_id);
            formData.append("efectivo", this.row.efectivo);
            formData.append("tarjeta", this.row.tarjeta);
            formData.append("facturacion", this.row.facturacion);
            formData.append("impresion_automatica", this.row.impresion_automatica);
            formData.append("salta_recibo", this.row.salta_recibo);
            formData.append("scanner", this.row.scanner);
            formData.append("ip_impresora", '');
            formData.append("header_ticket", this.row.header_ticket);
            formData.append("footer_ticket", this.row.footer_ticket);
            formData.append("active", this.row.active);
            formData.append("r_object", JSON.stringify(r_object));
            formData.append("user_id", user_id);
            this.PutPosConfiguracion(formData)
                .then((response) => {
                    // this.commits = response[0].r_object.commits;
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
        createOn() {
            this.savepost = false;
            this.rowspre = this.row;
            this.commitspre = this.commits;
            this.row = {
                id: "",
                nombre: "",
                diario_ventas_id: '',
                diario_factura_id: '',
                efectivo: ref('true'),
                tarjeta: ref('false'),
                facturacion: ref('false'),
                impresion_automatica: ref('true'),
                incluir_impuestos: ref('false'),
                salta_recibo: ref('false'),
                scanner: ref('true'),
                ip_impresora: '',
                header_ticket: '',
                footer_ticket: 'Gracias por su compra',
                active: 'true',
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
    },
};
</script>
