import httpClient, { checkStatusError, returnErrorData } from "./http-client";

const getAllDashboardTrend = async (path) => {
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

const createDashboardTrend = async (path, params) => {
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

const deleteDashboardTrend = async (path) => {
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

const updateDashboardTrend = async (path, params) => {
  //call api request
  // return await updateHTTPClient(path, params);
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

const getDashboardSummaryUser = async () => {
  //call api request
  try {
    const res = await httpClient.get(`/api/usersToday`).catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getDashboardSummaryUser");
  }
};

export const func = {
  getAllDashboardTrend,
  createDashboardTrend,
  deleteDashboardTrend,
  updateDashboardTrend,
  getDashboardSummaryUser,
};

export default func;
