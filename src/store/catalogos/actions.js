import api from "../../config";
////////////////////////////////////////
export const fetchProductos = async ({ commit }, data) => {
  return api
    .get("producto/producto_all", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const fetchOrdenes = async ({ commit }, data) => {
  return api
    .get("pos/ordenes", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const fetchProveedores = async ({ commit }, data) => {
  return api
    .get("contabilidad/proveedor_all", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchOrdenesFilter = async ({ commit }, data) => {
  return api
    .get("pos/ordenesfilter", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};