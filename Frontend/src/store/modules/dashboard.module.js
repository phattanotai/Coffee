import dashboardService from "@/service/dashboardService";

const state = {
  dashboards: [],
  meta: {},
};

const getters = {
  getDashboards(state) {
    return state.dashboards;
  },
};

const actions = {
  async fetchDashboardTrends({ commit }) {
    try {
      const response = await dashboardService.getAllDashboardTrend(
        "dashboards"
      );
      // commit("SET_META", response.meta);
      commit("SET_DASHBOARDS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async createDashboardTrends({ commit }, data) {
    try {
      const response = await dashboardService.createDashboardTrend(
        "dashboards",
        { data: data }
      );
      commit("UPDATE_DASHBOARDS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteDashboardTrends({ commit }, id) {
    try {
      const response = await dashboardService.deleteDashboardTrend(
        `dashboards/${id}`
      );
      commit("DELETE_DASHBOARDS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async updateDashboardTrends({ commit }, data) {
    try {
      const response = await dashboardService.updateDashboardTrend(
        `dashboards/${data.id}`,
        { data: data.data }
      );
      commit("UPDATE_NEW_DASHBOARDS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  SET_DASHBOARDS(state, data) {
    state.dashboards = data;
  },
  UPDATE_DASHBOARDS(state, data) {
    state.dashboards = [{ ...state.dashboards, data }];
  },
  DELETE_DASHBOARDS(state, data) {
    const i = state.dashboards.map((item) => item.id).indexOf(data);
    state.dashboards.splice(i, 1);
  },
  UPDATE_NEW_DASHBOARDS(state, data) {
    const index = state.dashboards.findIndex(function (item, i) {
      return item.id === data.id;
    });
    state.dashboards = [
      ...state.dashboards.slice(0, index),
      data,
      ...state.dashboards.slice(index + 1),
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
