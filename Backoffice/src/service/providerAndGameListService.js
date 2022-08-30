import httpClient, {
  checkStatusError,
  dataURIToBlob,
  returnErrorData,
} from "./http-client";

const getAllGameProviderList = async (path) => {
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

const getGameProviderListById = async (path) => {
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

const createGameProviderList = async (path, params) => {
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

const deleteGameProviderList = async (path) => {
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

const updateGameProviderList = async (path, params) => {
  //call api request
  try {
    const res = await httpClient
      .update(`/api/${path}`, params)
      .catch((error) => {
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

const uploadGameProviderLisImg = async (imgBase64) => {
  try {
    const file = dataURIToBlob(imgBase64);
    const res = await httpClient.upload([file]);
    if (res.status === 200) {
      return res.data;
    } else {
      if (res.status === 400) {
        throw res.data.error.name;
      }
      throw res.data;
    }
  } catch (error) {
    console.log("error : ", error);
    throw returnErrorData(error, "uploadPromotionImg");
  }
};

export const func = {
  getAllGameProviderList,
  getGameProviderListById,
  createGameProviderList,
  deleteGameProviderList,
  updateGameProviderList,
  uploadGameProviderLisImg,
};

export default func;
