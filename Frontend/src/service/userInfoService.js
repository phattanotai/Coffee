import httpClient, { checkStatusError, returnErrorData } from "./http-client";

const getUserInfo = async (params) => {
  try {
    const res = await httpClient
      .get("/api/users/" + params.id)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getSortManagement");
  }
};

const getUserReport = async () => {
  try {
    const res = await httpClient.get("/api/users").catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getSortManagement");
  }
};

export const func = {
  getUserInfo,
  getUserReport,
};

export default func;
