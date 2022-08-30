import httpClient, { checkStatusError } from "./http-client";

const getAllAnnouncements = async (path) => {
  //call api request
  try {
    const res = await httpClient.get(`/api/${path}`).catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAnnouncementByID = async (path) => {
  //call api request
  try {
    const res = await httpClient.get(`/api/${path}`).catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createAnnouncements = async (path, params) => {
  //call api request
  try {
    const res = await httpClient.post(`/api/${path}`, params).catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteAnnouncements = async (path) => {
  //call api request
  try {
    const res = await httpClient.delete(`/api/${path}`).catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateAnnounements = async (path, params) => {
  //call api request
  // return await updateHTTPClient(path, params);
  try {
    const res = await httpClient.update(`/api/${path}`, params).catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const func = {
  getAllAnnouncements,
  createAnnouncements,
  deleteAnnouncements,
  updateAnnounements,
  getAnnouncementByID
};

export default func;
