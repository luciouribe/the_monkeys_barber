import api from "../../config";

export const sendProductosRequest = async ({ commit }, data) => {
  return api
    .get("catalogos/medicamentoall", data)
    .then((response) => {
      if (response.data) {
        commit("setProductos", response.data);
      }
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchProductos = async ({ commit }, data) => {
  return api
    .get("producto/producto_all", data)
    .then((response) => {
      commit("setProductos", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchProductoId = async ({ commit }, data) => {
  const params = {
    id: data,
  };
  return api
    .get("producto/producto", params)
    .then((response) => {
      commit("setProductoId", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putRobject = async ({ commit }, data) => {
  return api
    .post("producto/putrobject_producto", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putRobject_Cat = async ({ commit }, data) => {
  return api
    .post("producto/putrobject_categoria", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putRobject_HP = async ({ commit }, data) => {
  return api
    .post("producto/putrobject_HPrecio", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchCategorias = async ({ commit }, data) => {
  return api
    .get("producto/categoria_all", data)
    .then((response) => {
      commit("setCategorias", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchCategoriaId = async ({ commit }, data) => {
  return api
    .get("producto/categoria", data)
    .then((response) => {
      commit("setCategoriaId", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchUOM = async ({ commit }, data) => {
  return api
    .get("producto/uom_all", data)
    .then((response) => {
      commit("setUOM", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchUOMId = async ({ commit }, data) => {
  const params = {
    id: data,
  };
  return api
    .get("producto/uom", params)
    .then((response) => {
      commit("setUOMId", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postUOM = async ({ commit }, data) => {
  return api
    .post("producto/post_uom", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putUOM = async ({ commit }, data) => {
  return api
    .post("producto/put_uom", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteUOM = async ({ commit }, data) => {
  return api
    .post("producto/delete_uom", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postProducto = async ({ commit }, data) => {
  return api
    .post("producto/post_producto", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putProducto = async ({ commit }, data) => {
  return api
    .post("producto/put_producto", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteProducto = async ({ commit }, data) => {
  return api
    .post("producto/delete_producto", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postCategoria = async ({ commit }, data) => {
  return api
    .post("producto/post_categoria", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putCategoria = async ({ commit }, data) => {
  return api
    .post("producto/put_categoria", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteCategoria = async ({ commit }, data) => {
  return api
    .post("producto/delete_categoria", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchHistorialPrecios = async ({ commit }, data) => {
  return api
    .get("producto/historial_precio_all", data)
    .then((response) => {
      commit("setHistorialPrecios", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchHistorialPrecioId = async ({ commit }, data) => {
  return api
    .get("producto/historial_precio", data)
    .then((response) => {
      commit("setHistorialPrecioId", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postHistorialPrecio = async ({ commit }, data) => {
  return api
    .post("producto/post_historial_precio", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putHistorialPrecio = async ({ commit }, data) => {
  return api
    .post("producto/put_historial_precio", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteHistorialPrecio = async ({ commit }, data) => {
  return api
    .post("producto/delete_historial_precio", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const cargaMasiva = async ({ commit }, data) => {
  return api
    .post("producto/post_producto_masivo", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
