import api from "../../config";
////////////////////Usuarios ////////////////////
export const fetchUsuarios = async ({ commit }, data) => {
  return api
    .get("configuracion/usuariosall", data)
    .then((response) => {
      if (response.data) {
        commit("setUsuarios", response.data);
      }
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchUsuarioId = async ({ commit }, data) => {
  const params = {
    id: data,
  };
  return api
    .get("userid", params)
    .then((response) => {
      commit("setUsuarioId", response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postUsuario = async ({ commit }, data) => {
  return api
    .post("configuracion/post_usuario", data)
    .then((response) => {
      commit("setUsuarios", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putUsuario = async ({ commit }, data) => {
  return api
    .post("configuracion/put_usuario", data)
    .then((response) => {
      commit("setUsuarios", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putRobjectUsuario = async ({ commit }, data) => {
  return api
    .post("configuracion/putrobject_usuario", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putProfile = async ({ commit }, data) => {
  return api
    .post("configuracion/put_profile", data)
    .then((response) => {
        commit("setUsuarioId", response.data);
        return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updatePassword = async ({ commit }, data) => {
  return api
    .post("configuracion/put_password", data)
    .then((response) => {
      if(response){
        commit("setUsuarioId", response.data);
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const resetPassword = async ({ commit }, data) => {
  return api
    .post("configuracion/reset_password", data)
    .then((response) => {
      if (response) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postUsuarioImage = async ({ commit }, data) => {
  return api
    .post("configuracion/post_usuario_image", data)
    .then((response) => {
      sessionStorage.setItem("userAvatar", response.data[0].image);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteUsuario = async ({ commit }, data) => {
  return api
    .post("configuracion/delete_usuario", data)
    .then((response) => {
      // commit("setUsuarios", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

////////////////////Empresa////////////////////
export const fetchEmpresas = async ({ commit }, data) => {
  return api
    .get("configuracion/empresaall", data)
    .then((response) => {
      if (response.data) {
        commit("setEmpresa", response.data);
      }
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchEmpresaId = async ({ commit }, data) => {
  const params = {
    id: data,
  };
  return api
    .get("configuracion/empresa", params)
    .then((response) => {
      commit("setEmpresaId", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchEmpresaActive = async ({ commit }, data) => {
  return api
    .get("configuracion/getempresa", data)
    .then((response) => {
      commit("setEmpresaId", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};



export const postEmpresa = async ({ commit }, data) => {
  return api
    .post("configuracion/post_empresa", data)
    .then((response) => {
      commit("setEmpresa", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putEmpresa = async ({ commit }, data) => {
  return api
    .post("configuracion/put_empresa", data)
    .then((response) => {
      commit("setEmpresa", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putRobject = async ({ commit }, data) => {
  return api
    .post("configuracion/putrobject", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteEmpresa = async ({ commit }, data) => {
  return api
    .post("configuracion/delete_empresa", data)
    .then((response) => {
      // commit("setUsuarios", response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
