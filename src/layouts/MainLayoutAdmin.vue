<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-visuel text-black q-px-lg">
        <img src="../assets/logo_barber-sn-fondo.svg" height="80" />
        <q-toolbar-title>
          <div
            @click="GoHome"
            clickable
            class="text-black q-pt-sm"
            :hidden="$q.screen.lt.sm"
          >
          
          </div>
          <img src="../assets/wendys_completo.svg" height="80" />
          <div
            @click="GoHome"
            clickable
            class="text-black q-pt-sm"
            :hidden="$q.screen.lt.sm"
          >
           
          </div>
        </q-toolbar-title>
        <div class="text-black">
          <q-chip size="18px">
            {{ fecha }}
          </q-chip>
          <q-chip size="18px" icon="schedule">
            {{ hora }}
          </q-chip>
          <q-btn-dropdown stretch flat icon="perm_identity" :label="username">
            <q-list>
              <q-item-label header>Configuración</q-item-label>
              <q-item clickable v-close-popup tabindex="0" to="/perfil">
                <q-item-section avatar>
                  <q-avatar color="secondary" text-color="black">
                    <img :src="icon_user" height="35" width="65" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ username }}</q-item-label>
                  <q-item-label caption>Perfil</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset spaced />
              <q-item v-close-popup tabindex="0">
                <div align="center">
                  <q-btn
                    flat
                    icon="logout"
                    style="color: #39b54a"
                    label="Salir"
                    @click="logout()"
                  />
                </div>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
      <q-tabs
        v-model="tab"
        align="left"
        dense
        no-caps
        inline-label
        class="bg-visuel text-black shadow-2"
      >
        <q-tab name="pos" icon="point_of_sale" label="POS">
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable to="/pos_session">
                <q-item-section>Caja</q-item-section>
              </q-item>
              <q-item clickable to="/ordenes">
                <q-item-section>Órdenes</q-item-section>
              </q-item>
              <q-item clickable to="/">
                <q-item-section>Bitácora</q-item-section>
              </q-item>
              <q-item clickable to="/configuracion">
                <q-item-section>Configuración </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-tab>
        <!-- <q-tab name="asistencias" icon="date_range" label="Asistencias">
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable to="/asistencias">
                <q-item-section>Entrada/Salida</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-tab> -->
        <q-tab
          name="inventario"
          icon="pending_actions"
          label="Inventario"
          v-show="setVisibleMenu(inventarioAr)"
        >
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <!-- <q-item clickable to="/inventario">
                <q-item-section>Inventario</q-item-section>
              </q-item> -->
              <q-item
                clickable
                to="/admin/inv_productos"
                v-show="setVisible('inventario.producto.show')"
              >
                <q-item-section>Productos</q-item-section>
              </q-item>
              <!-- <q-item clickable to="/admin/reporte_inventario">
                <q-item-section>Reportes</q-item-section>
              </q-item> -->
              <q-separator />
              <!-- <q-item-label header>Configuración</q-item-label> -->
              <q-item
                clickable
                to="/admin/abastecimiento"
                v-show="setVisible('inventario.abastecimiento.show')"
              >
                <q-item-section>Abastecimiento</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/admin/categoria_producto"
                v-show="setVisible('inventario.categoria.show')"
              >
                <q-item-section>Categoría de productos</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/admin/historial_producto"
                v-show="setVisible('inventario.historial_precio.show')"
              >
                <q-item-section>Historial de precios </q-item-section>
              </q-item>
              <q-item
                clickable
                to="/admin/uom_producto"
                v-show="setVisible('inventario.uom.show')"
              >
                <q-item-section>Unidad de medida</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-tab>
        <q-tab
          name="general"
          icon="view_agenda"
          label="Asistencias"
          v-show="setVisibleMenu(generalAr)"
        >
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable to="/asistencias">
                <q-item-section>Entrada/Salida</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/admin/empleados"
                v-show="setVisible('contabilidad.empleados.show')"
              >
                <q-item-section>Empleados</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/admin/movimientos"
                v-show="setVisible('contabilidad.movimientos.show')"
              >
                <q-item-section>Movimientos</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/admin/horarios"
                v-show="setVisible('contabilidad.horarios.show')"
              >
                <q-item-section>Horarios</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-tab>
        <q-tab
          name="configuracion"
          icon="settings"
          label="Configuración"
          v-show="setVisibleMenu(configuracionAr)"
        >
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                to="/admin/usuarios"
                v-show="setVisible('configuracion.usuarios.show')"
              >
                <q-item-section>Usuarios</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/admin/permisos"
                v-show="setVisible('configuracion.permisos.show')"
              >
                <q-item-section>Permisos</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/admin/empresa"
                v-show="setVisible('configuracion.empresa.show')"
              >
                <q-item-section>Empresa</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      align="center"
      reveal
      elevated
      class="bg-visuel text-black shadow-2"
      small
    >
      <div class="text">ⓒ Visuel Code</div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapActions } from "vuex";
import InfoUser from "../utils/UserData";
export default {
  name: "MainLayoutAdmin",
  data() {
    return {
      inventarioAr: [
        "inventario.producto.show",
        "inventario.abastecimiento.show",
        "inventario.categoria.show",
        "inventario.historial_precio.show",
        "inventario.uom.show",
      ],
      generalAr: [
        "contabilidad.empleados.show",
        "contabilidad.movimientos.show",
        "contabilidad.horarios.show",
      ],
      configuracionAr: [
        "configuracion.usuarios.show",
        "configuracion.permisos.show",
      ],
      hora: "00:00:00",
      fecha: "",
      username: "",
      route: "",
      text: "",
      tab: ref("pos"),
      empresa: [],
      logoIMG: "",
      icon_user: InfoUser.icon_user(),
    };
  },
  created() {
    // if (!sessionStorage.getItem("permissions")) {
    //     this.$router.go();
    //   }
  },
  mounted() {
    this.mueveReloj();
    this.getEmpresa();
    this.empresa = JSON.parse(sessionStorage.getItem("empresa"));
    this.setUser();
    if (this.empresa) {
      var urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
      this.logoIMG = urlsplit + "/images/empresa/" + this.empresa.logo;
    } else {
      this.empresa = {
        nombre: "POS",
        slogan: "",
        logo: "",
      };
      var urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
      this.logoIMG = urlsplit + "/images/empresa/icon.png";
    }
    this.setVisible();
  },
  methods: {
    ...mapActions("auth", ["sendLogoutRequest"]),
    ...mapActions("configuracion", ["fetchEmpresaActive"]),
    mueveReloj() {
      setInterval(() => {
        var momentoActual = new Date();
        var horaActual = momentoActual.toLocaleTimeString();
        this.hora = horaActual;
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        var fechaActual = momentoActual.toLocaleDateString("es-US", options);
        this.fecha = fechaActual;
      }, 1000);
    },
    setUser() {
      let userID = sessionStorage.getItem("userId");
      this.$store.dispatch("configuracion/fetchUsuarioId", userID).then(() => {
        let item = JSON.stringify(
          this.$store.getters["configuracion/getterUsuarioId"]
        );
        let user = JSON.parse(item);
        this.username = user.name;
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userEmail", user.email);
      });
    },
    validateSession() {
      if (!sessionStorage.getItem("X_Token")) {
        this.$store.commit("auth/logout");
        this.$router.push({
          path: "/login",
        });
      }
    },
    logout() {
      let X_Token = sessionStorage.getItem("X_Token");
      this.sendLogoutRequest(X_Token).then(() => {
        this.$router.push({
          path: "/login",
        });
      });
    },
    GoHome() {
      this.$router.push({
        path: "/",
      });
    },
    getEmpresa() {
      this.$store
        .dispatch("configuracion/fetchEmpresaActive", this.$route.params.id)
        .then((response) => {
          let empresa_row = response[0];
          const empresa = {
            nombre: empresa_row.nombre,
            slogan: empresa_row.slogan,
            logo: empresa_row.logo,
            email: empresa_row.email,
          };
          sessionStorage.setItem("empresa", JSON.stringify(empresa));
        });
    },

    setVisible(permiso) {
      let permisos = JSON.parse(sessionStorage.getItem("permissions"));
      if (permisos) {
        let visible = permisos.indexOf(permiso) != -1 ? true : false;
        return visible;
      }else {
        return false;
      }
    },

    setVisibleMenu(permiso) {
      let permisos = JSON.parse(sessionStorage.getItem("permissions"));
      let index = 0;
      if (permisos) {
        permiso.forEach((element) => {
          if (permisos.indexOf(element) != -1) index += 1;
        });
      }
      let visible = index > 0 ? true : false;
      return visible;
    },
  },
};
</script>

<style>
.text-visuel {
  color: #030303 !important;
}

.bg-visuel {
  background: #f7f4f4 !important;
}

.butt-visuel {
  background: #000000 !important;
}
</style>
