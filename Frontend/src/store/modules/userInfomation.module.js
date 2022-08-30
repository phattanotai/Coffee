import userInfoService from "../../service/userInfoService";
import notifyService from "../../service/notifyService";

const state = {
  UserCreditLog: [],
  UserInfoLog: [],
  UserReport: [],
  UserTopUpLog: [],
  UserInfo: [],
  startDate: "",
  endDate: "",
  perPage: 10,
  currentPage: 1,
  user: "",
  pageCount: 1,
  withDate: false,
  searchInput: "",
};

const getters = {
  getUserInfo(state) {
    return state.UserInfo;
  },
  getUserCreditLog(state) {
    return state.UserCreditLog;
  },
  getUserInfoLog(state) {
    return state.UserInfoLog;
  },
  getUserReport(state) {
    return state.UserReport;
  },
  getUserTopUpLog(state) {
    return state.UserTopUpLog;
  },
  getPage(state) {
    return {
      perPage: state.perPage,
      currentPage: state.currentPage,
      pageCount: state.pageCount,
    };
  },
  getDate(state) {
    return {
      startDate: state.startDate,
      endDate: state.endDate,
    };
  },
};

const actions = {
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
  async fetchUserCreditLog({ commit, state }) {
    try {
      const params = {
        perPage: state.perPage,
        currentPage: state.currentPage,
        user: state.user,
      };
      if (state.withDate) {
        params.startDate = state.startDate;
        params.endDate = state.endDate;
      }
      const dataRes = await userInfoService
        .getUserCreditLog(params)
        .catch((error) => {
          throw error;
        });
      if (dataRes.data.length) {
        commit("SET_USERCREDITLOG", dataRes.data);
        commit("SET_PAGE", {
          pageCount: dataRes.meta.pagination.pageCount,
          currentPage: dataRes.meta.pagination.page,
          perPage: dataRes.meta.pagination.pageSize,
        });
      } else {
        commit("SET_USERCREDITLOG", []);
        commit("SET_PAGE", {
          pageCount: 1,
          currentPage: 0,
        });
      }
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  async fetchUserInfoLog({ commit, state }) {
    try {
      const params = {
        perPage: state.perPage,
        currentPage: state.currentPage,
        user: state.user,
      };
      if (state.withDate) {
        params.startDate = state.startDate;
        params.endDate = state.endDate;
      }
      const dataRes = await userInfoService
        .getUserInfoLog(params)
        .catch((error) => {
          throw error;
        });
      if (dataRes.data.length) {
        commit("SET_USERINFOLOG", dataRes.data);
        commit("SET_PAGE", {
          pageCount: dataRes.meta.pagination.pageCount,
          currentPage: dataRes.meta.pagination.page,
          perPage: dataRes.meta.pagination.pageSize,
        });
      } else {
        commit("SET_USERINFOLOG", []);
        commit("SET_PAGE", {
          pageCount: 0,
          currentPage: 0,
        });
      }
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  async fetchUserReport({ commit, state }) {
    try {
      const params = {
        perPage: state.perPage,
        currentPage: state.currentPage,
        user: state.user,
      };
      if (state.withDate) {
        params.startDate = state.startDate;
        params.endDate = state.endDate;
      }
      const dataRes = await userInfoService
        .getUserReport(params)
        .catch((error) => {
          throw error;
        });
      if (dataRes.data.length) {
        commit("SET_USERREPORT", dataRes.data);
        commit("SET_PAGE", {
          pageCount: dataRes.meta.pagination.pageCount,
          currentPage: dataRes.meta.pagination.page,
          perPage: dataRes.meta.pagination.pageSize,
        });
      } else {
        commit("SET_USERREPORT", []);
        commit("SET_PAGE", {
          pageCount: 0,
          currentPage: 0,
        });
      }
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  async fetchUserTopUpLog({ commit, state }) {
    try {
      const params = {
        perPage: state.perPage,
        currentPage: state.currentPage,
        user: state.user,
      };
      if (state.withDate) {
        params.startDate = state.startDate;
        params.endDate = state.endDate;
      }
      const dataRes = await userInfoService
        .getUserTopupLog(params)
        .catch((error) => {
          throw error;
        });
      if (dataRes.data.length) {
        commit("SET_USERTOPUPLOG", dataRes.data);
        commit("SET_PAGE", {
          pageCount: dataRes.meta.pagination.pageCount,
          currentPage: dataRes.meta.pagination.page,
          perPage: dataRes.meta.pagination.pageSize,
        });
      } else {
        commit("SET_USERTOPUPLOG", []);
        commit("SET_PAGE", {
          pageCount: 0,
          currentPage: 0,
        });
      }
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  setDate({ commit }, data) {
    try {
      commit("SET_DATE", data);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  setPage({ commit }, data) {
    try {
      commit("SET_PAGE", data);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  setUser({ commit }, data) {
    try {
      commit("SET_USER", data);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  setSearchInput({ commit }, data) {
    try {
      commit("SET_SEARCHINPUT", data);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  setWithDate({ commit }, data) {
    try {
      commit("SET_WITHDATE", data);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
};

const mutations = {
  SET_USERINFO(state, data) {
    state.UserInfo = data;
  },
  SET_USERCREDITLOG(state, data) {
    state.UserCreditLog = data;
  },
  SET_USERINFOLOG(state, data) {
    state.UserInfoLog = data;
  },
  SET_USERREPORT(state, data) {
    state.UserReport = data;
  },
  SET_USERTOPUPLOG(state, data) {
    state.UserTopUpLog = data;
  },
  SET_DATE(state, data) {
    state.startDate = data.startDate;
    state.endDate = data.endDate;
  },
  SET_USER(state, data) {
    state.user = data;
  },
  SET_PAGE(state, data) {
    if (data.perPage !== undefined) {
      state.perPage = data.perPage;
    }

    if (data.currentPage !== undefined) {
      state.currentPage = data.currentPage;
    }

    if (data.pageCount !== undefined) {
      state.pageCount = data.pageCount;
    }
  },
  SET_WITHDATE(state, data) {
    state.withDate = data;
  },
  SET_SEARCHINPUT(state, data) {
    state.searchInput = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
