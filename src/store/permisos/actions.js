import api from "../../config"
var permissions = [];

    function createArray(element){
      permissions.push(element.name);
    }

export const getPermissions = ({ commit }, data) => {
  return api
    .get("configuracion/permisosall", data)
    .then((response) => {
      if (response) {
        commit("setPermissions");
      }
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getRoles = ({ commit }, data) => {
  return api
    .get("configuracion/rolesall", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getRole = ({ commit }, data) => {
  return api
    .get("configuracion/roleId", data)
    .then((response) => {
      if (response.data.permissions) {
        response.data.permissions.forEach(createArray);
        sessionStorage.setItem("permissions",JSON.stringify(permissions))
        commit("setRole",permissions)
      }
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const checkUserHasRole = ({ commit }, data) => {
  return api
    .postWthNot("configuracion/hasRole", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const assignRole = ({ commit }, data) => {
  return api
    .postWthNot("configuracion/assign_role", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const removeRole = ({ commit }, data) => {
  return api
    .postWthNot("configuracion/remove_role", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createRole = ({ commit }, data) => {
  return api
    .post("configuracion/post_role", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const editRole = ({ commit }, data) => {
  return api
    .post("configuracion/put_role", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
