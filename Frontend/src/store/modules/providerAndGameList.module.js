import gameProviderService from "@/service/providerAndGameListService";

const state = {
  gameListAndProvider: [],
  meta: {},
};

const getters = {
  // Get All
  getGameProviderList(state) {
    return state.gameListAndProvider;
  },
  // Get By ID
  getGameProviderListByID(state) {
    return state.gameListAndProvider;
  },
};

const actions = {
  async fetchAllGameProviderList({ commit }, page) {
    try {
      const response = await gameProviderService.getAllGameProviderList(
        "provider-game-lists"
      );
      commit("SET_META", response.meta);
      commit("SET_GAMEPROVIDERLIST", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchGameProviderListByID({ commit }, id) {
    try {
      const response = await gameProviderService.getAllGameProviderList(
        `provider-game-lists/${id}`
      );
      // commit("SET_META", response.meta);
      commit("SET_GAMEPROVIDERLIST", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async createGameProviderList({ commit }, data) {
    try {
      const response = await gameProviderService.createGameProviderList(
        "provider-game-lists",
        data
      );
      commit("UPDATE_GAMEPROVIDERLIST", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteGameProviderList({ commit }, id) {
    try {
      const response = await gameProviderService.deleteGameProviderList(
        `provider-game-lists/${id}`
      );
      commit("DELETE_GAMEPROVIDERLIST", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async updateGameProviderList({ commit }, data) {
    try {
      const response = await gameProviderService.updateGameProviderList(
        `provider-game-lists/${data.id}`,
        { data: data.data }
      );
      commit("UPDATE_NEW_GAMEPROVIDERLIST", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  SET_GAMEPROVIDERLIST(state, data) {
    state.gameListAndProvider = data;
  },
  UPDATE_GAMEPROVIDERLIST(state, data) {
    state.gameListAndProvider = [{ ...state.gameListAndProvider, data }];
  },
  DELETE_GAMEPROVIDERLIST(state, data) {
    const i = state.gameListAndProvider.map((item) => item.id).indexOf(data);
    state.gameListAndProvider.splice(i, 1);
  },
  UPDATE_NEW_GAMEPROVIDERLIST(state, data) {
    const index = state.gameListAndProvider.findIndex(function (item, i) {
      return item.id === data.id;
    });
    state.gameListAndProvider = [
      ...state.gameListAndProvider.slice(0, index),
      data,
      ...state.gameListAndProvider.slice(index + 1),
    ];
  },
  SET_META(state, data) {
    state.meta = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
