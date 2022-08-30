import httpClient, { checkStatusError, returnErrorData } from "./http-client";

const test = () => {};

const updateSortManagement = async (dateUpdate) => {
  try {
    const res = await httpClient
      .update("/api/sort-management", dateUpdate)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "updateSortManagement");
  }
};

const getSortManagement = async () => {
  try {
    const res = await httpClient.get("/api/sort-management").catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getSortManagement");
  }
};

export const func = {
  updateSortManagement,
  getSortManagement,
  test,
};

export default func;
