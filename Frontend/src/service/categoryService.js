import httpClient, { checkStatusError, returnErrorData } from "./http-client";

// get
const getCategory = async () => {
  try {
    const res = await httpClient.get("/api/categories").catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getTypes");
  }
};

// update

// create

export const func = {
  getCategory,
};

export default func;
