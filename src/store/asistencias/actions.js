import api from "../../config";

export const sendAsistenciaRequest = async ({ commit }, data) => {
  return api
    .post("asistencias/post_asistencia_movimientos", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchEmpreadoSesion = async ({ commit }, data) => {
  return api
    .get("asistencias/empleado_sesion", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchEmpleados = async ({ commit }, data) => {
  return api
    .get("asistencias/asistencias_empleado_all", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const fetchEmpleadosId = async ({ commit }, data) => {
  return api
    .get("asistencias/asistencias_empleado", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchHorarios = async ({ commit }, data) => {
  return api
    .get("asistencias/asistencias_horario_all", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const fetchHorarioId = async ({ commit }, data) => {
  return api
    .get("asistencias/asistencias_horario", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postHorario = async ({ commit }, data) => {
  return api
    .post("asistencias/post_asistencias_horario", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const putHorario = async ({ commit }, data) => {
  return api
    .post("asistencias/put_asistencias_horario", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const putRobjectHorario = async ({ commit }, data) => {
  return api
    .post("asistencias/putrobject_asistencias_horario", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchMovimientos = async ({ commit }, data) => {
  return api
    .get("asistencias/asistencia_movimientos_all", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postEmpleado = async ({ commit }, data) => {
  return api
    .post("asistencias/post_asistencias_empleado", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const putEmpleado = async ({ commit }, data) => {
  return api
    .post("asistencias/put_asistencias_empleado", data)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

