import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

// import module store
import authModule from "./auth";
import UserInfo from "./modules/userInfomation.module";
import Shopping from "./modules/shopping.module";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    user_info: null,
  },
  mutations: {
    USER_INFO(state, data) {
      state.user_info = data;
    },
  },
  actions: {
    async setUserInfo({ commit }) {
      commit("USER_INFO", "test");
    },
  },
  modules: {
    auth: authModule,
    UserInfo,
    Shopping,
  },
});
