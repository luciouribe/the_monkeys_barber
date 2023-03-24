<template>
<q-page padding>
    <div class="q-pa-ml row">
        <div class="col-4">
        </div>
        <div class="col-4 text-center">
            <q-card class="my-card">
                <q-img src="../../assets/images/users.png" />
                <q-card-section>
                    <div class="text-center">
                        <div class="q-pr-md">
                            {{ fecha }}
                        </div>
                    </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <div class="text-subtitle1">
                        <q-chip size="18px" icon="schedule">
                            {{ hora }}
                        </q-chip>
                    </div>
                    <div class="text-caption text-grey">
                        Small plates, salads & sandwiches in an intimate setting.
                    </div>
                </q-card-section>
                <q-separator />
                <q-card-actions align="center">
                    <q-btn outline rounded color="primary" label="Registrar entrada" @click="saveNew" />
                </q-card-actions>
            </q-card>
        </div>
        <div class="col-4">
        </div>
    </div>
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
import Export from "../../utils/ExportTable";

export default {
    name: "asistencias",
    setup() {
        return {};
    },
    data() {
        return {
            filter: ref(""),
            rows: [],
            hora: "00:00:00",
            fecha: "",
            empleado_id:null,
        };
    },
    mounted() {
        this.mueveReloj()
        this.searchEmpleado()
    },
    computed: {

    },
    methods: {
        ...mapActions("asistencias", [
            "fetchEmpreadoSesion",
            "sendAsistenciaRequest",
        ]),
        searchEmpleado(barcode) {
            let user_id = sessionStorage.getItem("userId");
            let data = {
                usuario_id: user_id
            }
            this.fetchEmpreadoSesion(data)
                .then((response) => {
                    let data = response[0]
                    this.empleado_id=data.id
                })
                .catch((error) => {
                    console.error(error);
                });

        },
        saveNew() {
            let user_id = sessionStorage.getItem("userId");

            let formData = new FormData();
            formData.append("empleado_id", this.empleado_id);
            formData.append("r_object", "{}");
            formData.append("user_id", user_id);
            this.sendAsistenciaRequest(formData)
                .then((response) => {
                    let data = response
                    console.log(data)
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        mueveReloj() {
            setInterval(() => {
                var momentoActual = new Date()
                var horaActual = momentoActual.toLocaleTimeString()
                this.hora = horaActual
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                var fechaActual = momentoActual.toLocaleDateString('es-US', options)
                this.fecha = fechaActual
            }, (1000));
        },
        exportTable() {
            Export.exportTable(this.columns, this.rows);
        },
    },
};
</script>
