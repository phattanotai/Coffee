import httpClient, { checkStatusError, returnErrorData } from "./http-client";

// get
const getBeverages = async () => {
  try {
    const res = await httpClient.get("/api/beverages").catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getBeverages");
  }
};

// update

// create

export const func = {
  getBeverages,
};

export default func;
