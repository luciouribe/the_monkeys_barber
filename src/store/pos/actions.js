import api from "../../config";


export const fetchPosSession = async ({ commit }, data) => {
  return api
    .get("pos/sesion_validate", data)
    .then((response) => {
      commit("setPosSession", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchPosProductos = async ({ commit }, data) => {
  return api
    .get("producto/producto_all", data)
    .then((response) => {
      commit("setPosProductos", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const fetchPosProductosId = async ({ commit }, data) => {
  return api
    .get("producto/search_producto", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postNewSession = async ({ commit }, data) => {
  return api
    .post("pos/post_sesion", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postNewOrder = async ({ commit }, data) => {
  return api
    .post("pos/post_orden", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postCierreCaja = async ({ commit }, data) => {
  return api
    .post("pos/cierre_session", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const postCargaInventario = async ({ commit }, data) => {
  return api
    .post("inventario/cargainventario", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const postPagoProveedor = async ({ commit }, data) => {
  return api
    .post("pos/post_pagoproveedor", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};


export const fetchPosPagosSesion = async ({ commit }, data) => {
  const params = {
    pos_referencia: data,
  };
  return api
    .get("pos/pagoprovget", params)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchPosConfiguracion = async ({ commit }, data) => {
  const params = {
    pos_referencia: data,
  };
  return api
    .get("pos/configuracion_pos_all", params)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const PostPosConfiguracion = async ({ commit }, data) => {
  return api
    .post("pos/post_configuracion_pos", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const PutPosConfiguracion = async ({ commit }, data) => {
  return api
    .post("pos/put_configuracion_pos", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const GetDiarios = async ({ commit }, data) => {
  return api
    .get("contabilidad/diario_all", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};


