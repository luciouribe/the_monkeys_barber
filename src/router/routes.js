import store from "../store/permisos";
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayoutAdmin.vue"),
    props: true,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/home.vue"),
      },
      {
        path: "pos_session",
        component: () => import("pages/pos/caja.vue"),
      },
      {
        path: "ordenes",
        component: () => import("pages/pos/ordenes.vue"),
      },
      {
        path: "configuracion",
        component: () => import("pages/pos/configuracion.vue"),
      },
      {
        path: "perfil",
        props: true,
        name: "perfil",
        component: () => import("pages/configuracion/Perfil.vue"),
      },
      {
        path: "pagos",
        component: () => import("pages/pagos.vue"),
      },
      {
        path: "recibos",
        component: () => import("pages/recibos.vue"),
      },
      {
        path: "asistencias",
        component: () => import("pages/asistencias/asistencias.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("layouts/MainLayoutAdmin.vue"),
    children: [
      {
        path: "productos",
        component: () => import("pages/pos/productos.vue"),
        meta: {
          permission: "pos.productos.show",
        },
      },

      {
        path: "productos_detalle/:id",
        name: "productos_detalle",
        component: () => import("pages/admin/productos/productos_detalle.vue"),
        props: true,
        meta: {
          permission: "inventario.producto.show",
        },
      },
      {
        path: "usuarios",
        component: () => import("pages/configuracion/Usuarios.vue"),
        meta: {
          permission: "configuracion.usuarios.show",
        },
      },
      {
        path: "usuarios_detalle/:id",
        props: true,
        name: "usuarios_detalle",
        component: () => import("pages/configuracion/UsuariosDetalle.vue"),
        meta: {
          permission: "configuracion.usuarios.show",
        },
      },
      {
        path: "empresa",
        name: "empresa",
        component: () => import("pages/configuracion/Empresa.vue"),
        meta: {
          permission: "configuracion.empresa.show",
        },
      },
      {
        path: "empresa_detalle/:id",
        props: true,
        name: "empresa_detalle",
        component: () => import("pages/configuracion/EmpresaDetalle.vue"),
        meta: {
          permission: "configuracion.empresa.show",
        },
      },
      {
        path: "clientes",
        component: () => import("pages/clientes.vue"),
        meta: {
          permission: "",
        },
      },

      {
        path: "movimientos",
        component: () => import("pages/asistencias/movimientos.vue"),
        meta: {
          permission: "contabilidad.movimientos.show",
        },
      },
      {
        path: "empleados",
        component: () => import("pages/asistencias/empleados.vue"),
        meta: {
          permission: "contabilidad.empleados.show",
        },
      },
      {
        path: "empleados_detalle/:id",
        name: "empleados_detalle",
        component: () => import("pages/asistencias/empleados_detalle.vue"),
        props: true,
        meta: {
          permission: "contabilidad.empleados.show",
        },
      },
      {
        path: "permisos",
        component: () => import("pages/admin/permisos/permisos.vue"),
        meta: {
          permission: "configuracion.permisos.show",
        },
      },
      {
        path: "import_data",
        name: "import_data",
        component: () => import("pages/admin/draggable/drag_and_drop.vue"),
        props: true,
        meta: {
          permission: "inventario.abastecimiento.show",
        },
      },
      {
        path: "inv_productos",
        component: () => import("pages/admin/productos/productos.vue"),
        meta: {
          permission: "inventario.producto.show",
        },
      },
      {
        path: "abastecimiento",
        component: () => import("pages/inventario/abastecimiento.vue"),
        meta: {
          permission: "inventario.abastecimiento.show",
        },
      },
      {
        path: "categoria_detalle/:id",
        name: "categoria_detalle",
        component: () => import("pages/admin/categorias/categoria_detalle.vue"),
        props: true,
        meta: {
          permission: "inventario.categoria.show",
        },
      },
      {
        path: "categoria_producto",
        component: () => import("pages/admin/categorias/categorias.vue"),
        meta: {
          permission: "inventario.categoria.show",
        },
      },
      {
        path: "historial_precio_detalle/:id",
        name: "historial_precio_detalle",
        component: () =>
          import("pages/admin/historialPrecio/historial_precio_detalle.vue"),
        props: true,
        meta: {
          permission: "inventario.historial_precio.show",
        },
      },
      {
        path: "historial_producto",
        component: () =>
          import("pages/admin/historialPrecio/historial_precio.vue"),
        meta: {
          permission: "inventario.historial_precio.show",
        },
      },
      {
        path: "uom_detalle/:id",
        name: "uom_detalle",
        component: () => import("pages/admin/uom/uom_detalle.vue"),
        props: true,
        meta: {
          permission: "inventario.uom.show",
        },
      },
      {
        path: "uom_producto",
        component: () => import("pages/admin/uom/uom.vue"),
        meta: {
          permission: "inventario.uom.show",
        },
      },
      {
        path: "horarios_detalle/:id",
        name: "horarios_detalle",
        component: () => import("pages/asistencias/horarios_detalle.vue"),
        props: true,
        meta: {
          permission: "contabilidad.horarios.show",
        },
      },
      {
        path: "horarios",
        component: () => import("pages/asistencias/horarios.vue"),
        meta: {
          permission: "contabilidad.horarios.show",
        },
      },
    ],
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      let permisos = JSON.parse(sessionStorage.getItem("permissions"));
      if (permisos) {
        if (permisos.indexOf(to.meta.permission) != -1) {
          next();
        } else {
          next("/unauthorized");
        }
      }
      next("/unauthorized");
    },
  },
  {
    path: "/pos",
    component: () => import("layouts/MainLayoutPos.vue"),
    children: [
      {
        path: "session",
        component: () => import("pages/pos/pos_session.vue"),
      },
      {
        path: "pago",
        component: () => import("pages/pos/pos_pago.vue"),
      },
      {
        path: "recibo",
        component: () => import("pages/pos/pos_recibo.vue"),
      },
      {
        path: "cierre",
        component: () => import("pages/pos/caja_cierre.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tiket/",
    component: () => import("pages/pos/ticket.vue"),
  },
  {
    path: "/login",
    component: () => import("layouts/Guest.vue"),
    children: [
      {
        path: "/login",
        component: () => import("pages/login.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem("X_Token")) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/unauthorized",
    component: () => import("pages/Unauthorized.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
