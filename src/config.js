import axios from "axios";
import { Loading, Notify, QSpinnerGears, QSpinnerTail } from "quasar";
// localStorage.setItem("url", "https://visuel.erp.credisexpres.com/api_v1/");
// localStorage.setItem("auth_url", "https://visuel.erp.credisexpres.com/api/");
// localStorage.setItem("images_url", "https://visuel.erp.credisexpres.com/");
localStorage.setItem("url", "http://127.0.0.1:8000/api_v1/");
localStorage.setItem("auth_url", "http://127.0.0.1:8000/api/");
localStorage.setItem("images_url", "http://127.0.0.1:8000");

var server = localStorage.getItem("url");
var auth_server = localStorage.getItem("auth_url");
import { useQuasar } from "quasar";

export default {
  login(url, params) {
    Loading.show({
      spinner: QSpinnerTail,
      spinnerColor: "blue-grey-8",
      message: "Iniciando sesión...",
    });
    return axios
      .post(auth_server + url, params, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        Loading.hide();
        Notify.create({
          position: "top-right",
          type: "positive",
          message: "Bienvenido " + response.data.user.name,
          color: "blue-grey-8",
        });
        return response;
      })
      .catch(function (error) {
        Loading.hide();
        if (error.message == "Network Error") {
          sessionStorage.setItem("login_status", error.message);
          Notify.create({
            type: "negative",
            position: "top-right",
            message:
              "No se pudo conectar con el servidor, revisa tu conexión a internet o intentalo de nuevo mas tarde",
          });
        } else if (error.response.status >= 400) {
          sessionStorage.setItem("login_status", error.message);
          if (error.response.status === 401) {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: "Usuario y/o contraseña incorrectos",
            });
          } else {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: "Ocurrió un error desconocido",
            });
          }
          console.log(error.message + " " + error.response.data.message + "");
        } else {
          sessionStorage.setItem("login_status", error.message);
          Notify.create({
            type: "negative",
            position: "top-right",
            message: "El servidor envió una respuesta inválida",
          });
        }
        return error;
      });
  },
  logout(url, X_Token) {
    Loading.show({
      spinner: QSpinnerTail,
      spinnerColor: "blue-grey-8",
      message: "Cerrando sesión...",
    });
    return axios
      .get(server + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + X_Token,
        },
      })
      .then((response) => {
        Loading.hide();
        Notify.create({
          position: "top-right",
          type: "positive",
          message: "Sesión terminada",
          color: "blue-grey-8",
        });
        return response;
      })
      .catch(function (error) {
        Loading.hide();
        if (error.response.status >= 400) {
          Notify.create({
            type: "negative",
            position: "top-right",
            message: error.message + " " + error.response.data.message + "",
          });
        } else if (error.message == "Network Error") {
          sessionStorage.setItem("login_status", error.message);
          Notify.create({
            type: "negative",
            position: "top-right",
            message:
              "No se pudo conectar con el servidor, revisa tu conexión a internet o intentalo de nuevo mas tarde",
          });
        } else {
          Notify.create({
            type: "negative",
            position: "top-right",
            message: "El servidor envió una respuesta inválida",
          });
        }
        return error;
      });
  },
  post(url, params) {
    Loading.show({
      spinner: QSpinnerTail,
      spinnerColor: "blue-grey-8",
      message: "Cargando...",
    });
    return axios
      .post(server + url, params, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("X_Token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Loading.hide();
        if (response.data == "incorrect password") {
          Notify.create({
            position: "top-right",
            textColor: "white",
            color: "blue-grey-8",
            type: "warning",
            message: "La contraseña ingresada no coincide con ningún registro",
          });
        } else {
          Notify.create({
            position: "top-right",
            type: "positive",
            message: "Elemento guardado. ",
            color: "blue-grey-8",
          });
          return response;
        }
      })
      .catch(function (error) {
        Loading.hide();
        if (error.message == "Network Error") {
          sessionStorage.setItem("status", error.message);
          Notify.create({
            type: "negative",
            position: "top-right",
            message:
              "No se pudo conectar con el servidor, revisa tu conexión a internet o intentalo de nuevo mas tarde",
          });
        } else if (error.response.status >= 400) {
          sessionStorage.setItem("status", error.message);
          if (error.response.status === 401) {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: "Campos faltantes",
            });
          } else {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: "Ocurrió un error desconocido",
            });
          }
          console.log(error.message + " " + error.response.data.message + "");
        } else {
          sessionStorage.setItem("status", error.message);
          Notify.create({
            type: "negative",
            position: "top-right",
            message: "El servidor envió una respuesta inválida",
          });
        }
        return error;
      });
  },
  get(url, params) {
    return axios
      .get(server + url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("X_Token")}`,
          "Content-Type": "application/json",
        },
        params: params,
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        if (error.message == "Network Error") {
          Notify.create({
            type: "negative",
            position: "top-right",
            message:
              "No se pudo conectar con el servidor, revisa tu conexión a internet o intentalo de nuevo mas tarde",
          });
        } else if (error.response.status >= 400) {
          if (error.response.status === 401) {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: error.response,
            });
          } else {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: "Ocurrió un error desconocido",
            });
          }
          console.log(error.message + " " + error.response.data.message + "");
        } else {
          Notify.create({
            type: "negative",
            position: "top-right",
            message: "El servidor envió una respuesta inválida",
          });
        }
        return error;
      });
  },

  postWthNot(url, params) {
    return axios
      .post(
        server + url,
          params,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("X_Token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        if (error.message == "Network Error") {
          Notify.create({
            type: "negative",
            position: "top-right",
            message:
              "No se pudo conectar con el servidor, revisa tu conexión a internet o intentalo de nuevo mas tarde",
          });
        } else if (error.response.status >= 400) {
          if (error.response.status === 401) {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: error.response,
            });
          } else {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: "Ocurrió un error desconocido",
            });
          }
          console.log(error.message + " " + error.response.data.message + "");
        } else {
          Notify.create({
            type: "negative",
            position: "top-right",
            message: "El servidor envió una respuesta inválida",
          });
        }
        return error;
      });
  },

  publicGet(url, params) {
    Loading.show({
      spinner: QSpinnerTail,
      spinnerColor: "blue-grey-8",
      message: "Obteniendo datos...",
    });
    return axios
      .get(auth_server + url, params, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        Loading.hide();
        return response;
      })
      .catch(function (error) {
        Loading.hide();
        if (error.message == "Network Error") {
          Notify.create({
            type: "negative",
            position: "top-right",
            message:
              "No se pudo conectar con el servidor, revisa tu conexión a internet o intentalo de nuevo mas tarde",
          });
        } else if (error.response.status >= 400) {
          if (error.response.status === 401) {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: error.response,
            });
          } else {
            Notify.create({
              type: "negative",
              position: "top-right",
              message: "Ocurrió un error desconocido",
            });
          }
          console.log(error.message + " " + error.response.data.message + "");
        } else {
          Notify.create({
            type: "negative",
            position: "top-right",
            message: "El servidor envió una respuesta inválida",
          });
        }
        return error;
      });
  },
};
