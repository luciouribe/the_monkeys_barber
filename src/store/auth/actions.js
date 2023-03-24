import api from "../../config";

export const sendLoginRequest = ({ commit }, data) => {
    return api.login("auth/login", data)
        .then((response) => {
            if (response.data.access_token) {
                sessionStorage.setItem("userName", response.data.user.name);
                sessionStorage.setItem("userEmail", response.data.user.email);
                sessionStorage.setItem("userAvatar", response.data.user.image);
                sessionStorage.setItem("userId", response.data.user.id);
                sessionStorage.setItem("X_Token", response.data.access_token);
                sessionStorage.setItem("roles", JSON.stringify(response.data.roles));
                commit("setUserEmail", response.data.user.email);
                commit("setUserName", response.data.user.name);
                commit("setAccessToken", response.data.access_token);
            }
            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const sendLogoutRequest = ({ commit }, X_Token) => {
    return api.logout("auth/logout", X_Token)
        .then((response) => {
            if (response) {
                sessionStorage.clear()
                commit("logout");
            }
            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log(error);
        });
};
