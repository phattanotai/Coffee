export default {
  loginStart: (state) => {
    state.loggingIn = true;
  },
  loginStop: (state) => {
    state.loggingIn = false;
  },
  setUserData: (state, data) => {
    state.userData = data;
  },
  updateAccessToken: (state, accessToken) => {
    state.accessToken = accessToken;
  },
  logout: (state) => {
    state.accessToken = null;
  },
};
