import announcementService from "@/service/announement.api";

const state = {
  Announcements: [],
  meta: {},
  Announcement: {}
};

const getters = {
  getAnnouncements(state) {
    return state.Announcements;
  },
  getMeta(state) {
    return state.meta;
  },
};

const actions = {
  async fetchAnnounements({ commit }, page = 1) {
    try {
      const response = await announcementService.getAllAnnouncements(
        `announcements?pagination[page]=${page}`
      );
      commit("SET_META", response.meta);
      commit("SET_ANNOUNEMENTS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async createAnnounements({ commit }, data) {
    try {
      const response = await announcementService.createAnnouncements(
        "announcements",
        { data: data }
      );
      commit("UPDATE_ANNOUNEMENTS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async deleteAnnounements({ commit }, id) {
    try {
      const response = await announcementService.deleteAnnouncements(
        `announcements/${id}`
      );
      commit("DELETE_ANNOUNEMENTS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async updateAnnounements({ commit }, data) {
    try {
      const response = await announcementService.updateAnnounements(
        `announcements/${data.id}`,
        { data: data.data }
      );
      commit("UPDATE_NEW_ANNOUNEMENTS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getAnnouncementsByID({ commit }, id) {
    try {
      const response = await announcementService.getAllAnnouncements(
        `announcements/${id}`
      );
      commit("SET_ANNOUNEMENTBYID", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  SET_ANNOUNEMENTS(state, data) {
    state.Announcements = data;
  },
  SET_ANNOUNEMENTBYID(state, data) {
    state.Announcement = data;
  },
  UPDATE_ANNOUNEMENTS(state, data) {
    state.Announcements = [{ ...state.Announcements, data }];
  },
  DELETE_ANNOUNEMENTS(state, data) {
    const i = state.Announcements.map((item) => item.id).indexOf(data);
    state.Announcements.splice(i, 1);
  },
  UPDATE_NEW_ANNOUNEMENTS(state, data) {
    const index = state.Announcements.findIndex(function (item, i) {
      return item.id === data.id;
    });
    state.Announcements = [
      ...state.Announcements.slice(0, index),
      data,
      ...state.Announcements.slice(index + 1),
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
