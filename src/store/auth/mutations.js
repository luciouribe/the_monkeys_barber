export const setUserName = (state, user) => {
    state.userName = user;
}

export const setUserEmail = (state, email) => {
    state.userEmail = email;
}

export const setAccessToken = (state, accessToken) => {
    state.accessToken = accessToken;
};
export const logout = (state) => {
    state.userName = null;
    state.userEmail = null;
    state.accessToken = null;
}