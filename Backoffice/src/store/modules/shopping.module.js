import notifyService from "../../service/notifyService";

const state = {
  orders: [],
  table: 0,
};

const getters = {
  getOrders(state) {
    return state.orders;
  },
  getSumOrder(state) {
    return state.orders.length;
  },
};

const actions = {
  async addOrder({ commit }, data) {
    try {
      commit("ADD_ORDER", data);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  removeOrder({ commit }, index) {
    try {
      commit("REMOVE_ORDER", index);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  async fetchUserInfo({ commit }, params) {
    try {
      const dataRes = await userInfoService
        .getUserInfo(params)
        .catch((error) => {
          throw error;
        });
      if (dataRes.data.length) {
        commit("SET_USERINFO", dataRes);
      } else {
        commit("SET_USERINFO", []);
      }
    } catch (error) {
      notifyService.error(error.message);
    }
  },
};

const mutations = {
  ADD_ORDER(state, data) {
    state.orders.push(data);
  },
  REMOVE_ORDER(state, index) {
    state.orders.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
